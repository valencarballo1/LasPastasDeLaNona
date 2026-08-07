import { apiClient } from "@/services/api/api-client";
import { endpoints } from "@/services/api/endpoints";
import type { ProductDto } from "@/types/product";
import type { ProductRepository } from "@/services/repositories/product.repository";

export const apiProductRepository: ProductRepository = {
  getAll: (filters) =>
    apiClient.get<ProductDto[]>(endpoints.products, {
      categoryId: filters?.categoryId,
      featured: filters?.featured,
    }),
  getBySlug: (slug) => apiClient.get<ProductDto>(endpoints.productBySlug(slug)),
  create: (data) => apiClient.post<ProductDto>(endpoints.adminProducts, data),
  update: (id, data) => apiClient.put<ProductDto>(endpoints.adminProduct(id), data),
  remove: (id) => apiClient.delete<void>(endpoints.adminProduct(id)),
};
