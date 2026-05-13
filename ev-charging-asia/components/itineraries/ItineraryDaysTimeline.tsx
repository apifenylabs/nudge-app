'use client';

import { MapPin, Utensils, Crown, Users, BatteryCharging } from 'lucide-react';
import type { ItineraryDay } from '@/data/itineraries';

interface Props {
  days: ItineraryDay[];
}

export default function ItineraryDaysTimeline({ days }: Props) {
  return (
    <div className="space-y-6">
      {days.map((day, idx) => (
        <div key={day.day} className="relative pl-8">
          {/* Timeline line */}
          {idx < days.length - 1 && (
            <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 to-amber-100" />
          )}

          {/* Dot */}
          <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
            {day.day}
          </div>

          {/* Content card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <h3 className="text-base font-bold text-gray-900 mb-1">{day.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{day.description}</p>

            {/* Day stats */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-sky-500" />
                {day.distanceKm}km
              </span>
              <span className="flex items-center gap-1">
                <BatteryCharging size={12} className="text-emerald-500" />
                ~{Math.round(day.distanceKm / 60 * 2)}kWh
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Charging stops */}
              {day.suggestedStops.length > 0 && (
                <div className="p-3 bg-sky-50 rounded-lg border border-sky-100">
                  <h4 className="text-xs font-semibold text-sky-700 mb-1.5 flex items-center gap-1">
                    <BatteryCharging size={12} /> Charging Stops
                  </h4>
                  <ul className="space-y-0.5">
                    {day.suggestedStops.map((stop, si) => (
                      <li key={si} className="text-xs text-sky-600 flex items-start gap-1">
                        <span className="shrink-0">🔌</span>
                        <span>{stop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Kid-friendly stops */}
              {day.kidFriendlyStops.length > 0 && (
                <div className="p-3 bg-pink-50 rounded-lg border border-pink-100">
                  <h4 className="text-xs font-semibold text-pink-700 mb-1.5 flex items-center gap-1">
                    <Users size={12} /> Family Fun Stops
                  </h4>
                  <ul className="space-y-0.5">
                    {day.kidFriendlyStops.map((stop, si) => (
                      <li key={si} className="text-xs text-pink-600 flex items-start gap-1">
                        <span className="shrink-0">👨‍👩‍👧‍👦</span>
                        <span>{stop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Luxury recommendation */}
            {day.luxuryRecommendation && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="text-xs font-semibold text-amber-700 mb-1 flex items-center gap-1">
                  <Crown size={12} /> Luxury Stay Recommendation
                </h4>
                <a
                  href={day.luxuryBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="text-sm font-medium text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1"
                >
                  {day.luxuryRecommendation}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            )}

            {/* Meal tips */}
            {day.mealTips && (
              <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-500">
                <Utensils size={12} className="text-gray-400 shrink-0 mt-0.5" />
                <span>{day.mealTips}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
