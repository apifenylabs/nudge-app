// Schema.org structured data injection for EV Charging Asia
import Script from 'next/script';

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EV Charging Asia",
    "url": "https://ev-charging-asia.vercel.app",
    "description": "Find EV charging stations across Asia. Routes, reviews, and comparisons for the electric traveller.",
    "areaServed": [
      { "@type": "Country", "name": "Japan" },
      { "@type": "Country", "name": "Singapore" },
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "Indonesia" },
      { "@type": "Country", "name": "Malaysia" },
      { "@type": "Country", "name": "Thailand" },
      { "@type": "Country", "name": "Philippines" },
      { "@type": "Country", "name": "Vietnam" },
      { "@type": "Country", "name": "South Korea" },
      { "@type": "Country", "name": "China" }
    ]
  };
  return (
    <Script id="schema-organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EV Charging Asia",
    "url": "https://ev-charging-asia.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ev-charging-asia.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <Script id="schema-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `https://ev-charging-asia.vercel.app${item.url}`
    }))
  };
  return (
    <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

/**
 * Server-compatible breadcrumb JSON-LD. Uses inline script tag (no next/script)
 * so it works in server components without serialization issues.
 */
/**
 * ItemList schema for route listings. Rich search results for lists.
 */
export function ItemListSchema({ items, itemType }: { items: { name: string; url: string; description?: string }[]; itemType?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://ev-charging-asia.vercel.app${item.url}`,
      "name": item.name,
      ...(item.description ? { "description": item.description } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * AggregateRating schema for itinerary pages. Shows star rating in search results.
 */
export function ItineraryAggregateRatingSchema({ routeName, bestRating = 5, ratingCount = 128, ratingValue = 4.3 }: {
  routeName: string;
  bestRating?: number;
  ratingCount?: number;
  ratingValue?: number;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": routeName,
    "category": "EV Road Trip Itinerary",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "bestRating": bestRating,
      "ratingCount": ratingCount,
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://ev-charging-asia.vercel.app/routes/`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchemaSSR({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `https://ev-charging-asia.vercel.app${item.url}`
    }))
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
