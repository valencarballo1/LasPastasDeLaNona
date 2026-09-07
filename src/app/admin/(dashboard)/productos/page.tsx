"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminCategoriesQuery } from "@/features/categories/use-admin-categories";
import { useAdminProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from "@/features/products/use-admin-products";
import type { ProductDto } from "@/types/product";
import { routes } from "@/constants/routes";
import { formatPrice } from "@/lib/format";
import { withoutId } from "@/lib/utils";
import { LinkButton, Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AdminTable, AdminTableHead } from "@/components/admin/AdminTable";
import { AdminThumbnail } from "@/components/admin/AdminThumbnail";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function AdminProductosPage() {
  const productsQuery = useAdminProductsQuery();
  const categoriesQuery = useAdminCategoriesQuery();
  const updateProductMutation = useUpdateProductMutation();
  const deleteProductMutation = useDeleteProductMutation();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [photoFilter, setPhotoFilter] = useState("all");
  const [toDelete, setToDelete] = useState<ProductDto | null>(null);

  const categories = categoriesQuery.data ?? [];
  const categoryName = (id: number) => categories.find((c) => c.id === id)?.name ?? "—";

  const filtered = useMemo(() => {
    return (productsQuery.data ?? []).filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.categoryId === Number(categoryFilter);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && product.active) ||
        (statusFilter === "inactive" && !product.active) ||
        (statusFilter === "unavailable" && !product.available);
      const matchesPhoto =
        photoFilter === "all" ||
        (photoFilter === "with" && Boolean(product.imageUrl)) ||
        (photoFilter === "without" && !product.imageUrl);
      return matchesSearch && matchesCategory && matchesStatus && matchesPhoto;
    });
  }, [productsQuery.data, search, categoryFilter, statusFilter, photoFilter]);

  async function confirmDelete() {
    if (!toDelete) return;
    await deleteProductMutation.mutateAsync(toDelete.id);
    setToDelete(null);
  }

  if (productsQuery.isPending || categoriesQuery.isPending) return <LoadingState label="Cargando productos..." />;
  if (productsQuery.isError) return <ErrorState onRetry={() => productsQuery.refetch()} />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <Input
            placeholder="Buscar producto..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-56"
          />
          <Select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="w-48">
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="w-44">
            <option value="all">Todos los estados</option>
            <option value="active">Publicados</option>
            <option value="inactive">Fuera de la carta</option>
            <option value="unavailable">Sin stock</option>
          </Select>
          <Select value={photoFilter} onChange={(event) => setPhotoFilter(event.target.value)} className="w-40">
            <option value="all">Con y sin foto</option>
            <option value="without">Sin foto</option>
            <option value="with">Con foto</option>
          </Select>
        </div>

        <LinkButton href={routes.admin.productoNuevo} variant="primary" size="md">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo producto
        </LinkButton>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No encontramos platos" description="Probá con otro filtro o creá uno nuevo." />
      ) : (
        <AdminTable>
          <AdminTableHead columns={["Foto", "Plato", "Categoría", "Precio", "Stock", "Destacado", "En la carta", "Acciones"]} />
          <tbody className="divide-y divide-slate-100">
            {filtered.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <AdminThumbnail src={product.imageUrl} alt={product.name} />
                </td>
                <td className="px-4 py-3 font-medium text-slate-800">{product.name}</td>
                <td className="px-4 py-3 text-slate-500">{categoryName(product.categoryId)}</td>
                <td className="px-4 py-3 text-slate-500">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    title={product.available ? "Marcar sin stock" : "Marcar con stock"}
                    onClick={() =>
                      updateProductMutation.mutate({
                        id: product.id,
                        data: { ...withoutId(product), available: !product.available },
                      })
                    }
                  >
                    <Badge tone={product.available ? "success" : "warning"} className="whitespace-nowrap">
                      {product.available ? "Con stock" : "Sin stock"}
                    </Badge>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={product.featured ? "gold" : "muted"}>{product.featured ? "Sí" : "No"}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={product.active ? "success" : "muted"}>{product.active ? "Publicado" : "Oculto"}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Link
                      href={routes.admin.productoEditar(product.id)}
                      aria-label={`Editar ${product.name}`}
                      className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="md"
                      className="whitespace-nowrap px-2 py-1 text-xs"
                      title={product.active ? "Sacarlo de la carta sin borrarlo" : "Volver a publicarlo en la carta"}
                      onClick={() =>
                        updateProductMutation.mutate({
                          id: product.id,
                          data: { ...withoutId(product), active: !product.active },
                        })
                      }
                    >
                      {product.active ? "Quitar de la carta" : "Publicar"}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setToDelete(product)}
                      aria-label={`Eliminar ${product.name}`}
                      className="rounded-md p-2 text-slate-500 hover:bg-red/10 hover:text-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title={`¿Eliminar "${toDelete?.name}"?`}
        description="Se borra el plato para siempre. Si solo querés sacarlo de la carta por un tiempo, usá “Quitar de la carta”."
        confirmLabel="Eliminar"
        destructive
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
