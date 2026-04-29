import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import type { Station } from '@/lib/scoring';

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

  return [
    { url: 'https://ev-charging-asia.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://ev-charging-asia.vercel.app/search', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://ev-charging-asia.vercel.app/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://ev-charging-asia.vercel.app/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...stationUrls,
  ];
}
