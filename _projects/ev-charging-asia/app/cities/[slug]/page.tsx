import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Zap, MapPin, BatteryCharging, ExternalLink, ArrowLeft, Car, Hotel, AlertTriangle } from 'lucide-react';
import { cityEVGuides } from '@/data/cities';
import { getAllItineraries } from '@/data/itineraries';
import ItineraryCard from '@/components/itineraries/ItineraryCard';
import SiteFooter from '@/components/SiteFooter';
import { BreadcrumbSchemaSSR } from '@/components/SchemaOrg';

interface Props {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return cityEVGuides.map(city => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityEVGuides.find(c => c.slug === params.slug);
  if (!city) return { title: 'City Not Found' };

  return {
    title: `${city.name} EV Charging Guide — Stations, Parking & Tips | EV Charging Asia`,
    description: `Complete EV charging guide for ${city.name}, ${city.country}. ${city.chargerTypes.join(', ')} chargers, top networks (${city.topChargerNetworks.slice(0, 3).join(', ')}), cost per kWh, parking tips, and best EV-friendly hotels.`,
    alternates: {
      canonical: `https://ev-charging-asia.vercel.app/cities/${city.slug}`,
    },
    openGraph: {
      title: `${city.name} EV Charging Guide — EV Charging Asia`,
      description: `Complete EV charging guide for ${city.name}. ${city.chargerTypes.length} charger types, ${city.costPerKwh} average cost, and EV-friendly hotels.`,
      url: `https://ev-charging-asia.vercel.app/cities/${city.slug}`,
      type: 'article',
      locale: 'en_US',
      siteName: 'EV Charging Asia',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${city.name} EV Charging Guide`,
      description: `Complete EV charging guide for ${city.name}. Find stations, costs, and parking tips.`,
    },
    other: {
      keywords: city.tags.join(', '),
    },
  };
}

const starRating = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default function CityEVGuidePage({ params }: Props) {
  const city = cityEVGuides.find(c => c.slug === params.slug);
  if (!city) notFound();

  const allItineraries = getAllItineraries();
  const nearbyRoutes = allItineraries.filter(it => city.nearbyRoutes.includes(it.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Guide',
    name: `${city.name} EV Charging Guide`,
    description: `Complete EV charging and parking guide for electric vehicle drivers visiting ${city.name}, ${city.country}.`,
    url: `https://ev-charging-asia.vercel.app/cities/${city.slug}`,
    about: {
      '@type': 'City',
      name: city.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressCountry: city.countryCode,
      },
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Electric vehicle drivers',
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What charging connector does ${city.name} use?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `The standard connector in ${city.name} is ${city.connectorStandard}. Available types include ${city.chargerTypes.join(', ')}.`,
          },
        },
        {
          '@type': 'Question',
          name: `How much does EV charging cost in ${city.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Typical EV charging costs in ${city.name} are approximately ${city.costPerKwh}. Prices vary by network and charger speed.`,
          },
        },
        {
          '@type': 'Question',
          name: `What are the best EV charging networks in ${city.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Top charging networks in ${city.name} include ${city.topChargerNetworks.join(', ')}.`,
          },
        },
        {
          '@type': 'Question',
          name: `Which hotels in ${city.name} have EV charging?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `EV-friendly hotels in ${city.name} include ${city.bestEVHotels.join(', ')}. Book in advance for guaranteed parking.`,
          },
        },
      ],
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
          <Link href="/cities" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={14} /> All city guides
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link> <span>/</span>
          <Link href="/cities" className="hover:text-gray-700">Cities</Link> <span>/</span>
          <span className="text-gray-900 font-medium">{city.name}</span>
        </div>

        {/* Hero */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              city.evFriendlyRating >= 4
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : city.evFriendlyRating >= 3
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-red-100 text-red-800 border-red-300'
            }`}>
              EV-friendly: {starRating(city.evFriendlyRating)}
            </span>
            <span className="px-2.5 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium border border-sky-200">
              {city.country}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {city.name} EV Charging Guide
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">{city.description}</p>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <BatteryCharging size={18} className="mx-auto text-emerald-500 mb-1" />
              <div className="text-xs font-bold text-gray-900">{city.chargerTypes.join(', ')}</div>
              <div className="text-[10px] text-gray-500">Charger types</div>
            </div>
            <div className="text-center p-3 bg-sky-50 rounded-xl border border-sky-100">
              <Car size={18} className="mx-auto text-sky-500 mb-1" />
              <div className="text-xs font-bold text-gray-900">{city.typicalSpeed}</div>
              <div className="text-[10px] text-gray-500">Typical speed</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
              <MapPin size={18} className="mx-auto text-purple-500 mb-1" />
              <div className="text-xs font-bold text-gray-900">{city.population}</div>
              <div className="text-[10px] text-gray-500">Population</div>
            </div>
          </div>

          {/* Cost per kWh */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-amber-800 mb-0.5">💰 Typical Charging Cost</h4>
                <p className="text-2xl font-bold text-gray-900">{city.costPerKwh}</p>
              </div>
              <span className="text-xs text-amber-600">per kWh</span>
            </div>
          </div>
        </div>

        {/* Connector & Networks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              🔌 Connector Standard
            </h3>
            <p className="text-sm text-gray-700 mb-3">{city.connectorStandard}</p>
            <div className="flex flex-wrap gap-1.5">
              {city.chargerTypes.map((ct, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700 border border-gray-200">
                  {ct}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              ⚡ Top Charging Networks
            </h3>
            <ul className="space-y-1.5">
              {city.topChargerNetworks.map((net, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                  {net}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Parking tips */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800 mb-0.5">🅿️ Parking Tips</h4>
              <p className="text-xs text-amber-700">{city.parkingTips}</p>
            </div>
          </div>
        </div>

        {/* EV-friendly hotels */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Hotel size={18} className="text-blue-500" />
            Best EV-Friendly Hotels in {city.name}
          </h3>
          <ul className="space-y-2">
            {city.bestEVHotels.map((hotel, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-500 shrink-0">✦</span>
                <span>{hotel}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-400">
            Always confirm EV charging availability with the hotel before booking — facilities may change.
          </p>
        </div>

        {/* Nearby routes */}
        {nearbyRoutes.length > 0 && (
          <div className="border-t border-gray-200 pt-8 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              🚗 EV Road Trips through {city.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyRoutes.map(r => (
                <ItineraryCard key={r.id} itinerary={r} />
              ))}
            </div>
          </div>
        )}

        {/* Compare CTA */}
        <div className="mb-8">
          <Link
            href={`/compare?cities=${encodeURIComponent(city.name)}`}
            className="block bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">🔄 Compare Routes Through {city.name}</h3>
                <p className="text-xs text-gray-600">See how EV road trips through {city.name} compare on distance, difficulty, and highlights.</p>
              </div>
              <ExternalLink size={18} className="text-sky-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'Cities', url: '/cities' },
        { name: `${city.name} EV Guide`, url: `/cities/${city.slug}` },
      ]} />

      <SiteFooter />
    </div>
  );
}
