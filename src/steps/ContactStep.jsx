import React from "react";
import { Building2, User, Mail, Phone } from "lucide-react";
import Field from "../components/Field";
export default function ContactStep({ data, onChange }) {
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value });
  return (
    <div className="space-y-4">
      <div className="border-b border-zinc-100 pb-3 mb-4">
        <h2 className="text-base font-semibold text-zinc-900">Primary Contact Details</h2>
        <p className="text-xs text-zinc-500">Provide the organization and contact person details.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Company Name" icon={Building2} required>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            placeholder="e.g. GreenTech Power Corp"
            value={data.company}
            onChange={set("company")}
          />
        </Field>
        <Field label="Contact Person" icon={User} required>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            placeholder="e.g. Rahul Sharma"
            value={data.person}
            onChange={set("person")}
          />
        </Field>
        <Field label="Work Email" icon={Mail} required>
          <input
            type="email"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            placeholder="e.g. rahul@greentech.com"
            value={data.email}
            onChange={set("email")}
          />
        </Field>
        <Field label="Phone Number" icon={Phone} required hint="10 digits">
          <input
            type="tel"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            placeholder="e.g. 9876543210"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
          />
        </Field>
      </div>
    </div>
  );
}
