// ═══════════════════════════════════════════════
// Social Beast — Seed Data (localStorage)
// ═══════════════════════════════════════════════
// Adds 3 posts on first visit so the dashboard
// never shows up empty. Runs once via the STORAGE_SEEDED flag.
// ═══════════════════════════════════════════════

// Build log: https://social-beast-two.vercel.app/build-log
// May 14: 17 milestones, 6 blog posts, 30 AI tools, 3 Nudge phases

import type { Post } from './types';

const SEEDED_KEY = 'social-beast-seeded';
const STORAGE_KEY = 'social-beast-posts';

const SEED_POSTS: Post[] = [
  {
    id: 'seed-1',
    content: `1,125 EV stations mapped. 90 AI tools catalogued. 520 luxury destinations. 583 family-tested spots. 106+ blog posts.

One solo founder. Zero employees. AI agents doing the work.

That's what 24 hours of building looks like.

Full build log → https://social-beast-two.vercel.app/build-log`,
    platform: 'twitter',
    status: 'scheduled',
    mediaUrls: [],
    affiliateLinks: [],
    scheduledFor: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postedAt: null,
    engagement: { likes: 0, shares: 0, clicks: 0, impressions: 0 },
  },
  {
    id: 'seed-2',
    content: `I shipped recurring task auto-creation for a family task manager today. The 2 AM edge case that nearly broke everything? Jan 31 → Feb 28 month rollover.

Also built: offline IndexedDB queue that syncs when you reconnect. Entire infra runs on DeepSeek-chat at ~$0.65/day. Six sites. 3K+ pages.

This is how solopreneurs scale in 2026. Not by hiring. By building agents that build for you.`,
    platform: 'linkedin',
    status: 'scheduled',
    mediaUrls: [],
    affiliateLinks: [],
    scheduledFor: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postedAt: null,
    engagement: { likes: 0, shares: 0, clicks: 0, impressions: 0 },
  },
  {
    id: 'seed-3',
    content: `Just published the full May 14 build log — 17 milestones in one 24-hour cycle:

🚗 5 EV road trip guides (KL→SG, Japan, Thailand coastal, China Yangtze, Singapore hotels)
🤖 Apifeny AI grew from 60→90 tools
📝 6 new blog posts across 4 travel sites
🏠 Nudge shipped 3 major phases: edit/delete UI, offline queue, recurring tasks
💰 Total cost: $0.65

See the numbers → https://social-beast-two.vercel.app/build-log`,
    platform: 'twitter',
    status: 'draft',
    mediaUrls: [],
    affiliateLinks: [],
    scheduledFor: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postedAt: null,
    engagement: { likes: 0, shares: 0, clicks: 0, impressions: 0 },
  },
];

export function ensureSeedData(): void {
  if (typeof window === 'undefined') return;
  const alreadySeeded = localStorage.getItem(SEEDED_KEY);
  if (alreadySeeded === 'true') return;
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing && JSON.parse(existing).length > 0) {
    localStorage.setItem(SEEDED_KEY, 'true');
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
  localStorage.setItem(SEEDED_KEY, 'true');
  console.log('[Social Beast] Seeded posts to localStorage');
}
