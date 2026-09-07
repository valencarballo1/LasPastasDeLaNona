"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus } from "lucide-react";
import {
  useAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/features/categories/use-admin-categories";
import type { CategoryDto } from "@/types/category";
import type { CategoryFormValues } from "@/lib/validations/category";
import { withoutId } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AdminTable, AdminTableHead } from "@/components/admin/AdminTable";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function AdminCategoriasPage() {
  const categoriesQuery = useAdminCategoriesQuery();
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();
  const [editing, setEditing] = useState<CategoryDto | "new" | null>(null);

  async function handleSubmit(values: CategoryFormValues) {
    const payload = {
      name: values.name,
      slug: values.slug,
      description: values.description || undefined,
      type: values.type,
      sortOrder: values.sortOrder,
      active: values.active,
    };

    if (editing === "new") {
      await createCategoryMutation.mutateAsync(payload);
    } else if (editing) {
      await updateCategoryMutation.mutateAsync({ id: editing.id, data: payload });
    }
    setEditing(null);
  }

  function toggleActive(category: CategoryDto) {
    updateCategoryMutation.mutate({
      id: category.id,
      data: { ...withoutId(category), active: !category.active },
    });
  }

  function move(category: CategoryDto, direction: -1 | 1) {
    updateCategoryMutation.mutate({
      id: category.id,
      data: { ...withoutId(category), sortOrder: Math.max(0, category.sortOrder + direction) },
    });
  }

  if (categoriesQuery.isPending) return <LoadingState label="Cargando categorías..." />;
  if (categoriesQuery.isError) return <ErrorState onRetry={() => categoriesQuery.refetch()} />;

  const categories = categoriesQuery.data ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{categories.length} categorías</p>
          <Button variant="primary" size="md" onClick={() => setEditing("new")}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Nueva categoría
          </Button>
        </div>

        <AdminTable>
          <AdminTableHead columns={["Nombre", "Tipo", "Orden", "Estado", "Acciones"]} />
          <tbody className="divide-y divide-slate-100">
            {[...categories]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3 font-medium text-slate-800">{category.name}</td>
                  <td className="px-4 py-3 text-slate-500">{category.type === "RESTAURANT" ? "Restaurante" : "Fábrica"}</td>
                  <td className="px-4 py-3 text-slate-500">
                    <div className="flex items-center gap-1">
                      {category.sortOrder}
                      <button type="button" onClick={() => move(category, -1)} aria-label="Subir orden" className="rounded p-1 hover:bg-slate-100">
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => move(category, 1)} aria-label="Bajar orden" className="rounded p-1 hover:bg-slate-100">
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => toggleActive(category)}>
                      <Badge tone={category.active ? "success" : "warning"}>{category.active ? "Activa" : "Inactiva"}</Badge>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setEditing(category)}
                      aria-label={`Editar ${category.name}`}
                      className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </AdminTable>
      </div>

      {editing ? (
        <Card className="h-fit p-6">
          <h2 className="font-semibold text-slate-900">{editing === "new" ? "Nueva categoría" : `Editar ${editing.name}`}</h2>
          <div className="mt-4">
            <CategoryForm
              category={editing === "new" ? undefined : editing}
              onSubmit={handleSubmit}
              onCancel={() => setEditing(null)}
            />
          </div>
        </Card>
      ) : null}
    </div>
  );
}
