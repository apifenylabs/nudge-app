import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

interface BlogPost {
  slug: string;
  date: string;
}

const BASE_URL = 'https://luxuryfamilytravelasia.com';

interface Destination {
  id: string;
  slug?: string;
  name: string;
  city: string;
  country: string;
  category: string;
}

/**
 * Convert a name to a URL-safe slug.
 * Examples: "Hong Kong" → "hong-kong", "Parks & Nature" → "parks-nature"
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Read destinations.json at build time
  const filePath = path.join(process.cwd(), 'public', 'data', 'destinations.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const destinations: Destination[] = JSON.parse(raw);

  // Read blog posts from data/blog/*.json
  let blogPosts: BlogPost[] = [];
  try {
    const blogDir = path.join(process.cwd(), 'data', 'blog');
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.json') && !f.endsWith('.raw'));
    for (const bf of blogFiles) {
      const rawPost = fs.readFileSync(path.join(blogDir, bf), 'utf-8');
      const post = JSON.parse(rawPost);
      if (post.slug) {
        blogPosts.push({ slug: post.slug, date: post.date || new Date().toISOString() });
      }
    }
  } catch (e) {
    console.warn('Could not read blog posts for sitemap:', e);
  }

  // Collect unique cities from actual data
  const seenCities = new Set<string>();
  const uniqueCities: { slug: string; name: string }[] = [];

  for (const dest of destinations) {
    if (!seenCities.has(dest.city)) {
      seenCities.add(dest.city);
      uniqueCities.push({ slug: slugify(dest.city), name: dest.city });
    }
  }

  // Collect unique categories from actual data
  const seenCategories = new Set<string>();
  const uniqueCategories: { slug: string; name: string }[] = [];

  for (const dest of destinations) {
    if (!seenCategories.has(dest.category)) {
      seenCategories.add(dest.category);
      uniqueCategories.push({ slug: slugify(dest.category), name: dest.category });
    }
  }

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/top10`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // City pages — dynamically generated from actual data only
  const cityEntries: MetadataRoute.Sitemap = uniqueCities.map((city) => ({
    url: `${BASE_URL}/city/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Individual destination pages — use clean slug for SEO-friendly URLs
  const destinationEntries: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${BASE_URL}/destination/${dest.slug || dest.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Category pages — dynamically generated from actual data only
  const categoryEntries: MetadataRoute.Sitemap = uniqueCategories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Blog post pages
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

  return [
    ...staticEntries,
    ...cityEntries,
    ...destinationEntries,
    ...categoryEntries,
    ...blogEntries,
  ];
}
