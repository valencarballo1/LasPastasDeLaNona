import { cn } from "@/lib/utils";

interface VideoFrameProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Envoltorio para reproductores embebidos (Cloudinary) con el mismo
 * tratamiento visual que PhotoFrame: relación de aspecto fija, bordes
 * redondeados y carga diferida para no penalizar la carga inicial.
 */
export function VideoFrame({ src, title, className }: VideoFrameProps) {
  return (
    <div
      className={cn(
        "aspect-video w-full overflow-hidden rounded-[var(--radius-card)] shadow-warm",
        className,
      )}
    >
      <iframe
        title={title}
        src={src}
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
