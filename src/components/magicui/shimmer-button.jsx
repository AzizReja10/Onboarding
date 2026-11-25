import React from "react";
import { cn } from "../../lib/utils";

export const ShimmerButton = React.forwardRef(
  (
    {
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-all duration-200 outline-none focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:ring-offset-2",
          "hover:bg-emerald-800 active:scale-[0.98] cursor-pointer",
          disabled && "pointer-events-none opacity-40 shadow-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {/* Subtle, smooth light sweep across the button */}
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer-sweep_3.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
export default ShimmerButton;
