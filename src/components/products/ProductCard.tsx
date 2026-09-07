import { MessageCircle } from "lucide-react";
import type { ProductDto } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { whatsAppMessageForProduct } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/Badge";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

export function ProductCard({ product }: { product: ProductDto }) {
  // Sin foto la tarjeta se compacta y los distintivos pasan al cuerpo: un
  // recuadro vacío de media pantalla no le aporta nada a quien mira la carta.
  const hasPhoto = Boolean(product.imageUrl);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-muted/15 bg-warm-white shadow-soft transition-shadow hover:shadow-warm">
      {hasPhoto ? (
        <div className="relative aspect-[4/3]">
          <PhotoFrame
            src={product.imageUrl}
            alt={product.name}
            className="absolute inset-0"
            tone="light"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          {product.featured ? (
            <Badge tone="gold" className="absolute left-3 top-3">
              Destacado
            </Badge>
          ) : null}
          {!product.available ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/55">
              <Badge tone="muted" className="border-cream/40 bg-black/40 text-cream">
                No disponible
              </Badge>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        {!hasPhoto && (product.featured || !product.available) ? (
          <div className="mb-2 flex flex-wrap gap-2">
            {product.featured ? <Badge tone="gold">Destacado</Badge> : null}
            {!product.available ? <Badge tone="muted">No disponible</Badge> : null}
          </div>
        ) : null}

        <h3 className="font-display text-lg text-carbon">{product.name}</h3>
        {product.description ? <p className="mt-1.5 text-sm leading-relaxed text-muted">{product.description}</p> : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div>
            <p className="font-display text-lg text-red">{formatPrice(product.price)}</p>
            {product.unit ? <p className="text-xs text-muted">{product.unit}</p> : null}
          </div>

          <a
            href={whatsAppMessageForProduct(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-carbon px-4 py-2 text-xs font-semibold uppercase tracking-wide text-warm-white transition-colors hover:bg-red"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
