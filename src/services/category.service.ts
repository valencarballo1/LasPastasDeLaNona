import { categoryRepository } from "@/services/repositories";
import type { CategoryType } from "@/types/category";

export function getCategories(type?: CategoryType) {
  return categoryRepository.getAll(type);
}

export function getCategory(id: number) {
  return categoryRepository.getById(id);
}

export function createCategory(...args: Parameters<typeof categoryRepository.create>) {
  return categoryRepository.create(...args);
}

export function updateCategory(...args: Parameters<typeof categoryRepository.update>) {
  return categoryRepository.update(...args);
}

export function deleteCategory(id: number) {
  return categoryRepository.remove(id);
}
