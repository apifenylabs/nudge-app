import type { MetadataRoute } from "next";

const BASE_URL = "https://senior-friendly-travel-asia.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
