import type { Metadata } from "next";
import { getFactoryCatalog } from "@/services/menu.service";
import { getSiteImageMap } from "@/services/site-image.service";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";

export const metadata: Metadata = {
  title: "Fábrica de pastas",
  description: "Pastas frescas para llevar a tu casa: ravioles, sorrentinos, ñoquis, tallarines, canelones y más.",
  alternates: { canonical: "/fabrica" },
};

export default async function FabricaPage() {
  const [catalog, images] = await Promise.all([getFactoryCatalog(), getSiteImageMap()]);

  return (
    <>
      <PageHeader
        eyebrow="Nuestra fábrica"
        title="Pasta fresca para llevar a tu mesa"
        description="Elaboramos todos los días las mismas pastas que servimos en el restaurante, listas para cocinar en tu casa."
        image={images["page.fabrica.header"]}
      />

      <Container className="py-16 sm:py-20">
        {catalog.length > 0 ? (
          <div className="flex flex-col gap-16">
            {catalog.map((category) => (
              <section key={category.id}>
                <h2 className="font-display text-2xl text-carbon sm:text-3xl">{category.name}</h2>
                {category.description ? <p className="mt-2 max-w-2xl text-sm text-muted">{category.description}</p> : null}
                <OrnamentDivider className="my-6 justify-start" />
                <ProductGrid products={category.products} />
              </section>
            ))}
          </div>
        ) : (
          <EmptyState
            title="El catálogo se está actualizando"
            description="Muy pronto vamos a publicar todos nuestros productos."
          />
        )}
      </Container>
    </>
  );
}
