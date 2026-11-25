export const TYPES=[
     "Paddy straw (stubble)",
  "Wheat straw",
  "Mustard stalk",
  "Cotton stalk",
  "Sugarcane bagasse",
  "Rice husk",
  "Sawdust",
];
export const FORMS=["Pellets", "Loose","baled"];
export const FREQUENCY=["One-time", "Weekly", "Monthly", "Quarterly"];
export const STEPS=["Contact",
  "Biomass needs",
  "Locations",
  "Pricing & quality",
  "Review"];
  export const emptyNeed={type:"",form:"",quantityTonsPerMonth:"",frequency:""}
  export const initialFormData = {
  contact: { company: "", person: "", email: "", phone: "" },
  needs: [{...emptyNeed }],
  locations: [{ ...emptyNeed}],
  pricing: { minPricePerTon: "", maxPricePerTon: "" },
  quality: { minCalorificKcalPerKg: "" },
};

export const emptyLocation={label:"",city:"",state:"",pincode:""};