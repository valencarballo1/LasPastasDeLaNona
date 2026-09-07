import { MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";
import { whatsAppMessageGeneral } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function LocationTeaser() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Dónde estamos</p>
          <h2 className="mt-3 font-display text-3xl text-carbon sm:text-4xl">Te esperamos en Burzaco</h2>
          <p className="mt-4 flex items-center gap-2 text-base text-muted">
            <MapPin className="h-5 w-5 text-red" aria-hidden="true" />
            {siteConfig.address.full}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href={siteConfig.maps.directionsUrl} variant="primary" size="md">
              Cómo llegar
            </LinkButton>
            <LinkButton href={whatsAppMessageGeneral()} variant="secondary" size="md" className="border-carbon text-carbon hover:bg-carbon hover:text-warm-white">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </LinkButton>
            <LinkButton href={routes.contacto} variant="ghost" size="md">
              Ver todos los datos →
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] shadow-warm">
            <iframe
              title="Ubicación de Las Pastas de la Nona en Google Maps"
              src={siteConfig.maps.embedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
