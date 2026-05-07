'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Heart, Settings, LogOut, ChevronDown } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface UserMenuProps {
  user: SupabaseUser
  bookmarkCount?: number
}

export default function UserMenu({ user, bookmarkCount }: UserMenuProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [profileName, setProfileName] = useState(user.user_metadata?.full_name || '')
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // Fetch profile name
    const supabase = createBrowserSupabaseClient()
    supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.name) setProfileName(data.name)
      })
  }, [user.id])

  const handleSignOut = async () => {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    router.refresh()
    setOpen(false)
  }

  const initial = (profileName || user.email || 'U').charAt(0).toUpperCase()
  const displayName = profileName || user.email?.split('@')[0] || 'User'

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
          {initial}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline max-w-[100px] truncate">
          {displayName}
        </span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-xl shadow-black/5 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings size={16} className="text-gray-400" />
            Account Settings
          </Link>

          <Link
            href="/account/saved"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Heart size={16} className="text-gray-400" />
            Saved Destinations
            {typeof bookmarkCount === 'number' && bookmarkCount > 0 && (
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700">
                {bookmarkCount}
              </span>
            )}
          </Link>

          <div className="border-t border-gray-100 mt-1 pt-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
