import { MetadataRoute } from 'next'

const BASE_URL = 'https://titan.apifeny.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BASE_URL;
  return [
    // ── Top-level pages ──
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/features`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/changelog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/compare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/sandbox`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/byo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/affiliate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },

    // ── Dashboard (app-level pages — require auth) ──
    { url: `${base}/dashboard`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/dashboard/progression`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/dashboard/lifeos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/dashboard/lifeos/marketplace`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${base}/dashboard/forge`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/dashboard/analytics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${base}/dashboard/automation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${base}/dashboard/swarm`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${base}/dashboard/security`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${base}/dashboard/billing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },

    // ── Robotics ──
    { url: `${base}/robotics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/robotics/dashboard`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
  ];
}
