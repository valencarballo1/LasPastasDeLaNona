import { mockCategories } from "@/mocks/categories.mock";
import type { CategoryDto, CategoryType } from "@/types/category";
import type { CategoryRepository } from "@/services/repositories/category.repository";

// Copia mutable en memoria: permite simular altas/bajas desde el admin
// mientras no existe el backend, sin persistir entre reinicios del server.
let categories: CategoryDto[] = [...mockCategories];
let nextId = Math.max(...categories.map((c) => c.id)) + 1;

export const mockCategoryRepository: CategoryRepository = {
  async getAll(type) {
    const items = type ? categories.filter((c) => c.type === type) : categories;
    return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getById(id) {
    return categories.find((c) => c.id === id) ?? null;
  },

  async create(data) {
    const created: CategoryDto = { ...data, id: nextId++ };
    categories = [...categories, created];
    return created;
  },

  async update(id, data) {
    const existing = categories.find((c) => c.id === id);
    if (!existing) throw new Error(`Categoría ${id} no encontrada`);
    const updated = { ...existing, ...data };
    categories = categories.map((c) => (c.id === id ? updated : c));
    return updated;
  },

  async remove(id) {
    categories = categories.filter((c) => c.id !== id);
  },
};
