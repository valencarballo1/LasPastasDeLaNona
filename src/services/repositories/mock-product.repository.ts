import { mockProducts } from "@/mocks/products.mock";
import type { ProductDto } from "@/types/product";
import type { ProductRepository } from "@/services/repositories/product.repository";

let products: ProductDto[] = [...mockProducts];
let nextId = Math.max(...products.map((p) => p.id)) + 1;

export const mockProductRepository: ProductRepository = {
  async getAll(filters) {
    let items = products;
    if (filters?.categoryId !== undefined) items = items.filter((p) => p.categoryId === filters.categoryId);
    if (filters?.featured !== undefined) items = items.filter((p) => p.featured === filters.featured);
    return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getBySlug(slug) {
    return products.find((p) => p.slug === slug) ?? null;
  },

  async create(data) {
    const created: ProductDto = { ...data, id: nextId++ };
    products = [...products, created];
    return created;
  },

  async update(id, data) {
    const existing = products.find((p) => p.id === id);
    if (!existing) throw new Error(`Producto ${id} no encontrado`);
    const updated = { ...existing, ...data };
    products = products.map((p) => (p.id === id ? updated : p));
    return updated;
  },

  async remove(id) {
    products = products.filter((p) => p.id !== id);
  },
};
