"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProducts, updateProduct } from "@/services/product.service";
import type { ProductDto } from "@/types/product";

const productsKey = ["admin", "products"] as const;

export function useAdminProductsQuery() {
  return useQuery({ queryKey: productsKey, queryFn: () => getProducts() });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<ProductDto, "id">) => createProduct(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKey }),
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<ProductDto, "id"> }) => updateProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKey }),
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKey }),
  });
}
