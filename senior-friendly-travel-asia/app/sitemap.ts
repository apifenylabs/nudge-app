import type { MetadataRoute } from "next";

const BASE_URL = "https://seniorfriendlytravel.asia";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
