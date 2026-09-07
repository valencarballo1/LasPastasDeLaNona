import type { ResolvedSiteImage } from "@/services/site-image.service";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Gallery } from "@/components/ui/Gallery";
import { Reveal } from "@/components/ui/Reveal";

export function GallerySection({ images }: { images: ResolvedSiteImage[] }) {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="Así se vive La Nona" title="Un vistazo a nuestro local" />
        <Reveal className="mt-12">
          <Gallery images={images} />
        </Reveal>
      </Container>
    </section>
  );
}
