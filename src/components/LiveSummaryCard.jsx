import React from "react";
import NumberTicker from "./magicui/number-ticker";

export default function LiveSummaryCard({ needs = [] }) {
  const totalTons = needs.reduce(
    (acc, curr) => acc + (Number(curr.quantityTonsPerMonth) || 0),
    0
  );

  return (
    <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-3.5 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-emerald-950">Total Demand:</span>
        <span className="font-bold text-emerald-900">
          <NumberTicker value={totalTons} /> tons/mo
        </span>
      </div>
    </div>
  );
}

