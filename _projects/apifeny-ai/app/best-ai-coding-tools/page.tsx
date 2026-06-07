'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
 ArrowRight,
 ChevronRight,
 Sparkles,
 Trophy,
 Star,
 TrendingUp,
 Code,
 Terminal,
 GitBranch,
 BookOpen,
 CheckCircle,
 Layers,
 Zap,
 Quote,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import { cn } from '@/lib/utils';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';

const META = {
 title: 'Best AI Coding Tools in 2026 — Top AI Code Assistants Compared',
 description:
 'Find the best AI coding tools of 2026. Compare Cursor, GitHub Copilot, Claude Code, Windsurf, Bolt.new, and 10+ more AI code assistants. Expert rankings, real ratings, and Asia-ready filters.',
 ogTitle: 'Best AI Coding Tools 2026 — Apifeny AI',
 ogDescription:
 'Compare the top AI coding assistants side by side. Cursor vs Copilot vs Claude Code vs Windsurf — ranked by trending score, real user ratings, and Asia-readiness.',
 ogImage: '/og',
};

const CODING_TOOL_SLUGS = [
 'cursor', 'copilot', 'claude-code', 'windsurf', 'bolt-new',
 'devin', 'v0', 'replit-agent', 'tabnine', 'aider',
 'cline', 'phind', 'sourcegraph-cody',
];

function getCodingTools() {
 return CODING_TOOL_SLUGS
 .map((slug) => toolsData.find((t) => t.slug === slug))
 .filter((t): t is NonNullable<typeof t> => t !== undefined && t.is_published);
}

function findPlaybook(slug: string) {
 return playbooks.find((p) => p.slug === slug);
}

export default function BestAICodingToolsPage() {
 const allCodingTools = useMemo(() => getCodingTools(), []);
 const top6 = useMemo(() => [...allCodingTools].sort((a, b) => b.trending_score - a.trending_score).slice(0, 6), [allCodingTools]);

 const categories = useMemo(() => {
 return [
 {
 name: 'AI-Native IDEs',
 description: 'Full IDEs built from the ground up with AI at their core.',
 tools: ['cursor', 'windsurf'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
 },
 {
 name: 'IDE Extensions',
 description: 'AI assistants that plug into your existing editor.',
 tools: ['copilot', 'tabnine', 'cline', 'sourcegraph-cody'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
 },
 {
 name: 'Terminal Agents',
 description: 'Autonomous coding agents that work from your terminal.',
 tools: ['claude-code', 'aider', 'devin'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
 },
 {
 name: 'Prompt-to-App Builders',
 description: 'Generate full applications from a single prompt.',
 tools: ['bolt-new', 'v0', 'replit-agent', 'phind'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
 },
 ].filter((c) => c.tools.length > 0);
 }, []);

 const codingPlaybook = useMemo(() => findPlaybook('ai-workflow-automation'), []);

 // Inject JSON-LD
 useEffect(() => {
 const toolItems = top6.map((t, i) => ({
 '@type': 'ListItem',
 position: i + 1,
 item: {
 '@type': 'SoftwareApplication',
 name: t.name,
 url: `https://apifeny-ai.vercel.app/tools/${t.slug}`,
 description: t.tagline || t.description.slice(0, 150),
 applicationCategory: 'DeveloperApplication',
 },
 }));

 const script = document.createElement('script');
 script.type = 'application/ld+json';
 script.id = 'best-ai-coding-tools-jsonld';
 script.textContent = JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'ItemList',
 name: 'Best AI Coding Tools in 2026',
 description: 'Top AI coding assistants and tools ranked by trending score, user ratings, and features.',
 url: 'https://apifeny-ai.vercel.app/best-ai-coding-tools',
 numberOfItems: allCodingTools.length,
 itemListElement: toolItems,
 });

 const existing = document.getElementById('best-ai-coding-tools-jsonld');
 if (existing) existing.remove();
 document.head.appendChild(script);
 return () => { script.remove(); };
 }, [top6, allCodingTools.length]);

 return (
 <div className="min-h-screen bg-white">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Best AI Coding Tools', item: '/best-ai-coding-tools' },
 ]}
 />
 <SeoMetadata
 title={META.title}
 description={META.description}
 ogTitle={META.ogTitle}
 ogDescription={META.ogDescription}
 ogImage={META.ogImage}
 />

 {/* ───── HERO ───── */}
 <section className="relative overflow-hidden border-b border-gray-200">
 <div className="absolute inset-0 bg-gray-50 opacity-40 pointer-events-none" />
 <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-aqua/10 rounded-full blur-[100px] pointer-events-none" />

 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
 <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
 {allCodingTools.length} AI Coding Tools · Updated 2026
 </div>

 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
 Best AI Coding Tools in{' '}
 <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-aqua bg-clip-text text-transparent">
 2026
 </span>
 <br />
 <span className="text-gray-800">AI Code Assistants, IDEs &amp; Agents</span>
 </h1>

 <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
 From AI-native IDEs like Cursor and Windsurf to terminal agents like{' '}
 <strong className="text-white">Claude Code</strong> and <strong className="text-white">Aider</strong> —
 find the perfect AI coding assistant for your workflow. Ranked by real developer ratings.
 </p>

 <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
 <Link
 href="/categories/code-development"
 className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
 >
 <span>Browse All Coding Tools</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </Link>
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 text-gray-800 hover:border-sky-400/30 hover:text-white text-sm sm:text-base font-medium transition-all"
 >
 <Zap className="w-4 h-4" />
 View All {toolsData.filter((t) => t.is_published).length} Tools
 </Link>
 </div>

 <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.3s' }}>
 <div className="flex items-center gap-2">
 <Terminal className="w-4 h-4 text-sky-400" />
 <span>13 Coding Tools Ranked</span>
 </div>
 <div className="flex items-center gap-2">
 <GitBranch className="w-4 h-4 text-asia" />
 <span>AI IDEs &amp; Extensions</span>
 </div>
 <div className="flex items-center gap-2">
 <CheckCircle className="w-4 h-4 text-emerald-400" />
 <span>Prompt-to-App Builders</span>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ───── TOP 6 CODING TOOLS ───── */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
 <div>
 <div className="flex items-center gap-3 mb-2">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center shrink-0">
 <Trophy className="w-5 h-5 text-asia" />
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white">
 Top AI Coding Tools in 2026
 </h2>
 </div>
 <p className="text-sm sm:text-base text-gray-700 ml-[52px]">
 Ranked by trending score, real developer ratings, and code quality
 </p>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
 {top6.map((tool, i) => (
 <Link
 key={tool.id}
 href={`/tools/${tool.slug}`}
 className={cn(
 'group relative block rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300',
 'hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/5 hover:-translate-y-1',
 )}
 >
 <div
 className={cn(
 'absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10',
 i === 0
 ? 'bg-gradient-to-br from-asia to-amber-400 text-black'
 : i === 1
 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black'
 : i === 2
 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
 : 'bg-gray-200 text-gray-800 border border-gray-200/30'
 )}
 >
 #{i + 1}
 </div>

 <div className="flex items-start gap-3 mb-3">
 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-gray-200/30 group-hover:border-sky-400/30 transition">
 <span className="text-white font-bold text-sm">
 {tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
 </span>
 </div>
 <div className="min-w-0 flex-1">
 <h3 className="text-base font-semibold text-white truncate group-hover:text-sky-300 transition-colors">
 {tool.name}
 </h3>
 <p className="text-xs text-gray-700 line-clamp-2 mt-0.5 leading-relaxed">
 {tool.tagline}
 </p>
 </div>
 </div>

 <div className="flex flex-wrap items-center gap-2 mb-3">
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200">
 <Code className="w-2.5 h-2.5" />
 {tool.pricing_tier === 'Open Source' ? 'Open Source' : tool.pricing_tier}
 </span>
 <span
 className={cn(
 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
 tool.pricing_tier === 'Free'
 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
 : tool.pricing_tier === 'Freemium'
 ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
 : tool.pricing_tier === 'Open Source'
 ? 'bg-violet-500/20 text-violet-400 border-violet-500/30'
 : 'bg-neon/20 text-neon-light border-neon/30'
 )}
 >
 {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier === 'Open Source' ? 'OSS' : tool.pricing_tier}
 </span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200">
 <Terminal className="w-2.5 h-2.5" />
 {tool.slug === 'cursor' || tool.slug === 'windsurf' ? 'AI IDE'
 : tool.slug === 'claude-code' || tool.slug === 'aider' || tool.slug === 'devin' ? 'Terminal Agent'
 : tool.slug === 'bolt-new' || tool.slug === 'v0' || tool.slug === 'replit-agent' || tool.slug === 'phind' ? 'App Builder'
 : 'IDE Extension'}
 </span>
 </div>

 <div className="flex items-center gap-2 mb-2">
 <div className="flex items-center gap-0.5">
 {(() => {
 const stars: ('full' | 'half' | 'empty')[] = [];
 for (let i = 1; i <= 5; i++) {
 if (tool.avg_rating >= i) stars.push('full');
 else if (tool.avg_rating >= i - 0.5) stars.push('half');
 else stars.push('empty');
 }
 return stars.map((s, si) => (
 <Star key={si} className={cn('w-3 h-3', s === 'full' ? 'fill-asia text-asia' : s === 'half' ? 'fill-asia/50 text-asia' : 'fill-none text-gray-400')} />
 ));
 })()}
 </div>
 <span className="text-xs text-gray-700">{tool.avg_rating.toFixed(1)}</span>
 </div>

 <div className="flex items-center gap-2">
 <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
 <div
 className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-500"
 style={{ width: `${tool.trending_score}%` }}
 />
 </div>
 <div className="flex items-center gap-1 shrink-0">
 <TrendingUp className="w-3 h-3 text-sky-400" />
 <span className="text-[10px] font-medium text-sky-400">{tool.trending_score}</span>
 </div>
 </div>
 </Link>
 ))}
 </div>

 <div className="mt-10 text-center">
 <Link
 href="/categories/code-development"
 className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
 >
 <span>View All {allCodingTools.length} Coding Tools →</span>
 </Link>
 </div>
 </section>

 {/* ───── CATEGORY BREAKDOWN ───── */}
 {categories.map((cat) => (
 <section key={cat.name} className="border-t border-gray-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="flex items-start gap-3 mb-6">
 <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 mt-1">
 <Layers className="w-5 h-5 text-sky-400" />
 </div>
 <div>
 <h2 className="text-xl sm:text-2xl font-bold text-white">{cat.name}</h2>
 <p className="text-sm text-gray-700 mt-1 max-w-xl">{cat.description}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {cat.tools.map((tool) => (
 <Link
 key={tool.id}
 href={`/tools/${tool.slug}`}
 className="group block rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-sky-400/30 hover:bg-white hover:-translate-y-0.5"
 >
 <div className="flex items-start gap-2.5 mb-2">
 <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-gray-200/20">
 <span className="text-white font-bold text-xs">{tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
 </div>
 <div className="min-w-0 flex-1">
 <h3 className="text-sm font-semibold text-white truncate group-hover:text-sky-300 transition">{tool.name}</h3>
 <p className="text-[11px] text-gray-700 line-clamp-2 mt-0.5">{tool.tagline}</p>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : tool.pricing_tier === 'Freemium' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'bg-neon/20 text-neon-light border-neon/30')}>
 {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
 </span>
 <div className="flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-asia text-asia" /><span className="text-[10px] text-gray-700">{tool.avg_rating.toFixed(1)}</span></div>
 <div className="flex items-center gap-0.5 ml-auto"><TrendingUp className="w-2.5 h-2.5 text-sky-400" /><span className="text-[9px] text-sky-400 font-medium">{tool.trending_score}</span></div>
 </div>
 </Link>
 ))}
 </div>
 </section>
 ))}

 {/* ───── COMPARISON TABLE ───── */}
 <section className="border-y border-gray-200 bg-gray-50/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="text-center mb-8 sm:mb-10">
 <h2 className="text-2xl sm:text-3xl font-bold text-white">Quick Comparison: Top 5 AI Coding Tools</h2>
 <p className="text-sm sm:text-base text-gray-700 mt-2 max-w-xl mx-auto">
 See how the leading AI coding assistants stack up.
 </p>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-gray-200">
 <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Tool</th>
 <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
 <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Pricing</th>
 <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Rating</th>
 <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Trending</th>
 <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Asia-Ready</th>
 <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Agentic</th>
 </tr>
 </thead>
 <tbody>
 {[...allCodingTools].sort((a, b) => b.trending_score - a.trending_score).slice(0, 5).map((tool) => (
 <tr key={tool.id} className="border-b border-gray-200 hover:bg-white transition">
 <td className="px-4 py-3">
 <Link href={`/tools/${tool.slug}`} className="text-sm font-semibold text-white hover:text-sky-300 transition">
 {tool.name}
 </Link>
 </td>
 <td className="px-4 py-3 text-xs text-gray-700">
 {tool.slug === 'cursor' || tool.slug === 'windsurf' ? 'AI IDE'
 : tool.slug === 'copilot' || tool.slug === 'tabnine' || tool.slug === 'sourcegraph-cody' ? 'Extension'
 : tool.slug === 'claude-code' || tool.slug === 'aider' || tool.slug === 'devin' || tool.slug === 'cline' ? 'Agent'
 : 'App Builder'}
 </td>
 <td className="px-4 py-3 text-xs">
 <span className={cn('px-1.5 py-0.5 rounded', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400' : tool.pricing_tier === 'Freemium' || tool.pricing_tier === 'Open Source' ? 'bg-sky-500/20 text-sky-400' : 'bg-neon/20 text-neon-light')}>
 {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier === 'Open Source' ? 'OSS' : tool.pricing_tier}
 </span>
 </td>
 <td className="px-4 py-3 text-xs text-gray-800">
 <div className="flex items-center gap-1">
 <Star className="w-3 h-3 fill-asia text-asia" />
 {tool.avg_rating.toFixed(1)}
 </div>
 </td>
 <td className="px-4 py-3 text-xs"><span className="text-sky-400 font-medium">{tool.trending_score}</span></td>
 <td className="px-4 py-3 text-xs">{tool.asia_ready ? <span className="text-emerald-400">✓ Yes</span> : <span className="text-gray-400">—</span>}</td>
 <td className="px-4 py-3 text-xs">{tool.is_agentic ? <span className="text-sky-400">✓ Yes</span> : <span className="text-gray-400">—</span>}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <div className="mt-6 text-center">
 <Link href="/tools?category=Code+%26+Development" className="inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300 transition">
 Compare all coding tools <ChevronRight className="w-4 h-4" />
 </Link>
 </div>
 </div>
 </section>

 {/* ───── PLAYBOOK ───── */}
 {codingPlaybook && (
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center shrink-0">
 <BookOpen className="w-5 h-5 text-emerald-400" />
 </div>
 <div>
 <h2 className="text-xl sm:text-2xl font-bold text-white">Start with a Playbook</h2>
 <p className="text-xs sm:text-sm text-gray-700">Not sure where to start? Follow this step-by-step AI workflow guide.</p>
 </div>
 </div>

 <Link
 href={`/playbook/${codingPlaybook.slug}`}
 className="block rounded-xl border border-gray-200 bg-white p-6 hover:border-sky-400/30 hover:-translate-y-0.5 transition-all"
 >
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
 <div>
 <h3 className="text-lg font-semibold text-white group-hover:text-sky-300">{codingPlaybook.title}</h3>
 <p className="text-sm text-gray-700 mt-1">{typeof codingPlaybook.description === 'string' ? codingPlaybook.description : ''}</p>
 </div>
 <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 shrink-0">
 Read the playbook <ArrowRight className="w-4 h-4" />
 </span>
 </div>
 </Link>

 <div className="mt-6">
 <FeaturedPlaybooks />
 </div>
 </section>
 )}

 {/* ───── BLOG CROSS-LINKS ───── */}
 <BlogCategoryLinks
 slugs={['coding-development', 'ai-tools', 'comparisons']}
 heading="Read AI Coding Guides"
 />

 {/* ───── LANDING PAGE CROSS-LINKS ───── */}
 <LandingPageCrossLinks currentSlug="best-ai-coding-tools" />

 {/* ───── FINAL CTA ───── */}
 <section className="relative overflow-hidden border-t border-gray-200">
 <div className="absolute inset-0 bg-gray-50 opacity-30 pointer-events-none" />
 <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

 <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
 Ready to Ship Faster with AI Coding Tools?
 </h2>
 <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
 Stop switching between mediocre tools. We&apos;ve done the research — {allCodingTools.length} AI coding assistants ranked, compared, and ready for you.
 </p>

 <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
 <Link
 href="/categories/code-development"
 className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
 >
 <span>Browse All Coding Tools →</span>
 </Link>
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 text-gray-800 hover:border-sky-400/30 hover:text-white text-sm sm:text-base font-medium transition-all"
 >
 Explore All AI Tools
 </Link>
 </div>
 </div>
 </section>
 </div>
 );
}
