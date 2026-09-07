import Image from "next/image";
import { UtensilsCrossed, Wheat } from "lucide-react";
import { isInlineImageUrl } from "@/lib/image-file";
import { cn } from "@/lib/utils";

interface PhotoFrameProps {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  /**
   * Color del marco que se muestra mientras no hay foto. `dark` para
   * fondos oscuros (portadas), `light` para bloques sobre crema —
   * un rectángulo negro sobre fondo claro se lee como un agujero.
   */
  tone?: "dark" | "light";
}

/**
 * Envoltorio de next/image que resuelve elegantemente la ausencia de
 * fotografía real: en vez de romper el layout o usar stock, muestra un
 * placeholder de marca hasta que se cargue la imagen definitiva.
 */
export function PhotoFrame({
  src,
  alt,
  className,
  sizes,
  priority,
  fill = true,
  tone = "dark",
}: PhotoFrameProps) {
  if (!src) {
    const isDark = tone === "dark";
    const Icon = isDark ? UtensilsCrossed : Wheat;

    return (
      <div
        className={cn(
          "flex items-center justify-center",
          isDark ? "texture-brick bg-carbon text-gold/50" : "texture-paper bg-cream text-red/25",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <Icon className="h-9 w-9" strokeWidth={1.25} />
      </div>
    );
  }

  // Las imágenes embebidas (data:/blob:) vienen de la subida simulada del
  // panel, que existe solo mientras no hay backend: el optimizador de
  // next/image no las acepta, así que se pintan con un <img> normal.
  if (isInlineImageUrl(src)) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes ?? "100vw"}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
