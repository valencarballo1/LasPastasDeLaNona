import type { Metadata } from "next";
import { getSiteImageMap } from "@/services/site-image.service";
import { Hero } from "@/components/home/Hero";
import { StorySection } from "@/components/home/StorySection";
import { RestaurantFactorySection } from "@/components/home/RestaurantFactorySection";
import { FeaturedMenuSection } from "@/components/home/FeaturedMenuSection";
import { DailyMakingSection } from "@/components/home/DailyMakingSection";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { GallerySection } from "@/components/home/GallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LocationTeaser } from "@/components/home/LocationTeaser";
import { InstagramTeaser } from "@/components/home/InstagramTeaser";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  // Las imágenes editables se piden una sola vez y bajan por props a cada
  // sección (ver src/constants/site-images.ts y /admin/imagenes).
  const images = await getSiteImageMap();

  return (
    <>
      <Hero image={images["home.hero"]} />
      <StorySection image={images["home.story"]} />
      <RestaurantFactorySection
        factoryImage={images["home.worlds.factory"]}
        restaurantImage={images["home.worlds.restaurant"]}
      />
      <FeaturedMenuSection />
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
      <TestimonialsSection />
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
