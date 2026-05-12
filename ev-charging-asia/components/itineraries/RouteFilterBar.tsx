'use client';

import { useState, useMemo } from 'react';
import { Search, X, Filter, Route as RouteIcon } from 'lucide-react';
import ItineraryCard from '@/components/itineraries/ItineraryCard';
import type { Itinerary } from '@/data/itineraries';

interface RouteFilterBarProps {
  allItineraries: Itinerary[];
}

const ALL = 'all';

export default function RouteFilterBar({ allItineraries }: RouteFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>(ALL);
  const [countryFilter, setCountryFilter] = useState<string>(ALL);

  // Extract unique countries
  const countries = useMemo(() => {
    const unique = new Set<string>();
    allItineraries.forEach(i => i.countries.forEach(c => unique.add(c)));
    return Array.from(unique).sort();
  }, [allItineraries]);

  // Filter itineraries based on search and filters
  const filtered = useMemo(() => {
    return allItineraries.filter(it => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          it.title.toLowerCase().includes(q) ||
          it.subtitle.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          it.cities.some(c => c.toLowerCase().includes(q)) ||
          it.countries.some(c => c.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }
      if (difficultyFilter !== ALL && it.difficulty !== difficultyFilter) return false;
      if (countryFilter !== ALL && !it.countries.includes(countryFilter)) return false;
      return true;
    });
  }, [allItineraries, searchQuery, difficultyFilter, countryFilter]);

  const hasActiveFilters = searchQuery || difficultyFilter !== ALL || countryFilter !== ALL;

  const clearFilters = () => {
    setSearchQuery('');
    setDifficultyFilter(ALL);
    setCountryFilter(ALL);
  };

  const pillClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
      active
        ? 'bg-sky-100 text-sky-700 border-sky-300'
        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
    }`;

  return (
    <div>
      {/* Search + Filters row */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search routes, cities, or countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <X size={12} />
            Clear
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-gray-400 flex items-center gap-1 mr-1">
          <Filter size={12} />
          Filters:
        </span>

        <button
          onClick={() => setDifficultyFilter(difficultyFilter === 'easy' ? ALL : 'easy')}
          className={pillClass(difficultyFilter === 'easy')}
        >
          🟢 Easy
        </button>
        <button
          onClick={() => setDifficultyFilter(difficultyFilter === 'moderate' ? ALL : 'moderate')}
          className={pillClass(difficultyFilter === 'moderate')}
        >
          🟡 Moderate
        </button>
        <button
          onClick={() => setDifficultyFilter(difficultyFilter === 'challenging' ? ALL : 'challenging')}
          className={pillClass(difficultyFilter === 'challenging')}
        >
          🔴 Challenging
        </button>

        <span className="w-px h-5 bg-gray-200 mx-1" />

        {countries.map(country => (
          <button
            key={country}
            onClick={() => setCountryFilter(countryFilter === country ? ALL : country)}
            className={pillClass(countryFilter === country)}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-xs text-gray-400 mb-4">
        {filtered.length} of {allItineraries.length} route{allItineraries.length !== 1 ? 's' : ''} shown
      </div>

      {/* Itinerary grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Search size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No matching routes</h3>
          <p className="text-gray-500 text-sm">Try adjusting your filters to see more routes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(itinerary => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      )}
    </div>
  );
}
