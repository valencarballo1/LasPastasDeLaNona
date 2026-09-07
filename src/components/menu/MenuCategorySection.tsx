import type { MenuCategoryWithProducts } from "@/types/menu";
import { MenuItem } from "@/components/menu/MenuItem";
import { EmptyState } from "@/components/ui/EmptyState";

export function MenuCategorySection({ category }: { category: MenuCategoryWithProducts }) {
  return (
    <section id={category.slug} className="scroll-mt-32 py-10">
      <h2 className="font-display text-2xl text-carbon sm:text-3xl">{category.name}</h2>
      {category.description ? <p className="mt-2 max-w-2xl text-sm text-muted">{category.description}</p> : null}

      <div className="mt-4">
        {category.products.length > 0 ? (
          category.products.map((product) => <MenuItem key={product.id} product={product} />)
        ) : (
          <EmptyState title="Sin productos por ahora" description="Estamos actualizando esta categoría." />
        )}
      </div>
    </section>
  );
}
