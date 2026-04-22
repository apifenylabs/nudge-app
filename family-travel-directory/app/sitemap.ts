import type { MetadataRoute } from 'next';

const BASE_URL = 'https://family-travel-directory.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
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

  // City pages — each city is a key landing page
  const cities = [
    { slug: 'tokyo', name: 'Tokyo Family Activities' },
    { slug: 'osaka', name: 'Osaka Family Activities' },
    { slug: 'singapore', name: 'Singapore Family Activities' },
    { slug: 'bangkok', name: 'Bangkok Family Activities' },
    { slug: 'nara', name: 'Nara Family Activities' },
    { slug: 'hong-kong', name: 'Hong Kong Family Activities' },
    { slug: 'bali', name: 'Bali Family Activities' },
  ];

  const cityEntries: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/city/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categories = [
    'theme-parks', 'zoos', 'museums', 'parks', 'hotels', 'restaurants',
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...cityEntries, ...categoryEntries];
}
