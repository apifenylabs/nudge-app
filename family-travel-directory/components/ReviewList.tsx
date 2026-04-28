'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, MessageSquare } from 'lucide-react';
import ReviewCard, { ReviewData } from './ReviewCard';

interface ReviewListProps {
  reviews: ReviewData[];
  isLoading: boolean;
  onHelpfulToggle?: (reviewId: string) => void;
}

const PAGE_SIZE = 5;

export default function ReviewList({
  reviews,
  isLoading,
  onHelpfulToggle,
}: ReviewListProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const copy = [...reviews];
    if (sortBy === 'newest') {
      copy.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else {
      copy.sort((a, b) => b.overall_rating - a.overall_rating);
    }
    return copy;
  }, [reviews, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when sort changes
  const handleSortChange = (sort: 'newest' | 'highest') => {
    setSortBy(sort);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-2 bg-gray-100 rounded w-1/4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto mb-4">
          <MessageSquare size={24} className="text-sky-400" />
        </div>
        <h3 className="text-gray-900 font-semibold mb-1">No reviews yet</h3>
        <p className="text-sm text-gray-500">Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort controls */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </span>
        <div className="flex items-center gap-1.5">
          <ArrowUpDown size={13} className="text-gray-400" />
          <button
            onClick={() => handleSortChange('newest')}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
              sortBy === 'newest'
                ? 'bg-sky-50 border-sky-200 text-sky-700 font-medium'
                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => handleSortChange('highest')}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
              sortBy === 'highest'
                ? 'bg-sky-50 border-sky-200 text-sky-700 font-medium'
                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            Highest Rated
          </button>
        </div>
      </div>

      {/* Review cards */}
      {paginated.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onHelpfulToggle={onHelpfulToggle}
        />
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-xs text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
