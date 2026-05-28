/**
 * Structured Data (JSON-LD) helpers for Apifeny AI Directory.
 * Generates schema.org markup to improve search result appearance.
 */

export interface CountryMeta {
  name: string;
  slug: string;
  code: string;
  capital?: string;
  currency?: string;
  lang?: string;
  market?: string;
}

/**
 * BreadcrumbList schema for a country page.
 * Example: Home > AI Tools > Singapore
 */
export function breadcrumbSchema(sections: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: sections.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      item: `https://apifeny-ai.vercel.app${s.url}`,
    })),
  };
}

/**
 * ItemList schema for a directory page listing tools in a category/location.
 */
export function toolDirectorySchema({
  name,
  description,
  country,
  toolCount,
  url,
}: {
  name: string;
  description: string;
  country: string;
  toolCount: number;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url: `https://apifeny-ai.vercel.app${url}`,
    numberOfItems: toolCount,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: `Best AI Tools in ${country}`,
      },
    ],
    about: {
      '@type': 'Thing',
      name: `AI Tools for ${country}`,
      description: `Curated directory of AI tools for ${country} teams and developers.`,
    },
    inLanguage: 'en',
    countryOfOrigin: country,
  };
}

/**
 * WebSite schema for enhanced search appearance (site name, search action).
 */
export function siteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Apifeny AI Directory',
    url: 'https://apifeny-ai.vercel.app',
    description: 'Curated AI tools directory for teams and developers, ranked by local relevance.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://apifeny-ai.vercel.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * FAQPage schema for country-specific FAQ sections.
 */
export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/**
 * Merge multiple schemas into a single @graph array.
 */
export function mergeSchemas(schemas: Record<string, unknown>[]) {
  if (schemas.length === 1) return schemas[0];
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
