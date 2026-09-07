import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

/**
 * Estructura preparada para opiniones reales (Google Reviews / Instagram).
 * A propósito no incluye testimonios inventados.
 *
 * NO está montada en la home: tres tarjetas vacías que dicen "próximamente"
 * ocupan una pantalla sin decirle nada al cliente. Volver a agregarla en
 * `src/app/(public)/page.tsx` cuando haya opiniones reales que mostrar.
 */
export function TestimonialsSection() {
  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="Nuestra mesa" title="Lo que dicen en La Nona" />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-dashed border-muted/30 p-6"
            >
              <div className="flex gap-1 text-gold/40">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-muted">Próximamente vamos a sumar acá las opiniones de nuestros clientes.</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
