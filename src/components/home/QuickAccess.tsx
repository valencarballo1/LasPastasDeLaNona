import Link from "next/link";
import { ArrowRight, BookOpenText, MapPin, MessageCircle, PartyPopper, ShoppingBasket } from "lucide-react";
import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";
import { whatsAppMessageGeneral } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";

/**
 * Accesos directos a lo que un cliente viene a buscar, apenas debajo de la
 * portada: la carta, las pastas para llevar, los eventos y el contacto.
 * Es la primera parada de la navegación — antes de cualquier bloque
 * editorial — para no obligar a recorrer toda la home.
 */
const shortcuts = [
  {
    href: routes.carta,
    icon: BookOpenText,
    title: "Ver la carta",
    description: "Pastas, milanesas, pizzas y postres del restaurante.",
  },
  {
    href: routes.fabrica,
    icon: ShoppingBasket,
    title: "Pastas para llevar",
    description: "El catálogo de la fábrica, listo para cocinar en casa.",
  },
  {
    href: routes.eventos,
    icon: PartyPopper,
    title: "Eventos",
    description: "Pizza Party y Pasta Party para tu festejo.",
  },
  {
    href: whatsAppMessageGeneral(),
    icon: MessageCircle,
    title: "Escribinos",
    description: "Consultas y pedidos por WhatsApp.",
    external: true,
  },
] as const;

export function QuickAccess() {
  return (
    <section className="border-b border-muted/10 bg-warm-white py-8 sm:py-12" aria-label="Accesos rápidos">
      <Container>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {shortcuts.map((shortcut) => {
            const Icon = shortcut.icon;
            const content = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red/10 text-red transition-colors group-hover:bg-red group-hover:text-warm-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="mt-3 flex items-center gap-1.5 font-display text-base text-carbon sm:text-lg">
                  {shortcut.title}
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-red transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 block text-xs leading-snug text-muted sm:text-sm">{shortcut.description}</span>
              </>
            );

            const className =
              "group flex h-full flex-col rounded-[var(--radius-card)] border border-muted/15 bg-cream/40 p-4 transition-colors hover:border-red/30 hover:bg-cream";

            return "external" in shortcut && shortcut.external ? (
              <a
                key={shortcut.title}
                href={shortcut.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <Link key={shortcut.title} href={shortcut.href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted">
          <MapPin className="h-4 w-4 text-red" aria-hidden="true" />
          {siteConfig.address.street}, {siteConfig.address.city}
          <Link href={routes.contacto} className="font-semibold text-red hover:underline">
            Cómo llegar y horarios
          </Link>
        </p>
      </Container>
    </section>
  );
}
