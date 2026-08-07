import { Wheat } from "lucide-react";
import { cn } from "@/lib/utils";

/** Divisor ornamental inspirado en las espigas del isologo del local. */
export function OrnamentDivider({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const line = tone === "dark" ? "bg-gold/40" : "bg-red/30";
  const icon = tone === "dark" ? "text-gold" : "text-red";

  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span className={cn("h-px w-10 sm:w-16", line)} />
      <Wheat className={cn("h-4 w-4", icon)} strokeWidth={1.5} />
      <span className={cn("h-px w-10 sm:w-16", line)} />
    </div>
  );
}
