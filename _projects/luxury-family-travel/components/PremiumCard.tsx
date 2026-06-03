'use client';

import Link from 'next/link';
import { Crown, Star, MapPin } from 'lucide-react';

interface PremiumCardProps {
  id: string;
  slug?: string;
  name: string;
  city: string;
  country: string;
  category: string;
  description: string;
  imageUrl: string;
  priceRange: string;
  safetyRating: number;
  popularity: number;
  rank?: number;
  badgeText?: string;
  badgeGradient?: string;
}

const priceDots = (price: string) => price.replace(/[^$]/g, '').length || 1;

export default function PremiumCard({
  id, slug, name, city, country, category, description, imageUrl,
  priceRange, safetyRating, popularity, rank, badgeText, badgeGradient,
}: PremiumCardProps) {
  const pdots = priceDots(priceRange);
  const badgeGradientClass = badgeGradient || 'from-navy/80 to-navy/60';

  return (
    <Link
      href={`/destination/${slug || id}`}
      className="group relative block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gold/10"
    >
      {/* Rank badge */}
      {rank && (
        <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-gold text-navy flex items-center justify-center text-xs font-bold shadow-lg">
          {rank}
        </div>
      )}

      {/* Badge text — Cosme-style gradient badge */}
      {badgeText && (
        <div className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-gradient-to-r ${badgeGradientClass} backdrop-blur-sm text-white text-[10px] font-semibold shadow-lg tracking-wide`}>
          {badgeText}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] bg-cream overflow-hidden">
        {imageUrl && !imageUrl.includes('placeholder') ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center">
            <Crown size={32} className="text-gold/30" />
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-navy text-sm leading-tight group-hover:text-gold-dark transition-colors line-clamp-1">
            {name}
          </h3>
          <span className="flex items-center gap-0.5 text-xs text-navy-light/60 shrink-0">
            <Star size={10} className="text-gold fill-gold" />
            {safetyRating}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-navy-light/50 mb-2">
          <MapPin size={10} />
          <span className="truncate">{city}, {country}</span>
          <span className="mx-1">·</span>
          <span className="shrink-0">{category}</span>
        </div>

        <p className="text-xs text-navy-light/70 line-clamp-2 leading-relaxed mb-3">
          {description}
        </p>

        {/* Price indicator + popularity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: pdots }).map((_, i) => (
              <span key={i} className="text-gold text-xs font-bold">$</span>
            ))}
            {Array.from({ length: 5 - pdots }).map((_, i) => (
              <span key={i} className="text-cream text-xs font-bold">$</span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-navy-light/40">
            <div className="w-14 h-1 rounded-full bg-cream overflow-hidden">
              <div
                className="h-full rounded-full bg-gold transition-all"
                style={{ width: `${Math.min(100, popularity * 10)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
