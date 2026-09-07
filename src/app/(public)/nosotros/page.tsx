import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getSiteImageMap } from "@/services/site-image.service";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { Timeline } from "@/components/story/Timeline";
import { Gallery } from "@/components/ui/Gallery";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description: `Conocé la historia de ${siteConfig.name}, una fábrica de pastas familiar en Burzaco desde ${siteConfig.foundingYear}.`,
  alternates: { canonical: "/nosotros" },
};

export default async function NosotrosPage() {
  const images = await getSiteImageMap();
  const familyImages = [
    images["about.gallery.1"],
    images["about.gallery.2"],
    images["about.gallery.3"],
    images["about.gallery.4"],
    images["about.gallery.5"],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Nuestra historia"
        title="La mesa de la Nona"
        description="Una historia familiar contada a través de la pasta, la fábrica y el restaurante."
        image={images["page.nosotros.header"]}
      />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        <SiteImage
          image={images["about.main"]}
          className="aspect-[4/5] w-full rounded-[var(--radius-card)] shadow-warm"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Nuestro origen</p>
          <h2 className="mt-3 font-display text-3xl text-carbon sm:text-4xl">De nuestra familia a tu mesa</h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.name} nació como un proyecto familiar en {siteConfig.foundingYear} con una idea sencilla:
            hacer pasta como se hacía en casa, respetando los sabores, el tiempo y las recetas que pasan de
            generación en generación.
          </p>
        </div>
      </Container>

      <div className="bg-cream py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Línea de tiempo" title="Nuestra historia, paso a paso" />
          <div className="mt-10 max-w-2xl">
            <Timeline />
          </div>
        </Container>
      </div>

      <Container className="py-16 sm:py-20">
        <SectionHeading align="center" eyebrow="Alrededor de la mesa" title="Una historia hecha alrededor de la mesa" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
          Fotos de familia, de la fábrica y de la evolución del restaurante, para que conozcas quiénes están
          detrás de cada plato.
        </p>
        <Gallery images={familyImages} className="mt-12" />
      </Container>
    </>
  );
}
