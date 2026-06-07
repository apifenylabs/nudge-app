'use client';

import { useState, useEffect, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
 ArrowLeft,
 BookOpen,
 ChevronRight,
 TrendingUp,
 Trophy,
 Layers,
 Sparkles,
 Globe,
 Lightbulb,
 Info,
 ExternalLink,
} from 'lucide-react';
import { RANKING_CATEGORIES, getRankingCategory } from '@/lib/ranking-categories';
import { toolsData } from '@/lib/data';
import type { Tool } from '@/lib/types';
import { computeAllScores, RankedTool } from '@/lib/ranking-algorithm';
import { cn } from '@/lib/utils';
import { playbooks } from '@/lib/playbooks';
import AffiliateButton from '@/components/AffiliateButton';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

interface RankingCategoryPageProps {
 params: { slug: string };
}

// ─── Region Labels ──────────────────────────────────────────────────────────

const REGION_LABELS: Record<string, string> = {
 global: '🌍 Global',
 asia: '🌏 Asia',
 'north-america': '🌎 North America',
 europe: '🌍 Europe',
 'south-america': '🌎 South America',
 oceania: '🌏 Oceania',
};

// ─── Helper: Get tools matching a region ────────────────────────────────────

function toolsForRegion(tools: Tool[], region: string): Tool[] {
 if (region === 'global') return tools;
 return tools.filter((t) => {
 if (!t.supports_languages || t.supports_languages.length === 0) return false;
 const langs = t.supports_languages.map((l) => l.toLowerCase());
 switch (region) {
 case 'asia':
 return langs.some((l) => ['chinese', 'japanese', 'korean', 'thai', 'vietnamese', 'indonesian', 'hindi', 'tagalog'].includes(l));
 case 'north-america':
 return t.supports_languages.includes('English');
 case 'europe':
 return langs.some((l) => ['english', 'french', 'german', 'spanish', 'italian', 'portuguese', 'dutch'].includes(l));
 default:
 return true;
 }
 });
}



// ─── Page Component ──────────────────────────────────────────────────────────

export default function RankingCategoryPage({ params }: RankingCategoryPageProps) {
 const cat = getRankingCategory(params.slug);
 if (!cat) notFound();

 const [regionFilter, setRegionFilter] = useState<string>('global');

 const allRanked = useMemo(() => computeAllScores(toolsData), []);

 const { rankedTools, topScore } = useMemo(() => {
 const regionTools = toolsForRegion(toolsData, regionFilter);
 const regionRanked = computeAllScores(regionTools);
 const matching = regionRanked
 .filter((rt) => cat.toolFilter(rt.tool))
 .slice(0, cat.displayCount);
 const r = matching.map((rt, i) => ({ ...rt, rank: i + 1 }));
 return { rankedTools: r, topScore: r[0]?.score || 0 };
 }, [cat, regionFilter]);

 // ─── Per-category "Why this matters" content ──────────────────────────────
 const categoryInsights: Record<string, { why: string; stats: string[]; startHere: string }> = {
 'strategic-planning': {
 why: 'Strategic planning with AI is the highest-leverage activity for any business. Choosing the right AI for your strategy work means better decisions, faster scenario analysis, and a competitive edge that compounds over time.',
 stats: ['12 tools ranked', '74% of top execs use AI for planning', 'Avg time savings: 8 hrs/week'],
 startHere: 'You\'re a founder, strategist, or product manager who wants AI to accelerate your thinking — not replace it.',
 },
 'ideation': {
 why: 'Ideation is where AI truly shines — it can generate 100x more ideas than a human alone, in any direction you need. The right tool helps you explore possibilities you\'d never consider.',
 stats: ['10 tools ranked', '3x more ideas with AI-assisted brainstorming', 'Avg session time: 15 min'],
 startHere: 'You\'re creative, curious, and want to explore more possibilities before committing to a direction.',
 },
 'research': {
 why: 'AI research tools can process 100+ sources in minutes and synthesize insights that would take a human team weeks. Speed and depth at the same time.',
 stats: ['10 tools ranked', '80% faster research with AI', '4.5× more sources covered'],
 startHere: 'You need to understand a topic, market, or competitor quickly and thoroughly.',
 },
 'coding': {
 why: 'AI coding assistants have transformed from novelty to necessity. The best coding LLMs can write, debug, and deploy entire features. This ranking helps you pick the right co-pilot for your tech stack.',
 stats: ['8 tools ranked', '55% of devs use AI coding tools daily', 'Avg productivity boost: 2.1x'],
 startHere: 'You write code and want an AI co-pilot that fits your language, framework, and workflow.',
 },
 'code-review': {
 why: 'Code review AI tools catch bugs, security issues, and architectural problems before they hit production. They\'re the equivalent of a senior engineer who never sleeps.',
 stats: ['6 tools ranked', '3x more bugs caught vs manual review', 'Avg review time: 3 min vs 45 min'],
 startHere: 'You ship code and want to catch issues before your users do — without a dedicated QA team.',
 },
 'deployment': {
 why: 'AI deployment tools automate the entire go-live process — from infrastructure setup to monitoring. Speed and reliability together.',
 stats: ['8 tools ranked', '65% faster deployments', '70% fewer rollbacks with AI deployment monitoring'],
 startHere: 'You want to go from code to production faster and with fewer sleepless nights.',
 },
 'agent-building': {
 why: 'AI agents are the next frontier — autonomous systems that plan, execute, and learn. The right agent framework determines what\'s possible.',
 stats: ['8 tools ranked', 'New category: fastest growing in 2026', 'Avg agent uptime: 99.5%'],
 startHere: 'You\'re building autonomous AI systems and need the right framework and LLM combination.',
 },
 'content-creation': {
 why: 'AI content creation tools have matured to the point where AI-written content can match or exceed human quality. The key is knowing which tool for which format.',
 stats: ['12 tools ranked', '72% of marketers use AI for content', 'AI content costs 90% less than agency'],
 startHere: 'You publish content regularly and want to scale your output without scaling your budget.',
 },
 'automation': {
 why: 'AI automation eliminates repetitive work across your entire business. The right tools can replace entire workflows, freeing you for high-value work.',
 stats: ['10 tools ranked', '85% of repetitive tasks can be automated', 'Avg savings: 20+ hrs/week'],
 startHere: 'You\'re tired of repetitive tasks and want AI to handle the busywork so you can focus on growth.',
 },
 'multimodal': {
 why: 'Multimodal AI — handling text, images, audio, and video — is the biggest leap forward in 2026. These tools combine modalities for richer understanding and creation.',
 stats: ['8 tools ranked', '150% growth in multimodal AI usage', 'Avg capability: 5+ modalities per tool'],
 startHere: 'You work across media types and want one tool that handles text, images, audio, and video.',
 },
 'marketing': {
 why: 'AI marketing tools automate everything from keyword research to email sequences to ad optimization. The right stack can 3x your marketing output.',
 stats: ['8 tools ranked', '67% of marketing teams use AI', 'Avg ROI: 3.2x on AI marketing spend'],
 startHere: 'You\'re responsible for growth and want AI to amplify every marketing channel.',
 },
 'monetization': {
 why: 'AI monetization tools help you price, sell, and optimize revenue. From dynamic pricing to AI-powered sales, these tools directly impact your bottom line.',
 stats: ['6 tools ranked', 'Avg 23% revenue increase with AI pricing', '92% of top-tier SaaS uses AI monetization'],
 startHere: 'You want AI to directly increase revenue — through better pricing, sales, or customer value optimization.',
 },
 };

 const insight = categoryInsights[params.slug] || {
 why: `Choosing the right AI tool for ${cat.pipelineStage} workflows can dramatically improve your output quality and speed.`,
 stats: [`${rankedTools.length} tools ranked`, 'Industry-leading AI tools', 'Cosme 5-factor ranking'],
 startHere: 'You want to find the best AI tool for your specific workflow stage.',
 };

 // ─── Reading progress bar state ────────────────────────────────────────────
 const [scrollProgress, setScrollProgress] = useState(0);

 useEffect(() => {
 const handleScroll = () => {
 const scrollTop = window.scrollY;
 const docHeight = document.documentElement.scrollHeight - window.innerHeight;
 const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
 setScrollProgress(Math.min(progress, 100));
 };
 window.addEventListener('scroll', handleScroll, { passive: true });
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
 <>
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Rankings', item: '/rankings' },
 { name: cat.title, item: `/rankings/${cat.slug}` },
 ]}
 />
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Reading Progress Bar */}
 <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-neon to-aqua z-50 transition-all duration-200"
 style={{ width: `${scrollProgress}%` }}
 />

 {/* Back link */}
 <Link
 href="/rankings"
 className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 All Rankings
 </Link>

 {/* Hero */}
 <section className="relative mb-8 sm:mb-10">
 <div className="absolute inset-0 bg-gray-50 opacity-30 rounded-2xl" />
 <div
 className="relative rounded-2xl border border-gray-200 p-8 sm:p-12 overflow-hidden"
 style={{ backgroundImage: `linear-gradient(135deg, ${cat.gradient}), linear-gradient(to bottom right, rgba(17,17,34,0.9), rgba(17,17,34,0.9))` }}
 >
 <div className="relative">
 <div className="flex items-center gap-3 mb-3">
 <span className="text-3xl">{cat.icon}</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neon/10 text-neon-light border border-neon/20">
 <Trophy className="w-3 h-3" />
 Top {cat.displayCount}
 </span>
 </div>
 <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{cat.title}</h1>
 <p className="text-sm text-gray-700 max-w-2xl mb-4">{cat.description}</p>

 {/* Score range */}
 <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-600 mb-4">
 <span className="flex items-center gap-1">
 <TrendingUp className="w-3.5 h-3.5 text-neon-light" />
 Score range: {topScore.toFixed(1)} — {rankedTools[rankedTools.length - 1]?.score.toFixed(1)}
 </span>
 <span className="flex items-center gap-1">
 <Layers className="w-3.5 h-3.5 text-asia" />
 {rankedTools.length} tools
 </span>
 <span className="flex items-center gap-1">
 <Globe className="w-3.5 h-3.5 text-emerald-400" />
 Cosme algorithm
 </span>
 </div>

 {/* Why this matters */}
 <div className="rounded-xl border border-asia/20 bg-asia/5 p-4 mb-4">
 <div className="flex items-start gap-3">
 <Info className="w-4 h-4 text-asia shrink-0 mt-0.5" />
 <div>
 <h3 className="text-xs font-semibold text-asia mb-1">Why this matters</h3>
 <p className="text-xs text-gray-800/80 leading-relaxed">{insight.why}</p>
 </div>
 </div>
 </div>

 {/* Key stats */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
 {insight.stats.map((stat, i) => {
 const [val, ...rest] = stat.split(/\s(.+)/);
 return (
 <div key={i} className="rounded-lg border border-gray-200 bg-gray-50/60 p-3 text-center hover:border-neon/30 transition-colors">
 <div className="text-xs font-bold text-neon-light mb-0.5">{val}</div>
 <div className="text-[10px] text-gray-600">{rest.join('') || val}</div>
 </div>
 );
 })}
 </div>

 {/* Start here if */}
 <div className="flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
 <Lightbulb className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
 <p className="text-[11px] text-gray-800 leading-relaxed">
 <span className="font-semibold text-emerald-400">Start here if: </span>
 {insight.startHere}
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Region Filter */}
 <div className="flex items-center gap-2 mb-6">
 <Globe className="w-4 h-4 text-gray-600" />
 <span className="text-xs text-gray-600 mr-1">Region:</span>
 <select
 value={regionFilter}
 onChange={(e) => setRegionFilter(e.target.value)}
 className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-neon/50 transition"
 >
 {Object.entries(REGION_LABELS).map(([key, label]) => (
 <option key={key} value={key}>{label}</option>
 ))}
 </select>
 <span className="text-[10px] text-gray-400 ml-1">
 ({rankedTools.length} tools)
 </span>
 </div>

 {/* Ranking List */}
 <section>
 <div className="space-y-3">
 {rankedTools.map((rt, i) => (
 <Link
 key={rt.tool.id}
 href={`/tools/${rt.tool.slug}`}
 className={cn(
 'group relative flex items-center gap-4 sm:gap-6 rounded-xl border border-gray-200 p-4 sm:p-5 transition-all hover:-translate-y-0.5',
 i === 0
 ? 'bg-gradient-to-r from-amber-500/10 via-neon/5 to-tech-700 border-amber-500/20 hover:border-amber-500/40'
 : 'bg-white hover:border-neon/40'
 )}
 >
 {/* Rank badge */}
 <div className="shrink-0">
 {i === 0 ? (
 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
 <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
 </div>
 ) : i === 1 ? (
 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-lg shadow-gray-500/20">
 <span className="text-lg sm:text-xl font-bold text-gray-900">2</span>
 </div>
 ) : i === 2 ? (
 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-700/20">
 <span className="text-lg sm:text-xl font-bold text-amber-200">3</span>
 </div>
 ) : (
 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
 <span className="text-base sm:text-lg font-bold text-gray-700">{rt.rank}</span>
 </div>
 )}
 </div>

 {/* Tool info */}
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 mb-1">
 <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-neon-light transition-colors truncate">
 {rt.tool.name}
 </h3>
 {rt.tool.is_agentic && (
 <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-neon/15 text-neon-light border border-neon/20 shrink-0">
 Agentic
 </span>
 )}
 </div>
 <p className="text-xs sm:text-sm text-gray-700 line-clamp-1">{rt.tool.tagline}</p>

 {/* Pipeline stage tags */}
 {rt.tool.best_for_pipeline_stage && (
 <PipelineBadge stage={rt.tool.best_for_pipeline_stage} />
 )}
 </div>

 {/* Score + Affiliate CTA */}
 <div className="flex flex-col items-center gap-1.5 shrink-0">
 <div
 className={cn(
 'w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border',
 rt.score >= 8
 ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
 : rt.score >= 6
 ? 'bg-neon/15 border-neon/30 text-neon-light'
 : rt.score >= 4
 ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
 : 'bg-gray-50 border-gray-200 text-gray-600'
 )}
 >
 {rt.score.toFixed(1)}
 </div>
 <span className="text-[9px] text-gray-400 uppercase tracking-wider">Score</span>
 <div className="hidden lg:block mt-1">
 <AffiliateButton
 toolSlug={rt.tool.slug}
 toolName={rt.tool.name}
 fallbackUrl={rt.tool.website_url}
 variant="small"
 />
 </div>
 </div>

 {/* Chevron */}
 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-neon-light transition-colors shrink-0" />
 </Link>
 ))}
 </div>

 {rankedTools.length === 0 && (
 <div className="text-center py-12">
 <p className="text-sm text-gray-600">No tools match the selected region filter.</p>
 </div>
 )}
 </section>

 {/* Related Playbooks */}
 {(() => {
 const relatedPlaybooks = playbooks.filter(
 (p) => p.pipeline_stage === cat.pipelineStage
 );
 if (relatedPlaybooks.length === 0) return null;
 return (
 <section className="mt-8 mb-8">
 <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-neon-light" />
 Related Playbooks
 </h2>
 <p className="text-sm text-gray-700 mb-4">
 These playbooks match the {cat.pipelineStage} stage of your workflow.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {relatedPlaybooks.map((pb) => (
 <Link
 key={pb.slug}
 href={`/playbook/${pb.slug}`}
 className="group rounded-xl border border-gray-200 bg-white p-4 hover:border-neon/40 hover:-translate-y-0.5 transition-all"
 >
 <div className="flex items-center gap-2 mb-2">
 <span className="text-xl">{pb.icon}</span>
 <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors">
 {pb.title}
 </h3>
 </div>
 <p className="text-xs text-gray-700 line-clamp-2 mb-3">{pb.description}</p>
 {pb.real_results && pb.real_results.length > 0 && (
 <div className="flex flex-wrap gap-2">
 {pb.real_results.slice(0, 2).map((r, i) => (
 <span
 key={i}
 className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
 >
 {r.value} {r.metric}
 </span>
 ))}
 </div>
 )}
 <div className="flex items-center gap-1 mt-3 text-[10px] text-neon-light opacity-0 group-hover:opacity-100 transition-opacity">
 View playbook
 <ChevronRight className="w-3 h-3" />
 </div>
 </Link>
 ))}
 </div>
 </section>
 );
 })()}

 {/* How scoring works */}
 <section className="rounded-xl border border-gray-200 bg-white p-6">
 <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
 <Sparkles className="w-4 h-4 text-neon-light" />
 How the ranking works
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
 {[
 { label: 'Community Rating', weight: '35%', desc: 'Avg rating × review confidence (log-weighted)' },
 { label: 'Trending Velocity', weight: '20%', desc: 'Recent saves, reviews, and ratings × recency decay' },
 { label: 'Asia Score', weight: '20%', desc: 'Local pricing, language support, data residency' },
 { label: 'Editor Pick', weight: '15%', desc: 'Editorially selected — curated by our team' },
 { label: 'Saves & Bookmarking', weight: '10%', desc: 'Total saves normalized across the dataset' },
 ].map((factor, i) => (
 <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-200 hover:scale-[1.02] transition-transform">
 <div className="flex items-center justify-between mb-1">
 <span className="text-xs font-medium text-white">{factor.label}</span>
 <span className="text-[10px] font-bold text-neon-light">{factor.weight}</span>
 </div>
 <p className="text-[10px] text-gray-600">{factor.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* CTA to browse all */}
 <div className="mt-8 text-center">
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-white text-sm font-medium transition"
 >
 Browse all tools
 <ChevronRight className="w-4 h-4" />
 </Link>
 </div>
 </div>
 </>
 );
}

// ─── Pipeline Badge Component ────────────────────────────────────────────────

const PIPELINE_COLORS: Record<string, string> = {
 'planning': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
 'research': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
 'ideation': 'bg-pink-500/15 text-pink-400 border-pink-500/30',
 'coding': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
 'review': 'bg-amber-100 text-amber-700 border-amber-200 border-amber-500/30',
 'testing': 'bg-orange-100 text-orange-700 border-orange-200 border-orange-500/30',
 'deployment': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
 'content': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
 'marketing': 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30',
 'automation': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
 'multimodal': 'bg-teal-500/15 text-teal-400 border-teal-500/30',
 'all-rounder': 'bg-neon/15 text-neon-light border-neon/30',
};

const PIPELINE_LABELS: Record<string, string> = {
 'planning': 'Planning',
 'research': 'Research',
 'ideation': 'Ideation',
 'coding': 'Coding',
 'review': 'Code Review',
 'testing': 'Testing',
 'deployment': 'Deployment',
 'content': 'Content',
 'marketing': 'Marketing',
 'automation': 'Automation',
 'multimodal': 'Multimodal',
 'all-rounder': 'All-Rounder',
};

function PipelineBadge({ stage }: { stage: string }) {
 return (
 <div className="flex flex-wrap gap-1.5 mt-2">
 <span
 className={cn(
 'px-2 py-0.5 rounded-full text-[9px] font-medium border transition hover:scale-105',
 PIPELINE_COLORS[stage] || 'bg-gray-50 border-gray-200 text-gray-600'
 )}
 >
 Best for {PIPELINE_LABELS[stage] || stage}
 </span>
 </div>
 );
}
