import type { ProductDto } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { cn } from "@/lib/utils";

export function MenuItem({ product }: { product: ProductDto }) {
  return (
    <article
      className={cn(
        "flex gap-4 border-b border-muted/15 py-5 last:border-none",
        !product.available && "opacity-60",
      )}
    >
      {/* Sin foto el plato ocupa todo el ancho, en vez de dejar un recuadro
          vacío a la izquierda de cada línea de la carta. */}
      {product.imageUrl ? (
        <PhotoFrame
          src={product.imageUrl}
          alt={product.name}
          className="h-20 w-20 shrink-0 rounded-md sm:h-24 sm:w-24"
          tone="light"
          sizes="96px"
        />
      ) : null}

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-lg text-carbon">{product.name}</h3>
          <p className="whitespace-nowrap font-display text-lg text-red">{formatPrice(product.price)}</p>
        </div>

        {product.description ? <p className="mt-1 text-sm leading-relaxed text-muted">{product.description}</p> : null}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {product.featured ? <Badge tone="gold">Destacado</Badge> : null}
          {!product.available ? <Badge tone="muted">No disponible</Badge> : null}
          {product.tags?.map((tag) => (
            <Badge key={tag} tone="red">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
