import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * GET /api/referral/check?code=XXXXXX
 * Checks if a referral code is valid (for the signup/refer page).
 * No auth required — used before signup.
 */
export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code')

    if (!code) {
      return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 })
    }

    const normalizedCode = code.toUpperCase().trim()
    const admin = createAdminClient()

    const { data: referralCode } = await admin
      .from('referral_codes')
      .select('id, is_active, user_id')
      .eq('code', normalizedCode)
      .single()

    if (!referralCode) {
      return NextResponse.json({ valid: false, message: 'Invalid referral code' })
    }

    if (!referralCode.is_active) {
      return NextResponse.json({ valid: false, message: 'This referral code is no longer active' })
    }

    // Get referrer name
    const { data: referrer } = await admin
      .from('users')
      .select('display_name')
      .eq('id', referralCode.user_id)
      .single()

    return NextResponse.json({
      valid: true,
      code: normalizedCode,
      referrerName: referrer?.display_name || 'A Nudge user',
    })
  } catch (err: any) {
    console.error('Referral check error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
