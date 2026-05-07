import type { AnalyticsData, Platform } from "./types";
import { getPosts } from "./posts";

// ───── Analytics Helpers ───────────────────────────────────────────────────

export async function getAnalyticsData(): Promise<AnalyticsData[]> {
  const posts = await getPosts();
  const daily: Record<string, AnalyticsData> = {};

  for (const post of posts) {
    const date = post.createdAt.split("T")[0];
    if (!daily[date]) {
      daily[date] = {
        date,
        postsCreated: 0,
        postsPublished: 0,
        totalEngagement: 0,
        platformBreakdown: {
          twitter: 0,
          telegram: 0,
          linkedin: 0,
          instagram: 0,
          blog: 0,
        },
      };
    }
    daily[date].postsCreated++;
    if (post.status === "posted") {
      daily[date].postsPublished++;
    }
    daily[date].platformBreakdown[post.platform]++;
    if (post.engagement) {
      const eng = post.engagement.likes + post.engagement.shares + post.engagement.clicks;
      daily[date].totalEngagement += eng;
    }
  }

  return Object.values(daily).sort((a, b) => a.date.localeCompare(b.date));
}

// Placeholder engagement data for demo
export function getMockAnalytics(): { name: string; value: number }[] {
  return [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 80 },
    { name: "Wed", value: 200 },
    { name: "Thu", value: 150 },
    { name: "Fri", value: 90 },
    { name: "Sat", value: 60 },
    { name: "Sun", value: 110 },
  ];
}

export function getMockPlatformBreakdown(): { name: string; value: number }[] {
  return [
    { name: "Twitter", value: 45 },
    { name: "Telegram", value: 30 },
    { name: "LinkedIn", value: 15 },
    { name: "Blog", value: 10 },
  ];
}

export async function getTotalStats() {
  const posts = await getPosts();
  const total = posts.length;
  const posted = posts.filter((p) => p.status === "posted").length;
  const totalEngagement = posts.reduce(
    (sum, p) =>
      sum +
      (p.engagement?.likes || 0) +
      (p.engagement?.shares || 0) +
      (p.engagement?.clicks || 0),
    0
  );

  return { totalPosts: total, publishedPosts: posted, totalEngagement };
}
