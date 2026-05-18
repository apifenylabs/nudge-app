import { NextResponse } from 'next/server';
import blogIndex from '@/data/blog-index.json';

const SITE_URL = 'https://ev-charging-asia.vercel.app';
const SITE_NAME = 'EV Charging Asia';
const SITE_DESC = 'Guides, comparisons, and tips about EV charging across Asia.';

interface BlogIndexEntry {
  slug: string;
  date: string;
}

export async function GET() {
  const posts = (blogIndex as BlogIndexEntry[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = posts.map(post => {
    const safeTitle = post.slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    return `
    <item>
      <title><![CDATA[${safeTitle}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[Read our guide about ${safeTitle} on EV Charging Asia.]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>EV Charging Asia Team</author>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESC}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/og-image.jpg</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
