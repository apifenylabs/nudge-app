// ───── Core Types ──────────────────────────────────────────────────────────

export type Platform = "twitter" | "telegram" | "linkedin" | "instagram" | "blog";
export type PostStatus = "draft" | "scheduled" | "posted" | "archived";

export interface Post {
  id: string;
  content: string;
  platform: Platform;
  status: PostStatus;
  mediaUrls: string[];
  affiliateLinks: AffiliateLink[];
  scheduledFor: string | null; // ISO date string
  createdAt: string;
  updatedAt: string;
  postedAt: string | null;
  engagement?: Engagement;
}

export interface AffiliateLink {
  provider: "booking" | "klook" | "viator";
  url: string;
  label: string;
}

export interface Schedule {
  id: string;
  postId: string;
  platform: Platform;
  scheduledAt: string;
  status: "pending" | "published" | "failed";
}

export interface Engagement {
  likes: number;
  shares: number;
  clicks: number;
  impressions: number;
}

export interface AnalyticsData {
  date: string;
  postsCreated: number;
  postsPublished: number;
  totalEngagement: number;
  platformBreakdown: Record<Platform, number>;
}

export interface PlatformConnection {
  id: Platform;
  name: string;
  connected: boolean;
  apiKey?: string;
  username?: string;
}

export interface ContentSource {
  id: string;
  name: string;
  type: "family-travel" | "luxury" | "ev";
  path: string;
  enabled: boolean;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
  pinned: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Settings {
  platforms: PlatformConnection[];
  defaultSchedule: string;
  contentSources: ContentSource[];
  brandVoice: string;
  timezone: string;
  darkMode: boolean;
}
