import { categoryRepository, productRepository } from "@/services/repositories";
import type { MenuCategoryWithProducts } from "@/types/menu";

async function getCategoriesWithProducts(type: "RESTAURANT" | "FACTORY"): Promise<MenuCategoryWithProducts[]> {
  const categories = await categoryRepository.getAll(type);
  const activeCategories = categories.filter((category) => category.active);

  const withProducts = await Promise.all(
    activeCategories.map(async (category) => ({
      ...category,
      products: (await productRepository.getAll({ categoryId: category.id })).filter((product) => product.active),
    })),
  );

  return withProducts.sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Carta del restaurante, agrupada por categoría (para /carta). */
export function getMenu() {
  return getCategoriesWithProducts("RESTAURANT");
}

/** Catálogo de la fábrica, agrupado por categoría (para /fabrica). */
export function getFactoryCatalog() {
  return getCategoriesWithProducts("FACTORY");
}
