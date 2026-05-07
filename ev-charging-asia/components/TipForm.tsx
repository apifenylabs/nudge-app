'use client';

import { useState } from 'react';
import { MessageSquareText, Star, Send } from 'lucide-react';

interface TipFormProps {
  stationId: string;
  stationName: string;
  onTipSubmitted?: () => void;
}

const CATEGORIES = [
  { value: 'family', label: '👨‍👩‍👧‍👦 Family' },
  { value: 'luxury', label: '👑 Luxury' },
  { value: 'wellness', label: '🧘 Wellness' },
  { value: 'charging', label: '🔋 Charging' },
  { value: 'general', label: '💬 General' },
];

export default function TipForm({ stationId, stationName, onTipSubmitted }: TipFormProps) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('general');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (text.length < 10) {
      setError('Please write at least 10 characters for your tip.');
      return;
    }

    if (text.length > 500) {
      setError('Tip must be under 500 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stationId,
          author: author || 'Anonymous',
          text,
          category,
          rating: rating > 0 ? rating : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit tip');
      }

      setSubmitted(true);
      setAuthor('');
      setText('');
      setCategory('general');
      setRating(0);
      onTipSubmitted?.();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <MessageSquareText size={28} className="mx-auto text-emerald-500 mb-2" />
        <h4 className="text-sm font-bold text-emerald-800 mb-1">Tip submitted! 🎉</h4>
        <p className="text-xs text-emerald-600 mb-3">Thanks for sharing your experience at {stationName}.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-emerald-700 underline hover:no-underline"
        >
          Submit another tip
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h4 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
        <MessageSquareText size={16} className="text-sky-500" />
        Submit Your EV Road Trip Tip
      </h4>
      <p className="text-xs text-gray-500 mb-4">
        Share your experience at this charging station — help other EV travelers!
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Author */}
        <div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-700 placeholder-gray-400"
            maxLength={50}
          />
        </div>

        {/* Category */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                category === cat.value
                  ? 'bg-sky-100 text-sky-700 border-sky-300'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-sky-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 mr-1">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`transition-colors ${
                star <= rating ? 'text-amber-400' : 'text-gray-200'
              }`}
            >
              <Star size={16} fill={star <= rating ? 'currentColor' : 'none'} />
            </button>
          ))}
          {rating > 0 && (
            <span className="text-[10px] text-gray-400 ml-1">
              ({rating}/5)
            </span>
          )}
        </div>

        {/* Tip text */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your tip — parking tips, nearby family restaurants, best time to visit, etc."
            className="w-full h-20 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none text-gray-700 placeholder-gray-400"
            maxLength={500}
          />
          <div className="text-right text-[10px] text-gray-400">
            {text.length}/500
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting || text.length < 10}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
        >
          {submitting ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={14} />
              Submit Tip
            </>
          )}
        </button>
      </form>
    </div>
  );
}
