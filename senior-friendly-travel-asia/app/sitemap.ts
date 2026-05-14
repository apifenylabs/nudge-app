import type { MetadataRoute } from "next";
import { getAllPosts } from '@/lib/blog-data';

const BASE_URL = "https://seniorfriendlytravel.asia";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/health`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
  ];

  // Blog post pages (20 posts)
  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Activity/destination pages (from data files - parse slugs from imports)
  const activityEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/activity`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  return [
    ...staticEntries,
    ...blogEntries,
    ...activityEntries,
  ];
}
