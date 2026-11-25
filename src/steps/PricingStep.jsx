import Field from "../components/Field";
export default function PricingStep({pricing,quality,onPricingChange,onQualityChange}){
    return(
        <>
        <h3>Budget range</h3>
        <div className="grid">
            <Field label="Minimum price(₹ / ton)">
            <input type="number"  min="0" value={pricing.minPricePerTon} onChange={(e)=>onPricingChange({...pricing,minPricePerTon:e.target.value})} />
            </Field>
            <Field label="Maximum price(₹ / ton)">
            <input type="number" min="0" value={pricing.maxPricePerTon} onChange={(e)=>onPricingChange({...pricing,maxPricePerTon:e.target.value})} />
            </Field>
        </div>
        <h3>Calorific requirement</h3>
        <Field label="Minimum Calorific value (kcal/kg)">
     <input
          type="number" min="0" value={quality.minCalorificKcalPerKg} onChange={(e) => onQualityChange({ minCalorificKcalPerKg: e.target.value })}
        />    
        </Field>
        <p className="hint">
        Higher calorific value means more heat per kg, which matters for boilers and
        kilns replacing coal. Typical biomass pellets sit roughly in the 3,000 to 4,500
        kcal/kg range, but check the real range with Regenerix.
      </p>
        </>
    )
}