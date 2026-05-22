import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, MapPin, BatteryCharging, Search } from 'lucide-react';
import { cityEVGuides } from '@/data/cities';
import SiteFooter from '@/components/SiteFooter';
import { BreadcrumbSchemaSSR, ItemListSchema } from '@/components/SchemaOrg';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'City EV Charging Guides — Asia | EV Charging Asia',
  description: 'Comprehensive EV charging guides for major Asian cities. Find charging stations, costs, networks, connector types, and EV-friendly hotels in Bangkok, Singapore, Tokyo, Kuala Lumpur, Bali, and more.',
  alternates: {
    canonical: 'https://ev-charging-asia.vercel.app/cities',
  },
  openGraph: {
    title: 'City EV Charging Guides — Asia',
    description: 'EV charging guides for major Asian cities. Find stations, costs, networks, and EV-friendly hotels.',
    url: 'https://ev-charging-asia.vercel.app/cities',
    type: 'website',
    locale: 'en_US',
    siteName: 'EV Charging Asia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City EV Charging Guides — Asia',
    description: 'EV charging guides for major Asian cities. Find stations, costs, and tips.',
  },
  other: {
    keywords: 'city ev charging guide Asia, EV charging Asia cities, best cities for EV Asia, electric vehicle parking Asia, EV charging networks Asia',
  },
};

const starRating = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

const countryEmojis: Record<string, string> = {
  TH: '🇹🇭',
  SG: '🇸🇬',
  JP: '🇯🇵',
  MY: '🇲🇾',
  ID: '🇮🇩',
  HK: '🇭🇰',
  IN: '🇮🇳',
  VN: '🇻🇳',
  KR: '🇰🇷',
  PH: '🇵🇭',
  CN: '🇨🇳',
};

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ItemListSchema
        items={cityEVGuides.map(c => ({
          name: `${c.name} EV Charging Guide`,
          url: `/cities/${c.slug}`,
          description: `EV charging guide for ${c.name}. ${c.chargerTypes.length} charger types, costs, and parking tips.`,
        }))}
      />
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'City EV Guides', url: '/cities' },
      ]} />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/routes" className="hover:text-gray-900">Routes</Link>
            <Link href="/search" className="hover:text-gray-900">Chargers</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
              🏙️ EV City Guides
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            City EV Charging Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Everything you need to know about EV charging in Asia&apos;s major cities — connector types,
            charging networks, costs per kWh, parking tips, and the best EV-friendly hotels.
          </p>
        </div>
      </section>

      {/* City grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-sm text-gray-500 mb-6">
          {cityEVGuides.length} cities across Asia
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cityEVGuides.map(city => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="block bg-white rounded-2xl border border-gray-200 p-5 hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{countryEmojis[city.countryCode] || '🌏'}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{city.name}</h3>
                    <p className="text-xs text-gray-500">{city.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] text-gray-400 mr-1">EV</span>
                  <span className="text-emerald-600 text-xs">{starRating(city.evFriendlyRating)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {city.topChargerNetworks.slice(0, 3).map((net, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                    {net}
                  </span>
                ))}
                {city.topChargerNetworks.length > 3 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                    +{city.topChargerNetworks.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <BatteryCharging size={11} />
                  {city.chargerTypes.join(', ')}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {city.costPerKwh.substring(0, 12)}...
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Compare CTA */}
        <div className="mt-12">
          <Link
            href="/compare"
            className="block bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">🔄 Compare EV Routes Across Cities</h3>
                <p className="text-xs text-gray-600">See how road trips through different cities compare on distance, difficulty, and highlights.</p>
              </div>
              <span className="text-sky-600 text-sm font-medium">Compare →</span>
            </div>
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
