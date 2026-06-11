'use client';

import { useState } from 'react';
import { Star, ThumbsUp, BadgeCheck, User, CalendarDays, Shield, Lightbulb } from 'lucide-react';

export interface ReviewData {
  id: string;
  destination_id: string;
  author_name: string;
  author_badge: 'verified_parent' | 'parent' | 'visitor';
  kids_ages: string[];
  overall_rating: number;
  safety_rating: number | null;
  fun_rating: number | null;
  value_rating: number | null;
  food_rating: number | null;
  title: string;
  content: string;
  visit_date: string | null;
  would_recommend: boolean;
  tips: string;
  helpful_count: number;
  status: string;
  created_at: string;
  user_id?: string | null;
}

interface ReviewCardProps {
  review: ReviewData;
  onHelpfulToggle?: (reviewId: string) => void;
}

const BADGE_CONFIG: Record<string, { label: string; color: string; icon: typeof BadgeCheck }> = {
  verified_parent: {
    label: 'Verified Parent',
    color: 'text-green-800 bg-green-100',
    icon: BadgeCheck,
  },
  parent: {
    label: 'Parent',
    color: 'text-sky-600 bg-sky-50 border-sky-200',
    icon: User,
  },
  visitor: {
    label: 'Visitor',
    color: 'text-gray-600 bg-gray-50 border-gray-200',
    icon: User,
  },
};

function StarRatingStatic({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
        />
      ))}
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function ReviewCard({ review, onHelpfulToggle }: ReviewCardProps) {
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [optimisticCount, setOptimisticCount] = useState(review.helpful_count);
  const badge = BADGE_CONFIG[review.author_badge] || BADGE_CONFIG.parent;
  const BadgeIcon = badge.icon;

  const handleHelpful = () => {
    if (helpfulClicked) return; // don't increment twice
    setHelpfulClicked(true);
    setOptimisticCount((c) => c + 1);
    onHelpfulToggle?.(review.id);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4 transition-all hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5 duration-200">
      {/* Header: Author + Badge + Date */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            <User size={18} className="text-sky-600" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 text-sm truncate">
                {review.author_name}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${badge.color}`}>
                <BadgeIcon size={10} />
                {badge.label}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <span className="flex items-center gap-1">
                <CalendarDays size={11} />
                {formatDate(review.created_at)}
              </span>
              {review.visit_date && (
                <span className="flex items-center gap-1 text-gray-400">
                  &middot; Visited {formatDate(review.visit_date)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <StarRatingStatic rating={review.overall_rating} size={16} />
        </div>
      </div>

      {/* Kids ages */}
      {review.kids_ages.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {review.kids_ages.map((age, i) => (
            <span
              key={i}
              className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100"
            >
              Kid age: {age}
            </span>
          ))}
        </div>
      )}

      {/* Ratings breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {review.safety_rating != null && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Shield size={10} className="text-sky-400" />
            <span className="text-gray-400 mr-0.5">Safety</span>
            <StarRatingStatic rating={review.safety_rating} size={9} />
          </div>
        )}
        {review.fun_rating != null && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="text-gray-400 mr-0.5">Fun</span>
            <StarRatingStatic rating={review.fun_rating} size={9} />
          </div>
        )}
        {review.value_rating != null && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="text-gray-400 mr-0.5">Value</span>
            <StarRatingStatic rating={review.value_rating} size={9} />
          </div>
        )}
        {review.food_rating != null && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="text-gray-400 mr-0.5">Food</span>
            <StarRatingStatic rating={review.food_rating} size={9} />
          </div>
        )}
      </div>

      {/* Title + Content */}
      <div>
        <h4 className="font-semibold text-gray-900 text-sm mb-1.5 leading-snug">
          &ldquo;{review.title}&rdquo;
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {review.content}
        </p>
      </div>

      {/* Tips */}
      {review.tips && (
        <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-4 text-sm text-gray-700">
          <div className="flex items-center gap-1.5 font-medium text-amber-800 text-xs uppercase tracking-wider mb-1">
            <Lightbulb size={12} />
            Parent Tip
          </div>
          {review.tips}
        </div>
      )}

      {/* Recommended + Helpful */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex items-center gap-2">
          {review.would_recommend ? (
            <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              ✓ Recommends
            </span>
          ) : (
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
              Did not recommend
            </span>
          )}
        </div>
        <button
          onClick={handleHelpful}
          disabled={helpfulClicked}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
            helpfulClicked
              ? 'bg-sky-50 border-sky-200 text-sky-700 font-medium shadow-sm'
              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <ThumbsUp size={12} className={helpfulClicked ? 'fill-sky-500' : ''} />
          <span>Helpful · {optimisticCount}</span>
        </button>
      </div>
    </div>
  );
}
