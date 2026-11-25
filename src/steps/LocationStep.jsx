import React from "react";
import { Plus, Trash2, MapPin } from "lucide-react";
import Field from "../components/Field";
import { emptyLocation } from "../constants/options";
export default function LocationStep({ data, onChange }) {
  const updateRow = (i, key, value) =>
    onChange(data.map((row, idx) => (idx === i ? { ...row, [key]: value } : row)));
  const addRow = () => onChange([...data, { ...emptyLocation }]);
  const removeRow = (i) => onChange(data.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-5">
      <div className="border-b border-zinc-100 pb-3">
        <h2 className="text-base font-semibold text-zinc-900">Delivery Sites & Plants</h2>
        <p className="text-xs text-zinc-500">
          Where should the biomass be delivered? Add all receiving facilities.
        </p>
      </div>
      <div className="space-y-4">
        {data.map((row, i) => (
          <div
            key={i}
            className="relative rounded-xl border border-zinc-200/90 bg-zinc-50/50 p-4 transition-all hover:border-zinc-300"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/60">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-zinc-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {row.label ? row.label : `Site ${i + 1}`}
                </span>
              </div>
              {data.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-rose-50"
                  title="Remove site"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field label="Site Name / Label" required>
                <input
                  type="text"
                  placeholder="e.g. Unit 1 Boiler Plant"
                  value={row.label || ""}
                  onChange={(e) => updateRow(i, "label", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                />
              </Field>
              <Field label="City" required>
                <input
                  type="text"
                  placeholder="e.g. Panipat"
                  value={row.city || ""}
                  onChange={(e) => updateRow(i, "city", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                />
              </Field>
              <Field label="State" required>
                <input
                  type="text"
                  placeholder="e.g. Haryana"
                  value={row.state || ""}
                  onChange={(e) => updateRow(i, "state", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                />
              </Field>
              <Field label="Pincode" required hint="6 digits">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="e.g. 132103"
                  value={row.pincode || ""}
                  onChange={(e) =>
                    updateRow(i, "pincode", e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="w-full py-2.5 px-4 rounded-xl border border-dashed border-emerald-600/60 bg-emerald-50/40 text-emerald-800 hover:bg-emerald-50/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add Another Delivery Site</span>
      </button>
    </div>
  );
}
