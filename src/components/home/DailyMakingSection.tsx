import type { ResolvedSiteImage } from "@/services/site-image.service";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Bloque editorial: pasta fresca hecha todos los días en la fábrica. */
export function DailyMakingSection({ image }: { image: ResolvedSiteImage }) {
  const hasPhoto = Boolean(image.src);

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container className={cn("grid items-center gap-12", hasPhoto && "lg:grid-cols-2")}>
        <Reveal className={cn(hasPhoto ? "order-2 lg:order-1" : "mx-auto max-w-2xl text-center")}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Hecho en el día</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-carbon sm:text-4xl">
            Pasta fresca hecha todos los días
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Harina, huevo, tiempo y manos de la familia: así se hace cada bandeja que sale de nuestra fábrica, lista
            para tu mesa o para la nuestra.
          </p>
        </Reveal>

        {hasPhoto ? (
          <Reveal delay={100} className="order-1 lg:order-2">
            <SiteImage
              image={image}
              className="aspect-[4/5] w-full rounded-[var(--radius-card)] shadow-warm"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
