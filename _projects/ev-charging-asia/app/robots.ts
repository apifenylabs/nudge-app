import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/health'],
    },
    sitemap: [
      'https://ev-charging-asia.vercel.app/sitemap.xml',
      'https://ev-charging-asia.vercel.app/news-sitemap.xml',
    ],
  };
}
