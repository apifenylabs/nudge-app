'use client';

import Link from 'next/link';
import { Sparkles, ChevronRight, Star } from 'lucide-react';
import { toolsData } from '@/lib/data';
import { cn, getAsiaScoreColor, renderStars } from '@/lib/utils';

interface SponsoredPlacement {
  toolSlug: string;
  sponsorNote?: string;
}

// Currently curated sponsored placements (can be dynamic via backend later)
const sponsoredSlugs: SponsoredPlacement[] = [
  { toolSlug: 'chatgpt', sponsorNote: 'Featured partner' },
  { toolSlug: 'perplexity', sponsorNote: 'Premium listing' },
  { toolSlug: 'cursor', sponsorNote: 'Editor pick' },
];

export default function SponsoredToolSpot() {
  const tools = sponsoredSlugs
    .map((s) => {
      const tool = toolsData.find((t) => t.slug === s.toolSlug && t.is_published);
      return tool ? { tool, note: s.sponsorNote } : null;
    })
    .filter(Boolean) as { tool: (typeof toolsData)[0]; note: string }[];

  if (tools.length === 0) return null;

  return (
    <div className="rounded-xl border border-neon/20 bg-gradient-to-br from-tech-700/80 to-tech-800/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-3 border-b border-tech-500/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-asia" />
          <h3 className="text-sm font-semibold text-white">Sponsored Tools</h3>
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
            Ad
          </span>
        </div>
        <span className="text-[10px] text-tech-300">Premium placements available</span>
      </div>

      {/* Carousel-like row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-tech-500/20">
        {tools.map(({ tool, note }) => {
          const initials = tool.name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
          const stars = renderStars(tool.avg_rating);

          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group p-4 sm:p-5 hover:bg-tech-700/60 transition-colors"
            >
              <div className="flex items-start gap-3 mb-2">
                {/* Logo */}
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon/50 to-tech-500 flex items-center justify-center shrink-0 border border-tech-400/30">
                  <span className="text-white font-bold text-xs">{initials}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors truncate">
                      {tool.name}
                    </h4>
                    <span className="text-[9px] text-tech-300 shrink-0">{note}</span>
                  </div>
                  <p className="text-[11px] text-tech-200 line-clamp-1 mt-0.5">{tool.tagline}</p>
                </div>
              </div>

              {/* Rating + Asia Score */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {stars.slice(0, 3).map((s, i) => (
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
                  <span className="text-[10px] text-tech-300 ml-0.5">{tool.avg_rating.toFixed(1)}</span>
                </div>
                <span className={cn('text-xs font-bold', getAsiaScoreColor(tool.asia_score))}>
                  AS {tool.asia_score}
                </span>
              </div>

              {/* View link */}
              <div className="mt-2 flex items-center gap-1 text-[10px] text-neon-light opacity-0 group-hover:opacity-100 transition">
                View tool
                <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
