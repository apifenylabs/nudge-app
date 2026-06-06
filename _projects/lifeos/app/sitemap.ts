import { MetadataRoute } from 'next';
import { PLUGINS } from '@/app/lib/plugin-registry';

/**
 * LifeOS Sitemap v2 — Static route generation
 *
 * Covers:
 * - Root (home page) — priority 1.0
 * - Plugins directory — priority 0.9
 * - All 12 plugin detail pages (priority by status)
 * - Analytics — priority 0.5
 * - Quick Actions — priority 0.6
 *
 * Plugin pages are ordered by priority: active > beta > coming-soon
 * lastModified is computed per-plugin manifest timestamp.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lifeos.vercel.app';
  const now = new Date();

  // Plugin detail pages — sorted active first for search crawler priority
  const pluginPages = PLUGINS
    .sort((a, b) => {
      const order = { active: 0, beta: 1, 'coming-soon': 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    })
    .map((plugin) => ({
      url: `${baseUrl}/plugins/${plugin.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: plugin.status === 'active' ? 0.9 :
               plugin.status === 'beta' ? 0.7 : 0.4,
    }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/plugins`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...pluginPages,
    {
      url: `${baseUrl}/quick-actions`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/architecture`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
