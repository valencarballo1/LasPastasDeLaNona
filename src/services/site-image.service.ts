import { siteImageSlots, type SiteImageKey } from "@/constants/site-images";
import { siteImageRepository } from "@/services/repositories";
import type { SiteImageDto, UpdateSiteImagePayload } from "@/types/site-image";

/** Imagen lista para pintar: la URL cargada (si hay) y su texto alternativo. */
export interface ResolvedSiteImage {
  key: SiteImageKey;
  /** `undefined` = todavía sin foto; la web muestra el placeholder de marca. */
  src?: string;
  alt: string;
}

export type SiteImageMap = Record<SiteImageKey, ResolvedSiteImage>;

export function getSiteImages() {
  return siteImageRepository.getAll();
}

export function updateSiteImage(key: SiteImageKey, data: UpdateSiteImagePayload) {
  return siteImageRepository.update(key, data);
}

/**
 * Devuelve todas las imágenes de la web resueltas contra el catálogo.
 *
 * Las páginas públicas piden este mapa una sola vez y se lo pasan a las
 * secciones que lo necesitan. Si la API falla, la web no se cae: cada slot
 * queda sin `src` y se pinta el placeholder de marca, que es el mismo
 * estado que un slot todavía sin foto.
 */
export async function getSiteImageMap(): Promise<SiteImageMap> {
  let stored: SiteImageDto[] = [];

  try {
    stored = await getSiteImages();
  } catch (error) {
    console.error("No pudimos cargar las imágenes del sitio:", error);
  }

  const byKey = new Map(stored.map((image) => [image.key, image] as const));

  return Object.fromEntries(
    siteImageSlots.map((slot) => {
      const image = byKey.get(slot.key);
      return [
        slot.key,
        {
          key: slot.key,
          src: image?.imageUrl || slot.defaultUrl,
          alt: image?.alt?.trim() || slot.defaultAlt,
        } satisfies ResolvedSiteImage,
      ];
    }),
  ) as SiteImageMap;
}

/** Atajo para las secciones que solo necesitan una imagen del mapa. */
export function pickSiteImage(images: SiteImageMap, key: SiteImageKey): ResolvedSiteImage {
  return images[key];
}
