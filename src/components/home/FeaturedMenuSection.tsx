import { getProducts } from "@/services/product.service";
import { routes } from "@/constants/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Reveal } from "@/components/ui/Reveal";

export async function FeaturedMenuSection() {
  const featured = (await getProducts({ featured: true })).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Pasta fresca hecha todos los días" title="De lo mejor de nuestra carta" />
          <LinkButton href={routes.carta} variant="ghost" size="md" className="px-0">
            Ver carta completa →
          </LinkButton>
        </div>

        <Reveal className="mt-12">
          <ProductGrid products={featured} />
        </Reveal>
      </Container>
    </section>
  );
}
