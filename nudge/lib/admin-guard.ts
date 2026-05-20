import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface AdminUser {
  id: string
  email: string
  full_name: string | null
  is_admin: boolean
}

/**
 * Checks if the current user is a system admin.
 * Redirects to /dashboard if not admin.
 * Returns the admin user profile on success.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Get the user's public profile
  const { data: profile } = await supabase
    .from('users')
    .select('id, email, full_name, is_admin')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/dashboard')

  // Check is_admin flag
  if (profile.is_admin !== true) {
    // Fallback: check admin emails env var
    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean)

    if (adminEmails.length > 0 && adminEmails.includes((profile.email || '').toLowerCase())) {
      return {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        is_admin: true,
      }
    }

    redirect('/dashboard')
  }

  return {
    id: profile.id,
    email: profile.email,
    full_name: profile.full_name,
    is_admin: true,
  }
}

/**
 * Checks if the current user is an admin without redirecting.
 * Returns null if not authenticated or not admin.
 */
export async function checkAdmin(): Promise<AdminUser | null> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('users')
    .select('id, email, full_name, is_admin')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  if (profile.is_admin === true) {
    return {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      is_admin: true,
    }
  }

  // Fallback: check admin emails env var
  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)

  if (adminEmails.length > 0 && adminEmails.includes((profile.email || '').toLowerCase())) {
    return {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      is_admin: true,
    }
  }

  return null
}
