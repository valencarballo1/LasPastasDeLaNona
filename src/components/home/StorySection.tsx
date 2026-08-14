import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";
import { LinkButton } from "@/components/ui/Button";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function StorySection() {
  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <VideoFrame
            src={siteConfig.video.embedUrl}
            title="Video de la elaboración artesanal de pastas en la fábrica de La Nona"
          />
        </Reveal>

        <Reveal delay={100}>
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
