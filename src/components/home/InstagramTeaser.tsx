import { Instagram } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

export function InstagramTeaser() {
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
          {Array.from({ length: 6 }).map((_, index) => (
            <PhotoFrame key={index} alt="Publicación de Instagram de Las Pastas de la Nona" className="aspect-square rounded-md" />
          ))}
        </div>
      </Container>
    </section>
  );
}
