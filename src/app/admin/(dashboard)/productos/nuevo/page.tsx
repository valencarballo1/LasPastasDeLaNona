"use client";

import { useAdminCategoriesQuery } from "@/features/categories/use-admin-categories";
import { useCreateProductMutation } from "@/features/products/use-admin-products";
import type { ProductFormValues } from "@/lib/validations/product";
import { ProductForm } from "@/components/admin/ProductForm";
import { LoadingState } from "@/components/ui/LoadingState";

export default function NuevoProductoPage() {
  const categoriesQuery = useAdminCategoriesQuery();
  const createProductMutation = useCreateProductMutation();

  if (categoriesQuery.isPending) return <LoadingState label="Cargando..." />;

  async function handleSubmit(values: ProductFormValues) {
    await createProductMutation.mutateAsync({
      name: values.name,
      slug: values.slug,
      description: values.description || undefined,
      categoryId: values.categoryId,
      price: values.price === "" || values.price === undefined ? null : values.price,
      unit: values.unit || undefined,
      imageUrl: values.imageUrl || undefined,
      available: values.available,
      featured: values.featured,
      active: values.active,
      sortOrder: values.sortOrder,
    });
  }

  return <ProductForm categories={categoriesQuery.data ?? []} onSubmit={handleSubmit} />;
}
