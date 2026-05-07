import { MetadataRoute } from 'next';
import { getAllActivities } from '@/lib/getData';

export default function sitemap(): MetadataRoute.Sitemap {
  const activities = getAllActivities();

  const activityEntries: MetadataRoute.Sitemap = activities.map(activity => ({
    url: `https://kids-activities-asia.vercel.app/activity/${activity.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://kids-activities-asia.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://kids-activities-asia.vercel.app/search',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://kids-activities-asia.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...activityEntries,
  ];
}
