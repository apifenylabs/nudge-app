import { NextResponse } from "next/server";
import { POSTS } from "@/lib/blog-data";

const SITE_URL = "https://titan.apifeny.com";
const SITE_NAME = "Titan — AI Agent Builder";
const DESCRIPTION = "Build, train, and deploy AI agents with Titan. The gamified agent builder with progression, mascots, and swarm orchestration.";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = POSTS.map(
    (post) => `
    <entry>
      <id>${SITE_URL}/blog/${escapeXml(post.slug)}</id>
      <title>${escapeXml(post.title)}</title>
      <link href="${SITE_URL}/blog/${escapeXml(post.slug)}"/>
      <updated>${new Date(post.date).toISOString()}</updated>
      <summary type="html">${escapeXml(post.excerpt)}</summary>
      <author><name>${escapeXml(post.author)}</name></author>
      <category term="${escapeXml(post.category)}"/>
    </entry>`
  ).join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_NAME)} Blog</title>
  <subtitle>${escapeXml(DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/feed" rel="self"/>
  <link href="${SITE_URL}"/>
  <updated>${new Date(POSTS[0]?.date ?? Date.now()).toISOString()}</updated>
  <id>${SITE_URL}/feed</id>
  <author>
    <name>Titan Team</name>
  </author>
  ${items}
</feed>`;

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
