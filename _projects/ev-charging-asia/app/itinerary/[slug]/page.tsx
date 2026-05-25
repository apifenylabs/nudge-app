import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Zap, ArrowLeft, Route, Clock, BatteryCharging, Calendar, MapPin, AlertTriangle, Users, Crown, Star, Wifi, Utensils, ShoppingBag, ChevronRight, ExternalLink } from 'lucide-react';
import { getAllItineraries, getItineraryBySlug, getRelatedItineraries } from '@/data/itineraries';
import RouteMap from '@/components/itineraries/RouteMap';
import SeasonalRecommendations from '@/components/itineraries/SeasonalRecommendations';
import SeasonalComparisonTable from '@/components/itineraries/SeasonalComparisonTable';
import RoutePopularity from '@/components/RoutePopularity';
import NewsletterSignup from '@/components/NewsletterSignup';
import ItinerarySEOSection from '@/components/itineraries/ItinerarySEOSection';
import ItineraryRevenueSection from '@/components/itineraries/ItineraryRevenueSection';
import OptimisticTipsSection from '@/components/itineraries/OptimisticTipsSection';
import { getRouteStations, getRecommendedStops, getKidFriendlyStations, getLuxuryStations, countRouteChargingStops, getRouteCities } from '@/data/route-stations';
import RelatedBlogPosts from '@/components/itineraries/RelatedBlogPosts';
import ItineraryCard from '@/components/itineraries/ItineraryCard';
import stationsData from '@/data/stations.json';
import { scoreTier } from '@/lib/scoring';
import type { Station } from '@/lib/scoring';

interface Props {
  params: { slug: string };
}

// Map slug to full itinerary slug — covers all 12 routes
export const slugToItineraryMap: Record<string, string> = {
  'bangkok-phuket': 'bangkok-to-phuket-road-trip',
  'bangkok-chiang-mai': 'bangkok-to-chiang-mai-road-trip',
  'singapore-kuala-lumpur': 'singapore-to-kuala-lumpur-road-trip',
  'singapore-kuala-lumpur-family': 'singapore-to-kuala-lumpur-family-ev-road-trip',
  'bali-loop': 'bali-ev-road-trip-loop',
  'bali-family': 'bali-family-ev-road-trip-loop',
  'hong-kong-macau': 'hong-kong-to-macau-road-trip',
  'hanoi-ha-long': 'hanoi-to-ha-long-bay-road-trip',
  'osaka-tokyo': 'osaka-to-tokyo-road-trip',
  'kuala-lumpur-penang': 'kuala-lumpur-to-penang-road-trip',
  'kuala-lumpur-penang-family': 'kuala-lumpur-to-penang-family-ev-road-trip',
  'mumbai-pune': 'mumbai-to-pune-road-trip',
  'tokyo-hakone-fuji': 'tokyo-to-hakone-fuji-road-trip',
  'delhi-jaipur-agra': 'delhi-to-jaipur-agra-road-trip',
  'chiang-mai-pai-mae-hong-son': 'chiang-mai-to-pai-mae-hong-son-road-trip',
  'seoul-busan': 'seoul-to-busan-road-trip',
  'manila-baguio': 'manila-to-baguio-road-trip',
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(slugToItineraryMap).map(slug => ({ slug }));
}

// Note: getItineraryBySlug and getAllItineraries are imported directly above
// from '@/data/itineraries' — no re-export needed

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const it = getItineraryBySlug(slugToItineraryMap[params.slug] || params.slug);
  if (!it) return { title: 'Route Not Found' };
  const fullSlug = slugToItineraryMap[params.slug];
  return {
    title: `${it.title} — Family EV Road Trip ${it.countries.length > 0 ? `in ${it.countries.join(' & ')}` : 'Across Asia'}`,
    description: it.description.slice(0, 160),
    keywords: [...it.tags, 'EV road trip', 'family travel', 'electric vehicle', 'Asia road trip', ...it.countries.map(c => `${c} EV road trip`), ...it.cities.slice(0, 3).map(c => `${c} to ${it.cities[it.cities.length - 1]} EV driving`)].join(', '),
    alternates: {
      canonical: fullSlug ? `https://ev-charging-asia.vercel.app/routes/${fullSlug}` : undefined,
    },
    openGraph: {
      title: `${it.title} | EV Charging Asia`,
      description: it.description.slice(0, 160),
      url: fullSlug ? `https://ev-charging-asia.vercel.app/routes/${fullSlug}` : `https://ev-charging-asia.vercel.app/itinerary/${params.slug}`,
      type: 'article',
      locale: 'en_US',
      siteName: 'EV Charging Asia',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${it.title} | EV Charging Asia`,
      description: it.description.slice(0, 160),
    },
    other: {
      'article:tag': it.tags.slice(0, 6).join(','),
    },
  };
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  moderate: 'bg-amber-100 text-amber-800 border-amber-300',
  challenging: 'bg-red-100 text-red-800 border-red-300',
};

function ChargingStopTable({ stops }: { stops: Station[] }) {
  if (stops.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <BatteryCharging size={32} className="mx-auto text-gray-300 mb-2" />
        <p className="text-sm text-gray-500">No charging station data available for this route yet.</p>
        <p className="text-xs text-gray-400 mt-1">We&apos;re adding station data for this route soon.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Station</th>
            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Speed</th>
            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amenities</th>
            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">24/7</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {stops.map((station) => {
            const tier = scoreTier(
              Math.round(
                (station.reliability / 5) * 40 + 
                Math.min(station.chargerSpeed / 250, 1) * 35 + 
                ([station.hasRestroomNearby, station.hasFoodNearby, station.hasCoveredParking, station.has24by7Access, station.isMallParking].filter(Boolean).length / 5) * 25
              )
            );
            const amenityCount = [station.hasRestroomNearby, station.hasFoodNearby, station.hasCoveredParking, station.isMallParking].filter(Boolean).length;
            return (
              <tr key={station.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-3">
                  <Link href={`/station/${station.id}`} className="font-medium text-gray-900 hover:text-sky-600 transition-colors">
                    {station.name}
                  </Link>
                  <div className="text-xs text-gray-400">{station.operator}</div>
                </td>
                <td className="py-3 px-3 text-gray-600">{station.city}</td>
                <td className="py-3 px-3 text-center">
                  <span className="font-semibold text-gray-900">{station.chargerSpeed}</span>
                  <span className="text-xs text-gray-400">kW</span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${tier.color}`}>
                    {tier.label}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {station.hasRestroomNearby && <span title="Restroom" className="text-xs">🚻</span>}
                    {station.hasFoodNearby && <span title="Food" className="text-xs">🍽️</span>}
                    {station.hasCoveredParking && <span title="Covered Parking" className="text-xs">🅿️</span>}
                    {station.isMallParking && <span title="Mall" className="text-xs">🏬</span>}
                    {amenityCount === 0 && <span className="text-gray-300 text-xs">—</span>}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{amenityCount}/4</div>
                </td>
                <td className="py-3 px-3 text-center">
                  {station.has24by7Access ? (
                    <span className="text-emerald-600 text-xs font-medium">✓</span>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function KidFriendlyStopsSection({ stops }: { stops: Station[] }) {
  const kidFriendly = stops.filter(s => s.hasRestroomNearby && s.hasFoodNearby && (s.hasCoveredParking || s.isMallParking));
  
  if (kidFriendly.length === 0) {
    return (
      <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-6">
        <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Users size={18} className="text-pink-500" /> Kid-Friendly Stops
        </h3>
        <p className="text-sm text-pink-700">
          We&apos;re collecting family-friendly station data for this route. Check back soon for kid-approved charging stops with playgrounds, family restaurants, and safe parking nearby.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-6">
      <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Users size={18} className="text-pink-500" /> Kid-Friendly Stops
      </h3>
      <p className="text-xs text-pink-600 mb-4">
        These stations have restrooms, food nearby, and covered or mall parking — ideal for families traveling with young children.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {kidFriendly.map((station) => (
          <Link
            key={station.id}
            href={`/station/${station.id}`}
            className="bg-white rounded-xl border border-pink-200 p-4 hover:shadow-md hover:border-pink-300 transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {station.name}
                </div>
                <div className="text-xs text-gray-500">{station.city}</div>
              </div>
              <span className="shrink-0 text-lg">👶</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">⚡ {station.chargerSpeed}kW</span>
              <span className="flex items-center gap-1">🚻 {station.hasRestroomNearby ? 'Yes' : 'No'}</span>
              <span className="flex items-center gap-1">🍽️ {station.hasFoodNearby ? 'Yes' : 'No'}</span>
            </div>
            <div className="mt-2 text-xs text-pink-500 font-medium flex items-center gap-1">
              View station <ChevronRight size={12} />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 p-3 bg-white/80 rounded-lg border border-pink-100">
        <h4 className="text-xs font-semibold text-gray-700 mb-1.5">🅿️ Nearby Family Activities</h4>
        <p className="text-xs text-gray-500">
          These stations are located near family-friendly areas with playgrounds, kid-friendly restaurants, and safe walkable zones. 
          Many are inside shopping malls with dedicated play areas and family restrooms.
        </p>
      </div>
    </div>
  );
}

function LuxuryStaysSection({ stops }: { stops: Station[] }) {
  const luxury = stops.filter(s => {
    const amenityCount = [s.hasRestroomNearby, s.hasFoodNearby, s.hasCoveredParking, s.has24by7Access].filter(Boolean).length;
    return s.reliability >= 4.0 && s.chargerSpeed >= 100 && amenityCount >= 2;
  });

  return (
    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-6">
      <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Crown size={18} className="text-amber-500" /> Luxury Stay Recommendations
      </h3>
      <p className="text-xs text-amber-600 mb-4">
        Premium accommodation near top-rated charging stations along this route. Book through our trusted partner Booking.com.
      </p>
      
      {/* Book hotels CTA */}
      <div className="mb-4">
        <a
          href={getItineraryBySlug(slugToItineraryMap[Object.keys(slugToItineraryMap).find(k => stops.some(s => getItineraryBySlug(slugToItineraryMap[k])?.cities.includes(s.city)))? '' : 'bangkok-to-phuket-road-trip'] || 'bangkok-to-phuket-road-trip')?.affiliateHotelUrl || '#'}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm"
        >
          <ExternalLink size={14} />
          Book Luxury Hotels on Booking.com
        </a>
      </div>
      
      {/* Luxury-adjacent stations */}
      {luxury.length > 0 && (
        <>
          <h4 className="text-xs font-semibold text-amber-700 mb-2">Premium Charging Stations Near Luxury Hotels</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {luxury.map((station) => (
              <Link
                key={station.id}
                href={`/station/${station.id}`}
                className="bg-white rounded-lg border border-amber-200 p-3 hover:shadow-sm transition-all flex items-center gap-3"
              >
                <span className="text-lg shrink-0">⚡</span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{station.name}</div>
                  <div className="text-xs text-gray-500">{station.city} · {station.chargerSpeed}kW · ★{station.reliability}</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Suggested hotels near route */}
      <div className="mt-4 p-3 bg-white/80 rounded-lg border border-amber-100">
        <h4 className="text-xs font-semibold text-gray-700 mb-1.5">🏨 Suggested Luxury Hotels</h4>
        <ul className="space-y-1 text-xs text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">✦</span>
            <span>Look for hotels with EV charging stations in their parking or valet service</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">✦</span>
            <span>Filter Booking.com for "EV charging" under hotel amenities</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">✦</span>
            <span>Many 5-star properties now offer complimentary overnight charging for guests</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default async function ItineraryDetailPage({ params }: Props) {
  const it = getItineraryBySlug(slugToItineraryMap[params.slug] || params.slug);
  if (!it) notFound();

  const stations = stationsData as Station[];
  const routeStations = getRouteStations(stations, params.slug);
  const recommendedStops = getRecommendedStops(stations, params.slug);
  const totalChargingStops = countRouteChargingStops(stations, params.slug);
  const routeCities = getRouteCities(params.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <Link href="/routes" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={14} /> All routes
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link> <span>/</span>
          <Link href="/routes" className="hover:text-gray-700">Routes</Link> <span>/</span>
          <span className="text-gray-900 font-medium">{it.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white via-amber-50/30 to-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColors[it.difficulty] || difficultyColors.easy} capitalize`}>
              {it.difficulty === 'easy' ? '🟢' : it.difficulty === 'moderate' ? '🟡' : '🔴'} {it.difficulty}
            </span>
            <span className="px-2.5 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium border border-sky-200">
              {it.duration}
            </span>
            <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
              🌿 {it.bestSeason}
            </span>
            {it.countries.length > 1 && (
              <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
                🌏 {it.countries.length} countries
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{it.title}</h1>
          <p className="text-base text-gray-600 mb-6">{it.subtitle}</p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">{it.description}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="text-center p-3 bg-amber-50 rounded-xl border border-amber-100">
              <Route size={20} className="mx-auto text-amber-500 mb-1" />
              <div className="text-lg font-bold text-gray-900">{it.totalDistanceKm}</div>
              <div className="text-xs text-gray-500">Total km</div>
            </div>
            <div className="text-center p-3 bg-sky-50 rounded-xl border border-sky-100">
              <Clock size={20} className="mx-auto text-sky-500 mb-1" />
              <div className="text-lg font-bold text-gray-900">{it.totalDrivingHours}h</div>
              <div className="text-xs text-gray-500">Est. driving</div>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <BatteryCharging size={20} className="mx-auto text-emerald-500 mb-1" />
              <div className="text-lg font-bold text-gray-900">{totalChargingStops || it.estimatedChargingStops}+</div>
              <div className="text-xs text-gray-500">Charging stops</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
              <Calendar size={20} className="mx-auto text-purple-500 mb-1" />
              <div className="text-lg font-bold text-gray-900">{it.days.length}</div>
              <div className="text-xs text-gray-500">Days</div>
            </div>
          </div>

          {/* Route cities */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-4">
            <MapPin size={14} className="text-red-400 shrink-0" />
            <span className="font-medium">Route:</span>
            <span className="text-gray-500">{it.cities.join(' → ')}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {it.tags.slice(0, 8).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-medium">
                #{tag}
              </span>
            ))}
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

        {/* Highway Conditions */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800 mb-0.5">🚗 Highway Conditions</h4>
              <p className="text-xs text-amber-700">{it.highwayConditions}</p>
            </div>
          </div>
        </div>

        {/* Charging Tips */}
        <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <BatteryCharging size={16} className="text-sky-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-sky-800 mb-0.5">🔋 Charging Tips</h4>
              <p className="text-xs text-sky-700">{it.chargingTips}</p>
            </div>
          </div>
        </div>

        {/* ===== SEASONAL RECOMMENDATIONS ===== */}
        <div className="mb-6">
          <SeasonalRecommendations bestSeason={it.bestSeason} countries={it.countries} />
        </div>

        {/* ===== SEASONAL COMPARISON TABLE ===== */}
        <div className="mb-6">
          <SeasonalComparisonTable bestSeason={it.bestSeason} countries={it.countries} totalDistanceKm={it.totalDistanceKm} estimatedRangeKm={400} />
        </div>

        {/* ===== SEO STRUCTURED DATA ===== */}
        <ItinerarySEOSection itinerary={it} />

        {/* ===== RECOMMENDED CHARGING STOPS TABLE ===== */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BatteryCharging size={20} className="text-emerald-500" />
            Recommended Charging Stops
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Top-rated charging stations along this route, sorted by reliability and amenities.
            {routeCities.length > 0 && <span> Covers: <strong>{routeCities.join(', ')}</strong></span>}
          </p>
          <ChargingStopTable stops={recommendedStops} />
        </div>

        {/* ===== KID-FRIENDLY STOPS ===== */}
        <div className="mb-6">
          <KidFriendlyStopsSection stops={recommendedStops} />
        </div>

        {/* ===== LUXURY STAYS ===== */}
        <div className="mb-6">
          <LuxuryStaysSection stops={recommendedStops} />
        </div>

        {/* ===== BOOK EV RENTAL CTA ===== */}
        <div className="bg-gradient-to-br from-gray-50 to-sky-50/70 border border-sky-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            🚗 Book This EV Rental
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Rent an electric vehicle for this road trip. Our partners offer Tesla, Polestar, Hyundai IONIQ, and more — delivered to your starting city.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={it.affiliateRentalUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-3 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all shadow-sm text-sm font-medium"
            >
              <Zap size={18} />
              <span className="flex-1">{it.affiliateRentalLabel}</span>
              <ExternalLink size={14} className="opacity-60" />
            </a>
            <a
              href={it.affiliateTourUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-3 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-sm text-sm font-medium"
            >
              <Users size={18} />
              <span className="flex-1">{it.affiliateTourLabel}</span>
              <ExternalLink size={14} className="opacity-60" />
            </a>
          </div>
          <p className="text-[10px] text-gray-400 mt-3">
            We earn a commission at no extra cost to you when you book through these links.
          </p>
        </div>

        {/* ===== ROUTE POPULARITY ===== */}
        <RoutePopularity routeId={it.id} routeName={it.title} />

        {/* ===== NEWSLETTER SIGNUP ===== */}
        <NewsletterSignup variant="inline" source={`itinerary-${it.slug}`} />

        {/* ===== RELATED BLOG POSTS ===== */}
        <RelatedBlogPosts keywords={it.tags} countries={it.countries} limit={3} />

        {/* ===== TRAVELER TIPS & REVIEWS ===== */}
        <OptimisticTipsSection routeSlug={params.slug} routeName={it.title} />

        {/* ===== REVENUE: EV Road Trip CTA + Premium Partners + Packages ===== */}
        <ItineraryRevenueSection country={it.countries[0] || ''} />

        {/* ===== HIGHLIGHTS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-pink-800 mb-2 flex items-center gap-1">
              👨‍👩‍👧‍👦 Family Highlights
            </h4>
            <ul className="space-y-1.5">
              {it.familyHighlights.map((h, i) => (
                <li key={i} className="text-xs text-pink-700 flex items-start gap-1.5">
                  <span className="shrink-0 text-pink-400">✓</span>
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
                  <span className="shrink-0 text-amber-500">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== DAY-BY-DAY ===== */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Day-by-Day Itinerary</h2>
          <div className="space-y-4">
            {it.days.map((day, idx) => (
              <div key={day.day} className="relative pl-10">
                {idx < it.days.length - 1 && (
                  <div className="absolute left-[15px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 to-sky-100" />
                )}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                  {day.day}
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-bold text-gray-900">{day.title}</h3>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{day.distanceKm}km · {day.drivingTimeHours}h</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{day.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    {day.suggestedStops.length > 0 && (
                      <div className="p-3 bg-sky-50 rounded-lg border border-sky-100">
                        <h4 className="text-xs font-semibold text-sky-700 mb-1.5 flex items-center gap-1">🔌 Charging Stops</h4>
                        <ul className="space-y-1">
                          {day.suggestedStops.map((stop, si) => (
                            <li key={si} className="text-xs text-sky-600 flex items-start gap-1">
                              <span>•</span>
                              <span>{stop}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {day.kidFriendlyStops.length > 0 && (
                      <div className="p-3 bg-pink-50 rounded-lg border border-pink-100">
                        <h4 className="text-xs font-semibold text-pink-700 mb-1.5 flex items-center gap-1">👨‍👩‍👧‍👦 Family Fun</h4>
                        <ul className="space-y-1">
                          {day.kidFriendlyStops.map((stop, si) => (
                            <li key={si} className="text-xs text-pink-600 flex items-start gap-1">
                              <span>•</span>
                              <span>{stop}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {day.luxuryRecommendation && (
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <h4 className="text-xs font-semibold text-amber-700 mb-1 flex items-center gap-1">👑 Luxury Stay</h4>
                      <a href={day.luxuryBookingUrl} target="_blank" rel="noopener noreferrer sponsored"
                        className="text-sm font-medium text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1">
                        {day.luxuryRecommendation}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {day.mealTips && (
                    <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-500">
                      <Utensils size={12} className="text-gray-400 shrink-0 mt-0.5" />
                      <span>{day.mealTips}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BOOKING AFFILIATE BANNER AT BOTTOM ===== */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Ready for the road?</h3>
              <p className="text-sm text-white/80">
                Book your luxury accommodation along this route with Booking.com
              </p>
            </div>
            <a
              href={it.affiliateHotelUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="shrink-0 px-6 py-3 bg-white text-amber-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-md flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Browse Hotels
            </a>
          </div>
        </div>

        {/* ===== RELATED ROUTES ===== */}
        {(() => { const related = getRelatedItineraries(slugToItineraryMap[params.slug] || params.slug, 2); if (related.length === 0) return null; return (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Similar EV Road Trips You Might Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map(r => (
                <ItineraryCard key={r.id} itinerary={r} />
              ))}
            </div>
          </div>
        ); })()}

        {/* ===== STATION MAP LINK ===== */}
        <div className="text-center mb-8">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium shadow-sm"
          >
            <MapPin size={16} />
            View All Charging Stations on Map
          </Link>
        </div>

        {/* ===== JSON-LD PART 1: FAQPage (server-side) ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `How long does the ${it.title} EV road trip take?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `The complete ${it.title} road trip takes ${it.duration} covering ${it.totalDistanceKm} km with ${it.totalDrivingHours} hours of total driving time. You'll need ${it.estimatedChargingStops}+ charging stops along the way.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `Is the ${it.title} route suitable for families with kids?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `This route is designed with families in mind. It includes ${it.familyHighlights.length} family-friendly highlights such as ${it.familyHighlights.slice(0, 3).map(h => h.split('—')[0].trim()).join(', ')}. The difficulty is ${it.difficulty} with ${it.totalDrivingHours} hours of driving spread over ${it.duration}.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What is the best time of year for ${it.title}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `The best season for this route is ${it.bestSeason}. The route passes through ${it.cities.join(', ')}. We recommend planning your trip during the recommended season for the best weather and road conditions.`,
                  },
                },
              ],
            }),
          }}
        />

        {/* ===== JSON-LD PART 2: Trip + TouristicRoute ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Trip',
              name: it.title,
              description: it.description.slice(0, 300),
              url: `https://ev-charging-asia.vercel.app/itinerary/${params.slug}`,
              itineraryType: 'Route',
              subTrip: it.days.map(day => ({
                '@type': 'Trip',
                name: day.title,
                description: day.description.slice(0, 200),
                startDate: undefined,
                endDate: undefined,
                departureLocation: { '@type': 'City', name: day.startCity },
                arrivalLocation: { '@type': 'City', name: day.endCity },
                distance: { '@type': 'Distance', name: `${day.distanceKm} km` },
              })),
              offers: {
                '@type': 'Offer',
                url: it.affiliateHotelUrl,
                availability: 'https://schema.org/InStock',
              },
              provider: {
                '@type': 'Organization',
                name: 'EV Charging Asia',
                url: 'https://ev-charging-asia.vercel.app',
              },
            }),
          }}
        />

      </div>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Zap size={16} className="text-green-500" />
              <span className="text-sm">EV Charging Asia</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link href="/routes" className="hover:text-gray-600">All Routes</Link>
              <Link href="/search" className="hover:text-gray-600">Chargers</Link>
              <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-400">
            <span className="text-gray-500 font-medium">Sister Sites:</span>
            <a href="https://www.familytravelasia.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition">
              🌏 Family Travel Asia
            </a>
            <a href="https://luxury-family-travel-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition">
              ✨ Luxury Family Travel Asia
            </a>
            <a href="https://apifeny-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition">
              🤖 AI Tools Directory
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
