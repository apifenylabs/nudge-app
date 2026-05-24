'use client';

import { useMemo } from 'react';
import { Sun, Cloud, CloudRain, Snowflake, Flower, Umbrella, BatteryWarning } from 'lucide-react';

interface SeasonalComparisonTableProps {
  bestSeason: string;
  countries: string[];
  totalDistanceKm?: number;
  estimatedRangeKm?: number; // typical EV range for comparison
}

type MonthStatus = 'peak' | 'good' | 'okay' | 'avoid';

interface MonthInfo {
  month: string;
  index: number;
  status: MonthStatus;
  icon: React.ReactNode;
  condition: string;
  roadCondition: string;
  rangeMultiplier: number;
  rangeLabel: string;
  rangeColor: string;
}

const MONTHS = [
  { name: 'Jan', days: 31 },
  { name: 'Feb', days: 28 },
  { name: 'Mar', days: 31 },
  { name: 'Apr', days: 30 },
  { name: 'May', days: 31 },
  { name: 'Jun', days: 30 },
  { name: 'Jul', days: 31 },
  { name: 'Aug', days: 31 },
  { name: 'Sep', days: 30 },
  { name: 'Oct', days: 31 },
  { name: 'Nov', days: 30 },
  { name: 'Dec', days: 31 },
];

function getEvRangeMultiplier(monthIndex: number, status: MonthStatus): { multiplier: number; label: string; color: string } {
  switch (status) {
    case 'peak':
      return { multiplier: 1.0, label: '100%', color: 'text-emerald-600' };
    case 'good':
      if (monthIndex >= 9 || monthIndex <= 1) {
        return { multiplier: 0.92, label: '~92%', color: 'text-sky-600' };
      }
      return { multiplier: 0.95, label: '~95%', color: 'text-sky-600' };
    case 'okay':
      if (monthIndex >= 5 && monthIndex <= 8) {
        return { multiplier: 0.85, label: '~85%', color: 'text-amber-600' };
      }
      if (monthIndex <= 1 || monthIndex === 11) {
        return { multiplier: 0.88, label: '~88%', color: 'text-amber-600' };
      }
      return { multiplier: 0.88, label: '~88%', color: 'text-amber-600' };
    case 'avoid':
      return { multiplier: 0.78, label: '~78%', color: 'text-red-600' };
    default:
      return { multiplier: 0.9, label: '~90%', color: 'text-gray-500' };
  }
}

function inferMonthData(bestSeason: string, countries: string[]): MonthInfo[] {
  const lower = bestSeason.toLowerCase();
  const primaryCountry = countries[0]?.toLowerCase() || '';
  const isSEAsia = ['thailand', 'malaysia', 'vietnam', 'indonesia', 'philippines'].includes(primaryCountry);
  const isJapan = primaryCountry === 'japan';
  const isIndia = primaryCountry === 'india';
  const isChina = primaryCountry === 'china';
  const isSingapore = primaryCountry === 'singapore';
  const isSouthKorea = primaryCountry === 'south korea' || primaryCountry === 'korea';

  const monthStatuses: MonthStatus[] = Array(12).fill('okay');

  const monthByName: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };

  const rangePattern = /(\w+)\s*(?:-|to|through|–)\s*(\w+)/i;
  const rangeMatch = lower.match(rangePattern);
  const monthsInRange: number[] = [];

  if (rangeMatch) {
    const start = monthByName[rangeMatch[1].toLowerCase()];
    const end = monthByName[rangeMatch[2].toLowerCase()];
    if (start !== undefined && end !== undefined) {
      if (end >= start) {
        for (let m = start; m <= end; m++) monthsInRange.push(m);
      } else {
        for (let m = start; m < 12; m++) monthsInRange.push(m);
        for (let m = 0; m <= end; m++) monthsInRange.push(m);
      }
    }
  }

  if (monthsInRange.length > 0) {
    monthsInRange.forEach(m => { monthStatuses[m] = 'peak'; });
  } else if (lower.includes('year-round') || lower.includes('year round')) {
    monthStatuses.fill('peak');
    return buildMonthInfos(monthStatuses, bestSeason, countries);
  } else {
    // Country defaults
    if (isSEAsia) {
      monthStatuses[0] = 'peak';   // Jan
      monthStatuses[1] = 'peak';   // Feb
      monthStatuses[2] = 'good';   // Mar
      monthStatuses[3] = 'good';   // Apr
      monthStatuses[4] = 'okay';   // May
      monthStatuses[5] = 'okay';   // Jun
      monthStatuses[6] = 'avoid';  // Jul
      monthStatuses[7] = 'avoid';  // Aug
      monthStatuses[8] = 'avoid';  // Sep
      monthStatuses[9] = 'good';   // Oct
      monthStatuses[10] = 'peak';  // Nov
      monthStatuses[11] = 'peak';  // Dec
    } else if (isJapan) {
      monthStatuses[2] = 'peak';   // Mar (cherry blossom)
      monthStatuses[3] = 'peak';   // Apr
      monthStatuses[4] = 'good';   // May
      monthStatuses[5] = 'okay';   // Jun (rainy)
      monthStatuses[6] = 'okay';   // Jul
      monthStatuses[7] = 'okay';   // Aug
      monthStatuses[8] = 'good';   // Sep
      monthStatuses[9] = 'peak';   // Oct
      monthStatuses[10] = 'peak';  // Nov
      monthStatuses[11] = 'okay';  // Dec
      monthStatuses[0] = 'okay';   // Jan
      monthStatuses[1] = 'good';   // Feb
    } else if (isIndia) {
      monthStatuses[9] = 'peak';   // Oct
      monthStatuses[10] = 'peak';  // Nov
      monthStatuses[11] = 'peak';  // Dec
      monthStatuses[0] = 'peak';   // Jan
      monthStatuses[1] = 'peak';   // Feb
      monthStatuses[2] = 'good';   // Mar
      monthStatuses[3] = 'okay';   // Apr
      monthStatuses[4] = 'okay';   // May
      monthStatuses[5] = 'avoid';  // Jun
      monthStatuses[6] = 'avoid';  // Jul
      monthStatuses[7] = 'avoid';  // Aug
      monthStatuses[8] = 'good';   // Sep
    } else if (isSouthKorea) {
      monthStatuses[2] = 'peak';   // Mar (spring)
      monthStatuses[3] = 'peak';   // Apr
      monthStatuses[4] = 'good';   // May
      monthStatuses[5] = 'good';   // Jun
      monthStatuses[6] = 'okay';   // Jul (hot/humid)
      monthStatuses[7] = 'okay';   // Aug
      monthStatuses[8] = 'good';   // Sep
      monthStatuses[9] = 'peak';   // Oct (autumn)
      monthStatuses[10] = 'good';  // Nov
      monthStatuses[11] = 'okay';  // Dec (cold)
      monthStatuses[0] = 'okay';   // Jan (cold)
      monthStatuses[1] = 'okay';   // Feb
    } else {
      // Generic/other: favor dry/cool months Nov-Feb as peak
      [0, 1, 10, 11].forEach(m => { if (monthStatuses[m] === 'okay') monthStatuses[m] = 'peak'; });
    }
  }

  // Apply monsoon/rain overrides
  if (/monsoon|rainy|rain|typhoon|wet season/i.test(lower)) {
    [6, 7, 8, 9].forEach(m => { monthStatuses[m] = 'avoid'; });
  }

  return buildMonthInfos(monthStatuses, bestSeason, countries);
}

function buildMonthInfos(statuses: MonthStatus[], bestSeason: string, countries: string[]): MonthInfo[] {
  const lower = bestSeason.toLowerCase();
  const isSEAsia = ['thailand', 'malaysia', 'vietnam', 'indonesia', 'philippines'].some(c =>
    countries.map(co => co.toLowerCase()).includes(c)
  );
  const isJapan = countries.some(c => c.toLowerCase() === 'japan');
  const isIndia = countries.some(c => c.toLowerCase() === 'india');

  return MONTHS.map((m, i) => {
    const status = statuses[i];
    let icon: React.ReactNode;
    let condition: string;
    let roadCondition: string;

    switch (status) {
      case 'peak':
        icon = <Sun size={14} className="text-amber-500" />;
        condition = isJapan && (i === 2 || i === 3) ? '🌸 Cherry blossom'
          : isJapan && (i === 9 || i === 10) ? '🍂 Autumn colors'
          : isSEAsia && (i >= 10 || i <= 1) ? '☀️ Cool dry'
          : isIndia && (i >= 9 || i <= 2) ? '☀️ Clear skies'
          : '☀️ Best weather';
        roadCondition = 'Excellent';
        break;
      case 'good':
        icon = <Cloud size={14} className="text-blue-400" />;
        condition = isJapan && i === 4 ? '🌱 Mild spring'
          : isSEAsia ? '☁️ Partly cloudy'
          : '☁️ Pleasant';
        roadCondition = 'Good';
        break;
      case 'okay':
        icon = <Umbrella size={14} className="text-indigo-400" />;
        condition = isJapan && (i >= 5 && i <= 7) ? '🌧 Rainy/humid'
          : isSEAsia ? '🌦 Scattered rain'
          : isIndia ? '🌤 Warm'
          : '🌤 Variable';
        roadCondition = 'Fair';
        break;
      case 'avoid':
        icon = <CloudRain size={14} className="text-red-400" />;
        condition = isSEAsia || isIndia ? '🌧 Heavy rain/monsoon'
          : isJapan ? '🌧 Rainy/typhoon'
          : '🌧 Wet season';
        roadCondition = 'Slippery/risky';
        break;
      default:
        icon = <Sun size={14} className="text-gray-300" />;
        condition = 'Variable';
        roadCondition = 'Varies';
    }

    const rangeInfo = getEvRangeMultiplier(i, status);

    return {
      month: m.name,
      index: i,
      status,
      icon,
      condition,
      roadCondition,
      ...rangeInfo,
    };
  });
}

export default function SeasonalComparisonTable({
  bestSeason,
  countries,
  totalDistanceKm,
  estimatedRangeKm = 400,
}: SeasonalComparisonTableProps) {
  const months = useMemo(() => inferMonthData(bestSeason, countries), [bestSeason, countries]);

  if (months.length === 0) return null;

  const statusColors: Record<MonthStatus, string> = {
    peak: 'bg-emerald-600 text-white',
    good: 'bg-sky-400 text-white',
    okay: 'bg-amber-300 text-amber-900',
    avoid: 'bg-red-400 text-white',
  };

  const statusLabels: Record<MonthStatus, string> = {
    peak: 'Peak',
    good: 'Good',
    okay: 'Okay',
    avoid: 'Avoid',
  };

  // Calculate if this route would need extra charging stops in worst months
  const worstMultiplier = Math.min(...months.map(m => m.multiplier));
  const effectiveRangeWorst = Math.round(estimatedRangeKm * worstMultiplier);
  const needsExtraStops = totalDistanceKm && effectiveRangeWorst < totalDistanceKm / 3;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-4 md:p-5 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Flower size={16} className="text-emerald-500" />
          When to Go — Seasonal Comparison
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Road conditions, weather, and EV range impact by month
        </p>
      </div>

      {/* EV Range Impact Note */}
      {totalDistanceKm && (
        <div className={`px-4 py-2 border-b border-gray-100 text-xs flex items-center gap-2 ${
          needsExtraStops ? 'bg-amber-50 text-amber-800' : 'bg-sky-50 text-sky-800'
        }`}>
          <BatteryWarning size={14} className="shrink-0" />
          {needsExtraStops
            ? `⚠️ In off-peak months, EV range drops to ~${effectiveRangeWorst}km — plan extra charging stops`
            : `💡 Typical EV range (~${estimatedRangeKm}km) is sufficient for this route most months`
          }
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Metric</th>
              {months.map(m => (
                <th key={m.index} className="px-2 py-2.5 text-center font-semibold">
                  <div className="flex flex-col items-center gap-1">
                    {m.icon}
                    <span className="text-gray-900">{m.month}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2.5 font-medium text-gray-700">Rating</td>
              {months.map(m => (
                <td key={m.index} className="px-2 py-2.5 text-center">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${statusColors[m.status]}`}>
                    {statusLabels[m.status]}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-50">
              <td className="px-4 py-2 font-medium text-gray-600">Conditions</td>
              {months.map(m => (
                <td key={m.index} className="px-2 py-2 text-center text-gray-500 text-[10px]">
                  {m.condition}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-50">
              <td className="px-4 py-2 font-medium text-gray-600">Road</td>
              {months.map(m => (
                <td key={m.index} className="px-2 py-2 text-center">
                  <span className={`text-[10px] px-1 py-0.5 rounded ${
                    m.roadCondition === 'Excellent' ? 'bg-emerald-50 text-emerald-700' :
                    m.roadCondition === 'Good' ? 'bg-sky-50 text-sky-700' :
                    m.roadCondition === 'Fair' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {m.roadCondition}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium text-gray-600">⚡ EV Range</td>
              {months.map(m => (
                <td key={m.index} className="px-2 py-2 text-center">
                  <span className={`text-[10px] font-semibold ${m.rangeColor}`}>
                    {m.rangeLabel}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile: scrollable row format */}
      <div className="md:hidden p-3">
        {months.map(m => (
          <div key={m.index} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-1.5 w-12 shrink-0">
              {m.icon}
              <span className="text-xs font-semibold text-gray-900">{m.month}</span>
            </div>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${statusColors[m.status]}`}>
              {statusLabels[m.status]}
            </span>
            <span className={`text-[10px] font-medium ${m.rangeColor}`}>{m.rangeLabel}</span>
            <span className="text-[10px] text-gray-500 truncate">{m.condition}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-4 pb-3 pt-1 flex items-center gap-3 text-[10px] text-gray-400 border-t border-gray-50 flex-wrap">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /> Peak</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-sky-400" /> Good</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-300" /> Okay</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-400" /> Avoid</span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1"><BatteryWarning size={10} /> EV range impact shown</span>
      </div>
    </div>
  );
}
