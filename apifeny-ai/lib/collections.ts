// ══════════════════════════════════════════════════════════
// APIFENY.AI — Curated Collections
// ══════════════════════════════════════════════════════════
// Cosme-style editorial collections for stickiness.
// Each collection curates tools around a theme.
// ══════════════════════════════════════════════════════════

export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Slugs of tools in this collection (ordered by relevance) */
  tool_slugs: string[];
  /** Visual theme for the collection card */
  gradient: string;
  /** Icon emoji */
  icon: string;
  /** SEO meta */
  meta_title?: string;
  meta_description?: string;
}

/**
 * Curated collections for Cosme-style editorial curation.
 * Tools are selected based on:
 *   - Relevance to the collection theme
 *   - Asia Score (minimum 5)
 *   - Trending Score (minimum 50)
 *   - Editorial judgment
 */
export const collections: Collection[] = [
  {
    slug: 'ai-agents-solopreneurs',
    title: 'Best AI Agents for Solopreneurs',
    subtitle: 'Your one-person startup team',
    description:
      'The best AI agents and tools for solo founders and solopreneurs. From coding assistants to marketing agents, build your dream team without hiring.',
    tool_slugs: ['cursor', 'chatgpt', 'perplexity', 'canva-ai', 'elevenlabs', 'notion-ai'],
    gradient: 'from-neon/40 to-aqua/30',
    icon: '🚀',
    meta_title: 'Best AI Agents for Solopreneurs — Apifeny AI',
    meta_description:
      'Curated AI tools and agents for solo founders. Code assistants, marketing agents, and productivity tools for solopreneurs in Asia.',
  },
  {
    slug: 'productivity-ai-busy-parents',
    title: 'Best Productivity AI for Busy Parents',
    subtitle: 'Save time, reduce stress',
    description:
      'AI tools that help busy parents save time on planning, communication, content creation, and daily tasks. Spend less time on admin, more on what matters.',
    tool_slugs: ['chatgpt', 'gemini', 'canva-ai', 'notion-ai', 'perplexity', 'elevenlabs'],
    gradient: 'from-emerald-400/30 to-sky-400/30',
    icon: '👨‍👩‍👧‍👦',
    meta_title: 'Best AI Tools for Busy Parents — Apifeny AI',
    meta_description:
      'AI tools curated for parents in Asia. Save time on planning, meal prep, homework help, and family organization.',
  },
  {
    slug: 'ai-family-travel',
    title: 'Best AI Tools for Family Travel',
    subtitle: 'Smarter trips, happier families',
    description:
      'Plan family vacations with AI-powered travel assistants, itinerary planners, translation tools, and photo editors. Perfect for Asia-Pacific travel.',
    tool_slugs: ['gemini', 'chatgpt', 'perplexity', 'canva-ai', 'elevenlabs', 'midjourney'],
    gradient: 'from-sky-400/30 to-indigo-400/30',
    icon: '✈️',
    meta_title: 'Best AI Tools for Family Travel — Apifeny AI',
    meta_description:
      'AI-powered travel planning for families in Asia. Itinerary planning, language translation, photo editing, and more.',
  },
  {
    slug: 'ai-asian-languages',
    title: 'Best AI for Asian Languages',
    subtitle: 'Native multilingual support',
    description:
      'AI tools with the best support for Asian languages — Chinese, Japanese, Korean, Thai, Vietnamese, Indonesian, Hindi, and more. Local pricing and data residency included.',
    tool_slugs: ['gemini', 'chatgpt', 'claude', 'canva-ai', 'hugging-face', 'synthesia'],
    gradient: 'from-asia/30 to-amber-400/30',
    icon: '🌏',
    meta_title: 'Best AI Tools for Asian Languages — Apifeny AI',
    meta_description:
      'Curated AI tools with native Asian language support. Chinese, Japanese, Korean, Thai, Vietnamese, and more. Local pricing and Asia-ready features.',
  },
];

/** Get a collection by slug */
export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/** Get all collection slugs for SSG */
export function getAllCollectionSlugs(): string[] {
  return collections.map((c) => c.slug);
}
