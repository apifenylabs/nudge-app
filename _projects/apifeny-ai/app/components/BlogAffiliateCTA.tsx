// ══════════════════════════════════════════════════════════
// BlogAffiliateCTA — Affiliate Link CTA for Blog Posts
// ══════════════════════════════════════════════════════════
// Displays relevant tool affiliate links at the bottom of blog posts
// based on post tags and slug. Converts readers → clicks → commissions.
// ══════════════════════════════════════════════════════════

'use client';

import { Sparkles, ExternalLink, Zap, ShieldCheck } from 'lucide-react';

// ─── Tag-to-tool slug mapping ───
// Maps blog post tags to relevant tool slugs from the affiliate registry
const TAG_TOOL_MAP: Record<string, string[]> = {
  // Coding & Development
  'coding': ['copilot', 'cursor', 'bolt-new', 'windsurf'],
  'code': ['copilot', 'cursor', 'aider', 'phind'],
  'development': ['copilot', 'cursor', 'v0', 'devin'],
  'ai-coding': ['cursor', 'copilot', 'windsurf'],
  'chatgpt': ['chatgpt', 'claude', 'gemini'],
  'claude': ['claude', 'chatgpt', 'perplexity'],
  'deepseek': ['deepseek', 'chatgpt', 'claude'],

  // Content & Writing
  'content-creation': ['jasper', 'copy-ai', 'chatgpt'],
  'writing': ['jasper', 'copy-ai', 'claude'],
  'content': ['jasper', 'copy-ai', 'chatgpt'],
  'seo': ['chatgpt', 'jasper', 'perplexity'],
  'translation': ['deepl', 'chatgpt', 'gemini'],

  // Design & Creative
  'design': ['midjourney', 'canva-ai', 'runway'],
  'image-generation': ['midjourney', 'leonardo-ai', 'canva-ai'],
  'video': ['runway', 'synthesia', 'descript'],
  'video-editing': ['runway', 'descript', 'synthesia'],

  // Audio & Voice
  'audio': ['elevenlabs', 'murf-ai', 'krisp'],
  'voice': ['elevenlabs', 'murf-ai', 'krisp'],
  'tts': ['elevenlabs', 'murf-ai'],

  // Productivity & Automation
  'productivity': ['notion-ai', 'chatgpt', 'perplexity'],
  'automation': ['n8n', 'make', 'zapier-central'],
  'workflow': ['n8n', 'make', 'browse-ai'],
  'email': ['chatgpt', 'claude', 'jasper'],

  // Social Media & Marketing
  'social-media': ['chatgpt', 'jasper', 'canva-ai'],
  'marketing': ['jasper', 'copy-ai', 'chatgpt'],
  'email-marketing': ['chatgpt', 'jasper', 'copy-ai'],

  // Business & Solopreneur
  'solopreneur': ['chatgpt', 'notion-ai', 'bolt-new'],
  'business': ['chatgpt', 'claude', 'notion-ai'],
  'startup': ['bolt-new', 'cursor', 'chatgpt'],

  // Research & Data
  'research': ['perplexity', 'claude', 'gemini'],
  'data': ['llamaindex', 'jina-ai', 'firecrawl'],
  'analysis': ['claude', 'chatgpt', 'perplexity'],

  // Customer Service
  'customer-service': ['intercom-ai', 'chatgpt', 'tidio'],
  'support': ['intercom-ai', 'chatgpt'],

  // AI Agents & Platforms
  'ai-agents': ['crewai', 'autogpt', 'openrouter'],
  'agents': ['crewai', 'autogpt', 'coze'],
  'llm': ['openrouter', 'together-ai', 'groq'],
  'api': ['openrouter', 'together-ai', 'replicate'],

  // No-Code
  'no-code': ['bolt-new', 'lovable', 'v0'],
  'nocode': ['bolt-new', 'lovable', 'coze'],

  // Education & Learning
  'learning': ['chatgpt', 'claude', 'perplexity'],
  'language-learning': ['deepl', 'chatgpt', 'gemini'],

  // Industry-specific
  'ecommerce': ['chatgpt', 'jasper', 'canva-ai'],
  'real-estate': ['chatgpt', 'midjourney', 'canva-ai'],
  'restaurant': ['chatgpt', 'jasper', 'canva-ai'],
  'travel': ['chatgpt', 'gemini', 'perplexity'],
  'recruitment': ['chatgpt', 'claude', 'jasper'],

  // Free tools
  'free-tools': ['chatgpt', 'gemini', 'deepseek'],
  'free': ['gemini', 'deepseek', 'chatgpt'],
};

// ─── Manual overrides for specific blog slugs ───
const SLUG_OVERRIDES: Record<string, { slug: string; label: string }[]> = {
  'ai-automation-workflows-solopreneurs': [
    { slug: 'n8n', label: 'Set up free automation with n8n' },
    { slug: 'make', label: 'Visual automation with Make' },
    { slug: 'zapier-central', label: 'AI-powered automation with Zapier Central' },
  ],
  'best-ai-coding-assistants-2026-comparison': [
    { slug: 'cursor', label: 'Try Cursor — top-rated AI code editor' },
    { slug: 'copilot', label: 'GitHub Copilot — original AI pair programmer' },
    { slug: 'windsurf', label: 'Windsurf — agentic IDE' },
  ],
  'ai-customer-service-chatbots-asia': [
    { slug: 'intercom-ai', label: 'Intercom — AI customer service platform' },
    { slug: 'chatgpt', label: 'Custom GPT for support automation' },
  ],
  'top-10-free-ai-tools-for-solopreneurs-asia-2026': [
    { slug: 'gemini', label: 'Google Gemini — completely free AI assistant' },
    { slug: 'deepseek', label: 'DeepSeek — free with no account needed' },
    { slug: 'chatgpt', label: 'ChatGPT — free tier with powerful capabilities' },
  ],
  'ai-for-content-creation-asia-strategy': [
    { slug: 'jasper', label: 'Jasper — purpose-built for content marketing' },
    { slug: 'copy-ai', label: 'Copy.ai — free plan for starter content' },
    { slug: 'chatgpt', label: 'ChatGPT — versatile content assistant' },
  ],
  'ai-image-generators-asian-marketing': [
    { slug: 'midjourney', label: 'Midjourney — best artistic quality' },
    { slug: 'leonardo-ai', label: 'Leonardo AI — free daily tokens' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — all-in-one design' },
  ],
  'ai-video-editing-asia-2026': [
    { slug: 'runway', label: 'Runway — professional AI video editing' },
    { slug: 'synthesia', label: 'Synthesia — AI video with digital avatars' },
    { slug: 'descript', label: 'Descript — edit video like a doc' },
  ],
  'ai-voice-cloning-tts-asian-content-creators': [
    { slug: 'elevenlabs', label: 'ElevenLabs — best AI voice cloning' },
    { slug: 'murf-ai', label: 'Murf AI — studio-quality TTS' },
    { slug: 'krisp', label: 'Krisp — AI noise cancellation for recording' },
  ],
  'ai-website-builders-small-business-asia': [
    { slug: 'bolt-new', label: 'Bolt.new — build full-stack with prompts' },
    { slug: 'lovable', label: 'Lovable — AI web app builder' },
    { slug: 'v0', label: 'v0 by Vercel — generate UI components' },
  ],
  'ai-translation-tools-asia-guide': [
    { slug: 'deepl', label: 'DeepL Pro — best translation accuracy in Asia' },
    { slug: 'chatgpt', label: 'ChatGPT — multi-language translation assistant' },
    { slug: 'gemini', label: 'Gemini — native Asian language support' },
  ],
  'ai-social-media-management-asia-2026': [
    { slug: 'chatgpt', label: 'ChatGPT — draft all social posts' },
    { slug: 'jasper', label: 'Jasper — social media content at scale' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — design social graphics' },
  ],
  'local-ai-models-vs-cloud-which-is-best-for-asia': [
    { slug: 'ollama', label: 'Ollama — run local models for free' },
    { slug: 'groq', label: 'Groq — blazing-fast inference cloud API' },
    { slug: 'together-ai', label: 'Together AI — cloud access to open models' },
  ],
  'ai-tools-travel-planning-asia-itinerary': [
    { slug: 'chatgpt', label: 'ChatGPT — plan full itineraries' },
    { slug: 'gemini', label: 'Gemini — integrated with Google Maps & Flights' },
    { slug: 'perplexity', label: 'Perplexity — real-time travel research' },
  ],
  'ai-recruitment-tools-asian-companies': [
    { slug: 'chatgpt', label: 'ChatGPT — draft and screen job descriptions' },
    { slug: 'claude', label: 'Claude — analyze candidate profiles in depth' },
    { slug: 'jasper', label: 'Jasper — write compelling job ads' },
  ],
  'ai-restaurant-management-menu-optimization-asia': [
    { slug: 'chatgpt', label: 'ChatGPT — menu copy and pricing analysis' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — design menus and signage' },
    { slug: 'jasper', label: 'Jasper — marketing content for promotions' },
  ],
  'ai-tools-real-estate-marketing-asia': [
    { slug: 'midjourney', label: 'Midjourney — visualize property concepts' },
    { slug: 'chatgpt', label: 'ChatGPT — listing descriptions and marketing' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — branded property materials' },
  ],
  'ai-for-email-marketing-asia-guide': [
    { slug: 'chatgpt', label: 'ChatGPT — write email sequences' },
    { slug: 'jasper', label: 'Jasper — dedicated email marketing AI' },
    { slug: 'copy-ai', label: 'Copy.ai — free email templates' },
  ],
  'ai-meeting-assistants-asia-2026': [
    { slug: 'notion-ai', label: 'Notion AI — meeting notes and action items' },
    { slug: 'claude', label: 'Claude — summarize long meeting transcripts' },
    { slug: 'chatgpt', label: 'ChatGPT — quick meeting prep' },
  ],
  'ai-transcription-tools-asian-languages': [
    { slug: 'deepl', label: 'DeepL Pro — accurate Asian language transcription' },
    { slug: 'gemini', label: 'Gemini — supports Hindi, Chinese, Japanese, Korean' },
    { slug: 'notion-ai', label: 'Notion AI — organize transcriptions' },
  ],
  'ai-language-learning-asia': [
    { slug: 'deepl', label: 'DeepL Pro — instant translations' },
    { slug: 'gemini', label: 'Gemini — practice conversations across languages' },
    { slug: 'chatgpt', label: 'ChatGPT — language practice partner' },
  ],
  'ai-transforming-ecommerce-southeast-asia-2026': [
    { slug: 'chatgpt', label: 'ChatGPT — product descriptions and customer comms' },
    { slug: 'jasper', label: 'Jasper — product copy at scale' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — product images and ads' },
  ],

  // ── Country-specific solopreneur guides ──
  'best-ai-tools-singapore-solopreneurs-2026': [
    { slug: 'chatgpt', label: 'ChatGPT — daily productivity for SG solopreneurs' },
    { slug: 'bolt-new', label: 'Bolt.new — build MVPs in minutes' },
    { slug: 'notion-ai', label: 'Notion AI — organise your one-person business' },
  ],
  'best-ai-tools-hong-kong-2026': [
    { slug: 'chatgpt', label: 'ChatGPT — bilingual Cantonese/English assistant' },
    { slug: 'claude', label: 'Claude — deep document analysis for finance' },
    { slug: 'deepl', label: 'DeepL Pro — accurate Traditional Chinese translations' },
  ],
  'best-ai-tools-malaysia-2026': [
    { slug: 'chatgpt', label: 'ChatGPT — Bahasa Malaysia content creation' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — social media graphics' },
    { slug: 'bolt-new', label: 'Bolt.new — build Malaysia-focused web apps' },
  ],
  'best-ai-tools-indonesia-2026': [
    { slug: 'chatgpt', label: 'ChatGPT — Indonesian language content at scale' },
    { slug: 'jasper', label: 'Jasper — marketing copy for Indo audiences' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — visual content for Indonesian market' },
  ],
  'best-ai-tools-thailand-2026': [
    { slug: 'chatgpt', label: 'ChatGPT — Thai language assistant' },
    { slug: 'gemini', label: 'Gemini — strong Thai language understanding' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — Thai-friendly design templates' },
  ],

  // ── Tool comparison guides ──
  'cursor-vs-copilot-2026-coding-comparison': [
    { slug: 'cursor', label: 'Cursor — AI-first code editor' },
    { slug: 'copilot', label: 'GitHub Copilot — integrated AI pair programmer' },
    { slug: 'windsurf', label: 'Windsurf — agentic alternative to both' },
  ],
  'deepseek-vs-chatgpt-2026-comparison': [
    { slug: 'deepseek', label: 'DeepSeek — free, open-weight challenger' },
    { slug: 'chatgpt', label: 'ChatGPT — the established AI leader' },
    { slug: 'claude', label: 'Claude — the thoughtful third option' },
  ],

  // ── General & Asia solopreneur guides ──
  'best-ai-tools-solopreneurs-2026': [
    { slug: 'chatgpt', label: 'ChatGPT — all-in-one solopreneur assistant' },
    { slug: 'notion-ai', label: 'Notion AI — knowledge management for one' },
    { slug: 'bolt-new', label: 'Bolt.new — launch MVPs without a developer' },
  ],
  'best-ai-tools-asia-2026-solopreneur-guide': [
    { slug: 'chatgpt', label: 'ChatGPT — multilingual support across Asia' },
    { slug: 'bolt-new', label: 'Bolt.new — build apps without a co-founder' },
    { slug: 'notion-ai', label: 'Notion AI — organise your Asia ops' },
  ],

  // ── Niche role guides ──
  'best-ai-tools-freelance-designers-asia-2026': [
    { slug: 'midjourney', label: 'Midjourney — generate concept art and assets' },
    { slug: 'canva-ai', label: 'Canva Magic Studio — quick client deliverables' },
    { slug: 'runway', label: 'Runway — AI video for motion design projects' },
  ],
};

// ─── Tool display data ───
const TOOL_DISPLAY: Record<string, { name: string; url: string; category: string; badge?: string }> = {
  'chatgpt':        { name: 'ChatGPT',       url: 'https://chatgpt.com',                category: 'Chatbots & Assistants', badge: 'Most Popular' },
  'claude':         { name: 'Claude',        url: 'https://claude.ai',                  category: 'Chatbots & Assistants', badge: 'Pro Pick' },
  'gemini':         { name: 'Gemini',        url: 'https://gemini.google.com',          category: 'Chatbots & Assistants', badge: 'Free' },
  'deepseek':       { name: 'DeepSeek',      url: 'https://chat.deepseek.com',          category: 'Chatbots & Assistants', badge: 'Free' },
  'perplexity':     { name: 'Perplexity',    url: 'https://perplexity.ai',              category: 'Research & Analysis',   badge: 'Most Popular' },
  'copilot':        { name: 'GitHub Copilot',url: 'https://github.com/features/copilot',category: 'Code & Development',    badge: 'Best Value' },
  'cursor':         { name: 'Cursor',        url: 'https://cursor.com',                 category: 'Code & Development',    badge: 'Free Trial' },
  'bolt-new':       { name: 'Bolt.new',      url: 'https://bolt.new',                   category: 'Code & Development',    badge: 'Free Trial' },
  'lovable':        { name: 'Lovable',       url: 'https://lovable.dev',                category: 'Code & Development',    badge: 'Free Trial' },
  'windsurf':       { name: 'Windsurf',      url: 'https://windsurf.com',               category: 'Code & Development',    badge: 'Free Trial' },
  'v0':             { name: 'v0',            url: 'https://v0.dev',                     category: 'Code & Development',    badge: 'Free Trial' },
  'devin':          { name: 'Devin',         url: 'https://devin.ai',                   category: 'Code & Development',    badge: 'Pro Pick' },
  'aider':          { name: 'Aider',         url: 'https://aider.chat',                 category: 'Code & Development',    badge: 'Free' },
  'phind':          { name: 'Phind',         url: 'https://www.phind.com',              category: 'Code & Development',    badge: 'Free Trial' },
  'midjourney':     { name: 'Midjourney',    url: 'https://www.midjourney.com',         category: 'Image Generation',      badge: 'Pro Pick' },
  'leonardo-ai':    { name: 'Leonardo AI',   url: 'https://leonardo.ai',                category: 'Image Generation',      badge: 'Free Trial' },
  'canva-ai':       { name: 'Canva Magic Studio', url: 'https://www.canva.com',         category: 'Design & Creative',     badge: 'Free' },
  'runway':         { name: 'Runway',        url: 'https://runwayml.com',               category: 'Video & Animation',     badge: 'Free Trial' },
  'synthesia':      { name: 'Synthesia',     url: 'https://www.synthesia.io',           category: 'Video & Animation',     badge: 'Free Trial' },
  'descript':       { name: 'Descript',      url: 'https://www.descript.com',           category: 'Video & Animation',     badge: 'Free Trial' },
  'elevenlabs':     { name: 'ElevenLabs',     url: 'https://elevenlabs.io',              category: 'Audio & Music',         badge: 'Free Trial' },
  'murf-ai':        { name: 'Murf AI',       url: 'https://murf.ai',                    category: 'Audio & Music',         badge: 'Free Trial' },
  'krisp':          { name: 'Krisp',         url: 'https://krisp.ai',                   category: 'Audio & Music',         badge: 'Free Trial' },
  'jasper':         { name: 'Jasper',        url: 'https://jasper.ai',                  category: 'Writing & Content',     badge: 'Free Trial' },
  'copy-ai':        { name: 'Copy.ai',       url: 'https://www.copy.ai',                category: 'Writing & Content',     badge: 'Free Trial' },
  'deepl':          { name: 'DeepL Pro',     url: 'https://www.deepl.com/pro',          category: 'Writing & Content',     badge: 'Best Value' },
  'notion-ai':      { name: 'Notion AI',     url: 'https://affiliate.notion.so/6m1l49i1a0ct', category: 'Productivity',     badge: 'Best Value' },
  'n8n':            { name: 'n8n',           url: 'https://n8n.io',                     category: 'No-Code & Automation',  badge: 'Free' },
  'make':           { name: 'Make',          url: 'https://www.make.com',               category: 'No-Code & Automation',  badge: 'Free Trial' },
  'zapier-central': { name: 'Zapier Central',url: 'https://central.zapier.com',         category: 'No-Code & Automation',  badge: 'Free Trial' },
  'coze':           { name: 'Coze',          url: 'https://www.coze.com',               category: 'No-Code & Automation',  badge: 'Free' },
  'crewai':         { name: 'CrewAI',        url: 'https://crewai.com',                 category: 'AI Agents',             badge: 'Free' },
  'autogpt':        { name: 'AutoGPT',       url: 'https://autogpt.net',                category: 'AI Agents',             badge: 'Free' },
  'openrouter':     { name: 'OpenRouter',    url: 'https://openrouter.ai',              category: 'AI Agents',             badge: 'Free Trial' },
  'together-ai':    { name: 'Together AI',   url: 'https://together.ai',                category: 'AI Agents',             badge: 'Free Trial' },
  'groq':           { name: 'Groq',          url: 'https://groq.com',                   category: 'AI Agents',             badge: 'Free' },
  'replicate':      { name: 'Replicate',     url: 'https://replicate.com',              category: 'AI Agents',             badge: 'Free Trial' },
  'intercom-ai':    { name: 'Intercom',       url: 'https://www.intercom.com',           category: 'Customer Service',      badge: 'Free Trial' },
  'llamaindex':     { name: 'LlamaIndex',    url: 'https://llamaindex.ai',              category: 'Data & Analytics',      badge: 'Free' },
  'jina-ai':        { name: 'Jina AI',       url: 'https://jina.ai',                    category: 'Data & Analytics',      badge: 'Free Trial' },
  'firecrawl':      { name: 'FireCrawl',     url: 'https://firecrawl.dev',              category: 'Data & Analytics',      badge: 'Free Trial' },
  'ollama':         { name: 'Ollama',        url: 'https://ollama.ai',                  category: 'AI Agents',             badge: 'Free' },
  'browse-ai':      { name: 'Browse AI',     url: 'https://www.browse.ai',              category: 'No-Code & Automation',  badge: 'Free Trial' },
  'tidio':          { name: 'Tidio',         url: 'https://www.tidio.com',              category: 'Customer Service',      badge: 'Free' },
};

// ─── Helpers ───

function getToolSlugsForTags(tags: string[]): string[] {
  const slugSet = new Set<string>();
  for (const tag of tags) {
    const normalized = tag.toLowerCase().replace(/\s+/g, '-');
    const mapped = TAG_TOOL_MAP[normalized];
    if (mapped) mapped.forEach(s => slugSet.add(s));
  }
  return Array.from(slugSet).slice(0, 3);
}

function getToolsForPost(slug: string, tags: string[]): { slug: string; label: string }[] {
  // First check for manual overrides
  if (SLUG_OVERRIDES[slug]) return SLUG_OVERRIDES[slug];

  // Fall back to tag-based matching
  const toolSlugs = getToolSlugsForTags(tags);
  return toolSlugs.map(s => ({ slug: s, label: `Try ${TOOL_DISPLAY[s]?.name || s}` }));
}

// ─── Component ───

export default function BlogAffiliateCTA({
  postSlug,
  postTags,
  postTitle,
}: {
  postSlug: string;
  postTags: string[];
  postTitle: string;
}) {
  const tools = getToolsForPost(postSlug, postTags);
  if (tools.length === 0) return null;

  return (
    <div className="mt-10 mb-6 bg-gradient-to-r from-tech-800/80 via-tech-800/60 to-tech-800/80 border border-neon/20 rounded-xl p-6 sm:p-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-neon/10 rounded-lg shrink-0">
          <Sparkles className="w-5 h-5 text-neon" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            Try These AI Tools
          </h3>
          <p className="text-sm text-tech-300">
            The tools mentioned in this guide — start free, upgrade when you grow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map(({ slug, label }) => {
          const tool = TOOL_DISPLAY[slug];
          if (!tool) return null;
          return (
            <a
              key={slug}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex items-center gap-3 p-3 bg-tech-900/80 border border-tech-500/20 rounded-lg hover:border-neon/30 hover:bg-tech-800/80 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors truncate">
                    {tool.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-tech-500 group-hover:text-neon shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-tech-500">{tool.category}</span>
                  {tool.badge && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-neon/10 text-neon-light">
                      {tool.badge}
                    </span>
                  )}
                </div>
              </div>
              <Zap className="w-4 h-4 text-tech-600 group-hover:text-neon shrink-0 transition-colors" />
            </a>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-tech-500 flex items-center gap-1">
        <ShieldCheck className="w-3 h-3" />
        Some links are affiliate links. We earn a commission if you upgrade — at no extra cost to you.
      </p>
    </div>
  );
}
