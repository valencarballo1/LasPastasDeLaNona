import type { Metadata } from "next";
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <StorySection />
      <RestaurantFactorySection />
      <FeaturedMenuSection />
      <DailyMakingSection />
      <EventsTeaser />
      <GallerySection />
      <TestimonialsSection />
      <LocationTeaser />
      <InstagramTeaser />
    </>
  );
}
