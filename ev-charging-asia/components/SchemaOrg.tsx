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

export function BreadcrumbSchema(items: { name: string; url: string }[]) {
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
