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
        subtitle="Una vista dedicada para la propuesta del salón: pasta libre, pastas de la casa, salsas y destacados para actualizar sin saturar el inicio."
      />
      <Menu />
      <WeeklyMenu />
      <Footer />
    </main>
  );
}
