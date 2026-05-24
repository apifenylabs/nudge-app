/**
 * Titan Auth — Server Actions
 *
 * Signup, login, logout, and session management.
 * Uses @supabase/ssr for cookie-based auth.
 */

'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { CookieOptions } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

async function createServerSupabase() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async get(name: string) {
        return (await cookieStore).get(name)?.value
      },
      async set(name: string, value: string, options: CookieOptions) {
        try {
          (await cookieStore).set(name, value, options)
        } catch {
          // ignore — called from Server Component
        }
      },
      async remove(name: string, options: CookieOptions) {
        try {
          (await cookieStore).set(name, '', { ...options, maxAge: 0 })
        } catch {
          // ignore
        }
      },
    },
  })
}

export async function signup(email: string, password: string) {
  const supabase = await createServerSupabase()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
    },
  })

  if (error) {
    return { success: false, error: error.message }
  }

  // Auto sign in after signup
  return { success: true, user: data.user }
}

export async function login(email: string, password: string) {
  const supabase = await createServerSupabase()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, user: data.user }
}

export async function logout() {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect('/')
}

export async function getSession() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getUser() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.auth.getUser()
  return data.user
}
