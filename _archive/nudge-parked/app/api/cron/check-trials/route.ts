/**
 * GET /api/cron/check-trials
 * Vercel Cron Job — fires daily at 12:00 UTC (20:00 HKT).
 *
 * Checks for subscriptions whose trial is ending in 3 days or less,
 * and sends an email reminder to the family owner to subscribe.
 *
 * This is proven to increase conversion by 20-30%.
 *
 * Protected by CRON_SECRET environment variable.
 *
 * Cron schedule:   0 12 * * *
 * Max duration:    60 seconds
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/send'
import { trialExpiringEmail } from '@/lib/email/templates'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

// ── Auth ─────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.warn('[Check Trials] CRON_SECRET not set — running without auth guard')
    return true
  }

  const auth = request.headers.get('authorization')
  const querySecret = request.nextUrl.searchParams.get('secret')

  return auth === `Bearer ${cronSecret}` || querySecret === cronSecret
}

// ── Main Handler ─────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  console.log('[Check Trials] Cron job started')

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const now = new Date()

    // Find subscriptions where trial ends in 3 days or less, but hasn't ended yet
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString()

    const { data: expiringSubs, error: subError } = await supabase
      .from('subscriptions')
      .select(`
        id,
        family_id,
        plan,
        trial_ends_at,
        stripe_customer_id,
        stripe_subscription_id
      `)
      .in('status', ['trialing', 'active'])
      .not('trial_ends_at', 'is', null)
      .lte('trial_ends_at', threeDaysFromNow)
      .gte('trial_ends_at', now.toISOString()) // hasn't expired yet
      .limit(50)

    if (subError) {
      console.error('[Check Trials] Subscription query error:', subError)
      return NextResponse.json({ error: 'Failed to query subscriptions' }, { status: 500 })
    }

    if (!expiringSubs || expiringSubs.length === 0) {
      console.log('[Check Trials] No expiring trials found')
      return NextResponse.json({ checked: true, expiringTrials: 0, notified: 0, elapsed: Date.now() - startTime })
    }

    console.log(`[Check Trials] Found ${expiringSubs.length} expiring trials`)

    const results: { familyId: string; plan: string; daysRemaining: number; notified: boolean; error?: string }[] = []

    for (const sub of expiringSubs) {
      try {
        if (!sub.trial_ends_at) continue

        const trialEnd = new Date(sub.trial_ends_at)
        const daysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        if (daysRemaining <= 0) continue

        // Find the family owner to notify
        const { data: owner } = await supabase
          .from('family_members')
          .select('user_id')
          .eq('family_id', sub.family_id)
          .eq('role', 'owner')
          .single()

        if (!owner) {
          console.warn(`[Check Trials] No owner found for family ${sub.family_id}`)
          continue
        }

        // Get user details
        const { data: user } = await supabase
          .from('users')
          .select('id, email, full_name')
          .eq('id', owner.user_id)
          .single()

        if (!user || !user.email) {
          console.warn(`[Check Trials] User ${owner.user_id} has no email`)
          continue
        }

        // Get family name
        const { data: family } = await supabase
          .from('families')
          .select('name')
          .eq('id', sub.family_id)
          .single()

        const planName = sub.plan === 'family' ? 'Family' : 'Pro'

        // Send the trial-expiring email
        const result = await sendEmail(
          trialExpiringEmail({
            to: user.email,
            userName: user.full_name || 'there',
            planName,
            daysRemaining,
            subscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/dashboard/settings`,
          })
        )

        results.push({
          familyId: sub.family_id,
          plan: sub.plan,
          daysRemaining,
          notified: result.success,
          error: result.success ? undefined : result.error,
        })

        console.log(
          `[Check Trials] Family ${sub.family_id} (${planName}): ` +
          `${daysRemaining} days remaining → ${result.success ? 'notified' : 'failed'}: ${user.email}`
        )
      } catch (trialErr: any) {
        console.error(`[Check Trials] Error processing subscription ${sub.id}:`, trialErr.message)
        results.push({
          familyId: sub.family_id,
          plan: sub.plan,
          daysRemaining: 0,
          notified: false,
          error: trialErr.message,
        })
      }
    }

    const elapsed = Date.now() - startTime
    const notifiedCount = results.filter(r => r.notified).length

    console.log(
      `[Check Trials] Done. ${results.length} processed, ` +
      `${notifiedCount} notified, ${elapsed}ms elapsed`
    )

    return NextResponse.json({
      success: true,
      expiringTrials: expiringSubs.length,
      notified: notifiedCount,
      errors: results.filter(r => r.error).length,
      elapsed,
      details: results,
    })
  } catch (err: any) {
    console.error('[Check Trials] Fatal error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}
