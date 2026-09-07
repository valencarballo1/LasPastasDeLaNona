import type { MediaAssetDto } from "@/types/media";

export interface MediaRepository {
  /** Sube un archivo y devuelve la URL con la que la web va a mostrarlo. */
  upload(file: File): Promise<MediaAssetDto>;
}
