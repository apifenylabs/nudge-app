'use client';

import Link from 'next/link';
import { Sparkles, ChevronRight, Star } from 'lucide-react';
import { toolsData } from '@/lib/data';
import { cn, getAsiaScoreColorLight, renderStars } from '@/lib/utils';

interface SponsoredPlacement {
  toolSlug: string;
  sponsorNote?: string;
  badge?: string;
}

const sponsoredPlacements: SponsoredPlacement[] = [
  { toolSlug: 'cursor', sponsorNote: 'Sponsored', badge: 'Featured' },
];

export default function SponsoredToolSpot() {
  const placement = sponsoredPlacements[0];
  const tool = toolsData.find((t) => t.slug === placement.toolSlug);
  if (!tool || !tool.is_published) return null;

  const initials = tool.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 transition-all"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-violet-400 to-cyan-300 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-lg">{initials}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
                {tool.name}
              </h3>
              {placement.badge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-200">
                  <Star className="w-2.5 h-2.5" />
                  {placement.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-2">{tool.tagline}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-[10px]">
                {tool.category}
              </span>
              <span className="inline-flex items-center gap-1 text-gray-400">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {tool.avg_rating.toFixed(1)}
              </span>
              <span className={cn('inline-flex items-center gap-1 text-[10px] font-medium', getAsiaScoreColorLight(tool.asia_score))}>
                AS {tool.asia_score}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {placement.sponsorNote && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              {placement.sponsorNote}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-sm text-violet-600 group-hover:text-violet-700 transition-colors">
            Learn more
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
