import type { ReactNode } from "react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  imageSrc?: string;
  children?: ReactNode;
}

/** Encabezado oscuro reutilizable para las páginas interiores (carta, fábrica, eventos, etc). */
export function PageHeader({ eyebrow, title, description, imageSrc, children }: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-carbon pb-14 pt-32 sm:min-h-[46vh]">
      <PhotoFrame src={imageSrc} alt={title} className="absolute inset-0" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

      <Container className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl text-warm-white sm:text-5xl md:text-6xl">{title}</h1>
        {description ? <p className="mt-4 max-w-xl text-base text-cream/85 sm:text-lg">{description}</p> : null}
        {children}
        <OrnamentDivider tone="dark" className="mt-8 justify-start" />
      </Container>
    </section>
  );
}
