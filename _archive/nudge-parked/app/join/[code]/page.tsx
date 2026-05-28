'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase as supabaseFn } from '@/lib/supabase'
import { CheckCircle, XCircle, Loader2, Users, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'

type JoinState = 'loading' | 'auth_checking' | 'not_authenticated' | 'joining' | 'success' | 'error' | 'already_member'

export default function JoinFamilyPage() {
  const params = useParams()
  const router = useRouter()
  const code = typeof params.code === 'string' ? params.code.toUpperCase() : ''
  const [state, setState] = useState<JoinState>('loading')
  const [familyName, setFamilyName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const init = async () => {
      if (!code) {
        setState('error')
        setErrorMessage('No invite code provided.')
        return
      }

      // Check authentication
      const { data: { session } } = await supabaseFn().auth.getSession()
      if (!session) {
        setState('not_authenticated')
        return
      }

      setState('joining')

      try {
        const res = await fetch('/api/family/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        })

        const data = await res.json()

        if (!res.ok) {
          setState('error')
          setErrorMessage(data.error || 'Failed to join family.')
          return
        }

        if (data.alreadyMember) {
          setState('already_member')
          setFamilyName(data.family?.name || '')
          return
        }

        if (data.joined) {
          setState('success')
          setFamilyName(data.family?.name || '')
          return
        }

        setState('error')
        setErrorMessage('Unexpected response. Please try again.')
      } catch (err: any) {
        setState('error')
        setErrorMessage(err.message || 'Network error. Please try again.')
      }
    }

    init()
  }, [code, router])

  if (state === 'loading' || state === 'auth_checking') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Checking invite...</p>
        </div>
      </div>
    )
  }

  if (state === 'not_authenticated') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Join Your Family</h1>
          <p className="text-muted-foreground mb-6">
            You've been invited to join a family on Nudge. Sign in or create an account to accept.
          </p>
          <div className="space-y-3">
            <Link
              href={`/auth/signup?redirect=/join/${code}`}
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/auth/login?redirect=/join/${code}`}
              className="btn-secondary w-full inline-flex items-center justify-center gap-2"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (state === 'joining') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Joining family...</p>
        </div>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to {familyName}! 🎉</h1>
          <p className="text-muted-foreground mb-6">
            You've joined the family. Start managing tasks together and stay on track.
          </p>
          <Link
            href="/dashboard"
            className="btn-primary w-full inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (state === 'already_member') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Already a Member</h1>
          <p className="text-muted-foreground mb-2">
            You're already part of {familyName || 'this family'}.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Head to your dashboard to see tasks and family members.
          </p>
          <Link
            href="/dashboard"
            className="btn-primary w-full inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // error state
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-card rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Couldn't Join</h1>
        <p className="text-muted-foreground mb-2">{errorMessage}</p>
        <p className="text-sm text-muted-foreground mb-6">
          Check your invite code and try again, or ask the family admin to resend the invite.
        </p>
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="btn-secondary w-full inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
