import type { SiteImageKey } from "@/constants/site-images";

/**
 * Espejo del futuro SiteImageDto expuesto por ASP.NET Core
 * (GET /api/site-images, PUT /api/admin/site-images/{key}).
 *
 * Cada registro es un "slot" con nombre propio dentro de la web (la foto
 * de portada del inicio, la portada de /carta, cada foto de la galería...).
 * El catálogo de slots vive en `src/constants/site-images.ts`: el backend
 * solo guarda la clave, la URL y el texto alternativo.
 *
 * `imageUrl` vacío es un estado válido y esperado: el slot se muestra con
 * el placeholder de marca hasta que alguien cargue la imagen definitiva.
 */
export interface SiteImageDto {
  key: SiteImageKey;
  imageUrl?: string;
  /** Texto alternativo. Si está vacío se usa el del catálogo. */
  alt?: string;
  updatedAt?: string;
}

/**
 * Payload de PUT /api/admin/site-images/{key}: siempre lleva los dos
 * campos (es un reemplazo, no un parche). `null` deja el campo vacío —
 * `imageUrl: null` quita la imagen y vuelve al placeholder de marca.
 */
export interface UpdateSiteImagePayload {
  imageUrl: string | null;
  alt: string | null;
}
