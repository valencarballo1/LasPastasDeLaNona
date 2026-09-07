"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategories, updateCategory } from "@/services/category.service";
import type { CategoryDto } from "@/types/category";

const categoriesKey = ["admin", "categories"] as const;

export function useAdminCategoriesQuery() {
  return useQuery({ queryKey: categoriesKey, queryFn: () => getCategories() });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<CategoryDto, "id">) => createCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoriesKey }),
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<CategoryDto, "id"> }) => updateCategory(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoriesKey }),
  });
}
