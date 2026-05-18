import type { MetadataRoute } from 'next';
import { allDestinations } from '@/lib/data';
import blogIndex from '@/data/blog-index.json';

const BASE_URL = 'https://luxury-family-travel-asia.vercel.app';

interface BlogIndexEntry {
  slug: string;
  date: string;
  excerpt?: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const destinations = allDestinations as Array<{ id: string; slug?: string; name: string; city: string; country: string; category: string }>;
  const blogPosts: BlogIndexEntry[] = Object.entries(blogIndex).map(([slug, entry]) => ({
    slug,
    date: (entry as { date: string }).date,
    excerpt: (entry as { excerpt: string }).excerpt,
  }));

  const seenCities = new Set<string>();
  const uniqueCities: { slug: string; name: string }[] = [];

  for (const dest of destinations) {
    if (!seenCities.has(dest.city)) {
      seenCities.add(dest.city);
      uniqueCities.push({ slug: slugify(dest.city), name: dest.city });
    }
  }

  const seenCategories = new Set<string>();
  const uniqueCategories: { slug: string; name: string }[] = [];

  for (const dest of destinations) {
    if (!seenCategories.has(dest.category)) {
      seenCategories.add(dest.category);
      uniqueCategories.push({ slug: slugify(dest.category), name: dest.category });
    }
  }

  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/top10`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  // NOTE: /city/ and /category/ routes are NOT implemented yet. Excluding until routes exist.
  // City/category pages will be added when their route handlers are built.

  const destinationEntries: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${BASE_URL}/destination/${dest.slug || dest.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    let lastMod = new Date(post.date);
    if (isNaN(lastMod.getTime())) lastMod = new Date();
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  return [...staticEntries, ...destinationEntries, ...blogEntries];
}
