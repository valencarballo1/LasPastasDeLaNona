/**
 * Espejo del futuro SettingsDto expuesto por ASP.NET Core
 * (GET/PUT /api/settings). Estos valores alimentan Contacto, Footer,
 * WhatsAppButton y el panel /admin/configuracion.
 */
export interface OpeningHoursEntry {
  /** Ej: "Martes a domingo" */
  days: string;
  /** Ej: "12:00 a 16:00 y 20:00 a 00:00" */
  hours: string;
}

export interface SettingsDto {
  phone: string;
  whatsappNumber: string;
  instagramUrl: string;
  address: string;
  /**
   * Horarios reales del negocio. Se deja vacío hasta que el negocio
   * los confirme — la web no debe inventarlos (ver content-guide.md).
   */
  openingHours: OpeningHoursEntry[];
  mainText: string;
  googleMapsUrl: string;
}
