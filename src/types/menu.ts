import type { CategoryDto } from "@/types/category";
import type { ProductDto } from "@/types/product";

export interface MenuCategoryWithProducts extends CategoryDto {
  products: ProductDto[];
}
