'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Sparkles, Globe, Users, Star,
  ChevronDown, ChevronRight, Clock, Compass,
  Lightbulb, Heart, Filter, BookOpen,
  SlidersHorizontal, ArrowUp, Calendar, Tag
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import FilterBar from '@/components/FilterBar';
import DestinationCard from '@/components/DestinationCard';

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

// ─── PAGE COMPONENT ─────────────────────────────────────────────
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  content: string;
  relatedDestinations: string[];
}

export default function Home({ meta, blogPosts }: { meta?: { totalDestinations: number; cities: string[]; totalParentTips: number }; blogPosts?: BlogPost[] }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [minSafety, setMinSafety] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<string[]>(defaultCities);
  const [countries, setCountries] = useState<string[]>([]);
  const [totalDestinations, setTotalDestinations] = useState(meta?.totalDestinations || 0);
  const [totalTips, setTotalTips] = useState(meta?.totalParentTips || 0);
  const [totalCities, setTotalCities] = useState(meta?.cities?.length || defaultCities.length);

  useEffect(() => {
    if (meta?.cities) setCities(meta.cities);

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
          const allCountries = [...new Set(data.map((d: any) => d.country))].sort() as string[];
          setCountries(allCountries);
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
        d.country.toLowerCase().includes(q) ||
        d.tipsAndTricks?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedCity !== "All") f = f.filter(d => d.city.toLowerCase() === selectedCity.toLowerCase());
    if (selectedCountry !== "All") f = f.filter(d => d.country === selectedCountry);
    if (selectedCategory !== "All") f = f.filter(d => d.category === selectedCategory);

    // Age filter
    if (selectedAge !== "All") {
      f = f.filter(d => {
        const parts = d.ageRange.split('-');
        const destMin = parseInt(parts[0]);
        const destMax = parts[1] ? parseInt(parts[1]) : destMin;
        if (isNaN(destMin)) return false;
        if (selectedAge === "0-3") return destMin <= 3;
        if (selectedAge === "4-9") return destMin <= 9 && destMax >= 4;
        if (selectedAge === "10+") return destMax >= 10;
        return true;
      });
    }

    // Price filter
    if (selectedPrice !== "All") {
      const priceLen = selectedPrice.replace(/[^$]/g, '').length || 1;
      f = f.filter(d => {
        const destLen = d.priceRange.replace(/[^$]/g, '').length || 1;
        return destLen === priceLen;
      });
    }

    // Safety filter
    if (minSafety !== null && minSafety > 0) {
      f = f.filter(d => d.safetyRating >= minSafety);
    }

    f.sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity;
      if (sortBy === "safety") return b.safetyRating - a.safetyRating;
      if (sortBy === "price") {
        const aLen = a.priceRange.replace(/[^$]/g, '').length || 1;
        const bLen = b.priceRange.replace(/[^$]/g, '').length || 1;
        return aLen - bLen;
      }
      return 0;
    });
    return f;
  }, [destinations, searchQuery, selectedCity, selectedCountry, selectedCategory, selectedAge, selectedPrice, minSafety, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCity("All");
    setSelectedCountry("All");
    setSelectedCategory("All");
    setSelectedAge("All");
    setSelectedPrice("All");
    setMinSafety(null);
  };

  const handleQuickFilter = (type: string, value: string) => {
    if (type === 'city') {
      setSelectedCity(selectedCity === value ? "All" : value);
    } else if (type === 'category') {
      setSelectedCategory(selectedCategory === value ? "All" : value);
    } else if (type === 'age') {
      setSelectedAge(selectedAge === value ? "All" : value);
    }
  };

  const visibleCities = cities.length >= 6 ? cities.slice(0, 11) : defaultCities;
  const loadingSkeleton = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="flex gap-2">
              <div className="h-5 bg-gray-100 rounded-full w-16" />
              <div className="h-5 bg-gray-100 rounded-full w-12" />
            </div>
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

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

      {/* ─── HERO SECTION (new) ─── */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickFilter={handleQuickFilter}
        totalDestinations={totalDestinations}
        totalCities={totalCities}
        totalTips={totalTips}
        cities={visibleCities}
        selectedCity={selectedCity}
      />

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

      {/* ─── FILTER BAR (new) ─── */}
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedAge={selectedAge}
        onAgeChange={setSelectedAge}
        selectedPrice={selectedPrice}
        onPriceChange={setSelectedPrice}
        minSafety={minSafety}
        onSafetyChange={setMinSafety}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        sortBy={sortBy}
        onSortChange={setSortBy}
        countries={countries}
        categories={categories.map(c => c.name)}
        resultsCount={filtered.length}
        onClearAll={clearAllFilters}
      />

      {/* ─── DESTINATION CARDS (refactored) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading && loadingSkeleton}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Compass size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No destinations match your filters</h3>
            <p className="text-gray-500 text-sm mb-4">Try broadening your search, adjusting age range, or selecting a different city</p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((dest) => (
              <DestinationCard
                key={dest.id}
                id={dest.id}
                name={dest.name}
                city={dest.city}
                country={dest.country}
                category={dest.category}
                ageRange={dest.ageRange}
                safetyRating={dest.safetyRating}
                priceRange={dest.priceRange}
                popularity={dest.popularity}
                description={dest.description}
                imageUrl={dest.imageUrl}
                tipsCount={dest.tipsAndTricks?.length || 0}
                parentStory={!!dest.parentStory}
              />
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

      {/* ─── BLOG PREVIEW ─── */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" id="blog-section">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Latest from Our Blog</h2>
              <p className="text-gray-500 text-sm mt-1">Travel tips, comparison guides, and parent advice</p>
            </div>
            <a href="/blog" className="flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
              View all articles
              <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        <Tag size={10} />
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

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
              <a href="/blog" className="hover:text-gray-900 transition-colors">Blog</a>
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
