'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import type { User } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()

    supabase.auth.getUser().then(({ data: { user } }: { data: { user: any } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const redirectToLogin = useCallback(() => {
    router.push('/auth/login')
  }, [router])

  useEffect(() => {
    if (!loading && !user) {
      redirectToLogin()
    }
  }, [loading, user, redirectToLogin])

  if (loading) {
    if (fallback) return <>{fallback}</>
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-sky-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    if (fallback) return <>{fallback}</>
    return null
  }

  return <>{children}</>
}
