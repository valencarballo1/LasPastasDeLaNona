"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Video de presentación del local, reproducido a demanda.
 *
 * Se usa `<video>` nativo en lugar del iframe del player de Cloudinary para
 * mantener la estética de marca y evitar cargar un reproductor de terceros.
 * Con `preload="none"` el navegador solo descarga el póster hasta que la
 * persona toca play, así la Home no paga el peso del video (importante:
 * la mayoría del tráfico llega desde el celular).
 */
export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handlePlay() {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setPlaying(true);
    } catch {
      setFailed(true);
    }
  }

  const playerUrl = `https://player.cloudinary.com/embed/?cloud_name=${siteConfig.video.cloudName}&public_id=${siteConfig.video.publicId}`;

  return (
    <section className="texture-brick bg-carbon py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Así se vive La Nona</p>
          <h2 className="mt-4 font-display text-3xl text-warm-white sm:text-4xl md:text-5xl">
            Pasá y conocé nuestra casa
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream/80">
            Un recorrido por el salón, la fábrica y los platos que salen todos los días de nuestra cocina.
          </p>
          <OrnamentDivider tone="dark" className="my-8" />
        </div>

        <Reveal>
          <div className="relative mx-auto w-fit overflow-hidden rounded-[var(--radius-card)] shadow-warm">
            <video
              ref={videoRef}
              poster={siteConfig.video.poster}
              preload="none"
              playsInline
              controls={playing}
              onError={() => setFailed(true)}
              onEnded={() => setPlaying(false)}
              className="block max-h-[80vh] w-full max-w-4xl bg-black object-contain"
            >
              <source src={siteConfig.video.src} type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>

            {!playing ? (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Reproducir el video del local"
                className="group absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/15 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red text-warm-white shadow-warm transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                  <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                </span>
              </button>
            ) : null}
          </div>
        </Reveal>

        {failed ? (
          <p className="mt-6 text-center text-sm text-cream/70">
            ¿No podés verlo?{" "}
            <a
              href={playerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-nona font-semibold text-gold"
            >
              Abrilo en una pestaña nueva
            </a>
            .
          </p>
        ) : null}
      </Container>
    </section>
  );
}
