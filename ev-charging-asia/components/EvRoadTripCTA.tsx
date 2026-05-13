'use client';

import { FC } from 'react';
import { ExternalLink, Zap, Car, Star, ArrowRight } from 'lucide-react';

/**
 * Enhanced "Book Your EV Road Trip" affiliate CTA
 * Prominent car rental call-to-action shown on station pages,
 * search results, and itinerary pages.
 * 
 * Additive — preserves all existing affiliate CTAs while adding
 * a more prominent, premium-feeling car rental booking section.
 */
const EvRoadTripCTA: FC<{
  country?: string;
  city?: string;
  compact?: boolean;
}> = ({ country, city, compact = false }) => {
  // Country-specific rental URLs (Klook affiliate)
  const rentals: Record<string, { name: string; url: string; label: string; badge: string }> = {
    Thailand: {
      name: 'Rent a Tesla in Thailand',
      url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=tesla-rental-thailand',
      label: 'Tesla Model 3/Y · Bangkok, Phuket, Chiang Mai',
      badge: '🇹🇭',
    },
    Singapore: {
      name: 'Rent an EV in Singapore',
      url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=ev-rental-singapore',
      label: 'Tesla, Polestar, Hyundai · Island-wide',
      badge: '🇸🇬',
    },
    Malaysia: {
      name: 'Rent an EV in Malaysia',
      url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=ev-rental-malaysia',
      label: 'EV rentals · KL, Penang, Johor Bahru',
      badge: '🇲🇾',
    },
    Indonesia: {
      name: 'EV Scooter/Car Rental Bali',
      url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=ev-rental-bali',
      label: 'Electric scooters & cars · Bali',
      badge: '🇮🇩',
    },
    Japan: {
      name: 'Rent an EV in Japan',
      url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=ev-rental-japan',
      label: 'Nissan Sakura, Tesla · Tokyo, Osaka, Kyoto',
      badge: '🇯🇵',
    },
  };

  const defaultRental = { name: 'Book Your EV Road Trip', url: 'https://www.booking.com/index.html?aid=2875669', label: 'Rent an electric vehicle for your Asia road trip', badge: '🌏' };
  const rental = (country && rentals[country]) || defaultRental;

  if (compact) {
    return (
      <a
        href={rental.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl hover:from-sky-500 hover:to-blue-500 transition-all shadow-md hover:shadow-lg"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 shrink-0">
          <Car size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold truncate">{rental.name}</div>
          <div className="text-[10px] text-white/80 truncate">{rental.label}</div>
        </div>
        <ExternalLink size={16} className="opacity-60 group-hover:opacity-100 shrink-0 transition-opacity" />
      </a>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 rounded-2xl border border-sky-200/70 p-5 sm:p-6 mb-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shrink-0">
          <Car size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            Book Your EV Road Trip
            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium border border-amber-200">
              Sponsored
            </span>
          </h3>
          <p className="text-xs text-gray-500">Rent a Tesla, Polestar, or Hyundai IONIQ for your journey</p>
        </div>
      </div>

      {/* Rental options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {Object.entries(rentals).slice(0, 4).map(([key, r]) => (
          <a
            key={key}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
              key === country
                ? 'bg-white border-sky-300 shadow-sm hover:shadow-md'
                : 'bg-white/70 border-sky-100 hover:bg-white hover:border-sky-200 hover:shadow-sm'
            }`}
          >
            <span className="text-xl shrink-0">{r.badge}</span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-900 group-hover:text-sky-700 transition-colors truncate">
                {r.name}
              </div>
              <div className="text-[10px] text-gray-500 truncate">{r.label}</div>
            </div>
            <ExternalLink size={14} className="text-sky-400 group-hover:text-sky-600 shrink-0 transition-colors" />
          </a>
        ))}
      </div>

      {/* Extra row for remaining */}
      {Object.entries(rentals).length > 4 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(rentals).slice(4).map(([key, r]) => (
            <a
              key={key}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 border border-sky-100 hover:bg-white hover:border-sky-200 hover:shadow-sm transition-all"
            >
              <span className="text-xl shrink-0">{r.badge}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-gray-900 group-hover:text-sky-700 transition-colors truncate">{r.name}</div>
                <div className="text-[10px] text-gray-500 truncate">{r.label}</div>
              </div>
              <ExternalLink size={14} className="text-sky-400 group-hover:text-sky-600 shrink-0 transition-colors" />
            </a>
          ))}
        </div>
      )}

      {/* Commission note */}
      <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1">
        <Star size={10} className="text-amber-400 fill-amber-400" />
        We earn a commission at no extra cost to you when you book through these links.
      </p>
    </div>
  );
};

export default EvRoadTripCTA;
