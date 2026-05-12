import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Route as RouteIcon } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import SiteFooter from '@/components/SiteFooter';
import ItineraryCard from '@/components/itineraries/ItineraryCard';
import RouteFilterBar from '@/components/itineraries/RouteFilterBar';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/search" className="hover:text-gray-900">Chargers</Link>
            <Link href="/compare" className="hover:text-gray-900">Compare</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
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

        {/* Route filter bar */}
        <RouteFilterBar allItineraries={allItineraries} />

        {/* Tools section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            href="/compare"
            className="block bg-white rounded-2xl border border-gray-200 p-6 hover:border-sky-300 hover:shadow-sm transition-all"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">📊 All 12 Routes Comparison</h3>
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
