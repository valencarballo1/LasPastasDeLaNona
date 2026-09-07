import { siteConfig } from "@/config/site";
import { isInlineImageUrl } from "@/lib/image-file";

const FALLBACK_LOGO = "/images/brand/logo.png";

/**
 * Los buscadores necesitan una URL absoluta y alcanzable: una imagen
 * embebida (subida mock) no les sirve, así que en ese caso se publica el
 * logo versionado en el repo.
 */
function resolveAbsoluteImageUrl(logoUrl?: string) {
  const url = logoUrl && !isInlineImageUrl(logoUrl) ? logoUrl : FALLBACK_LOGO;
  return url.startsWith("http") ? url : `${siteConfig.url}${url}`;
}

/** JSON-LD Restaurant/LocalBusiness — solo datos confirmados por el negocio. */
export function StructuredData({ logoUrl }: { logoUrl?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    servesCuisine: ["Italian", "Argentine"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.province,
      addressCountry: "AR",
    },
    url: siteConfig.url,
    image: resolveAbsoluteImageUrl(logoUrl),
    menu: `${siteConfig.url}/carta`,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
