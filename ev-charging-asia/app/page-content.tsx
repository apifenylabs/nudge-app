'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, useState, useEffect } from 'react';
import { Station } from '@/lib/scoring';
import { BlogPost } from '@/lib/blog-data';
import { affiliateLinks, getAffiliatesForLocation } from '@/lib/affiliate-links';

const MapWithFilters = dynamic(() => import('@/components/MapWithFilters'), { ssr: false });
const FeaturedFamilyStops = dynamic(() => import('@/components/FeaturedFamilyStops'), { ssr: false });

interface Meta {
  totalStations: number;
  cities: string[];
  countries: string[];
}

export default function HomeContent({ meta, stations, blogPosts: initialPosts = [] }: { meta: Meta; stations: Station[]; blogPosts?: BlogPost[] }) {
  const [mounted, setMounted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const blogPosts = initialPosts.slice(0, 6);

  // Top countries for quick stats
  const topCountries = [...new Set(stations.map(s => s.country))];
  const topCities = [...new Set(stations.map(s => s.city))];

  // Popular route links
  const popularRoutes = [
    { name: 'Singapore → Kuala Lumpur', slug: 'singapore-to-kuala-lumpur-road-trip', distance: '350 km', duration: '3-4 days', difficulty: 'Easy' },
    { name: 'Bangkok → Chiang Mai', slug: 'bangkok-to-chiang-mai-road-trip', distance: '700 km', duration: '5-7 days', difficulty: 'Moderate' },
    { name: 'Kuala Lumpur → Penang', slug: 'kuala-lumpur-to-penang-road-trip', distance: '370 km', duration: '3-4 days', difficulty: 'Easy' },
    { name: 'Tokyo → Hakone → Mt. Fuji', slug: 'tokyo-to-hakone-fuji-road-trip', distance: '450 km', duration: '7-10 days', difficulty: 'Moderate' },
  ];

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 text-sm">Loading EV Charging Asia...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span className="font-bold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <span className="hidden sm:inline text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {meta.totalStations} stations · {meta.cities.length} cities
          </span>
        </div>
        <nav className="flex items-center gap-4 text-xs text-gray-500">
          <Link href="/search" className="hover:text-gray-900 font-medium">Browse Stations</Link>
          <Link href="/routes" className="hover:text-gray-900 font-medium">Routes</Link>
          <Link href="/itinerary" className="hover:text-gray-900 font-medium">Itineraries</Link>
          <Link href="/blog" className="hover:text-gray-900 font-medium">Blog</Link>
          <a href="https://apifeny-ai.vercel.app" className="hidden sm:flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium" target="_blank" rel="noopener noreferrer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            AI Tools
          </a>
          <a href="https://family-travel-directory.vercel.app" className="hidden lg:flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium" target="_blank" rel="noopener noreferrer">
            🏖️ Family Travel
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-4">
              <ZapIcon /> #1 EV Road Trip Planner for Asia
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Plan the Ultimate Family<br />
              <span className="text-emerald-600">EV Road Trip Across Asia</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl">
              Find charging stations, book EV-friendly hotels, and discover family-approved routes 
              from Bangkok to Bali. {meta.totalStations}+ verified stations across {topCountries.length} countries.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <SearchIcon /> Browse All Stations
              </Link>
              <Link
                href="/routes"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg font-medium text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <RouteIcon /> Plan a Route
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg font-medium text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <BookIcon /> Read Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-2xl font-bold text-gray-900">{meta.totalStations}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Stations</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold text-gray-900">{meta.cities.length}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Cities</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold text-gray-900">{topCountries.length}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Countries</div>
            </div>
            <div className="hidden md:block">
              <div className="text-2xl font-bold text-gray-900">{blogPosts.length || 16}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Guides</div>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>CCS2</span>
            <span>CHAdeMO</span>
            <span>GB/T</span>
            <span>NACS</span>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh]">
        <button
          onClick={() => setShowMap(!showMap)}
          className="absolute top-3 right-3 z-10 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 shadow-sm"
        >
          {showMap ? 'Show Content' : 'Show Map'}
        </button>
        <MapWithFilters stations={stations} meta={meta} />
      </div>

      {/* Featured Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <FeaturedFamilyStops stations={stations} />
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* ═══════ POPULAR ROUTES ═══════ */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <RouteIcon /> Popular EV Routes
            </h2>
            <Link href="/routes" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              View all routes →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route) => (
              <Link
                key={route.slug}
                href={`/routes/${route.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    route.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                    route.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {route.difficulty}
                  </span>
                  <span className="text-[10px] text-gray-400">{route.distance}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors mb-2">
                  {route.name}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <span>⏱ {route.duration}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1 text-[10px] text-gray-400">
                  <span>🔄 <Link href="/compare" onClick={e => e.stopPropagation()} className="text-sky-500 hover:text-sky-600">Compare routes</Link></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════ SEASONAL EXPLORER ═══════ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
              </svg>
              Discover Routes by Season
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Check when each route is at its best — matching travel seasons with weather, crowds, and driving conditions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { season: '🌺 Spring (Mar–May)', routes: ['Bangkok → Chiang Mai', 'Tokyo → Hakone → Mt. Fuji', 'Osaka → Tokyo', 'Singapore → KL'] },
              { season: '☀️ Summer (Jun–Aug)', routes: ['Bangkok → Phuket', 'Bali Loop', 'Hong Kong → Macau', 'Kuala Lumpur → Penang'] },
              { season: '🍂 Autumn (Sep–Nov)', routes: ['Tokyo → Hakone → Mt. Fuji', 'Osaka → Tokyo', 'Chiang Mai → Pai → Mae Hong Son', 'Delhi → Jaipur → Agra'] },
              { season: '❄️ Winter (Dec–Feb)', routes: ['Bangkok → Chiang Mai', 'Mumbai → Pune', 'Hanoi → Ha Long Bay', 'Bali Loop'] },
            ].map(({ season, routes }) => (
              <div key={season} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-all">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{season}</h3>
                <ul className="space-y-2">
                  {routes.map((route, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      <span>{route}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/routes" className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-medium">
              View all route seasonal guides →
            </Link>
          </div>
        </section>

        {/* ═══════ ITINERARIES ═══════ */}
        <section className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-sky-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">🏕️ Family Road Trip Itineraries</h2>
              <p className="text-sm text-gray-500">Curated multi-day EV road trips with charging stops, activities, and hotel recommendations</p>
            </div>
            <Link href="/itinerary" className="inline-flex items-center gap-1 px-4 py-2 bg-white text-sky-700 rounded-lg text-xs font-medium border border-sky-200 hover:bg-sky-50 transition-colors shrink-0">
              Browse All Itineraries →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/itinerary/singapore-to-kuala-lumpur"
              className="group bg-white rounded-xl border border-sky-200 p-5 hover:shadow-md hover:border-sky-300 transition-all">
              <h3 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 mb-1">🇸🇬 → 🇲🇾 Singapore to KL</h3>
              <p className="text-xs text-gray-500 mb-2">3-4 day family road trip with LEGOLAND, Melaka heritage, and durian stops</p>
              <span className="text-[10px] text-sky-600 font-medium">350 km · Easy · Family-friendly</span>
            </Link>
            <Link href="/itinerary/bangkok-to-chiang-mai"
              className="group bg-white rounded-xl border border-sky-200 p-5 hover:shadow-md hover:border-sky-300 transition-all">
              <h3 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 mb-1">🇹🇭 Bangkok → Chiang Mai</h3>
              <p className="text-xs text-gray-500 mb-2">Northern Thailand adventure with elephant sanctuaries and mountain temples</p>
              <span className="text-[10px] text-sky-600 font-medium">700 km · Moderate · Adventure</span>
            </Link>
            <Link href="/itinerary/tokyo-hakone-ev-microtrip"
              className="group bg-white rounded-xl border border-sky-200 p-5 hover:shadow-md hover:border-sky-300 transition-all">
              <h3 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 mb-1">🗾 Tokyo → Hakone</h3>
              <p className="text-xs text-gray-500 mb-2">Weekend micro-trip with Mt. Fuji views, onsen, and EV mountain driving</p>
              <span className="text-[10px] text-sky-600 font-medium">1-2 days · Easy · Micro-trip</span>
            </Link>
          </div>
        </section>

        {/* ═══════ LATEST BLOG POSTS ═══════ */}
        {blogPosts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BookIcon /> Latest Guides & Tips
              </h2>
              <Link href="/blog" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                View all {blogPosts.length} articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogPosts.slice(0, 6).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ═══════ AFFILIATE HOTELS SECTION ═══════ */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">🏨 EV-Friendly Hotels & Resorts</h2>
              <p className="text-sm text-gray-500">Book luxury stays with EV charging near your route</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'Bangkok Luxury Hotels', url: 'https://www.booking.com/index.html?aid=2875669&city=4000100&nflt=ht_id%3D204', badge: '🇹🇭 Thailand' },
              { name: 'Singapore Premium Stays', url: 'https://www.booking.com/index.html?aid=2875669&city=4006571&nflt=ht_id%3D204', badge: '🇸🇬 Singapore' },
              { name: 'KL Luxury Resorts', url: 'https://www.booking.com/index.html?aid=2875669&city=4002118&nflt=ht_id%3D204', badge: '🇲🇾 Malaysia' },
              { name: 'Tokyo Hotels with EV', url: 'https://www.booking.com/index.html?aid=2875669&city=4005195&nflt=ht_id%3D204', badge: '🇯🇵 Japan' },
              { name: 'Bali Villas', url: 'https://www.booking.com/index.html?aid=2875669&city=900047304&nflt=ht_id%3D204', badge: '🇮🇩 Bali' },
              { name: 'Chiang Mai Boutique', url: 'https://www.booking.com/index.html?aid=2875669&city=4000948&nflt=ht_id%3D204', badge: '🇹🇭 Thailand' },
              { name: 'Phuket Beach Resorts', url: 'https://www.booking.com/index.html?aid=2875669&city=4002283&nflt=ht_id%3D204', badge: '🇹🇭 Thailand' },
              { name: 'Osaka City Hotels', url: 'https://www.booking.com/index.html?aid=2875669&city=4003483&nflt=ht_id%3D204', badge: '🇯🇵 Japan' },
            ].map((hotel, i) => (
              <a
                key={i}
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group bg-white rounded-lg border border-amber-200 p-4 hover:shadow-md hover:border-amber-300 transition-all"
              >
                <div className="text-xs font-semibold text-gray-900 group-hover:text-amber-700 mb-1">{hotel.name}</div>
                <span className="text-[10px] text-gray-500">{hotel.badge}</span>
              </a>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-4 text-center">
            Book through our links to support EV Charging Asia at no extra cost to you.
          </p>
        </section>

        {/* ═══════ CROSS-SITE LINKS ═══════ */}
        <section className="border-t border-gray-100 pt-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 text-center">🌏 Explore More from Our Network</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://family-travel-directory.vercel.app" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-50 text-sky-700 rounded-lg text-xs font-medium border border-sky-200 hover:bg-sky-100 transition-colors">
              🏖️ Family Travel Asia — Family-friendly destinations
            </a>
            <a href="https://luxury-family-travel-asia.vercel.app" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium border border-purple-200 hover:bg-purple-100 transition-colors">
              ✨ Luxury Family Travel Asia — Premium family experiences
            </a>
            <a href="https://apifeny-ai.vercel.app" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-200 hover:bg-indigo-100 transition-colors">
              🤖 Apifeny AI Tools — AI tools directory
            </a>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs text-gray-500">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">EV Charging Asia</h3>
              <p>Your family-friendly EV road trip planner for Asia. {meta.totalStations}+ stations, {meta.cities.length} cities, {topCountries.length} countries.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li><Link href="/search" className="hover:text-gray-900">Browse Stations</Link></li>
                <li><Link href="/routes" className="hover:text-gray-900">EV Routes</Link></li>
                <li><Link href="/itinerary" className="hover:text-gray-900">Itineraries</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Partner Sites</h3>
              <ul className="space-y-1">
                <li><a href="https://family-travel-directory.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600">Family Travel Asia</a></li>
                <li><a href="https://luxury-family-travel-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600">Luxury Family Travel</a></li>
                <li><a href="https://apifeny-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">Apifeny AI Tools</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-6 pt-6 text-center text-[10px] text-gray-400">
            <p>© 2026 EV Charging Asia. Some links on this site are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Inline Icon Components ─── */
const ZapIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const SearchIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const RouteIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
  </svg>
);

const BookIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);
