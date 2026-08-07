import type { Metadata } from "next";
import { PartyPopper, Pizza } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventServiceCard } from "@/components/events/EventServiceCard";
import { EventForm } from "@/components/events/EventForm";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Pizza Party y Pasta Party de Las Pastas de la Nona para cumpleaños, reuniones familiares, empresas y celebraciones.",
  alternates: { canonical: "/eventos" },
};

export default function EventosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Eventos"
        title="La Nona va a tu fiesta"
        description="Llevamos la pasta y la pizza recién hechas adonde estés: cumpleaños, reuniones familiares, eventos de empresa y celebraciones."
      />

      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow="Nuestros servicios" title="Pizza Party y Pasta Party" align="center" className="mx-auto" />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          <EventServiceCard
            icon={Pizza}
            title="Pizza Party"
            description="Pizzas recién horneadas para compartir, pensadas para grupos grandes en cualquier tipo de festejo."
            imageAlt="Pizzas recién horneadas para un Pizza Party"
          />
          <EventServiceCard
            icon={PartyPopper}
            title="Pasta Party"
            description="Nuestras pastas de siempre, servidas con salsas caseras directamente en tu evento."
            imageAlt="Mesa de pastas servida para un Pasta Party"
          />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
          Nuestro servicio de Pizza Party y Pasta Party se adapta a cumpleaños, reuniones familiares, eventos de
          empresas y todo tipo de celebraciones.
        </p>
      </Container>

      <div id="presupuesto" className="scroll-mt-24 bg-cream py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Contanos sobre tu evento" title="Pedí presupuesto" align="center" className="mx-auto" />
          <div className="mx-auto mt-10 max-w-2xl">
            <EventForm />
          </div>
        </Container>
      </div>
    </>
  );
}
