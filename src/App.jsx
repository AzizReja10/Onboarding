import { useState } from "react";
import Step from "./components/Step";
import ContactStep from "./steps/ContactStep";
import NeedsStep from "./steps/NeedsStep";
import LocationStep from "./steps/LocationStep";
import PricingStep from "./steps/PricingStep";
import ReviewStep from "./steps/ReviewStep";
import { validateStep } from "./utils/validation";
import { STEPS, initialFormData } from "./constants/options";
import "./App.css";

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const isLast = step === STEPS.length - 1;

  const next = () => {
    const found = validateStep(step, formData);
    setErrors(found);
    if (found.length === 0) setStep((s) => s + 1);
  };

  const back = () => {
    setErrors([]);
    setStep((s) => s - 1);
  };

  const updateSection = (section) => (value) =>
    setFormData((prev) => ({ ...prev, [section]: value }));

  const handleSubmit = () => {
    // Convert numeric strings to numbers so the payload is API-ready
    const payload = {
      ...formData,
      needs: formData.needs.map((n) => ({
        ...n,
        quantityTonsPerMonth: Number(n.quantityTonsPerMonth),
      })),
      pricing: {
        minPricePerTon: Number(formData.pricing.minPricePerTon),
        maxPricePerTon: Number(formData.pricing.maxPricePerTon),
      },
      quality: {
        minCalorificKcalPerKg: Number(formData.quality.minCalorificKcalPerKg),
      },
    };
    console.log("Onboarding payload:", payload);
    // Later: fetch("/api/customers", { method: "POST", body: JSON.stringify(payload) })
    setSubmitted(true);
  };

  const reset = () => {
    setFormData(initialFormData);
    setStep(0);
    setErrors([]);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="card success">
          <h2>Thank you!</h2>
          <p>
            We've received your biomass requirements. The Regenerix team will get
            back to you with matching supply options.
          </p>
          <button onClick={reset}>Onboard another customer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Regenerix: Biomass Customer Onboarding</h1>
      <Step steps={STEPS} current={step} />

      <div className="card">
        {step === 0 && (
          <ContactStep data={formData.contact} onChange={updateSection("contact")} />
        )}
        {step === 1 && (
          <NeedsStep data={formData.needs} onChange={updateSection("needs")} />
        )}
        {step === 2 && (
          <LocationStep data={formData.locations} onChange={updateSection("locations")} />
        )}
        {step === 3 && (
          <PricingStep
            pricing={formData.pricing}
            quality={formData.quality}
            onPricingChange={updateSection("pricing")}
            onQualityChange={updateSection("quality")}
          />
        )}
        {step === 4 && <ReviewStep data={formData} />}

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((e) => <li key={e}>{e}</li>)}
          </ul>
        )}
      </div>

      <div className="actions">
        <button onClick={back} disabled={step === 0}>Back</button>
        {isLast ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={next}>Next</button>
        )}
      </div>
    </div>
  );
}