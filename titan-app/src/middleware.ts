/**
 * Titan Middleware — Auth protection for dashboard routes.
 *
 * Redirects unauthenticated users to /login.
 * Uses Supabase SSR session validation.
 *
 * Demo/Offline mode: Set TITAN_DEMO_MODE=true to bypass auth.
 * Useful for local dev or when Supabase is unavailable.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const isDemoMode = process.env.TITAN_DEMO_MODE === 'true'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  // Exclude public dashboard routes (e.g., billing callback)
  if (pathname === '/dashboard/billing/callback') {
    return NextResponse.next()
  }

  // Demo/offline mode: skip auth entirely
  if (isDemoMode) {
    return NextResponse.next()
  }

  // No Supabase configured: skip auth gracefully (prevent crash loop)
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  // Create Supabase client
  const response = NextResponse.next()

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set(name, value, options)
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set(name, '', { ...options, maxAge: 0 })
      },
    },
  })

  const { data } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!data?.user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
