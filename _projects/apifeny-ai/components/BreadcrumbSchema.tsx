'use client';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

/**
 * Reusable JSON-LD BreadcrumbList schema component.
 * Injects schema.org BreadcrumbList structured data for SEO.
 *
 * Usage:
 *   <BreadcrumbSchema
 *     items={[
 *       { name: 'Home', item: '/' },
 *       { name: 'Tools', item: '/tools' },
 *     ]}
 *   />
 */
export default function BreadcrumbSchema({ items, baseUrl = 'https://apifeny.ai' }: BreadcrumbSchemaProps) {
  const fullUrl = (path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: fullUrl(item.item),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbJsonLd),
      }}
    />
  );
}
