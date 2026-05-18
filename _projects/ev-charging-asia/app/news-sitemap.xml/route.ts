import { NextResponse } from 'next/server';
import blogIndex from '@/data/blog-index.json';

const SITE_URL = 'https://ev-charging-asia.vercel.app';

interface BlogIndexEntry {
  slug: string;
  date: string;
}

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
}

export async function GET() {
  // Google News sitemap: last 90 days only, max 1000 articles
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const recentPosts = (blogIndex as BlogIndexEntry[])
    .filter(p => new Date(p.date) >= ninetyDaysAgo)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 1000);

  const urls = recentPosts.map(post => {
    const title = slugToTitle(post.slug);
    return `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>EV Charging Asia</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${post.date}</news:publication_date>
      <news:title><![CDATA[${title}]]></news:title>
      <news:keywords>EV charging,Asia,electric vehicle,road trip</news:keywords>
    </news:news>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
