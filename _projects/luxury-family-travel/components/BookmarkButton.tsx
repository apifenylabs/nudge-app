'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

interface BookmarkButtonProps {
  destinationId: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function BookmarkButton({ destinationId, size = 'sm', className = '' }: BookmarkButtonProps) {
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()
  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSizes = { sm: 16, md: 18, lg: 22 }

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: any } }) => {
      setUserId(user?.id ?? null)
      if (!user) {
        setLoading(false)
        return
      }

      supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('destination_id', destinationId)
        .maybeSingle()
    supabase.from("bookmarks").select("*").eq("user_id", userId).eq("destination_id", destinationId).maybeSingle().then(({ data }: { data: any }) => {
          setBookmarked(!!data)
          setLoading(false)
        })
    })
  }, [destinationId, supabase])

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!userId) {
      router.push('/auth/login')
      return
    }

    setLoading(true)

    if (bookmarked) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('destination_id', destinationId)

      if (!error) setBookmarked(false)
    } else {
      const { error } = await supabase
        .from('bookmarks')
        .upsert({ user_id: userId, destination_id: destinationId }, { onConflict: 'user_id,destination_id' })

      if (!error) setBookmarked(true)
    }

    setLoading(false)
  }

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`${sizeClasses[size]} rounded-xl flex items-center justify-center transition-all duration-200 ${
        bookmarked
          ? 'bg-rose-50 text-rose-500 border border-rose-200'
          : 'bg-white/90 text-gray-400 hover:text-rose-500 hover:bg-rose-50 border border-gray-200 hover:border-rose-200'
      } ${className}`}
      title={bookmarked ? 'Remove from saved' : 'Save destination'}
    >
      <Heart
        size={iconSizes[size]}
        className={`transition-all ${bookmarked ? 'fill-rose-500 text-rose-500' : ''}`}
      />
    </button>
  )
}
