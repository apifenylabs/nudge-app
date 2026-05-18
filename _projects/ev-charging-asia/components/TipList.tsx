'use client';

import { useEffect, useState, useCallback } from 'react';
import { MessageSquareText, ThumbsUp, Star, Clock, ChevronDown, ChevronUp, Filter, SortDesc, ArrowUpDown } from 'lucide-react';

interface Tip {
  id: string;
  stationId: string;
  author: string;
  text: string;
  category: string;
  rating?: number;
  createdAt: string;
  helpful: number;
}

interface TipListProps {
  stationId: string;
  refreshKey?: number;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  family: '👨‍👩‍👧‍👦',
  luxury: '👑',
  wellness: '🧘',
  charging: '🔋',
  general: '💬',
};

const CATEGORIES = ['all', 'family', 'luxury', 'charging', 'wellness', 'general'];

type SortMode = 'newest' | 'helpful' | 'rating';

export default function TipList({ stationId, refreshKey = 0 }: TipListProps) {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  // Load helpful votes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`tip-helpful-${stationId}`);
      if (stored) {
        setHelpfulVotes(JSON.parse(stored));
      }
    } catch {
      // localStorage not available
    }
  }, [stationId]);

  const fetchTips = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tips?stationId=${encodeURIComponent(stationId)}`);
      const data = await res.json();
      setTips(data.tips || []);
    } catch {
      setTips([]);
    } finally {
      setLoading(false);
    }
  }, [stationId]);

  useEffect(() => {
    fetchTips();
  }, [fetchTips, refreshKey]);

  const handleHelpful = useCallback((tipId: string) => {
    if (helpfulVotes[tipId]) return; // Already voted

    setTips(prev => prev.map(t => t.id === tipId ? { ...t, helpful: t.helpful + 1 } : t));
    const updated = { ...helpfulVotes, [tipId]: true };
    setHelpfulVotes(updated);
    try {
      localStorage.setItem(`tip-helpful-${stationId}`, JSON.stringify(updated));
    } catch {
      // localStorage not available
    }

    // Fire-and-forget API call to persist the vote
    fetch('/api/tips/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipId, stationId }),
    }).catch(() => {});
  }, [helpfulVotes, stationId]);

  // Filter and sort tips
  const filteredTips = tips.filter(t => activeCategory === 'all' || t.category === activeCategory);

  const sortedTips = [...filteredTips].sort((a, b) => {
    switch (sortMode) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const displayedTips = showAll ? sortedTips : sortedTips.slice(0, 3);

  // Calculate rating stats
  const ratingsWithValue = filteredTips.filter(t => t.rating != null && t.rating > 0);
  const avgRating = ratingsWithValue.length > 0
    ? ratingsWithValue.reduce((sum, t) => sum + (t.rating || 0), 0) / ratingsWithValue.length
    : 0;

  // Rating breakdown
  const ratingBreakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  ratingsWithValue.forEach(t => {
    const r = t.rating || 0;
    if (r >= 1 && r <= 5) ratingBreakdown[r]++;
  });

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <MessageSquareText size={14} />
          Loading tips...
        </div>
        <div className="space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse bg-white rounded-lg p-3">
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-1" />
              <div className="h-2 bg-gray-100 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tips.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <MessageSquareText size={24} className="text-gray-300" />
        </div>
        <h4 className="text-sm font-semibold text-gray-900 mb-1">No tips yet</h4>
        <p className="text-xs text-gray-500 mb-4">
          Be the first to share a tip about this charging station!
        </p>
        <div className="inline-block px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-lg">
          Add a tip above
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <MessageSquareText size={16} className="text-sky-500" />
          Traveler Tips ({filteredTips.length})
        </h4>
      </div>

      {/* Average rating */}
      {avgRating > 0 && (
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-100 p-3 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(avgRating) ? 'text-amber-400' : 'text-gray-200'}
                fill={i < Math.round(avgRating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">{avgRating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">({ratingsWithValue.length} ratings)</span>
        </div>
      )}

      {/* Rating breakdown */}
      {ratingsWithValue.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-100 p-3 mb-3">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="flex items-center gap-2 text-xs mb-1 last:mb-0">
              <span className="text-gray-500 w-3">{star}</span>
              <Star size={10} className="text-amber-400" fill="currentColor" />
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${ratingsWithValue.length > 0 ? (ratingBreakdown[star] / ratingsWithValue.length) * 100 : 0}%` }}
                />
              </div>
              <span className="text-gray-400 w-4 text-right">{ratingBreakdown[star]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setShowAll(false); }}
            className={`text-[11px] px-2 py-1 rounded-lg font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-sky-500 text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-sky-200 hover:text-sky-600'
            }`}
          >
            {cat === 'all' ? 'All' : `${CATEGORY_EMOJIS[cat] || '💬'} ${cat}`}
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div className="flex items-center gap-2 mb-3">
        <SortDesc size={12} className="text-gray-400" />
        <span className="text-[10px] text-gray-400 mr-1">Sort:</span>
        {(['newest', 'helpful', 'rating'] as SortMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setSortMode(mode)}
            className={`text-[10px] px-2 py-0.5 rounded font-medium transition-colors ${
              sortMode === mode
                ? 'bg-gray-200 text-gray-700'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {mode === 'newest' ? 'Newest' : mode === 'helpful' ? 'Most Helpful' : 'Highest Rated'}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {displayedTips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-900">{tip.author}</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">
                  {CATEGORY_EMOJIS[tip.category] || '💬'} {tip.category}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Clock size={10} />
                {new Date(tip.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed mb-2">{tip.text}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {tip.rating && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: tip.rating }).map((_, i) => (
                      <Star key={i} size={11} className="text-amber-400" fill="currentColor" />
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleHelpful(tip.id)}
                disabled={helpfulVotes[tip.id]}
                className={`flex items-center gap-1 text-[10px] transition-colors ${
                  helpfulVotes[tip.id]
                    ? 'text-sky-500'
                    : 'text-gray-400 hover:text-sky-600'
                }`}
                title={helpfulVotes[tip.id] ? 'You found this helpful' : 'Mark as helpful'}
              >
                <ThumbsUp size={11} />
                {tip.helpful}
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedTips.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-medium mx-auto"
        >
          {showAll ? (
            <>Show less <ChevronUp size={14} /></>
          ) : (
            <>View all {sortedTips.length} tips <ChevronDown size={14} /></>
          )}
        </button>
      )}
    </div>
  );
}
