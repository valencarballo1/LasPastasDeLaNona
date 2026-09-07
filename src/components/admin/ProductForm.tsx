"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { productSchema, type ProductFormValues } from "@/lib/validations/product";
import type { CategoryDto } from "@/types/category";
import type { ProductDto } from "@/types/product";
import { routes } from "@/constants/routes";
import { FormField } from "@/components/ui/FormField";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface ProductFormProps {
  categories: CategoryDto[];
  product?: ProductDto;
  onSubmit: (values: ProductFormValues) => Promise<void>;
}

export function ProductForm({ categories, product, onSubmit }: ProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      description: product?.description ?? "",
      categoryId: product?.categoryId ?? categories[0]?.id,
      price: product?.price ?? "",
      unit: product?.unit ?? "",
      imageUrl: product?.imageUrl ?? "",
      available: product?.available ?? true,
      featured: product?.featured ?? false,
      active: product?.active ?? true,
      sortOrder: product?.sortOrder ?? 0,
    },
  });

  // Solo para el texto alternativo de la vista previa de la imagen.
  const name = useWatch({ control, name: "name" });

  const submit = handleSubmit(async (values) => {
    setError(null);
    try {
      await onSubmit(values);
      router.push(routes.admin.productos);
      router.refresh();
    } catch {
      setError("No pudimos guardar el producto. Probá de nuevo.");
    }
  });

  return (
    <Card className="p-6 sm:p-8">
      <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate>
        <FormField label="Nombre" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" {...register("name")} />
        </FormField>

        <FormField label="Slug" htmlFor="slug" required error={errors.slug?.message} hint="ej: ravioles-de-la-nona">
          <Input id="slug" {...register("slug")} />
        </FormField>

        <FormField label="Categoría" htmlFor="categoryId" required error={errors.categoryId?.message}>
          <Select id="categoryId" {...register("categoryId")}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.type === "RESTAURANT" ? "Carta" : "Fábrica"})
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Precio" htmlFor="price" error={errors.price?.message} hint="Vacío = &quot;Consultar&quot;">
          <Input id="price" type="number" step="0.01" {...register("price")} />
        </FormField>

        <FormField label="Unidad de venta" htmlFor="unit" error={errors.unit?.message} hint="ej: bandeja x 1kg">
          <Input id="unit" {...register("unit")} />
        </FormField>

        <FormField label="Orden" htmlFor="sortOrder" required error={errors.sortOrder?.message}>
          <Input id="sortOrder" type="number" {...register("sortOrder")} />
        </FormField>

        <fieldset className="flex flex-col gap-1.5 sm:col-span-2">
          <legend className="text-sm font-semibold text-carbon">Imagen del plato</legend>
          {/* La subida es asincrónica y devuelve la URL final, así que el campo
              se controla con Controller en vez de registrarse como input. */}
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <ImageUploadField
                value={field.value || undefined}
                onChange={(url) => field.onChange(url ?? "")}
                previewAlt={name?.trim() || "Imagen del plato"}
                aspect="4 / 3"
                disabled={isSubmitting}
                hint="Se ve en la carta, en el catálogo de la fábrica y en la página del plato."
              />
            )}
          />
          {errors.imageUrl?.message ? (
            <p role="alert" className="text-xs font-medium text-red">
              {errors.imageUrl.message}
            </p>
          ) : null}
        </fieldset>

        <FormField label="Descripción" htmlFor="description" error={errors.description?.message} className="sm:col-span-2">
          <Textarea id="description" {...register("description")} />
        </FormField>

        <div className="flex flex-col gap-3 sm:col-span-2">
          <div className="flex flex-wrap gap-6">
            <Checkbox id="available" label="Con stock" {...register("available")} />
            <Checkbox id="featured" label="Destacado" {...register("featured")} />
            <Checkbox id="active" label="Publicado en la carta" {...register("active")} />
          </div>
          <p className="text-xs text-muted">
            Sin stock: se muestra igual, marcado como no disponible. Sin publicar: sale de la carta y de la web,
            pero el plato se conserva para volver a publicarlo cuando quieras.
          </p>
        </div>

        {error ? (
          <p role="alert" className="text-sm text-red sm:col-span-2">
            {error}
          </p>
        ) : null}

        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar producto"}
          </Button>
          <Button type="button" variant="ghost" size="md" onClick={() => router.push(routes.admin.productos)}>
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
}
