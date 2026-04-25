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
}

const BASE_URL = 'https://family-travel-directory.vercel.app';

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

  const title = `${d.name} | ${d.city}, ${d.country} - Family Travel Asia`;
  const description = `${d.description.substring(0, 160)} Perfect for ages ${d.ageRange}, rated ${d.safetyRating}/5 safety.`;
  const keywords = [`family travel ${d.city}`, `${d.city} with kids`, `${d.name}`, ...(d.seoKeywords || [])].join(', ');

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
  const schema = {
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
      "@id": `${BASE_URL}/destination/${d.id}`
    }
  };

  // Also add BreadcrumbList
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": d.city, "item": `${BASE_URL}?city=${encodeURIComponent(d.city)}` },
      { "@type": "ListItem", "position": 3, "name": d.name, "item": `${BASE_URL}/destination/${d.id}` }
    ]
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>\n<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`;
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
