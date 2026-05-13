'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ArrowLeft, MapPin, Star, BookmarkX, Sparkles } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import AuthGuard from '@/components/AuthGuard'

interface BookmarkWithDestination {
  id: string
  destination_id: string
  created_at: string
}

interface Destination {
  id: string
  slug?: string
  name: string
  city: string
  country: string
  category: string
  safetyRating: number
  imageUrl: string
}

function SavedDestinations() {
  const supabase = createBrowserSupabaseClient()
  const [bookmarks, setBookmarks] = useState<BookmarkWithDestination[]>([])
  const [destinations, setDestinations] = useState<Record<string, Destination>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load bookmarks
      const { data: bmData } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (bmData) {
        setBookmarks(bmData)

        // Load destination data from JSON for display
        try {
          const res = await fetch('/data/destinations.json')
          const dests: Destination[] = await res.json()
          const map: Record<string, Destination> = {}
          dests.forEach(d => { map[d.id] = d })
          setDestinations(map)
        } catch {}
      }

      setLoading(false)
    }
    load()
  }, [supabase])

  const [removing, setRemoving] = useState<string | null>(null)

  const removeBookmark = async (destinationId: string) => {
    if (removing === destinationId) return // already in progress
    setRemoving(destinationId)
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('destination_id', destinationId)

    if (!error) {
      setBookmarks(bookmarks.filter(b => b.destination_id !== destinationId))
    }
    setRemoving(null)
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
        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
          <Heart className="w-6 h-6 text-rose-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Destinations</h1>
          <p className="text-sm text-gray-500">{bookmarks.length} saved places</p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No saved destinations yet</h2>
          <p className="text-sm text-gray-500 mb-6">
            Start exploring and bookmark places for your next family trip
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Browse Destinations
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bm) => {
            const d = destinations[bm.destination_id]
            if (!d) {
              return (
                <div key={bm.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{bm.destination_id}</p>
                    <p className="text-xs text-gray-500">Saved {new Date(bm.created_at).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => removeBookmark(bm.destination_id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove"
                  >
                    <BookmarkX size={16} />
                  </button>
                </div>
              )
            }
            return (
              <div key={bm.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
                <Link href={`/destination/${d.slug || d.id}`} className="flex items-center gap-4 p-4">
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {d.imageUrl ? (
                      <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin size={20} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{d.name}</h3>
                    <p className="text-xs text-gray-500 truncate">
                      <MapPin size={10} className="inline mr-1" />
                      {d.city}, {d.country}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-amber-600 flex items-center gap-0.5">
                        <Star size={10} className="fill-amber-400" /> {d.safetyRating?.toFixed(1) || 'N/A'}
                      </span>
                      <span className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full">{d.category}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function SavedPage() {
  return (
    <AuthGuard>
      <SavedDestinations />
    </AuthGuard>
  )
}
