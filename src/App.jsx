import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight,CheckCircle2,RotateCcw,AlertCircle} from "lucide-react";
import Header from "./components/Header";
import Step from "./components/Step";
import ContactStep from "./steps/ContactStep";
import NeedsStep from "./steps/NeedsStep";
import LocationStep from "./steps/LocationStep";
import PricingStep from "./steps/PricingStep";
import ReviewStep from "./steps/ReviewStep";
import ShimmerButton from "./components/magicui/shimmer-button";
import DotPattern from "./components/magicui/dot-pattern";
import { validateStep } from "./utils/validation";
import { STEPS, initialFormData } from "./constants/options";
export default function App() {
  const [step, setStep]=useState(0);
  const [formData, setFormData]=useState(initialFormData);
  const [errors, setErrors]=useState([]);
  const [submitted, setSubmitted]=useState(false);
  const isLast=step===STEPS.length-1;
  const next=()=>{
    const found=validateStep(step, formData);
    setErrors(found);
    if (found.length===0) {
      setStep((s)=>s+1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const back=()=>{
    setErrors([]);
    setStep((s)=>s-1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const updateSection=(section)=>(value)=>{
    setFormData((prev)=>({ ...prev, [section]: value }));
    if (errors.length >0) {
      setErrors([]);
    }
  };
  const handleSubmit=()=>{
    const payload={
      ...formData,
      needs: formData.needs.map((n)=>({
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
    setSubmitted(true);
  };
  const reset=()=>{
    setFormData(initialFormData);
    setStep(0);
    setErrors([]);
    setSubmitted(false);
  };
  return (
    <div className="relative min-h-screen bg-[#f8faf8] text-zinc-800 flex flex-col justify-between py-10 px-4 sm:px-6 overflow-hidden">
      <DotPattern
        className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] opacity-50"
        width={24}
        height={24}
      />
      <main className="relative z-10 w-full max-w-2xl mx-auto my-auto">
        <Header />
        {!submitted ? (
          <div>
            <Step steps={STEPS} current={step} />
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y:10 }}
                  animate={{ opacity:1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {step===0 && (
                    <ContactStep
                      data={formData.contact}
                      onChange={updateSection("contact")}
                    />
                  )}
                  {step===1 && (
                    <NeedsStep
                      data={formData.needs}
                      onChange={updateSection("needs")}
                    />
                  )}
                  {step===2 && (
                    <LocationStep
                      data={formData.locations}
                      onChange={updateSection("locations")}
                    />
                  )}
                  {step===3 && (
                    <PricingStep
                      pricing={formData.pricing}
                      quality={formData.quality}
                      onPricingChange={updateSection("pricing")}
                      onQualityChange={updateSection("quality")}
                    />
                  )}
                  {step===4 && <ReviewStep data={formData} />}
                </motion.div>
              </AnimatePresence>
              {errors.length >0 && (
                <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-rose-900 mb-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Please correct the following before continuing:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-rose-700">
                    {errors.map((e)=>(
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={back}
                  disabled={step===0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-50 transition-all cursor-pointer outline-none focus:outline-none focus:ring-2 focus:ring-zinc-400/20 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {isLast ? (
                  <ShimmerButton
                    onClick={handleSubmit}
                    className="font-semibold text-sm px-6 py-2.5"
                  >
                    <span>Submit Onboarding</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </ShimmerButton>
                ) : (
                  <ShimmerButton
                    onClick={next}
                    className="font-semibold text-sm px-6 py-2.5"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </ShimmerButton>
                )}
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity:1, scale:1 }}
            className="relative rounded-2xl border border-zinc-200/90 bg-white p-8 sm:p-10 text-center shadow-sm"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-700">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Requirements Received!
            </h2>
            <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto leading-relaxed">
              Thank you for submitting your biomass specifications. The Regenerix
              sourcing team will evaluate matching supply optionsand reach out
              to your contact person shortly.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-zinc-700 bg-zinc-50 border border-zinc-300 rounded-xl hover:bg-zinc-100 transition-all cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Onboard Another Customer</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
