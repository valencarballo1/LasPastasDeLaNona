import type { ProductDto } from "@/types/product";

export interface ProductFilters {
  categoryId?: number;
  featured?: boolean;
}

export interface ProductRepository {
  getAll(filters?: ProductFilters): Promise<ProductDto[]>;
  getBySlug(slug: string): Promise<ProductDto | null>;
  create(data: Omit<ProductDto, "id">): Promise<ProductDto>;
  /** PUT: reemplaza el producto completo (no acepta parciales). */
  update(id: number, data: Omit<ProductDto, "id">): Promise<ProductDto>;
  remove(id: number): Promise<void>;
}
