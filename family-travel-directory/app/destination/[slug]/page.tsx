import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientDestinationPage from './_client';
import { promises as fs } from 'fs';
import path from 'path';

interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  ageRange: string;
  safetyRating: number;
  priceRange: string;
  popularity: number;
  description: string;
  location: string;
  bestTime: string;
  imageUrl: string;
  amenities: string[];
  safetyFeatures: string[];
  tipsAndTricks: string[];
  gallery?: string[];
  parentStory: { title: string; excerpt: string; author: string; fullStory: string };
  itineraryComparison: { halfDay: string; fullDay: string; bestFor: string };
  commissionRate: string;
  seoKeywords: string[];
  revenue_engine?: { klook_product_id?: string | null; viator_product_id?: string | null; current_price_usd?: number | null; last_price_check?: string | null; };
}

const BASE_URL = 'https://familytravelasia.com';

async function getDestinations(): Promise<Destination[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'destinations.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch { return []; }
}

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({ slug: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destinations = await getDestinations();
  const d = destinations.find((x) => x.id === slug);

  if (!d) return { title: 'Destination Not Found' };

  const cityFamilyKeyword = `${d.city} with kids`;
  const cityKeyword = `things to do in ${d.city}`;
  const topKeyword = `family travel ${d.country}`;
  const categoryKeyword = `${d.category.toLowerCase()} ${d.city}`;

  // Build SEO-optimized title: destination name first, then city/country context
  const title = `${d.name}, ${d.city} | Family-Friendly ${d.category} in ${d.country} — Family Travel Asia`;
  
  // Build rich description with primary keywords
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
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": d.name,
    "description": d.description,
    "url": `${BASE_URL}/destination/${d.id}`,
    "image": d.imageUrl,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": d.city,
      "addressCountry": d.country
    },
    "isAccessibleForFree": d.priceRange === "$",
    "amenityFeature": d.amenities.map((a: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": a
    })),
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": Math.min(parseInt(d.ageRange.split('-')[0]) || 2, 10),
      "suggestedMaxAge": Math.max(parseInt(d.ageRange.split('-')[1]?.split('+')[0]) || 18, 12)
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": d.safetyRating,
      "bestRating": 5,
      "ratingCount": Math.max(d.tipsAndTricks?.length || 1, 1)
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/destination/${d.id}`
    }
  };

  // Add price range if available
  if (d.priceRange) {
    schema.priceRange = d.priceRange;
  }

  // Add content location for geo context
  if (d.location) {
    const locationParts = d.location.split(',');
    if (locationParts.length >= 2 && !isNaN(parseFloat(locationParts[0]))) {
      schema.geo = {
        "@type": "GeoCoordinates",
        "latitude": parseFloat(locationParts[0]),
        "longitude": parseFloat(locationParts[1].trim())
      };
    }
  }

  // Breadcrumb
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": d.city, "item": `${BASE_URL}/search?city=${encodeURIComponent(d.city)}` },
      { "@type": "ListItem", "position": 3, "name": d.name, "item": `${BASE_URL}/destination/${d.id}` }
    ]
  };

  // FAQ schema from tipsAndTricks
  const faq = d.tipsAndTricks?.length >= 3 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": d.tipsAndTricks.slice(0, 5).map((tip: string) => ({
      "@type": "Question",
      "name": `What should I know about visiting ${d.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": tip
      }
    }))
  } : null;

  const schemas = [schema, breadcrumb];
  if (faq) schemas.push(faq);

  return schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s, null, 0)}</script>`).join('\n');
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destinations = await getDestinations();
  const found = destinations.find((d) => d.id === slug);

  if (!found) notFound();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: jsonLd(found) }} />
      <ClientDestinationPage initialData={found} slug={slug} />
    </>
  );
}
