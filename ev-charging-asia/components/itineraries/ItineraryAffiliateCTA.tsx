'use client';

import { Car, Building2, Compass, ExternalLink } from 'lucide-react';
import type { Itinerary } from '@/data/itineraries';

interface Props {
  itinerary: Itinerary;
}

export default function ItineraryAffiliateCTA({ itinerary }: Props) {
  const buttons = [
    {
      label: itinerary.affiliateRentalLabel,
      url: itinerary.affiliateRentalUrl,
      icon: Car,
      desc: 'Book your EV for this route',
      color: 'bg-sky-600 hover:bg-sky-700',
    },
    {
      label: itinerary.affiliateHotelLabel,
      url: itinerary.affiliateHotelUrl,
      icon: Building2,
      desc: '5-star stays along the route',
      color: 'bg-amber-600 hover:bg-amber-700',
    },
    {
      label: itinerary.affiliateTourLabel,
      url: itinerary.affiliateTourUrl,
      icon: Compass,
      desc: 'Family-friendly excursions',
      color: 'bg-emerald-600 hover:bg-emerald-700',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-amber-50/50 rounded-xl border border-amber-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-3">📋 Plan Your Trip</h3>
      <p className="text-xs text-gray-500 mb-4">
        Book through our trusted partners to lock in the best rates for your family EV road trip.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {buttons.map((btn, i) => (
          <a
            key={i}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`flex items-center gap-2 px-4 py-3 ${btn.color} text-white text-sm font-medium rounded-lg transition-all active:scale-[0.98] shadow-sm`}
          >
            <btn.icon size={16} className="shrink-0" />
            <span className="flex-1">{btn.label}</span>
            <ExternalLink size={12} className="shrink-0 opacity-70" />
          </a>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-2">
        We earn a small commission at no extra cost to you when you book through these links.
      </p>
    </div>
  );
}
