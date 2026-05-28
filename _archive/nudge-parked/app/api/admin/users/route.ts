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

  // Pagination & search params
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))
  const search = searchParams.get('search') || ''
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from('users')
    .select('id, email, full_name, telegram_username, telegram_chat_id, is_admin, created_at, updated_at', { count: 'exact' })

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data: users, count, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // For each user, get their family info
  const usersWithFamilies = await Promise.all(
    (users || []).map(async (u) => {
      const { data: membership } = await supabase
        .from('family_members')
        .select('family_id, role')
        .eq('user_id', u.id)
        .limit(1)
        .single()

      const { data: family } = membership
        ? await supabase.from('families').select('name').eq('id', membership.family_id).single()
        : { data: null }

      return {
        id: u.id,
        email: u.email,
        full_name: u.full_name,
        telegram_username: u.telegram_username,
        telegram_connected: !!u.telegram_chat_id,
        is_admin: u.is_admin || false,
        family_id: membership?.family_id || null,
        family_name: family?.name || null,
        family_role: membership?.role || null,
        created_at: u.created_at,
        updated_at: u.updated_at,
      }
    })
  )

  return NextResponse.json({
    users: usersWithFamilies,
    total: count ?? 0,
    page,
    limit,
    total_pages: Math.ceil((count ?? 0) / limit),
  })
}
