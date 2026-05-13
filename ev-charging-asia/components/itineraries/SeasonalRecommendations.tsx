'use client';

import { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, Thermometer } from 'lucide-react';

interface SeasonalRecommendationsProps {
  bestSeason: string;
  countries: string[];
}

type MonthStatus = 'recommended' | 'acceptable' | 'not-recommended';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Infer month-by-month recommendations from the bestSeason text and countries.
 * Returns an array of 12 MonthStatus values (one per month).
 */
function inferMonthlyRecommendations(bestSeason: string, countries: string[]): MonthStatus[] {
  const lower = bestSeason.toLowerCase();
  const months: MonthStatus[] = Array(12).fill('acceptable');

  // Parse explicit month ranges from the best season text
  const monthByName: Record<string, number> = {
    january: 0, jan: 0,
    february: 1, feb: 1,
    march: 2, mar: 2,
    april: 3, apr: 3,
    may: 4,
    june: 5, jun: 5,
    july: 6, jul: 6,
    august: 7, aug: 7,
    september: 8, sep: 8,
    october: 9, oct: 9,
    november: 10, nov: 10,
    december: 11, dec: 11,
  };

  // Look for patterns like "November to February" or "March to May" or "October to March"
  const rangePatterns = [
    /(january|february|march|april|may|june|july|august|september|october|november|december)\s*(?:-|to|through|–)\s*(january|february|march|april|may|june|july|august|september|october|november|december)/i,
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(?:-|to|through|–)\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  ];

  const monthsInRange: number[] = [];
  for (const pattern of rangePatterns) {
    const match = lower.match(pattern);
    if (match) {
      const startMonth = monthByName[match[1].toLowerCase()];
      const endMonth = monthByName[match[2].toLowerCase()];
      if (startMonth !== undefined && endMonth !== undefined) {
        if (endMonth >= startMonth) {
          for (let m = startMonth; m <= endMonth; m++) monthsInRange.push(m);
        } else {
          // Wraps around year (e.g., November to February)
          for (let m = startMonth; m < 12; m++) monthsInRange.push(m);
          for (let m = 0; m <= endMonth; m++) monthsInRange.push(m);
        }
      }
    }
  }

  // Check for monsoon/rainy season mentions
  const hasMonsoon = /monsoon|rainy|rain|wet|typhoon/i.test(lower);
  const hasAvoidSummer = /avoid|hot|summer/i.test(lower);

  // If we found explicit ranges
  if (monthsInRange.length > 0) {
    monthsInRange.forEach(m => { months[m] = 'recommended'; });
  } else if (lower.includes('year-round') || lower.includes('year round')) {
    return Array(12).fill('recommended');
  } else {
    // Default logic based on country
    const primaryCountry = countries[0]?.toLowerCase() || '';

    if (primaryCountry === 'thailand' || primaryCountry === 'malaysia' || primaryCountry === 'vietnam') {
      // Southeast Asia: Nov-Feb good, Mar-Jun okay, Jul-Oct rainy
      [0, 1, 10, 11].forEach(m => { months[m] = 'recommended'; }); // Nov-Feb
      [2, 3, 4, 5].forEach(m => { months[m] = 'acceptable'; }); // Mar-Jun
      [6, 7, 8, 9].forEach(m => { months[m] = 'not-recommended'; }); // Jul-Oct
    } else if (primaryCountry === 'japan') {
      // Japan: Mar-May, Oct-Nov good; Jun-Sep hot/humid/rainy; Dec-Feb cold
      [2, 3, 4, 9, 10].forEach(m => { months[m] = 'recommended'; }); // Mar-May, Oct-Nov
      [5, 6, 7, 8].forEach(m => { months[m] = 'acceptable'; }); // Jun-Sep
      [0, 1, 11].forEach(m => { months[m] = 'acceptable'; }); // Dec-Feb
    } else if (primaryCountry === 'india') {
      // India: Oct-Mar good, Apr-Jun hot, Jul-Sep monsoon
      [9, 10, 11, 0, 1, 2].forEach(m => { months[m] = 'recommended'; }); // Oct-Mar
      [3, 4, 5].forEach(m => { months[m] = 'acceptable'; }); // Apr-Jun
      [6, 7, 8].forEach(m => { months[m] = 'not-recommended'; }); // Jul-Sep
    } else if (primaryCountry === 'indonesia') {
      // Indonesia: Apr-Oct dry, Nov-Mar wet
      [3, 4, 5, 6, 7, 8, 9].forEach(m => { months[m] = 'recommended'; });
      [0, 1, 2, 10, 11].forEach(m => { months[m] = 'acceptable'; });
    } else if (primaryCountry === 'singapore' || primaryCountry === 'china') {
      // Singapore: year-round but Feb-Jul slightly better
      return Array(12).fill('acceptable');
    }
  }

  // Apply overrides from text
  if (hasMonsoon) {
    [6, 7, 8, 9].forEach(m => { if (months[m] !== 'not-recommended') months[m] = 'not-recommended'; });
  }
  if (hasAvoidSummer) {
    [4, 5, 6, 7, 8].forEach(m => { if (months[m] === 'recommended') months[m] = 'acceptable'; });
  }

  return months;
}

function getPackingTips(bestSeason: string, countries: string[]): string[] {
  const tips: string[] = [];
  const lower = bestSeason.toLowerCase();
  const primaryCountry = countries[0]?.toLowerCase() || '';

  // General tips based on season keywords
  if (/cool|cold|winter|november|december|january|february/i.test(lower)) {
    tips.push('Light jacket or sweater for evenings — temps can drop significantly in the mountains');
  }
  if (/hot|summer|march|april|may|june/i.test(lower)) {
    tips.push('Light, breathable clothing, sunblock, and hats for hot daytime temperatures');
  }
  if (/rain|monsoon|wet|july|august|september|october/i.test(lower)) {
    tips.push('Rain jacket or umbrella — sudden downpours are common');
  }
  if (primaryCountry === 'japan') {
    tips.push('Comfortable walking shoes — you\'ll be exploring temples and nature trails');
    tips.push('Reusable water bottle — hydration stations are common at convenience stores');
  }
  if (primaryCountry === 'india') {
    tips.push('Scarf or shawl — useful for temple visits and dusty roads');
    tips.push('Insect repellent — especially for evening outdoor dining');
  }
  if (primaryCountry === 'thailand' || primaryCountry === 'malaysia' || primaryCountry === 'vietnam') {
    tips.push('Light rain jacket — tropical showers can appear anytime');
    tips.push('Swimwear — beach stops and hotel pools are a daily possibility');
  }
  if (primaryCountry === 'indonesia') {
    tips.push('Sarong — required for temple visits in Bali');
  }

  // EV-specific packing
  tips.push('Type 2 charging cable for hotel overnight charging');
  tips.push('Portable power bank for your devices');

  return tips.slice(0, 5);
}

function getSeasonSummary(bestSeason: string): string {
  const lower = bestSeason.toLowerCase();
  if (/cherry blossom|spring/i.test(lower)) {
    return '🌸 Spring offers mild temperatures and blooming cherry blossoms — perfect for outdoor sightseeing and scenic drives.';
  }
  if (/autumn|fall|foliage/i.test(lower)) {
    return '🍂 Autumn brings crisp air and brilliant fall colors. Mountain routes offer spectacular views.';
  }
  if (/cool|cold|winter/i.test(lower)) {
    return '❄️ Cool season with clear skies and comfortable driving conditions. Mountain areas can be chilly in the evenings.';
  }
  if (/dry/i.test(lower)) {
    return '☀️ Dry season provides excellent driving conditions with minimal rain and clear skies. Peak travel season.';
  }
  if (/monsoon|rain|wet/i.test(lower)) {
    return '🌧️ Rainy season — roads may be slippery. Allow extra travel time and carry rain gear. Lush green landscapes.';
  }
  if (/year.round|year-round/i.test(lower)) {
    return '🌴 Year-round destination with generally favorable conditions. Pack for warm weather and occasional rain.';
  }
  return '📅 Best travel season as recommended for the best weather, road conditions, and crowd levels.';
}

export default function SeasonalRecommendations({ bestSeason, countries }: SeasonalRecommendationsProps) {
  const [monthlyRecommendations, setMonthlyRecommendations] = useState<MonthStatus[]>([]);

  useEffect(() => {
    setMonthlyRecommendations(inferMonthlyRecommendations(bestSeason, countries));
  }, [bestSeason, countries]);

  if (monthlyRecommendations.length === 0) return null;

  const colors: Record<MonthStatus, string> = {
    'recommended': 'bg-emerald-600',
    'acceptable': 'bg-amber-400',
    'not-recommended': 'bg-red-400',
  };

  const labels: Record<MonthStatus, string> = {
    'recommended': 'Recommended',
    'acceptable': 'Acceptable',
    'not-recommended': 'Not Recommended',
  };

  const packingTips = getPackingTips(bestSeason, countries);
  const summary = getSeasonSummary(bestSeason);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Sun size={18} className="text-amber-500" />
        Seasonal Recommendations
      </h3>

      {/* Month recommendation bar */}
      <div className="mb-4">
        <div className="flex rounded-xl overflow-hidden h-8 shadow-sm border border-gray-100">
          {monthlyRecommendations.map((status, i) => (
            <div
              key={i}
              className={`flex-1 flex items-center justify-center ${colors[status]} transition-all`}
              title={`${MONTHS[i]}: ${labels[status]}`}
            >
              <span className="text-[10px] font-semibold text-white drop-shadow-sm">
                {MONTHS[i]}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
          {(Object.keys(labels) as MonthStatus[]).map((status) => (
            <div key={status} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${colors[status]}`} />
              <span>{labels[status]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-3.5 mb-4">
        <div className="flex items-start gap-2">
          <Thermometer size={16} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
      </div>

      {/* Best season text from itinerary */}
      <div className="bg-amber-50 rounded-xl p-3.5 mb-4">
        <div className="flex items-start gap-2">
          <Cloud size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 font-medium">{bestSeason}</p>
        </div>
      </div>

      {/* Packing tips */}
      {packingTips.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
            <CloudRain size={13} className="text-blue-400" />
            What to Pack
          </h4>
          <ul className="space-y-1">
            {packingTips.map((tip, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-gray-300 shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
