const emailOk=(v)=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
// PAN: 3 letters + entity type (A,B,C,F,G,H,L,J,P,T) + 1 letter + 4 digits (0001-9999) + 1 letter
const panOk=(v)=> /^[A-Z]{3}[ABCFGHLJPT][A-Z](?!0000)[0-9]{4}[A-Z]$/.test(v);

export function validateStep(step, formData) {
  const errors=[];
  if(step===0) {
    const { company="", person="", email="", phone="", pan="" }=formData.contact||{};
    if(!company.trim()) errors.push("Company name is required.");
    if(!person.trim()) errors.push("Contact person is required.");
    if(!pan.trim()) {
      errors.push("PAN number is required.");
    } else if(!panOk(pan.trim().toUpperCase())) {
      errors.push("Enter a valid 10-character PAN (e.g. ABCDE1234F).");
    }
    if(!emailOk(email.trim())) errors.push("Enter a valid email address.");
    if(phone.replace(/\D/g, "").length < 10)
      errors.push("Enter a valid 10-digit phone number.");
  }
  if(step===1) {
    if(!formData.needs||formData.needs.length===0) {
      errors.push("At least one biomass requirement is needed.");
    } else {
      formData.needs.forEach((n, i)=> {
        if(!n.type) errors.push(`Requirement ${i+1}: choose a biomass type.`);
        if(!n.form) errors.push(`Requirement ${i+1}: choose a form.`);
        if(!(Number(n.quantityTonsPerMonth) > 0))
          errors.push(`Requirement ${i+1}: quantity must be greater than 0.`);
        if(!n.frequency) errors.push(`Requirement ${i+1}: choose a supply frequency.`);
      });
    }
  }
  if(step===2) {
    if(!formData.locations||formData.locations.length===0) {
      errors.push("At least one delivery site is needed.");
    } else {
      formData.locations.forEach((l, i)=> {
        const hasPin = l.lat !== null && l.lat !== undefined && l.lng !== null && l.lng !== undefined;
        if(!hasPin) {
          if(!l.city?.trim()) errors.push(`Site ${i+1}: city is required.`);
          if(!l.state?.trim()) errors.push(`Site ${i+1}: state is required.`);
          if((l.pincode||"").length !==6)
            errors.push(`Site ${i+1}: pincode must be 6 digits.`);
        }
      });
    }
  }
  if(step===3) {
    const min=Number(formData.pricing.minPricePerTon);
    const max=Number(formData.pricing.maxPricePerTon);
    if(!(min > 0)) errors.push("Minimum price must be greater than 0.");
    if(!(max > 0)) errors.push("Maximum price must be greater than 0.");
    if(min > 0 && max > 0 && min > max)
      errors.push("Minimum price cannot be higher than maximum price.");
    if(!(Number(formData.quality.minCalorificKcalPerKg) > 0))
      errors.push("Enter a minimum calorific value.");
  }
  return errors;
}
