'use client';

import { useState, useCallback } from 'react';
import { MessageSquare, ThumbsUp, Send, CheckCircle } from 'lucide-react';

interface StationTip {
  id: string;
  stationId: string;
  tip: string;
  rating: number; // 1-5 family-friendliness
  author: string;
  timestamp: string;
}

function getTips(stationId: string): StationTip[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`tips-${stationId}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveTip(stationId: string, tip: StationTip) {
  const existing = getTips(stationId);
  const updated = [tip, ...existing].slice(0, 30);
  localStorage.setItem(`tips-${stationId}`, JSON.stringify(updated));
}

function getFamilyFriendlyScore(stationId: string): number {
  const tips = getTips(stationId);
  if (tips.length === 0) return 0;
  return Math.round(tips.reduce((sum, t) => sum + t.rating, 0) / tips.length * 10) / 10;
}

export { getTips, getFamilyFriendlyScore };

interface Props {
  stationId: string;
  stationName: string;
}

export default function StationTipForm({ stationId, stationName }: Props) {
  const [tips, setTips] = useState<StationTip[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [tipText, setTipText] = useState('');
  const [rating, setRating] = useState(3);
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load tips on mount
  useState(() => {
    if (!loaded) {
      setTips(getTips(stationId));
      setLoaded(true);
    }
  });

  const handleSubmit = useCallback(() => {
    if (!tipText.trim()) return;
    const newTip: StationTip = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      stationId,
      tip: tipText.trim(),
      rating,
      author: author.trim() || 'Anonymous',
      timestamp: new Date().toISOString(),
    };
    saveTip(stationId, newTip);
    setTips(prev => [newTip, ...prev]);
    setSubmitted(true);
    setTipText('');
    setRating(3);
    setAuthor('');
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
    }, 2000);
  }, [stationId, tipText, rating, author]);

  const familyScore = getFamilyFriendlyScore(stationId);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/70 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-pink-500" />
          <h3 className="text-sm font-bold text-gray-900">Family Tips for {stationName}</h3>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setSubmitted(false); }}
          className="flex items-center gap-1 px-3 py-1.5 bg-pink-50 text-pink-700 text-xs font-medium rounded-lg hover:bg-pink-100 transition-colors border border-pink-200"
        >
          <ThumbsUp size={12} /> Share a Tip
        </button>
      </div>

      {/* Family-friendliness score */}
      {familyScore > 0 && (
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-600">
          <span className="font-medium">Family Score:</span>
          <span className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} className={star <= familyScore ? 'text-pink-500' : 'text-gray-200'}>
                ★
              </span>
            ))}
          </span>
          <span className="text-gray-400">({familyScore.toFixed(1)})</span>
        </div>
      )}

      {/* Report form */}
      {showForm && (
        <div className="mb-4 p-4 bg-pink-50 rounded-xl border border-pink-200">
          {submitted ? (
            <div className="text-center py-4">
              <CheckCircle size={24} className="mx-auto text-emerald-500 mb-2" />
              <p className="text-sm font-medium text-gray-900">Thanks for the tip!</p>
              <p className="text-xs text-gray-500">Your insight helps other families.</p>
            </div>
          ) : (
            <>
              <h4 className="text-sm font-semibold text-pink-800 mb-2">
                💡 How family-friendly is this charger?
              </h4>
              <p className="text-xs text-gray-500 mb-3">
                Share a tip for other families visiting this station.
              </p>

              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-3">
                <span className="text-xs text-gray-500 mr-2">Rating:</span>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-lg transition-colors ${star <= rating ? 'text-pink-500' : 'text-gray-200 hover:text-pink-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                value={tipText}
                onChange={e => setTipText(e.target.value)}
                placeholder="e.g. Great restroom, stroller-friendly, staff helped with charging..."
                className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 mb-2 resize-none"
                rows={2}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="Your name (optional)"
                  className="flex-1 px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!tipText.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={14} /> Submit
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Tips list */}
      {tips.length === 0 && !showForm ? (
        <p className="text-xs text-gray-400 text-center py-3">
          No tips yet. Share your experience to help other families!
        </p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {tips.map(t => (
            <div key={t.id} className="p-3 bg-white rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`text-xs ${star <= t.rating ? 'text-pink-500' : 'text-gray-200'}`}>★</span>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">{t.author} · {new Date(t.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-gray-700">{t.tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
