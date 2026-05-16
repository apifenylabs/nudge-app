'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Sparkles, Globe, Users, Star,
  ChevronLeft, ChevronRight, Clock, Compass,
  Lightbulb, Heart, Filter, BookOpen, Sun, Tag, MessageSquare,
  SlidersHorizontal, ArrowUp, Calendar, ArrowUpRight, Shield, ListFilter,
  BadgeCheck, TrendingUp, ChevronDown, Mail, Facebook, Twitter, Instagram
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import PremiumLuxuryHero from '@/components/PremiumLuxuryHero';
import FilterBar from '@/components/FilterBar';
import DestinationCard from '@/components/DestinationCard';
import AdUnit from '@/components/AdUnit';
import { computeSimpleScore, scoreTier } from '@/lib/scoring';

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
  isNew?: boolean;
  parentStory?: { title: string; excerpt: string; author: string; fullStory: string; };
  information_gain?: { reddit_sentiment_snippet?: string; human_verified_tip?: string | null; primary_source_url?: string; geo_highlight_score?: number; };
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

// ─── Static Data ────────────────────────────────────────────────
const categories = [
  { name: "Theme Parks & Attractions", icon: Sparkles, desc: "Thrills and smiles for all ages" },
  { name: "Nature & Outdoor Adventures", icon: Globe, desc: "Fresh air, open spaces, wild encounters" },
  { name: "Cultural & Historical Sites", icon: Globe, desc: "Learn while having fun" },
];

const POPULAR_COUNTRIES = [
  { name: "Japan", flag: "🇯🇵" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Hong Kong", flag: "🇭🇰" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Malaysia", flag: "🇲🇾" },
];

const SEASONAL_IDS = [
  "chiangmai-001", "jeju-001", "kyoto-001", "bangkok-002",
  "danang-003", "palawan-003", "siemreap-001", "hualien-001"
];

// Editor's picks for "Must-Book This Month" (Phase 2)
const MUST_BOOK_IDS = [
  "tokyo-001", "kyoto-001", "bangkok-002", "bali-001", "singapore-001"
];

const MUST_BOOK_NOTES: Record<string, string> = {
  "tokyo-001": "Peak season approaching — book 3+ months ahead for best rates",
  "kyoto-001": "Cherry blossom season coming up — book now before prices double",
  "bangkok-002": "New family-friendly zones just opened — parents are raving",
  "bali-001": "School holiday rush starting soon, secure your villa now",
  "singapore-001": "Top-rated by 200+ parents this month, slots filling fast"
};

// Family picks — most saved/bookmarked
const FAMILY_PICKS_IDS = [
  "siemreap-001", "chiangmai-001", "danang-003", "hualien-001", "jeju-001",
  "palawan-003", "penang-004", "bagan-001"
];

// ─── Sub-components ────────────────────────────────────────────

function SectionHeading({ title, subtitle, linkHref, linkText, gold }: {
  title: React.ReactNode;
  subtitle?: string;
  linkHref?: string;
  linkText?: string;
  gold?: boolean;
}) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className={`text-2xl sm:text-3xl font-heading font-bold ${gold ? 'bg-gradient-to-r from-premium-gold to-amber-600 bg-clip-text text-transparent' : 'text-heading dark:text-gray-100'}`}>
          {title}
        </h2>
        {subtitle && <p className="text-body dark:text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {linkHref && linkText && (
        <Link href={linkHref} className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors whitespace-nowrap group">
          {linkText}
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}

function Carousel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'left' ? -1120 : 1120, behavior: 'smooth' });
  };
  return (
    <div className="group/carousel relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} className="text-gray-700 dark:text-gray-300" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} className="text-gray-700 dark:text-gray-300" />
      </button>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

function CarouselSlide({ children }: { children: React.ReactNode }) {
  return <div className="w-[280px] shrink-0 snap-start">{children}</div>;
}

function StatsBar() {
  return (
    <section className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold font-heading text-teal-700 mb-1">1,200+</div>
            <div className="text-sm text-body">Verified Destinations</div>
            <div className="mt-2 h-0.5 w-12 mx-auto bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full" />
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold font-heading text-teal-700 mb-1">4.7</div>
            <div className="text-sm text-body">Avg Safety Rating</div>
            <div className="mt-2 h-0.5 w-12 mx-auto bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full" />
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold font-heading text-teal-700 mb-1">29</div>
            <div className="text-sm text-body">Countries Covered</div>
            <div className="mt-2 h-0.5 w-12 mx-auto bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full" />
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold font-heading text-teal-700 mb-1">4,500+</div>
            <div className="text-sm text-body">Parent Reviews</div>
            <div className="mt-2 h-0.5 w-12 mx-auto bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };
  return (
    <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 rounded-2xl p-8 md:p-10 text-center">
      <div className="max-w-md mx-auto">
        <Mail size={28} className="text-teal-300 mx-auto mb-4" />
        <h3 className="font-heading text-xl font-bold text-white mb-2">Get Family Travel Deals</h3>
        <p className="text-teal-200/80 text-sm mb-6">Weekly curated picks, tips, and exclusive discounts — straight to your inbox.</p>
        {subscribed ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-teal-200 font-medium text-sm border border-white/10">
            ✅ You&apos;re in! Check your inbox for the welcome email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-teal-200/50 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-white text-teal-900 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm shadow-lg"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────

export default function Home({ meta, blogPosts }: {
  meta?: { totalDestinations: number; cities: string[]; totalParentTips: number };
  blogPosts?: BlogPost[];
}) {
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
  const [cities, setCities] = useState<string[]>([]);
  const [totalDestinations, setTotalDestinations] = useState(meta?.totalDestinations || 0);
  const [totalTips, setTotalTips] = useState(meta?.totalParentTips || 0);
  const [totalCities, setTotalCities] = useState(meta?.cities?.length || 29);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const observeSection = useCallback((key: string, el: HTMLDivElement | null) => {
    if (!el) return;
    sectionRefs.current.set(key, el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(key));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          const allCities = [...new Set(data.map((d: any) => d.city))].sort() as string[];
          setCities(allCities);
          setTotalCities(allCities.length);
        }
        setLoading(false);
      } catch (e) {
        console.error('Failed to load data:', e);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // ── Computed data ──
  const scored = useMemo(() =>
    destinations.map(d => ({
      ...d,
      _score: computeSimpleScore(d.safetyRating, d.popularity, d.tipsAndTricks?.length || 0, !!d.parentStory)
    })),
    [destinations]
  );

  const topPicks = useMemo(() =>
    [...scored].sort((a, b) => b._score - a._score).slice(0, 12),
    [scored]
  );

  const trendingNow = useMemo(() =>
    [...scored]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 10),
    [scored]
  );

  const mustBook = useMemo(() =>
    MUST_BOOK_IDS.map(id => scored.find(d => d.id === id)).filter(Boolean) as typeof scored,
    [scored]
  );

  const familyPicks = useMemo(() =>
    FAMILY_PICKS_IDS.map(id => scored.find(d => d.id === id)).filter(Boolean) as typeof scored,
    [scored]
  );

  const seasonalPicks = useMemo(() =>
    SEASONAL_IDS.map(id => scored.find(d => d.id === id)).filter(Boolean) as typeof scored,
    [scored]
  );

  const countryRows = useMemo(() =>
    POPULAR_COUNTRIES.map(c => ({
      ...c,
      destinations: scored.filter(d => d.country === c.name).slice(0, 12)
    })).filter(c => c.destinations.length > 0),
    [scored]
  );

  const loadingSkeleton = (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-50 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-3 bg-gray-50 dark:bg-gray-700 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900">
      {/* ─── HERO ─── */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickFilter={(type, value) => {
          if (type === 'city') setSelectedCity(selectedCity === value ? "All" : value);
          else if (type === 'category') setSelectedCategory(selectedCategory === value ? "All" : value);
          else if (type === 'age') setSelectedAge(selectedAge === value ? "All" : value);
        }}
        totalDestinations={totalDestinations}
        totalCities={totalCities}
        totalTips={totalTips}
        cities={cities.slice(0, 11)}
        selectedCity={selectedCity}
      />

      {/* ─── STATS BAR ─── */}
      <StatsBar />

      {/* ─── TRENDING NOW SECTION ─── */}
      {!loading && trendingNow.length > 0 && (
        <div
          ref={(el) => observeSection("trending", el)}
          className={`transition-all duration-700 ${visibleSections.has("trending") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <SectionHeading
              title={<span className="flex items-center gap-2"><TrendingUp size={22} className="text-rose-500" /> Trending Now</span>}
              subtitle="Most popular destinations among families this week"
              linkHref="/search"
              linkText="See all →"
            />
            <Carousel>
              {trendingNow.map((d, i) => (
                <CarouselSlide key={d.id}>
                  <div className="relative">
                    {/* Fixed-height spacer to keep all cards aligned vertically */}
                    <div className="h-8">
                      {i === 0 && (
                        <div className="inline-flex bg-gradient-to-r from-rose-500 to-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-premium-glow">
                          🔥 Trending #1 This Week
                        </div>
                      )}
                    </div>
                    <div className="transition-transform duration-200 hover:-translate-y-1">
                      <DestinationCard
                        id={d.id} name={d.name} city={d.city} country={d.country}
                        category={d.category} ageRange={d.ageRange} safetyRating={d.safetyRating}
                        priceRange={d.priceRange} popularity={d.popularity} description={d.description}
                        imageUrl={d.imageUrl} tipsCount={d.tipsAndTricks?.length || 0}
                        parentStory={!!d.parentStory} amenities={d.amenities || []}
                        isNew={d.isNew} human_verified_tip={d.information_gain?.human_verified_tip}
                        rank={i + 1}
                      />
                    </div>
                  </div>
                </CarouselSlide>
              ))}
            </Carousel>
          </section>
        </div>
      )}

      {/* ─── MUST-BOOK THIS MONTH ─── */}
      {!loading && mustBook.length > 0 && (
        <div
          ref={(el) => observeSection("must-book", el)}
          className={`transition-all duration-700 ${visibleSections.has("must-book") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SectionHeading
              title={<span className="flex items-center gap-2">🏆 Must-Book This Month</span>}
              subtitle="Editor&apos;s curated picks — book ahead for the best deals"
              gold
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {mustBook.map((d, i) => (
                <Link key={d.id} href={`/destination/${d.id}`} className="group relative">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-amber-100 dark:border-amber-900/50 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                    <div className="relative aspect-[4/3] bg-gray-50 dark:bg-gray-800 overflow-hidden">
                      <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Editor's Choice gold badge */}
                      <div className="absolute top-3 left-3 gold-badge flex items-center gap-1">
                        <Star size={10} className="fill-white" />
                        <span>Editor&apos;s Choice</span>
                      </div>

                      {/* Rank number */}
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-premium-gold font-bold text-xs px-2 py-1 rounded-full shadow">
                        #{i + 1} Pick
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-heading dark:text-gray-100 text-base mb-1 group-hover:text-teal-600 transition-colors">{d.name}</h3>
                      <p className="text-xs text-body dark:text-gray-400 mb-2">{d.city}, {d.country}</p>
                      <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800/50 rounded-lg px-3 py-2 leading-relaxed">
                        💡 {MUST_BOOK_NOTES[d.id] || 'Top pick this month'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ─── CATEGORY CARDS ─── */}
      <div
        ref={(el) => observeSection("categories", el)}
        className={`transition-all duration-700 ${visibleSections.has("categories") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SectionHeading title="Browse by Category" subtitle="Find what excites your family" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = destinations.filter(d => d.category === cat.name).length;
              return (
                <Link
                  key={cat.name}
                  href={`/search?category=${encodeURIComponent(cat.name)}`}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-100 transition-colors">
                      <cat.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-heading dark:text-gray-100 text-sm mb-0.5">{cat.name}</h3>
                      <p className="text-xs text-body dark:text-gray-400">{cat.desc}</p>
                      <span className="text-xs font-medium text-teal-600 mt-1 inline-block">{count} destinations</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* ─── FAMILY PICKS ─── */}
      {!loading && familyPicks.length > 0 && (
        <div
          ref={(el) => observeSection("family-picks", el)}
          className={`transition-all duration-700 ${visibleSections.has("family-picks") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SectionHeading
              title={<span className="flex items-center gap-2"><Heart size={20} className="text-rose-500" /> Family Picks</span>}
              subtitle="Most saved by parents this week"
              linkHref="/search"
              linkText="See all →"
            />
            <Carousel>
              {familyPicks.map(d => (
                <CarouselSlide key={d.id}>
                  <div className="transition-transform duration-200 hover:-translate-y-1">
                    <DestinationCard
                      id={d.id} name={d.name} city={d.city} country={d.country}
                      category={d.category} ageRange={d.ageRange} safetyRating={d.safetyRating}
                      priceRange={d.priceRange} popularity={d.popularity} description={d.description}
                      imageUrl={d.imageUrl} tipsCount={d.tipsAndTricks?.length || 0}
                      parentStory={!!d.parentStory} amenities={d.amenities || []}
                      isNew={d.isNew} human_verified_tip={d.information_gain?.human_verified_tip}
                    />
                  </div>
                </CarouselSlide>
              ))}
            </Carousel>
          </section>
        </div>
      )}

      {/* ─── MULTIPLEX AD ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="4496658130" format="autorelaxed" label="More destinations you may like" />
      </div>

      {/* ─── TOP PICKS ─── */}
      {!loading && topPicks.length > 0 && (
        <div
          ref={(el) => observeSection("top-picks", el)}
          className={`transition-all duration-700 ${visibleSections.has("top-picks") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SectionHeading
              title="Top Rated Destinations"
              subtitle="Highest-scored destinations loved by parents"
              linkHref="/top10"
              linkText="View Top 10 →"
            />
            <Carousel>
              {topPicks.map((d, i) => (
                <CarouselSlide key={d.id}>
                  <div className="transition-transform duration-200 hover:-translate-y-1">
                    <DestinationCard
                      id={d.id} name={d.name} city={d.city} country={d.country}
                      category={d.category} ageRange={d.ageRange} safetyRating={d.safetyRating}
                      priceRange={d.priceRange} popularity={d.popularity} description={d.description}
                      imageUrl={d.imageUrl} tipsCount={d.tipsAndTricks?.length || 0}
                      parentStory={!!d.parentStory} amenities={d.amenities || []}
                      isNew={d.isNew} human_verified_tip={d.information_gain?.human_verified_tip}
                      rank={i + 1}
                    />
                  </div>
                </CarouselSlide>
              ))}
            </Carousel>
          </section>
        </div>
      )}

      {/* ─── COUNTRY ROWS (carousel per country) ─── */}
      {!loading && countryRows.slice(0, 4).map((row) => (
        <div
          key={row.name}
          ref={(el) => observeSection(`country-${row.name}`, el)}
          className={`transition-all duration-700 ${visibleSections.has(`country-${row.name}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SectionHeading
              title={<span>{row.flag} {row.name}</span>}
              subtitle={`Family-friendly destinations in ${row.name}`}
              linkHref={`/search?country=${encodeURIComponent(row.name)}`}
              linkText={`See all ${row.destinations.length} →`}
            />
            <Carousel>
              {row.destinations.map(d => (
                <CarouselSlide key={d.id}>
                  <div className="transition-transform duration-200 hover:-translate-y-1">
                    <DestinationCard
                      id={d.id} name={d.name} city={d.city} country={d.country}
                      category={d.category} ageRange={d.ageRange} safetyRating={d.safetyRating}
                      priceRange={d.priceRange} popularity={d.popularity} description={d.description}
                      imageUrl={d.imageUrl} tipsCount={d.tipsAndTricks?.length || 0}
                      parentStory={!!d.parentStory} amenities={d.amenities || []}
                      isNew={d.isNew} human_verified_tip={d.information_gain?.human_verified_tip}
                    />
                  </div>
                </CarouselSlide>
              ))}
            </Carousel>
          </section>
        </div>
      ))}

      {/* ─── ALL DESTINATIONS ─── */}
      <div id="full-grid" className="mt-2">
        <div
          ref={(el) => observeSection("full-grid", el)}
          className={`transition-all duration-700 ${visibleSections.has("full-grid") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SectionHeading
              title="All Destinations"
              subtitle={`${totalDestinations} destinations across Asia`}
              linkHref="/search"
              linkText="Browse all →"
            />
            {loading && loadingSkeleton}
            {!loading && (
              <Carousel>
                {topPicks.slice(0, 12).map(d => (
                  <CarouselSlide key={d.id}>
                    <div className="transition-transform duration-200 hover:-translate-y-1">
                      <DestinationCard
                        id={d.id} name={d.name} city={d.city} country={d.country}
                        category={d.category} ageRange={d.ageRange} safetyRating={d.safetyRating}
                        priceRange={d.priceRange} popularity={d.popularity} description={d.description}
                        imageUrl={d.imageUrl} tipsCount={d.tipsAndTricks?.length || 0}
                        parentStory={!!d.parentStory} amenities={d.amenities || []}
                        isNew={d.isNew} human_verified_tip={d.information_gain?.human_verified_tip}
                      />
                    </div>
                  </CarouselSlide>
                ))}
              </Carousel>
            )}
            <div className="text-center mt-8">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition-all shadow-lg hover:shadow-teal-300 active:scale-[0.98]"
              >
                Browse All {totalDestinations} Destinations
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BLOG PREVIEW ─── */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700" id="blog-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <SectionHeading
              title="Latest from Our Blog"
              subtitle="Travel tips, comparison guides, and parent advice"
              linkHref="/blog"
              linkText="View all articles →"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-card-hover hover:border-gray-200 dark:hover:border-gray-500 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-heading dark:text-gray-100 group-hover:text-teal-600 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-body dark:text-gray-400 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
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
          </div>
        </section>
      )}

      {/* ─── FIRST-CLASS & PREMIUM EXPERIENCES + CROSS-LINKS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <PremiumLuxuryHero />
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white/80 mb-6">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              Every tip comes from real parents
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">Ready to plan a trip your kids will actually remember?</h2>
            <p className="text-teal-200/80 text-lg mb-8 max-w-xl mx-auto">
              We&apos;ve done the research, read the Reddit threads, and talked to hundreds of parents. Now you get the shortcut.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/search" className="px-8 py-3.5 bg-white text-teal-900 font-semibold rounded-xl hover:bg-teal-50 transition-all shadow-lg active:scale-[0.98]">
                Browse All Destinations
                <ChevronRight size={18} className="inline-block ml-1" />
              </Link>
              <Link href="/review" className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all font-medium">
                Share Your Experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewsletterSignup />
      </section>

      {/* ─── CROSS-LINKS ─── */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h3 className="font-heading text-xl font-bold text-heading dark:text-gray-100 mb-1">Explore Our Network</h3>
            <p className="text-sm text-body dark:text-gray-400">More resources for your family&apos;s Asia journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://luxury-family-travel-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-amber-50 dark:from-amber-900/30 to-amber-100/50 dark:to-amber-800/30 rounded-xl p-6 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">✨</span>
                <h3 className="font-heading font-bold text-heading dark:text-gray-100 group-hover:text-amber-700 transition-colors">Looking for Something More Exclusive?</h3>
              </div>
              <p className="text-sm text-body dark:text-gray-400 mb-3">Discover our curated selection of 5-star luxury family resorts across Asia. VIP experiences, private villas, and white-glove service.</p>
              <span className="text-sm font-semibold text-amber-600 group-hover:text-amber-700">Explore Luxury Collection →</span>
            </a>
            <a href="https://ev-charging-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-emerald-50 dark:from-emerald-900/30 to-teal-100/50 dark:to-teal-800/30 rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⚡</span>
                <h3 className="font-heading font-bold text-heading dark:text-gray-100 group-hover:text-emerald-700 transition-colors">Planning a Road Trip with the Family?</h3>
              </div>
              <p className="text-sm text-body dark:text-gray-400 mb-3">Find EV charging stations across Asia for your family adventure. Perfect for families driving between destinations.</p>
              <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">Find EV Charging →</span>
            </a>
            <a href="https://apifeny-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-purple-50 dark:from-purple-900/30 to-violet-100/50 dark:to-violet-800/30 rounded-xl p-6 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🤖</span>
                <h3 className="font-heading font-bold text-heading dark:text-gray-100 group-hover:text-purple-700 transition-colors">Supercharge Your Workflow with AI</h3>
              </div>
              <p className="text-sm text-body dark:text-gray-400 mb-3">Curated directory of AI tools and agents to help you plan faster, write better, and automate the busywork.</p>
              <span className="text-sm font-semibold text-purple-600 group-hover:text-purple-700">Visit AI Hub →</span>
            </a>
            <a href="https://senior-friendly-travel-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-sky-50 dark:from-sky-900/30 to-blue-100/50 dark:to-blue-800/30 rounded-xl p-6 border border-sky-200/50 dark:border-sky-800/50 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">👴</span>
                <h3 className="font-heading font-bold text-heading dark:text-gray-100 group-hover:text-sky-700 transition-colors">Traveling with Grandparents?</h3>
              </div>
              <p className="text-sm text-body dark:text-gray-400 mb-3">Accessible travel guides for older adults and multi-generational family trips across Asia. Senior-friendly destinations and tips.</p>
              <span className="text-sm font-semibold text-sky-600 group-hover:text-sky-700">Senior-Friendly Travel →</span>
            </a>
          </div>
        </div>
      </section>



      {/* ─── SCROLL TO TOP ─── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-6 z-50 bg-teal-700 text-white p-3 rounded-full shadow-lg hover:bg-teal-800 transition-all active:scale-90 hover:shadow-teal-300"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Compass size={18} className="text-teal-600" />
                <span className="font-heading font-bold text-heading dark:text-gray-100 text-lg">Family Travel<span className="text-teal-600">.</span></span>
              </div>
              <p className="text-sm text-body dark:text-gray-400 max-w-sm">Curated by parents, for parents. We find the best family-friendly destinations across Asia so you don&apos;t have to.</p>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors"><Twitter size={15} /></a>
                <a href="#" className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors"><Instagram size={15} /></a>
                <a href="#" className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors"><Facebook size={15} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-heading dark:text-gray-100 mb-3">Explore</h4>
              <div className="flex flex-col gap-2 text-sm text-body dark:text-gray-400">
                <Link href="/search" className="hover:text-teal-600 transition-colors">All Destinations</Link>
                <Link href="/top10" className="hover:text-teal-600 transition-colors">Top 10</Link>
                <Link href="/best-for/babies" className="hover:text-teal-600 transition-colors">Best for Babies</Link>
                <Link href="/best-for/teens" className="hover:text-teal-600 transition-colors">Best for Teens</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-heading dark:text-gray-100 mb-3">Company</h4>
              <div className="flex flex-col gap-2 text-sm text-body dark:text-gray-400">
                <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
                <Link href="/blog" className="hover:text-teal-600 transition-colors">Blog</Link>
                <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link>
                <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">&copy; 2026 Family Travel Asia. Curated by parents, for parents.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Made with 💚 for families exploring Asia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}