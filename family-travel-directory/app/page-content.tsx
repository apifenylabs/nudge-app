'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Sparkles, Globe, Users, Star,
  ChevronDown, ChevronRight, Clock, Compass,
  Lightbulb, Heart, Filter,
  SlidersHorizontal, ArrowUp
} from 'lucide-react';

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
  tipsAndTricks: string[];
  parentStory?: { title: string; excerpt: string; author: string; fullStory: string; };
}

const categories = [
  { name: "Theme Parks & Attractions", icon: Sparkles, desc: "Thrills and smiles for all ages" },
  { name: "Nature & Outdoor Adventures", icon: Globe, desc: "Fresh air, open spaces, wild encounters" },
  { name: "Cultural & Historical Sites", icon: Globe, desc: "Learn while having fun" },
];

const defaultCities = ["Tokyo", "Bangkok", "Singapore", "Hong Kong", "Phuket", "Bali", "Hanoi", "Seoul", "Osaka", "Kuala Lumpur", "Chiang Mai"];

function getMeta() {
  if (typeof window === 'undefined') return null;
  return (window as any).__DIRECTORY_META__ || null;
}

// ─── PAGE COMPONENT ─────────────────────────────────────────────
export default function Home({ ssrDestinations, ssrCities, ssrTips }: { ssrDestinations?: number; ssrCities?: number; ssrTips?: number }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<string[]>(defaultCities);
  const [totalDestinations, setTotalDestinations] = useState(ssrDestinations || 0);
  const [totalTips, setTotalTips] = useState(ssrTips || 0);
  const [totalCities, setTotalCities] = useState(ssrCities || defaultCities.length);

  useEffect(() => {
    // Update from injected meta (includes full cities list)
    const meta = getMeta();
    if (meta) {
      setTotalDestinations(meta.totalDestinations);
      setTotalTips(meta.totalParentTips);
      setTotalCities(meta.cities?.length || defaultCities.length);
      setCities(meta.cities || defaultCities);
    }

    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/destinations.json');
        if (res.ok) {
          const data = await res.json();
          setDestinations(data);
          setTotalDestinations(data.length);
          const tipCount = data.reduce((a: number, d: any) => a + (d.tipsAndTricks?.length || 0), 0);
          setTotalTips(tipCount);
        }
        setLoading(false);
      } catch (e) {
        console.error('Failed to load data:', e);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = useMemo(() => {
    let f = [...destinations];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      f = f.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.tipsAndTricks?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedCity !== "All") f = f.filter(d => d.city.toLowerCase() === selectedCity.toLowerCase());
    if (selectedCategory !== "All") f = f.filter(d => d.category === selectedCategory);
    if (selectedAge !== "All") {
      f = f.filter(d => {
        const [minStr, maxStr] = d.ageRange.split('-');
        const destMin = parseInt(minStr);
        const destMax = maxStr ? parseInt(maxStr) : destMin;
        if (selectedAge === "0-3") return destMin <= 3;
        if (selectedAge === "4-6") return destMin <= 6;
        if (selectedAge === "7-12") return destMin <= 12;
        if (selectedAge === "13+") return destMax >= 13;
        return true;
      });
    }
    f.sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity;
      if (sortBy === "safety") return b.safetyRating - a.safetyRating;
      if (sortBy === "price") return a.priceRange.length - b.priceRange.length;
      return 0;
    });
    return f;
  }, [destinations, searchQuery, selectedCity, selectedCategory, selectedAge, sortBy]);

  const visibleCities = cities.length >= 6 ? cities.slice(0, 11) : defaultCities;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass size={20} className="text-sky-600" />
            <span className="font-semibold text-gray-900 text-sm tracking-tight">Family Travel Asia</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span id="dest-count">{totalDestinations} destinations</span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="hidden sm:inline">{totalCities} cities</span>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-gray-700 text-sm text-gray-300 mb-6">
              <Compass size={14} />
              Real parent advice. No fluff. {totalDestinations} hand-picked destinations.
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              We took our kids so you don't have to guess
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Honest, unfiltered tips from parents who've actually been there.
              Every destination has real advice — the good, the bad, and the "bring extra snacks."
            </p>
            <div className="relative max-w-xl mx-auto mb-8">
              <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/30">
                <div className="flex-1 flex items-center px-4">
                  <Search size={18} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search destinations, tips, or cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3.5 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm"
                  />
                </div>
                <button className="px-5 py-3.5 bg-sky-500 text-white font-medium hover:bg-sky-600 transition-colors text-sm">
                  Search
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {visibleCities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city === selectedCity ? "All" : city)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCity === city
                      ? "bg-white text-gray-900 shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  <MapPin size={14} className="inline-block mr-1.5" />
                  {city}
                </button>
              ))}
              <button
                onClick={() => { setSelectedCity("All"); setSelectedCategory("All"); setSelectedAge("All"); setSearchQuery(""); }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ─── CATEGORY GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 mb-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name === selectedCategory ? "All" : cat.name)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all group ${
                selectedCategory === cat.name
                  ? "bg-gray-900 text-white border-gray-900 shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                selectedCategory === cat.name ? "bg-white/10" : "bg-gray-100 group-hover:bg-gray-200"
              }`}>
                <cat.icon size={18} className={selectedCategory === cat.name ? "text-white" : "text-gray-600"} />
              </div>
              <span className="text-xs font-semibold">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 id="destinations-section" className="text-xl font-bold text-gray-900">
              {searchQuery ? `"${searchQuery}"` : "Destinations"}
            </h2>
            <span className="text-sm text-gray-500 bg-gray-200 px-2.5 py-1 rounded-full">
              {filtered.length} {filtered.length === 1 ? 'place' : 'places'}
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="bg-white border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="All">All ages</option>
              <option value="0-3">Babies & Toddlers (0-3)</option>
              <option value="4-6">Preschool (4-6)</option>
              <option value="7-12">School Age (7-12)</option>
              <option value="13+">Teens (13+)</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="popularity">Popular</option>
              <option value="safety">Safest</option>
              <option value="price">Cheapest</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── DESTINATION CARDS ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-sky-500 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 text-sm">Finding the best destinations...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Compass size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No destinations match your filters</h3>
            <p className="text-gray-500 text-sm mb-4">Try a different city, age range, or search term</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCity("All"); setSelectedCategory("All"); setSelectedAge("All"); }}
              className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((dest) => (
              <Link
                key={dest.id}
                href={`/destination/${dest.id}`}
                className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white text-xs">
                      <MapPin size={12} />
                      <span>{dest.city}, {dest.country}</span>
                      <span className="ml-auto flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        {dest.safetyRating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 leading-snug">{dest.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-medium">{dest.category}</span>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{dest.ageRange} yrs</span>
                        <span className="text-xs text-gray-400">{dest.priceRange}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{dest.description}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-sky-600 font-medium">
                    <Lightbulb size={12} />
                    <span>{dest.tipsAndTricks?.length || 0} parent tips</span>
                    <span className="text-gray-300">&middot;</span>
                    <Heart size={12} />
                    <span>Read story</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ─── STATS ─── */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalDestinations}+</div>
              <div className="text-sm text-gray-500">Verified Destinations</div>
              <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">4.7</div>
              <div className="text-sm text-gray-500">Avg Safety Rating</div>
              <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalCities}</div>
              <div className="text-sm text-gray-500">Cities Covered</div>
              <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalTips}+</div>
              <div className="text-sm text-gray-500">Parent Tips</div>
              <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-gray-700 text-sm text-gray-300 mb-6">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              Every tip comes from real parents
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to plan a trip your kids will actually remember?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              We've done the research, read the Reddit threads, and talked to hundreds of parents. Now you get the shortcut.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#destinations-section" className="px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg active:scale-[0.98]">
                Browse All Destinations
                <ChevronRight size={18} className="inline-block ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCROLL TO TOP ─── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all active:scale-90"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Compass size={16} className="text-sky-600" />
              <span className="text-sm">Asia Family Travel Directory</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="/about" className="hover:text-gray-900 transition-colors">About</a>
              <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-gray-400">&copy; 2026 Family Travel Asia. Curated by parents, for parents.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
