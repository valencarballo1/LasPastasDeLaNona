import Image from "next/image";
import { isInlineImageUrl } from "@/lib/image-file";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  src: string;
  alt: string;
  /** Lado del logo en píxeles. */
  size: number;
  className?: string;
  priority?: boolean;
}

/** Logo de la marca, editable desde /admin/imagenes (slot `brand.logo`). */
export function BrandLogo({ src, alt, size, className, priority }: BrandLogoProps) {
  const classNames = cn("rounded-full object-cover", className);

  // Igual que en PhotoFrame: el optimizador de next/image no acepta las
  // imágenes embebidas que produce la subida simulada del panel.
  if (isInlineImageUrl(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={size} height={size} className={classNames} />;
  }

  return <Image src={src} alt={alt} width={size} height={size} className={classNames} priority={priority} />;
}
