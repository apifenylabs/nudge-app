import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardAdminPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Check admin status
  const { data: profile } = await supabase
    .from('users')
    .select('id, email, full_name, is_admin')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/dashboard')

  const isAdmin = profile.is_admin === true

  // Fallback: check admin emails env var
  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)

  const emailIsAdmin = adminEmails.length > 0 && adminEmails.includes((profile.email || '').toLowerCase())

  if (!isAdmin && !emailIsAdmin) redirect('/dashboard')

  // Fetch overview stats directly (faster than API call)
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

  const [
    { count: totalUsers },
    { count: activeFamilies },
    { count: tasksToday },
    { count: tasksCompletedToday },
    { count: tasksOverdue },
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('families').select('*', { count: 'exact', head: true }),
    supabase.from('tasks').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
    supabase.from('tasks').select('*', { count: 'exact', head: true }).gte('created_at', todayStart).eq('status', 'completed'),
    supabase.from('tasks').select('*', { count: 'exact', head: true }).lt('due_date', now.toISOString()).neq('status', 'completed').not('due_date', 'is', null),
  ])

  // Fetch admin settings
  const { data: settings } = await supabase
    .from('admin_settings')
    .select('key, value')
    .limit(50)

  const settingsMap: Record<string, any> = {}
  for (const s of settings || []) {
    try {
      settingsMap[s.key] = typeof s.value === 'string' ? JSON.parse(s.value) : s.value
    } catch {
      settingsMap[s.key] = s.value
    }
  }

  return (
    <AdminDashboardClient
      user={{
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
      }}
      stats={{
        total_users: totalUsers ?? 0,
        active_families: activeFamilies ?? 0,
        tasks_today: tasksToday ?? 0,
        tasks_completed_today: tasksCompletedToday ?? 0,
        tasks_overdue: tasksOverdue ?? 0,
      }}
      settings={settingsMap}
    />
  )
}
