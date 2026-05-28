import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
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

  // Pagination params
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))
  const offset = (page - 1) * limit

  // Fetch families
  const { data: families, count, error } = await supabase
    .from('families')
    .select('id, name, owner_id, invite_code, created_at, updated_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get member counts and task counts for each family
  const familiesWithStats = await Promise.all(
    (families || []).map(async (f) => {
      const [{ count: memberCount }, { count: taskCount }, { count: completedCount }] = await Promise.all([
        supabase.from('family_members').select('*', { count: 'exact', head: true }).eq('family_id', f.id),
        supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('family_id', f.id),
        supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('family_id', f.id).eq('status', 'completed'),
      ])

      // Get owner name
      const { data: owner } = await supabase
        .from('users')
        .select('full_name, email')
        .eq('id', f.owner_id)
        .single()

      return {
        id: f.id,
        name: f.name,
        owner_name: owner?.full_name || owner?.email || 'Unknown',
        owner_id: f.owner_id,
        invite_code: f.invite_code,
        member_count: memberCount ?? 0,
        tasks_created: taskCount ?? 0,
        tasks_completed: completedCount ?? 0,
        created_at: f.created_at,
        updated_at: f.updated_at,
      }
    })
  )

  return NextResponse.json({
    families: familiesWithStats,
    total: count ?? 0,
    page,
    limit,
    total_pages: Math.ceil((count ?? 0) / limit),
  })
}
