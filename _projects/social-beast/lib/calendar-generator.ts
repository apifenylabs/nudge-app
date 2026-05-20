// ═══════════════════════════════════════════════════════════════
// Social Beast — Calendar Generator
// Auto-generates a week of draft posts from content buckets
// ═══════════════════════════════════════════════════════════════

import type { Post, Platform } from "./types";
import { createPost } from "./posts";
import {
  CONTENT_BUCKETS,
  getLastWeekBucketDistribution,
} from "./content-buckets";
import { addDays, format, setHours, setMinutes } from "date-fns";

// ───── Daily Posting Schedule ─────────────────────────────────────────────

export interface DaySchedule {
  dayOfWeek: number; // 0=Sun, 1=Mon...
  slots: {
    time: { hour: number; minute: number };
    platform: Platform;
    bucketId: string;
  }[];
}

// Best posting times by platform
const DEFAULT_SCHEDULE: DaySchedule[] = [
  {
    dayOfWeek: 1, // Monday
    slots: [
      { time: { hour: 9, minute: 0 }, platform: "twitter", bucketId: "build-in-public" },
      { time: { hour: 12, minute: 0 }, platform: "linkedin", bucketId: "industry-commentary" },
    ],
  },
  {
    dayOfWeek: 2, // Tuesday
    slots: [
      { time: { hour: 9, minute: 0 }, platform: "twitter", bucketId: "product-deep-dives" },
      { time: { hour: 18, minute: 0 }, platform: "telegram", bucketId: "behind-the-scenes" },
    ],
  },
  {
    dayOfWeek: 3, // Wednesday
    slots: [
      { time: { hour: 9, minute: 0 }, platform: "twitter", bucketId: "humor-relatability" },
      { time: { hour: 12, minute: 0 }, platform: "linkedin", bucketId: "user-wins" },
      { time: { hour: 16, minute: 0 }, platform: "instagram", bucketId: "behind-the-scenes" },
    ],
  },
  {
    dayOfWeek: 4, // Thursday
    slots: [
      { time: { hour: 9, minute: 0 }, platform: "twitter", bucketId: "build-in-public" },
      { time: { hour: 12, minute: 0 }, platform: "linkedin", bucketId: "product-deep-dives" },
    ],
  },
  {
    dayOfWeek: 5, // Friday
    slots: [
      { time: { hour: 9, minute: 0 }, platform: "twitter", bucketId: "industry-commentary" },
      { time: { hour: 12, minute: 0 }, platform: "telegram", bucketId: "cross-promo" },
      { time: { hour: 16, minute: 0 }, platform: "instagram", bucketId: "humor-relatability" },
    ],
  },
  {
    dayOfWeek: 6, // Saturday
    slots: [
      { time: { hour: 10, minute: 0 }, platform: "twitter", bucketId: "build-in-public" },
      { time: { hour: 14, minute: 0 }, platform: "linkedin", bucketId: "user-wins" },
    ],
  },
  {
    dayOfWeek: 0, // Sunday
    slots: [
      { time: { hour: 10, minute: 0 }, platform: "telegram", bucketId: "industry-commentary" },
    ],
  },
];

// ───── Template Filler ────────────────────────────────────────────────────

interface FillContext {
  platform: Platform;
  bucketId: string;
  date: Date;
  index: number; // which template variation in the bucket we're using
}

const FILLERS: Record<string, string[]> = {
  // Build in Public
  "bip-shipping_feature": ["the analytics dashboard", "the offline sync queue", "the calendar view", "the content scheduler", "the affiliate link builder", "the cross-post engine"],
  "bip-shipping_what_it_does": ["Tracks real-time engagement across all platforms in one view", "Queues up actions when offline and syncs seamlessly on reconnect", "Gives you a bird's-eye view of your entire content month", "Schedules posts with platform-specific formatting and auto-publish", "Auto-links products with booking/affiliate partner APIs", "Publishes once, broadcasts everywhere with platform-aware formatting"],
  "bip-shipping_challenge": ["handling edge cases", "getting the timing right", "making it fast at scale", "the state management", "cross-platform compatibility"],
  "bip-shipping_solution": ["a state machine that covers every transition", "async generators and debounced writes", "a virtualized list with windowed rendering", "zod schemas + type-safe reducers", "feature flags and graceful degradation"],
  "bip-shipping_link": ["https://social-beast-two.vercel.app/build-log"],
  "bip-metrics_metric": ["100 posts created", "50 scheduled posts", "1,000 total engagements", "5 connected platforms", "10 weekly active users"],
  "bip-metrics_number": ["100", "50", "1,000", "5", "10"],
  "bip-metrics_unit": ["posts", "scheduled items", "engagements", "platforms", "active users"],
  "bip-metrics_thing": ["created this month", "in the calendar", "across all platforms", "linked", "this week"],
  "bip-metrics_strategy_1": ["consistent daily posting at 9 AM", "thread-style content with 3-5 tweets", "cross-posting to Telegram for reach"],
  "bip-metrics_strategy_2": ["posting after 6 PM (low engagement)", "overly technical deep dives", "ignoring comments and DMs"],
  "bip-metrics_lesson": ["Consistency beats volume every time.", "Engagement is a conversation, not a broadcast.", "Platforms reward frequency over perfection."],
  "bip-lesson_time": ["3 days", "a week", "two weekends", "6 hours"],
  "bip-lesson_mistake": ["building a custom CMS", "rewriting the calendar component", "optimizing before measuring", "hand-rolling auth"],
  "bip-lesson_reason": ["no one needed it — existing tools work fine", "the original design was already good enough", "the bottleneck was somewhere else entirely", "it added complexity with zero user-facing value"],
  "bip-lesson_retrospective": ["use an existing headless CMS and customize from there", "iterate on the current design rather than starting over", "profile first, optimize second, ship third", "use a managed auth provider like Clerk or NextAuth"],
  // Product Deep Dives
  "pdd-feature_feature_name": ["Content Calendar", "Cross-Platform Publisher", "Analytics Dashboard", "Post Templates", "Affiliate Link Builder"],
  "pdd-feature_one_liner": ["Plan your entire month of content in one grid view", "Write once, publish to Twitter + LinkedIn + Telegram + more", "See exactly which content resonates across every platform", "Save & reuse your best performing post structures", "Auto-generate monetized links for Booking, Klook, Viator"],
  "pdd-feature_value_prop": ["Never miss a posting day again — see gaps at a glance", "No more copy-pasting to each platform manually", "Data-driven content decisions instead of guessing", "Maintain brand consistency while scaling output", "Turn every post into a revenue opportunity"],
  "pdd-feature_link": ["https://social-beast-two.vercel.app"],
  "pdd-feature_tech_stack": ["Next.js 14 + Tailwind + Recharts + localStorage"],
  // Industry Commentary
  "ic-hot-take_take": ["AI won't replace builders — it'll replace the ones who don't use it.", "The solo founder era is here because of agent orchestration.", "Building in public is the new resume.", "localStorage is the new MVP database.", "A $0.65/day build cost is not impressive — it's table stakes."],
  "ic-hot-take_trend": ["AI agents", "solo founder movement", "build in public", "no-code tools", "indie hacking"],
  "ic-hot-take_contrarian_view": ["the real unlock is in orchestration, not the models themselves", "most 'teams' of 10 could be replaced by 1 person + agents", "most people are documenting, not building", "code still matters more than ever — you just write less of it", "the only moat is distribution, not technology"],
  // Cross-promo
  "cp-site-spotlight_topic": ["family-friendly destinations in Asia", "luxury travel guides", "EV charging stations", "AI tools for productivity", "task management for families"],
  "cp-site-spotlight_sister_site": ["Family Travel Directory", "Luxury Family Travel Asia", "EV Charging Asia", "Apifeny AI", "Nudge Task Manager"],
  "cp-site-spotlight_description": ["583 family-tested destinations across Asia with parent reviews", "520 luxury destinations curated for families who travel well", "1,125 EV charging stations mapped across 12 countries", "90+ AI tools catalogued with pricing, features, and reviews", "a family task manager with recurring tasks and offline sync"],
  "cp-site-spotlight_content_type": ["destinations", "luxury spots", "charging stations", "AI tools", "tasks"],
  "cp-site-spotlight_focus": ["Asia family travel", "luxury family experiences", "EV road trips", "AI productivity", "family organization"],
  "cp-site-spotlight_free_or_not": ["completely free", "free to browse", "open to all", "free directory", "free to use"],
  "cp-site-spotlight_link": ["https://family-travel-directory.vercel.app", "https://luxury-family-travel-asia.vercel.app", "https://ev-charging-asia.vercel.app", "https://apifeny-ai-tools.vercel.app", "https://nudge-family.vercel.app"],
  "cp-site-spotlight_tag": ["familytravel", "luxurytravel", "evcharging", "aitools", "productivity"],
  // Behind the Scenes
  "bts-tools_year": ["2026", "current"],
  "bts-tools_product": ["Social Beast", "the directory network", "this content engine", "6 sites at once"],
  "bts-tools_frontend": ["Next.js 14 + Tailwind + TypeScript", "Next.js 14 app router", "Tailwind with custom design system"],
  "bts-tools_backend": ["localStorage (MVP — serverless coming)", "static generation + ISR", "client-side data layer"],
  "bts-tools_ai_tool": ["DeepSeek-chat via OpenClaw", "Claude + DeepSeek ensemble", "OpenClaw sub-agent orchestration"],
  "bts-tools_hosting": ["Vercel (all 6 sites)", "Vercel Pro — 6 projects, 1 dashboard"],
  "bts-tools_cost": ["$0.65", "~$0.65", "less than $1"],
  "bts-tools_linkedin_platform": ["Twitter/X, LinkedIn", "Twitter + LinkedIn", "all 5 platforms"],
  // Humor
  "hr-dev-life_time_later": ["3 hours", "6 hours", "the next morning", "a full weekend"],
  "hr-dev-life_unexpected_result": ["I've refactored the entire component tree", "I've somehow broken the build on all 6 sites", "I'm now reading about state machines at 2 AM", "I've created 3 new bugs in the process"],
  "hr-dev-life_bug_cause": ["a missing semicolon", "an off-by-one error", "wrong import path", "a race condition", "it was DNS"],
  "hr-dev-life_common_pattern": ["the simplest thing", "a typo", "something I wrote at 11 PM", "caching"],
  // User Wins
  "uw-testimonial_quote": ["This tool saved me hours of manual posting every week", "I finally have a consistent content schedule", "The analytics are a game changer for understanding my audience", "I built my entire content strategy around this"],
  "uw-testimonial_username": ["@indiehacker_sam", "Sarah from TravelCo", "@buildermike", "Jessica, solo founder"],
  "uw-testimonial_product": ["Social Beast", "the content calendar", "the platform scheduler"],
  "uw-testimonial_outcome": ["doubled their posting frequency without extra effort", "schedules 2 weeks of content in 30 minutes", "grew their Twitter following 3x in a month"],
};

function fillTemplate(
  template: string,
  ctx: FillContext
): string {
  let result = template;

  // Replace all {{placeholder}} occurrences
  const placeholders = template.match(/\{\{(\w+)\}\}/g) || [];

  for (const placeholder of placeholders) {
    const key = placeholder.slice(2, -2); // remove {{ and }}
    // Try template-specific key first, then generic key
    const lookupKey = `${ctx.bucketId}_${key}`;
    const options = FILLERS[lookupKey] || FILLERS[key];
    if (options && options.length > 0) {
      const idx = ctx.index % options.length;
      const value = options[idx];
      // Handle arrays within arrays
      const finalValue = Array.isArray(value) ? value[ctx.index % value.length] : value;
      result = result.replace(placeholder, finalValue);
    } else {
      // Leave unfilled placeholders as-is (user can edit)
      result = result.replace(placeholder, `[${key}]`);
    }
  }

  // Add a note about editing
  return result;
}

// ───── Generate a week of posts ───────────────────────────────────────────

export async function generateWeek(
  startDate: Date = new Date()
): Promise<{ generated: number; posts: Post[] }> {
  const generated: Post[] = [];
  const today = new Date(startDate);

  // Find the next Monday
  const dayOfWeek = today.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : (8 - dayOfWeek) % 7;
  const monday = addDays(today, daysUntilMonday);

  // Keep track of bucket usage for even distribution
  const bucketUsage: Record<string, number> = {};
  for (const bucket of CONTENT_BUCKETS) {
    bucketUsage[bucket.id] = 0;
  }

  // Template rotation index per bucket
  const templateIndex: Record<string, number> = {};

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = addDays(monday, dayOffset);
    const scheduleEntry = DEFAULT_SCHEDULE.find((s) => s.dayOfWeek === date.getDay());
    if (!scheduleEntry) continue;

    for (const slot of scheduleEntry.slots) {
      // Find the bucket
      const bucket = CONTENT_BUCKETS.find((b) => b.id === slot.bucketId);
      if (!bucket) continue;

      // Choose a template from this bucket (rotate)
      if (!templateIndex[slot.bucketId]) {
        templateIndex[slot.bucketId] = 0;
      }
      const templateIdx = templateIndex[slot.bucketId] % bucket.templates.length;
      const template = bucket.templates[templateIdx];
      templateIndex[slot.bucketId]++;

      // Build the scheduled time
      const scheduledDate = setMinutes(
        setHours(date, slot.time.hour),
        slot.time.minute
      );

      // Fill the template
      const content = fillTemplate(template.body, {
        platform: slot.platform,
        bucketId: template.id,
        date,
        index: templateIdx,
      });

      // Create the post in localStorage
      const post = await createPost({
        content,
        platform: slot.platform as Platform,
        status: "draft",
        postedAt: null,
        mediaUrls: [],
        affiliateLinks: [],
        scheduledFor: scheduledDate.toISOString(),
      });

      bucketUsage[slot.bucketId]++;
      generated.push(post);
    }
  }

  return { generated: generated.length, posts: generated };
}

// ───── Export schedule for reference ──────────────────────────────────────

export function getWeeklySchedule(): DaySchedule[] {
  return DEFAULT_SCHEDULE;
}
