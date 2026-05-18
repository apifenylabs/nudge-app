'use client';

import { useState } from 'react';
import { Download, Check, Loader2 } from 'lucide-react';
import type { Itinerary } from '@/data/itineraries';

interface DownloadRouteGuideProps {
  itinerary: Itinerary;
}

/**
 * Download Route Guide — generates a printable/offline route guide as a
 * formatted text document. No external libs needed, works offline.
 */
export default function DownloadRouteGuide({ itinerary }: DownloadRouteGuideProps) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateGuideText = (): string => {
    const lines: string[] = [];
    const separator = '='.repeat(60);
    const dash = '-'.repeat(60);

    lines.push(separator);
    lines.push('  ' + itinerary.title);
    lines.push(separator);
    lines.push('');
    lines.push(itinerary.subtitle);
    lines.push('');
    lines.push(itinerary.description);
    lines.push('');
    lines.push(dash);
    lines.push('  TRIP SUMMARY');
    lines.push(dash);
    lines.push('  Duration:      ' + itinerary.duration);
    lines.push('  Total Distance: ' + itinerary.totalDistanceKm + ' km');
    lines.push('  Driving Time:   ' + itinerary.totalDrivingHours + ' hours');
    lines.push('  Difficulty:     ' + itinerary.difficulty.toUpperCase());
    lines.push('  Countries:      ' + itinerary.countries.join(', '));
    lines.push('  Route:          ' + itinerary.cities.join(' -> '));
    lines.push('  Best Season:    ' + itinerary.bestSeason);
    lines.push('  Charging Stops: ' + itinerary.estimatedChargingStops + '+ recommended');
    lines.push('');
    lines.push(dash);
    lines.push('  HIGHWAY CONDITIONS');
    lines.push(dash);
    lines.push('  ' + itinerary.highwayConditions);
    lines.push('');
    lines.push(dash);
    lines.push('  CHARGING TIPS');
    lines.push(dash);
    lines.push('  ' + itinerary.chargingTips);
    lines.push('');
    lines.push(dash);
    lines.push('  FAMILY HIGHLIGHTS');
    lines.push(dash);
    itinerary.familyHighlights.forEach(h => lines.push('  ✓ ' + h));
    lines.push('');
    lines.push(dash);
    lines.push('  LUXURY HIGHLIGHTS');
    lines.push(dash);
    itinerary.luxuryHighlights.forEach(h => lines.push('  ✦ ' + h));
    lines.push('');
    lines.push(dash);
    lines.push('  DAY-BY-DAY ITINERARY');
    lines.push(dash);
    lines.push('');

    itinerary.days.forEach((day, idx) => {
      lines.push('  DAY ' + day.day + ': ' + day.title);
      lines.push('  ' + day.startCity + ' -> ' + day.endCity + ' | ' + day.distanceKm + ' km | ' + day.drivingTimeHours + ' hrs');
      lines.push('');
      lines.push('  ' + day.description);
      lines.push('');

      if (day.suggestedStops.length > 0) {
        lines.push('  Charging Stops:');
        day.suggestedStops.forEach(s => lines.push('    - ' + s));
        lines.push('');
      }

      if (day.kidFriendlyStops.length > 0) {
        lines.push('  Family Fun:');
        day.kidFriendlyStops.forEach(s => lines.push('    - ' + s));
        lines.push('');
      }

      if (day.luxuryRecommendation) {
        lines.push('  Stay: ' + day.luxuryRecommendation);
        lines.push('');
      }

      if (day.mealTips) {
        lines.push('  Eat: ' + day.mealTips);
        lines.push('');
      }

      if (idx < itinerary.days.length - 1) {
        lines.push('  ' + '-'.repeat(40));
        lines.push('');
      }
    });

    lines.push(separator);
    lines.push('  Brought to you by EV Charging Asia');
    lines.push('  https://ev-charging-asia.vercel.app');
    lines.push(separator);

    return lines.join('\n');
  };

  const handleDownload = () => {
    setGenerating(true);
    setTimeout(() => {
      const text = generateGuideText();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = itinerary.slug + '-route-guide.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setGenerating(false);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    }, 500);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium shadow-sm disabled:opacity-50"
    >
      {generating ? (
        <Loader2 size={16} className="animate-spin text-sky-500" />
      ) : generated ? (
        <Check size={16} className="text-emerald-500" />
      ) : (
        <Download size={16} />
      )}
      {generated ? 'Downloaded!' : 'Download Route Guide'}
    </button>
  );
}
