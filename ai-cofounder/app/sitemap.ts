import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cofounder.ai";

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/waitlist`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const categoryRoutes = [
    { slug: "meal-planning", priority: 0.9 },
    { slug: "personal-finance", priority: 0.8 },
    { slug: "solopreneur", priority: 0.8 },
    { slug: "travel", priority: 0.8 },
  ].map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: cat.priority,
  }));

  const blogRoutes = [
    { url: `${baseUrl}/blog/meal-planning-ai-guide`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog/ai-meal-planning-saved-money`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const legalRoutes = [
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes, ...legalRoutes];
}
