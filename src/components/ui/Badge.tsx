import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  gold: "bg-gold/15 text-gold border-gold/30",
  red: "bg-red/10 text-red border-red/30",
  muted: "bg-muted/10 text-muted border-muted/30",
  success: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-700 border-amber-500/30",
} as const;

export function Badge({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
