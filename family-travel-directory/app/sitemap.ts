import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://familytravelasia.com';

// ─── Types ──────────────────────────────────────────────────────

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

/**
 * Convert a name to a URL-safe slug.
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
  // ─── Load destinations ─────────────────────────────────────────
  const destPath = path.join(process.cwd(), 'public', 'data', 'destinations.json');
  const raw = fs.readFileSync(destPath, 'utf-8');
  const destinations: Destination[] = JSON.parse(raw);

  // ─── Load long-tail index ──────────────────────────────────────
  let longTailPages: LongTailPage[] = [];
  try {
    const ltPath = path.join(process.cwd(), 'public', 'data', 'longtail-index.json');
    longTailPages = JSON.parse(fs.readFileSync(ltPath, 'utf-8'));
  } catch {
    // long-tail index may not exist yet
  }

  // ─── Collect unique cities & categories ───────────────────────
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

  // ─── Get blog posts ────────────────────────────────────────────
  let blogSlugs: string[] = [];
  try {
    const blogDir = path.join(process.cwd(), 'data', 'blog');
    if (fs.existsSync(blogDir)) {
      blogSlugs = fs.readdirSync(blogDir)
        .filter(f => f.endsWith('.json'))
        .map(f => JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf-8')))
        .map((p: any) => p.slug);
    }
  } catch {
    // blog dir may not exist
  }

  // ─── Entries ──────────────────────────────────────────────────

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

    // City pages
    ...uniqueCities.map((city) => ({
      url: `${BASE_URL}/city/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Category pages
    ...uniqueCategories.map((cat) => ({
      url: `${BASE_URL}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // Destination pages
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
