import React from "react";
import { cn } from "../lib/utils";

export default function Field({
  label,
  children,
  hint,
  error,
  required,
  icon: Icon,
  className,
}) {
  return (
    <div className={cn("flex flex-col gap-1.5 text-left w-full", className)}>
      {label && (
        <label className="text-xs font-semibold tracking-wider uppercase text-zinc-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            {Icon && <Icon className="w-3.5 h-3.5 text-emerald-600" />}
            {label}
            {required && <span className="text-emerald-600">*</span>}
          </span>
          {hint && (
            <span className="text-[11px] font-normal normal-case text-zinc-400">
              {hint}
            </span>
          )}
        </label>
      )}
      <div className="relative w-full">{children}</div>
      {error && <p className="text-xs text-rose-600 mt-0.5">{error}</p>}
    </div>
  );
}
