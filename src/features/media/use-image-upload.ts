"use client";

import { useCallback, useState } from "react";
import { validateImageFile } from "@/lib/image-file";
import { uploadImage } from "@/services/media.service";

/**
 * Valida y sube un archivo de imagen. Devuelve la URL con la que hay que
 * guardar la imagen (el data URL simulado en modo mock, o la URL que
 * devuelva POST /api/admin/media cuando el backend exista).
 */
export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<string | null> => {
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return null;
    }

    setError(null);
    setUploading(true);

    try {
      const asset = await uploadImage(file);
      return asset.url;
    } catch {
      setError("No pudimos subir la imagen. Probá de nuevo.");
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, error, clearError: () => setError(null) };
}
