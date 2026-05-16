import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientDestinationPage from './_client';
import { allDestinations, type Destination } from '@/lib/data';

const BASE_URL = 'https://familytravelasia.com';

// 🧱 Pre-render all destination pages at build time for instant loads + SEO
// dynamicParams: true + ISR handles newly added destinations on-demand.
export const dynamicParams = true;
export const revalidate = 86400; // ISR: revalidate every 24h

export async function generateStaticParams() {
  return allDestinations.map((d) => ({ slug: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = allDestinations.find((x) => x.id === slug);
  if (!d) return { title: 'Destination Not Found' };

  const cityFamilyKeyword = `${d.city} with kids`;
  const cityKeyword = `things to do in ${d.city}`;
  const topKeyword = `family travel ${d.country}`;
  const categoryKeyword = `${d.category.toLowerCase()} ${d.city}`;

  const title = `${d.name}, ${d.city} | Family-Friendly ${d.category} in ${d.country} — Family Travel Asia`;
  const descPrefix = d.description.substring(0, 140).replace(/[\n\r]+/g, ' ').trim();
  const description = `${descPrefix} Rated ${d.safetyRating}/5 safety. Best for ages ${d.ageRange}. Plan your family trip to ${d.city}, ${d.country}.`;

  const keywords = [
    cityFamilyKeyword,
    cityKeyword,
    topKeyword,
    categoryKeyword,
    `family friendly ${d.city}`,
    `${d.city} family activities`,
    `${d.name} review`,
    `${d.city} travel guide family`,
    ...(d.seoKeywords || []),
  ].filter(Boolean).join(', ');

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${BASE_URL}/destination/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/destination/${slug}`,
      siteName: 'Asia Family Travel Directory',
      images: [{ url: d.imageUrl, width: 800, height: 600 }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [d.imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  };
}

function jsonLd(d: Destination): string {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": d.name,
    "description": d.description,
    "url": `${BASE_URL}/destination/${d.id}`,
    "image": d.imageUrl,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": d.city,
      "addressCountry": d.country,
    },
    "isAccessibleForFree": d.priceRange === "$",
    "amenityFeature": d.amenities.map((a: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": a,
    })),
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": Math.min(parseInt(d.ageRange.split('-')[0]) || 2, 10),
      "suggestedMaxAge": Math.max(parseInt(d.ageRange.split('-')[1]?.split('+')[0]) || 18, 12),
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": d.safetyRating,
      "bestRating": 5,
      "ratingCount": Math.max(d.tipsAndTricks?.length || 1, 1),
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/destination/${d.id}`,
    },
  };

  if (d.priceRange) {
    schema.priceRange = d.priceRange;
  }

  if (d.location) {
    const locationParts = d.location.split(',');
    if (locationParts.length >= 2 && !isNaN(parseFloat(locationParts[0]))) {
      schema.geo = {
        "@type": "GeoCoordinates",
        "latitude": parseFloat(locationParts[0]),
        "longitude": parseFloat(locationParts[1].trim()),
      };
    }
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": d.city, "item": `${BASE_URL}/search?city=${encodeURIComponent(d.city)}` },
      { "@type": "ListItem", "position": 3, "name": d.name, "item": `${BASE_URL}/destination/${d.id}` },
    ],
  };

  const faq = d.tipsAndTricks?.length >= 3
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": d.tipsAndTricks.slice(0, 5).map((tip: string) => ({
          "@type": "Question",
          "name": `What should I know about visiting ${d.name}?`,
          "acceptedAnswer": { "@type": "Answer", text: tip },
        })),
      }
    : null;

  const schemas: Record<string, unknown>[] = [schema, breadcrumb];
  if (faq) schemas.push(faq);

  return schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s, null, 0)}</script>`)
    .join('\n');
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = allDestinations.find((d) => d.id === slug);
  if (!found) notFound();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: jsonLd(found) }} />
      <ClientDestinationPage initialData={found} slug={slug} />
    </>
  );
}
