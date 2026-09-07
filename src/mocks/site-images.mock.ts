import { siteImageSlots } from "@/constants/site-images";
import type { SiteImageDto } from "@/types/site-image";

/**
 * MOCK DATA — estado inicial de las imágenes de la web.
 *
 * Se deriva del catálogo (`src/constants/site-images.ts`): todos los slots
 * arrancan vacíos salvo los que ya tienen una imagen versionada en el repo
 * (hoy, el logo). Vacío es un estado válido: la web muestra el placeholder
 * de marca hasta que se cargue la foto real desde /admin/imagenes.
 */
export const mockSiteImages: SiteImageDto[] = siteImageSlots.map((slot) => ({
  key: slot.key,
  imageUrl: slot.defaultUrl,
  alt: slot.defaultUrl ? slot.defaultAlt : undefined,
  updatedAt: undefined,
}));
