import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getProduct } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { formatPrice } from "@/lib/format";
import { whatsAppMessageForProduct } from "@/lib/whatsapp";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: product.name,
    description: product.description ?? `${product.name} — Las Pastas de la Nona`,
    alternates: { canonical: `/producto/${product.slug}` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product || !product.active) notFound();

  const categories = await getCategories();
  const category = categories.find((item) => item.id === product.categoryId);

  return (
    <Container className="grid gap-10 py-32 lg:grid-cols-2 lg:gap-16 lg:py-40">
      <PhotoFrame
        src={product.imageUrl}
        alt={product.name}
        className="aspect-[4/3] w-full rounded-[var(--radius-card)] shadow-warm"
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority
      />

      <div>
        {category ? <Badge tone="red">{category.name}</Badge> : null}
        <h1 className="mt-4 font-display text-3xl text-carbon sm:text-4xl">{product.name}</h1>
        {product.description ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{product.description}</p> : null}

        <div className="mt-6 flex items-baseline gap-3">
          <p className="font-display text-3xl text-red">{formatPrice(product.price)}</p>
          {product.unit ? <p className="text-sm text-muted">{product.unit}</p> : null}
        </div>

        {!product.available ? <Badge tone="muted" className="mt-4">No disponible por el momento</Badge> : null}

        <LinkButton href={whatsAppMessageForProduct(product.name)} variant="primary" size="lg" className="mt-8">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Consultar por WhatsApp
        </LinkButton>
      </div>
    </Container>
  );
}
