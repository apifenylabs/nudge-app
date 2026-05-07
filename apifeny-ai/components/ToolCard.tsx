'use client';

import Link from 'next/link';
import { Star, TrendingUp } from 'lucide-react';
import { Tool } from '@/lib/types';
import { cn, getPricingLabel, getPricingColor, getAsiaScoreColor, getAsiaScoreBg, renderStars, formatNumber } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  rank?: number;
  showRank?: boolean;
}

export default function ToolCard({ tool, rank, showRank = false }: ToolCardProps) {
  const stars = renderStars(tool.avg_rating);
  const initials = tool.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        'group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300',
        'hover:border-neon/40 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50'
      )}
    >
      {/* Rank badge (Cosme-style) */}
      {showRank && rank !== undefined && rank <= 3 && (
        <div
          className={cn(
            'absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10',
            rank === 1
              ? 'bg-gradient-to-br from-asia to-amber-400 text-black'
              : rank === 2
              ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black'
              : 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
          )}
        >
          #{rank}
        </div>
      )}

      {/* Logo placeholder */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/30 group-hover:border-neon/30 transition">
          <span className="text-white font-bold text-sm">{initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white truncate group-hover:text-neon-light transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-tech-200 line-clamp-2 mt-0.5 leading-relaxed">
            {tool.tagline}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Category */}
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600/60 text-tech-100 border border-tech-500/30">
          {tool.category}
        </span>
        {/* Pricing */}
        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
            getPricingColor(tool.pricing_tier)
          )}
        >
          {getPricingLabel(tool.pricing_tier)}
        </span>
        {/* Asia Score */}
        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
            getAsiaScoreBg(tool.asia_score)
          )}
        >
          <span className={cn('font-bold', getAsiaScoreColor(tool.asia_score))}>
            {tool.asia_score}
          </span>
          <span className="text-tech-200 ml-1">AS</span>
        </span>
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-0.5">
          {stars.map((s, i) => (
            <Star
              key={i}
              className={cn(
                'w-3 h-3',
                s === 'full'
                  ? 'fill-asia text-asia'
                  : s === 'half'
                  ? 'fill-asia/50 text-asia'
                  : 'fill-none text-tech-400'
              )}
            />
          ))}
        </div>
        <span className="text-xs text-tech-200">
          {tool.avg_rating.toFixed(1)} ({formatNumber(tool.total_ratings)})
        </span>
      </div>

      {/* Asia Score badge — animated gold for high scores */}
      <div className="flex items-center gap-2 mb-2">
        {tool.trending_score >= 90 && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gradient-to-r from-asia/20 to-amber-400/20 text-asia border border-asia/30 animate-pulse-glow">
            <Sparkles className="w-2.5 h-2.5" />
            🔥 Trending
          </span>
        )}
        {tool.asia_score >= 8 && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gradient-to-r from-asia/30 to-amber-400/30 text-asia border border-asia/40 animate-pulse-glow">
            AS {tool.asia_score}
          </span>
        )}
      </div>

      {/* Trending score bar */}
      {tool.trending_score > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-tech-600 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon to-aqua transition-all duration-500"
              style={{ width: `${tool.trending_score}%` }}
            />
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <TrendingUp className="w-3 h-3 text-neon-light" />
            <span className="text-[10px] font-medium text-neon-light">{tool.trending_score}</span>
          </div>
        </div>
      )}
    </Link>
  );
}
