export default function ReviewStep({data})
{
    const {contact,needs,locations,pricing,quality}=data;
    return(
        <div className="summary">
            <h3>Contact</h3>
            <p>{contact.person}</p>
            <p>{contact.email}</p>
            <h3>Biomass needs</h3>
            <ul>
                {needs.map((n,i)=>(
                    <li key={i}>
                         {n.type} ({n.form}): {n.quantityTonsPerMonth} tons/month, {n.frequency}
                    </li>
                ))}
            </ul>
            <h3>Delivery locations</h3>
            <ul>
                {locations.map((l,i)=>(
                    <li key={i}>
                        {l.label ? `${l.label}: ` : ""}{l.city}, {l.state} {l.pincode}
                    </li>
                ))}
            </ul>
            <h3>Pricing & quality</h3>
            <p>₹{pricing.minPricePerTon} to ₹{pricing.maxPricePerTon} per ton</p>
            <p>Minimum {quality.minCalorificKcalPerKg} kcal/kg</p>
        </div>
    )
}