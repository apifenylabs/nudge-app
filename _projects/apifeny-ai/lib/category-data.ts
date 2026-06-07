// ═══════════════════════════════════════════════════════════════════════════════
// APIFENY.AI — Category Data
// ═══════════════════════════════════════════════════════════════════════════════
// Defines all AI tool categories with SEO metadata, descriptions, and slugs.
// Used by the /categories/[slug] route and category navigation.
// ═══════════════════════════════════════════════════════════════════════════════

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  gradient: string;
  metaTitle: string;
  metaDescription: string;
  /** High-intent search keywords this category ranks for */
  keywords: string[];
  /** Example of a question the category answers */
  h2Headings: string[];
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  'chatbots-assistants': {
    slug: 'chatbots-assistants',
    name: 'Chatbots & Assistants',
    description: 'Best AI chatbots and virtual assistants for productivity',
    longDescription:
      'AI chatbots have become an essential part of daily workflows — from answering questions and drafting emails to brainstorming ideas and coding. This category covers the best AI assistants including ChatGPT, Claude, Gemini, and specialised chatbots for Asian markets. Compare features, pricing, and Asia-readiness.',
    icon: '💬',
    gradient: 'from-violet-500/20 to-indigo-500/10',
    metaTitle: 'Best AI Chatbots & Assistants 2026 | Apifeny AI',
    metaDescription:
      'Compare the best AI chatbots and virtual assistants for productivity. ChatGPT vs Claude vs Gemini — features, pricing, Asia-readiness, and affiliate offers.',
    keywords: [
      'best AI chatbot', 'ChatGPT vs Claude', 'AI assistant comparison',
      'best virtual assistant AI', 'AI chatbot Asia', 'free AI chatbot',
      'Claude vs Gemini', 'ChatGPT alternatives',
    ],
    h2Headings: [
      'Which AI chatbot is best for your workflow?',
      'Best AI assistants for Asian languages',
      'Free vs paid AI chatbots: what you get',
      'ChatGPT vs Claude vs Gemini vs DeepSeek: head-to-head',
      'Can AI chatbots handle multilingual conversations effectively?',
    ],
  },
  'code-development': {
    slug: 'code-development',
    name: 'Code & Development',
    description: 'AI coding assistants and developer tools',
    longDescription:
      'AI coding tools are transforming how developers write, review, and debug code. From GitHub Copilot to Cursor and Claude, these AI pair programmers help you ship faster. This category compares the best AI coding assistants for developers in Asia, with pricing, supported languages, and real community ratings.',
    icon: '⚡',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    metaTitle: 'Best AI Coding Assistants 2026 | Apifeny AI',
    metaDescription:
      'Compare the best AI coding assistants and developer tools. GitHub Copilot, Cursor, Claude for code — reviews, pricing, and Asia-ready features.',
    keywords: [
      'best AI coding assistant', 'GitHub Copilot vs Cursor', 'AI code generator',
      'best AI for developers', 'AI pair programmer', 'Cursor IDE review',
      'Claude for coding', 'AI developer tools Asia',
    ],
    h2Headings: [
      'Which AI coding assistant ships the most?',
      'AI code generation for full-stack development',
      'Coding with AI in Asian languages',
      'GitHub Copilot vs Cursor vs Claude: which speeds you up most?',
      'Can AI replace code reviews and debugging for production apps?',
    ],
  },
  'writing-content': {
    slug: 'writing-content',
    name: 'Writing & Content',
    description: 'AI writing tools for content creation',
    longDescription:
      'AI writing tools help you create blog posts, social media content, email campaigns, and marketing copy faster. Whether you need long-form SEO content or short-form social captions, this category covers the best AI writing assistants for creators, marketers, and solopreneurs in Asia.',
    icon: '✍️',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    metaTitle: 'Best AI Writing Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare the best AI writing tools for content creation. ChatGPT, Claude, Jasper, and more — reviews, pricing, and features for Asian markets.',
    keywords: [
      'best AI writing tool', 'AI content generator', 'AI copywriting tool',
      'best AI for blog writing', 'AI writing assistant comparison',
      'AI content creation Asia', 'ChatGPT for writing',
    ],
    h2Headings: [
      'Best AI writing tools for SEO content',
      'AI copywriting for Asian markets',
      'Free vs premium AI writing assistants',
      'How to avoid AI detection and keep your content ranked',
      'Can AI writing tools write fluently in Chinese, Japanese, and Korean?',
    ],
  },
  'image-generation': {
    slug: 'image-generation',
    name: 'Image Generation',
    description: 'AI image generators for design and marketing',
    longDescription:
      'AI image generators let you create stunning visuals from text prompts. From Midjourney to DALL-E and Stable Diffusion, these tools are transforming design workflows. This category compares the best AI image generators for Asian marketing, design, and content creation with pricing and Asia-readiness scores.',
    icon: '🎨',
    gradient: 'from-rose-500/20 to-pink-500/10',
    metaTitle: 'Best AI Image Generators 2026 | Apifeny AI',
    metaDescription:
      'Compare the best AI image generators for design and marketing. Midjourney vs DALL-E vs Stable Diffusion — reviews, pricing, and Asian market features.',
    keywords: [
      'best AI image generator', 'Midjourney vs DALL-E',
      'AI image generation comparison', 'AI art generator',
      'best AI for design', 'AI image generator Asia',
      'Stable Diffusion vs Midjourney',
    ],
    h2Headings: [
      'Which AI image generator creates the best visuals?',
      'AI image generation for Asian marketing',
      'Pricing and features comparison',
      'Midjourney vs DALL-E 3 vs Stable Diffusion 3: which wins?',
      'Best free AI image generators for commercial use in 2026',
    ],
  },
  'video-animation': {
    slug: 'video-animation',
    name: 'Video & Animation',
    description: 'AI video creation and animation tools',
    longDescription:
      'AI video tools are making professional video production accessible to everyone. From text-to-video generators to AI editing suites, these tools help you create engaging video content without a production team. Compare the best AI video tools for content creators in Asia.',
    icon: '📹',
    gradient: 'from-amber-500/20 to-orange-500/10',
    metaTitle: 'Best AI Video Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare the best AI video creation and animation tools. Runway, Pika, Synthesia, and more — reviews, pricing, and features for Asian creators.',
    keywords: [
      'best AI video generator', 'AI video creation tool',
      'text to video AI', 'AI animation tool',
      'Runway vs Pika', 'Synthesia alternative',
      'AI video editor', 'best AI for video production Asia',
    ],
    h2Headings: [
      'Best AI video generators compared',
      'AI video editing for Asian content creators',
      'Text-to-video vs AI-assisted editing',
      'Sora vs Runway vs Pika: which AI video tool delivers the most?',
      'How to create professional AI videos on a zero-dollar budget',
    ],
  },
  'marketing-seo': {
    slug: 'marketing-seo',
    name: 'Marketing & SEO',
    description: 'AI tools for marketing automation and SEO',
    longDescription:
      'AI marketing tools help you automate campaigns, optimize SEO, analyze competitors, and personalize content at scale. From AI-powered SEO tools to marketing automation platforms, this category covers the best AI marketing tools for businesses targeting Asian audiences.',
    icon: '📈',
    gradient: 'from-fuchsia-500/20 to-rose-500/10',
    metaTitle: 'Best AI Marketing & SEO Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare AI marketing automation and SEO tools for Asian markets. Reviews, pricing, and features for marketers and solopreneurs.',
    keywords: [
      'best AI marketing tool', 'AI SEO tool', 'marketing automation AI',
      'AI content marketing', 'best AI for SEO', 'AI marketing Asia',
      'SEO tool comparison', 'AI competitor analysis',
    ],
    h2Headings: [
      'Best AI tools for marketing automation',
      'AI SEO tools that actually rank',
      'Marketing to Asian audiences with AI',
      'How to build a full marketing funnel with AI in 2026',
      'AI-powered A/B testing and conversion optimization',
    ],
  },
  'design-creative': {
    slug: 'design-creative',
    name: 'Design & Creative',
    description: 'AI design tools for creatives and designers',
    longDescription:
      'AI design tools are revolutionizing creative workflows — from logo generation and UI design to brand asset creation. This category covers the best AI design tools for designers, marketers, and solopreneurs who need professional-quality visuals without hiring a designer.',
    icon: '🎨',
    gradient: 'from-indigo-500/20 to-violet-500/10',
    metaTitle: 'Best AI Design Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare the best AI design tools for creatives. Canva AI, Figma AI, Adobe Firefly, and more — reviews, pricing, and Asia-ready features.',
    keywords: [
      'best AI design tool', 'AI logo generator', 'AI UI design tool',
      'Canva AI features', 'Figma AI', 'Adobe Firefly review',
      'AI for graphic design', 'AI design tool Asia',
    ],
    h2Headings: [
      'Best AI design tools for non-designers',
      'AI-powered UI/UX design tools',
      'Designing for Asian markets with AI',
      'Canva AI vs Figma AI vs Adobe Firefly: which is best for branding?',
      'How to generate consistent brand assets with AI',
    ],
  },
  'data-analytics': {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    description: 'AI tools for data analysis and business intelligence',
    longDescription:
      'AI data tools let you analyze spreadsheets, generate insights, build dashboards, and make data-driven decisions without being a data scientist. Compare the best AI analytics tools for solopreneurs and small businesses in Asia.',
    icon: '📊',
    gradient: 'from-emerald-500/20 to-green-500/10',
    metaTitle: 'Best AI Data & Analytics Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare AI tools for data analysis and business intelligence. Reviews, pricing, and features for data-driven decision making in Asia.',
    keywords: [
      'best AI data analysis tool', 'AI analytics platform',
      'AI business intelligence', 'data analysis AI',
      'AI spreadsheet tool', 'AI data visualization',
      'best AI for data science Asia',
    ],
    h2Headings: [
      'Best AI tools for data analysis',
      'AI-powered business intelligence',
      'Data visualization with AI',
      'Can AI replace spreadsheets for small business analytics?',
      'How to use AI for real-time dashboards and reporting',
    ],
  },
  'ai-agents': {
    slug: 'ai-agents',
    name: 'AI Agents',
    description: 'Autonomous AI agents and agentic workflows',
    longDescription:
      'AI agents are autonomous systems that can plan, reason, and execute tasks without human intervention. From coding agents to research agents and automation bots, this category covers the best agentic AI tools for solopreneurs and businesses in Asia.',
    icon: '🤖',
    gradient: 'from-sky-500/20 to-blue-500/10',
    metaTitle: 'Best AI Agents & Agentic Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare the best AI agents and autonomous agentic tools. Cursor, Devin, and more — reviews, pricing, and features for automating workflows in Asia.',
    keywords: [
      'best AI agent', 'autonomous AI agent', 'AI agent comparison',
      'agentic AI tools', 'AI coding agent', 'AI research agent',
      'Cursor agent mode', 'best autonomous AI tools',
    ],
    h2Headings: [
      'Which AI agent is most capable?',
      'Autonomous agents for solopreneurs',
      'Agentic AI for Asian workflows',
      'Devin vs Cursor Agent vs Claude Code: autonomous coding compared',
      'How to build a personal AI agent stack in 2026',
    ],
  },
  'productivity': {
    slug: 'productivity',
    name: 'Productivity',
    description: 'AI productivity tools for getting more done',
    longDescription:
      'AI productivity tools help you automate repetitive tasks, manage your schedule, take better notes, and stay organized. From AI meeting assistants to smart scheduling tools, this category covers the best AI productivity tools for busy professionals in Asia.',
    icon: '⏱️',
    gradient: 'from-yellow-500/20 to-amber-500/10',
    metaTitle: 'Best AI Productivity Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare the best AI productivity tools for getting more done. Meeting assistants, note-taking AI, scheduling tools — reviews and pricing.',
    keywords: [
      'best AI productivity tool', 'AI meeting assistant',
      'AI note-taking app', 'AI scheduling tool',
      'productivity AI comparison', 'AI task management',
      'best AI for productivity Asia',
    ],
    h2Headings: [
      'Best AI tools for daily productivity',
      'AI meeting assistants that save hours',
      'Smart scheduling and task management with AI',
      'Notion AI vs Motion vs Reclaim: which scheduling AI wins?',
      'How to build a second brain with AI note-taking tools',
    ],
  },
  'audio-voice': {
    slug: 'audio-voice',
    name: 'Audio & Voice',
    description: 'AI voice cloning, TTS, and audio tools',
    longDescription:
      'AI voice and audio tools let you generate realistic speech, clone voices, produce music, and edit audio — all from text. From ElevenLabs to Suno and Descript, this category covers the best AI audio tools for content creators in Asia.',
    icon: '🎙️',
    gradient: 'from-purple-500/20 to-pink-500/10',
    metaTitle: 'Best AI Audio & Voice Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare AI voice cloning, text-to-speech, and music generation tools. ElevenLabs, Suno, Descript — reviews, pricing, and Asian language support.',
    keywords: [
      'best AI voice tool', 'AI voice cloning', 'text to speech AI',
      'ElevenLabs review', 'AI music generator', 'Suno AI review',
      'AI audio editor', 'best TTS for Asian languages',
    ],
    h2Headings: [
      'Best AI voice cloning for Asian languages',
      'AI music generation compared',
      'Text-to-speech tools that sound natural',
      'ElevenLabs vs PlayHT vs Murf: which TTS is most realistic?',
      'How to create AI audiobooks and podcasts in any language',
    ],
  },
  'no-code-automation': {
    slug: 'no-code-automation',
    name: 'No-Code & Automation',
    description: 'AI-powered no-code and workflow automation tools',
    longDescription:
      'No-code AI tools let you build apps, automate workflows, and integrate services without writing code. From Zapier to Bubble and Make, this category covers the best no-code platforms enhanced by AI for solopreneurs and businesses in Asia.',
    icon: '🔄',
    gradient: 'from-teal-500/20 to-emerald-500/10',
    metaTitle: 'Best No-Code & AI Automation Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare the best no-code and workflow automation tools powered by AI. Zapier, Make, Bubble — reviews, pricing, and features for Asian businesses.',
    keywords: [
      'best no-code tool', 'AI workflow automation',
      'Zapier alternatives', 'Make vs Zapier',
      'AI automation platform', 'no-code AI tools',
      'best automation tools Asia',
    ],
    h2Headings: [
      'Best no-code platforms with AI features',
      'AI workflow automation for small businesses',
      'Integrating AI into your existing stack',
      'Zapier vs Make vs n8n: which AI automation platform scales?',
      'How to build AI agents without writing any code',
    ],
  },
  'research-analysis': {
    slug: 'research-analysis',
    name: 'Research & Analysis',
    description: 'AI tools for research and competitive analysis',
    longDescription:
      'AI research tools help you gather intelligence, analyze competitors, summarize documents, and generate insights from vast amounts of data. From Perplexity to Elicit and Consensus, this category covers the best AI research tools for analysts and strategists in Asia.',
    icon: '🔍',
    gradient: 'from-blue-500/20 to-indigo-500/10',
    metaTitle: 'Best AI Research & Analysis Tools 2026 | Apifeny AI',
    metaDescription:
      'Compare AI tools for research and competitive analysis. Perplexity, Elicit, Consensus — reviews, pricing, and features for Asian markets.',
    keywords: [
      'best AI research tool', 'AI competitive analysis',
      'Perplexity vs Google', 'AI research assistant',
      'AI document analyzer', 'market research AI',
      'best AI for research Asia',
    ],
    h2Headings: [
      'Best AI tools for market research',
      'AI competitive intelligence tools',
      'Research faster with AI assistants',
      'Perplexity vs Google Deep Research: which digs deeper?',
      'How to automate competitive analysis with AI agents',
    ],
  },
};

export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORIES);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES[slug];
}

/**
 * Slugify a category name like "Chatbots & Assistants" → "chatbots-assistants"
 */
export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&]+/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Reverse lookup: given a category name, return the slug
 */
export function getCategorySlugFromName(name: string): string {
  for (const [slug, info] of Object.entries(CATEGORIES)) {
    if (info.name === name) return slug;
  }
  return slugifyCategory(name);
}
