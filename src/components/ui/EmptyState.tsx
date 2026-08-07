import type { LucideIcon } from "lucide-react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon: Icon = PackageOpen, className, action }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-muted/40 px-6 py-16 text-center",
        className,
      )}
    >
      <Icon className="h-9 w-9 text-muted" strokeWidth={1.5} aria-hidden="true" />
      <p className="font-display text-xl text-carbon">{title}</p>
      {description ? <p className="max-w-sm text-sm text-muted">{description}</p> : null}
      {action}
    </div>
  );
}
