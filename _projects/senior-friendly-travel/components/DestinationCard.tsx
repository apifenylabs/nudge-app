'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Lightbulb, DollarSign, BadgeCheck, Shield, MessageSquare, Tag, ExternalLink, Zap, Heart, TrendingUp } from 'lucide-react';
import BookmarkButton from './BookmarkButton';

interface DestinationCardProps {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  ageRange: string;
  safetyRating: number;
  priceRange: string;
  popularity: number;
  description: string;
  imageUrl: string;
  tipsCount: number;
  reviewsCount?: number;
  parentStory?: boolean;
  amenities?: string[];
  isNew?: boolean;
  human_verified_tip?: string | null;
  rank?: number; // Top 3 get gold badge
}

import { computeSimpleScore, scoreTier } from '@/lib/scoring';

const CATEGORY_MAP: Record<string, { emoji: string; cls: string }> = {
  'Theme Parks & Attractions': { emoji: '🛝', cls: 'bg-amber-100 text-amber-700' },
  'Nature & Outdoor Adventures': { emoji: '🌿', cls: 'bg-green-100 text-green-700' },
  'Cultural & Historical Sites': { emoji: '🏛️', cls: 'bg-purple-100 text-purple-700' },
};

const PRICE_LABELS: Record<number, string> = {
  1: '$ Budget',
  2: '$$ Moderate',
  3: '$$$ Premium',
  4: '$$$$ Luxury',
};

// Affiliate URL builders
function klookSearchUrl(name: string, city: string): string {
  const q = encodeURIComponent(`${name} ${city}`);
  return `https://www.klook.com/en-US/search?query=${q}&spm=Home.SearchSuggestions&clickId=706c5ef5a8`;
}

function viatorSearchUrl(name: string, city: string): string {
  const q = encodeURIComponent(`${name} ${city}`);
  return `https://www.viator.com/searchResults/all?text=${q}`;
}

function SafetyScoreBar({ rating }: { rating: number }) {
  const scorePercent = (rating / 5) * 100;
  const color = rating >= 4.5 ? 'bg-emerald-600'
    : rating >= 4.0 ? 'bg-teal-600'
    : rating >= 3.5 ? 'bg-amber-600'
    : 'bg-rose-600';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${scorePercent}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 min-w-[28px] text-right">{rating.toFixed(1)}</span>
    </div>
  );
}

function PriceDots({ range }: { range: string }) {
  const dots = range.replace(/[^$]/g, '').length || 1;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i <= dots ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

export default function DestinationCard({
  id, name, city, country, category, ageRange, priceRange,
  safetyRating, description, imageUrl,
  tipsCount, reviewsCount = 0, popularity, parentStory, isNew, human_verified_tip, rank,
}: DestinationCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scoreAnimated, setScoreAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const priceDots = priceRange.replace(/[^$]/g, '').length || 1;
  const cat = CATEGORY_MAP[category] || { emoji: '📍', cls: 'bg-gray-100 text-gray-700' };
  const score = computeSimpleScore(safetyRating, popularity || 0, tipsCount || 0, !!parentStory);
  const isTopRated = rank !== undefined && rank <= 3;
  const isPremium = priceRange === '$$$$';
  const isLuxury = priceRange === '$$$$';

  const scoreColor = score >= 90 ? 'text-emerald-600'
    : score >= 75 ? 'text-teal-600'
    : score >= 60 ? 'text-amber-600'
    : 'text-gray-500';

  const scoreBarColor = score >= 90 ? 'bg-emerald-600'
    : score >= 75 ? 'bg-teal-600'
    : score >= 60 ? 'bg-amber-600'
    : 'bg-gray-400';

  // Intersection observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate score bar after visibility
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setScoreAnimated(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Generate AEO declarative header
  const aeoTagline = score >= 85
    ? `${name}: Best for Ages ${ageRange} — ${city}. Perfect for families.`
    : score >= 70
      ? `${name}: Great Family Pick in ${city} — Ages ${ageRange}.`
      : `${name}: Family-Friendly in ${city}.`;

  return (
    <Link
      href={`/destination/${id}`}
      className="block group"
      aria-label={aeoTagline}
    >
      <div
        ref={cardRef}
        className={`relative bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          group-hover:shadow-card-hover group-hover:-translate-y-1 group-hover:border-gray-200 dark:group-hover:border-gray-500
          ${isPremium ? 'ring-1 ring-amber-200/50 dark:ring-amber-800/50' : ''}`}
      >
        {/* Image region */}
        <div className="relative aspect-[4/3] bg-gray-50 dark:bg-gray-800 overflow-hidden">
          {!imageFailed && imageUrl && !imageUrl.includes('placeholder') ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal-50 dark:from-teal-900/50 via-teal-100 dark:via-teal-800/50 to-emerald-100 dark:to-emerald-900/50 flex items-center justify-center">
              <MapPin size={28} className="text-teal-300/60" />
            </div>
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

          {/* Top Rated Gold Badge — for top 3 */}
          {isTopRated && (
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1 gold-badge">
              <Star size={10} className="fill-white" />
              <span>Top Rated</span>
            </div>
          )}

          {/* NEW badge */}
          {isNew && !isTopRated && (
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              NEW
            </div>
          )}

          {/* Premium badge */}
          {isPremium && !isTopRated && (
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              PREMIUM
            </div>
          )}

          {/* Score badge */}
          <div className={`absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full text-[11px] font-bold text-white shadow-lg ring-2 ring-white/60 ${scoreBarColor}`}>
            {score}
          </div>

          {/* Bookmark */}
          <div className="absolute top-3 right-14 z-20">
            <BookmarkButton destinationId={id} size="sm" />
          </div>

          {/* Age range badge on image */}
          <div className="absolute bottom-3 left-3 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">
            👶 Ages {ageRange}
          </div>

          {/* Price level */}
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <PriceDots range={priceRange} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5">
          {/* Title + badge row */}
          <div className="flex items-start gap-2">
            <h3 className="text-base font-semibold text-heading dark:text-gray-100 leading-snug flex-1 min-w-0 line-clamp-1 group-hover:text-teal-600 transition-colors" title={aeoTagline}>
              {name}
            </h3>
            {parentStory && (
              <BadgeCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" aria-label="Parent verified" />
            )}
          </div>

          {/* City + Category */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin size={10} className="text-teal-500" />
              {city}, {country}
            </span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${cat.cls}`}>
              {cat.emoji} {category.split('&')[0].trim()}
            </span>
          </div>

          {/* Safety Score Bar */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-400">
                <Shield size={10} className="text-teal-500" />
                Safety Score
              </span>
              <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">{safetyRating.toFixed(1)} / 5.0</span>
            </div>
            <SafetyScoreBar rating={safetyRating} />
          </div>

          {/* Smart description snippet */}
          {description && (
            <p className="text-xs text-body dark:text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* Information Gain: Real Talk tip */}
          {human_verified_tip && (
            <div className="bg-amber-50/80 dark:bg-amber-900/30 dark:border-amber-800/50 border border-amber-200/60 rounded-lg px-3 py-2">
              <div className="flex items-start gap-1.5">
                <MessageSquare size={11} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-snug line-clamp-2">{human_verified_tip}</p>
              </div>
            </div>
          )}

          {/* Metrics row */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1 text-teal-600 font-medium">
                <Lightbulb size={10} />
                {tipsCount} {tipsCount === 1 ? 'tip' : 'tips'}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={10} />
                {reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'}
              </span>
            </div>

            {/* Affiliate CTA */}
            <span className="flex items-center gap-1 text-[11px] font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Zap size={11} />
              Book Now
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
