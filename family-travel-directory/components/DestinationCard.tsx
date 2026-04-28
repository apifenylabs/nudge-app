'use client';

import Link from 'next/link';
import { MapPin, Star, Lightbulb, DollarSign } from 'lucide-react';
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
  parentStory?: boolean;
}

export default function DestinationCard({
  id, name, city, country, category, ageRange, priceRange,
  safetyRating, description, imageUrl,
  tipsCount,
}: DestinationCardProps) {
  const priceDots = priceRange.replace(/[^$]/g, '').length || 1;

  const categoryBadge = (() => {
    if (category.includes('Theme')) return { emoji: '🛝', cls: 'bg-amber-100 text-amber-700' };
    if (category.includes('Nature')) return { emoji: '🌿', cls: 'bg-green-100 text-green-700' };
    if (category.includes('Cultural')) return { emoji: '🏛️', cls: 'bg-purple-100 text-purple-700' };
    return { emoji: '📍', cls: 'bg-gray-100 text-gray-700' };
  })();

  return (
    <Link
      href={`/destination/${id}`}
      className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Safety rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 shadow-sm">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          {safetyRating}
        </div>

        {/* Bookmark button */}
        <div className="absolute top-3 left-3">
          <BookmarkButton destinationId={id} size="sm" />
        </div>

        {/* City + country */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs">
          <MapPin size={12} />
          <span className="font-medium drop-shadow-sm">{city}, {country}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 leading-snug mb-2">{name}</h3>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${categoryBadge.cls}`}>
            {categoryBadge.emoji}
            {categoryBadge.emoji === '🛝' ? 'Parks' : categoryBadge.emoji === '🌿' ? 'Nature' : 'Culture'}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {ageRange} yrs
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-0.5">
            {Array.from({ length: priceDots }, (_, i) => (
              <DollarSign key={i} size={11} className="text-gray-500" />
            ))}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-sky-600 font-medium">
            <Lightbulb size={12} />
            <span>{tipsCount} parent tips</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-gray-500">{safetyRating}</span>
            <span className="text-gray-300 mx-1">&middot;</span>
            <span className="text-sky-600 font-medium group-hover:underline">
              View details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
