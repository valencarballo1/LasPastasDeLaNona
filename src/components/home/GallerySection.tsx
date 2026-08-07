import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Gallery } from "@/components/ui/Gallery";
import { Reveal } from "@/components/ui/Reveal";

const images = [
  { alt: "Salón del restaurante de Las Pastas de la Nona" },
  { alt: "Mesa con mantel a cuadros y velas encendidas" },
  { alt: "Elaboración artesanal de pasta fresca" },
  { alt: "Vitrina de la fábrica con productos del día" },
  { alt: "Detalle de la cartelería vintage del local" },
];

export function GallerySection() {
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
