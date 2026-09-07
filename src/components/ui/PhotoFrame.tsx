import Image from "next/image";
import { Wheat } from "lucide-react";
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
   * Color del marco que se muestra mientras no hay foto. `dark` para los
   * fondos grandes (portadas, tarjetas con texto encima); `light` para los
   * marcos que van dentro de una tarjeta clara, donde un recuadro oscuro
   * se leería como un agujero.
   */
  tone?: "dark" | "light";
  /**
   * `false` en los marcos que hacen de fondo a pantalla completa: ahí el
   * icono queda suelto en el medio y se cruza con el texto. Se deja en los
   * marcos que ocupan el lugar de una foto concreta.
   */
  placeholderIcon?: boolean;
}

/**
 * Envoltorio de next/image que resuelve elegantemente la ausencia de
 * fotografía real: en vez de romper el layout o usar stock, muestra un
 * fondo de marca —ladrillo del local— hasta que se cargue la foto
 * definitiva desde /admin/imagenes.
 */
export function PhotoFrame({
  src,
  alt,
  className,
  sizes,
  priority,
  fill = true,
  tone = "dark",
  placeholderIcon = true,
}: PhotoFrameProps) {
  if (!src) {
    const isDark = tone === "dark";

    return (
      /* `texture-brick`/`texture-paper` pintan un background-image, así que el
         color de base tiene que ser un background-color (si no, un gradiente
         de Tailwind lo pisa y el marco queda transparente). El matiz cálido
         va en una capa aparte. */
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          isDark ? "texture-brick bg-carbon" : "texture-paper bg-cream",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        {isDark ? (
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-wood/10 to-wood/35"
            aria-hidden="true"
          />
        ) : null}
        {placeholderIcon ? (
          <Wheat
            className={cn("h-10 w-10", isDark ? "text-gold/25" : "text-red/20")}
            strokeWidth={1}
            aria-hidden="true"
          />
        ) : null}
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
