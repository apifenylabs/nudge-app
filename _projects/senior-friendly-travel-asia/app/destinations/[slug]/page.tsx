import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, MapPin, Accessibility as AccessibilityIcon, Thermometer, Check, Lightbulb, ChevronRight, Heart, Train, Stethoscope } from 'lucide-react';
import { getDestinationBySlug, getAllDestinations } from '@/lib/data';
import DestinationGallery from '@/components/DestinationGallery';
import { hotelSearchLink, tourSearchLink, getPartner } from '@/lib/affiliate';

const BASE_URL = 'https://seniorfriendlytravel.asia';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) return { title: 'Destination Not Found' };

  return {
    title: `${dest.name} Travel Guide for Seniors — Senior-Friendly Travel Asia`,
    description: dest.description.slice(0, 158),
    keywords: [...dest.seoKeywords, 'senior travel', 'accessible travel', dest.country, dest.name].join(', '),
    alternates: {
      canonical: `${BASE_URL}/destinations/${dest.slug}`,
    },
    openGraph: {
      title: `${dest.name} — Senior-Friendly Travel Guide`,
      description: dest.description.slice(0, 158),
      url: `${BASE_URL}/destinations/${dest.slug}`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

function renderAccessibilityStars(level: number) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`w-3 h-3 rounded-full ${n <= level ? 'bg-teal-500' : 'bg-gray-200'}`}
        />
      ))}
      <span className="text-sm text-gray-500 ml-2">
        {level === 5 ? 'Excellent' : level === 4 ? 'Great' : level === 3 ? 'Good' : 'Fair'}
      </span>
    </div>
  );
}

export default function DestinationPage({ params }: Props) {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) notFound();

  // Generate affiliate links based on destination content
  const hotelLink = hotelSearchLink(`${dest.name} ${dest.country} hotels`);
  const tourLink = tourSearchLink(`${dest.name} ${dest.country}`);

  const booking = getPartner('booking');
  const klook = getPartner('klook');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelDestination',
            name: dest.name,
            description: dest.description,
            address: { '@type': 'PostalAddress', addressCountry: dest.country },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: dest.score,
              bestRating: 10,
              ratingCount: 1,
            },
          }),
        }}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-teal-700 font-semibold text-sm">
            <AccessibilityIcon className="w-5 h-5" />
            <span>Senior-Friendly Travel</span>
          </Link>
          <Link href="/destinations" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> All destinations
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">{dest.country}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{dest.name}</h1>
            </div>
            <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-xl">{dest.score}</span>
              <span className="text-teal-600 text-sm">/ 10</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">{dest.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Quick Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold mb-2">
                    <AccessibilityIcon className="w-4 h-4" />
                    Accessibility
                  </div>
                  {renderAccessibilityStars(dest.accessibility)}
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-700 text-sm font-semibold mb-2">
                    <Thermometer className="w-4 h-4" />
                    Best Time
                  </div>
                  <p className="text-sm text-gray-700">{dest.bestTime}</p>
                </div>
              </div>
            </div>

            {/* Top Spots */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-500" />
                Top Senior-Friendly Spots
              </h2>
              <div className="space-y-4">
                {dest.topSpots.map((spot, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{spot.name}</h3>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div
                            key={n}
                            className={`w-2 h-2 rounded-full ${n <= spot.accessibility ? 'bg-teal-500' : 'bg-gray-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{spot.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Train className="w-5 h-5 text-teal-500" />
                Getting Around
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{dest.transport}</p>
            </div>

            {/* Healthcare */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-500" />
                Healthcare Access
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{dest.healthcare}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                Why Seniors Love {dest.name}
              </h2>
              <ul className="space-y-2">
                {dest.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Tips */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Practical Tips
              </h2>
              <ul className="space-y-2">
                {dest.practicalTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-teal-500 font-bold">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            {dest.galleryImages && dest.galleryImages.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <DestinationGallery images={dest.galleryImages} title={`${dest.name} Gallery`} />
              </div>
            )}
          </div>

          {/* Sidebar — Affiliate CTAs + Quick Info */}
          <div className="space-y-6">
            {/* Booking Affiliate */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Plan Your Trip</h3>
              
              {booking && (
                <a
                  href={hotelLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full mb-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-xl text-center transition-all shadow-sm hover:shadow-md"
                >
                  {booking.icon} Find Hotels in {dest.name}
                </a>
              )}

              {klook && (
                <a
                  href={tourLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full mb-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-xl text-center transition-all shadow-sm hover:shadow-md"
                >
                  {klook.icon} Book Tours & Activities
                </a>
              )}

              <div className="border-t border-gray-100 pt-4 mt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Destination Info</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Country</span>
                    <span className="font-medium text-gray-900">{dest.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Senior Score</span>
                    <span className="font-medium text-gray-900">{dest.score}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spots</span>
                    <span className="font-medium text-gray-900">{dest.topSpots.length}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  When you book through these links, we may earn a small commission at no extra cost to you. 
                  It helps us keep this guide free and updated for all seniors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-gray-500">
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
