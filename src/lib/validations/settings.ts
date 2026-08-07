import { z } from "zod";

export const settingsSchema = z.object({
  phone: z.string().trim().optional().or(z.literal("")),
  whatsappNumber: z.string().trim().min(6, "Ingresá un número de WhatsApp válido"),
  instagramUrl: z.string().trim().optional().or(z.literal("")),
  address: z.string().trim().min(4, "Ingresá una dirección"),
  mainText: z.string().trim().optional().or(z.literal("")),
  googleMapsUrl: z.string().trim().optional().or(z.literal("")),
  openingHours: z.array(
    z.object({
      days: z.string().trim().min(1, "Ingresá los días"),
      hours: z.string().trim().min(1, "Ingresá el horario"),
    }),
  ),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
