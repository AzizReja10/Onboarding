import React from "react";
import { cn } from "../../lib/utils";

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}) {
  return (
    <span
      style={{
        "--shiny-width": `${shimmerWidth}px`,
      }}
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]",
        "bg-gradient-to-r from-emerald-800 via-emerald-500 to-emerald-800 text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

export default AnimatedShinyText;

