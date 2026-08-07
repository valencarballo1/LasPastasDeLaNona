import { MessageCircle } from "lucide-react";
import type { ProductDto } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { whatsAppMessageForProduct } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/Badge";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

export function ProductCard({ product }: { product: ProductDto }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-muted/15 bg-warm-white shadow-soft transition-shadow hover:shadow-warm">
      <div className="relative aspect-[4/3]">
        <PhotoFrame src={product.imageUrl} alt={product.name} className="absolute inset-0" />
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

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-carbon">{product.name}</h3>
        {product.description ? <p className="mt-1.5 text-sm leading-relaxed text-muted">{product.description}</p> : null}

        <div className="mt-auto flex items-center justify-between pt-5">
          <div>
            <p className="font-display text-lg text-red">{formatPrice(product.price)}</p>
            {product.unit ? <p className="text-xs text-muted">{product.unit}</p> : null}
          </div>

          <a
            href={whatsAppMessageForProduct(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-carbon px-4 py-2 text-xs font-semibold uppercase tracking-wide text-warm-white transition-colors hover:bg-red"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
