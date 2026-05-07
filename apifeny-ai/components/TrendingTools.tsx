'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from './ToolCard';
import { getTopRanked, computeAllScores } from '@/lib/ranking-algorithm';

export default function TrendingTools() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Use the ranking algorithm instead of raw trending_score
  const ranked = computeAllScores(toolsData);
  const trending = ranked.slice(0, 8);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neon/15">
            <Flame className="w-5 h-5 text-neon-light" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Trending Now</h2>
            <p className="text-xs sm:text-sm text-tech-200">
              Ranked by community score + momentum + Asia fit
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="p-2 rounded-lg border border-tech-500/30 bg-tech-700 text-tech-200 hover:text-white hover:border-neon/30 transition disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="p-2 rounded-lg border border-tech-500/30 bg-tech-700 text-tech-200 hover:text-white hover:border-neon/30 transition disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rank badges row — top 3 shown with scores */}
      {trending.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
          {trending.slice(0, 3).map((item, i) => (
            <span
              key={item.tool.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-tech-800 border border-tech-500/30 text-tech-100"
            >
              <span className={i === 0 ? 'text-asia' : i === 1 ? 'text-sky-400' : 'text-amber-400'}>
                {i === 0 ? '🔥' : '📈'}
              </span>
              <span className="font-semibold">#{item.rank}</span>
              <span className="text-tech-200">{item.tool.name}</span>
              <span className="text-tech-300 text-[10px]">
                {item.score.toFixed(1)}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
      >
        {trending.map((item) => (
          <div key={item.tool.id} className="min-w-[280px] sm:min-w-[300px] snap-start">
            <ToolCard tool={item.tool} rank={item.rank} showRank />
          </div>
        ))}
      </div>

      {/* Gradient fade edges */}
      {canScrollLeft && (
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-tech-900 to-transparent pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-tech-900 to-transparent pointer-events-none" />
      )}
    </section>
  );
}
