import type { LucideIcon } from "lucide-react";
import type { ResolvedSiteImage } from "@/services/site-image.service";
import { SiteImage } from "@/components/ui/SiteImage";

interface EventServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: ResolvedSiteImage;
}

export function EventServiceCard({ icon: Icon, title, description, image }: EventServiceCardProps) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-muted/15 bg-warm-white shadow-soft">
      <SiteImage image={image} className="aspect-[16/9] w-full" sizes="(min-width: 640px) 50vw, 100vw" tone="light" />
      <div className="p-6">
        <Icon className="h-7 w-7 text-red" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="mt-3 font-display text-2xl text-carbon">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </article>
  );
}
