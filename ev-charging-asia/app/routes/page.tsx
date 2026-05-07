import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Route as RouteIcon } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import SiteFooter from '@/components/SiteFooter';
import ItineraryCard from '@/components/itineraries/ItineraryCard';

export const metadata: Metadata = {
  title: 'Family EV Road Trip Itineraries — EV Charging Asia',
  description: 'Curated family-friendly EV road trip routes across Asia. Bangkok to Phuket, Singapore to KL, Bali Loop, and more. Complete with charging stops, luxury hotels, and family activities.',
  openGraph: {
    title: 'Family EV Road Trip Itineraries — EV Charging Asia',
    description: 'Curated family-friendly EV road trip routes across Asia. Complete with charging stops, luxury hotels, and family activities.',
    url: 'https://ev-charging-asia.vercel.app/routes',
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

        {allItineraries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <RouteIcon size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No itineraries yet</h3>
            <p className="text-gray-500 text-sm">Check back soon — we&apos;re adding new routes every week.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allItineraries.map(itinerary => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </div>
        )}

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
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">📅 Seasonal Info</h3>
            <p className="text-sm text-gray-500">
              Check month-by-month recommendations, weather tips, and packing lists on each route&apos;s detail page.
            </p>
            <div className="mt-3 text-sm text-gray-400">
              View weather guidance on any route page
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
