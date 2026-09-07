import { mockSiteImages } from "@/mocks/site-images.mock";
import type { SiteImageDto } from "@/types/site-image";
import type { SiteImageRepository } from "@/services/repositories/site-image.repository";

// Copia mutable en memoria, igual que el resto de los repositorios mock:
// permite probar el panel de imágenes sin backend, sin persistir entre
// reinicios del servidor de desarrollo.
let siteImages: SiteImageDto[] = mockSiteImages.map((image) => ({ ...image }));

export const mockSiteImageRepository: SiteImageRepository = {
  async getAll() {
    return siteImages.map((image) => ({ ...image }));
  },

  async update(key, data) {
    const existing = siteImages.find((image) => image.key === key);
    if (!existing) throw new Error(`Imagen "${key}" no encontrada`);

    const updated: SiteImageDto = {
      key: existing.key,
      imageUrl: data.imageUrl ?? undefined,
      alt: data.alt ?? undefined,
      updatedAt: new Date().toISOString(),
    };

    siteImages = siteImages.map((image) => (image.key === key ? updated : image));
    return { ...updated };
  },
};
