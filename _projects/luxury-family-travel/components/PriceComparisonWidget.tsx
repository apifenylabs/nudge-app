'use client';

import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, TrendingUp, DollarSign, Award } from 'lucide-react';

interface PriceComparisonWidgetProps {
  destinationName: string;
  city: string;
  country: string;
  category: string;
  priceRange: string;
  destinationId: string;
  className?: string;
}

/**
 * PriceComparisonWidget — Shows multiple booking options side by side
 * with affiliate links to Klook, Viator, Booking.com, Agoda, and Expedia.
 * Dynamically generates search links based on destination name + city.
 */
export default function PriceComparisonWidget({
  destinationName,
  city,
  country,
  category,
  priceRange,
  destinationId,
  className = '',
}: PriceComparisonWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchTerm = `${destinationName} ${city} ${country}`;
  const encodedTerm = encodeURIComponent(searchTerm);
  const encodedCity = encodeURIComponent(city);
  const encodedDest = encodeURIComponent(destinationName);

  // Extract price tier for display
  const priceCount = priceRange.replace(/[^$₩¥]/g, '').length || 1;
  const priceLabels = ['$', '$$', '$$$'];
  const priceDescriptions = ['Budget-friendly', 'Mid-range', 'Luxury'];
  const priceIndex = Math.min(priceCount - 1, 2);
  const priceDesc = priceDescriptions[priceIndex] || priceDescriptions[2];

  // Best deal suggestion based on category
  let bestForKlook = false;
  let bestForViator = false;
  let bestForBooking = false;
  let bestForAgoda = false;
  let bestForExpedia = false;

  if (category.includes('Theme') || category.includes('Park') || category.includes('Nature')) {
    bestForKlook = true;
    bestForViator = true;
  } else if (category.includes('Cultural') || category.includes('Museum')) {
    bestForViator = true;
  } else if (category.includes('Restaurant') || category.includes('Shopping') || category.includes('Beach')) {
    bestForKlook = true;
    bestForBooking = true;
  } else {
    bestForBooking = true;
  }

  const bookingOptions = [
    {
      id: 'klook',
      name: 'Klook',
      url: `https://www.klook.com/search/?keyword=${encodedDest}%20${encodedCity}&aid=119991`,
      description: 'Activities & tours',
      icon: '🎟️',
      bestFor: bestForKlook,
      color: 'from-orange-500 to-amber-500',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverBorder: 'hover:border-orange-400',
    },
    {
      id: 'viator',
      name: 'Viator',
      url: `https://www.viator.com/${encodedCity.replace(/%20/g, '')}/things-to-do?aid=P00299136`,
      description: 'Guided tours & experiences',
      icon: '🚌',
      bestFor: bestForViator,
      color: 'from-rose-500 to-pink-500',
      textColor: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      hoverBorder: 'hover:border-rose-400',
    },
    {
      id: 'booking',
      name: 'Booking.com',
      url: `https://www.booking.com/searchresults.html?ss=${encodedDest}%20${encodedCity}&aid=2875669`,
      description: 'Hotels & stays',
      icon: '🏨',
      bestFor: bestForBooking,
      color: 'from-blue-600 to-blue-700',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
    },
    {
      id: 'agoda',
      name: 'Agoda',
      url: `https://www.agoda.com/search?query=${encodedDest}%20${encodedCity}&cid=1917972`,
      description: 'Hotels in Asia',
      icon: '🛏️',
      bestFor: bestForAgoda,
      color: 'from-red-500 to-rose-600',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      hoverBorder: 'hover:border-red-400',
    },
    {
      id: 'expedia',
      name: 'Expedia',
      url: `https://www.expedia.com/search?q=${encodedDest}%20${encodedCity}`,
      description: 'Packages & flights',
      icon: '✈️',
      bestFor: bestForExpedia,
      color: 'from-yellow-500 to-amber-600',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      hoverBorder: 'hover:border-amber-400',
    },
  ];

  return (
    <div className={`rounded-2xl overflow-hidden border border-gold/20 bg-white shadow-sm ${className}`}>
      {/* Header — clickable toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-navy to-navy-dark text-white"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
            <DollarSign size={18} className="text-gold" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-white">Compare Prices & Book</h3>
            <p className="text-[10px] text-gold-light/70 truncate max-w-[200px] sm:max-w-none">
              {priceDesc} · Find the best deal for {destinationName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronUp size={16} className="text-gold" />
          ) : (
            <ChevronDown size={16} className="text-gold" />
          )}
        </div>
      </button>

      {/* Price comparison panel */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-2.5 animate-slide-up">
          {/* Best deal highlight */}
          <div className="flex items-center gap-2 mb-3 bg-gold/5 rounded-xl p-3 border border-gold/20">
            <Award size={14} className="text-gold shrink-0" />
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-charcoal">Best deal:</span> We recommend checking multiple platforms — prices vary by season. Booking through our partners supports this site at no extra cost to you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {bookingOptions.map((opt) => (
              <a
                key={opt.id}
                href={opt.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`group relative flex items-center gap-3 p-3.5 rounded-xl border ${opt.borderColor} ${opt.bgColor} ${opt.hoverBorder} transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]`}
              >
                {/* Best-for badge */}
                {opt.bestFor && (
                  <div className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gold text-charcoal-dark text-[8px] font-bold uppercase tracking-wider shadow-sm">
                    <TrendingUp size={8} />
                    Best
                  </div>
                )}
                <div className="text-xl flex-shrink-0">{opt.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold ${opt.textColor} flex items-center gap-1`}>
                    {opt.name}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{opt.description}</p>
                </div>
                <ExternalLink size={12} className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>

          {/* Disclosure */}
          <p className="text-[9px] text-gray-400 text-center mt-2">
            We may earn a commission at no extra cost to you. Prices subject to change.{' '}
            <a href="/privacy" className="underline hover:text-gray-600">Privacy</a>
          </p>
        </div>
      )}
    </div>
  );
}
