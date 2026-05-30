// ══════════════════════════════════════════════════════════
// BlogRelatedTools — Cross-link from blog posts to relevant
// AI tool detail pages. Matches blog tags/keywords to tool
// slugs & categories. Runs server-side — no `use client`.
// ══════════════════════════════════════════════════════════

import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import { toolsData } from '@/lib/data';
import type { Tool } from '@/lib/types';

interface ToolLink {
 slug: string;
 name: string;
 keywords: string[];
}

const TOOL_LINKS: ToolLink[] = [
 { slug: 'chatgpt', name: 'ChatGPT', keywords: ['chatgpt', 'openai', 'gpt', 'chatbot'] },
 { slug: 'claude', name: 'Claude', keywords: ['claude', 'anthropic'] },
 { slug: 'gemini', name: 'Gemini', keywords: ['gemini', 'bard', 'google-ai'] },
 { slug: 'copilot', name: 'GitHub Copilot', keywords: ['copilot', 'github-copilot', 'coding-assistant'] },
 { slug: 'midjourney', name: 'Midjourney', keywords: ['midjourney', 'ai-art', 'image-gen'] },
 { slug: 'perplexity', name: 'Perplexity', keywords: ['perplexity', 'ai-search', 'research'] },
 { slug: 'cursor', name: 'Cursor', keywords: ['cursor', 'ai-code-editor'] },
 { slug: 'notion-ai', name: 'Notion AI', keywords: ['notion', 'notes', 'productivity'] },
 { slug: 'devin', name: 'Devin', keywords: ['devin', 'ai-agent', 'coding-agent'] },
 { slug: 'canva-ai', name: 'Canva AI', keywords: ['canva', 'design', 'graphics'] },
 { slug: 'elevenlabs', name: 'ElevenLabs', keywords: ['elevenlabs', 'voice', 'tts', 'audio', 'voice-cloning', 'text-to-speech'] },
 { slug: 'runway', name: 'Runway', keywords: ['runway', 'video-gen', 'video-editing'] },
 { slug: 'jasper', name: 'Jasper', keywords: ['jasper', 'copywriting', 'marketing'] },
 { slug: 'synthesia', name: 'Synthesia', keywords: ['synthesia', 'ai-video', 'avatar'] },
 { slug: 'hugging-face', name: 'Hugging Face', keywords: ['hugging-face', 'huggingface', 'ml-models'] },
 { slug: 'langchain', name: 'LangChain', keywords: ['langchain', 'llm-framework', 'ai-agents'] },
 { slug: 'copy-ai', name: 'Copy.ai', keywords: ['copy-ai', 'copyai', 'copywriting'] },
 { slug: 'descript', name: 'Descript', keywords: ['descript', 'video-editing', 'podcast'] },
 { slug: 'murf-ai', name: 'Murf AI', keywords: ['murf', 'tts', 'voiceover'] },
 { slug: 'intercom-ai', name: 'Intercom AI', keywords: ['intercom', 'customer-support', 'chatbot'] },
 { slug: 'fireflies', name: 'Fireflies', keywords: ['fireflies', 'meeting-notes', 'transcription'] },
 { slug: 'otter-ai', name: 'Otter AI', keywords: ['otter', 'transcription', 'meeting-notes'] },
 { slug: 'grammarly', name: 'Grammarly', keywords: ['grammarly', 'writing', 'grammar'] },
 { slug: 'tableau', name: 'Tableau', keywords: ['tableau', 'data-viz', 'analytics'] },
 { slug: 'stability-ai', name: 'Stability AI', keywords: ['stability', 'stable-diffusion', 'image-gen'] },
 { slug: 'windsurf', name: 'Windsurf', keywords: ['windsurf', 'code-editor', 'ai-coding'] },
 { slug: 'lovable', name: 'Lovable', keywords: ['lovable', 'gpt-engineer', 'app-builder', 'no-code-web'] },
 { slug: 'bolt', name: 'Bolt', keywords: ['bolt', 'bolt-new', 'app-builder'] },
 { slug: 'replit', name: 'Replit', keywords: ['replit', 'online-ide', 'coding'] },
 { slug: 'claude-code', name: 'Claude Code', keywords: ['claude-code', 'claude-code-cli'] },
 { slug: 'v0', name: 'v0', keywords: ['v0', 'vercel-ai', 'ui-generation'] },
 { slug: 'suno', name: 'Suno', keywords: ['suno', 'music-gen', 'ai-music'] },
 { slug: 'gamma', name: 'Gamma', keywords: ['gamma', 'presentations', 'slides'] },
 { slug: 'deepseek', name: 'DeepSeek', keywords: ['deepseek', 'deep-seek'] },
 { slug: 'n8n', name: 'n8n', keywords: ['n8n', 'workflow-automation', 'low-code-automation'] },
 { slug: 'zapier', name: 'Zapier', keywords: ['zapier', 'zap', 'automation-workflow'] },
];

// Map blog post tag keywords to tool categories for broader matching
const TAG_TO_CATEGORY: Record<string, string> = {
 'accounting': 'Business Operations',
 'bookkeeping': 'Business Operations',
 'finance': 'Business Operations',
 'hr': 'Business Operations',
 'recruiting': 'Business Operations',
 'hiring': 'Business Operations',
 'real-estate': 'Business Operations',
 'restaurant': 'Business Operations',
 'inventory': 'Business Operations',
 'supply-chain': 'Business Operations',
 'ecommerce': 'Business Operations',
 'customer-support': 'Customer Support',
 'customer-service': 'Customer Support',
 'help-desk': 'Customer Support',
 'support': 'Customer Support',
 'translation': 'Writing & Content',
 'localization': 'Writing & Content',
 'transcription': 'Audio & Voice',
 'voice-cloning': 'Audio & Voice',
 'tts': 'Audio & Voice',
 'text-to-speech':'Audio & Voice',
 'dubbing': 'Audio & Voice',
 'video-editing': 'Video & Animation',
 'image-generation': 'Image Generation',
 'ai-art': 'Image Generation',
 'data-analysis': 'Data & Analytics',
 'data-visualization': 'Data & Analytics',
 'analytics': 'Data & Analytics',
 'business-intelligence': 'Data & Analytics',
 'no-code': 'No-Code & Automation',
 'nocode': 'No-Code & Automation',
 'automation': 'No-Code & Automation',
 'workflow': 'No-Code & Automation',
 'marketing': 'Marketing & SEO',
 'seo': 'Marketing & SEO',
 'social-media': 'Marketing & SEO',
 'email-marketing': 'Marketing & SEO',
 'product-photography': 'Design & Creative',
 'design': 'Design & Creative',
 'prototyping': 'Design & Creative',
 'coding': 'Code & Development',
 'development': 'Code & Development',
 'programming': 'Code & Development',
 'healthcare': 'Enterprise',
 'medical': 'Enterprise',
 'legal': 'Enterprise',
 'education': 'Education & Learning',
 'language-learning': 'Education & Learning',
 'productivity': 'Productivity',
 'scheduling': 'Productivity',
 'time-management': 'Productivity',
 'meeting-assistants': 'Productivity',
 'pitch-deck': 'Design & Creative',
 'presentation': 'Design & Creative',
 'resume': 'Productivity',
 'career': 'Productivity',
 'job-search': 'Productivity',
 'travel': 'Productivity',
 'itinerary': 'Productivity',
 'tourism': 'Productivity',
 'ai-models': 'Code & Development',
 'local-ai': 'Code & Development',
 'cloud-ai': 'Code & Development',
 'data-sovereignty': 'Enterprise',
 'privacy': 'Enterprise',
};

interface BlogRelatedToolsProps {
 postTitle: string;
 postTags: string[];
}

export default function BlogRelatedTools({ postTitle, postTags }: BlogRelatedToolsProps) {
 const lowerTags = postTags.map(t => t.toLowerCase());
 const lowerTitle = postTitle.toLowerCase();

 // Strategy 1: Direct keyword match (tool name/brand mentions)
 const directMatches = TOOL_LINKS.filter(tool =>
 tool.keywords.some(kw =>
 lowerTags.some(t => t.includes(kw)) || lowerTitle.includes(kw)
 )
 );

 // Strategy 2: Category-based fallback — if post tags match a tool category,
 // show the top tools from that category
 let categoryMatches: Tool[] = [];
 if (directMatches.length < 2) {
 const matchedCategories = new Set<string>();
 for (const tag of lowerTags) {
 const cat = TAG_TO_CATEGORY[tag];
 if (cat) matchedCategories.add(cat);
 }

 // Also check title for category keywords
 for (const [tag, cat] of Object.entries(TAG_TO_CATEGORY)) {
 if (lowerTitle.includes(tag)) matchedCategories.add(cat);
 }

 if (matchedCategories.size > 0) {
 const takenSlugs = new Set(directMatches.map(m => m.slug));
 categoryMatches = toolsData
 .filter(t => t.is_published && matchedCategories.has(t.category) && !takenSlugs.has(t.slug))
 .sort((a, b) => b.trending_score - a.trending_score)
 .slice(0, 4);
 }
 }

 const matchedTools = directMatches.slice(0, 6);

 if (matchedTools.length === 0 && categoryMatches.length === 0) return null;

 return (
 <section className="border-y border-gray-200 bg-gray-50">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="flex items-center gap-2 mb-4">
 <Wrench className="w-5 h-5 text-blue-600" />
 <h2 className="text-lg font-bold text-gray-900">
 Related AI Tools Mentioned
 </h2>
 </div>
 <p className="text-sm text-gray-600 mb-4">
 These AI tools are discussed in this article. Click to see full reviews, pricing, and alternatives.
 </p>
 <div className="flex flex-wrap gap-2">
 {matchedTools.map(tool => (
 <Link
 key={tool.slug}
 href={`/tools/${tool.slug}`}
 className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all"
 >
 <span>{tool.name}</span>
 <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
 </Link>
 ))}
 {categoryMatches.map(tool => (
 <Link
 key={tool.slug}
 href={`/tools/${tool.slug}`}
 className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50 transition-all"
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
