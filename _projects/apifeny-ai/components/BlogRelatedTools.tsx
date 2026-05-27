// ══════════════════════════════════════════════════════════
// BlogRelatedTools — Cross-link from blog posts to relevant
// AI tool detail pages. Matches blog tags/keywords to tool
// slugs & categories. Runs server-side — no `use client`.
// ══════════════════════════════════════════════════════════

import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

interface ToolLink {
  slug: string;
  name: string;
  keywords: string[];
}

const TOOL_LINKS: ToolLink[] = [
  { slug: 'chatgpt',              name: 'ChatGPT',         keywords: ['chatgpt', 'openai', 'gpt', 'chatbot'] },
  { slug: 'claude',               name: 'Claude',          keywords: ['claude', 'anthropic'] },
  { slug: 'gemini',               name: 'Gemini',          keywords: ['gemini', 'bard', 'google-ai'] },
  { slug: 'copilot',              name: 'GitHub Copilot',  keywords: ['copilot', 'github-copilot', 'coding-assistant'] },
  { slug: 'midjourney',           name: 'Midjourney',      keywords: ['midjourney', 'ai-art', 'image-gen'] },
  { slug: 'perplexity',           name: 'Perplexity',      keywords: ['perplexity', 'ai-search', 'research'] },
  { slug: 'cursor',               name: 'Cursor',          keywords: ['cursor', 'ai-code-editor'] },
  { slug: 'notion-ai',            name: 'Notion AI',       keywords: ['notion', 'notes', 'productivity'] },
  { slug: 'devin',                name: 'Devin',           keywords: ['devin', 'ai-agent', 'coding-agent'] },
  { slug: 'canva-ai',             name: 'Canva AI',        keywords: ['canva', 'design', 'graphics'] },
  { slug: 'elevenlabs',           name: 'ElevenLabs',      keywords: ['elevenlabs', 'voice', 'tts', 'audio'] },
  { slug: 'runway',               name: 'Runway',          keywords: ['runway', 'video-gen', 'video-editing'] },
  { slug: 'jasper',               name: 'Jasper',          keywords: ['jasper', 'copywriting', 'marketing'] },
  { slug: 'synthesia',            name: 'Synthesia',       keywords: ['synthesia', 'ai-video', 'avatar'] },
  { slug: 'hugging-face',         name: 'Hugging Face',    keywords: ['hugging-face', 'huggingface', 'ml-models'] },
  { slug: 'langchain',            name: 'LangChain',       keywords: ['langchain', 'llm-framework', 'ai-agents'] },
  { slug: 'copy-ai',              name: 'Copy.ai',         keywords: ['copy-ai', 'copyai', 'copywriting'] },
  { slug: 'descript',             name: 'Descript',        keywords: ['descript', 'video-editing', 'podcast'] },
  { slug: 'murf-ai',              name: 'Murf AI',         keywords: ['murf', 'tts', 'voiceover'] },
  { slug: 'intercom-ai',          name: 'Intercom AI',     keywords: ['intercom', 'customer-support', 'chatbot'] },
  { slug: 'fireflies',            name: 'Fireflies',       keywords: ['fireflies', 'meeting-notes', 'transcription'] },
  { slug: 'otter-ai',             name: 'Otter AI',        keywords: ['otter', 'transcription', 'meeting-notes'] },
  { slug: 'grammarly',            name: 'Grammarly',       keywords: ['grammarly', 'writing', 'grammar'] },
  { slug: 'tableau',              name: 'Tableau',         keywords: ['tableau', 'data-viz', 'analytics'] },
  { slug: 'stability-ai',         name: 'Stability AI',    keywords: ['stability', 'stable-diffusion', 'image-gen'] },
  { slug: 'windsurf',             name: 'Windsurf',        keywords: ['windsurf', 'code-editor', 'ai-coding'] },
  { slug: 'lovable',              name: 'Lovable',         keywords: ['lovable', 'gpt-engineer', 'app-builder'] },
  { slug: 'bolt',                 name: 'Bolt',            keywords: ['bolt', 'bolt-new', 'app-builder'] },
  { slug: 'replit',               name: 'Replit',          keywords: ['replit', 'online-ide', 'coding'] },
  { slug: 'claude-code',          name: 'Claude Code',     keywords: ['claude-code', 'claude-code-cli'] },
  { slug: 'v0',                   name: 'v0',              keywords: ['v0', 'vercel-ai', 'ui-generation'] },
  { slug: 'suno',                 name: 'Suno',            keywords: ['suno', 'music-gen', 'ai-music'] },
  { slug: 'gamma',                name: 'Gamma',           keywords: ['gamma', 'presentations', 'slides'] },
];

interface BlogRelatedToolsProps {
  postTitle: string;
  postTags: string[];
}

export default function BlogRelatedTools({ postTitle, postTags }: BlogRelatedToolsProps) {
  const lowerTags = postTags.map(t => t.toLowerCase());
  const lowerTitle = postTitle.toLowerCase();

  const matchedTools = TOOL_LINKS.filter(tool =>
    tool.keywords.some(kw =>
      lowerTags.some(t => t.includes(kw)) || lowerTitle.includes(kw)
    )
  );

  if (matchedTools.length === 0) return null;

  return (
    <section className="border-y border-tech-500/20 bg-tech-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-neon" />
          <h2 className="text-lg font-bold text-white">
            Related AI Tools Mentioned
          </h2>
        </div>
        <p className="text-sm text-tech-400 mb-4">
          These AI tools are discussed in this article. Click to see full reviews, pricing, and alternatives.
        </p>
        <div className="flex flex-wrap gap-2">
          {matchedTools.map(tool => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-tech-500/30 bg-tech-800/50 px-3.5 py-1.5 text-sm font-medium text-tech-300 hover:border-neon/30 hover:text-neon-light hover:bg-neon/10 transition-all"
            >
              <span>{tool.name}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
