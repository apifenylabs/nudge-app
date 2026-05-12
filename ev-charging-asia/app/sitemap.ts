import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import type { Station } from '@/lib/scoring';
import { getAllItineraries } from '@/data/itineraries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const filePath = path.join(process.cwd(), 'data', 'stations.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const stations: Station[] = JSON.parse(raw);

  const stationUrls = stations.map(s => ({
    url: `https://ev-charging-asia.vercel.app/station/${s.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const allRoutes = getAllItineraries();
  const routeUrls = allRoutes.map(r => ({
    url: `https://ev-charging-asia.vercel.app/routes/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Short-slug itinerary pages (/itinerary/[slug])
  const shortSlugs = allRoutes.map(r => {
    const slugParts = r.slug.split('-');
    // Build short slug from the first two meaningful parts
    // Use explicit map for known routes
    return r.slug;
  });

  const slugMapping: Record<string, string> = {
    'bangkok-to-phuket-road-trip': 'bangkok-phuket',
    'bangkok-to-chiang-mai-road-trip': 'bangkok-chiang-mai',
    'singapore-to-kuala-lumpur-road-trip': 'singapore-kuala-lumpur',
    'bali-ev-road-trip-loop': 'bali-loop',
    'hong-kong-to-macau-road-trip': 'hong-kong-macau',
    'hanoi-to-ha-long-bay-road-trip': 'hanoi-ha-long',
    'osaka-to-tokyo-road-trip': 'osaka-tokyo',
    'kuala-lumpur-to-penang-road-trip': 'kuala-lumpur-penang',
    'mumbai-to-pune-road-trip': 'mumbai-pune',
    'tokyo-to-hakone-fuji-road-trip': 'tokyo-hakone-fuji',
    'delhi-to-jaipur-agra-road-trip': 'delhi-jaipur-agra',
    'chiang-mai-to-pai-mae-hong-son-road-trip': 'chiang-mai-pai-mae-hong-son',
  };

  const itineraryUrls = allRoutes.map(r => ({
    url: `https://ev-charging-asia.vercel.app/itinerary/${slugMapping[r.slug] || r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [
    { url: 'https://ev-charging-asia.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://ev-charging-asia.vercel.app/itinerary', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://ev-charging-asia.vercel.app/search', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://ev-charging-asia.vercel.app/routes', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://ev-charging-asia.vercel.app/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://ev-charging-asia.vercel.app/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://ev-charging-asia.vercel.app/compare', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...routeUrls,
    ...itineraryUrls,
    ...stationUrls,
  ];
}
