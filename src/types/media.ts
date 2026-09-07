/**
 * Espejo del futuro MediaAssetDto expuesto por ASP.NET Core
 * (POST /api/admin/media). Representa un archivo ya almacenado por el
 * backend: la web solo guarda su `url`.
 */
export interface MediaAssetDto {
  id: string;
  url: string;
  fileName: string;
  contentType: string;
  sizeInBytes: number;
  uploadedAt: string;
}
