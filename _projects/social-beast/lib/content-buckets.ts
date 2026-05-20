// ═══════════════════════════════════════════════════════════════
// Social Beast — Content Buckets
// 7 buckets with 3 templates each, frequency guidance, and
// recommended platforms for solo builders shipping in public.
// ═══════════════════════════════════════════════════════════════

import type { Platform } from "./types";

// ───── Types ──────────────────────────────────────────────────────────────

export interface ContentBucket {
  id: string;
  name: string;
  description: string;
  emoji: string;
  frequency: string; // e.g. "2-3x / week"
  bestPlatforms: Platform[];
  tone: string;
  templates: ContentTemplate[];
}

export interface ContentTemplate {
  id: string;
  title: string;
  body: string; // template with {{placeholder}} markers
  platforms: Platform[];
}

// ───── The 7 Buckets ──────────────────────────────────────────────────────

export const CONTENT_BUCKETS: ContentBucket[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    id: "build-in-public",
    name: "Build in Public",
    description: "Progress updates, metrics, lessons learned, and shipping logs",
    emoji: "🏗️",
    frequency: "3-4x / week",
    bestPlatforms: ["twitter", "linkedin"],
    tone: "Authentic, transparent, generous with knowledge",
    templates: [
      {
        id: "bip-shipping",
        title: "What I shipped today",
        platforms: ["twitter", "linkedin"],
        body:
          "Shipped {{feature}} today.\n\n{{what_it_does}}\n\nThe hardest part was {{challenge}} — solved it with {{solution}}.\n\nFull build log → {{link}}\n\n#buildinpublic #indiehacker",
      },
      {
        id: "bip-metrics",
        title: "Growth / metric milestone",
        platforms: ["twitter", "linkedin"],
        body:
          "Hit {{metric}} this week.\n\n{{number}} {{unit}} of {{thing}}.\n\nWhat worked: {{strategy_1}}\nWhat didn't: {{strategy_2}}\n\nLearning: {{lesson}}\n\n#buildinpublic #metrics",
      },
      {
        id: "bip-lesson",
        title: "Hard lesson learned",
        platforms: ["twitter", "linkedin", "telegram"],
        body:
          "I spent {{time}} building {{mistake}}.\n\nIt failed because {{reason}}.\n\nWhat I'd do instead: {{retrospective}}.\n\nThe best ideas come from failure.\n\n#buildinpublic #lessons",
      },
    ],
  },

  // 2 ─────────────────────────────────────────────────────────────────────
  {
    id: "product-deep-dives",
    name: "Product Deep Dives",
    description: "Feature highlights, tutorials, how-to guides, architecture walkthroughs",
    emoji: "🔧",
    frequency: "2x / week",
    bestPlatforms: ["linkedin", "twitter", "blog"],
    tone: "Technical, instructive, confident",
    templates: [
      {
        id: "pdd-feature",
        title: "Feature highlight",
        platforms: ["twitter", "linkedin"],
        body:
          "New feature: {{feature_name}} 🚀\n\nWhat it does: {{one_liner}}\n\nWhy you care: {{value_prop}}\n\nTry it → {{link}}\n\nMade with {{tech_stack}}",
      },
      {
        id: "pdd-tutorial",
        title: "Quick tutorial / how-to",
        platforms: ["linkedin", "blog"],
        body:
          "How I built {{feature_name}} in {{time}}: 🧵\n\n1/ The problem: {{problem}}\n2/ The approach: {{approach}}\n3/ The code/architecture: {{detail}}\n4/ The result: {{result}}\n\nFull deep dive → {{link}}\n\n#tutorial #webdev",
      },
      {
        id: "pdd-arch",
        title: "Architecture decision",
        platforms: ["twitter", "linkedin"],
        body:
          "Architecture decision: {{decision}}\n\nWhy {{option_a}} over {{option_b}}:\n- {{reason_1}}\n- {{reason_2}}\n- {{reason_3}}\n\nCost: {{cost}}\nComplexity: {{complexity}}\n\ndiscuss ↓",
      },
    ],
  },

  // 3 ─────────────────────────────────────────────────────────────────────
  {
    id: "industry-commentary",
    name: "Industry Commentary",
    description: "Hot takes on AI, trading, startups, and the future of building",
    emoji: "💡",
    frequency: "2-3x / week",
    bestPlatforms: ["twitter", "linkedin", "telegram"],
    tone: "Opinionated, forward-looking, provocative",
    templates: [
      {
        id: "ic-hot-take",
        title: "Hot take",
        platforms: ["twitter", "linkedin"],
        body:
          "Hot take: {{take}}\n\nEveryone is talking about {{trend}} but actually {{contrarian_view}}.\n\nWhy:\n1. {{reason_1}}\n2. {{reason_2}}\n3. {{reason_3}}\n\nChange my mind. 👇",
      },
      {
        id: "ic-trend-spot",
        title: "Trend spot / prediction",
        platforms: ["twitter", "telegram"],
        body:
          "I've been watching {{space}} closely for {{time}}.\n\nHere's where I think things are heading: {{prediction}}\n\nThe signal: {{signal}}\n\nThe noise: {{noise}}\n\nWhat do you think?",
      },
      {
        id: "ic-founders-advice",
        title: "Founder advice / takeaways",
        platforms: ["linkedin", "twitter"],
        body:
          "{{number}} things I wish I knew before building {{product}}:\n\n{{takeaway_1}}\n{{takeaway_2}}\n{{takeaway_3}}\n\nBONUS: {{takeaway_4}}\n\nSave this for later 🔖\n\n#startup #founder",
      },
    ],
  },

  // 4 ─────────────────────────────────────────────────────────────────────
  {
    id: "user-wins",
    name: "User Wins",
    description: "Testimonials, case studies, use cases, and success stories",
    emoji: "🏆",
    frequency: "1-2x / week",
    bestPlatforms: ["linkedin", "twitter", "instagram"],
    tone: "Celebratory, grateful, social-proof-driven",
    templates: [
      {
        id: "uw-testimonial",
        title: "User testimonial share",
        platforms: ["twitter", "linkedin"],
        body:
          `"{{quote}}" — {{username}}\n\n{{username}} used {{product}} to {{outcome}}.\n\nStories like this are why I build. 🙏\n\n{{link}}\n\n#customerlove #testimonial`,
      },
      {
        id: "uw-use-case",
        title: "Use case spotlight",
        platforms: ["linkedin", "instagram"],
        body:
          "How {{user_type}} uses {{product}}:\n\nTheir setup: {{setup}}\n\nTheir challenge: {{challenge}}\n\nOur solution: {{solution}}\n\nThe result: {{result}}\n\nWant to do the same? {{link}}",
      },
      {
        id: "uw-milestone",
        title: "Community milestone",
        platforms: ["twitter", "instagram"],
        body:
          "We just hit {{milestone}}! 🎉\n\n{{number}} {{thing}} in {{timeframe}}.\n\nThanks to every {{user_type}} who made this happen.\n\nThis is just the beginning. {{link}}\n\n#milestone #community",
      },
    ],
  },

  // 5 ─────────────────────────────────────────────────────────────────────
  {
    id: "behind-the-scenes",
    name: "Behind the Scenes",
    description: "Dev process, tools, setup, workspace, and how the sausage gets made",
    emoji: "🎬",
    frequency: "1-2x / week",
    bestPlatforms: ["twitter", "linkedin", "instagram"],
    tone: "Raw, personal, relatable",
    templates: [
      {
        id: "bts-tools",
        title: "My stack / tooling",
        platforms: ["twitter", "linkedin"],
        body:
          "My {{year}} stack for {{product}}:\n\n📱 Frontend: {{frontend}}\n⚙️ Backend: {{backend}}\n🤖 AI: {{ai_tool}}\n☁️ Hosting: {{hosting}}\n💰 Cost: {{cost}}/day\n\nWhat's your stack? 👇",
      },
      {
        id: "bts-workspace",
        title: "Workspace / setup",
        platforms: ["instagram", "twitter"],
        body:
          "Morning {{day_of_week}} setup ☕\n\n{{location}} • {{time}}\n\nWorking on: {{current_task}}\n\nPlaylist: {{playlist}}\n\n{{mood}}\n\n#workspace #desksetup #buildinpublic",
      },
      {
        id: "bts-process",
        title: "How I build",
        platforms: ["twitter", "linkedin"],
        body:
          "How I ship features:\n\n08:00 — {{morning_routine}}\n10:00 — {{deep_work}}\n12:00 — {{lunch}}\n14:00 — {{second_session}}\n16:00 — {{review}}\n18:00 — {{wrap_up}}\n\nCost per day: {{cost}}\n\nFull playbook → {{link}}",
      },
    ],
  },

  // 6 ─────────────────────────────────────────────────────────────────────
  {
    id: "humor-relatability",
    name: "Humor & Relatability",
    description: "Startup life memes, trading memes, relatable dev moments",
    emoji: "😅",
    frequency: "1-2x / week",
    bestPlatforms: ["twitter", "telegram", "instagram"],
    tone: "Funny, self-deprecating, shareable",
    templates: [
      {
        id: "hr-dev-life",
        title: "Dev life reality",
        platforms: ["twitter", "telegram"],
        body:
          "Me: I'll just fix this one bug real quick\n\nAlso me: {{time_later}} later, {{unexpected_result}}\n\nThe culprit: {{bug_cause}}\n\nIt's always {{common_pattern}}.\n\n#devhumor #programming",
      },
      {
        id: "hr-founder-life",
        title: "Founder life",
        platforms: ["twitter", "instagram"],
        body:
          "Solo founder sleep schedule:\n\n{{hour_1}} — {{activity_1}}\n{{hour_2}} — {{activity_2}}\n{{hour_3}} — {{activity_3}}\n{{hour_4}} — {{sleep}} (maybe)\n\nSponsored by {{caffeine_source}} ☕\n\n#startuplife #solopreneur",
      },
      {
        id: "hr-relatable",
        title: "Relatable building moment",
        platforms: ["twitter", "telegram"],
        body:
          "You know you're a builder when:\n\n- {{tell_1}}\n- {{tell_2}}\n- {{tell_3}}\n- {{tell_4}}\n\nTag someone who relates 👇\n\n#buildinpublic #developer",
      },
    ],
  },

  // 7 ─────────────────────────────────────────────────────────────────────
  {
    id: "cross-promo",
    name: "Cross-Promotion",
    description: "Other sites in the network, partner content, ecosystem cross-links",
    emoji: "🔗",
    frequency: "1x / week",
    bestPlatforms: ["twitter", "linkedin", "telegram"],
    tone: "Informative, helpful, generous",
    templates: [
      {
        id: "cp-site-spotlight",
        title: "Sister site spotlight",
        platforms: ["twitter", "linkedin"],
        body:
          "Looking for {{topic}}? We built {{sister_site}} — {{description}}.\n\n{{number}} {{content_type}} about {{focus}}.\n\nAll {{free_or_not}} at {{link}}\n\n#{{tag}} #resources",
      },
      {
        id: "cp-content-mashup",
        title: "Content mashup",
        platforms: ["twitter", "telegram"],
        body:
          "This week's reading list from across the network 📚\n\n1. {{title_1}} — {{site_1}}\n2. {{title_2}} — {{site_2}}\n3. {{title_3}} — {{site_3}}\n4. {{title_4}} — {{site_4}}\n\nSave for later 🔖\n\n#readinglist #resources",
      },
      {
        id: "cp-roundup",
        title: "Weekly roundup",
        platforms: ["telegram", "linkedin"],
        body:
          "📬 Weekly Roundup — {{date_range}}\n\n🚗 {{ev_title}} from {{ev_site}}\n✈️ {{travel_title}} from {{travel_site}}\n🤖 {{ai_title}} from {{ai_site}}\n🏠 {{nudge_title}} from {{nudge_site}}\n\nAll links → {{roundup_link}}\n\n#weeklyroundup #content",
      },
    ],
  },
];

// ───── Helpers ────────────────────────────────────────────────────────────

export function getBucket(id: string): ContentBucket | undefined {
  return CONTENT_BUCKETS.find((b) => b.id === id);
}

export function getBucketsForPlatform(platform: Platform): ContentBucket[] {
  return CONTENT_BUCKETS.filter((b) => b.bestPlatforms.includes(platform));
}

export function getLastWeekBucketDistribution(): {
  bucketId: string;
  count: number;
}[] {
  return [
    { bucketId: "build-in-public", count: 4 },
    { bucketId: "product-deep-dives", count: 2 },
    { bucketId: "industry-commentary", count: 2 },
    { bucketId: "user-wins", count: 1 },
    { bucketId: "behind-the-scenes", count: 1 },
    { bucketId: "humor-relatability", count: 1 },
    { bucketId: "cross-promo", count: 1 },
  ];
}
