// ══════════════════════════════════════════════════════════
// APIFENY.AI — Affiliate & Deep Link Registry
// ══════════════════════════════════════════════════════════
// Each entry maps a tool slug to:
//   - referral_url:   Direct affiliate or deep-link signup URL
//   - cta_label:      "Get Started", "Free Trial", etc.
//   - commission_note: What the affiliate program offers
//   - is_direct:      true = direct referral link, false = deep link
//   - badge:          Optional "Best Value" / "Most Popular" / "Free Tier" tag
//
// Structured by category for programmatic placement on tool detail pages.
// ══════════════════════════════════════════════════════════

export interface AffiliateLink {
  /** Matches tool.slug in data.ts */
  slug: string;
  /** Full referral / deep-link URL */
  referral_url: string;
  /** Button label */
  cta_label: string;
  /** Short description of what this offer includes */
  commission_note: string;
  /** true = direct referral with commission, false = deep signup link */
  is_direct: boolean;
  /** Optional visual badge */
  badge?: 'Best Value' | 'Most Popular' | 'Free Tier' | 'Pro Pick' | 'Free Trial';
}

// ─── Chatbots & Assistants ───

export const chatbotAffiliates: AffiliateLink[] = [
  {
    slug: 'chatgpt',
    referral_url: 'https://chatgpt.com',
    cta_label: 'Try ChatGPT Free',
    commission_note: 'Free tier available. Pro at $20/mo.',
    is_direct: false,
    badge: 'Most Popular',
  },
  {
    slug: 'claude',
    referral_url: 'https://claude.ai',
    cta_label: 'Try Claude Free',
    commission_note: 'Free tier with generous limits. Pro at $20/mo.',
    is_direct: false,
    badge: 'Pro Pick',
  },
  {
    slug: 'gemini',
    referral_url: 'https://gemini.google.com',
    cta_label: 'Use Gemini Free',
    commission_note: 'Completely free with Google account.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'deepseek',
    referral_url: 'https://chat.deepseek.com',
    cta_label: 'Chat with DeepSeek Free',
    commission_note: 'Free to use. No account needed for basic chat.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'kimi',
    referral_url: 'https://kimi.moonshot.cn',
    cta_label: 'Try Kimi Free',
    commission_note: 'Free Chinese AI assistant with long context support.',
    is_direct: false,
    badge: 'Free Tier',
  },
];

// ─── Image Generation ───

export const imageAffiliates: AffiliateLink[] = [
  {
    slug: 'midjourney',
    referral_url: 'https://www.midjourney.com',
    cta_label: 'Start with Midjourney',
    commission_note: 'From $10/mo for basic plan.',
    is_direct: false,
    badge: 'Pro Pick',
  },
  {
    slug: 'leonardo-ai',
    referral_url: 'https://leonardo.ai',
    cta_label: 'Try Leonardo AI Free',
    commission_note: 'Free tier with daily tokens. Paid from $10/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
];

// ─── Research & Analysis ───

export const researchAffiliates: AffiliateLink[] = [
  {
    slug: 'perplexity',
    referral_url: 'https://perplexity.ai',
    cta_label: 'Try Perplexity Free',
    commission_note: 'Free for basic research. Pro at $20/mo.',
    is_direct: false,
    badge: 'Most Popular',
  },
];

// ─── Code & Development ───

export const codeAffiliates: AffiliateLink[] = [
  {
    slug: 'copilot',
    referral_url: 'https://github.com/features/copilot',
    cta_label: 'Start Copilot Free Trial',
    commission_note: 'Free for verified students & OSS maintainers. $10/mo Individual.',
    is_direct: false,
    badge: 'Best Value',
  },
  {
    slug: 'cursor',
    referral_url: 'https://cursor.com',
    cta_label: 'Try Cursor Free',
    commission_note: 'Free tier with limited premium requests. Pro at $20/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'bolt-new',
    referral_url: 'https://bolt.new',
    cta_label: 'Start Building with Bolt',
    commission_note: 'Free tier available. Referral: 200K bonus tokens + 5M if friend upgrades.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'lovable',
    referral_url: 'https://lovable.dev/affiliates',
    cta_label: 'Try Lovable Free',
    commission_note: 'Affiliate program available (10-20% commission). Paid from $29/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'windsurf',
    referral_url: 'https://windsurf.com',
    cta_label: 'Try Windsurf Free',
    commission_note: 'Free tier included. Referral: 500 bonus flex credits. Pro from $15/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'devin',
    referral_url: 'https://devin.ai',
    cta_label: 'Try Devin',
    commission_note: 'AI software engineer from Cognition. Paid from $500/mo. Enterprise pricing.',
    is_direct: false,
    badge: 'Pro Pick',
  },
];

// ─── Productivity ───

export const productivityAffiliates: AffiliateLink[] = [
  {
    slug: 'notion-ai',
    referral_url: 'https://affiliate.notion.so/6m1l49i1a0ct',
    cta_label: 'Get Notion AI',
    commission_note: 'Referral program — earn credits. $10/mo AI add-on.',
    is_direct: true,
    badge: 'Best Value',
  },
];

// ─── Writing & Content ───

export const writingAffiliates: AffiliateLink[] = [
  {
    slug: 'jasper',
    referral_url: 'https://jasper.ai',
    cta_label: 'Start Jasper Free Trial',
    commission_note: '7-day free trial. Creator plan from $49/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'copy-ai',
    referral_url: 'https://www.copy.ai',
    cta_label: 'Try Copy.ai Free',
    commission_note: 'Free plan included. Pro from $36/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'deepl',
    referral_url: 'https://www.deepl.com/pro',
    cta_label: 'Try DeepL Pro Free',
    commission_note: 'Free tier available. Pro from $8.99/mo. Business partnerships available.',
    is_direct: false,
    badge: 'Best Value',
  },
];

// ─── Design & Creative ───

export const designAffiliates: AffiliateLink[] = [
  {
    slug: 'canva-ai',
    referral_url: 'https://www.canva.com',
    cta_label: 'Try Canva Magic Studio',
    commission_note: 'Free with generous limits. Pro at $13/mo.',
    is_direct: false,
    badge: 'Free Tier',
  },
];

// ─── Audio & Music ───

export const audioAffiliates: AffiliateLink[] = [
  {
    slug: 'elevenlabs',
    referral_url: 'https://elevenlabs.io',
    cta_label: 'Try ElevenLabs Free',
    commission_note: 'Free tier with limited chars. Paid from $5/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'murf-ai',
    referral_url: 'https://murf.ai',
    cta_label: 'Try Murf AI Free',
    commission_note: 'Affiliate: 20% recurring commission for 24 months. Paid from $19/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
];

// ─── Video & Animation ───

export const videoAffiliates: AffiliateLink[] = [
  {
    slug: 'runway',
    referral_url: 'https://runwayml.com',
    cta_label: 'Try Runway Free',
    commission_note: 'Free tier included. Paid from $12/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'synthesia',
    referral_url: 'https://www.synthesia.io',
    cta_label: 'Start Synthesia Free Trial',
    commission_note: 'Starter plan from $29/mo. Free demo available.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'descript',
    referral_url: 'https://www.descript.com',
    cta_label: 'Try Descript Free',
    commission_note: 'Free tier with watermark. Paid from $12/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
];

// ─── Open Source & ML Platforms ───

export const openSourceAffiliates: AffiliateLink[] = [
  {
    slug: 'hugging-face',
    referral_url: 'https://huggingface.co',
    cta_label: 'Explore Hugging Face',
    commission_note: 'Free ML model & dataset hub. Pro inference from $9/mo.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'langchain',
    referral_url: 'https://www.langchain.com',
    cta_label: 'Build with LangChain',
    commission_note: 'Open-source LLM framework. LangSmith paid from pay-as-you-go.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'qwen',
    referral_url: 'https://tongyi.aliyun.com',
    cta_label: 'Try Qwen Free',
    commission_note: 'Free AI assistant by Alibaba. No signup needed for basic use.',
    is_direct: false,
    badge: 'Free Tier',
  },
];

// ─── Customer Service & Support ───

export const customerServiceAffiliates: AffiliateLink[] = [
  {
    slug: 'intercom-ai',
    referral_url: 'https://www.intercom.com',
    cta_label: 'Try Intercom Free',
    commission_note: 'Partner program with recurring commission. Paid from $39/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
];

// ─── Aggregated lookup ───

export const allAffiliateLinks: AffiliateLink[] = [
  ...chatbotAffiliates,
  ...imageAffiliates,
  ...researchAffiliates,
  ...codeAffiliates,
  ...productivityAffiliates,
  ...writingAffiliates,
  ...designAffiliates,
  ...audioAffiliates,
  ...videoAffiliates,
  ...openSourceAffiliates,
  ...customerServiceAffiliates,
];

/** Get affiliate link for a specific tool slug */
export function getAffiliateForTool(slug: string): AffiliateLink | undefined {
  return allAffiliateLinks.find((a) => a.slug === slug);
}

/** Grouped by category — for highlighting sections on a page */
export function getAffiliateGroup(category: string): AffiliateLink[] {
  const map: Record<string, string[]> = {
    'Chatbots & Assistants': ['chatgpt', 'claude', 'gemini', 'deepseek', 'kimi'],
    'Image Generation': ['midjourney', 'leonardo-ai'],
    'Research & Analysis': ['perplexity'],
    'Code & Development': ['copilot', 'cursor', 'bolt-new', 'lovable', 'windsurf', 'devin'],
    'Productivity': ['notion-ai'],
    'Writing & Content': ['jasper', 'copy-ai', 'deepl'],
    'Design & Creative': ['canva-ai'],
    'Audio & Music': ['elevenlabs', 'murf-ai'],
    'Video & Animation': ['runway', 'synthesia', 'descript'],
    'Open Source & ML Platforms': ['hugging-face', 'langchain', 'qwen'],
    'Customer Service & Support': ['intercom-ai'],
  };
  const slugs = map[category] || [];
  return allAffiliateLinks.filter((a) => slugs.includes(a.slug));
}
