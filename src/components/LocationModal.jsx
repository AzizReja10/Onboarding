import React, { useEffect, useState } from "react";
import { X, LocateFixed, MapPin } from "lucide-react";
import LocationMap from "./LocationMap";

const round = (n) => Number(n.toFixed(6));

const MESSAGES = {
  locating: "Finding your location…",
  denied:
    "Location access is blocked for this site. Allow location in browser settings or click the map to drop a pin.",
  unsupported: "This browser can't share its location. Click the map to drop a pin.",
  error: "Couldn't get your location (weak signal or timeout). Click the map to drop a pin.",
};

export default function LocationModal({ initialLat, initialLng, onConfirm, onClose }) {
  const [pin, setPin] = useState({ lat: initialLat ?? null, lng: initialLng ?? null });
  const [status, setStatus] = useState("idle");

  const locate = () => {
    if (!navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPin({ lat: round(pos.coords.latitude), lng: round(pos.coords.longitude) });
        setStatus("ok");
      },
      (err) => setStatus(err.code === 1 ? "denied" : "error"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (pin.lat === null) locate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const hasPin = pin.lat !== null && pin.lng !== null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white border border-zinc-200 shadow-xl p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-semibold text-zinc-900">Select location on map</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-zinc-200 [&_.map]:mt-0 [&_.map]:rounded-none">
          <LocationMap
            lat={pin.lat}
            lng={pin.lng}
            onPick={(lat, lng) => {
              setPin({ lat, lng });
              setStatus("ok");
            }}
          />
        </div>

        {MESSAGES[status] && (
          <p
            className={
              status === "locating"
                ? "text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/70 rounded-lg px-3 py-2"
                : "text-xs text-amber-800 bg-amber-50 border border-amber-200/80 rounded-lg px-3 py-2"
            }
          >
            {MESSAGES[status]}
          </p>
        )}

        <p className="text-xs text-zinc-500">
          {hasPin
            ? `Pin at ${pin.lat}, ${pin.lng}. Drag the marker to fine-tune.`
            : "Click anywhere on the map to drop a pin."}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100">
          <button
            type="button"
            onClick={locate}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-50 transition-all cursor-pointer"
          >
            <LocateFixed className="w-3.5 h-3.5 text-emerald-600" />
            <span>Use my current location</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!hasPin}
              onClick={() => onConfirm(pin.lat, pin.lng)}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 transition-all cursor-pointer disabled:opacity-45 disabled:pointer-events-none"
            >
              Confirm location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
