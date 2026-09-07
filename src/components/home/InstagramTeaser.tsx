import { Instagram } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { ResolvedSiteImage } from "@/services/site-image.service";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";

export function InstagramTeaser({ images }: { images: ResolvedSiteImage[] }) {
  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <Container className="text-center">
        <a
          href={siteConfig.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-nona inline-flex items-center gap-2 font-display text-2xl text-carbon hover:text-red"
        >
          <Instagram className="h-6 w-6 text-red" aria-hidden="true" />
          {siteConfig.contact.instagramHandle}
        </a>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Seguinos para ver el día a día de la fábrica, el restaurante y la familia detrás de La Nona.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-6">
          {images.map((image) => (
            <SiteImage key={image.key} image={image} className="aspect-square rounded-md" sizes="(min-width: 640px) 128px, 33vw" />
          ))}
        </div>
      </Container>
    </section>
  );
}
