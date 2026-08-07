import { apiClient } from "@/services/api/api-client";
import { endpoints } from "@/services/api/endpoints";
import type { CategoryDto } from "@/types/category";
import type { CategoryRepository } from "@/services/repositories/category.repository";

export const apiCategoryRepository: CategoryRepository = {
  getAll: (type) => apiClient.get<CategoryDto[]>(endpoints.categories, { type }),
  getById: (id) => apiClient.get<CategoryDto>(endpoints.adminCategory(id)),
  create: (data) => apiClient.post<CategoryDto>(endpoints.adminCategories, data),
  update: (id, data) => apiClient.put<CategoryDto>(endpoints.adminCategory(id), data),
  remove: (id) => apiClient.delete<void>(endpoints.adminCategory(id)),
};
