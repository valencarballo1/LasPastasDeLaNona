import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Ingresá el nombre de la categoría"),
  slug: z
    .string()
    .trim()
    .min(2, "Ingresá el slug")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Usá minúsculas, números y guiones"),
  description: z.string().trim().max(300, "Máximo 300 caracteres").optional().or(z.literal("")),
  type: z.enum(["RESTAURANT", "FACTORY"], { message: "Elegí el tipo de categoría" }),
  sortOrder: z.coerce.number().int().min(0),
  active: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
