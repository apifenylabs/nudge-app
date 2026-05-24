'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ArrowLeft, ArrowRight, Check, X, Minus, Route as RouteIcon, Clock, BatteryCharging, Calendar, AlertTriangle, ArrowUpDown, Star, Table, List } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import SiteFooter from '@/components/SiteFooter';
import NewsletterSignup from '@/components/NewsletterSignup';
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
  const isLowerBetter = field !== 'duration';
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

// SEO handled via Head component since this is a client component
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ev-charging-asia.vercel.app/' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://ev-charging-asia.vercel.app/routes' },
    { '@type': 'ListItem', position: 3, name: 'Compare EV Routes', item: 'https://ev-charging-asia.vercel.app/compare' },
  ],
};

export default function ComparePage() {
  const [routeA, setRouteA] = useState<string>('');
  const [routeB, setRouteB] = useState<string>('');
  const [showOverview, setShowOverview] = useState(false);

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const routeParam = params.get('route');
    if (routeParam) {
      const found = allItineraries.find(i => i.slug === routeParam || i.id === routeParam);
      if (found) {
        setRouteA(found.id);
        // Set the second to a different route
        const others = allItineraries.filter(i => i.id !== found.id);
        if (others.length > 0) {
          setRouteB(others[0].id);
        }
      }
    } else {
      // Default: first two routes
      setRouteA(allItineraries[0]?.id || '');
      setRouteB(allItineraries[1]?.id || '');
    }
  }, []);

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
      {/* SEO metadata for client-side page */}
      <head>
        <title>Compare EV Road Trip Routes — EV Charging Asia</title>
        <meta name="description" content="Compare EV road trip routes across Asia. See side-by-side distance, difficulty, family highlights, charging stops, and luxury options for all routes." />
        <meta name="keywords" content="EV road trip comparison, compare EV routes Asia, electric vehicle road trip comparison, Thailand vs Malaysia EV, best EV road trip Asia" />
        <link rel="canonical" href="https://ev-charging-asia.vercel.app/compare" />
      </head>
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
        <p className="text-sm text-gray-600 mb-4">
          Pick two itinerary routes to compare total distance, difficulty, family highlights, and luxury options side by side.
        </p>

        {/* Toggle overview table button */}
        <button
          onClick={() => setShowOverview(!showOverview)}
          className="flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 mb-6 font-medium"
        >
          {showOverview ? <List size={14} /> : <Table size={14} />}
          {showOverview ? 'Show side-by-side comparison' : 'Show overview of all 12 routes'}
        </button>

        {/* All-routes overview table */}
        {showOverview && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Table size={16} className="text-sky-500" />
                All {allItineraries.length} Routes at a Glance
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-500">Route</th>
                    <th className="px-3 py-2.5 font-semibold text-gray-500 text-center">Country</th>
                    <th className="px-3 py-2.5 font-semibold text-gray-500 text-center">Duration</th>
                    <th className="px-3 py-2.5 font-semibold text-gray-500 text-center">Distance</th>
                    <th className="px-3 py-2.5 font-semibold text-gray-500 text-center">Driving</th>
                    <th className="px-3 py-2.5 font-semibold text-gray-500 text-center">Difficulty</th>
                    <th className="px-3 py-2.5 font-semibold text-gray-500 text-center">Charges</th>
                    <th className="px-3 py-2.5 font-semibold text-gray-500 text-center">Season</th>
                  </tr>
                </thead>
                <tbody>
                  {allItineraries.map((it, i) => (
                    <tr
                      key={it.id}
                      className={`border-b border-gray-50 hover:bg-sky-50/30 transition-colors ${
                        i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <td className="px-3 py-2.5">
                        <Link href={`/routes/${it.slug}`} className="font-medium text-gray-900 hover:text-sky-700">
                          {it.title.split(':')[0] || it.title}
                        </Link>
                        <div className="text-[10px] text-gray-400 mt-0.5">{it.cities.slice(0, 3).join(' → ')}</div>
                      </td>
                      <td className="px-3 py-2.5 text-center text-gray-600">{it.countries[0]}</td>
                      <td className="px-3 py-2.5 text-center font-medium text-gray-800">{it.duration}</td>
                      <td className="px-3 py-2.5 text-center text-gray-700">{it.totalDistanceKm} km</td>
                      <td className="px-3 py-2.5 text-center text-gray-700">{it.totalDrivingHours}h</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${difficultyColors[it.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                          {it.difficulty}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center text-gray-700">{it.estimatedChargingStops}+</td>
                      <td className="px-3 py-2.5 text-center text-[10px] text-gray-500 max-w-[100px] truncate" title={it.bestSeason}>
                        {it.bestSeason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
                <option key={it.id} value={it.id}>{it.title.split(':')[0] || it.title}</option>
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
                <option key={it.id} value={it.id}>{it.title.split(':')[0] || it.title}</option>
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
                <div className="text-xs font-semibold text-gray-400 uppercase text-center">
                  <Link href={`/routes/${itineraryA.slug}`} className="hover:text-sky-600">{itineraryA.title.split(':')[0]}</Link>
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase text-center">
                  <Link href={`/routes/${itineraryB.slug}`} className="hover:text-sky-600">{itineraryB.title.split(':')[0]}</Link>
                </div>
              </div>

              {[
                {
                  label: 'Total Distance',
                  icon: <RouteIcon size={14} className="text-amber-500" />,
                  render: () => (
                    <>
                      <ComparisonCell value={`${itineraryA.totalDistanceKm} km`} comparison={comparison?.distance.aComp} />
                      <ComparisonCell value={`${itineraryB.totalDistanceKm} km`} comparison={comparison?.distance.bComp} />
                    </>
                  ),
                },
                {
                  label: 'Driving Time',
                  icon: <Clock size={14} className="text-sky-500" />,
                  render: () => (
                    <>
                      <ComparisonCell value={`${itineraryA.totalDrivingHours} hours`} comparison={comparison?.drivingTime.aComp} />
                      <ComparisonCell value={`${itineraryB.totalDrivingHours} hours`} comparison={comparison?.drivingTime.bComp} />
                    </>
                  ),
                },
                {
                  label: 'Duration',
                  icon: <Calendar size={14} className="text-purple-500" />,
                  render: () => (
                    <>
                      <ComparisonCell value={itineraryA.duration} comparison={comparison?.duration.aComp} />
                      <ComparisonCell value={itineraryB.duration} comparison={comparison?.duration.bComp} />
                    </>
                  ),
                },
                {
                  label: 'Difficulty',
                  icon: <AlertTriangle size={14} className="text-amber-500" />,
                  render: () => (
                    <>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[itineraryA.difficulty]}`}>
                        {itineraryA.difficulty}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[itineraryB.difficulty]}`}>
                        {itineraryB.difficulty}
                      </span>
                    </>
                  ),
                },
                {
                  label: 'Charging Stops',
                  icon: <BatteryCharging size={14} className="text-emerald-500" />,
                  render: () => (
                    <>
                      <ComparisonCell value={`${itineraryA.estimatedChargingStops}+ stops`} comparison={comparison?.chargingStops.aComp} />
                      <ComparisonCell value={`${itineraryB.estimatedChargingStops}+ stops`} comparison={comparison?.chargingStops.bComp} />
                    </>
                  ),
                },
                {
                  label: 'Countries',
                  icon: <span className="text-sm">🌍</span>,
                  render: () => (
                    <>
                      <div className="text-xs text-gray-700">{itineraryA.countries.join(', ')}</div>
                      <div className="text-xs text-gray-700">{itineraryB.countries.join(', ')}</div>
                    </>
                  ),
                },
                {
                  label: 'Best Season',
                  icon: <span className="text-sm">🌿</span>,
                  render: () => (
                    <>
                      <div className="text-xs text-gray-700">{itineraryA.bestSeason}</div>
                      <div className="text-xs text-gray-700">{itineraryB.bestSeason}</div>
                    </>
                  ),
                },
                {
                  label: 'Family Highlights',
                  icon: <span className="text-sm">👨‍👩‍👧‍👦</span>,
                  render: () => (
                    <>
                      <ul className="space-y-0.5 text-[11px] text-gray-600">
                        {itineraryA.familyHighlights.slice(0, 2).map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                      <ul className="space-y-0.5 text-[11px] text-gray-600">
                        {itineraryB.familyHighlights.slice(0, 2).map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </>
                  ),
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 ${i < 7 ? 'border-b border-gray-100' : ''} px-4 py-3 hover:bg-gray-50/50`}
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">{row.icon} {row.label}</div>
                  <div className="text-center">{row.render().props ? row.render() : row.render().props.children[0]}</div>
                  <div className="text-center">{row.render().props ? row.render().props.children[1] : null}</div>
                </div>
              ))}

              {/* Luxury highlights */}
              <div className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <span className="text-sm">👑</span> Luxury Highlights
                </div>
                <div className="text-center">
                  <ul className="space-y-0.5">
                    {itineraryA.luxuryHighlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="text-[11px] text-gray-600 italic">{h}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <ul className="space-y-0.5">
                    {itineraryB.luxuryHighlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="text-[11px] text-gray-600 italic">{h}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Route stops */}
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
              <div className="grid grid-cols-3 px-4 py-3 hover:bg-gray-50/50 rounded-b-2xl">
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

      {/* JSON-LD Structured Data */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSignup variant="inline" source="compare" />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteFooter />
    </div>
  );
}
