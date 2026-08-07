import { productRepository } from "@/services/repositories";
import type { ProductFilters } from "@/services/repositories/product.repository";

export function getProducts(filters?: ProductFilters) {
  return productRepository.getAll(filters);
}

export function getProduct(slug: string) {
  return productRepository.getBySlug(slug);
}

export function createProduct(...args: Parameters<typeof productRepository.create>) {
  return productRepository.create(...args);
}

export function updateProduct(...args: Parameters<typeof productRepository.update>) {
  return productRepository.update(...args);
}

export function deleteProduct(id: number) {
  return productRepository.remove(id);
}
