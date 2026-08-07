import { routes } from "@/constants/routes";
import { LinkButton } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Container } from "@/components/ui/Container";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { Reveal } from "@/components/ui/Reveal";

export function EventsTeaser() {
  return (
    <section className="relative overflow-hidden bg-carbon py-20 sm:py-28">
      <PhotoFrame alt="Mesa preparada para un Pizza Party de La Nona" className="absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-carbon/90 to-carbon" />

      <Container className="relative z-10 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Pizza Party · Pasta Party</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl text-warm-white sm:text-4xl md:text-5xl">
            La Nona va a tu fiesta
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Cumpleaños, reuniones familiares, empresas y celebraciones: llevamos la pasta y la pizza recién hechas
            adonde estés.
          </p>
          <OrnamentDivider tone="dark" className="my-8" />
          <LinkButton href={routes.eventos} variant="primary" size="lg">
            Pedir presupuesto
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
