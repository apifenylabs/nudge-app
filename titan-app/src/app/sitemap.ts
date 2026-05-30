import { MetadataRoute } from 'next'

const BASE_URL = 'https://titan-app-puce.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Top-level pages ──
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/features`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/changelog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },

    // ── Dashboard (app-level pages — require auth) ──
    { url: `${BASE_URL}/dashboard`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/dashboard/progression`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/dashboard/lifeos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/dashboard/forge`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/dashboard/analytics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${BASE_URL}/dashboard/automation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${BASE_URL}/dashboard/swarm`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${BASE_URL}/dashboard/security`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${BASE_URL}/dashboard/billing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },

    // ── Robotics ──
    { url: `${BASE_URL}/robotics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/robotics/dashboard`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${BASE_URL}/byo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/affiliate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]
}
