import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src?: string;
  alt: string;
}

export function Gallery({ images, className }: { images: GalleryImage[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4", className)}>
      {images.map((image, index) => (
        <PhotoFrame
          key={`${image.alt}-${index}`}
          src={image.src}
          alt={image.alt}
          className={cn(
            "aspect-square rounded-[var(--radius-card)]",
            index === 0 && "col-span-2 row-span-2 aspect-auto sm:aspect-square",
          )}
        />
      ))}
    </div>
  );
}
