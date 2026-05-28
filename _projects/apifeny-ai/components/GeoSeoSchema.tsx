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
    ae: { latitude: 23.4241, longitude: 53.8478 },
    ar: { latitude: -38.4161, longitude: -63.6167 },
    at: { latitude: 47.5162, longitude: 14.5501 },
    be: { latitude: 50.8503, longitude: 4.3517 },
    ca: { latitude: 56.1304, longitude: -106.3468 },
    ch: { latitude: 46.8182, longitude: 8.2275 },
    cl: { latitude: -35.6751, longitude: -71.5430 },
    cn: { latitude: 35.8617, longitude: 104.1954 },
    co: { latitude: 4.5709, longitude: -74.2973 },
    cr: { latitude: 9.7489, longitude: -83.7534 },
    cz: { latitude: 49.8175, longitude: 15.4730 },
    de: { latitude: 51.1657, longitude: 10.4515 },
    dk: { latitude: 56.2639, longitude: 9.5018 },
    eg: { latitude: 26.8206, longitude: 30.8025 },
    es: { latitude: 40.4637, longitude: -3.7492 },
    fi: { latitude: 61.9241, longitude: 25.7482 },
    fr: { latitude: 46.6034, longitude: 1.8883 },
    gb: { latitude: 55.3781, longitude: -3.4360 },
    gr: { latitude: 39.0742, longitude: 21.8243 },
    hu: { latitude: 47.1625, longitude: 19.5033 },
    ie: { latitude: 53.4129, longitude: -8.2439 },
    il: { latitude: 31.0461, longitude: 34.8516 },
    it: { latitude: 41.8719, longitude: 12.5674 },
    ke: { latitude: -0.0236, longitude: 37.9062 },
    kw: { latitude: 29.3117, longitude: 47.4818 },
    ma: { latitude: 31.7917, longitude: -7.0926 },
    mx: { latitude: 23.6345, longitude: -102.5528 },
    ng: { latitude: 9.0820, longitude: 8.6753 },
    nl: { latitude: 52.1326, longitude: 5.2913 },
    no: { latitude: 60.4720, longitude: 8.4689 },
    nz: { latitude: -40.9006, longitude: 174.8860 },
    om: { latitude: 21.5126, longitude: 55.9233 },
    pa: { latitude: 8.5380, longitude: -80.7821 },
    pk: { latitude: 30.3753, longitude: 69.3451 },
    pl: { latitude: 51.9194, longitude: 19.1451 },
    pt: { latitude: 39.3999, longitude: -8.2245 },
    qa: { latitude: 25.3548, longitude: 51.1839 },
    ro: { latitude: 45.9432, longitude: 24.9668 },
    ru: { latitude: 61.5240, longitude: 105.3188 },
    sa: { latitude: 23.8859, longitude: 45.0792 },
    se: { latitude: 60.1282, longitude: 18.6435 },
    us: { latitude: 37.0902, longitude: -95.7129 },
    za: { latitude: -30.5595, longitude: 22.9375 },
  };
  return coords[code] ?? { latitude: 0, longitude: 0 };
}
