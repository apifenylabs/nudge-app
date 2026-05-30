import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Route as RouteIcon, ChevronRight } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import SiteFooter from '@/components/SiteFooter';
import RoutePlannerForm from '@/components/RoutePlannerForm';
import ItineraryCard from '@/components/itineraries/ItineraryCard';
import RouteFilterBar from '@/components/itineraries/RouteFilterBar';
import RouteFinderQuiz from '@/components/RouteFinderQuiz';
import RoutePopularityLeaderboard from '@/components/itineraries/RoutePopularityLeaderboard';
import { BreadcrumbSchemaSSR } from '@/components/SchemaOrg';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Family EV Road Trip Itineraries — EV Charging Asia',
  description: 'Curated family-friendly EV road trip routes across Asia. Bangkok to Phuket, Singapore to KL, Bali Loop, Japan, India, and more. Complete with charging stops, luxury hotels, family activities.',
  alternates: {
    canonical: 'https://ev-charging-asia.vercel.app/routes',
  },
  openGraph: {
    title: 'Family EV Road Trip Itineraries — EV Charging Asia',
    description: 'Curated family-friendly EV road trip routes across Asia. Complete with charging stops, luxury hotels, and family activities.',
    url: 'https://ev-charging-asia.vercel.app/routes',
    type: 'website',
    locale: 'en_US',
    siteName: 'EV Charging Asia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family EV Road Trip Itineraries — EV Charging Asia',
    description: 'Curated family-friendly EV road trip routes across Asia. Complete with charging stops, luxury hotels.',
  },
  other: {
    'keywords': 'EV road trip Asia, family EV road trip, electric vehicle road trip, Bangkok to Phuket EV, Singapore to KL EV, Bali EV road trip, Japan EV road trip, EV charging route Asia, family road trip EV, luxury EV road trip Asia',
  },
};

export default function RoutesPage() {
  const allItineraries = getAllItineraries();

  // JSON-LD: ItemList for Google rich results
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Family EV Road Trip Itineraries Across Asia',
    description: 'Curated family-friendly EV road trip routes across Asia.',
    url: 'https://ev-charging-asia.vercel.app/routes',
    numberOfItems: allItineraries.length,
    itemListElement: allItineraries.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://ev-charging-asia.vercel.app/routes/${it.slug}`,
      name: it.title,
      description: it.subtitle || it.description.slice(0, 160),
    })),
  };

  // JSON-LD: WebSite for organization + search action
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EV Charging Asia',
    url: 'https://ev-charging-asia.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ev-charging-asia.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'Routes', url: '/routes' },
      ]} />
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/search" className="hover:text-gray-900 dark:hover:text-gray-200">Chargers</Link>
            <Link href="/compare" className="hover:text-gray-900 dark:hover:text-gray-200">Compare</Link>
            <Link href="/blog" className="hover:text-gray-900 dark:hover:text-gray-200">Blog</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
              🚗 NEW
            </span>
            <span className="text-xs text-gray-500">Family + Luxury EV Road Trips</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Family + Luxury EV Road Trip Itineraries
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Curated, expert-planned EV road trips across Asia. Each route is designed for families —
            with charging stops, kid-friendly activities, luxury hotel recommendations, and booking links.
          </p>
        </div>
      </section>

      {/* Filterable grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {allItineraries.length} Route{allItineraries.length !== 1 ? 's' : ''}
          </h2>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <RouteIcon size={12} /> {allItineraries.reduce((sum, i) => sum + i.totalDistanceKm, 0)}km total
          </div>
        </div>

        {/* Country quick-links */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['thailand', 'malaysia', 'singapore', 'japan', 'india', 'indonesia', 'vietnam', 'china', 'philippines', 'korea']
            .filter(c => allItineraries.some(i => i.countries.some(cc => cc.toLowerCase() === c)))
            .map(country => {
              const flag: Record<string, string> = {
                thailand: '🇹🇭', malaysia: '🇲🇾', singapore: '🇸🇬', japan: '🇯🇵',
                india: '🇮🇳', indonesia: '🇮🇩', vietnam: '🇻🇳', china: '🇨🇳',
                philippines: '🇵🇭', korea: '🇰🇷',
              };
              const name: Record<string, string> = {
                thailand: 'Thailand', malaysia: 'Malaysia', singapore: 'Singapore', japan: 'Japan',
                india: 'India', indonesia: 'Indonesia', vietnam: 'Vietnam', china: 'China',
                philippines: 'Philippines', korea: 'South Korea',
              };
              return (
                <Link
                  key={country}
                  href={`/countries/${country}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-all"
                >
                  <span>{flag[country]}</span>
                  {name[country]}
                </Link>
              );
            })}
        </div>

        {/* Route filter bar */}
        <RouteFilterBar allItineraries={allItineraries} />

        {/* Route Popularity Leaderboard */}
        <div className="mt-12">
          <RoutePopularityLeaderboard />
        </div>

        {/* Find Your Route — Interactive Quiz */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">🎯 Find Your Perfect Route</h2>
            <p className="text-sm text-gray-500">Answer 6 quick questions and we'll recommend the ideal EV road trip for you.</p>
          </div>
          <RouteFinderQuiz />
        </div>

        {/* Route planner form */}
        <div className="mt-12">
          <RoutePlannerForm />
        </div>

        {/* Tools section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/compare"
            className="block bg-white rounded-2xl border border-gray-200 p-6 hover:border-sky-300 hover:shadow-sm transition-all"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">🔄 Compare Routes</h3>
            <p className="text-sm text-gray-500">
              Pick two itinerary routes and compare distance, difficulty, family highlights, and luxury options side by side.
            </p>
            <div className="mt-3 text-sm font-medium text-sky-600">Try it now →</div>
          </Link>
          <Link
            href="/seasons"
            className="block bg-white rounded-2xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-sm transition-all"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">🌿 Best Seasons Guide</h3>
            <p className="text-sm text-gray-500">
              Find the best time of year for every EV road trip — month-by-month recommendations, weather, and road conditions.
            </p>
            <div className="mt-3 text-sm font-medium text-emerald-600">Seasonal guide →</div>
          </Link>
          <Link
            href="/compare"
            className="block bg-white rounded-2xl border border-gray-200 p-6 hover:border-sky-300 hover:shadow-sm transition-all"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">📊 All Routes at a Glance</h3>
            <p className="text-sm text-gray-500">
              See the full table of all EV road trips with distance, difficulty, duration, countries, and charging stops side by side.
            </p>
            <div className="mt-3 text-sm font-medium text-sky-600">Full comparison →</div>
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
