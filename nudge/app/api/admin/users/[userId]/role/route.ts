import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
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

  const body = await request.json()
  const { is_admin } = body

  if (typeof is_admin !== 'boolean') {
    return NextResponse.json({ error: 'is_admin must be a boolean' }, { status: 400 })
  }

  // Use admin client to bypass RLS
  const admin = createAdminClient()

  const { error } = await admin
    .from('users')
    .update({ is_admin })
    .eq('id', params.userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, user_id: params.userId, is_admin })
}
