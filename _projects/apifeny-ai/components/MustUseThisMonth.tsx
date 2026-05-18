'use client';

import { Trophy, Star } from 'lucide-react';
import { toolsData } from '@/lib/data';
import { cn } from '@/lib/utils';
import ToolCard from './ToolCard';
import { computeAllScores, getMomentumScore } from '@/lib/ranking-algorithm';

export default function MustUseThisMonth() {
  const ranked = computeAllScores(toolsData);
  const mustUse = ranked
    .filter((item) => {
      const t = item.tool;
      return t.is_published && t.asia_score >= 7 && getMomentumScore(t) >= 3;
    })
    .slice(0, 6);

  if (mustUse.length === 0) return null;

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100">
            <Trophy className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              Must-Use This Month
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                Editor&apos;s Pick
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Editor-ranked: community rating \u00d7 Asia fit \u00d7 momentum
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mustUse.map((item) => (
          <div key={item.tool.id} className="relative group">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-amber-400/30 via-amber-300/20 to-amber-400/30 opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <ToolCard tool={item.tool} />
            </div>
            <div className="absolute -top-1.5 -right-1.5 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg shadow-amber-200/50">
                <Star className="w-2.5 h-2.5" />
                Score {item.score.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
