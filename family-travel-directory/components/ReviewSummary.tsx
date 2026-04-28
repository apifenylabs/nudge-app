'use client';

import { Star, BarChart3 } from 'lucide-react';

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  distribution: { [key: number]: number }; // 1-5 -> count
  wouldRecommendPercent: number;
}

export default function ReviewSummary({
  averageRating,
  totalReviews,
  distribution,
  wouldRecommendPercent,
}: ReviewSummaryProps) {
  const maxCount = Math.max(1, ...Object.values(distribution));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Big average rating */}
        <div className="flex-shrink-0 text-center sm:text-left w-full sm:w-auto">
          <div className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={16}
                className={
                  i <= Math.round(averageRating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Star distribution bar chart */}
        <div className="flex-1 w-full space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star] || 0;
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-4 text-right flex-shrink-0">
                  {star}
                </span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6 text-right flex-shrink-0">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Recommend rate */}
        <div className="flex-shrink-0 text-center sm:text-right w-full sm:w-auto">
          <div className="text-2xl font-bold text-emerald-600">
            {wouldRecommendPercent}%
          </div>
          <div className="text-xs text-gray-500">Would recommend</div>
        </div>
      </div>

      {/* Rating breakdown legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <BarChart3 size={12} className="text-sky-400" />
          Parent ratings from {totalReviews} review{totalReviews !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
