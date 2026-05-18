'use client';

import Link from 'next/link';
import { ChevronRight, Trophy } from 'lucide-react';
import { RANKING_CATEGORIES } from '@/lib/ranking-categories';

const featured = RANKING_CATEGORIES.slice(0, 6);

export default function FeaturedRankings() {
  if (featured.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100">
            <Trophy className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Asia-Fit Rankings</h2>
            <p className="text-xs sm:text-sm text-gray-500">Ranked for Asian users and markets</p>
          </div>
        </div>
        <Link
          href="/rankings"
          className="text-sm text-violet-600 hover:text-violet-700 transition flex items-center gap-1"
        >
          All rankings
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {featured.map((ranking) => (
          <Link
            key={ranking.slug}
            href={`/rankings/${ranking.slug}`}
            className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center shrink-0">
              <span className="text-base">{ranking.icon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors truncate">
                {ranking.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">{ranking.subtitle}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-violet-500 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
