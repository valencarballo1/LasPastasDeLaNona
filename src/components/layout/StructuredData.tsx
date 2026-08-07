import { siteConfig } from "@/config/site";

/** JSON-LD Restaurant/LocalBusiness — solo datos confirmados por el negocio. */
export function StructuredData() {
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
    image: `${siteConfig.url}/images/brand/logo.png`,
    menu: `${siteConfig.url}/carta`,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
