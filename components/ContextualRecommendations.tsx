'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Hotel, Compass, Utensils, Car, Plane, ExternalLink,
  Sparkles, Shield, Star, MapPin, ChevronRight, Clock
} from 'lucide-react';
import { bookingUrl, klookUrl, viatorUrl } from '@/lib/affiliate';

// ─── Types ──────────────────────────────────────────────────────

interface Recommendation {
  id: string;
  type: 'hotel' | 'activity' | 'dining' | 'transport' | 'experience';
  title: string;
  description: string;
  url: string;
  priceLabel: string;
  icon: React.ElementType;
  gradient: string;
  emoji: string;
}

interface ContextualRecommendationsProps {
  destination: string;
  city: string;
  country: string;
  ageRange?: string;
  tags?: string[];
}

const AGENCY_BRANDING: Record<string, { gradient: string; label: string }> = {
  hotel: { gradient: 'from-sky-400 to-blue-500', label: 'Booking.com' },
  activity: { gradient: 'from-orange-400 to-rose-500', label: 'Klook' },
  experience: { gradient: 'from-rose-400 to-pink-600', label: 'Viator' },
};

// ─── Component ──────────────────────────────────────────────────

export default function ContextualRecommendations({
  destination,
  city,
  country,
  ageRange,
  tags = [],
}: ContextualRecommendationsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-in animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Build contextual recommendations based on destination data
  const recommendations: Recommendation[] = [
    {
      id: 'hotel',
      type: 'hotel',
      title: `Family Hotels in ${city}`,
      description: `Compare prices for family-friendly hotels near ${destination}. ${ageRange ? `Suitable for ages ${ageRange}. ` : ''}Free cancellation on most rooms.`,
      url: bookingUrl(`${city} family hotels`),
      priceLabel: 'From $49/night',
      icon: Hotel,
      gradient: 'from-sky-400 to-blue-500',
      emoji: '🏨',
    },
    {
      id: 'activity',
      type: 'activity',
      title: `Activities at ${destination}`,
      description: `Book family-friendly ${city} activities and skip the queues. ${ageRange ? `Activities tailored for ages ${ageRange}.` : 'Curated for all ages.'}`,
      url: klookUrl(`${destination} ${city} family tickets`),
      priceLabel: 'From $15',
      icon: Compass,
      gradient: 'from-orange-400 to-rose-500',
      emoji: '🎢',
    },
    {
      id: 'experience',
      type: 'experience',
      title: `Top Experiences in ${city}`,
      description: `TripAdvisor-rated tours with free cancellation. Best family-friendly ${city} experiences hand-picked for you.`,
      url: viatorUrl(`${destination} ${city}`),
      priceLabel: 'From $22',
      icon: Star,
      gradient: 'from-rose-400 to-pink-600',
      emoji: '⭐',
    },
  ];

  // Add contextual dining if tags mention food
  if (tags.some(t => t.toLowerCase().includes('food') || t.toLowerCase().includes('dining') || t.toLowerCase().includes('market'))) {
    recommendations.push({
      id: 'dining',
      type: 'dining',
      title: `Kid-Friendly Dining near ${destination}`,
      description: `Top-rated family restaurants in ${city}. Kids' menus, high chairs, and quick service nearby.`,
      url: klookUrl(`${city} family dining`),
      priceLabel: 'View options',
      icon: Utensils,
      gradient: 'from-emerald-400 to-teal-500',
      emoji: '🍽️',
    });
  }

  // Add transport for specific tags
  if (tags.some(t => t.toLowerCase().includes('transport') || t.toLowerCase().includes('beach') || t.toLowerCase().includes('island'))) {
    recommendations.push({
      id: 'transport',
      type: 'transport',
      title: `${city} Airport Transfers`,
      description: `Book reliable airport transfers and car rentals in ${city}. Family-friendly vehicles with child seats available.`,
      url: bookingUrl(`${city} airport transfer`),
      priceLabel: 'From $25',
      icon: Car,
      gradient: 'from-purple-400 to-violet-500',
      emoji: '🚗',
    });
  }

  return (
    <div
      ref={ref}
      className={`mb-12 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
          <Sparkles size={16} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">
            Complete Your {destination} Trip
          </h3>
          <p className="text-[11px] text-gray-400">
            Book everything in one place — hotel, activities, and experiences
          </p>
        </div>
      </div>

      {/* Grid of recommendation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {recommendations.map((rec) => {
          const branding = AGENCY_BRANDING[rec.type] || AGENCY_BRANDING.activity;
          const Icon = rec.icon;

          return (
            <a
              key={rec.id}
              href={rec.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="group relative flex flex-col bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              {/* Top badge */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${rec.gradient} flex items-center justify-center shadow-sm`}>
                  <Icon size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{rec.title}</p>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Shield size={8} className="text-emerald-500" />
                    {'Powered by ' + branding.label}
                  </p>
                </div>
                <div className="text-lg flex-shrink-0">{rec.emoji}</div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                {rec.description}
              </p>

              {/* Price and CTA */}
              <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[11px] font-semibold text-emerald-600">
                  {rec.priceLabel}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-medium text-sky-600 group-hover:text-sky-700 transition-colors">
                  Check prices
                  <ExternalLink size={9} />
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Trust disclosure */}
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-400">
        <Clock size={10} />
        <span>Prices may vary. Book directly for the best guarantee.</span>
        <span className="ml-auto flex items-center gap-1">
          <Shield size={10} className="text-emerald-500" />
          Secure checkout
        </span>
      </div>
    </div>
  );
}
