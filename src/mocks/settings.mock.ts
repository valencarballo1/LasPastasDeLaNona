import { siteConfig } from "@/config/site";
import type { SettingsDto } from "@/types/settings";

/**
 * MOCK DATA — configuración editable desde /admin/configuracion.
 * openingHours queda vacío a propósito: el negocio todavía no confirmó
 * sus horarios reales y no deben inventarse.
 */
export const mockSettings: SettingsDto = {
  phone: "",
  whatsappNumber: siteConfig.contact.whatsappNumber,
  instagramUrl: siteConfig.contact.instagramUrl,
  address: siteConfig.address.full,
  openingHours: [],
  mainText: "Una historia familiar desde 1999.",
  googleMapsUrl: siteConfig.maps.embedUrl,
};
