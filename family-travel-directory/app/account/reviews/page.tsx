'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, MessageSquare, Sparkles } from 'lucide-react'
import AuthGuard from '@/components/AuthGuard'

function MyReviews() {
  const [reviews] = useState<any[]>([])

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

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Star size={48} className="mx-auto text-gray-300 mb-4" />
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
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{review.destination_name}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-3">{new Date(review.created_at).toLocaleDateString()}</p>
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
