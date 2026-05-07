'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Zap, ArrowLeft, ArrowRight, Check, X, Minus, Route as RouteIcon, Clock, BatteryCharging, Calendar, AlertTriangle, ArrowUpDown, Star } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import SiteFooter from '@/components/SiteFooter';
import type { Itinerary } from '@/data/itineraries';

const allItineraries = getAllItineraries();

const difficultyOrder: Record<string, number> = {
  easy: 1,
  moderate: 2,
  challenging: 3,
};

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-800',
  moderate: 'bg-amber-100 text-amber-800',
  challenging: 'bg-red-100 text-red-800',
};

function compareValue<T>(a: T, b: T, lowerIsBetter: boolean): 'better' | 'worse' | 'equal' {
  if (a === b) return 'equal';
  if (a == null || b == null) return 'equal';
  if (typeof a === 'number' && typeof b === 'number') {
    return lowerIsBetter ? (a < b ? 'better' : 'worse') : (a > b ? 'better' : 'worse');
  }
  return 'equal';
}

function ComparisonCell({ value, comparison }: { value: React.ReactNode; comparison?: 'better' | 'worse' | 'equal' }) {
  const colors: Record<string, string> = {
    better: 'bg-emerald-50 border-emerald-200',
    worse: 'bg-red-50 border-red-200',
    equal: 'bg-gray-50 border-gray-100',
  };
  const icons: Record<string, React.ReactNode> = {
    better: <Check size={14} className="text-emerald-600" />,
    worse: <X size={14} className="text-red-500" />,
    equal: <Minus size={14} className="text-gray-400" />,
  };

  return (
    <div className={`flex items-center justify-between gap-2 p-2 rounded-lg border ${comparison ? colors[comparison] : 'bg-white border-gray-100'}`}>
      <span className="text-xs text-gray-700">{value}</span>
      {comparison && comparison !== 'equal' && icons[comparison]}
    </div>
  );
}

function getComparison(
  a: Itinerary,
  b: Itinerary,
  field: 'distance' | 'duration' | 'difficulty' | 'chargingStops' | 'drivingTime'
): { aComp: 'better' | 'worse' | 'equal'; bComp: 'better' | 'worse' | 'equal' } {
  let aVal: number, bVal: number;
  switch (field) {
    case 'distance':
      aVal = a.totalDistanceKm;
      bVal = b.totalDistanceKm;
      break;
    case 'duration':
      aVal = parseInt(a.duration) || 3;
      bVal = parseInt(b.duration) || 3;
      break;
    case 'difficulty':
      aVal = difficultyOrder[a.difficulty] || 2;
      bVal = difficultyOrder[b.difficulty] || 2;
      break;
    case 'chargingStops':
      aVal = a.estimatedChargingStops;
      bVal = b.estimatedChargingStops;
      break;
    case 'drivingTime':
      aVal = a.totalDrivingHours;
      bVal = b.totalDrivingHours;
      break;
    default:
      return { aComp: 'equal', bComp: 'equal' };
  }
  const isLowerBetter = field !== 'duration'; // More duration days can be better
  const aComparedToB = compareValue(aVal, bVal, isLowerBetter);
  const bComparedToA = compareValue(bVal, aVal, isLowerBetter);

  return {
    aComp: aComparedToB === 'better' ? 'better' : aComparedToB === 'worse' ? 'worse' : 'equal',
    bComp: bComparedToA === 'better' ? 'better' : bComparedToA === 'worse' ? 'worse' : 'equal',
  };
}

function familyRecommendation(a: Itinerary, b: Itinerary): string {
  const aDifficulty = difficultyOrder[a.difficulty] || 2;
  const bDifficulty = difficultyOrder[b.difficulty] || 2;
  const aScore = aDifficulty * 2 + a.totalDistanceKm / 200 - a.familyHighlights.length;
  const bScore = bDifficulty * 2 + b.totalDistanceKm / 200 - b.familyHighlights.length;

  if (aScore < bScore) {
    return `${a.title.split(':')[0] || a.title} is better for families — ${a.difficulty} difficulty, ${a.totalDistanceKm}km total, and ${a.familyHighlights.length} family-friendly highlights.`;
  } else if (bScore < aScore) {
    return `${b.title.split(':')[0] || b.title} is better for families — ${b.difficulty} difficulty, ${b.totalDistanceKm}km total, and ${b.familyHighlights.length} family-friendly highlights.`;
  } else {
    return 'Both routes are equally family-friendly — choose based on your preferred destination and scenery.';
  }
}

export default function ComparePage() {
  const [routeA, setRouteA] = useState<string>(allItineraries[0]?.id || '');
  const [routeB, setRouteB] = useState<string>(allItineraries[1]?.id || '');

  const itineraryA = useMemo(() => allItineraries.find(i => i.id === routeA), [routeA]);
  const itineraryB = useMemo(() => allItineraries.find(i => i.id === routeB), [routeB]);

  const comparison = itineraryA && itineraryB ? {
    distance: getComparison(itineraryA, itineraryB, 'distance'),
    duration: getComparison(itineraryA, itineraryB, 'duration'),
    difficulty: getComparison(itineraryA, itineraryB, 'difficulty'),
    chargingStops: getComparison(itineraryA, itineraryB, 'chargingStops'),
    drivingTime: getComparison(itineraryA, itineraryB, 'drivingTime'),
  } : null;

  const familyAdvice = itineraryA && itineraryB ? familyRecommendation(itineraryA, itineraryB) : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <Link href="/routes" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={14} /> All routes
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link> <span>/</span>
          <Link href="/routes" className="hover:text-gray-700">Routes</Link> <span>/</span>
          <span className="text-gray-900 font-medium">Compare</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <ArrowUpDown size={28} className="text-sky-500" />
          Compare EV Road Trip Routes
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Pick two itinerary routes to compare total distance, difficulty, family highlights, and luxury options side by side.
        </p>

        {/* Route selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Route A</label>
            <select
              value={routeA}
              onChange={e => setRouteA(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            >
              <option value="" disabled>Select a route...</option>
              {allItineraries.map(it => (
                <option key={it.id} value={it.id}>{it.title}</option>
              ))}
            </select>
            {itineraryA && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <RouteIcon size={12} /> {itineraryA.totalDistanceKm}km &middot; {itineraryA.duration}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Route B</label>
            <select
              value={routeB}
              onChange={e => setRouteB(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            >
              <option value="" disabled>Select a route...</option>
              {allItineraries.map(it => (
                <option key={it.id} value={it.id}>{it.title}</option>
              ))}
            </select>
            {itineraryB && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <RouteIcon size={12} /> {itineraryB.totalDistanceKm}km &middot; {itineraryB.duration}
              </div>
            )}
          </div>
        </div>

        {itineraryA && itineraryB ? (
          <>
            {/* Comparison table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
              <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="text-xs font-semibold text-gray-400 uppercase">Metric</div>
                <div className="text-xs font-semibold text-gray-400 uppercase text-center">Route A</div>
                <div className="text-xs font-semibold text-gray-400 uppercase text-center">Route B</div>
              </div>

              {/* Total distance */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <RouteIcon size={14} className="text-amber-500" /> Total Distance
                </div>
                <div className="text-center">
                  <ComparisonCell value={`${itineraryA.totalDistanceKm} km`} comparison={comparison?.distance.aComp} />
                </div>
                <div className="text-center">
                  <ComparisonCell value={`${itineraryB.totalDistanceKm} km`} comparison={comparison?.distance.bComp} />
                </div>
              </div>

              {/* Driving time */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Clock size={14} className="text-sky-500" /> Driving Time
                </div>
                <div className="text-center">
                  <ComparisonCell value={`${itineraryA.totalDrivingHours} hours`} comparison={comparison?.drivingTime.aComp} />
                </div>
                <div className="text-center">
                  <ComparisonCell value={`${itineraryB.totalDrivingHours} hours`} comparison={comparison?.drivingTime.bComp} />
                </div>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Calendar size={14} className="text-purple-500" /> Duration
                </div>
                <div className="text-center">
                  <ComparisonCell value={itineraryA.duration} comparison={comparison?.duration.aComp} />
                </div>
                <div className="text-center">
                  <ComparisonCell value={itineraryB.duration} comparison={comparison?.duration.bComp} />
                </div>
              </div>

              {/* Difficulty */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <AlertTriangle size={14} className="text-amber-500" /> Difficulty
                </div>
                <div className="text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[itineraryA.difficulty]}`}>
                    {itineraryA.difficulty}
                  </span>
                </div>
                <div className="text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[itineraryB.difficulty]}`}>
                    {itineraryB.difficulty}
                  </span>
                </div>
              </div>

              {/* Charging stops */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <BatteryCharging size={14} className="text-emerald-500" /> Charging Stops
                </div>
                <div className="text-center">
                  <ComparisonCell value={`${itineraryA.estimatedChargingStops}+ stops`} comparison={comparison?.chargingStops.aComp} />
                </div>
                <div className="text-center">
                  <ComparisonCell value={`${itineraryB.estimatedChargingStops}+ stops`} comparison={comparison?.chargingStops.bComp} />
                </div>
              </div>

              {/* Countries */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  🌍 Countries
                </div>
                <div className="text-center text-sm text-gray-700">
                  {itineraryA.countries.join(', ')}
                </div>
                <div className="text-center text-sm text-gray-700">
                  {itineraryB.countries.join(', ')}
                </div>
              </div>

              {/* Best season */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  🌿 Best Season
                </div>
                <div className="text-center text-xs text-gray-700">
                  {itineraryA.bestSeason}
                </div>
                <div className="text-center text-xs text-gray-700">
                  {itineraryB.bestSeason}
                </div>
              </div>

              {/* Family highlights */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  👨‍👩‍👧‍👦 Family Highlights
                </div>
                <div className="text-center">
                  <ul className="space-y-1">
                    {itineraryA.familyHighlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="text-[11px] text-gray-600">{h}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <ul className="space-y-1">
                    {itineraryB.familyHighlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="text-[11px] text-gray-600">{h}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Luxury highlights */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  👑 Luxury Highlights
                </div>
                <div className="text-center">
                  <ul className="space-y-1">
                    {itineraryA.luxuryHighlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="text-[11px] text-gray-600 italic">{h}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <ul className="space-y-1">
                    {itineraryB.luxuryHighlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="text-[11px] text-gray-600 italic">{h}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Route cities */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <ArrowRight size={14} className="text-red-400" /> Route Stops
                </div>
                <div className="text-center text-xs text-gray-700">
                  {itineraryA.cities.join(' → ')}
                </div>
                <div className="text-center text-xs text-gray-700">
                  {itineraryB.cities.join(' → ')}
                </div>
              </div>

              {/* Tags */}
              <div className="grid grid-cols-3 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Star size={14} className="text-amber-400" /> Tags
                </div>
                <div className="text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {itineraryA.tags.slice(0, 6).map((tag, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {itineraryB.tags.slice(0, 6).map((tag, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Family recommendation */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
              <h3 className="text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2">
                👨‍👩‍👧‍👦 Which route is better for families?
              </h3>
              <p className="text-sm text-emerald-700 leading-relaxed">{familyAdvice}</p>
            </div>

            {/* CTA to view individual routes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/routes/${itineraryA.slug}`}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">{itineraryA.title}</span>
                  <ArrowRight size={16} className="text-sky-500" />
                </div>
                <span className="text-xs text-gray-500">View full itinerary details</span>
              </Link>
              <Link
                href={`/routes/${itineraryB.slug}`}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">{itineraryB.title}</span>
                  <ArrowRight size={16} className="text-sky-500" />
                </div>
                <span className="text-xs text-gray-500">View full itinerary details</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <ArrowUpDown size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Select two routes</h3>
            <p className="text-gray-500 text-sm">Choose from the dropdowns above to start comparing EV road trip routes.</p>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
