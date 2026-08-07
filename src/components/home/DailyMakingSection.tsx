import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Bloque editorial: pasta fresca hecha todos los días en la fábrica. */
export function DailyMakingSection() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Hecho en el día</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-carbon sm:text-4xl">
            Pasta fresca hecha todos los días
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Harina, huevo, tiempo y manos de la familia: así se hace cada bandeja que sale de nuestra fábrica, lista
            para tu mesa o para la nuestra.
          </p>
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <PhotoFrame
            alt="Manos amasando pasta fresca en la fábrica de La Nona"
            className="aspect-[4/5] w-full rounded-[var(--radius-card)] shadow-warm"
          />
        </Reveal>
      </Container>
    </section>
  );
}
