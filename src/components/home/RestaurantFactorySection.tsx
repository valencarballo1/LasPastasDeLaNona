import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const worlds = [
  {
    title: "Nuestra fábrica",
    description: "Pastas frescas para cocinar en casa.",
    cta: "Ver productos",
    href: routes.fabrica,
    alt: "Vitrina de pastas frescas de la fábrica",
  },
  {
    title: "Nuestro restaurante",
    description: "Sentate a nuestra mesa y disfrutá la experiencia completa.",
    cta: "Ver carta",
    href: routes.carta,
    alt: "Salón del restaurante con mesas a la espera de comensales",
  },
] as const;

export function RestaurantFactorySection() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="Elegí tu experiencia" title="Dos formas de disfrutar La Nona" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {worlds.map((world, index) => (
            <Reveal key={world.title} delay={index * 100}>
              <Link
                href={world.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-warm"
              >
                <PhotoFrame alt={world.alt} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <h3 className="font-display text-2xl text-warm-white sm:text-3xl">{world.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-cream/85">{world.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold">
                    {world.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
