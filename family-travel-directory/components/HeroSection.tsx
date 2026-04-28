'use client';

import { Search, MapPin, Sparkles, Star, Heart, Compass, ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickFilter: (type: string, value: string) => void;
  totalDestinations: number;
  totalCities: number;
  totalTips: number;
  cities: string[];
  selectedCity: string;
}

const quickActions = [
  { label: '🇯🇵 Tokyo', type: 'city', value: 'Tokyo' },
  { label: '🛝 Theme Parks', type: 'category', value: 'Theme Parks & Attractions' },
  { label: '🏖️ Beaches', type: 'category', value: 'Nature & Outdoor Adventures' },
  { label: '🏛️ Cultural', type: 'category', value: 'Cultural & Historical Sites' },
  { label: '👶 Toddlers 0-3', type: 'age', value: '0-3' },
  { label: '🧒 Kids 4-9', type: 'age', value: '4-9' },
];

function useCountUp(end: number, duration = 1500): number {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return count;
}

function AnimatedStat({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const count = useCountUp(value);
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/70 mt-0.5">{label}</div>
    </div>
  );
}

export default function HeroSection({
  searchQuery, onSearchChange, onQuickFilter,
  totalDestinations, totalCities, totalTips,
  cities, selectedCity,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Animated gradient shimmer */}
        <div className="absolute inset-0 animate-pulse" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm text-white/90 mb-6 shadow-lg">
            <Compass size={14} />
            Real parent advice. No fluff. {totalDestinations} hand-picked destinations.
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white leading-tight">
            We took our kids so you don&apos;t have to guess
          </h1>
          <p className="text-base sm:text-lg text-white/75 mb-8 max-w-2xl mx-auto">
            Honest, unfiltered tips from parents who&apos;ve actually been there.
            Every destination has real advice — the good, the bad, and the &quot;bring extra snacks.&quot;
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-2xl shadow-black/20 backdrop-blur-sm">
              <div className="flex-1 flex items-center px-5">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search destinations, tips, or cities..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full py-3.5 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm bg-transparent"
                />
              </div>
              <button className="px-6 py-3.5 bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors text-sm mr-1.5 rounded-full">
                Search
              </button>
            </div>
          </div>

          {/* Quick action pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {quickActions.map((action) => (
              <button
                key={`${action.type}-${action.value}`}
                onClick={() => onQuickFilter(action.type, action.value)}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/15 text-white border border-white/25 hover:bg-white/25 transition-all backdrop-blur-sm shadow-sm"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Animated stats row */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto">
            <AnimatedStat label="Destinations" value={totalDestinations} suffix="+" />
            <AnimatedStat label="Cities" value={totalCities} />
            <AnimatedStat label="Parent Tips" value={totalTips} suffix="+" />
          </div>

          {/* Cities row */}
          {cities.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {cities.slice(0, 8).map((city) => (
                  <button
                    key={city}
                    onClick={() => onQuickFilter('city', city)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedCity === city
                        ? 'bg-white text-sky-700 shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    <MapPin size={12} className="inline-block mr-1" />
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm text-sm font-medium shadow-sm">
              <Heart size={16} />
              Share Your Family Story
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
    </section>
  );
}
