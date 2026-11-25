import React from "react";
import { Plus, Trash2, Layers } from "lucide-react";
import Field from "../components/Field";
import { TYPES, FORMS, FREQUENCY, emptyNeed } from "../constants/options";

export default function NeedsStep({ data, onChange }) {
  const updateRow = (i, key, value) =>
    onChange(data.map((row, idx) => (idx === i ? { ...row, [key]: value } : row)));

  const addRow = () => onChange([...data, { ...emptyNeed }]);

  const removeRow = (i) => onChange(data.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      <div className="border-b border-zinc-100 pb-3">
        <h2 className="text-base font-semibold text-zinc-900">Biomass Specifications</h2>
        <p className="text-xs text-zinc-500">
          List each type of biomass and monthly required volume.
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
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  Requirement {i + 1}
                </span>
              </div>

              {data.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-rose-50"
                  title="Remove requirement"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field label="Biomass Type" required>
                <select
                  value={row.type}
                  onChange={(e) => updateRow(i, "type", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                >
                  <option value="">Select biomass type...</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Preferred Form" required>
                <select
                  value={row.form}
                  onChange={(e) => updateRow(i, "form", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                >
                  <option value="">Select form...</option>
                  {FORMS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Quantity (Tons / Month)" required>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 500"
                    value={row.quantityTonsPerMonth}
                    onChange={(e) => updateRow(i, "quantityTonsPerMonth", e.target.value)}
                    className="w-full px-3 py-2 pr-16 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400 pointer-events-none">
                    tons/mo
                  </span>
                </div>
              </Field>

              <Field label="Supply Frequency" required>
                <select
                  value={row.frequency}
                  onChange={(e) => updateRow(i, "frequency", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                >
                  <option value="">Select frequency...</option>
                  {FREQUENCY.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
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
        <span>Add Another Biomass Requirement</span>
      </button>
    </div>
  );
}
