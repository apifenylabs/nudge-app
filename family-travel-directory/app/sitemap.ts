import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://family-travel-directory.vercel.app';

interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
}

/**
 * Convert a city name to a URL-safe slug.
 * Examples: "Hong Kong" → "hong-kong", "New York" → "new-york"
 */
function slugifyCity(name: string): string {
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

  // Collect unique cities
  const seen = new Set<string>();
  const uniqueCities: { slug: string; name: string }[] = [];

  for (const dest of destinations) {
    if (!seen.has(dest.city)) {
      seen.add(dest.city);
      uniqueCities.push({ slug: slugifyCity(dest.city), name: dest.city });
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
  ];

  // City pages — dynamically generated from data
  const cityEntries: MetadataRoute.Sitemap = uniqueCities.map((city) => ({
    url: `${BASE_URL}/city/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Individual destination pages
  const destinationEntries: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${BASE_URL}/destination/${dest.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Category pages
  const categories = [
    'theme-parks',
    'zoos',
    'museums',
    'parks',
    'hotels',
    'restaurants',
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...cityEntries,
    ...destinationEntries,
    ...categoryEntries,
  ];
}
