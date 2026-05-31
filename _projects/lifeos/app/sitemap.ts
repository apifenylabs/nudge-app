import { MetadataRoute } from 'next';
import { PLUGINS } from '@/app/lib/plugin-registry';

/**
 * LifeOS Sitemap — Static route generation
 *
 * Covers:
 * - Root (home page)
 * - Plugins directory index
 * - Each plugin detail page (9 total)
 * - Analytics page
 * - Quick Actions page
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lifeos.vercel.app';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/plugins`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/quick-actions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ];

  // Plugin detail pages
  const pluginPages = PLUGINS.map((plugin) => ({
    url: `${baseUrl}/plugins/${plugin.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: plugin.status === 'active' ? 0.8 : 0.5,
  }));

  return [...staticPages, ...pluginPages];
}
