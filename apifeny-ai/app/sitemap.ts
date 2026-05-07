import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://apifeny-ai.vercel.app';

interface Tool {
  id: string;
  name: string;
  slug: string;
}

interface Collection {
  id: string;
  name: string;
  slug: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Load dynamic data at build time
  const tools: Tool[] = (() => {
    try {
      const filePath = path.join(process.cwd(), 'data', 'tools.json');
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    } catch { return []; }
  })();

  const collections: Collection[] = (() => {
    try {
      const filePath = path.join(process.cwd(), 'data', 'collections.json');
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    } catch { return []; }
  })();

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Tool pages
  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug || tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Collection pages
  const collectionEntries: MetadataRoute.Sitemap = collections.map((col) => ({
    url: `${BASE_URL}/collections/${col.slug || col.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Playbook pages
  const playbookEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/playbook`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  return [
    ...staticEntries,
    ...toolEntries,
    ...collectionEntries,
    ...playbookEntries,
  ];
}
