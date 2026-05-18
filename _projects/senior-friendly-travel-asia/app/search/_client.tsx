'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Star, MapPin, Accessibility, Hospital, Car, Filter, X } from 'lucide-react';
import { Destination } from '@/lib/data';

const COUNTRY_FLAGS: Record<string, string> = {
  'Singapore': '🇸🇬', 'Taiwan': '🇹🇼', 'Hong Kong': '🇭🇰', 'Thailand': '🇹🇭',
  'Japan': '🇯🇵', 'South Korea': '🇰🇷', 'Malaysia': '🇲🇾', 'Vietnam': '🇻🇳',
  'Indonesia': '🇮🇩', 'Philippines': '🇵🇭', 'Cambodia': '🇰🇭', 'Myanmar': '🇲🇲',
  'Laos': '🇱🇦', 'Sri Lanka': '🇱🇰', 'India': '🇮🇳', 'Nepal': '🇳🇵',
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8.5 ? 'bg-emerald-100 text-emerald-700' :
    score >= 7.5 ? 'bg-amber-100 text-amber-700' :
    'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      <Star className="w-3 h-3 fill-current" />
      {score.toFixed(1)}
    </span>
  );
}

function StarRating({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Accessibility
          key={n}
          className={`w-4 h-4 ${n <= level ? 'text-teal-600' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default function SearchPageClient({ destinations }: { destinations: Destination[] }) {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [minScore, setMinScore] = useState(0);
  const [minAccessibility, setMinAccessibility] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const countries = useMemo(() => {
    const set = new Set(destinations.map((d) => d.country));
    return ['All', ...Array.from(set).sort()];
  }, [destinations]);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (query) {
        const q = query.toLowerCase();
        const match = d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.seoKeywords.some((k) => k.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (selectedCountry !== 'All' && d.country !== selectedCountry) return false;
      if (d.score < minScore) return false;
      if (d.accessibility < minAccessibility) return false;
      return true;
    }).sort((a, b) => b.score - a.score);
  }, [destinations, query, selectedCountry, minScore, minAccessibility]);

  const hasActiveFilters = selectedCountry !== 'All' || minScore > 0 || minAccessibility > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Senior-Friendly Destinations</h1>
          <p className="text-gray-600">
            Browse {destinations.length} destinations across Asia — each rated for accessibility, comfort, and healthcare access.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by destination, country, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-teal-50 border-teal-200 text-teal-700'
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-teal-500" />}
            </button>
            {hasActiveFilters && (
              <button
                onClick={() => { setSelectedCountry('All'); setMinScore(0); setMinAccessibility(0); }}
                className="flex items-center gap-1 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
              {/* Country Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>{c === 'All' ? 'All Countries' : `${COUNTRY_FLAGS[c] || ''} ${c}`}</option>
                  ))}
                </select>
              </div>

              {/* Minimum Score */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Min. Overall Score: {minScore > 0 ? minScore.toFixed(0) : 'Any'}
                </label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={minScore}
                  onChange={(e) => setMinScore(parseFloat(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>Any</span>
                  <span>10</span>
                </div>
              </div>

              {/* Minimum Accessibility */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Min. Accessibility: {minAccessibility > 0 ? minAccessibility.toFixed(0) + '/5' : 'Any'}
                </label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={1}
                  value={minAccessibility}
                  onChange={(e) => setMinAccessibility(parseInt(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>Any</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          {filtered.length === 0
            ? 'No destinations match your filters.'
            : `Showing ${filtered.length} destination${filtered.length !== 1 ? 's' : ''}`
          }
        </div>

        {/* Results Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="block bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {COUNTRY_FLAGS[dest.country] || ''} {dest.country}
                      </p>
                    </div>
                    <ScoreBadge score={dest.score} />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {dest.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {dest.seoKeywords.slice(0, 3).map((kw) => (
                      <span key={kw} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Row */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Accessibility className="w-3.5 h-3.5 text-teal-600" />
                      <span>{dest.accessibility}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Hospital className="w-3.5 h-3.5 text-teal-600" />
                      <span className="truncate max-w-[80px]">{dest.healthcare}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-teal-600" />
                      <span className="truncate max-w-[80px]">{dest.transport}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 text-sm mb-4">
              Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => { setQuery(''); setSelectedCountry('All'); setMinScore(0); setMinAccessibility(0); }}
              className="text-teal-600 hover:text-teal-700 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
