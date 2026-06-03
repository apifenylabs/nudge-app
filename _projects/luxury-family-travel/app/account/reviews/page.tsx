'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, MessageSquare, ExternalLink, Trash2, ThumbsUp, Clock } from 'lucide-react'
import AuthGuard from '@/components/AuthGuard'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

interface ReviewRecord {
  id: string
  destination_id: string
  destination_name?: string
  overall_rating: number
  title: string
  content: string
  helpful_count: number
  status: string
  created_at: string
  visit_date: string | null
}

function MyReviews() {
  const supabase = createBrowserSupabaseClient()
  const [reviews, setReviews] = useState<ReviewRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadReviews() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setLoading(false)
          return
        }

        // Try Supabase reviews table
        const { data, error: dbError } = await supabase
          .from('destination_reviews')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (dbError) {
          // Fallback: load destinations.json and show demo reviews
          setError('')
          setReviews([])
        } else if (data && data.length > 0) {
          setReviews(data as ReviewRecord[])
        }

        // Try to get destination names for each review
        const reviewsWithNames = [...reviews]
        if (reviewsWithNames.length > 0) {
          try {
            const res = await fetch('/data/destinations.json')
            const dests: any[] = await res.json()
            const destMap: Record<string, string> = {}
            dests.forEach((d: any) => { destMap[d.id] = d.name })

            setReviews(prev => prev.map(r => ({
              ...r,
              destination_name: destMap[r.destination_id] || r.destination_id,
            })))
          } catch {}
        }
      } catch (err) {
        setError('Could not load review history')
      }
      setLoading(false)
    }
    loadReviews()
  }, [supabase])

  const deleteReview = async (reviewId: string) => {
    const { error: deleteError } = await supabase
      .from('destination_reviews')
      .delete()
      .eq('id', reviewId)

    if (!deleteError) {
      setReviews(reviews.filter(r => r.id !== reviewId))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-sky-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Account Settings
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
          <p className="text-sm text-gray-500">Reviews you&apos;ve shared with the community</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl border text-sm bg-red-50 border-red-200 text-red-700">
          {error}
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h2>
          <p className="text-sm text-gray-500 mb-6">
            Share your family travel experiences to help other parents
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Browse Destinations
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {review.destination_name ? (
                      <Link
                        href={`/destination/${review.destination_id}`}
                        className="text-sm font-semibold text-gray-900 hover:text-sky-600 transition-colors flex items-center gap-1"
                      >
                        {review.destination_name}
                        <ExternalLink size={11} className="text-gray-400" />
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">
                        {review.destination_id}
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      review.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {review.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    {review.visit_date && (
                      <span>Visited {new Date(review.visit_date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 ml-3 shrink-0">
                  {Array.from({ length: review.overall_rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              {review.title && (
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  &ldquo;{review.title}&rdquo;
                </h4>
              )}
              <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                {review.content}
              </p>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={11} />
                    {review.helpful_count || 0} found helpful
                  </span>
                </div>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <AuthGuard>
      <MyReviews />
    </AuthGuard>
  )
}
