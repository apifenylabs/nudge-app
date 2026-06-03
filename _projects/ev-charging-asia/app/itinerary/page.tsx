import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Car, Building2, ExternalLink, Crown, Route } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import { BreadcrumbSchemaSSR } from '@/components/SchemaOrg';
import SiteFooter from '@/components/SiteFooter';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'EV Road Trip Itineraries — EV Charging Asia',
  description: 'Curated multi-day EV road trips across Asia. Family-friendly routes with charging stops, luxury hotels, and kid-approved activities.',
};

const routeBgColors: Record<string, string> = {
  'Thailand': 'from-emerald-50 to-teal-50 border-emerald-200',
  'Singapore': 'from-sky-50 to-blue-50 border-sky-200',
  'Malaysia': 'from-amber-50 to-orange-50 border-amber-200',
  'Japan': 'from-rose-50 to-pink-50 border-rose-200',
  'Indonesia': 'from-lime-50 to-green-50 border-lime-200',
  'India': 'from-violet-50 to-purple-50 border-violet-200',
  'Vietnam': 'from-yellow-50 to-amber-50 border-yellow-200',
  'China': 'from-red-50 to-rose-50 border-red-200',
  'South Korea': 'from-cyan-50 to-sky-50 border-cyan-200',
  'Philippines': 'from-blue-50 to-indigo-50 border-blue-200',
};

const difficultyBadges: Record<string, string> = {
  'easy': 'bg-emerald-100 text-emerald-700',
  'moderate': 'bg-amber-100 text-amber-700',
  'challenging': 'bg-red-100 text-red-700',
};

const countryFlags: Record<string, string> = {
  'Thailand': '🇹🇭',
  'Singapore': '🇸🇬',
  'Malaysia': '🇲🇾',
  'Japan': '🇯🇵',
  'Indonesia': '🇮🇩',
  'India': '🇮🇳',
  'Vietnam': '🇻🇳',
  'China': '🇨🇳',
  'South Korea': '🇰🇷',
  'Philippines': '🇵🇭',
};

export default function ItinerariesPage() {
  const itineraries = getAllItineraries();

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'Itineraries', url: '/itinerary' },
      ]} />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={18} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/routes" className="hover:text-gray-900">Routes</Link>
            <Link href="/compare" className="hover:text-gray-900">Compare</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
            <Link href="/premium-routes" className="text-amber-600 hover:text-amber-700 font-medium">⭐ Premium</Link>
            <Link href="/seasons" className="hover:text-gray-900">Seasons</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
            🚗 EV ROAD TRIPS
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Family EV Road Trip Itineraries
        </h1>
        <p className="text-gray-500 mb-6 max-w-3xl text-sm leading-relaxed">
          Curated multi-day itineraries with charging stops, family activities, and luxury hotel recommendations across Asia. 
          Each route is tested for EV compatibility with specific charging stops, kid-approved activities, and hotel bookings.
        </p>

        {/* ===== AFFILIATE PARTNER BAR ===== */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-200 p-4 md:p-5 mb-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 shrink-0">
            <Car size={16} />
            <span>Book your trip</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/premium-routes"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg transition-all"
            >
              <Crown size={14} />
              Premium Route Guides
            </a>
            <a
              href="https://www.booking.com/index.html?aid=2875669"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 transition-all"
            >
              <Building2 size={14} className="text-blue-500" />
              Hotels on Booking.com
            </a>
            <a
              href="https://affiliate.klook.com/redirect?aid=119991&aff_adid=ev-rental-asia"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 transition-all"
            >
              <Car size={14} className="text-emerald-500" />
              Rent an EV on Klook
            </a>
          </div>
          <span className="text-[10px] text-amber-500 ml-auto shrink-0">
            We earn a commission &mdash; no extra cost to you
          </span>
        </div>

        {itineraries.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-400">Itineraries coming soon. Check back shortly!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((it) => {
            const countryKey = it.countries[0] || 'Thailand';
            const bgColor = routeBgColors[countryKey] || 'from-gray-50 to-gray-100 border-gray-200';
            const diffBadge = difficultyBadges[it.difficulty] || 'bg-gray-100 text-gray-700';
            const flag = countryFlags[countryKey] || '🌏';

            return (
              <Link
                key={it.id}
                href={`/itinerary/${it.slug}`}
                className={`group bg-gradient-to-br ${bgColor} rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col`}
              >
                <div className="p-6 flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${diffBadge}`}>
                      {it.difficulty.charAt(0).toUpperCase() + it.difficulty.slice(1)}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium bg-white/80 px-2 py-0.5 rounded-full">
                      <Route size={10} />
                      {it.duration}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                    {flag} {it.title}
                  </h2>
                  <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">{it.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-4 bg-white/60 rounded-lg px-3 py-2 flex-wrap">
                    <span className="flex items-center gap-1">📏 {it.totalDistanceKm} km</span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1">⏱ {it.totalDrivingHours}h</span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1">🔌 {it.estimatedChargingStops}+ stops</span>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-3">
                    {it.familyHighlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="text-[10px] text-gray-600 flex items-start gap-1.5">
                        <span className="text-pink-400 shrink-0 mt-0.5">👨‍👩‍👧‍👦</span>
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {it.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] bg-white/80 text-gray-500 px-1.5 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                    {it.tags.length > 3 && (
                      <span className="text-[9px] text-gray-400 px-1">+{it.tags.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Countries + Action footer */}
                <div className="px-6 pb-4 pt-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      {it.countries.map((c, i) => (
                        <span key={c}>
                          {i > 0 && ' → '}
                          <span className="font-medium text-gray-500">{c}</span>
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-emerald-600 group-hover:text-emerald-700 font-medium shrink-0">
                      View route →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ===== CTA: Premium Routes ===== */}
        <div className="mt-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown size={20} className="text-amber-200" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">Premium</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">Get the Full Route Guide</h3>
              <p className="text-sm text-white/80">
                Downloadable PDF guides with turn-by-turn directions, offline maps, restaurant menus, and charging station tips.
              </p>
            </div>
            <a
              href="/premium-routes"
              className="shrink-0 px-6 py-3 bg-white text-amber-700 font-semibold rounded-xl hover:bg-amber-50 transition-all text-sm shadow-md inline-flex items-center gap-2"
            >
              <Crown size={16} />
              Browse Premium Routes
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
