import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";
import type { ResolvedSiteImage } from "@/services/site-image.service";
import { LinkButton } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function StorySection({ image }: { image: ResolvedSiteImage }) {
  // Sin foto cargada el bloque pasa a una sola columna: reservar el hueco
  // de la imagen dejaría media pantalla vacía (se carga en /admin/imagenes).
  const hasPhoto = Boolean(image.src);

  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <Container className={cn("grid items-center gap-12", hasPhoto && "lg:grid-cols-2")}>
        {hasPhoto ? (
          <Reveal>
            <SiteImage
              image={image}
              className="aspect-[4/5] w-full rounded-[var(--radius-card)] shadow-warm"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        ) : null}

        <Reveal delay={hasPhoto ? 100 : 0} className={cn(!hasPhoto && "mx-auto max-w-2xl text-center")}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Nuestra historia</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-carbon sm:text-4xl md:text-5xl">
            De nuestra familia a tu mesa
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.name} nació como un proyecto familiar en {siteConfig.foundingYear} con una idea sencilla:
            hacer pasta como se hacía en casa, respetando los sabores, el tiempo y las recetas que pasan de
            generación en generación.
          </p>
          <LinkButton href={routes.nosotros} variant="primary" size="md" className="mt-8">
            Conocé nuestra historia
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
