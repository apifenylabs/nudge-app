'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search, MapPin, Star, Sparkles, Globe, MapIcon, LayoutGrid,
  SlidersHorizontal, X, ChevronDown, Compass, Heart, Filter
} from 'lucide-react';
import DestinationCard from '@/components/DestinationCard';
import SimpleMapContainer from '@/components/SimpleMapContainer';

// ─── Types ──────────────────────────────────────────────────────
interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  ageRange: string;
  safetyRating: number;
  priceRange: string;
  popularity: number;
  description: string;
  imageUrl: string;
  location?: string;
}

interface Meta {
  totalDestinations: number;
  cities: string[];
  totalParentTips: number;
}

const CATEGORIES = ['All', 'Theme Parks & Attractions', 'Nature & Outdoor Adventures', 'Cultural & Historical Sites'];
const AGE_RANGES = ['All', '0-3', '4-9', '10+'];
const PRICE_RANGES = ['All', '$', '$$', '$$$'];
const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'safety', label: 'Highest Safety' },
  { value: 'price', label: 'Lowest Price' },
  { value: 'name', label: 'Name A-Z' },
];

interface SearchPageContentProps {
  meta: Meta;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function SearchPageContent({ meta }: SearchPageContentProps) {
  const router = useRouter();

  // ── Search state ──
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [ageRange, setAgeRange] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [minSafety, setMinSafety] = useState(0);
  const [country, setCountry] = useState('All');
  const [sort, setSort] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // ── Data ──
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load data
  useEffect(() => {
    fetch('/data/destinations.json')
      .then(r => r.json())
      .then((data: Destination[]) => {
        setAllDestinations(data);
        const cs = [...new Set(data.map(d => d.country).filter(Boolean))].sort();
        setCountries(cs);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Debounced search for suggestions
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const q = debouncedQuery.toLowerCase();
    const matches = allDestinations
      .filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q)
      )
      .slice(0, 5);
    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  }, [debouncedQuery, allDestinations]);

  // ── Filtered results ──
  const filtered = useMemo(() => {
    let results = [...allDestinations];

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'All') {
      results = results.filter(d => d.category === category);
    }

    // Age range
    if (ageRange !== 'All') {
      results = results.filter(d => {
        const parts = d.ageRange.split('-');
        const destMin = parseInt(parts[0]);
        const destMax = parts[1] ? parseInt(parts[1]) : destMin;
        if (isNaN(destMin)) return false;
        if (ageRange === '0-3') return destMin <= 3;
        if (ageRange === '4-9') return destMin <= 9 && destMax >= 4;
        if (ageRange === '10+') return destMax >= 10;
        return true;
      });
    }

    // Price range
    if (priceRange !== 'All') {
      const priceLen = priceRange.replace(/[^$]/g, '').length || 1;
      results = results.filter(d => {
        const destLen = d.priceRange.replace(/[^$]/g, '').length || 1;
        return destLen === priceLen;
      });
    }

    // Min safety
    if (minSafety > 0) {
      results = results.filter(d => d.safetyRating >= minSafety);
    }

    // Country
    if (country !== 'All') {
      results = results.filter(d => d.country === country);
    }

    // Sort
    results.sort((a, b) => {
      if (sort === 'popularity') return b.popularity - a.popularity;
      if (sort === 'safety') return b.safetyRating - a.safetyRating;
      if (sort === 'price') {
        const aLen = a.priceRange.replace(/[^$]/g, '').length || 1;
        const bLen = b.priceRange.replace(/[^$]/g, '').length || 1;
        return aLen - bLen;
      }
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return results;
  }, [allDestinations, query, category, ageRange, priceRange, minSafety, country, sort]);

  // Map data
  const mapDestinations = useMemo(() => {
    return filtered.map(d => ({
      id: d.id,
      name: d.name,
      city: d.city,
      country: d.country,
      category: d.category,
      safetyRating: d.safetyRating,
      imageUrl: d.imageUrl,
      latitude: undefined as number | undefined,
      longitude: undefined as number | undefined,
    }));
  }, [filtered]);

  const activeFilterCount = [
    category !== 'All',
    ageRange !== 'All',
    priceRange !== 'All',
    minSafety > 0,
    country !== 'All',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setCategory('All');
    setAgeRange('All');
    setPriceRange('All');
    setMinSafety(0);
    setCountry('All');
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Compass size={18} className="text-sky-600" />
              <span className="font-semibold text-gray-900 text-sm">Family Travel</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 hidden sm:block">
                {meta.totalDestinations} destinations
              </span>
              <Link href="/account/saved" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart size={16} className="text-gray-500" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ── Search bar ── */}
        <div ref={searchRef} className="relative mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              placeholder="Search destinations, cities, countries..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setSuggestions([]); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-30">
              {suggestions.map(d => (
                <Link
                  key={d.id}
                  href={`/destination/${d.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  onClick={() => setShowSuggestions(false)}
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {d.imageUrl ? (
                      <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover" />
                    ) : (
                      <MapPin size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{d.name}</p>
                    <p className="text-xs text-gray-500 truncate">{d.city}, {d.country}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-gray-600">{d.safetyRating.toFixed(1)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Active filters bar ── */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                showFilters
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Active filter chips */}
            {category !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-medium border border-sky-100">
                {category}
                <button onClick={() => setCategory('All')}><X size={12} /></button>
              </span>
            )}
            {ageRange !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                Ages {ageRange}
                <button onClick={() => setAgeRange('All')}><X size={12} /></button>
              </span>
            )}
            {priceRange !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
                {priceRange}
                <button onClick={() => setPriceRange('All')}><X size={12} /></button>
              </span>
            )}
            {country !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
                {country}
                <button onClick={() => setCountry('All')}><X size={12} /></button>
              </span>
            )}
            {minSafety > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100">
                Safety ≥{minSafety}
                <button onClick={() => setMinSafety(0)}><X size={12} /></button>
              </span>
            )}
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-700 underline ml-1">
                Clear all
              </button>
            )}
          </div>

          {/* View mode + sort */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-sky-50 text-sky-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Grid view"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 transition-colors ${viewMode === 'map' ? 'bg-sky-50 text-sky-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Map view"
              >
                <MapIcon size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Filter drawer (mobile-friendly) ── */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Age Range</label>
                <select
                  value={ageRange}
                  onChange={e => setAgeRange(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  {AGE_RANGES.map(a => <option key={a} value={a}>{a === 'All' ? 'All Ages' : `${a} years`}</option>)}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Price Range</label>
                <select
                  value={priceRange}
                  onChange={e => setPriceRange(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  {PRICE_RANGES.map(p => <option key={p} value={p}>{p === 'All' ? 'Any Price' : p}</option>)}
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Country</label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="All">All Countries</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Min Safety */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Min Safety: {minSafety}★
                </label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={minSafety}
                  onChange={e => setMinSafety(parseFloat(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>Any</span>
                  <span>5★</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Results info ── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-gray-200 border-t-sky-500 rounded-full animate-spin" />
                Loading...
              </span>
            ) : (
              <>
                <strong className="text-gray-900">{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''} found
                {query && <span className="text-gray-400"> for &ldquo;{query}&rdquo;</span>}
              </>
            )}
          </p>
        </div>

        {/* ── Results / Map ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No destinations found</h2>
            <p className="text-sm text-gray-500 mb-6">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <X size={14} />
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'map' ? (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden" style={{ height: '70vh', minHeight: '400px' }}>
            <SimpleMapContainer
              destinations={mapDestinations}
              height="100%"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(d => (
              <DestinationCard
                key={d.id}
                id={d.id}
                name={d.name}
                city={d.city}
                country={d.country}
                category={d.category}
                ageRange={d.ageRange}
                safetyRating={d.safetyRating}
                priceRange={d.priceRange}
                popularity={d.popularity}
                description={d.description}
                imageUrl={d.imageUrl}
                tipsCount={0 as any}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
