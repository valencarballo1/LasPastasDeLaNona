import { Footer } from "../src/components/Footer";
import { Hero } from "../src/components/Hero";
import { MenuBoard } from "../src/components/MenuBoard";
import { Services } from "../src/components/Services";
import { WeeklyMenu } from "../src/components/WeeklyMenu";

export default function Home() {
  return (
    <main>
      <Hero />
      <MenuBoard />
      <Services />
      <WeeklyMenu />
      <Footer />
    </main>
  );
}
