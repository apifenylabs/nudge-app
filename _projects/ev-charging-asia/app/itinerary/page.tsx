import { Metadata } from 'next';
import Link from 'next/link';
import { getAllItineraries } from '@/data/itineraries';
import { BreadcrumbSchemaSSR } from '@/components/SchemaOrg';

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
};

const difficultyBadges: Record<string, string> = {
  'easy': 'bg-emerald-100 text-emerald-700',
  'moderate': 'bg-amber-100 text-amber-700',
  'challenging': 'bg-red-100 text-red-700',
};

export default function ItinerariesPage() {
  const itineraries = getAllItineraries();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'Itineraries', url: '/itinerary' },
      ]} />
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <Link href="/search" className="hover:text-gray-900">Search</Link>
            <Link href="/routes" className="hover:text-gray-900">Routes</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Family EV Road Trip Itineraries</h1>
        <p className="text-gray-500 mb-8 max-w-2xl">
          Curated multi-day itineraries with charging stops, family activities, and luxury hotel recommendations. 
          Pick a route and hit the road.
        </p>

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

            return (
              <Link
                key={it.id}
                href={`/itinerary/${it.slug}`}
                className={`group bg-gradient-to-br ${bgColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${diffBadge}`}>
                    {it.difficulty.charAt(0).toUpperCase() + it.difficulty.slice(1)}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium bg-white/80 px-2 py-0.5 rounded-full">
                    {it.duration}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                  {it.title}
                </h2>
                <p className="text-xs text-gray-600 mb-4 line-clamp-2">{it.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-4 bg-white/60 rounded-lg px-3 py-2">
                  <span className="flex items-center gap-1">📏 {it.totalDistanceKm} km</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">⏱ {it.totalDrivingHours} hrs</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">🔌 {it.estimatedChargingStops} stops</span>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {it.familyHighlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="text-[9px] bg-white/80 text-gray-600 px-1.5 py-0.5 rounded-full">
                        👨‍👩‍👧‍👦 {h}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {it.luxuryHighlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[9px] bg-white/80 text-amber-700 px-1.5 py-0.5 rounded-full">
                        ✨ {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Countries */}
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  {it.countries.map((c, i) => (
                    <span key={c}>
                      {i > 0 && ' → '}
                      <span className="font-medium text-gray-500">{c}</span>
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-[10px] text-gray-400">
          <Link href="/" className="hover:text-gray-600">EV Charging Asia</Link> · Plan your family EV road trip
        </div>
      </footer>
    </div>
  );
}
