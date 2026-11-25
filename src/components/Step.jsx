import React from "react";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";

export default function Step({ steps, current }) {
  return (
    <div className="w-full mb-8">
      {/* Desktop Stepper */}
      <ol className="hidden sm:flex items-center justify-between w-full relative">
        {steps.map((label, i) => {
          const isDone = i < current;
          const isActive = i === current;
          return (
            <li
              key={label}
              className={cn(
                "flex-1 relative flex flex-col items-center",
                i !== steps.length - 1 &&
                  "after:content-[''] after:w-full after:h-[2px] after:absolute after:top-4 after:left-1/2 after:-translate-y-1/2 after:z-0",
                i !== steps.length - 1 &&
                  (isDone ? "after:bg-emerald-600" : "after:bg-zinc-200")
              )}
            >
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all duration-200",
                  isDone &&
                    "bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-600/20",
                  isActive &&
                    "bg-white text-emerald-700 border-2 border-emerald-600 ring-4 ring-emerald-500/15 shadow-xs font-bold",
                  !isDone &&
                    !isActive &&
                    "bg-white text-zinc-400 border border-zinc-300"
                )}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : i + 1}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium tracking-tight text-center transition-colors",
                  isActive && "text-emerald-950 font-semibold",
                  isDone && "text-zinc-700",
                  !isDone && !isActive && "text-zinc-400"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Mobile Stepper */}
      <div className="sm:hidden flex items-center justify-between bg-zinc-50 border border-zinc-200/90 rounded-xl px-4 py-3">
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold">
            Step {current + 1} of {steps.length}
          </span>
          <span className="text-sm font-bold text-zinc-900">
            {steps[current]}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === current
                  ? "w-6 bg-emerald-600"
                  : i < current
                  ? "w-3 bg-emerald-500/70"
                  : "w-2 bg-zinc-300"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
