import { Metadata } from 'next';
import Link from 'next/link';
import { Star, MapPin, ChevronRight, Filter, Accessibility, Thermometer } from 'lucide-react';
import { getAllDestinations, Destination } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Senior-Friendly Destinations in Asia',
  description: 'Curated directory of senior-friendly destinations across Asia. Each destination is rated for accessibility, healthcare access, and comfort for the 60+ traveler.',
  openGraph: {
    title: 'Senior-Friendly Travel Asia — Destinations',
    description: 'Find accessible destinations across Asia with senior-friendly ratings, transport info, and healthcare access.',
  },
};

const COUNTRY_FLAGS: Record<string, string> = {
  'Singapore': '🇸🇬',
  'Taiwan': '🇹🇼',
  'Hong Kong': '🇭🇰',
  'Thailand': '🇹🇭',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Malaysia': '🇲🇾',
  'Vietnam': '🇻🇳',
  'Indonesia': '🇮🇩',
  'Philippines': '🇵🇭',
  'Cambodia': '🇰🇭',
  'Myanmar': '🇲🇲',
  'Laos': '🇱🇦',
  'Sri Lanka': '🇱🇰',
  'India': '🇮🇳',
  'Nepal': '🇳🇵',
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8.5 ? 'bg-emerald-100 text-emerald-700' :
    score >= 7.5 ? 'bg-amber-100 text-amber-700' :
    'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      <Star className="w-3 h-3 fill-current" />
      {score.toFixed(1)}
    </span>
  );
}

function AccessibilityBar({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`w-2 h-2 rounded-full ${n <= level ? 'bg-teal-500' : 'bg-gray-200'}`}
        />
      ))}
      <span className="text-[11px] text-gray-400 ml-1">
        {level === 5 ? 'Excellent' : level === 4 ? 'Great' : level === 3 ? 'Good' : 'Basic'}
      </span>
    </div>
  );
}

export default function DestinationsPage() {
  const destinations = getAllDestinations();
  const topTier = destinations.filter((d) => d.tier <= 2);
  const rest = destinations.filter((d) => d.tier > 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-teal-700 font-semibold">
            <Accessibility className="w-5 h-5" />
            <span>Senior-Friendly Travel Asia</span>
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Page header */}
        <div className="mb-10">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Destinations</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1 mb-3">
            Senior-Friendly Destinations in Asia
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            {destinations.length} cities and regions across Asia reviewed for accessibility, 
            healthcare quality, transport ease, and overall comfort for the 60+ traveler.
          </p>
        </div>

        {/* Top Tier Destinations */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
            Top-Rated Destinations
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
            {topTier.map((dest) => (
              <div key={dest.slug} className="animate-fade-in">
                <DestinationCard dest={dest} />
              </div>
            ))}
          </div>
        </div>

        {/* All Destinations */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Destinations</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
            {rest.map((dest) => (
              <div key={dest.slug} className="animate-fade-in">
                <DestinationCard dest={dest} />
              </div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {destinations.length === 0 && (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">Destinations loading soon</h3>
            <p className="text-gray-400 mt-1">We&apos;re adding new senior-friendly destinations regularly.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-gray-500">
          <p>&copy; 2026 Senior-Friendly Travel Asia</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-teal-600">About</Link>
            <Link href="/privacy" className="hover:text-teal-600">Privacy</Link>
            <Link href="/contact" className="hover:text-teal-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-700 transition-colors">
            {COUNTRY_FLAGS[dest.country] || '🌏'} {dest.name}
          </h3>
          <ScoreBadge score={dest.score} />
        </div>
        <p className="text-xs text-gray-500 mb-2">{dest.country}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{dest.description}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Accessibility className="w-3.5 h-3.5 text-teal-500" />
            <AccessibilityBar level={dest.accessibility} />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Thermometer className="w-3.5 h-3.5 text-orange-400" />
            <span>{dest.bestTime}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin className="w-3 h-3" />
            <span>{dest.topSpots.length} senior-friendly spots</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
