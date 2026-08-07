import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Ingresá el nombre del producto"),
  slug: z
    .string()
    .trim()
    .min(2, "Ingresá el slug")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Usá minúsculas, números y guiones"),
  description: z.string().trim().max(400, "Máximo 400 caracteres").optional().or(z.literal("")),
  categoryId: z.coerce.number().int().min(1, "Elegí una categoría"),
  price: z.union([z.coerce.number().positive("El precio debe ser mayor a 0"), z.literal("")]).optional(),
  unit: z.string().trim().optional().or(z.literal("")),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  available: z.boolean(),
  featured: z.boolean(),
  active: z.boolean(),
  sortOrder: z.coerce.number().int().min(0),
});

export type ProductFormValues = z.infer<typeof productSchema>;
