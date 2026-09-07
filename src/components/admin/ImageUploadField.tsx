"use client";

import { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, Trash2, Upload } from "lucide-react";
import { useImageUpload } from "@/features/media/use-image-upload";
import { ACCEPTED_IMAGE_ACCEPT_ATTR, MAX_IMAGE_SIZE_BYTES, formatFileSize, isInlineImageUrl } from "@/lib/image-file";
import { cn } from "@/lib/utils";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Input } from "@/components/ui/Input";

interface ImageUploadFieldProps {
  /** URL actual de la imagen, o `undefined` si todavía no tiene. */
  value?: string;
  /** Se llama con la nueva URL, o `undefined` al quitar la imagen. */
  onChange: (url: string | undefined) => void;
  /** Texto alternativo de la vista previa. */
  previewAlt: string;
  /** Proporción de la vista previa, en formato `aspect-ratio` (ej: "4 / 3"). */
  aspect?: string;
  /** Ayuda extra debajo del bloque (medida recomendada, etc). */
  hint?: string;
  className?: string;
  /** Deshabilita subir y quitar (mientras se guarda el formulario). */
  disabled?: boolean;
}

/**
 * Carga de imágenes del panel: subir un archivo desde el dispositivo o
 * pegar una URL, con vista previa y opción de quitarla.
 *
 * Quedarse sin imagen es un estado válido en toda la web: si no se carga
 * ninguna, se publica sin foto y se muestra el placeholder de marca hasta
 * que alguien la edite y suba la definitiva.
 */
export function ImageUploadField({
  value,
  onChange,
  previewAlt,
  aspect = "4 / 3",
  hint,
  className,
  disabled = false,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, error, clearError } = useImageUpload();
  const [urlFieldOpen, setUrlFieldOpen] = useState(false);

  const isUploadedFile = Boolean(value && isInlineImageUrl(value));
  const busy = uploading || disabled;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    const url = await upload(file);
    if (url) onChange(url);
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div
          className="w-full shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 sm:w-40"
          style={{ aspectRatio: aspect }}
        >
          <PhotoFrame src={value} alt={previewAlt} className="h-full w-full" sizes="160px" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : value ? (
                <Upload className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ImagePlus className="h-4 w-4" aria-hidden="true" />
              )}
              {uploading ? "Subiendo..." : value ? "Reemplazar imagen" : "Subir imagen"}
            </button>

            <button
              type="button"
              onClick={() => setUrlFieldOpen((open) => !open)}
              disabled={busy}
              aria-expanded={urlFieldOpen}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              <Link2 className="h-4 w-4" aria-hidden="true" />
              Usar una URL
            </button>

            {value ? (
              <button
                type="button"
                onClick={() => {
                  clearError();
                  onChange(undefined);
                }}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-red/10 hover:text-red disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Quitar
              </button>
            ) : null}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_IMAGE_ACCEPT_ATTR}
            className="hidden"
            onChange={(event) => {
              void handleFile(event.target.files?.[0]);
              // Permite volver a elegir el mismo archivo después de quitarlo.
              event.target.value = "";
            }}
          />

          {urlFieldOpen ? (
            <Input
              type="url"
              inputMode="url"
              aria-label="URL de la imagen"
              placeholder="https://..."
              defaultValue={isUploadedFile ? "" : (value ?? "")}
              disabled={busy}
              onChange={(event) => {
                clearError();
                onChange(event.target.value.trim() || undefined);
              }}
              className="text-sm"
            />
          ) : null}

          {error ? (
            <p role="alert" className="text-xs font-medium text-red">
              {error}
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              {value
                ? isUploadedFile
                  ? "Imagen subida desde el dispositivo."
                  : "Imagen enlazada por URL."
                : "Sin imagen: se publica con el marco de La Nona hasta que subas una."}
              {hint ? ` ${hint}` : ""}
            </p>
          )}

          <p className="text-xs text-slate-400">
            JPG, PNG, WEBP, AVIF o SVG · hasta {formatFileSize(MAX_IMAGE_SIZE_BYTES)}
          </p>
        </div>
      </div>
    </div>
  );
}
