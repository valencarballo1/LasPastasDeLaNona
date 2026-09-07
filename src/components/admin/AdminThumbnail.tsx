import { ImageOff } from "lucide-react";
import { isInlineImageUrl } from "@/lib/image-file";
import { cn } from "@/lib/utils";

/**
 * Miniatura de listado del panel. Cuando el plato todavía no tiene foto
 * muestra un marcador claro en vez de un hueco vacío, para que se vea de
 * un vistazo qué falta cargar.
 */
export function AdminThumbnail({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const boxClassName = cn("h-11 w-11 shrink-0 overflow-hidden rounded-md", className);

  if (!src) {
    return (
      <div
        className={cn(boxClassName, "flex items-center justify-center bg-slate-100 text-slate-400")}
        role="img"
        aria-label={`${alt} (sin foto)`}
        title="Sin foto"
      >
        <ImageOff className="h-4 w-4" aria-hidden="true" />
      </div>
    );
  }

  // Las subidas simuladas llegan como data URL y el optimizador de
  // next/image no las procesa, así que la miniatura usa siempre <img>.
  return (
    <div className={boxClassName} title={isInlineImageUrl(src) ? "Imagen subida" : src}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
