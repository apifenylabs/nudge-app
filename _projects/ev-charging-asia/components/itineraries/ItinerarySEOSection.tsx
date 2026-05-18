'use client';

import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { Itinerary } from '@/data/itineraries';

interface ItinerarySEOSectionProps {
  itinerary: Itinerary;
}

/**
 * SEO-rich FAQ accordion section for itinerary detail pages.
 * Generates question/answer pairs based on route data for Google rich results.
 * Also outputs visible FAQ content users can interact with.
 */
export default function ItinerarySEOSection({ itinerary }: ItinerarySEOSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: `How long does the ${itinerary.title} EV road trip take?`,
      answer: `The complete ${itinerary.title} road trip takes ${itinerary.duration} (${itinerary.days.length} days) and covers ${itinerary.totalDistanceKm} km with approximately ${itinerary.totalDrivingHours} hours of total driving time. You'll need about ${itinerary.estimatedChargingStops}+ charging stops along the way.`,
    },
    {
      question: `What is the best time of year to drive ${itinerary.title.split(':')[0] || 'this route'}?`,
      answer: `The best season for this route is ${itinerary.bestSeason}. The road conditions are ${itinerary.countries[0] ? `typical for ${itinerary.countries[0]} — ` : ''}${itinerary.highwayConditions.split('.')[0].toLowerCase()}. We recommend planning your trip during the recommended season for the best experience.`,
    },
    {
      question: `How many charging stops do I need for the ${itinerary.title} route?`,
      answer: `You can expect approximately ${itinerary.estimatedChargingStops}+ charging stops along the ${itinerary.totalDistanceKm} km route${itinerary.cities.length > 0 ? ` through ${itinerary.cities.join(', ')}` : ''}.${itinerary.chargingTips ? ` ${itinerary.chargingTips.split('.')[0]}.` : ''}`,
    },
    {
      question: `Is ${itinerary.title.split(':')[0] || 'this road trip'} suitable for families with kids?`,
      answer: `Yes! This route is designed with families in mind. It includes ${itinerary.familyHighlights.length} family-friendly highlights such as ${itinerary.familyHighlights.slice(0, 3).map(h => h.split('—')[0].trim()).join(', ')}. The difficulty is rated as "${itinerary.difficulty}" with ${itinerary.totalDrivingHours} hours of total driving spread over ${itinerary.duration}.`,
    },
    {
      question: `What type of EV charging connector do I need for ${itinerary.countries.join(' & ')}?`,
      answer: itinerary.countries.includes('Japan')
        ? 'Japan uses the CHAdeMO standard for fast charging, not CCS2. All expressway service areas have NCS (Next Charge) or e-Mobility Power CHAdeMO chargers. Make sure your EV or rental supports CHAdeMO.'
        : itinerary.countries.includes('China')
        ? 'China uses the GB/T standard for EV charging. You will need a vehicle with GB/T compatibility. CCS2 and CHAdeMO are not standard in mainland China.'
        : itinerary.countries.includes('India')
        ? 'India primarily uses CCS2 for fast charging. Tata Power and Reliance BP are the main operators. Charging infrastructure is concentrated on major highways and in metro areas.'
        : `${itinerary.countries.join(' and ')} primarily use CCS2 for fast charging and Type 2 for AC charging. Most newer EVs and rentals support CCS2. Some older Japanese EVs may use CHAdeMO.`,
    },
    {
      question: `Where can I stay along the ${itinerary.title} route?`,
      answer: `Luxury hotels along this route include: ${itinerary.luxuryHighlights.slice(0, 3).map(h => h.split('—')[0].trim()).join(', ')}. You can book through our Booking.com partner link for the best rates on EV-friendly accommodations with charging facilities.`,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        ❓ Frequently Asked Questions
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Everything you need to know about planning this EV road trip.
      </p>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              {openIndex === i ? (
                <ChevronUp size={16} className="text-gray-400 shrink-0" />
              ) : (
                <ChevronDown size={16} className="text-gray-400 shrink-0" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                <p>{faq.answer}</p>
                {i === faqs.length - 1 && (
                  <a
                    href={itinerary.affiliateHotelUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg transition-all"
                  >
                    <ExternalLink size={12} />
                    Browse Hotels for This Route
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* JSON-LD structured FAQ data (invisible, embedded here for SSR compatibility) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
