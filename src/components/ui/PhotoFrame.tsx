import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoFrameProps {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Envoltorio de next/image que resuelve elegantemente la ausencia de
 * fotografía real: en vez de romper el layout o usar stock, muestra un
 * placeholder de marca hasta que se cargue la imagen definitiva.
 */
export function PhotoFrame({ src, alt, className, sizes, priority, fill = true }: PhotoFrameProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "texture-brick flex items-center justify-center bg-carbon text-gold/50",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="h-10 w-10" strokeWidth={1.25} />
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
