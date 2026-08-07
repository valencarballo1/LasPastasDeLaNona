"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { categorySchema, type CategoryFormValues } from "@/lib/validations/category";
import type { CategoryDto } from "@/types/category";
import { FormField } from "@/components/ui/FormField";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

interface CategoryFormProps {
  category?: CategoryDto;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      type: category?.type ?? "RESTAURANT",
      sortOrder: category?.sortOrder ?? 0,
      active: category?.active ?? true,
    },
  });

  const submit = handleSubmit(async (values) => {
    setError(null);
    try {
      await onSubmit(values);
    } catch {
      setError("No pudimos guardar la categoría. Probá de nuevo.");
    }
  });

  return (
    <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
      <FormField label="Nombre" htmlFor="cat-name" required error={errors.name?.message}>
        <Input id="cat-name" {...register("name")} />
      </FormField>

      <FormField label="Slug" htmlFor="cat-slug" required error={errors.slug?.message}>
        <Input id="cat-slug" {...register("slug")} />
      </FormField>

      <FormField label="Tipo" htmlFor="cat-type" required error={errors.type?.message}>
        <Select id="cat-type" {...register("type")}>
          <option value="RESTAURANT">Restaurante (carta)</option>
          <option value="FACTORY">Fábrica (para llevar)</option>
        </Select>
      </FormField>

      <FormField label="Orden" htmlFor="cat-order" required error={errors.sortOrder?.message}>
        <Input id="cat-order" type="number" {...register("sortOrder")} />
      </FormField>

      <FormField label="Descripción" htmlFor="cat-description" error={errors.description?.message}>
        <Textarea id="cat-description" {...register("description")} />
      </FormField>

      <Checkbox id="cat-active" label="Activa" {...register("active")} />

      {error ? (
        <p role="alert" className="text-sm text-red">
          {error}
        </p>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
