import type { Metadata } from "next";
import { getSiteImageMap } from "@/services/site-image.service";
import { Hero } from "@/components/home/Hero";
import { QuickAccess } from "@/components/home/QuickAccess";
import { FeaturedMenuSection } from "@/components/home/FeaturedMenuSection";
import { RestaurantFactorySection } from "@/components/home/RestaurantFactorySection";
import { StorySection } from "@/components/home/StorySection";
import { DailyMakingSection } from "@/components/home/DailyMakingSection";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { GallerySection } from "@/components/home/GallerySection";
import { LocationTeaser } from "@/components/home/LocationTeaser";
import { InstagramTeaser } from "@/components/home/InstagramTeaser";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Orden pensado para el cliente, no para el relato de la marca: primero
 * qué puede hacer acá (accesos rápidos), después qué vendemos (carta y
 * fábrica), y recién ahí la historia. Las secciones que dependen de fotos
 * todavía no cargadas se adaptan o no se muestran, para no dejar huecos.
 *
 * Las imágenes editables se piden una sola vez y bajan por props a cada
 * sección (ver src/constants/site-images.ts y /admin/imagenes).
 */
export default async function HomePage() {
  const images = await getSiteImageMap();

  return (
    <>
      <Hero image={images["home.hero"]} />
      <QuickAccess />
      <FeaturedMenuSection />
      <RestaurantFactorySection
        factoryImage={images["home.worlds.factory"]}
        restaurantImage={images["home.worlds.restaurant"]}
      />
      <StorySection image={images["home.story"]} />
      <DailyMakingSection image={images["home.daily-making"]} />
      <EventsTeaser image={images["home.events-teaser"]} />
      <GallerySection
        images={[
          images["home.gallery.1"],
          images["home.gallery.2"],
          images["home.gallery.3"],
          images["home.gallery.4"],
          images["home.gallery.5"],
        ]}
      />
      <LocationTeaser />
      <InstagramTeaser
        images={[
          images["home.instagram.1"],
          images["home.instagram.2"],
          images["home.instagram.3"],
          images["home.instagram.4"],
          images["home.instagram.5"],
          images["home.instagram.6"],
        ]}
      />
    </>
  );
}
