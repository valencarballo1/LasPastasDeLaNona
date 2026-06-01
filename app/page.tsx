import { Footer } from "../src/components/footer/Footer";
import { Hero } from "../src/components/hero/Hero";
import { Menu } from "../src/components/menu/Menu";
import { Services } from "../src/components/services/Services";
import { WeeklyMenu } from "../src/components/weekly/WeeklyMenu";

export default function Home() {
  return (
    <main>
      <Hero />
      <Menu />
      <Services />
      <WeeklyMenu />
      <Footer />
    </main>
  );
}
