import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/referral/redeem
 * Redeems a referral code for the authenticated user.
 * Body: { code: string }
 * Automatically detects newly signed-up users who entered a referral code.
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { code } = body as { code: string }

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Missing referral code' }, { status: 400 })
    }

    const normalizedCode = code.toUpperCase().trim()
    const admin = createAdminClient()

    // Get user's profile
    const { data: profile } = await admin
      .from('users')
      .select('id, email, display_name')
      .eq('auth_uid', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Get the referral code
    const { data: referralCode, error: refError } = await admin
      .from('referral_codes')
      .select('id, user_id, is_active')
      .eq('code', normalizedCode)
      .single()

    if (refError || !referralCode) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 })
    }

    if (!referralCode.is_active) {
      return NextResponse.json({ error: 'This referral code is no longer active' }, { status: 400 })
    }

    // Can't refer yourself
    if (referralCode.user_id === profile.id) {
      return NextResponse.json({ error: 'You cannot use your own referral code' }, { status: 400 })
    }

    // Check if already redeemed by this user
    const { data: existingRedeem } = await admin
      .from('referral_redemptions')
      .select('id')
      .eq('referrer_user_id', referralCode.user_id)
      .eq('referred_user_id', profile.id)
      .single()

    if (existingRedeem) {
      return NextResponse.json({ error: 'You have already used a referral code' }, { status: 400 })
    }

    // Check if this user was referred before
    const { data: anyReferral } = await admin
      .from('referral_redemptions')
      .select('id')
      .eq('referred_user_id', profile.id)
      .single()

    if (anyReferral) {
      return NextResponse.json({ error: 'You have already been referred' }, { status: 400 })
    }

    // Create the redemption with reward
    const rewardExpiresAt = new Date()
    rewardExpiresAt.setDate(rewardExpiresAt.getDate() + 30) // 30-day free month

    const { error: redeemError } = await admin
      .from('referral_redemptions')
      .insert({
        referrer_user_id: referralCode.user_id,
        referred_user_id: profile.id,
        referral_code_id: referralCode.id,
        reward_granted: 'free_month',
        reward_status: 'pending',
        reward_expires_at: rewardExpiresAt.toISOString(),
      })

    if (redeemError) {
      console.error('Referral redeem error:', redeemError)
      return NextResponse.json({ error: 'Failed to process referral' }, { status: 500 })
    }

    // Increment total signups on the referral code
    await admin
      .from('referral_codes')
      .update({ total_signups: admin.rpc('increment', { x: 1 }) } as any)

    // Trigger reward granting (can be async)
    await grantReferralRewards(referralCode.user_id, admin)

    return NextResponse.json({
      success: true,
      message: '🎉 Referral applied! You and your referrer both get rewards.',
      reward: 'You get 1 free month of Pro when your referrer\'s reward is granted.',
    })
  } catch (err: any) {
    console.error('Referral redeem error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * Grants rewards to the referrer based on their total successful referrals.
 * Rewards scale: 1 referral = 1 free month, 3 referrals = 1 free quarter, etc.
 */
async function grantReferralRewards(referrerUserId: string, admin: ReturnType<typeof createAdminClient>) {
  try {
    // Count successfully granted referrals
    const { count } = await admin
      .from('referral_redemptions')
      .select('id', { count: 'exact', head: true })
      .eq('referrer_user_id', referrerUserId)
      .eq('reward_status', 'granted')

    const referralCount = count || 0

    // Check pending redemptions that could be granted now
    const { data: pendingRedemptions } = await admin
      .from('referral_redemptions')
      .select('id, reward_granted')
      .eq('referrer_user_id', referrerUserId)
      .eq('reward_status', 'pending')

    if (!pendingRedemptions || pendingRedemptions.length === 0) return

    // Grant all pending rewards
    for (const redemption of pendingRedemptions) {
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)

      await admin
        .from('referral_redemptions')
        .update({
          reward_status: 'granted',
          granted_at: new Date().toISOString(),
          reward_expires_at: expiresAt.toISOString(),
        })
        .eq('id', redemption.id)

      // Apply free month to referrer's subscription
      // First, find their family
      const { data: membership } = await admin
        .from('family_members')
        .select('family_id')
        .eq('user_id', referrerUserId)
        .eq('role', 'admin')
        .limit(1)
        .single()

      if (membership) {
        const { data: sub } = await admin
          .from('subscriptions')
          .select('id, plan, current_period_end')
          .eq('family_id', membership.family_id)
          .single()

        if (sub) {
          const currentEnd = sub.current_period_end
            ? new Date(sub.current_period_end)
            : new Date()
          currentEnd.setDate(currentEnd.getDate() + 30)

          await admin
            .from('subscriptions')
            .update({
              current_period_end: currentEnd.toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', sub.id)
        }
      }
    }
  } catch (err) {
    console.error('Error granting referral rewards:', err)
    // Non-critical — don't fail the request
  }
}
