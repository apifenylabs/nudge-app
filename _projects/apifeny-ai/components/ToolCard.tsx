'use client';

import Link from 'next/link';
import { Star, TrendingUp } from 'lucide-react';
import { Tool } from '@/lib/types';
import { cn, getPricingLabel, getPricingColor, getAsiaScoreColor, getAsiaScoreBgLight, renderStars, formatNumber } from '@/lib/utils';
import { Sparkles, Zap, ExternalLink } from 'lucide-react';
import { getAffiliateForTool } from '@/lib/affiliate-links';

interface ToolCardProps {
 tool: Tool;
 rank?: number;
 showRank?: boolean;
}

const PIPELINE_COLORS_LIGHT: Record<string, string> = {
 'planning': 'bg-violet-100 text-violet-700 border-violet-200',
 'research': 'bg-sky-100 text-sky-700 border-sky-200',
 'ideation': 'bg-pink-100 text-pink-700 border-pink-200',
 'coding': 'bg-blue-100 text-blue-700 border-blue-200',
 'review': 'bg-amber-100 text-amber-700 border-amber-200',
 'testing': 'bg-orange-100 text-orange-700 border-orange-200',
 'deployment': 'bg-emerald-100 text-emerald-700 border-emerald-200',
 'content': 'bg-rose-100 text-rose-700 border-rose-200',
 'marketing': 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
 'automation': 'bg-cyan-100 text-cyan-700 border-cyan-200',
 'multimodal': 'bg-teal-100 text-teal-700 border-teal-200',
 'all-rounder': 'bg-violet-100 text-violet-700 border-violet-200',
};

const PIPELINE_LABELS: Record<string, string> = {
 'planning': 'Planning',
 'research': 'Research',
 'ideation': 'Ideation',
 'coding': 'Coding',
 'review': 'Code Review',
 'testing': 'Testing',
 'deployment': 'Deploy',
 'content': 'Content',
 'marketing': 'Marketing',
 'automation': 'Automation',
 'multimodal': 'Multimodal',
 'all-rounder': 'All-Rounder',
};

export default function ToolCard({ tool, rank, showRank = false }: ToolCardProps) {
 const stars = renderStars(tool.avg_rating);
 const initials = tool.name
 .split(' ')
 .map((w) => w[0])
 .join('')
 .slice(0, 2)
 .toUpperCase();
 const aff = getAffiliateForTool(tool.slug);

 return (
 <Link
 href={`/tools/${tool.slug}`}
 className={cn(
 'group relative block rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300',
 'hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-1',
 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50'
 )}
 >
 {showRank && rank !== undefined && rank <= 3 && (
 <div
 className={cn(
 'absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10',
 rank === 1
 ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white'
 : rank === 2
 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white'
 : 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
 )}
 >
 #{rank}
 </div>
 )}

 <div className="flex items-start gap-3 mb-3">
 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-400 to-cyan-300 flex items-center justify-center shrink-0 shadow-sm">
 <span className="text-white font-bold text-sm">{initials}</span>
 </div>
 <div className="min-w-0 flex-1">
 <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-violet-700 transition-colors">
 {tool.name}
 </h3>
 <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
 {tool.tagline}
 </p>
 </div>
 </div>

 {tool.best_for_pipeline_stage && (
 <div className="mb-2">
 <span
 className={cn(
 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium border transition hover:scale-105',
 PIPELINE_COLORS_LIGHT[tool.best_for_pipeline_stage] || 'bg-gray-100 border-gray-200 text-gray-500'
 )}
 >
 <Zap className="w-2.5 h-2.5" />
 {PIPELINE_LABELS[tool.best_for_pipeline_stage] || tool.best_for_pipeline_stage}
 </span>
 </div>
 )}

 <div className="flex flex-wrap items-center gap-2 mb-3">
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
 {tool.category}
 </span>
 <span
 className={cn(
 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
 getPricingColor(tool.pricing_tier)
 )}
 >
 {getPricingLabel(tool.pricing_tier)}
 </span>
 <span
 className={cn(
 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
 getAsiaScoreBgLight(tool.asia_score)
 )}
 >
 <span className={cn('font-bold', getAsiaScoreColor(tool.asia_score))}>
 {tool.asia_score}
 </span>
 <span className="text-gray-400 ml-1">AS</span>
 </span>
 </div>

 <div className="flex items-center gap-2 mb-3">
 <div className="flex items-center gap-0.5">
 {stars.map((s, i) => (
 <Star
 key={i}
 className={cn(
 'w-3 h-3',
 s === 'full'
 ? 'fill-amber-400 text-amber-400'
 : s === 'half'
 ? 'fill-amber-300/50 text-amber-300'
 : 'fill-none text-gray-300'
 )}
 />
 ))}
 </div>
 <span className="text-xs text-gray-500">
 {tool.avg_rating.toFixed(1)} ({formatNumber(tool.total_ratings)})
 </span>
 </div>

 <div className="flex items-center gap-2 mb-2">
 {tool.trending_score >= 90 && (
 <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-200">
 <Sparkles className="w-2.5 h-2.5" />
 \ud83d\udd25 Trending
 </span>
 )}
 {tool.asia_score >= 8 && (
 <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-200">
 AS {tool.asia_score}
 </span>
 )}
 </div>

 {tool.trending_score > 0 && (
 <div className="flex items-center gap-2">
 <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
 <div
 className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-500"
 style={{ width: `${tool.trending_score}%` }}
 />
 </div>
 <div className="flex items-center gap-1 shrink-0">
 <TrendingUp className="w-3 h-3 text-violet-500" />
 <span className="text-[10px] font-medium text-violet-500">{tool.trending_score}</span>
 </div>
 </div>
 )}

 {/* Affiliate CTA hook — direct link for tools with affiliate deals */}
 {aff && (
 <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
 <span className="text-[10px] text-gray-400 font-medium">
 {aff.is_direct ? 'Affiliate Deal' : 'Free Tier'}
 </span>
 <a
 href={aff.referral_url}
 target="_blank"
 rel={aff.is_direct ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}
 onClick={(e) => e.stopPropagation()}
 className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold
 bg-gradient-to-r from-violet-50 to-cyan-50 text-violet-700
 hover:from-violet-100 hover:to-cyan-100 hover:shadow-sm
 border border-violet-200/50 hover:border-violet-300
 active:scale-95 transition-all duration-150"
 aria-label={`${aff.cta_label} — ${aff.is_direct ? 'affiliate link' : 'free link'}`}
 >
 {aff.cta_label}
 <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60" />
 </a>
 </div>
 )}
 </Link>
 );
}
