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

interface BlogPost {
  slug: string;
  title: string;
}

interface Playbook {
  slug: string;
  title: string;
}

interface RankingCategory {
  slug: string;
  title: string;
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

  // Blog posts from blog-data (which wraps generated-blog-data)
  const blogPosts: BlogPost[] = (() => {
    try {
      const { getAllPosts } = require('../lib/blog-data');
      return getAllPosts();
    } catch { return []; }
  })();

  // Playbooks from lib
  const playbooks: Playbook[] = (() => {
    try {
      const { playbooks: pbs } = require('../lib/playbooks');
      return pbs;
    } catch { return []; }
  })();

  // Ranking categories from lib
  const rankingCategories: RankingCategory[] = (() => {
    try {
      const { RANKING_CATEGORIES } = require('../lib/ranking-categories');
      return RANKING_CATEGORIES;
    } catch { return []; }
  })();

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/collections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/rankings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/playbooks`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  // Tool pages
  const toolEntries: MetadataRoute.Sitemap = tools.map((tool): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/tools/${tool.slug || tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Collection detail pages (from collections.json)
  const collectionEntries: MetadataRoute.Sitemap = collections.map((col): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/collections/${col.slug || col.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Blog detail pages
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Playbook pages (index + individual)
  const playbookEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/playbook`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...playbooks.map((p): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/playbook/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];

  // Ranking category pages
  const rankingEntries: MetadataRoute.Sitemap = rankingCategories.map((rc): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/rankings/${rc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Category pages
  interface CategoryEntry {
    slug: string;
    name: string;
  }
  const categories: CategoryEntry[] = (() => {
    try {
      const { CATEGORIES } = require('../lib/category-data');
      return Object.values(CATEGORIES);
    } catch { return []; }
  })();

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...toolEntries,
    ...collectionEntries,
    ...blogEntries,
    ...playbookEntries,
    ...rankingEntries,
    ...categoryEntries,
  ];
}
