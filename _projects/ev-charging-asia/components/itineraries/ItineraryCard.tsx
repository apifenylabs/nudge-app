'use client';

import Link from 'next/link';
import { Route, Clock, BatteryCharging, MapPin, ChevronRight, Users, Crown, ArrowUpDown } from 'lucide-react';
import type { Itinerary } from '@/data/itineraries';

interface Props {
  itinerary: Itinerary;
}

const difficultyStyles: Record<string, string> = {
  easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  moderate: 'bg-amber-50 text-amber-700 border-amber-200',
  challenging: 'bg-red-50 text-red-700 border-red-200',
};

const difficultyIcons: Record<string, string> = {
  easy: '🟢',
  moderate: '🟡',
  challenging: '🔴',
};

export default function ItineraryCard({ itinerary }: Props) {
  return (
    <Link
      href={`/routes/${itinerary.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
    >
      <div className="p-6">
        {/* Badge row */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyStyles[itinerary.difficulty] || difficultyStyles.easy}`}>
            {difficultyIcons[itinerary.difficulty] || '🟢'} {itinerary.difficulty}
          </span>
          <span className="px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-medium border border-sky-200">
            {itinerary.duration}
          </span>
          {itinerary.countries.length > 1 && (
            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
              🌏 Cross-border
            </span>
          )}
          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
            🌿 {itinerary.bestSeason}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-700 transition-colors mb-1.5">
          {itinerary.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{itinerary.subtitle}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Route size={16} className="mx-auto text-sky-500 mb-0.5" />
            <div className="text-xs font-semibold text-gray-900">{itinerary.totalDistanceKm}km</div>
            <div className="text-[10px] text-gray-400">Distance</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Clock size={16} className="mx-auto text-emerald-500 mb-0.5" />
            <div className="text-xs font-semibold text-gray-900">{itinerary.totalDrivingHours}h</div>
            <div className="text-[10px] text-gray-400">Driving</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <BatteryCharging size={16} className="mx-auto text-amber-500 mb-0.5" />
            <div className="text-xs font-semibold text-gray-900">{itinerary.estimatedChargingStops}+</div>
            <div className="text-[10px] text-gray-400">Charges</div>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-1.5 mb-4">
          {itinerary.familyHighlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
              <Users size={12} className="text-pink-400 shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
          {itinerary.luxuryHighlights.length > 0 && (
            <div className="flex items-start gap-1.5 text-xs text-gray-600">
              <Crown size={12} className="text-amber-400 shrink-0 mt-0.5" />
              <span>{itinerary.luxuryHighlights[0]}</span>
            </div>
          )}
        </div>

        {/* Route cities */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">
            {itinerary.cities.join(' → ')}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-sky-600 group-hover:text-sky-700">
            View itinerary <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
          <Link
            href={`/compare?route=${itinerary.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-sky-600 hover:underline transition-colors shrink-0"
          >
            <ArrowUpDown size={12} />
            Compare
          </Link>
        </div>
      </div>
    </Link>
  );
}
