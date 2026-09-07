import type { ResolvedSiteImage } from "@/services/site-image.service";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

interface SiteImageProps {
  image: ResolvedSiteImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Sobreescribe el texto alternativo cargado desde el panel. */
  alt?: string;
  /** Color del marco mientras el slot no tiene foto. */
  tone?: "dark" | "light";
  /** `false` cuando el marco hace de fondo a pantalla completa. */
  placeholderIcon?: boolean;
}

/**
 * Pinta una de las imágenes editables de la web (ver
 * `src/constants/site-images.ts`). Si el slot todavía no tiene foto,
 * `PhotoFrame` muestra el placeholder de marca.
 */
export function SiteImage({ image, className, sizes, priority, alt, tone, placeholderIcon }: SiteImageProps) {
  return (
    <PhotoFrame
      src={image.src}
      alt={alt ?? image.alt}
      className={className}
      sizes={sizes}
      priority={priority}
      tone={tone}
      placeholderIcon={placeholderIcon}
    />
  );
}
