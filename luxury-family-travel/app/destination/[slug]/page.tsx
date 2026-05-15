import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientDestinationPage from './_client';
import { allDestinations, getDestinationBySlug, type Destination } from '@/lib/data';

const BASE_URL = 'https://luxuryfamilytravelasia.com';

// Generate static params for all 520 destinations at build time
export function generateStaticParams() {
  return allDestinations.map((d) => ({ slug: d.slug || d.id }));
}

// Allow ISR fallback for future added destinations
export const dynamicParams = true;

function buildLuxuryDescription(d: Destination): string {
  const shortDesc = d.description.length > 140
    ? d.description.substring(0, 140).replace(/\s\S*$/, '') + '...'
    : d.description;
  return `${shortDesc} A premium ${d.category.toLowerCase()} experience in ${d.city}, ${d.country} — curated for families with children aged ${d.ageRange}. Rated ${d.safetyRating}/5.`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);

  if (!d) return { title: 'Destination Not Found' };

  const title = `${d.name} | ${d.city}, ${d.country} - Luxury Family Travel Asia`;
  const description = buildLuxuryDescription(d);
  const keywords = [
    `luxury family travel ${d.city}`,
    `${d.city} luxury ${d.category.toLowerCase()}`,
    `luxury ${d.name} with kids`,
    `premium family experiences ${d.country}`,
    `${d.city} 5-star family activities`,
    ...(d.seoKeywords || [])
  ].join(', ');

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${BASE_URL}/destination/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/destination/${slug}`,
      siteName: 'Luxury Family Travel Asia',
      images: [{
        url: d.imageUrl,
        width: 1200,
        height: 630,
        alt: `${d.name} - Luxury family experience in ${d.city}, ${d.country}`,
      }],
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
      'max-snippet': -1,
    },
  };
}

function jsonLd(d: Destination, slug: string): string {
  const cleanSlug = d.slug || d.id;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": d.name,
    "description": d.description,
    "url": `${BASE_URL}/destination/${cleanSlug}`,
    "image": d.imageUrl,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": d.city,
      "addressCountry": d.country
    },
    "isAccessibleForFree": d.priceRange === "Free",
    "amenityFeature": d.amenities.map((a: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": a
    })),
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": parseInt(d.ageRange.split('-')[0]) || 2,
      "suggestedMaxAge": parseInt(d.ageRange.split('-')[1]?.split('+')[0]) || 18
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": d.safetyRating,
      "bestRating": 5,
      "ratingCount": 1
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/destination/${cleanSlug}`
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": d.city, "item": `${BASE_URL}?city=${encodeURIComponent(d.city)}` },
      { "@type": "ListItem", "position": 3, "name": d.name, "item": `${BASE_URL}/destination/${cleanSlug}` }
    ]
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>\n<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`;
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getDestinationBySlug(slug);

  if (!found) notFound();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: jsonLd(found, slug) }} />
      <ClientDestinationPage initialData={found} slug={slug} />
    </>
  );
}
