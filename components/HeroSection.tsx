'use client';

import { Search, MapPin, Sparkles, Star, Heart, Compass, ArrowUpRight, Users, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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
  { label: '🧑 Teens 10+', type: 'age', value: '10+' },
];

const AGE_RANGES = [
  { label: 'Babies (0-2)', value: '0-3', emoji: '👶' },
  { label: 'Kids (3-9)', value: '4-9', emoji: '🧒' },
  { label: 'Teens (10+)', value: '10+', emoji: '🧑' },
];

export default function HeroSection({
  searchQuery, onSearchChange, onQuickFilter,
  totalDestinations, totalCities, totalTips,
  cities, selectedCity,
}: HeroSectionProps) {
  const [showAgeSelector, setShowAgeSelector] = useState(false);
  const [selectedAgeLabel, setSelectedAgeLabel] = useState<string | null>(null);

  const handleAgeSelect = (age: { label: string; value: string; emoji: string }) => {
    setSelectedAgeLabel(age.label);
    setShowAgeSelector(false);
    onQuickFilter('age', age.value);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Premium gradient background — warm teal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-emerald-800/20" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.05] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium pill badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white/90 mb-8 shadow-lg animate-fade-in">
            <Compass size={14} />
            Curated by parents who&apos;ve been there
          </div>

          {/* Hero Headline — Large, bold, Playfair Display */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1] drop-shadow-lg">
            Discover Asia&apos;s Best<br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-200 bg-clip-text text-transparent">
              Family Adventures
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Age-filtered, safety-rated destinations with honest tips from real parents.
            No fluff — just the best family travel advice in Asia.
          </p>

          {/* Search bar with age selector */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-2xl shadow-black/20 border border-white/20">
              <div className="flex-1 flex items-center px-5">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search destinations, cities, or activities..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full py-4 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm bg-transparent"
                />
              </div>

              {/* Age range selector dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAgeSelector(!showAgeSelector)}
                  className="flex items-center gap-1.5 px-4 py-4 text-sm text-gray-500 hover:text-gray-700 border-l border-gray-100 transition-colors"
                >
                  <Users size={16} />
                  <span className="hidden sm:inline">{selectedAgeLabel || 'Ages'}</span>
                  <ChevronDown size={14} />
                </button>
                {showAgeSelector && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30">
                    {AGE_RANGES.map((age) => (
                      <button
                        key={age.value}
                        onClick={() => handleAgeSelect(age)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors text-left"
                      >
                        <span className="text-lg">{age.emoji}</span>
                        <span>{age.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="px-6 py-4 bg-teal-700 text-white font-semibold hover:bg-teal-800 transition-colors text-sm rounded-full mr-1.5 shadow-lg shrink-0">
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
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm active:scale-95"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Stats bar — premium design */}
          <div className="inline-flex items-center gap-2 sm:gap-4 text-white/80 text-sm sm:text-base bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg animate-pop-in">
            <span className="flex items-center gap-1.5">
              <Sparkles size={16} className="text-amber-300" />
              <span className="font-bold text-white text-lg">{totalDestinations || '1,200'}+</span>
              <span className="hidden sm:inline">Destinations</span>
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-emerald-300" />
              <span className="font-bold text-white text-lg">{totalCities || '29'}</span>
              <span className="hidden sm:inline">Countries</span>
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">
              <Heart size={16} className="text-rose-300" />
              <span className="font-bold text-white text-lg">{totalTips || '4,500'}+</span>
              <span className="hidden sm:inline">Parent Reviews</span>
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
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95 ${
                      selectedCity === city
                        ? 'bg-white text-teal-700 shadow-lg'
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

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-teal-900 font-semibold hover:bg-gray-50 hover:scale-105 transition-all shadow-xl active:scale-95 text-sm"
            >
              Explore Destinations
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/review"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm text-sm font-medium active:scale-95"
            >
              <Heart size={16} />
              Share Your Family Story
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface via-surface/80 to-transparent pointer-events-none" />
    </section>
  );
}
