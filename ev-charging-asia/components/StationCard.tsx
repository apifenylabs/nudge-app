'use client';

import Link from 'next/link';
import { MapPin, Zap, Star, Wifi, Utensils, Share2 } from 'lucide-react';
import { Station, computeStationScore, scoreTier } from '@/lib/scoring';
import { useState } from 'react';

const CHARGER_ICONS: Record<string, string> = {
  'CCS2': '🔌',
  'CHAdeMO': '⚡',
  'Type 2': '🔋',
  'GB/T': '🇨🇳',
  'NACS': '🔌',
};

export default function StationCard({ station }: { station: Station }) {
  const score = computeStationScore(station);
  const tier = scoreTier(score);

  const speedColor =
    station.chargerSpeed >= 150 ? 'text-green-600 bg-green-50 border-green-200' :
    station.chargerSpeed >= 50 ? 'text-sky-600 bg-sky-50 border-sky-200' :
    'text-gray-600 bg-gray-50 border-gray-200';

  const amenities: string[] = [];
  if (station.hasRestroomNearby) amenities.push('Restroom');
  if (station.hasFoodNearby) amenities.push('Food');
  if (station.hasCoveredParking) amenities.push('Covered');
  if (station.has24by7Access) amenities.push('24/7');
  if (station.isMallParking) amenities.push('Mall');

  return (
    <Link
      href={`/station/${station.id}`}
      className="group block bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/70 overflow-hidden hover:shadow-xl hover:border-gray-300/80 hover:bg-white/95 transition-all duration-300 flex flex-col"
    >
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors text-base leading-tight">
            {station.name}
          </h3>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tier.color} flex-shrink-0 ml-2`}>
            {tier.label}
          </span>
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
          <MapPin size={12} />
          {station.city}, {station.country}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{station.description}</p>

        {/* Connector types with labels */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {station.chargerTypes.map((type) => (
            <span key={type} className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 text-sky-700 rounded-full text-xs font-medium border border-sky-100">
              {CHARGER_ICONS[type] || '🔋'} {type}
            </span>
          ))}
        </div>

        {/* Tech specs */}
        <div className="space-y-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-amber-500" />
            <span>Max <strong>{station.chargerSpeed}kW</strong> · {station.chargerCount} port{station.chargerCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={12} className="text-amber-400" />
            <span>Reliability: <strong>{station.reliability.toFixed(1)}/5</strong> · {station.locationConvenience.toFixed(1)}/5 location</span>
          </div>
        </div>

        {/* Speed badge */}
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border mt-2 ${speedColor}`}>
          <Zap size={10} />
          {station.chargerSpeed >= 150 ? 'Fast (150kW+)' : station.chargerSpeed >= 50 ? 'Standard (50-150kW)' : 'Slow (<50kW)'}
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border border-emerald-200 bg-emerald-50 text-emerald-700 mt-2 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Last reported: Working
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{station.operator}</span>
          <div className="flex items-center gap-2">
            {amenities.slice(0, 3).map((a) => (
              <span key={a} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                {a === 'Food' ? <Utensils size={10} /> : a === 'Restroom' ? <Wifi size={10} /> : null}
                {a}
              </span>
            ))}
            {amenities.length > 3 && <span className="text-[10px] text-gray-400">+{amenities.length - 3}</span>}
          </div>
          <span className="text-sm font-bold text-sky-600">{score}/100</span>
        </div>
      </div>
    </Link>
  );
}
