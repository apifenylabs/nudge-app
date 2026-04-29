'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Star, Lightbulb, DollarSign, BadgeCheck, Shield, MessageSquare } from 'lucide-react';
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
}

import { computeSimpleScore } from '@/lib/scoring';

const CATEGORY_MAP: Record<string, { emoji: string; cls: string }> = {
  'Theme Parks & Attractions': { emoji: '🛝', cls: 'bg-amber-100 text-amber-700' },
  'Nature & Outdoor Adventures': { emoji: '🌿', cls: 'bg-green-100 text-green-700' },
  'Cultural & Historical Sites': { emoji: '🏛️', cls: 'bg-purple-100 text-purple-700' },
};

export default function DestinationCard({
  id, name, city, country, category, ageRange, priceRange,
  safetyRating, description, imageUrl,
  tipsCount, reviewsCount = 0, popularity, parentStory,
}: DestinationCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const priceDots = priceRange.replace(/[^$]/g, '').length || 1;
  const cat = CATEGORY_MAP[category] || { emoji: '📍', cls: 'bg-gray-100 text-gray-700' };
  const score = computeSimpleScore(safetyRating, popularity || 0, tipsCount || 0, !!parentStory);

  const scoreColor = score >= 90 ? 'bg-emerald-500'
    : score >= 75 ? 'bg-sky-500'
    : score >= 60 ? 'bg-amber-500'
    : 'bg-gray-400';

  return (
    <Link
      href={`/destination/${id}`}
      className="block bg-white rounded-xl border border-gray-200/80 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
    >
      {/* Image region — compact */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {!imageFailed && imageUrl && !imageUrl.includes('placeholder') ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-100 via-sky-200 to-blue-200 flex items-center justify-center">
            <MapPin size={22} className="text-sky-400/60" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Score badge */}
        <div className={`absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold text-white shadow ring-2 ring-white/40 ${scoreColor}`}>
          {score}
        </div>

        {/* City overlay */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[10px]">
          <MapPin size={9} />
          <span className="font-medium drop-shadow-sm truncate max-w-[120px]">{city}</span>
        </div>

        {/* Bookmark */}
        <div className="absolute top-2 left-2 z-10">
          <BookmarkButton destinationId={id} size="sm" />
        </div>
      </div>

      {/* Content — compact */}
      <div className="p-3 space-y-1.5">
        {/* Title row */}
        <div className="flex items-start gap-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug flex-1 min-w-0 line-clamp-1">{name}</h3>
          {parentStory && (
            <BadgeCheck size={11} className="text-emerald-600 shrink-0 mt-0.5" />
          )}
        </div>

        {/* Badges row: category + age + price */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded-full font-medium ${cat.cls}`}>
            {cat.emoji} {cat.emoji === '🛝' ? 'Parks' : cat.emoji === '🌿' ? 'Nature' : 'Culture'}
          </span>
          <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.5 rounded-full font-medium">
            {ageRange}
          </span>
          <span className="flex items-center gap-0 ml-0.5">
            {['$','$','$','$'].map((s, i) => (
              <DollarSign key={i} size={9} className={i < priceDots ? 'text-gray-600' : 'text-gray-200'} />
            ))}
          </span>
        </div>

        {/* Safety + reviews + tips row */}
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <span className="flex items-center gap-0.5">
            <Shield size={9} className="text-sky-500" />
            <span className="font-medium text-gray-700">{safetyRating.toFixed(1)}</span>
            <span className="text-gray-300">·</span>
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={8} className={i <= Math.round(safetyRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
            ))}
          </span>
        </div>

        {/* Metrics row: tips + reviews */}
        <div className="flex items-center gap-2.5 text-[10px] text-gray-500 pt-0.5 border-t border-gray-100">
          <span className="flex items-center gap-1 text-sky-600 font-medium">
            <Lightbulb size={9} />
            {tipsCount} {tipsCount === 1 ? 'tip' : 'tips'}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={9} />
            {reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </div>
    </Link>
  );
}
