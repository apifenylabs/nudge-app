'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase as supabaseFn } from '@/lib/supabase'
import { MessageSquare, Mail, Lock, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabaseFn().auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage your family tasks</p>
        </div>

        {/* Form */}
        <div className="glass-card p-6 rounded-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Your password"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
              {loading ? 'Signing in...' : <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <p className="text-sm text-muted-foreground">
              No account?{' '}
              <Link href="/auth/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Create one for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}
