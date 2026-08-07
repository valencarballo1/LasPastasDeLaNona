import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[var(--radius-card)] border border-muted/15 bg-warm-white shadow-soft", className)}>
      {children}
    </div>
  );
}
