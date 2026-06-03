'use client';

import { Search, MapPin, Sparkles, Star, Heart, Compass, ArrowUpRight, Crown } from 'lucide-react';
import Link from 'next/link';


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
  { label: '🏖️ Nature', type: 'category', value: 'Nature & Outdoor Adventures' },
  { label: '🏛️ Cultural', type: 'category', value: 'Cultural & Historical Sites' },
  { label: '👶 Toddlers 0-3', type: 'age', value: '0-3' },
  { label: '🧒 Kids 4-9', type: 'age', value: '4-9' },
];


export default function HeroSection({
  searchQuery, onSearchChange, onQuickFilter,
  totalDestinations, totalCities, totalTips,
  cities, selectedCity,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-navy dark:from-navy-dark dark:via-navy dark:to-navy-dark">
      {/* Decorative gold accents — Cosme-style luxury glow */}
      <div className="absolute inset-0 opacity-10 dark:opacity-8">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 bg-champagne rounded-full blur-3xl" />
      </div>
      {/* Gold dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Premium badge — Cosme-style editorial seal with gold shimmer */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/30 text-gold text-sm mb-6 shadow-lg gold-shimmer">
            <Crown size={14} className="animate-pulse" />
            <span className="font-medium">Editorially Curated for Discerning Families</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          {/* Headline — serif-heavy, Cosme-style */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 text-cream leading-tight drop-shadow-lg">
            Where Luxury<br />
            <span className="text-gold italic">Meets Family</span>
          </h1>
          <p className="text-base sm:text-lg text-cream/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Asia&apos;s most exclusive family experiences. 5-star resorts, private villas,
            Michelin-star dining, and unforgettable adventures — curated for families
            who expect the extraordinary.
          </p>

          {/* Search bar — refined gold/cream */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="flex items-center bg-cream/10 backdrop-blur-sm rounded-full overflow-hidden shadow-2xl shadow-black/20 border border-gold/25">
              <div className="flex-1 flex items-center px-5">
                <Search size={18} className="text-gold-light flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search luxury destinations..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full py-4 px-3 text-cream placeholder:text-cream/40 focus:outline-none text-sm bg-transparent"
                />
              </div>
              <button className="px-7 py-4 bg-gold text-navy font-semibold hover:bg-gold-light transition-colors text-sm mr-1.5 rounded-full shadow-lg">
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
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-cream/10 text-cream/80 border border-cream/20 hover:bg-cream/20 hover:text-cream transition-all backdrop-blur-sm shadow-sm hover:scale-105 active:scale-95"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Trust bar — refined stats */}
          <div className="inline-flex items-center gap-2 sm:gap-3 text-cream/70 text-sm sm:text-base bg-cream/5 backdrop-blur-sm px-6 py-3 rounded-full border border-gold/15 shadow-lg">
            <span className="flex items-center gap-1">
              <span className="premium-stat text-base font-bold">{totalDestinations}+</span>
              <span className="hidden sm:inline">Properties</span>
            </span>
            <span className="text-gold/30">&middot;</span>
            <span className="flex items-center gap-1">
              <span className="premium-stat text-base font-bold">{totalCities}</span>
              <span className="hidden sm:inline">Destinations</span>
            </span>
            <span className="text-gold/30">&middot;</span>
            <span className="flex items-center gap-1">
              <span className="premium-stat text-base font-bold">{totalTips}+</span>
              <span className="hidden sm:inline">Insider Tips</span>
            </span>
          </div>

          {/* Cities row */}
          {cities.length > 0 && (
            <div className="mt-8 pt-6 border-t border-cream/10 max-w-2xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {cities.slice(0, 8).map((city) => (
                  <button
                    key={city}
                    onClick={() => onQuickFilter('city', city)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95 ${
                      selectedCity === city
                        ? 'bg-gold text-navy shadow-lg font-semibold'
                        : 'bg-cream/10 text-cream/70 hover:bg-cream/20 border border-cream/10'
                    }`}
                  >
                    <MapPin size={12} className="inline-block mr-1" />
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#full-grid"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-navy font-semibold hover:bg-gold-light hover:scale-105 transition-all shadow-lg active:scale-95 text-sm"
            >
              Explore All Destinations
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-cream border border-gold/25 hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm text-sm font-medium shadow-sm active:scale-95"
            >
              <Crown size={16} />
              About Our Curation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-white via-warm-white/80 to-transparent pointer-events-none dark:from-navy dark:via-navy/80 dark:to-transparent" />
    </section>
  );
}
