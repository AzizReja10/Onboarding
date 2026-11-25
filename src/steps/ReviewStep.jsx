import React from "react";
import { Building2, User, Mail, Phone, Package, MapPin, IndianRupee, Flame } from "lucide-react";
import NumberTicker from "../components/magicui/number-ticker";

export default function ReviewStep({ data }) {
  const { contact, needs, locations, pricing, quality } = data;

  const totalMonthlyTons = needs.reduce(
    (acc, curr) => acc + (Number(curr.quantityTonsPerMonth) || 0),
    0
  );
  return (
    <div className="space-y-5">
      <div className="border-b border-zinc-100 pb-3">
        <h2 className="text-base font-semibold text-zinc-900">Review & Confirm</h2>
        <p className="text-xs text-zinc-500">
          Please review your details before submitting to the Regenerix team.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-center">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
            Total Monthly Demand
          </span>
          <div className="text-xl font-bold text-emerald-950 mt-0.5">
            <NumberTicker value={totalMonthlyTons} /> <span className="text-xs font-medium text-emerald-700">tons/mo</span>
          </div>
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
            Target Price Range
          </span>
          <div className="text-xl font-bold text-emerald-950 mt-0.5">
            ₹{pricing.minPricePerTon || "0"} - ₹{pricing.maxPricePerTon || "0"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Company & Contact</span>
          </div>
          <div className="space-y-1.5 text-sm">
            <p className="font-semibold text-zinc-900">{contact.company || "Not specified"}</p>
            <p className="text-xs text-zinc-600 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              {contact.person || "-"}
            </p>
            <p className="text-xs text-zinc-600 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              {contact.email || "-"}
            </p>
            <p className="text-xs text-zinc-600 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              {contact.phone || "-"}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
            <span>Budget & Quality</span>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-xs text-zinc-400 block">Price Range</span>
              <span className="font-medium text-zinc-800">
                ₹{pricing.minPricePerTon} to ₹{pricing.maxPricePerTon} / ton
              </span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block">Min. Calorific Value</span>
              <span className="font-medium text-zinc-800 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                {quality.minCalorificKcalPerKg} kcal/kg
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-2.5">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Package className="w-3.5 h-3.5 text-emerald-600" />
            <span>Biomass Requirements ({needs.length})</span>
          </div>
        </div>
        <div className="divide-y divide-zinc-100">
          {needs.map((n, i) => (
            <div key={i} className="py-2.5 first:pt-1 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
              <div>
                <span className="font-medium text-zinc-900">{n.type}</span>
                <span className="text-xs text-zinc-400 ml-2">({n.form})</span>
              </div>
              <div className="text-xs text-zinc-600">
                <strong className="text-zinc-900 text-sm font-semibold">{n.quantityTonsPerMonth}</strong> tons/mo &bull; {n.frequency}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-2.5">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Delivery Locations ({locations.length})</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {locations.map((l, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/70 text-xs">
              <span className="font-semibold text-zinc-800 block">
                {l.label || `Site ${i + 1}`}
              </span>
              <span className="text-zinc-500 mt-0.5 block">
                {l.city}, {l.state} - {l.pincode}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
