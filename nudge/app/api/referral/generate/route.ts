import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/referral/generate
 * Generates (or retrieves existing) referral code for the authenticated user.
 * Returns the code + share link.
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = createAdminClient()

    // Get user's public user ID
    const { data: profile } = await admin
      .from('users')
      .select('id, display_name')
      .eq('auth_uid', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Check for existing active referral code
    const { data: existing } = await admin
      .from('referral_codes')
      .select('code, total_signups, created_at')
      .eq('user_id', profile.id)
      .eq('is_active', true)
      .single()

    if (existing) {
      const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/refer/${existing.code}`
      return NextResponse.json({
        code: existing.code,
        shareUrl,
        totalSignups: existing.total_signups,
        isExisting: true,
      })
    }

    // Generate new code
    const { data: referral, error } = await admin
      .from('referral_codes')
      .insert({
        user_id: profile.id,
        code: generateCode(),
      })
      .select('code, total_signups, created_at')
      .single()

    if (error || !referral) {
      console.error('Failed to generate referral code:', error)
      return NextResponse.json({ error: 'Failed to generate referral code' }, { status: 500 })
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/refer/${referral.code}`

    return NextResponse.json({
      code: referral.code,
      shareUrl,
      totalSignups: 0,
      isExisting: false,
    })
  } catch (err: any) {
    console.error('Referral generate error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // No I, O, 0, 1 to avoid confusion
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}
