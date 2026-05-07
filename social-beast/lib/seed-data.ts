// ═══════════════════════════════════════════════
// Social Beast — Seed Data (localStorage)
// ═══════════════════════════════════════════════
// Adds 3 demo posts on first visit so the dashboard
// never shows up empty. Runs once via the STORAGE_SEEDED flag.
// ═══════════════════════════════════════════════

import type { Post } from './types';

const SEEDED_KEY = 'social-beast-seeded';
const STORAGE_KEY = 'social-beast-posts';

const SEED_POSTS: Post[] = [
  {
    id: 'seed-1',
    content: 'Just launched our new AI-powered travel planner! 🌏✨ It suggests itineraries based on your mood, budget, and how many bubble teas you\'ve had today. Try it now →',
    platform: 'twitter',
    status: 'posted',
    mediaUrls: [],
    affiliateLinks: [],
    scheduledFor: null,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    engagement: { likes: 42, shares: 12, clicks: 230, impressions: 3400 },
  },
  {
    id: 'seed-2',
    content: '📊 Weekly digest: Asia\'s AI tools scene is heating up. Cursor hit #1 trending, Perplexity rolled out deep research mode for Asian languages. Here\'s what you missed →',
    platform: 'telegram',
    status: 'posted',
    mediaUrls: [],
    affiliateLinks: [],
    scheduledFor: null,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    engagement: { likes: 128, shares: 34, clicks: 410, impressions: 5200 },
  },
  {
    id: 'seed-3',
    content: 'Building in public: This tool (Social Beast) is my experiment in autonomous content ops. So far: 3 platforms connected, 12 posts scheduled, 0 human effort required. Full breakdown in the thread 🧵',
    platform: 'linkedin',
    status: 'posted',
    mediaUrls: [],
    affiliateLinks: [],
    scheduledFor: null,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    postedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    engagement: { likes: 67, shares: 8, clicks: 180, impressions: 2100 },
  },
];

export function ensureSeedData(): void {
  if (typeof window === 'undefined') return;

  // Only seed once per localStorage instance
  const alreadySeeded = localStorage.getItem(SEEDED_KEY);
  if (alreadySeeded === 'true') return;

  // Check if there's already real data
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing && JSON.parse(existing).length > 0) {
    // Mark seeded so we don't check again
    localStorage.setItem(SEEDED_KEY, 'true');
    return;
  }

  // Write seed posts
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
  localStorage.setItem(SEEDED_KEY, 'true');

  console.log('[Social Beast] Seeded 3 demo posts to localStorage');
}
