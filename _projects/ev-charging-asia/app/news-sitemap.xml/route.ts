// Google News Sitemap for EV Charging Asia
// Serves the 10 most recent blog posts for Google News eligibility
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap

import blogIndex from '@/data/blog-index.json';

const BASE_URL = 'https://ev-charging-asia.vercel.app';

interface BlogEntry {
  slug: string;
  title: string;
  date: string;
  keywords?: string[];
}

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const posts = (blogIndex as BlogEntry[])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${posts.map(post => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <news:news>
      <news:publication>
        <news:name>EV Charging Asia</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date).toISOString().split('T')[0]}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
      ${post.keywords ? `<news:keywords>${escapeXml(post.keywords.slice(0, 5).join(', '))}</news:keywords>` : ''}
    </news:news>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
