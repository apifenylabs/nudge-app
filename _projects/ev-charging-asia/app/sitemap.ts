import { MetadataRoute } from 'next';
import type { Station } from '@/lib/scoring';
import { getAllItineraries } from '@/data/itineraries';
import stationsData from '@/data/stations.json';
import blogIndex from '@/data/blog-index.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stations: Station[] = stationsData as Station[];

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

  const slugMapping: Record<string, string> = {
    'bangkok-to-phuket-road-trip': 'bangkok-phuket',
    'bangkok-to-chiang-mai-road-trip': 'bangkok-chiang-mai',
    'singapore-to-kuala-lumpur-road-trip': 'singapore-kuala-lumpur',
    'singapore-to-kuala-lumpur-family-ev-road-trip': 'singapore-kuala-lumpur-family',
    'bali-ev-road-trip-loop': 'bali-loop',
    'bali-family-ev-road-trip-loop': 'bali-family',
    'hong-kong-to-macau-road-trip': 'hong-kong-macau',
    'hanoi-to-ha-long-bay-road-trip': 'hanoi-ha-long',
    'osaka-to-tokyo-road-trip': 'osaka-tokyo',
    'kuala-lumpur-to-penang-road-trip': 'kuala-lumpur-penang',
    'kuala-lumpur-to-penang-family-ev-road-trip': 'kuala-lumpur-penang-family',
    'mumbai-to-pune-road-trip': 'mumbai-pune',
    'tokyo-to-hakone-fuji-road-trip': 'tokyo-hakone-fuji',
    'delhi-to-jaipur-agra-road-trip': 'delhi-jaipur-agra',
    'chiang-mai-to-pai-mae-hong-son-road-trip': 'chiang-mai-pai-mae-hong-son',
    'seoul-to-busan-road-trip': 'seoul-busan',
    'manila-to-baguio-road-trip': 'manila-baguio',
  };

  const itineraryUrls = allRoutes.map(r => ({
    url: `https://ev-charging-asia.vercel.app/itinerary/${slugMapping[r.slug] || r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const blogPosts = blogIndex as Array<{ slug: string; date: string }>;
  const blogUrls = blogPosts.map(b => ({
    url: `https://ev-charging-asia.vercel.app/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [
    { url: 'https://ev-charging-asia.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://ev-charging-asia.vercel.app/itinerary', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://ev-charging-asia.vercel.app/search', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://ev-charging-asia.vercel.app/routes', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://ev-charging-asia.vercel.app/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://ev-charging-asia.vercel.app/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://ev-charging-asia.vercel.app/compare', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://ev-charging-asia.vercel.app/seasons', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...routeUrls,
    ...itineraryUrls,
    ...blogUrls,
    ...stationUrls,
  ];
}
