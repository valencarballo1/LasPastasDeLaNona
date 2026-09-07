import { fileToDataUrl } from "@/lib/image-file";
import type { MediaAssetDto } from "@/types/media";
import type { MediaRepository } from "@/services/repositories/media.repository";

/**
 * Subida simulada: sin backend no hay dónde guardar el archivo, así que la
 * imagen se redimensiona en el navegador y se guarda como data URL dentro
 * del propio registro. Alcanza para ver el panel funcionando de punta a
 * punta; con `NEXT_PUBLIC_DATA_SOURCE=api` el archivo viaja tal cual al
 * endpoint POST /api/admin/media y la web guarda la URL que devuelva.
 */
export const mockMediaRepository: MediaRepository = {
  async upload(file) {
    const dataUrl = await fileToDataUrl(file);

    return {
      id: `mock-${Date.now()}`,
      url: dataUrl,
      fileName: file.name,
      contentType: file.type,
      sizeInBytes: file.size,
      uploadedAt: new Date().toISOString(),
    };
  },
};
