import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Zap, ArrowLeft, Route, Clock, BatteryCharging, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { getAllItineraries, getItineraryBySlug, getRelatedItineraries } from '@/data/itineraries';
import RouteMap from '@/components/itineraries/RouteMap';
import SiteFooter from '@/components/SiteFooter';
import ItineraryDaysTimeline from '@/components/itineraries/ItineraryDaysTimeline';
import ItineraryAffiliateCTA from '@/components/itineraries/ItineraryAffiliateCTA';
import ItineraryCard from '@/components/itineraries/ItineraryCard';
import SeasonalRecommendations from '@/components/itineraries/SeasonalRecommendations';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const all = getAllItineraries();
  return all.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const it = getItineraryBySlug(params.slug);
  if (!it) return { title: 'Route Not Found' };
  return {
    title: `${it.title} — Family EV Road Trip in ${it.countries.join(' & ')}`,
    description: it.description.slice(0, 160),
    openGraph: {
      title: `${it.title} | EV Charging Asia`,
      description: it.description.slice(0, 160),
      url: `https://ev-charging-asia.vercel.app/routes/${it.slug}`,
    },
  };
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  moderate: 'bg-amber-100 text-amber-800 border-amber-300',
  challenging: 'bg-red-100 text-red-800 border-red-300',
};

export default function ItineraryDetailPage({ params }: Props) {
  const it = getItineraryBySlug(params.slug);
  if (!it) notFound();

  const related = getRelatedItineraries(params.slug, 2);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: it.title,
    description: it.description.slice(0, 300),
    url: `https://ev-charging-asia.vercel.app/routes/${it.slug}`,
    itineraryType: 'Road Trip',
    duration: `P${it.days.length}D`,
    distance: `${it.totalDistanceKm} km`,
    subTrip: it.days.map(day => ({
      '@type': 'TouristTrip',
      name: day.title,
      description: day.description,
      startDate: day.startCity,
      endDate: day.endCity,
    })),
    location: it.cities.map(city => ({
      '@type': 'City',
      name: city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressCountry: it.countries[0] || '',
      },
    })),
    offers: {
      '@type': 'Offer',
      url: it.affiliateHotelUrl,
      description: `Book luxury hotels for ${it.title}`,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <Link href="/routes" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={14} /> All routes
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link> <span>/</span>
          <Link href="/routes" className="hover:text-gray-700">Routes</Link> <span>/</span>
          <span className="text-gray-900 font-medium">{it.title}</span>
        </div>

        {/* Hero */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColors[it.difficulty] || difficultyColors.easy} capitalize`}>
              {it.difficulty}
            </span>
            <span className="px-2.5 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium border border-sky-200">
              {it.duration}
            </span>
            <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
              🌿 {it.bestSeason}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{it.title}</h1>
          <p className="text-base text-gray-600 mb-6">{it.subtitle}</p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">{it.description}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="text-center p-3 bg-amber-50 rounded-xl border border-amber-100">
              <Route size={20} className="mx-auto text-amber-500 mb-1" />
              <div className="text-lg font-bold text-gray-900">{it.totalDistanceKm}</div>
              <div className="text-xs text-gray-500">Total km</div>
            </div>
            <div className="text-center p-3 bg-sky-50 rounded-xl border border-sky-100">
              <Clock size={20} className="mx-auto text-sky-500 mb-1" />
              <div className="text-lg font-bold text-gray-900">{it.totalDrivingHours}h</div>
              <div className="text-xs text-gray-500">Driving time</div>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <BatteryCharging size={20} className="mx-auto text-emerald-500 mb-1" />
              <div className="text-lg font-bold text-gray-900">{it.estimatedChargingStops}+</div>
              <div className="text-xs text-gray-500">Charging stops</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
              <Calendar size={20} className="mx-auto text-purple-500 mb-1" />
              <div className="text-lg font-bold text-gray-900">{it.days.length}</div>
              <div className="text-xs text-gray-500">Days</div>
            </div>
          </div>

          {/* Route cities */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin size={14} className="text-red-400" />
            <span className="font-medium">Route:</span>
            <span className="text-gray-500">{it.cities.join(' → ')}</span>
          </div>
        </div>

        {/* Route Map */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin size={20} className="text-emerald-500" />
            Route Map
          </h2>
          <RouteMap itinerary={it} height="350px" />
        </div>

        {/* Highway conditions */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800 mb-0.5">Highway Conditions</h4>
              <p className="text-xs text-amber-700">{it.highwayConditions}</p>
            </div>
          </div>
        </div>

        {/* Affiliate CTA */}
        <div className="mb-6">
          <ItineraryAffiliateCTA itinerary={it} />
        </div>

        {/* Charging tips */}
        <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <BatteryCharging size={16} className="text-sky-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-sky-800 mb-0.5">Charging Tips for This Route</h4>
              <p className="text-xs text-sky-700">{it.chargingTips}</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-pink-800 mb-2 flex items-center gap-1">
              👨‍👩‍👧‍👦 Family Highlights
            </h4>
            <ul className="space-y-1.5">
              {it.familyHighlights.map((h, i) => (
                <li key={i} className="text-xs text-pink-700 flex items-start gap-1.5">
                  <span className="shrink-0">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1">
              👑 Luxury Highlights
            </h4>
            <ul className="space-y-1.5">
              {it.luxuryHighlights.map((h, i) => (
                <li key={i} className="text-xs text-amber-700 flex items-start gap-1.5">
                  <span className="shrink-0">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Seasonal Recommendations */}
        <div className="mb-8">
          <SeasonalRecommendations bestSeason={it.bestSeason} countries={it.countries} />
        </div>

        {/* Day-by-day itinerary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Day-by-Day Itinerary</h2>
          <ItineraryDaysTimeline days={it.days} />
        </div>

        {/* Affiliate CTA repeated at bottom */}
        <div className="mb-8">
          <ItineraryAffiliateCTA itinerary={it} />
        </div>

        {/* Related routes */}
        {related.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Routes You Might Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map(r => (
                <ItineraryCard key={r.id} itinerary={r} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteFooter />
    </div>
  );
}
