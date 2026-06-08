import { Footer } from "../../src/components/footer/Footer";
import { Menu } from "../../src/components/menu/Menu";
import { PageHeader } from "../../src/components/PageHeader";
import { WeeklyMenu } from "../../src/components/weekly/WeeklyMenu";

export default function RestaurantMenuPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Restaurante"
        title="Menú del restaurante"
        subtitle="La carta del salón con pastas caseras, salsas de la Nona y opciones para sentarse a comer como en casa."
      />
      <Menu />
      <WeeklyMenu />
      <Footer />
    </main>
  );
}
