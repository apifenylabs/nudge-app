// Server component — preloads metadata and blog posts at build time
import { Metadata } from 'next';
import { getMeta } from '@/lib/getData';
import { getAllPosts } from '@/lib/blog-data';
import HomeContent from './page-content';

const BASE_URL = 'https://familytravelasia.com';

export const metadata: Metadata = {
  title: 'Asia Family Travel Directory — Best Destinations & Activities for Families',
  description: 'Curated family travel guide to the best kid-friendly destinations across Asia. Real parent reviews, safety-rated activities, age-filtered recommendations, and practical tips.',
  openGraph: {
    title: 'Asia Family Travel Directory — Trusted by Parents Across Asia',
    description: 'Find the best family-friendly destinations, activities, and travel tips for Asia. Curated by parents, rated by families.',
    url: BASE_URL,
    siteName: 'Asia Family Travel Directory',
    type: 'website',
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Asia Family Travel Directory' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asia Family Travel Directory',
    description: 'Find the best family-friendly destinations across Asia. Curated by parents, rated by families.',
    images: [`${BASE_URL}/og-image.jpg`],
  },
  alternates: { canonical: BASE_URL },
};

export default function Page() {
  const meta = getMeta();
  const blogPosts = getAllPosts();
  return (
    <>
      <h1 className="sr-only">Asia Family Travel Directory — Best Family Destinations, Activities & Travel Tips</h1>
      <HomeContent meta={meta} blogPosts={blogPosts} />
    </>
  );
}
