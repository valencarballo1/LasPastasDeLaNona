import type { LucideIcon } from "lucide-react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

interface EventServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageAlt: string;
}

export function EventServiceCard({ icon: Icon, title, description, imageAlt }: EventServiceCardProps) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-muted/15 bg-warm-white shadow-soft">
      <PhotoFrame alt={imageAlt} className="aspect-[16/9] w-full" />
      <div className="p-6">
        <Icon className="h-7 w-7 text-red" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="mt-3 font-display text-2xl text-carbon">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </article>
  );
}
