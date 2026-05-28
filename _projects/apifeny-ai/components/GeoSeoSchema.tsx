/**
 * GeoSeoSchema — JSON-LD structured data for geo-targeted landing pages.
 *
 * Adds:
 *  - Place schema (country-level)
 *  - FAQPage schema (common questions for this market)
 *  - ItemList (top tools ranked by category)
 *  - BreadcrumbList (already handled by BreadcrumbSchema elsewhere)
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolItem {
  name: string;
  description: string;
  category: string;
}

interface GeoSeoSchemaProps {
  /** Country name (e.g., "Bangladesh") */
  countryName: string;
  /** ISO 3166-1 alpha-2 code lowercase (e.g., "bd") */
  countryCode: string;
  /** Capital city */
  capital: string;
  /** Currency code (e.g., "BDT") */
  currency: string;
  /** Language name (e.g., "Bengali") */
  language: string;
  /** Language ISO code (e.g., "bn") */
  languageCode: string;
  /** Market size description */
  marketSize: string;
  /** Slug for the page URL */
  slug: string;
  /** FAQ items for this country */
  faqs: FAQItem[];
  /** Top tools ranked */
  tools?: ToolItem[];
}

export default function GeoSeoSchema({
  countryName,
  countryCode,
  capital,
  currency,
  language,
  languageCode,
  marketSize,
  slug,
  faqs,
  tools = [],
}: GeoSeoSchemaProps) {
  const baseUrl = 'https://apifeny.ai';
  const pageUrl = `${baseUrl}/${slug}`;

  const schemas = [
    // ── Place schema (country) ──
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      '@id': `${baseUrl}/#${countryCode}`,
      name: countryName,
      address: {
        '@type': 'PostalAddress',
        addressCountry: countryCode.toUpperCase(),
      },
      description: `AI tools and technology landscape in ${countryName}. ${marketSize}`,
      geo: {
        '@type': 'GeoCoordinates',
        // Rough central coordinates per country
        ...getCountryCoords(countryCode),
      },
      containedInPlace: {
        '@type': 'Place',
        name: 'Asia',
      },
    },
    // ── WebPage schema with country-specific metadata ──
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': pageUrl,
      url: pageUrl,
      name: `Best AI Tools in ${countryName} (2026)`,
      description: `Curated directory of AI tools for ${countryName}. ${marketSize}`,
      inLanguage: ['en', languageCode],
      about: {
        '@id': `${baseUrl}/#${countryCode}`,
      },
      mainEntity: tools.length > 0
        ? {
            '@type': 'ItemList',
            itemListElement: tools.map((tool, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'SoftwareApplication',
                name: tool.name,
                description: tool.description,
                applicationCategory: tool.category,
                operatingSystem: 'Web, iOS, Android',
              },
            })),
          }
        : undefined,
    },
    // ── FAQPage schema ──
    faqs.length > 0 && {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ].filter(Boolean);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas, null, 0),
      }}
    />
  );
}

/** Get approximate central coordinates per ISO alpha-2 code */
function getCountryCoords(code: string): { latitude: number; longitude: number } {
  const coords: Record<string, { latitude: number; longitude: number }> = {
    sg: { latitude: 1.3521, longitude: 103.8198 },
    my: { latitude: 4.2105, longitude: 101.9758 },
    hk: { latitude: 22.3193, longitude: 114.1694 },
    vn: { latitude: 14.0583, longitude: 108.2772 },
    ph: { latitude: 12.8797, longitude: 121.7740 },
    id: { latitude: -0.7893, longitude: 113.9213 },
    th: { latitude: 15.8700, longitude: 100.9925 },
    kh: { latitude: 12.5657, longitude: 104.9910 },
    mm: { latitude: 21.9162, longitude: 95.9560 },
    jp: { latitude: 36.2048, longitude: 138.2529 },
    kr: { latitude: 35.9078, longitude: 127.7669 },
    tw: { latitude: 23.6978, longitude: 120.9605 },
    in: { latitude: 20.5937, longitude: 78.9629 },
    bd: { latitude: 23.6850, longitude: 90.3563 },
    lk: { latitude: 7.8731, longitude: 80.7718 },
    np: { latitude: 28.3949, longitude: 84.1240 },
    au: { latitude: -25.2744, longitude: 133.7751 },
    tr: { latitude: 38.9637, longitude: 35.2433 },
  };
  return coords[code] ?? { latitude: 0, longitude: 0 };
}
