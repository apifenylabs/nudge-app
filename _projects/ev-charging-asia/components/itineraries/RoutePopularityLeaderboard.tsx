'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, TrendingUp, Users, Zap, Medal, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface RouteLeaderboardEntry {
  slug: string;
  title: string;
  displayName: string;
  averageRating: number;
  totalVotes: number;
  difficulty: string;
  duration: string;
  countries: string[];
}

/**
 * Route Popularity Leaderboard
 * 
 * Shows the highest-rated and most-voted routes. Fetches vote data from
 * the /api/vote endpoint for each route and ranks them.
 * 
 * Fully additive — shown on the /routes listing page for social proof.
 */
export default function RoutePopularityLeaderboard() {
  const [ranked, setRanked] = useState<RouteLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'rating' | 'votes'>('rating');

  // localStorage cache key for offline resilience
  const STORAGE_KEY = 'evca-leaderboard-cache';

  const fetchAll = useCallback(async () => {
    try {
      // Try API first
      const res = await fetch('/api/vote/leaderboard');
      if (res.ok) {
        const data = await res.json();
        const entries = data.entries || [];
        setRanked(entries);
        // Cache in localStorage for fallback
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries, ts: Date.now() }));
        } catch { /* quota exceeded */ }
      } else {
        throw new Error('API error');
      }
    } catch {
      // Fallback to localStorage cache
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed.entries)) {
            setRanked(parsed.entries);
          }
        }
      } catch { /* ignore */ }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
        <div className="h-5 w-40 bg-gray-100 rounded mb-4" />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-gray-100 rounded-full" />
            <div className="flex-1 h-4 bg-gray-100 rounded" />
            <div className="w-12 h-4 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (ranked.length === 0) return null;

  const sorted = [...ranked].sort((a, b) =>
    sortBy === 'rating'
      ? b.averageRating - a.averageRating
      : b.totalVotes - a.totalVotes
  );

  const topEntries = sorted.slice(0, 6);

  const medalColors = ['text-amber-500', 'text-gray-400', 'text-amber-700'];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-500" />
            Most Popular Routes
          </h3>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setSortBy('rating')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                sortBy === 'rating' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Star size={11} className="inline mr-0.5" /> Top Rated
            </button>
            <button
              onClick={() => setSortBy('votes')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                sortBy === 'votes' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={11} className="inline mr-0.5" /> Most Votes
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          {sortBy === 'rating' ? 'Community-rated EV road trips across Asia' : 'Routes with the most driver reviews'}
        </p>
      </div>

      {/* Leaderboard items */}
      <div className="divide-y divide-gray-50">
        {topEntries.map((entry, idx) => (
          <Link
            key={entry.slug}
            href={`/routes/${entry.slug}`}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/50 transition-colors group"
          >
            {/* Rank badge */}
            <div className="shrink-0 w-7 h-7 flex items-center justify-center">
              {idx < 3 ? (
                <Medal size={18} className={medalColors[idx]} />
              ) : (
                <span className="text-xs font-bold text-gray-300">{idx + 1}</span>
              )}
            </div>

            {/* Route info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 group-hover:text-sky-600 transition-colors truncate">
                {entry.displayName}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-0.5">
                <span>{entry.duration}</span>
                <span>·</span>
                <span className="capitalize">{entry.difficulty}</span>
                {entry.countries.length > 0 && (
                  <>
                    <span>·</span>
                    <span>{entry.countries.join(', ')}</span>
                  </>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-0.5 text-sm font-bold text-gray-900">
                <Star size={12} className="text-amber-400 fill-current" />
                {entry.averageRating.toFixed(1)}
              </div>
              <div className="text-[10px] text-gray-400">{entry.totalVotes} {entry.totalVotes === 1 ? 'vote' : 'votes'}</div>
            </div>

            <ChevronRight size={14} className="shrink-0 text-gray-300 group-hover:text-sky-400 transition-colors" />
          </Link>
        ))}
      </div>

      {/* View all link */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-center">
        <Link
          href="/compare"
          className="text-xs font-medium text-sky-600 hover:text-sky-700 hover:underline"
        >
          Compare all routes side by side →
        </Link>
      </div>
    </div>
  );
}
