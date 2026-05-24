'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, ThumbsUp, TrendingUp, Users } from 'lucide-react';

interface RouteScore {
  totalVotes: number;
  averageRating: number;
  starDistribution: number[];
}

interface RoutePopularityProps {
  routeId: string;
  routeName: string;
  compact?: boolean;
}

export default function RoutePopularity({ routeId, routeName, compact = false }: RoutePopularityProps) {
  const [score, setScore] = useState<RouteScore | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [voted, setVoted] = useState(false);

  const fetchScore = useCallback(async () => {
    try {
      const res = await fetch(`/api/vote?routeId=${routeId}`);
      if (res.ok) {
        const data = await res.json();
        setScore(data.score);
        setUserRating(data.userVote || 0);
      }
    } catch {
      // Silently fail
    }
  }, [routeId]);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  const handleVote = async (rating: number) => {
    if (submitting || rating === userRating) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId, rating }),
      });

      if (res.ok) {
        const data = await res.json();
        setScore(data.score);
        setUserRating(rating);
        setVoted(true);
      }
    } catch {
      // Silently fail
    } finally {
      setSubmitting(false);
    }
  };

  if (compact) {
    const avgRating = score?.averageRating || 0;
    const totalVotes = score?.totalVotes || 0;

    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Star size={12} className={avgRating > 0 ? 'text-amber-400' : 'text-gray-300'} />
        <span className="font-medium text-gray-700">
          {avgRating > 0 ? avgRating.toFixed(1) : '—'}
        </span>
        <span className="text-gray-400">
          ({totalVotes} {totalVotes === 1 ? 'vote' : 'votes'})
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
        <Star size={16} className="text-amber-400" />
        Rate This Route
      </h3>

      {/* Star rating */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleVote(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              disabled={submitting}
              className={`transition-all ${
                submitting ? 'opacity-50 cursor-wait' : 'cursor-pointer'
              } ${
                (hoverRating || userRating) >= star
                  ? 'text-amber-400 scale-110'
                  : 'text-gray-200 hover:text-amber-300'
              }`}
              title={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <Star
                size={24}
                fill={(hoverRating || userRating) >= star ? 'currentColor' : 'none'}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
        {voted && (
          <span className="text-xs text-emerald-600 font-medium animate-pulse">
            ★ Thanks for rating this route!
          </span>
        )}
        {userRating > 0 && !voted && (
          <span className="text-xs text-gray-400">You rated {userRating}/5 (click to change)</span>
        )}
      </div>

      {/* Score display */}
      {score && score.totalVotes > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-amber-400" />
              <strong className="text-gray-900 text-sm">{score.averageRating.toFixed(1)}</strong>
              / 5
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} />
              {score.totalVotes} {score.totalVotes === 1 ? 'rater' : 'raters'}
            </span>
          </div>

          {/* Star distribution bars */}
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = score.starDistribution[star - 1] || 0;
              const pct = score.totalVotes > 0 ? (count / score.totalVotes) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-[10px]">
                  <span className="w-4 text-gray-400 shrink-0">{star}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-gray-400 shrink-0">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(!score || score.totalVotes === 0) && !userRating && (
        <p className="text-xs text-gray-400 text-center">
          Be the first to rate {routeName.split(':')[0] || routeName}!
        </p>
      )}
    </div>
  );
}
