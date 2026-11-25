export const TYPES = [
  "Paddy straw (stubble)",
  "Wheat straw",
  "Mustard stalk",
  "Cotton stalk",
  "Sugarcane bagasse",
  "Rice husk",
  "Sawdust",
];

export const FORMS = ["Pellets", "Loose", "Baled", "Briquettes"];

export const FREQUENCY = ["One-time", "Weekly", "Monthly", "Quarterly"];

export const STEPS = [
  "Contact",
  "Biomass needs",
  "Locations",
  "Pricing & quality",
  "Review",
];

export const emptyNeed = {
  type: "",
  form: "",
  quantityTonsPerMonth: "",
  frequency: "",
};

export const emptyLocation = {
  label: "",
  city: "",
  state: "",
  pincode: "",
};

export const initialFormData = {
  contact: { company: "", person: "", email: "", phone: "" },
  needs: [{ ...emptyNeed }],
  locations: [{ ...emptyLocation }],
  pricing: { minPricePerTon: "", maxPricePerTon: "" },
  quality: { minCalorificKcalPerKg: "" },
};