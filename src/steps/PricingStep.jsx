import React from "react";
import { IndianRupee, Flame, Info } from "lucide-react";
import Field from "../components/Field";

export default function PricingStep({
  pricing,
  quality,
  onPricingChange,
  onQualityChange,
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="border-b border-zinc-100 pb-3 mb-4">
          <h2 className="text-base font-semibold text-zinc-900">Budget Range</h2>
          <p className="text-xs text-zinc-500">
            Set your target landed price per ton.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Minimum Price (₹ / Ton)" icon={IndianRupee} required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 3500"
                value={pricing.minPricePerTon}
                onChange={(e) =>
                  onPricingChange({ ...pricing, minPricePerTon: e.target.value })
                }
                className="w-full pl-8 pr-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>
          </Field>

          <Field label="Maximum Price (₹ / Ton)" icon={IndianRupee} required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 5200"
                value={pricing.maxPricePerTon}
                onChange={(e) =>
                  onPricingChange({ ...pricing, maxPricePerTon: e.target.value })
                }
                className="w-full pl-8 pr-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>
          </Field>
        </div>
      </div>

      <div>
        <div className="border-b border-zinc-100 pb-3 mb-4">
          <h2 className="text-base font-semibold text-zinc-900">Quality Specification</h2>
          <p className="text-xs text-zinc-500">
            Ensure the biomass provides sufficient thermal output.
          </p>
        </div>

        <Field
          label="Minimum Calorific Value (kcal/kg)"
          icon={Flame}
          required
          hint="Gross Calorific Value"
        >
          <div className="relative">
            <input
              type="number"
              min="0"
              placeholder="e.g. 3800"
              value={quality.minCalorificKcalPerKg}
              onChange={(e) =>
                onQualityChange({ minCalorificKcalPerKg: e.target.value })
              }
              className="w-full pr-18 px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400 pointer-events-none">
              kcal/kg
            </span>
          </div>
        </Field>

        <div className="mt-3.5 flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Standard biomass pellets typically range between <strong>3,000 to 4,500 kcal/kg</strong>. Higher calorific value delivers more heat output when replacing coal.
          </p>
        </div>
      </div>
    </div>
  );
}