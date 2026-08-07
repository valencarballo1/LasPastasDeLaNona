import type { ProductDto } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function ProductGrid({ products }: { products: ProductDto[] }) {
  if (products.length === 0) {
    return <EmptyState title="Todavía no hay productos cargados" description="Muy pronto vamos a sumar novedades." />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
