import { useEffect } from "react";
import { MapContainer,TileLayer,Marker,useMap,useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const pinIcon=L.icon({
  iconUrl:markerIcon,
  iconRetinaUrl:markerIcon2x,
  shadowUrl:markerShadow,
  iconSize:[25,41],
  iconAnchor:[12,41],
  shadowSize:[41,41]
});
const IndiaCenter=[22.97,78.65];
const ClickToPin=({onPick})=>{
    useMapEvents({
        click(e){
            onPick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}
const FlyTo=({lat,lng})=>{
    const map=useMap();
    useEffect(()=>{
        if(lat!==null&&lng!=null){
            map.flyTo([lat,lng],Math.max(map.getZoom(),13));
        }
    },[lat,lng,map]);
    return null;
}
const ResizeFix=()=>{
  const map=useMap();
  useEffect(()=>{
    const t=setTimeout(()=>map.invalidateSize(),150);
    return()=>clearTimeout(t);
  },[map]);
  return null;
}
export default function LocationMap({lat,lng,onPick}){
    const hasPin=lat!==null && lng!==null;
    const pick=(a,b)=>onPick(Number(a.toFixed(6)),Number(b.toFixed(6)));
    return(
        <MapContainer className="map" center={hasPin?[lat,lng]:IndiaCenter} zoom={hasPin?13:5}>
            <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickToPin onPick={pick} />
      {hasPin && (
        <Marker
          position={[lat, lng]}
          icon={pinIcon}
          draggable
          eventHandlers={{
            dragend(e) {
              const p = e.target.getLatLng();
              pick(p.lat, p.lng);
            },
          }}
        />
      )}
      <FlyTo lat={lat} lng={lng} />
      <ResizeFix/>
        </MapContainer>
    )
}