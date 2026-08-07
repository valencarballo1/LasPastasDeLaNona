"use client";

import { useParams } from "next/navigation";
import { useAdminCategoriesQuery } from "@/features/categories/use-admin-categories";
import { useAdminProductsQuery, useUpdateProductMutation } from "@/features/products/use-admin-products";
import type { ProductFormValues } from "@/lib/validations/product";
import { ProductForm } from "@/components/admin/ProductForm";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";

export default function EditarProductoPage() {
  const params = useParams<{ id: string }>();
  const categoriesQuery = useAdminCategoriesQuery();
  const productsQuery = useAdminProductsQuery();
  const updateProductMutation = useUpdateProductMutation();

  if (categoriesQuery.isPending || productsQuery.isPending) return <LoadingState label="Cargando producto..." />;

  const product = productsQuery.data?.find((item) => String(item.id) === params.id);
  if (!product) return <EmptyState title="Producto no encontrado" />;
  const productId = product.id;

  async function handleSubmit(values: ProductFormValues) {
    await updateProductMutation.mutateAsync({
      id: productId,
      data: {
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
      },
    });
  }

  return <ProductForm categories={categoriesQuery.data ?? []} product={product} onSubmit={handleSubmit} />;
}
