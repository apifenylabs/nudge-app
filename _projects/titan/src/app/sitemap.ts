import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://titan-app-puce.vercel.app";

  const platformSlugs = ["ros2", "arduino", "raspberry-pi", "custom-hardware"];

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/features`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/sandbox`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/robotics`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...platformSlugs.map((slug) => ({
      url: `${base}/robotics/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${base}/affiliates`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/dashboard`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
