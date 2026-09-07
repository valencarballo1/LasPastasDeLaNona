import { mediaRepository } from "@/services/repositories";

/** Sube una imagen y devuelve el archivo ya almacenado (con su URL pública). */
export function uploadImage(file: File) {
  return mediaRepository.upload(file);
}
