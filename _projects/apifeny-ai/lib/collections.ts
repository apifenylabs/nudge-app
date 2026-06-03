// ══════════════════════════════════════════════════════════
// APIFENY.AI — Curated Collections
// ══════════════════════════════════════════════════════════
// Editorial collections for stickiness.
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
 * Curated collections for editorial curation.
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
    tool_slugs: ['cursor', 'chatgpt', 'perplexity', 'canva-ai', 'elevenlabs', 'notion-ai', 'bolt-new', 'lovable', 'claude-code', 'coze'],
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
    tool_slugs: ['chatgpt', 'gemini', 'canva-ai', 'notion-ai', 'perplexity', 'elevenlabs', 'otter-ai', 'motion', 'calendly', 'khanmigo'],
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
    tool_slugs: ['gemini', 'chatgpt', 'perplexity', 'canva-ai', 'elevenlabs', 'midjourney', 'deepl', 'krisp', 'heygen'],
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
    tool_slugs: ['gemini', 'chatgpt', 'claude', 'canva-ai', 'hugging-face', 'synthesia', 'qwen', 'kimi', 'doubao', 'deepseek'],
    gradient: 'from-asia/30 to-amber-400/30',
    icon: '🌏',
    meta_title: 'Best AI Tools for Asian Languages — Apifeny AI',
    meta_description:
      'Curated AI tools with native Asian language support. Chinese, Japanese, Korean, Thai, Vietnamese, and more. Local pricing and Asia-ready features.',
  },
  {
    slug: 'ai-coding-pipeline',
    title: 'Best AI for the Coding Pipeline',
    subtitle: 'Plan → Code → Review → Ship',
    description:
      'The best AI tools for each stage of the software development pipeline. From strategic planning and architecture to code generation, review, testing, and deployment.',
    tool_slugs: ['chatgpt', 'cursor', 'claude', 'perplexity', 'devin', 'gemini', 'windsurf', 'v0', 'bolt-new', 'tabnine', 'aider', 'cline', 'replit-agent'],
    gradient: 'from-sky-500/30 to-indigo-500/30',
    icon: '⚙️',
    meta_title: 'Best AI Tools for the Coding Pipeline — Apifeny AI',
    meta_description:
      'Curated AI tools for every stage of software development: planning, architecture, coding, review, testing, and deployment. Built for solopreneurs.',
  },
  {
    slug: 'ai-content-pipeline',
    title: 'Best AI for Content Creation',
    subtitle: 'Research → Write → Design → Publish',
    description:
      'AI tools for the full content creation workflow. Research with Perplexity, write with ChatGPT, design with Canva AI, produce video with Synthesia, and voiceover with ElevenLabs.',
    tool_slugs: ['chatgpt', 'perplexity', 'canva-ai', 'synthesia', 'elevenlabs', 'midjourney', 'gamma', 'suno', 'opusclip', 'writesonic'],
    gradient: 'from-rose-500/30 to-amber-500/30',
    icon: '📝',
    meta_title: 'Best AI Tools for Content Creation Pipeline — Apifeny AI',
    meta_description:
      'The complete AI content creation pipeline: research, writing, design, video, and voiceover. Tools curated for Asian content creators.',
  },
  {
    slug: 'ai-marketing-pipeline',
    title: 'Best AI for Marketing Pipeline',
    subtitle: 'Strategy → Content → Distribution → Analyze',
    description:
      'Full-stack AI marketing toolkit. Research markets, generate multilingual content, design visuals, produce localized video, and analyze performance — all with AI.',
    tool_slugs: ['chatgpt', 'perplexity', 'canva-ai', 'midjourney', 'synthesia', 'elevenlabs', 'semrush', 'ahrefs', 'surfer-seo', 'writesonic', 'instant.ly'],
    gradient: 'from-emerald-500/30 to-teal-500/30',
    icon: '📊',
    meta_title: 'Best AI Tools for Marketing Pipeline — Apifeny AI',
    meta_description:
      'AI-powered marketing pipeline for Asian markets. Research, multilingual content, visual design, video production, and analytics in one workflow.',
  },
  {
    slug: 'ai-writing-content-tools',
    title: 'Best AI Writing & Content Tools',
    subtitle: 'Generate, edit, and optimize',
    description:
      'AI-powered writing tools for content creation, copywriting, and editing. From Jasper and Copy.ai to DeepL for translation — find the best AI writer for your workflow.',
    tool_slugs: ['jasper', 'copy-ai', 'descript', 'deepl', 'chatgpt', 'perplexity', 'rytr', 'grammarly', 'pictory', 'writesonic'],
    gradient: 'from-violet-500/30 to-fuchsia-500/30',
    icon: '✍️',
    meta_title: 'Best AI Writing & Content Tools — Apifeny AI',
    meta_description:
      'Curated AI writing tools for Asian creators. Generate blog posts, social content, and marketing copy with Jasper, Copy.ai, DeepL, and more.',
  },
  {
    slug: 'ai-video-voice-tools',
    title: 'Best AI for Video & Voice',
    subtitle: 'Record, edit, generate',
    description:
      'AI video and voice tools for content creators in Asia. From AI avatars in Synthesia to voice cloning with ElevenLabs and video editing with Runway and Descript.',
    tool_slugs: ['synthesia', 'elevenlabs', 'runway', 'descript', 'murf-ai', 'canva-ai', 'heygen', 'pika', 'luma-ai', 'opusclip'],
    gradient: 'from-orange-500/30 to-red-500/30',
    icon: '🎬',
    meta_title: 'Best AI Video & Voice Tools — Apifeny AI',
    meta_description:
      'Curated AI video and voice tools for Asian content creators. AI avatars, voice cloning, video editing, and voiceover generation.',
  },
  {
    slug: 'ai-design-creative-tools',
    title: 'Best AI Design & Creative Tools',
    subtitle: 'Create visuals at speed',
    description:
      'AI-powered design tools for creatives and marketers. From Canva AI and Midjourney to Leonardo AI — generate stunning visuals, logos, and art with AI.',
    tool_slugs: ['canva-ai', 'midjourney', 'leonardo-ai', 'chatgpt', 'adobe-firefly', 'stability-ai', 'luma-ai', 'gamma', 'pika'],
    gradient: 'from-pink-500/30 to-purple-500/30',
    icon: '🎨',
    meta_title: 'Best AI Design & Creative Tools — Apifeny AI',
    meta_description:
      'Curated AI design tools for Asian creators. Generate images, logos, and marketing visuals with Canva AI, Midjourney, Leonardo AI, and more.',
  },
  {
    slug: 'best-ai-assistants-chatbots',
    title: 'Best AI Assistants & Chatbots',
    subtitle: 'Chat, research, automate',
    description:
      'The best AI assistants and chatbots for productivity and research. Compare ChatGPT, Gemini, Claude, Pi, Poe, and Perplexity for everyday AI assistance.',
    tool_slugs: ['chatgpt', 'gemini', 'claude', 'perplexity', 'pi-ai', 'poe', 'grok-xai', 'deepseek', 'qwen', 'you-dot-com'],
    gradient: 'from-cyan-500/30 to-blue-500/30',
    icon: '💬',
    meta_title: 'Best AI Assistants & Chatbots — Apifeny AI',
    meta_description:
      'Curated AI assistants and chatbots for Asian users. Compare ChatGPT, Gemini, Claude, Perplexity, and more for daily productivity and research.',
  },
  {
    slug: 'ai-automation-workflows',
    title: 'Best AI for Automation & Workflows',
    subtitle: 'Connect, automate, scale',
    description:
      'AI-powered automation tools to connect your apps, build workflows, scrape data, and orchestrate multi-agent systems. From no-code to pro-code automation stacks.',
    tool_slugs: ['n8n', 'make', 'zapier-central', 'browse-ai', 'firecrawl', 'coze', 'dify', 'crewai', 'autogpt', 'langchain'],
    gradient: 'from-yellow-500/30 to-amber-500/30',
    icon: '⚡',
    meta_title: 'Best AI Automation & Workflow Tools — Apifeny AI',
    meta_description:
      'Curated AI automation tools for Asian businesses. Connect apps, build workflows, scrape data, and orchestrate agents with no-code and pro-code platforms.',
  },
  {
    slug: 'ai-developer-tools',
    title: 'Best AI Developer Tools & APIs',
    subtitle: 'Build production AI apps',
    description:
      'The essential AI developer toolkit: model APIs, vector databases, agent frameworks, and deployment platforms for building production AI applications in Asia.',
    tool_slugs: ['openrouter', 'together-ai', 'groq', 'replicate', 'langchain', 'llamaindex', 'tavily', 'jina-ai', 'exa', 'browse-ai', 'firecrawl', 'sourcegraph-cody'],
    gradient: 'from-indigo-500/30 to-violet-500/30',
    icon: '🛠️',
    meta_title: 'Best AI Developer Tools & APIs — Apifeny AI',
    meta_description:
      'Curated AI developer tools for builders in Asia. Model APIs, vector databases, agent frameworks, and deployment platforms for production AI apps.',
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
