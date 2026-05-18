'use client';

import { Sparkles, ExternalLink, MapPin, Star } from 'lucide-react';

interface ContextualRecommendationsProps {
  destinationName: string;
  city: string;
  country: string;
  category: string;
  className?: string;
}

/**
 * ContextualRecommendations — "Book this + nearby experience" suggestions.
 * Shows curated cross-sell options based on the destination category and city.
 */
export default function ContextualRecommendations({
  destinationName,
  city,
  country,
  category,
  className = '',
}: ContextualRecommendationsProps) {
  // Generate contextual recommendations based on category
  const getRecommendations = () => {
    const encodedCity = encodeURIComponent(city);
    const encodedDest = encodeURIComponent(destinationName);

    const base: Array<{
      title: string;
      description: string;
      url: string;
      icon: string;
      provider: string;
    }> = [];

    // Category-specific recommendations
    if (category.includes('Nature') || category.includes('Beach')) {
      base.push(
        {
          title: `${city} Family-Friendly Hotel`,
          description: `Stay near ${destinationName} with family perks`,
          url: `https://www.booking.com/searchresults.html?ss=${encodedCity}+family+hotel&aid=2875669`,
          icon: '🏨',
          provider: 'Booking.com',
        },
        {
          title: `${city} Family Tour Package`,
          description: 'Guided tour including transportation',
          url: `https://www.klook.com/search/?keyword=${encodedCity}+family+tour&aid=119991`,
          icon: '🚌',
          provider: 'Klook',
        },
        {
          title: `${city} Water Sports for Kids`,
          description: 'Kid-friendly water activities nearby',
          url: `https://www.viator.com/${encodedCity.replace(/%20/g, '')}/things-to-do?aid=P00299136`,
          icon: '🏄',
          provider: 'Viator',
        },
      );
    } else if (category.includes('Cultural') || category.includes('Museum')) {
      base.push(
        {
          title: `Skip-the-Line: ${destinationName}`,
          description: 'Priority entry with family pass',
          url: `https://www.klook.com/search/?keyword=${encodedDest}+skip+line+tickets&aid=119991`,
          icon: '🎟️',
          provider: 'Klook',
        },
        {
          title: `${city} Guided Walking Tour`,
          description: 'Family-friendly guided exploration',
          url: `https://www.viator.com/${encodedCity.replace(/%20/g, '')}/things-to-do?aid=P00299136`,
          icon: '🚶',
          provider: 'Viator',
        },
        {
          title: `Stay in ${city} City Center`,
          description: 'Walk to top attractions from your hotel',
          url: `https://www.booking.com/searchresults.html?ss=${encodedCity}+city+center&aid=2875669`,
          icon: '🏛️',
          provider: 'Booking.com',
        },
      );
    } else if (category.includes('Theme') || category.includes('Park')) {
      base.push(
        {
          title: `${destinationName} Express Pass`,
          description: 'Skip long queues with priority pass',
          url: `https://www.klook.com/search/?keyword=${encodedDest}+express+pass&aid=119991`,
          icon: '⚡',
          provider: 'Klook',
        },
        {
          title: `${city} Family Meal Deal`,
          description: 'Dining voucher near the park',
          url: `https://www.klook.com/search/?keyword=${encodedCity}+family+dining&aid=119991`,
          icon: '🍽️',
          provider: 'Klook',
        },
        {
          title: `Hotel Near ${destinationName}`,
          description: 'Stay within walking distance',
          url: `https://www.booking.com/searchresults.html?ss=${encodedCity}+near+${encodedDest}&aid=2875669`,
          icon: '🏨',
          provider: 'Booking.com',
        },
      );
    } else if (category.includes('Restaurant') || category.includes('Shopping')) {
      base.push(
        {
          title: `${city} Family Dining Tour`,
          description: 'Taste the best family-friendly spots',
          url: `https://www.klook.com/search/?keyword=${encodedCity}+food+tour+family&aid=119991`,
          icon: '🍜',
          provider: 'Klook',
        },
        {
          title: `${city} Hotel Package`,
          description: 'Combine dining with a hotel stay',
          url: `https://www.booking.com/searchresults.html?ss=${encodedCity}+hotels&aid=2875669`,
          icon: '🏨',
          provider: 'Booking.com',
        },
        {
          title: `${city} City Highlights Tour`,
          description: 'See top sights between meals',
          url: `https://www.viator.com/${encodedCity.replace(/%20/g, '')}/things-to-do?aid=P00299136`,
          icon: '📍',
          provider: 'Viator',
        },
      );
    } else {
      // Generic fallback
      base.push(
        {
          title: `Explore ${city} with Klook`,
          description: 'Best activities & experiences',
          url: `https://www.klook.com/search/?keyword=${encodedCity}+family&aid=119991`,
          icon: '🎟️',
          provider: 'Klook',
        },
        {
          title: `Hotels in ${city}`,
          description: 'Family-friendly accommodations',
          url: `https://www.booking.com/searchresults.html?ss=${encodedCity}+family+hotel&aid=2875669`,
          icon: '🏨',
          provider: 'Booking.com',
        },
        {
          title: `Things to Do in ${city}`,
          description: 'Top-rated Viator experiences',
          url: `https://www.viator.com/${encodedCity.replace(/%20/g, '')}/things-to-do?aid=P00299136`,
          icon: '📍',
          provider: 'Viator',
        },
      );
    }

    return base;
  };

  const recommendations = getRecommendations();

  return (
    <div className={`rounded-2xl overflow-hidden border border-gold/15 bg-gradient-to-br from-cream-light to-white shadow-sm ${className}`}>
      {/* Header */}
      <div className="px-4 sm:px-5 py-4 border-b border-gold/10">
        <div className="flex items-center gap-2 mb-0.5">
          <Sparkles size={14} className="text-gold" />
          <h3 className="text-sm font-bold text-charcoal">
            Complete Your Trip
          </h3>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          Recommended add-ons for your visit to {destinationName}
        </p>
      </div>

      {/* Recommendations grid */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {recommendations.map((rec, i) => (
            <a
              key={i}
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex items-start gap-3 p-3 rounded-xl border border-gray-200/80 bg-white hover:border-gold/40 hover:shadow-md transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div className="text-xl flex-shrink-0 mt-0.5">{rec.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="text-xs font-semibold text-charcoal group-hover:text-gold-dark transition-colors line-clamp-1">
                    {rec.title}
                  </h4>
                  <Star size={8} className="text-gold fill-gold flex-shrink-0" />
                </div>
                <p className="text-[10px] text-gray-500 line-clamp-1">{rec.description}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ExternalLink size={8} className="text-gold" />
                  <span className="text-[9px] text-gold font-medium">{rec.provider}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-[9px] text-gray-400 text-center mt-3">
          Affiliate links · We may earn a commission at no extra cost to you
        </p>
      </div>
    </div>
  );
}
