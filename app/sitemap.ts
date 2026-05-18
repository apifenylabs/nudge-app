import type { MetadataRoute } from 'next';
import { allDestinations } from '@/lib/data';

interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
}

interface LongTailPage {
  slug: string;
  city: string;
  country: string;
  destination_count: number;
}

// Blog posts loaded via static import (legacy markdown posts)
import blogPosts from '@/data/blog-posts.json';
// Generated JSON blog posts from data/blog/*.json
import generatedPosts from '@/lib/generated-blog-data';

const BASE_URL = 'https://www.familytravelasia.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const destinations: Destination[] = allDestinations as Destination[];

  // Load long-tail index (silently fail if missing)
  let longTailPages: LongTailPage[] = [];
  try {
    // Dynamic import will work at build time
    longTailPages = require('@/data/longtail-index.json') as LongTailPage[];
  } catch {
    // long-tail index may not exist — it's in public/data/ not data/
  }

  // Collect unique cities & categories for potential future use
  const seenCategories = new Set<string>();
  const uniqueCategories: { slug: string; name: string }[] = [];
  for (const dest of destinations) {
    if (!seenCategories.has(dest.category)) {
      seenCategories.add(dest.category);
      uniqueCategories.push({
        slug: dest.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        name: dest.category,
      });
    }
  }

  // Get blog slugs from BOTH sources (legacy markdown + generated JSON)
  const legacySlugs: string[] = (blogPosts as Array<{ slug: string }>)
    .map(p => p.slug)
    .filter(Boolean);
  const generatedSlugs = generatedPosts.map(p => p.slug).filter(Boolean);
  const blogSlugs = [...new Set([...legacySlugs, ...generatedSlugs])].sort();

  const entries: MetadataRoute.Sitemap = [
    // Static pages
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    { url: `${BASE_URL}/review`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/health`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.1 },

    // Destination pages (via slug = id for family-travel-directory)
    ...destinations.map((dest) => ({
      url: `${BASE_URL}/destination/${dest.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // Blog post pages
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // Long-tail SEO pages (highest priority after homepage)
    ...longTailPages.map((page) => ({
      url: `${BASE_URL}/activity/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ];

  return entries;
}
