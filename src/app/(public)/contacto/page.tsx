import type { Metadata } from "next";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { getSettings } from "@/services/settings.service";
import { getSiteImageMap } from "@/services/site-image.service";
import { siteConfig } from "@/config/site";
import { whatsAppMessageGeneral } from "@/lib/whatsapp";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { OpeningHours } from "@/components/ui/OpeningHours";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Visitá a ${siteConfig.name} en ${siteConfig.address.full}. Reservá, consultá por WhatsApp o seguinos en Instagram.`,
  alternates: { canonical: "/contacto" },
};

export default async function ContactoPage() {
  const [settings, images] = await Promise.all([getSettings(), getSiteImageMap()]);

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Te esperamos"
        description="Vení a conocernos o escribinos, elegí lo que te resulte más cómodo."
        image={images["page.contacto.header"]}
      />

      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-2xl text-carbon">{siteConfig.name}</h2>

          <p className="mt-5 flex items-start gap-2.5 text-sm text-muted sm:text-base">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}, {siteConfig.address.province}
          </p>

          <div className="mt-6">
            <OpeningHours hours={settings.openingHours} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={siteConfig.maps.directionsUrl} variant="primary" size="md">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Cómo llegar
            </LinkButton>
            <LinkButton href={whatsAppMessageGeneral()} variant="secondary" size="md" className="border-carbon text-carbon hover:bg-carbon hover:text-warm-white">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </LinkButton>
            <LinkButton href={siteConfig.contact.instagramUrl} variant="secondary" size="md" className="border-carbon text-carbon hover:bg-carbon hover:text-warm-white">
              <Instagram className="h-4 w-4" aria-hidden="true" />
              Instagram
            </LinkButton>
          </div>
        </Card>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] shadow-warm lg:aspect-auto lg:h-full">
          <iframe
            title="Ubicación de Las Pastas de la Nona en Google Maps"
            src={settings.googleMapsUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </>
  );
}
