'use client';

import { Search, MapPin, Sparkles, Star, Heart, Compass, ArrowUpRight } from 'lucide-react';
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
    <section className="relative overflow-hidden">
      {/* Animated gradient background — spec: #FF6B35 → deep blue #1a365d */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] via-[#1a365d] to-[#1a365d] animate-gradient-shift">
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-transparent to-rose-700/20" />
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Gradient sweep animation */}
        <div
          className="absolute inset-0 opacity-[0.15] animate-pulse"
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.25) 0%, transparent 60%)',
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/[0.06] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill badge — trust signal */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm text-white/90 mb-6 shadow-lg">
            <Compass size={14} />
            Curated by parents who&apos;ve been there
          </div>

          {/* Headline — emotional, family-focused */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white leading-tight drop-shadow-lg">
            Find the Perfect Family Adventure in Asia
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Curated by parents who&apos;ve been there. Age-filtered, safety-rated, real parent stories.
            No fluff — just honest advice from families like yours.
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-2xl shadow-black/20 backdrop-blur-sm border border-white/20">
              <div className="flex-1 flex items-center px-5">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Where do you want to go? (Tokyo, Singapore, Bangkok...)"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full py-4 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm bg-transparent"
                />
              </div>
              <button className="px-7 py-4 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors text-sm mr-1.5 rounded-full shadow-lg shadow-black/10">
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
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/15 text-white border border-white/25 hover:bg-white/25 transition-all backdrop-blur-sm shadow-sm hover:scale-105 active:scale-95"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Trust bar — spec: "506 Destinations · 29+ Cities · 2,482 Parent Tips" */}
          <div className="inline-flex items-center gap-2 sm:gap-3 text-white/80 text-sm sm:text-base font-medium mt-6 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10">
            <span className="flex items-center gap-1">
              <span className="font-bold text-white">506</span> Destinations
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="hidden sm:inline flex items-center gap-1">
              <span className="font-bold text-white">29+</span> Cities
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-1">
              <span className="font-bold text-white">2,482</span> Parent Tips
            </span>
          </div>

          {/* Cities row */}
          {cities.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {cities.slice(0, 8).map((city) => (
                  <button
                    key={city}
                    onClick={() => onQuickFilter('city', city)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95 ${
                      selectedCity === city
                        ? 'bg-white text-orange-700 shadow-lg'
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

          {/* CTA buttons — spec: "Explore Destinations →" (primary) + "Share Your Family Story" (outline) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#destinations-section"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-50 hover:scale-105 transition-all shadow-lg active:scale-95 text-sm"
            >
              Explore Destinations
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/review"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm text-sm font-medium shadow-sm active:scale-95"
            >
              <Heart size={16} />
              Share Your Family Story
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none" />
    </section>
  );
}
