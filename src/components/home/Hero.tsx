import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";
import type { ResolvedSiteImage } from "@/services/site-image.service";
import { LinkButton } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Hero({ image }: { image: ResolvedSiteImage }) {
  // Con foto, el texto se apoya abajo y el velo oscuro le da contraste.
  // Sin foto, se centra y el velo se suaviza: si no, queda un tercio de
  // pantalla vacío sobre un rectángulo plano.
  const hasPhoto = Boolean(image.src);

  return (
    <section
      className={cn(
        "relative flex overflow-hidden bg-carbon",
        hasPhoto ? "min-h-[100svh] items-end" : "min-h-[72svh] items-center",
      )}
    >
      <SiteImage image={image} className="absolute inset-0" priority placeholderIcon={false} />
      <div
        className={cn(
          "absolute inset-0",
          hasPhoto
            ? "bg-gradient-to-t from-black via-black/60 to-black/20"
            : "bg-gradient-to-t from-black/70 via-transparent to-black/40",
        )}
      />

      <Container className={cn("relative z-10", hasPhoto ? "pb-20 pt-40 sm:pb-24" : "pb-16 pt-32")}>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          Desde {siteConfig.foundingYear} en Burzaco
        </p>

        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-warm-white sm:text-6xl md:text-7xl">
          Las Pastas de la Nona
        </h1>

        <p className="mt-5 max-w-xl font-display text-2xl text-cream sm:text-3xl">{siteConfig.tagline}</p>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
          Desde {siteConfig.foundingYear} llevando a la mesa de Burzaco el sabor de la pasta hecha como en casa.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <LinkButton href={routes.carta} variant="primary" size="lg">
            Ver la carta
          </LinkButton>
          <LinkButton href={routes.nosotros} variant="secondary" size="lg">
            Conocé nuestra historia
          </LinkButton>
        </div>

        <p className="mt-10 inline-flex items-center gap-2 text-sm text-cream/70">
          <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
          {siteConfig.address.street} · {siteConfig.address.city}
        </p>
      </Container>
    </section>
  );
}
