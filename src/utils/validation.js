const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function validateStep(step, formData) {
  const errors = [];

  if (step === 0) {
    const { company, person, email, phone } = formData.contact;
    if (!company.trim()) errors.push("Company name is required.");
    if (!person.trim()) errors.push("Contact person is required.");
    if (!emailOk(email)) errors.push("Enter a valid email address.");
    if (phone.replace(/\D/g, "").length < 10) errors.push("Enter a valid 10-digit phone number.");
  }

  if (step === 1) {
    formData.needs.forEach((n, i) => {
      if (!n.type) errors.push(`Requirement ${i + 1}: choose a biomass type.`);
      if (!n.form) errors.push(`Requirement ${i + 1}: choose a form.`);
      if (!(Number(n.quantityTonsPerMonth) > 0))
        errors.push(`Requirement ${i + 1}: quantity must be greater than 0.`);
      if (!n.frequency) errors.push(`Requirement ${i + 1}: choose a supply frequency.`);
    });
  }

  if (step === 2) {
    formData.locations.forEach((l, i) => {
      if (!l.city.trim()) errors.push(`Site ${i + 1}: city is required.`);
      if (!l.state.trim()) errors.push(`Site ${i + 1}: state is required.`);
      if (l.pincode.length !== 6) errors.push(`Site ${i + 1}: pincode must be 6 digits.`);
    });
  }

  if (step === 3) {
    const min = Number(formData.pricing.minPricePerTon);
    const max = Number(formData.pricing.maxPricePerTon);
    if (!(min > 0)) errors.push("Minimum price must be greater than 0.");
    if (!(max > 0)) errors.push("Maximum price must be greater than 0.");
    if (min > 0 && max > 0 && min > max)
      errors.push("Minimum price cannot be higher than maximum price.");
    if (!(Number(formData.quality.minCalorificKcalPerKg) > 0))
      errors.push("Enter a minimum calorific value.");
  }

  return errors;
}