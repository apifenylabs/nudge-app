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
  {
    slug: 'poe',
    referral_url: 'https://poe.com',
    cta_label: 'Try Poe Free',
    commission_note: 'Free tier available. Multi-model chatbot hub. Pro at $19.99/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'pi-ai',
    referral_url: 'https://pi.ai',
    cta_label: 'Chat with Pi Free',
    commission_note: 'Completely free personal AI assistant by Inflection.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'doubao',
    referral_url: 'https://www.doubao.com',
    cta_label: 'Try Doubao Free',
    commission_note: 'Free Chinese AI assistant by ByteDance. No payment needed.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'ernie-bot',
    referral_url: 'https://yiyan.baidu.com',
    cta_label: 'Use Ernie Bot Free',
    commission_note: 'Free AI assistant by Baidu. Chinese-language focused.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'sparkdesk',
    referral_url: 'https://xinghuo.xfyun.cn',
    cta_label: 'Use SparkDesk Free',
    commission_note: 'Free AI assistant by iFlytek. Supports Chinese NLP tasks.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'you-dot-com',
    referral_url: 'https://you.com',
    cta_label: 'Try You.com Free',
    commission_note: 'Free tier available. AI search & writing assistant. Pro at $14.99/mo.',
    is_direct: false,
    badge: 'Free Trial',
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
  {
    slug: 'v0',
    referral_url: 'https://v0.dev',
    cta_label: 'Build with v0',
    commission_note: 'Generative UI by Vercel. Free tier for prototyping. Pro from $20/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'replit-agent',
    referral_url: 'https://replit.com',
    cta_label: 'Try Replit Agent',
    commission_note: 'Free tier with limited compute. Referral: $10 per friend upgrade. Core from $25/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'tabnine',
    referral_url: 'https://tabnine.com',
    cta_label: 'Try Tabnine Free',
    commission_note: 'Free tier available. Code AI with local privacy. Pro from $12/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'aider',
    referral_url: 'https://aider.chat',
    cta_label: 'Use Aider Free',
    commission_note: 'Open-source AI pair programming in terminal. Bring your own API key.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'claude-code',
    referral_url: 'https://docs.anthropic.com/en/docs/claude-code',
    cta_label: 'Try Claude Code',
    commission_note: 'Paid terminal-based AI coding agent by Anthropic. API-key based pricing.',
    is_direct: false,
    badge: 'Pro Pick',
  },
  {
    slug: 'cline',
    referral_url: 'https://github.com/cline/cline',
    cta_label: 'Use Cline Free',
    commission_note: 'Open-source autonomous coding agent for VS Code. Bring your own API key.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'phind',
    referral_url: 'https://www.phind.com',
    cta_label: 'Search with Phind',
    commission_note: 'Free tier with daily queries. Pro from $20/mo for unlimited searches.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'sourcegraph-cody',
    referral_url: 'https://sourcegraph.com/cody',
    cta_label: 'Try Cody Free',
    commission_note: 'Free tier for individual devs. Context-aware AI coding with search. Pro from $9/mo.',
    is_direct: false,
    badge: 'Free Trial',
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

// ─── AI Agents ───

export const aiAgentAffiliates: AffiliateLink[] = [
  {
    slug: 'openrouter',
    referral_url: 'https://openrouter.ai',
    cta_label: 'Try OpenRouter Free',
    commission_note: 'Free tier with rate-limited access. Unified API for 200+ models.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'together-ai',
    referral_url: 'https://together.ai',
    cta_label: 'Build with Together AI',
    commission_note: 'Free tier with limited credits. API access to open models from $0.10/M tokens.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'groq',
    referral_url: 'https://groq.com',
    cta_label: 'Use Groq Free',
    commission_note: 'Free blazing-fast inference API. LPU-powered. No credit card needed.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'replicate',
    referral_url: 'https://replicate.com',
    cta_label: 'Try Replicate Free',
    commission_note: 'Pay-as-you-go cloud ML platform. $5 free credits on signup.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'crewai',
    referral_url: 'https://crewai.com',
    cta_label: 'Use CrewAI Free',
    commission_note: 'Open-source multi-agent orchestration. Bring your own API key.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'autogpt',
    referral_url: 'https://autogpt.net',
    cta_label: 'Try AutoGPT Free',
    commission_note: 'Open-source autonomous AI agent. Self-hosted or cloud version.',
    is_direct: false,
    badge: 'Free Tier',
  },
];

// ─── No-Code & Automation ───

export const noCodeAffiliates: AffiliateLink[] = [
  {
    slug: 'coze',
    referral_url: 'https://www.coze.com',
    cta_label: 'Build with Coze Free',
    commission_note: 'Free AI bot builder by ByteDance. No coding required.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'dify',
    referral_url: 'https://dify.ai',
    cta_label: 'Use Dify Free',
    commission_note: 'Open-source LLM app builder. Self-host or cloud. Free community edition.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'n8n',
    referral_url: 'https://n8n.io',
    cta_label: 'Try n8n Free',
    commission_note: 'Open-source workflow automation. Self-host free or cloud from $20/mo.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'make',
    referral_url: 'https://www.make.com',
    cta_label: 'Start with Make Free',
    commission_note: 'Free tier with 1000 ops/mo. Visual automation platform. Pro from $9/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'zapier-central',
    referral_url: 'https://central.zapier.com',
    cta_label: 'Try Zapier Central',
    commission_note: 'AI-powered automation from Zapier. Paid from $19.99/mo. 14-day free trial.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'browse-ai',
    referral_url: 'https://www.browse.ai',
    cta_label: 'Try Browse AI Free',
    commission_note: 'Free tier with 5 runs/mo. Web scraping & monitoring. Pro from $29/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
];

// ─── Data & Analytics ───

export const dataAffiliates: AffiliateLink[] = [
  {
    slug: 'llamaindex',
    referral_url: 'https://llamaindex.ai',
    cta_label: 'Build with LlamaIndex',
    commission_note: 'Open-source data framework for LLM apps. Cloud from pay-as-you-go.',
    is_direct: false,
    badge: 'Free Tier',
  },
  {
    slug: 'firecrawl',
    referral_url: 'https://firecrawl.dev',
    cta_label: 'Try FireCrawl Free',
    commission_note: 'Free tier with 500 pages. Web crawling for AI. Pro from $59/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'jina-ai',
    referral_url: 'https://jina.ai',
    cta_label: 'Use Jina AI Free',
    commission_note: 'Free tier available. Neural search & embedding APIs. Pay-as-you-go.',
    is_direct: false,
    badge: 'Free Trial',
  },
];

// ─── Research & Analysis (extended) ───

export const researchExtendedAffiliates: AffiliateLink[] = [
  {
    slug: 'tavily',
    referral_url: 'https://tavily.com',
    cta_label: 'Try Tavily Free',
    commission_note: 'Free tier with 1000 queries/mo. AI-optimized search API. Pro from $50/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
  {
    slug: 'exa',
    referral_url: 'https://exa.ai',
    cta_label: 'Try Exa Free',
    commission_note: 'Free tier with 100 searches. Semantic web search for AI agents. Pro from $25/mo.',
    is_direct: false,
    badge: 'Free Trial',
  },
];

// ─── Audio & Voice (extended) ───

export const audioExtendedAffiliates: AffiliateLink[] = [
  {
    slug: 'krisp',
    referral_url: 'https://krisp.ai',
    cta_label: 'Try Krisp Free',
    commission_note: 'Free tier with 60 mins/day. AI noise cancellation. Pro from $8/mo.',
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
  ...aiAgentAffiliates,
  ...noCodeAffiliates,
  ...dataAffiliates,
  ...researchExtendedAffiliates,
  ...audioExtendedAffiliates,
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
    'Chatbots & Assistants': ['chatgpt', 'claude', 'gemini', 'deepseek', 'kimi', 'poe', 'pi-ai', 'doubao', 'ernie-bot', 'sparkdesk', 'you-dot-com'],
    'Image Generation': ['midjourney', 'leonardo-ai'],
    'Research & Analysis': ['perplexity', 'tavily', 'exa'],
    'Code & Development': ['copilot', 'cursor', 'bolt-new', 'lovable', 'windsurf', 'devin', 'v0', 'replit-agent', 'tabnine', 'aider', 'claude-code', 'cline', 'phind', 'sourcegraph-cody'],
    'Productivity': ['notion-ai'],
    'Writing & Content': ['jasper', 'copy-ai', 'deepl'],
    'Design & Creative': ['canva-ai'],
    'Audio & Music': ['elevenlabs', 'murf-ai', 'krisp'],
    'Video & Animation': ['runway', 'synthesia', 'descript'],
    'AI Agents': ['openrouter', 'together-ai', 'groq', 'replicate', 'crewai', 'autogpt'],
    'No-Code & Automation': ['coze', 'dify', 'n8n', 'make', 'zapier-central', 'browse-ai'],
    'Data & Analytics': ['llamaindex', 'firecrawl', 'jina-ai'],
    'Open Source & ML Platforms': ['hugging-face', 'langchain', 'qwen'],
    'Customer Service & Support': ['intercom-ai'],
  };
  const slugs = map[category] || [];
  return allAffiliateLinks.filter((a) => slugs.includes(a.slug));
}
