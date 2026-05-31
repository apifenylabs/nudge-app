'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Zap, Lightbulb, ArrowRight } from 'lucide-react';

interface RouteBasic {
  id: string;
  slug: string;
  title: string;
  totalDistanceKm: number;
  duration: string;
  difficulty: string;
  countries: string[];
  tags: string[];
}

interface RouteSuggestionsProps {
  currentRouteId: string;
  allRoutes: RouteBasic[];
  /** Max suggestions to show (default 3) */
  maxSuggestions?: number;
  /** Compact inline pills instead of cards */
  inline?: boolean;
}

/**
 * RouteSuggestions — shows similar routes based on weighted scoring.
 * Computes similarity using: region (same country), difficulty, distance, tags, duration.
 * Fully client-side, no API calls, instant results.
 */
export default function RouteSuggestions({
  currentRouteId,
  allRoutes,
  maxSuggestions = 3,
  inline = false,
}: RouteSuggestionsProps) {
  const suggestions = useMemo(() => {
    const current = allRoutes.find(r => r.id === currentRouteId);
    if (!current) return [];

    const scored = allRoutes
      .filter(r => r.id !== currentRouteId)
      .map(other => {
        let score = 0;

        // Region overlap (same country) = +3
        const countryOverlap = other.countries.some(c => current.countries.includes(c));
        if (countryOverlap) score += 3;

        // Same difficulty = +2
        if (other.difficulty === current.difficulty) score += 2;

        // Tag overlap = +1 per shared tag
        const tagScore = other.tags.filter(t => current.tags.includes(t)).length;
        score += tagScore;

        // Distance similarity = +0-2 (closer = more)
        const maxDist = Math.max(current.totalDistanceKm, other.totalDistanceKm);
        if (maxDist > 0) {
          const ratio = 1 - Math.abs(current.totalDistanceKm - other.totalDistanceKm) / maxDist;
          score += ratio * 2;
        }

        // Duration similarity = +0-1
        const cDur = parseInt(current.duration) || 3;
        const oDur = parseInt(other.duration) || 3;
        const durMax = Math.max(cDur, oDur);
        if (durMax > 0) {
          const durRatio = 1 - Math.abs(cDur - oDur) / durMax;
          score += durRatio;
        }

        return { route: other, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSuggestions);

    return scored;
  }, [currentRouteId, allRoutes, maxSuggestions]);

  if (suggestions.length === 0) return null;

  if (inline) {
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        <Lightbulb size={12} className="text-amber-500 shrink-0" />
        <span className="text-[11px] text-gray-500 mr-1">Similar:</span>
        {suggestions.map(({ route, score }) => (
          <Link
            key={route.id}
            href={`/compare?route=${route.slug}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-100 text-amber-700 rounded-full text-[10px] font-medium hover:bg-amber-100 transition-colors"
          >
            {route.title.split(':')[0] || route.title}
            <ArrowRight size={10} />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3.5 bg-gradient-to-r from-amber-50 to-white border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" />
          You Might Also Like
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {suggestions.map(({ route, score }) => (
          <Link
            key={route.id}
            href={`/routes/${route.slug}`}
            className="flex items-center justify-between px-5 py-3 hover:bg-amber-50/40 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shrink-0">
                <Zap size={14} className="text-amber-600" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {route.title.split(':')[0] || route.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                  <span>{route.totalDistanceKm}km</span>
                  <span>·</span>
                  <span>{route.duration}</span>
                  <span>·</span>
                  <span className="capitalize">{route.difficulty}</span>
                  <span>·</span>
                  <span className="text-amber-500">{Math.round(score * 10)}% match</span>
                </div>
              </div>
            </div>
            <ArrowRight size={14} className="text-gray-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>

      <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100">
        <Link
          href="/compare"
          className="text-[11px] font-medium text-sky-600 hover:text-sky-700 flex items-center gap-1"
        >
          Compare all {allRoutes.length} routes <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
