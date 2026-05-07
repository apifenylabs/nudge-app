'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Sparkles, Globe, Users, Star,
  ChevronDown, ChevronRight, Clock, Compass,
  Lightbulb, Heart, Filter, BookOpen,
  SlidersHorizontal, ArrowUp, Calendar, Tag, ChevronLeft, Crown
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import FilterBar from '@/components/FilterBar';
import DestinationCard from '@/components/DestinationCard';
import TrendingNow from '@/components/TrendingNow';
import MustBookThisMonth from '@/components/MustBookThisMonth';
import FlywheelCTA from '@/components/FlywheelCTA';
import FeaturedReviews from '@/components/FeaturedReviews';
import { computeSimpleScore } from '@/lib/scoring';

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
  amenities?: string[];
  parentStory?: { title: string; excerpt: string; author: string; fullStory: string; };
}

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

const categories = [
  { name: "Luxury Resort", icon: Crown, desc: "5-star resorts with world-class amenities" },
  { name: "Private Villa", icon: Compass, desc: "Exclusive villas with butler service" },
  { name: "Exclusive Experience", icon: Sparkles, desc: "Unique once-in-a-lifetime moments" },
  { name: "Michelin Dining", icon: Star, desc: "Fine dining experiences for the whole family" },
  { name: "Spa & Wellness", icon: Heart, desc: "Luxurious family wellness retreats" },
  { name: "Adventure", icon: Globe, desc: "Premium adventures for bold families" },
];

const defaultCities = ["Bali", "Phuket", "Maldives", "Singapore", "Tokyo", "Hong Kong", "Kyoto", "Langkawi", "Hanoi", "Siem Reap", "Bangkok"];

const BASE_URL = 'https://luxuryfamilytravelasia.com';

// ─── Popular luxury countries ───
const POPULAR_COUNTRIES: { name: string; flag: string }[] = [
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Hong Kong", flag: "🇭🇰" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Cambodia", flag: "🇰🇭" },
];

// ─── Curated Collections (Cosme-style) ───
const CURATED_COLLECTIONS = [
  {
    title: "Private Island Escapes",
    subtitle: "Your own piece of paradise",
    description: "Ultra-exclusive private island resorts with dedicated butler service, private pools, and pristine beaches. For families who value absolute privacy.",
    tag: "The Ultimate Escape",
    gradient: "from-emerald-900/70 via-teal-800/50 to-transparent",
  },
  {
    title: "Michelin-Star Dining with Kids",
    subtitle: "World-class cuisine, family welcome",
    description: "Asia's finest Michelin-starred restaurants that genuinely welcome children. From private chef's tables to kids' tasting menus.",
    tag: "Culinary Excellence",
    gradient: "from-amber-900/70 via-rose-800/50 to-transparent",
  },
  {
    title: "Zen Family Wellness",
    subtitle: "Reconnect, restore, rejuvenate",
    description: "Luxury wellness retreats with family-friendly spa treatments, yoga for all ages, and holistic programs designed for multi-generational renewal.",
    tag: "Mindful Luxury",
    gradient: "from-sky-900/70 via-indigo-800/50 to-transparent",
  },
];

// ─── Scrollable carousel row component ───
function CarouselRow({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amt = 280 * 4;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' });
  };

  return (
    <div className="group/carousel relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-cream/90 shadow-md border border-gold/30 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-cream hover:shadow-lg"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} className="text-navy" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-cream/90 shadow-md border border-gold/30 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-cream hover:shadow-lg"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} className="text-navy" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

function CarouselCard({ children }: { children: React.ReactNode }) {
  return <div className="w-[260px] shrink-0 snap-start">{children}</div>;
}

// ─── Section heading component ───
function SectionHeading({ title, subtitle, linkHref, linkText }: { title: string | React.ReactNode; subtitle?: string; linkHref?: string; linkText?: string }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-navy">{title}</h2>
        {subtitle && <p className="text-navy-light/70 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {linkHref && linkText && (
        <Link href={linkHref} className="flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark transition-colors whitespace-nowrap">
          {linkText}
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
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
  const [sortBy, setSortBy] = useState("score");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<string[]>(defaultCities);
  const [countries, setCountries] = useState<string[]>([]);
  const [totalDestinations, setTotalDestinations] = useState(meta?.totalDestinations || 0);
  const [totalTips, setTotalTips] = useState(meta?.totalParentTips || 0);
  const [totalCities, setTotalCities] = useState(meta?.cities?.length || defaultCities.length);

  // ─── Fade-in on scroll ───
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const observeSection = useCallback((id: string, el: HTMLDivElement | null) => {
    if (!el) return;
    sectionRefs.current.set(id, el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(id));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  }, []);

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

  // ─── Compute scores ───
  const scoredDestinations = useMemo(() => {
    return destinations.map(d => ({
      ...d,
      _score: computeSimpleScore(d.safetyRating, d.popularity, d.tipsAndTricks?.length || 0, !!d.parentStory),
    }));
  }, [destinations]);

  // ─── Top picks ───
  const topPicks = useMemo(() => {
    return [...scoredDestinations].sort((a, b) => b._score - a._score).slice(0, 12);
  }, [scoredDestinations]);

  // ─── Tips row ───
  const topTipsDestinations = useMemo(() => {
    return [...scoredDestinations]
      .filter(d => (d.tipsAndTricks?.length || 0) > 0)
      .sort((a, b) => (b.tipsAndTricks?.length || 0) - (a.tipsAndTricks?.length || 0))
      .slice(0, 12);
  }, [scoredDestinations]);

  // ─── Country rows ───
  const countryRows = useMemo(() => {
    return POPULAR_COUNTRIES.map(c => {
      const dests = scoredDestinations.filter(d => d.country === c.name).slice(0, 12);
      return { ...c, destinations: dests };
    }).filter(c => c.destinations.length > 0);
  }, [scoredDestinations]);

  // ─── Filtered destinations ───
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

    if (selectedPrice !== "All") {
      const priceLen = selectedPrice.replace(/[^$]/g, '').length || 1;
      f = f.filter(d => {
        const destLen = d.priceRange.replace(/[^$]/g, '').length || 1;
        return destLen === priceLen;
      });
    }

    if (minSafety !== null && minSafety > 0) {
      f = f.filter(d => d.safetyRating >= minSafety);
    }

    f.sort((a, b) => {
      if (sortBy === "score") {
        const aScore = computeSimpleScore(a.safetyRating, a.popularity, a.tipsAndTricks?.length || 0, !!a.parentStory);
        const bScore = computeSimpleScore(b.safetyRating, b.popularity, b.tipsAndTricks?.length || 0, !!b.parentStory);
        return bScore - aScore;
      }
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

  const scrollToGrid = () => {
    const el = document.getElementById('full-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const visibleCities = cities.length >= 6 ? cities.slice(0, 11) : defaultCities;
  const loadingSkeleton = (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gold/10 overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-cream" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-cream rounded w-3/4" />
            <div className="h-2 bg-cream-dark rounded w-1/2" />
            <div className="h-2 bg-cream-dark rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-gold" />
            <span className="font-semibold text-cream text-sm tracking-tight">Luxury Family Travel Asia</span>
              <div className="flex items-center gap-1.5 text-gold-dark text-[10px] uppercase tracking-widest font-semibold">
                <span className="w-1 h-1 rounded-full bg-gold" />
                Editorially Curated
              </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gold-light">
            <span id="dest-count">{totalDestinations} Properties</span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="hidden sm:inline">{totalCities} Destinations</span>
          </div>
        </div>
      </header>

      {/* ─── LUXURY HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-navy">
        {/* Decorative gold accents */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm mb-6">
              <Crown size={14} />
              Curated for Discerning Families
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-cream mb-4 leading-tight">
              Where Luxury<br />
              <span className="text-gold">Meets Family</span>
            </h1>
            <p className="text-lg sm:text-xl text-cream/80 mb-10 max-w-2xl mx-auto">
              Asia&apos;s most exclusive family experiences. 5-star resorts, private villas, Michelin dining, and 
              unforgettable adventures — curated for families who expect the extraordinary.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
              <input
                type="text"
                placeholder="Search luxury destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-cream/10 border border-gold/30 rounded-xl text-cream placeholder-cream/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">30</div>
                <div className="text-xs text-cream/60 uppercase tracking-wider">Properties</div>
              </div>
              <div className="text-center border-x border-gold/20">
                <div className="text-2xl font-bold text-gold">10</div>
                <div className="text-xs text-cream/60 uppercase tracking-wider">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">5-Star</div>
                <div className="text-xs text-cream/60 uppercase tracking-wider">Curation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY BROWSING ─── */}
      <div
        ref={(el) => observeSection('categories', el)}
        className={`transition-all duration-700 ${visibleSections.has('categories') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat) => {
              const count = destinations.filter(d => d.category === cat.name).length;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name === selectedCategory ? "All" : cat.name);
                    scrollToGrid();
                  }}
                  className={`group relative flex flex-col items-center justify-center p-5 rounded-xl border transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? "bg-navy text-cream border-gold shadow-xl"
                      : "bg-white/80 backdrop-blur-sm text-navy border-gold/10 hover:border-gold/40 hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  <div className={`p-2.5 rounded-lg mb-2 transition-colors ${
                    selectedCategory === cat.name ? "bg-gold/20" : "bg-cream group-hover:bg-gold/10"
                  }`}>
                    <cat.icon size={20} className={selectedCategory === cat.name ? "text-gold" : "text-gold-dark"} />
                  </div>
                  <span className="text-xs font-semibold mb-0.5">{cat.name}</span>
                  <span className={`text-[10px] ${selectedCategory === cat.name ? "text-cream/60" : "text-navy-light/60"}`}>{count} properties</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* ─── TRENDING NOW ─── */}
      <div
        ref={(el) => observeSection('trending-now', el)}
        className={`transition-all duration-700 ${visibleSections.has('trending-now') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <TrendingNow destinations={topPicks.slice(0, 10)} />
        </section>
      </div>

      {/* ─── MUST-BOOK THIS MONTH ─── */}
      <div
        ref={(el) => observeSection('must-book', el)}
        className={`transition-all duration-700 ${visibleSections.has('must-book') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <MustBookThisMonth
            destinations={topPicks.slice(0, 6).map((d, i) => ({
              ...d,
              reason: i === 0
                ? `${d.name} offers an unparalleled luxury experience with world-class amenities and breathtaking views. Perfect for families seeking the extraordinary.`
                : undefined,
            }))}
          />
        </section>
      </div>

      {/* ─── TOP PICKS ─── */}
      <div
        ref={(el) => observeSection('top-picks', el)}
        className={`transition-all duration-700 ${visibleSections.has('top-picks') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <SectionHeading
            title={<span className="flex items-center gap-2"><Crown size={22} className="text-gold" /> Top Picks for Families</span>}
            subtitle="Highest-rated luxury experiences loved by discerning parents"
            linkHref="/search"
            linkText="See all →"
          />
          <CarouselRow>
            {topPicks.map((dest) => (
              <CarouselCard key={dest.id}>
                <div className="transition-transform duration-200 hover:-translate-y-1">
                  <DestinationCard
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
                    amenities={dest.amenities || []}
                  />
                </div>
              </CarouselCard>
            ))}
          </CarouselRow>
        </section>
      </div>

      {/* ─── CURATED COLLECTIONS (Cosme-style Editorial) ─── */}
      <div
        ref={(el) => observeSection('curated-collections', el)}
        className={`transition-all duration-700 mb-16 ${
          visibleSections.has('curated-collections') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={<span className="flex items-center gap-2"><Sparkles size={20} className="text-gold" /> Curated Collections</span>}
            subtitle="Editorially selected for the most discerning families"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CURATED_COLLECTIONS.map((collection, i) => (
              <a
                key={collection.title}
                href="/search"
                className={`group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 zen-reveal`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Background - aspirational gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} transition-transform duration-700 group-hover:scale-105`} />
                
                {/* Decorative gold dot pattern */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, #C9A96E 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Tag */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-medium uppercase tracking-wider mb-3 w-fit">
                    <Sparkles size={10} />
                    {collection.tag}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight">{collection.title}</h3>
                  <p className="text-white/70 text-sm mb-2">{collection.subtitle}</p>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{collection.description}</p>
                  
                  {/* Hover CTA */}
                  <div className="mt-3 flex items-center gap-1 text-gold text-xs font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore collection
                    <ChevronRight size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* ─── COUNTRY ROWS ─── */}
      {countryRows.slice(0, 6).map((row) => (
        <div
          key={row.name}
          ref={(el) => observeSection(`country-${row.name}`, el)}
          className={`transition-all duration-700 ${visibleSections.has(`country-${row.name}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
            <SectionHeading
              title={<span>{row.flag} {row.name}</span>}
              subtitle={`Luxury family experiences in ${row.name}`}
              linkHref={`/search?country=${encodeURIComponent(row.name)}`}
              linkText={`See all ${row.destinations.length} destinations →`}
            />
            <CarouselRow>
              {row.destinations.map((dest) => (
                <CarouselCard key={dest.id}>
                  <div className="transition-transform duration-200 hover:-translate-y-1">
                    <DestinationCard
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
                      amenities={dest.amenities || []}
                    />
                  </div>
                </CarouselCard>
              ))}
            </CarouselRow>
          </section>
        </div>
      ))}

      {/* ─── PARENT TIPS ─── */}
      {topTipsDestinations.length > 0 && (
        <div
          ref={(el) => observeSection('parent-tips', el)}
          className={`transition-all duration-700 ${visibleSections.has('parent-tips') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
            <SectionHeading
              title="Insider Tips from Luxury Families"
              subtitle="Destinations with the most helpful tips from discerning parents"
              linkHref="/search"
              linkText="See all →"
            />
            <CarouselRow>
              {topTipsDestinations.map((dest) => (
                <CarouselCard key={dest.id}>
                  <div className="relative transition-transform duration-200 hover:-translate-y-1">
                    <DestinationCard
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
                      amenities={dest.amenities || []}
                    />
                    {dest.tipsAndTricks && dest.tipsAndTricks.length > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none">
                        <div className="flex items-center gap-1 text-white text-[10px] mb-0.5">
                          <Lightbulb size={10} className="text-gold" />
                          <span className="font-semibold">Insider Tip</span>
                        </div>
                        <p className="text-white/90 text-[10px] leading-tight line-clamp-2">
                          {dest.tipsAndTricks[0]}
                        </p>
                      </div>
                    )}
                  </div>
                </CarouselCard>
              ))}
            </CarouselRow>
          </section>
        </div>
      )}

      {/* ─── FILTERS + CAROUSEL ─── */}
      <div id="full-grid">
        <div
          ref={(el) => observeSection('full-grid', el)}
          className={`transition-all duration-700 ${visibleSections.has('full-grid') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <SectionHeading
              title="All Luxury Destinations"
              subtitle={`${filtered.length} ${filtered.length === 1 ? 'property' : 'properties'} across Asia`}
              linkHref="/search"
              linkText="View All →"
            />
          </div>

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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {loading && loadingSkeleton}

            {!loading && filtered.length === 0 && (
              <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl border border-gold/10">
                <Compass size={40} className="mx-auto text-gold-light mb-3" />
                <h3 className="text-lg font-semibold text-navy mb-1">No luxury destinations match your filters</h3>
                <p className="text-navy-light/60 text-sm mb-4">Try broadening your search or adjusting your criteria</p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2 bg-navy text-cream rounded-lg text-sm font-medium hover:bg-navy-light transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div>
                <CarouselRow>
                  {filtered.slice(0, 15).map((dest) => (
                    <CarouselCard key={dest.id}>
                      <div className="transition-transform duration-200 hover:-translate-y-1">
                        <DestinationCard
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
                          amenities={dest.amenities || []}
                        />
                      </div>
                    </CarouselCard>
                  ))}
                  {/* "View All" card at the end */}
                  <CarouselCard>
                    <Link
                      href="/search"
                      className="flex flex-col items-center justify-center h-full min-h-[300px] rounded-xl border-2 border-dashed border-gold/30 bg-white/60 hover:bg-gold/5 hover:border-gold/60 transition-all text-center p-6"
                    >
                      <Compass size={32} className="text-gold mb-3" />
                      <span className="text-sm font-semibold text-navy mb-1">View All {filtered.length} Properties</span>
                      <span className="text-xs text-navy-light/60">Browse the complete collection →</span>
                    </Link>
                  </CarouselCard>
                </CarouselRow>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── BY THE NUMBERS ─── */}
      <section className="relative bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden border-y border-gold/20">
        {/* Decorative */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold rounded-full blur-[120px] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium mb-4">
              By the Numbers
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-cream">Asia&apos;s Finest Family Experiences</h2>
            <p className="text-cream/60 text-sm mt-2">Our curated collection at a glance</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center premium-fade-in" style={{ animationDelay: '0ms' }}>
              <div className="text-4xl font-bold text-gold mb-1">{totalDestinations}+</div>
              <div className="text-xs text-cream/60 uppercase tracking-widest">Curated Properties</div>
              <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
            <div className="text-center premium-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="text-4xl font-bold text-gold mb-1">4.7+</div>
              <div className="text-xs text-cream/60 uppercase tracking-widest">Avg Safety Rating</div>
              <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
            <div className="text-center premium-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl font-bold text-gold mb-1">{totalCities}</div>
              <div className="text-xs text-cream/60 uppercase tracking-widest">Luxury Destinations</div>
              <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
            <div className="text-center premium-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="text-4xl font-bold text-gold mb-1">{totalTips}+</div>
              <div className="text-xs text-cream/60 uppercase tracking-widest">Insider Tips</div>
              <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLYWHEEL CTA → Family Travel Asia ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <FeaturedReviews />
        <FlywheelCTA />
      </div>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative bg-gradient-to-br from-navy via-navy-dark to-navy rounded-2xl p-8 md:p-12 overflow-hidden border border-gold/20">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-48 h-48 bg-gold rounded-full blur-3xl" />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/30 text-gold text-sm mb-6">
              <Crown size={14} />
              The Finest Family Experiences in Asia
            </div>
            <h2 className="text-3xl font-bold text-cream mb-4">Ready for a vacation your family will never forget?</h2>
            <p className="text-cream/60 text-lg mb-8 max-w-xl mx-auto">
              We&apos;ve curated Asia&apos;s most extraordinary family experiences — from private island resorts to Michelin-starred dining with kids.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#full-grid" className="px-8 py-3.5 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-all shadow-lg active:scale-[0.98]">
                Browse All Properties
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
          className="fixed bottom-6 right-6 z-50 bg-gold text-navy p-3 rounded-full shadow-lg hover:bg-gold-light transition-all active:scale-90"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gold/20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-cream/60">
              <Crown size={16} className="text-gold" />
              <span className="text-sm">Luxury Family Travel Asia</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-cream/50">
              <a href="/about" className="hover:text-gold transition-colors">About</a>
              <a href="/privacy" className="hover:text-gold transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gold transition-colors">Terms</a>
              <a href="/contact" className="hover:text-gold transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gold/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream/40">
            <span className="text-cream/60 font-medium">Sister Sites:</span>
            <a href="https://www.familytravelasia.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              🌏 Family Travel Asia
            </a>
            <a href="https://ev-charging-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              ⚡ EV Charging Asia
            </a>
            <a href="https://apifeny-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
              🤖 AI Tools Directory
            </a>
          </div>
          <div className="mt-4 flex justify-center">
            <p className="text-sm text-cream/30">&copy; 2026 Luxury Family Travel Asia. Curated for discerning families.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
