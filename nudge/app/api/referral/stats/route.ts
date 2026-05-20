import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/referral/stats
 * Returns referral stats for the authenticated user.
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = createAdminClient()

    const { data: profile } = await admin
      .from('users')
      .select('id')
      .eq('auth_uid', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Get referral code
    const { data: referralCode } = await admin
      .from('referral_codes')
      .select('code, total_signups, is_active, created_at')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // Get redemptions
    const { data: redemptions } = await admin
      .from('referral_redemptions')
      .select('id, reward_status, granted_at, created_at')
      .eq('referrer_user_id', profile.id)
      .order('created_at', { ascending: false })

    // Get achievements earned from referrals
    const { data: achievements } = await admin
      .from('user_achievements')
      .select('achievement_id, earned_at')
      .eq('user_id', profile.id)
      .order('earned_at', { ascending: false })

    return NextResponse.json({
      referralCode: referralCode?.code || null,
      totalSignups: referralCode?.total_signups || 0,
      shareUrl: referralCode
        ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/refer/${referralCode.code}`
        : null,
      activeRedemptions: redemptions?.filter(r => r.reward_status === 'pending').length || 0,
      grantedRewards: redemptions?.filter(r => r.reward_status === 'granted').length || 0,
      totalRedemptions: redemptions?.length || 0,
      achievements: achievements || [],
    })
  } catch (err: any) {
    console.error('Referral stats error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
