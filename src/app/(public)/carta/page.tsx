import type { Metadata } from "next";
import { getMenu } from "@/services/menu.service";
import { getSiteImageMap } from "@/services/site-image.service";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { MenuNavigation } from "@/components/menu/MenuNavigation";
import { MenuCategorySection } from "@/components/menu/MenuCategorySection";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Descubrí la carta de Las Pastas de la Nona: entradas, pastas caseras, milanesas, pizzas, postres y más.",
  alternates: { canonical: "/carta" },
};

export default async function CartaPage() {
  const [menu, images] = await Promise.all([getMenu(), getSiteImageMap()]);

  return (
    <>
      <PageHeader
        eyebrow="Nuestra carta"
        title="Elegí tus pastas"
        description="Recetas de siempre, salsas caseras y comida abundante para compartir en nuestra mesa."
        image={images["page.carta.header"]}
      />

      <MenuNavigation categories={menu.map((category) => ({ slug: category.slug, name: category.name }))} />

      <Container className="pb-20">
        {menu.length > 0 ? (
          menu.map((category) => <MenuCategorySection key={category.id} category={category} />)
        ) : (
          <EmptyState
            title="La carta se está actualizando"
            description="Muy pronto vamos a publicar todos nuestros platos."
            className="my-16"
          />
        )}
      </Container>
    </>
  );
}
