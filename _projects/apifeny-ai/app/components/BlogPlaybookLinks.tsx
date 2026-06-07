// ══════════════════════════════════════════════════════════
// BlogPlaybookLinks — Cross-link between blog posts and AI
// playbook guides. Matches blog tags to playbook categories
// and suggests relevant "how-to" guides. Also surfaces
// relevant playbooks on category pages.
// ══════════════════════════════════════════════════════════

import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

interface PlaybookLink {
 slug: string;
 title: string;
 icon: string;
 subtitle: string;
 difficulty: string;
 relatedToolSlugs: string[];
}

// Tag → playbook slug mapping: which playbooks are relevant to which blog tags
const TAG_TO_PLAYBOOKS: Record<string, string[]> = {
 'chatgpt': ['ai-personal-assistant-setup', 'ai-workflow-automation'],
 'claude': ['ai-personal-assistant-setup', 'ai-workflow-automation'],
 'gemini': ['ai-personal-assistant-setup'],
 'ai-tools': ['ai-solopreneur-toolkit', 'ai-workflow-automation'],
 'chatbots': ['ai-personal-assistant-setup'],
 'automation': ['ai-workflow-automation'],
 'workflow': ['ai-workflow-automation'],
 'productivity': ['ai-personal-assistant-setup', 'ai-workflow-automation'],
 'writing': ['ai-content-creation-busy-founders'],
 'content': ['ai-content-creation-busy-founders'],
 'marketing': ['ai-for-social-media-management', 'ai-content-creation-busy-founders'],
 'social-media': ['ai-for-social-media-management'],
 'solopreneur': ['ai-solopreneur-toolkit'],
 'data-analysis': ['ai-for-data-analysis'],
 'analytics': ['ai-for-data-analysis'],
 'finance': ['ai-for-personal-finance'],
 'accounting': ['ai-for-personal-finance'],
 'bookkeeping': ['ai-for-personal-finance'],
 'hr': ['ai-for-hr-and-recruiting'],
 'recruiting': ['ai-for-hr-and-recruiting'],
 'hiring': ['ai-for-hr-and-recruiting'],
 'ecommerce': ['ai-for-ecommerce'],
 'customer-support': ['ai-for-customer-support'],
 'ai-agents': ['ai-solopreneur-toolkit', 'ai-workflow-automation'],
 'seo': ['ai-for-social-media-management'],
 'email': ['ai-workflow-automation'],
 'coding': ['directory-builder-template'],
 'development': ['directory-builder-template'],
 'design': ['ai-content-creation-busy-founders'],
 'no-code': ['directory-builder-template'],
};

const PLAYBOOK_META: Record<string, PlaybookLink> = {
 'ai-personal-assistant-setup': {
 slug: 'ai-personal-assistant-setup',
 title: 'AI Personal Assistant Setup',
 icon: '🤖',
 subtitle: 'Set up ChatGPT, Claude, and Gemini as your personal AI assistants',
 difficulty: 'Beginner',
 relatedToolSlugs: ['chatgpt', 'claude', 'gemini', 'perplexity'],
 },
 'ai-workflow-automation': {
 slug: 'ai-workflow-automation',
 title: 'AI Workflow Automation',
 icon: '⚡',
 subtitle: 'Automate repetitive tasks with AI-powered workflows and Zapier',
 difficulty: 'Intermediate',
 relatedToolSlugs: ['zapier', 'chatgpt', 'claude'],
 },
 'ai-content-creation-busy-founders': {
 slug: 'ai-content-creation-busy-founders',
 title: 'AI Content Creation',
 icon: '✍️',
 subtitle: 'Generate blog posts, social content, and marketing copy with AI',
 difficulty: 'Beginner',
 relatedToolSlugs: ['chatgpt', 'claude', 'canva-ai', 'midjourney'],
 },
 'ai-for-data-analysis': {
 slug: 'ai-for-data-analysis',
 title: 'AI for Data Analysis',
 icon: '📊',
 subtitle: 'Analyze spreadsheets, generate insights, and visualize data with AI',
 difficulty: 'Intermediate',
 relatedToolSlugs: ['chatgpt', 'perplexity'],
 },
 'ai-for-personal-finance': {
 slug: 'ai-for-personal-finance',
 title: 'AI for Personal Finance',
 icon: '💰',
 subtitle: 'Manage budgets, track expenses, and optimize taxes with AI tools',
 difficulty: 'Beginner',
 relatedToolSlugs: ['chatgpt', 'perplexity'],
 },
 'ai-for-hr-and-recruiting': {
 slug: 'ai-for-hr-and-recruiting',
 title: 'AI for HR & Recruiting',
 icon: '👥',
 subtitle: 'Streamline hiring, screen candidates, and onboard with AI',
 difficulty: 'Intermediate',
 relatedToolSlugs: ['chatgpt', 'claude'],
 },
 'ai-for-ecommerce': {
 slug: 'ai-for-ecommerce',
 title: 'AI for E-Commerce',
 icon: '🛒',
 subtitle: 'Optimize product listings, automate customer service, and boost sales',
 difficulty: 'Intermediate',
 relatedToolSlugs: ['chatgpt', 'canva-ai', 'midjourney'],
 },
 'ai-for-customer-support': {
 slug: 'ai-for-customer-support',
 title: 'AI for Customer Support',
 icon: '🎧',
 subtitle: 'Deploy AI chatbots, automate tickets, and improve response times',
 difficulty: 'Intermediate',
 relatedToolSlugs: ['chatgpt', 'claude', 'intercom-ai'],
 },
 'ai-for-social-media-management': {
 slug: 'ai-for-social-media-management',
 title: 'AI for Social Media',
 icon: '📱',
 subtitle: 'Schedule, create, and optimize social content across Asian platforms',
 difficulty: 'Beginner',
 relatedToolSlugs: ['chatgpt', 'canva-ai', 'midjourney'],
 },
 'ai-solopreneur-toolkit': {
 slug: 'ai-solopreneur-toolkit',
 title: 'AI Solopreneur Toolkit',
 icon: '🚀',
 subtitle: 'The complete AI stack for running a one-person business',
 difficulty: 'Beginner',
 relatedToolSlugs: ['chatgpt', 'claude', 'perplexity', 'canva-ai'],
 },
 'directory-builder-template': {
 slug: 'directory-builder-template',
 title: 'Directory Builder Template',
 icon: '🏗️',
 subtitle: 'Build your own AI tools directory with Next.js and Supabase',
 difficulty: 'Advanced',
 relatedToolSlugs: ['cursor', 'chatgpt', 'langchain'],
 },
};

interface BlogPlaybookLinksProps {
 /** Blog post tags to match against playbooks */
 postTags?: string[];
 /** Playbook's related tool slugs — used to cross-link blog posts from playbook pages */
 relatedToolSlugs?: string[];
 /** Playbook slug for reverse-lookups */
 playbookSlug?: string;
}

export default function BlogPlaybookLinks({ postTags, relatedToolSlugs, playbookSlug }: BlogPlaybookLinksProps) {
 // Mode 1: Embedding on blog posts → show related playbooks
 if (postTags && postTags.length > 0) {
 const lowerTags = postTags.map(t => t.toLowerCase());
 const matchedSlugs = new Set<string>();

 for (const tag of lowerTags) {
 const playbooks = TAG_TO_PLAYBOOKS[tag];
 if (playbooks) playbooks.forEach(s => matchedSlugs.add(s));
 }

 // Remove self if embedded on a playbook-like page
 if (playbookSlug) matchedSlugs.delete(playbookSlug);

 if (matchedSlugs.size === 0) return null;

 const matchedPlaybooks = Array.from(matchedSlugs)
 .map(s => PLAYBOOK_META[s])
 .filter(Boolean)
 .slice(0, 3);

 if (matchedPlaybooks.length === 0) return null;

 return (
 <section className="border-y border-gray-200 bg-gray-50/30">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="flex items-center gap-2 mb-4">
 <BookOpen className="w-5 h-5 text-cyan-400" />
 <h2 className="text-lg font-bold text-white">Related Playbooks</h2>
 </div>
 <p className="text-sm text-gray-400 mb-4">
 Step-by-step guides to implement the AI tools and workflows discussed in this article.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 {matchedPlaybooks.map(pb => (
 <Link
 key={pb.slug}
 href={`/playbooks/${pb.slug}`}
 className="group block bg-gray-50/50 border border-gray-300/20 rounded-xl p-4 hover:bg-white hover:border-cyan-500/20 transition-all"
 >
 <div className="flex items-start gap-3">
 <span className="text-2xl shrink-0">{pb.icon}</span>
 <div className="min-w-0">
 <p className="text-sm font-medium text-white truncate group-hover:text-cyan-300 transition-colors">{pb.title}</p>
 <p className="text-xs text-gray-400 mt-1 line-clamp-2">{pb.subtitle}</p>
 <span className="inline-block mt-2 text-[11px] text-gray-500 bg-white px-2 py-0.5 rounded-full">{pb.difficulty}</span>
 </div>
 </div>
 </Link>
 ))}
 </div>
 <div className="mt-4 text-center">
 <Link
 href="/playbooks"
 className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
 >
 Browse all playbooks <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>
 </section>
 );
 }

 // Mode 2: Embedding on playbook pages → show related blog posts
 // (Computing blog matches on the server would require importing generated-blog-data.
 // For now, show a link to browse blog posts by related tool.)
 if (relatedToolSlugs && relatedToolSlugs.length > 0) {
 const toolQuery = relatedToolSlugs.slice(0, 3).join(', ');

 return (
 <section className="border-y border-gray-200 bg-gray-50/30 mt-8">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="flex items-center gap-2 mb-4">
 <BookOpen className="w-5 h-5 text-cyan-400" />
 <h2 className="text-lg font-bold text-white">Dive Deeper</h2>
 </div>
 <p className="text-sm text-gray-400 mb-4">
 Read in-depth comparisons and guides about the tools used in this playbook.
 </p>
 <div className="flex flex-wrap gap-2">
 {relatedToolSlugs.slice(0, 6).map(toolSlug => (
 <Link
 key={toolSlug}
 href={`/blog?tag=${toolSlug}`}
 className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/50 px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:border-cyan/30 hover:text-cyan-light hover:bg-cyan/10 transition-all"
 >
 <span>Blog posts about {toolSlug}</span>
 <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
 </Link>
 ))}
 </div>
 <div className="mt-4">
 <Link
 href="/blog"
 className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
 >
 Browse all blog posts <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>
 </section>
 );
 }

 return null;
}
