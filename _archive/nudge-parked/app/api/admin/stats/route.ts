import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createClient()

  // Verify admin access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('users')
    .select('is_admin, email')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.is_admin === true
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
  const emailIsAdmin = adminEmails.length > 0 && adminEmails.includes((profile?.email || '').toLowerCase())

  if (!isAdmin && !emailIsAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Fetch aggregate stats
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
    supabase.from('tasks').select('*', { count: 'exact', head: true }).lt('due_date', now.toISOString()).neq('status', 'completed'),
  ])

  return NextResponse.json({
    total_users: totalUsers ?? 0,
    active_families: activeFamilies ?? 0,
    tasks_today: tasksToday ?? 0,
    tasks_completed_today: tasksCompletedToday ?? 0,
    tasks_overdue: tasksOverdue ?? 0,
  })
}
