'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';
import PremiumCard from './PremiumCard';

interface TrendingDestination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  description: string;
  imageUrl: string;
  priceRange: string;
  safetyRating: number;
  popularity: number;
}

interface TrendingNowProps {
  destinations: TrendingDestination[];
}

export default function TrendingNow({ destinations }: TrendingNowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amt = 320 * 3;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' });
  };

  if (!destinations.length) return null;

  // Cosme-style ranked badges
  const rankBadge = (index: number): { text: string; gradient: string } => {
    if (index === 0) return { text: '🔥 #1 Trending', gradient: 'from-amber-500 to-rose-500' };
    if (index === 1) return { text: '⭐ #2 Must-Visit', gradient: 'from-sky-500 to-indigo-500' };
    if (index === 2) return { text: '💎 #3 Rising Star', gradient: 'from-emerald-500 to-teal-500' };
    return { text: `#${index + 1}`, gradient: 'from-gold/60 to-gold-dark/60' };
  };

  return (
    <section className="relative mb-16">
      {/* Section header — Cosme-style editorial badge */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/20">
              <TrendingUp size={16} className="text-amber-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-navy">Trending Now</h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[10px] font-semibold uppercase tracking-wider">
              This Season
            </span>
          </div>
          <p className="text-sm text-navy-light/50 font-light">
            Our editors curate the season&apos;s most sought-after luxury destinations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-cream border border-gold/20 flex items-center justify-center hover:bg-gold/10 hover:border-gold/40 transition-all hover:shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} className="text-navy" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-cream border border-gold/20 flex items-center justify-center hover:bg-gold/10 hover:border-gold/40 transition-all hover:shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} className="text-navy" />
          </button>
        </div>
      </div>

      {/* Editorial intro line */}
      <div className="flex items-center gap-2 mb-4 text-xs text-navy-light/50 border-l-2 border-gold/30 pl-3 italic">
        <Sparkles size={12} className="text-gold shrink-0" />
        <span>Our hand-picked selection of the most-booked luxury experiences right now</span>
      </div>

      {/* Scrollable row with ranked badges */}
      <div className="relative group/trending">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((dest, i) => {
            const badge = rankBadge(i);
            return (
              <div key={dest.id} className="w-[280px] shrink-0 snap-start premium-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <PremiumCard
                  id={dest.id}
                  name={dest.name}
                  city={dest.city}
                  country={dest.country}
                  category={dest.category}
                  description={dest.description}
                  imageUrl={dest.imageUrl}
                  priceRange={dest.priceRange}
                  safetyRating={dest.safetyRating}
                  popularity={dest.popularity}
                  rank={i + 1}
                  badgeText={badge.text}
                  badgeGradient={badge.gradient}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
