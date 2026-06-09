import { Footer } from "../../src/components/footer/Footer";
import { Menu } from "../../src/components/menu/Menu";
import { PageHeader } from "../../src/components/PageHeader";
import { WeeklyMenu } from "../../src/components/weekly/WeeklyMenu";

export default function RestaurantMenuPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Restaurante"
        title="Menú para escanear en la mesa"
        subtitle="Una carta pensada para QR: categorías siempre visibles, lectura cómoda desde el celular y platos organizados para encontrar rápido qué pedir."
      />
      <Menu />
      <WeeklyMenu />
      <Footer />
    </main>
  );
}
