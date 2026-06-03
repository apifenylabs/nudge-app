'use client';

import { useState, useEffect, useCallback } from 'react';
import { Shield, Check, X, RefreshCw, Star, ExternalLink, User, Clock } from 'lucide-react';
import Link from 'next/link';
import type { ReviewData } from '@/components/ReviewCard';

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchReviews = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?status=${status}&limit=100`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      showToast('error', 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchReviews(tab);
  }, [tab, fetchReviews]);

  const handleAction = async (reviewId: string, action: 'approve' | 'reject') => {
    setActionLoading(reviewId);
    try {
      // For the in-memory store, we update via PUT with status change
      // Since we don't have a dedicated status-change endpoint, we use PUT to update status
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: action === 'approve' ? 'approved' : 'rejected',
        }),
      });

      if (!res.ok) throw new Error('Action failed');
      
      showToast('success', `Review ${action === 'approve' ? 'approved' : 'rejected'}!`);
      // Refresh the list
      fetchReviews(tab);
    } catch {
      showToast('error', `Failed to ${action} review`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="sr-only">Home</span>
              ←
            </Link>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-sky-600" />
              <span className="font-semibold text-gray-900 text-sm">Review Moderation</span>
            </div>
          </div>
          <button
            onClick={() => fetchReviews(tab)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} className="text-gray-500" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-white rounded-xl border border-gray-200 p-1">
          {(['pending', 'approved', 'rejected'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 text-sm font-medium py-2 px-4 rounded-lg transition-all capitalize ${
                tab === t
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t} ({t === 'pending' ? 'pending' : t === 'approved' ? 'live' : 'rejected'})
            </button>
          ))}
        </div>

        {/* Reviews list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-2 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                  <div className="h-2 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">No {tab} reviews</h3>
            <p className="text-sm text-gray-500">
              {tab === 'pending'
                ? 'New review submissions will appear here.'
                : tab === 'approved'
                ? 'No approved reviews yet.'
                : 'No rejected reviews.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-xl border p-5 ${
                  tab === 'pending'
                    ? 'border-amber-200 ring-1 ring-amber-100'
                    : tab === 'approved'
                    ? 'border-emerald-200'
                    : 'border-red-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-sky-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">
                          {review.author_name}
                        </span>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                          {review.author_badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <Clock size={11} />
                        {new Date(review.created_at).toLocaleDateString()}
                        <ExternalLink size={10} className="ml-1" />
                        <span className="truncate max-w-[120px]">{review.destination_id}</span>
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.overall_rating} />
                </div>

                {/* Destination name resolution attempt */}
                <div className="text-xs text-gray-500 mb-2">
                  Destination: <span className="font-medium text-gray-700">{review.destination_id}</span>
                </div>

                {/* Content preview */}
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  &ldquo;{review.title}&rdquo;
                </h4>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {review.content}
                </p>

                {/* Ratings */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                  {review.safety_rating != null && (
                    <span>Safety: {review.safety_rating}⭐</span>
                  )}
                  {review.fun_rating != null && (
                    <span>Fun: {review.fun_rating}⭐</span>
                  )}
                  {review.value_rating != null && (
                    <span>Value: {review.value_rating}⭐</span>
                  )}
                  {review.food_rating != null && (
                    <span>Food: {review.food_rating}⭐</span>
                  )}
                </div>

                {/* Actions */}
                {tab === 'pending' && (
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleAction(review.id, 'approve')}
                      disabled={actionLoading === review.id}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                    >
                      {actionLoading === review.id ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <Check size={14} />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(review.id, 'reject')}
                      disabled={actionLoading === review.id}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                    >
                      <X size={14} />
                      Reject
                    </button>
                    <span className="text-[10px] text-gray-400 ml-2">
                      Review will appear on the destination page after approval
                    </span>
                  </div>
                )}
                {tab === 'approved' && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <Check size={12} />
                    Approved &middot; Live on site
                  </div>
                )}
                {tab === 'rejected' && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">
                    <X size={12} />
                    Rejected
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
