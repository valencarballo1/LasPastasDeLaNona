import { z } from "zod";

export const eventRequestSchema = z.object({
  name: z.string().trim().min(2, "Ingresá tu nombre completo"),
  phone: z.string().trim().min(6, "Ingresá un teléfono de contacto"),
  email: z.string().trim().email("Ingresá un email válido"),
  eventType: z.enum(["PIZZA_PARTY", "PASTA_PARTY", "AMBOS", "OTRO"], {
    message: "Elegí el tipo de evento",
  }),
  estimatedGuests: z.coerce.number().int().min(1, "Ingresá la cantidad estimada de personas"),
  eventDate: z.string().min(1, "Elegí una fecha tentativa"),
  locality: z.string().trim().min(2, "Ingresá tu localidad"),
  message: z.string().trim().max(600, "Máximo 600 caracteres").optional().or(z.literal("")),
});

export type EventRequestFormValues = z.infer<typeof eventRequestSchema>;
