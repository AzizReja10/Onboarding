export const TYPES = [
  "Paddy straw (stubble)",
  "Wheat straw",
  "Mustard stalk",
  "Cotton stalk",
  "Sugarcane bagasse",
  "Rice husk",
  "Sawdust",
];
export const FORMS = ["Pellets", "Loose"];
export const FREQUENCY = ["One-time", "Weekly", "Monthly", "Quarterly"];
export const STEPS = [
  "Contact",
  "Biomass needs",
  "Locations",
  "Pricing & quality",
  "Review"
];
export const emptyNeed = {
  type: "",
  form: "",
  quantityTonsPerMonth: "",
  frequency: ""
};
export const contact={
  company:"",
  person:"",
  email:"",
  phone:"",
  pan:"",
}
export const emptyLocation={
  label:"",
  city:"",
  state:"",
  pincode:"",
  lat:null,
  lng:null
}
export const initialFormData = {
  contact: [{...contact}],
  needs: [{ ...emptyNeed }],
  locations: [{ ...emptyLocation }],
  pricing: { minPricePerTon: "", maxPricePerTon: "" },
  quality: { minCalorificKcalPerKg: "" }
};