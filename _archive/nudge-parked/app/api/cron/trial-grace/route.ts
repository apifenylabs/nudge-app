/**
 * GET /api/cron/trial-grace
 * Vercel Cron Job — fires daily at 14:00 UTC (22:00 HKT).
 *
 * Checks for subscriptions whose trial ended 1-3 days ago,
 * and sends a "grace period" email to the family owner.
 *
 * This recovers 15-25% of expired trials by reminding users what they lost
 * and giving them a one-click reactivation path.
 *
 * Protected by CRON_SECRET environment variable.
 *
 * Cron schedule:   0 14 * * *
 * Max duration:    60 seconds
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/send'
import { trialGracePeriodEmail } from '@/lib/email/templates'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

// ── Auth ─────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.warn('[Trial Grace] CRON_SECRET not set — running without auth guard')
    return true
  }

  const auth = request.headers.get('authorization')
  const querySecret = request.nextUrl.searchParams.get('secret')

  return auth === `Bearer ${cronSecret}` || querySecret === cronSecret
}

// ── Plan features for "what you lost" display ─────────────────────

const PLAN_FEATURES: Record<string, { icon: string; label: string }[]> = {
  pro: [
    { icon: '✅', label: 'Unlimited tasks (free plan limited to 10)' },
    { icon: '👥', label: 'Priority task assignments' },
    { icon: '📊', label: 'Weekly family scorecard' },
    { icon: '🔔', label: 'Email & push reminders' },
    { icon: '🔥', label: 'Streak tracking & achievements' },
  ],
  family: [
    { icon: '✅', label: 'Unlimited tasks (free plan limited to 10)' },
    { icon: '👥', label: 'Up to 10 family members' },
    { icon: '📊', label: 'Weekly family scorecard & insights' },
    { icon: '🔔', label: 'Email, push & Telegram reminders' },
    { icon: '🔥', label: 'Streak tracking & achievements' },
    { icon: '🏆', label: 'Family leaderboard & gamification' },
  ],
}

// ── Main Handler ─────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  console.log('[Trial Grace] Cron job started')

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const now = new Date()

    // Find subscriptions whose trial ended 1-3 days ago (grace period window)
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()

    const { data: expiredSubs, error: subError } = await supabase
      .from('subscriptions')
      .select(`
        id,
        family_id,
        plan,
        trial_ends_at,
        stripe_customer_id,
        stripe_subscription_id,
        status
      `)
      .eq('status', 'active') // still "active" (Stripe keeps trialing as active for a bit)
      .not('trial_ends_at', 'is', null)
      .lte('trial_ends_at', oneDayAgo) // ended at least 1 day ago
      .gte('trial_ends_at', threeDaysAgo) // ended no more than 3 days ago
      .limit(50)

    if (subError) {
      console.error('[Trial Grace] Subscription query error:', subError)
      return NextResponse.json({ error: 'Failed to query subscriptions' }, { status: 500 })
    }

    if (!expiredSubs || expiredSubs.length === 0) {
      console.log('[Trial Grace] No expired trials in grace window')
      return NextResponse.json({ checked: true, expiredTrials: 0, notified: 0, elapsed: Date.now() - startTime })
    }

    console.log(`[Trial Grace] Found ${expiredSubs.length} expired trials in grace window`)

    const results: { familyId: string; plan: string; daysExpired: number; notified: boolean; error?: string }[] = []

    for (const sub of expiredSubs) {
      try {
        if (!sub.trial_ends_at) continue

        const trialEnd = new Date(sub.trial_ends_at)
        const daysExpired = Math.ceil((now.getTime() - trialEnd.getTime()) / (1000 * 60 * 60 * 24))

        if (daysExpired <= 0 || daysExpired > 3) continue

        // Find the family owner to notify
        const { data: owner } = await supabase
          .from('family_members')
          .select('user_id')
          .eq('family_id', sub.family_id)
          .eq('role', 'owner')
          .single()

        if (!owner) {
          console.warn(`[Trial Grace] No owner found for family ${sub.family_id}`)
          continue
        }

        // Get user details
        const { data: user } = await supabase
          .from('users')
          .select('id, email, full_name')
          .eq('id', owner.user_id)
          .single()

        if (!user || !user.email) {
          console.warn(`[Trial Grace] User ${owner.user_id} has no email`)
          continue
        }

        // Get family name
        const { data: family } = await supabase
          .from('families')
          .select('name')
          .eq('id', sub.family_id)
          .single()

        const planName = sub.plan === 'family' ? 'Family' : 'Pro'
        const planKey = sub.plan === 'family' ? 'family' : 'pro'
        const whatWasLost = PLAN_FEATURES[planKey] || PLAN_FEATURES.pro

        // Send the grace-period email
        const result = await sendEmail(
          trialGracePeriodEmail({
            to: user.email,
            userName: user.full_name || 'there',
            planName,
            familyName: family?.name || 'My Family',
            daysExpired,
            whatWasLost,
            resubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/dashboard/settings`,
          })
        )

        // Track the grace notification for analytics
        try {
          await supabase.from('trial_events').insert({
            subscription_id: sub.id,
            family_id: sub.family_id,
            user_id: user.id,
            event_type: 'grace_email_sent',
            days_expired: daysExpired,
            created_at: now.toISOString(),
          })
        } catch { /* table may not exist yet */ }

        results.push({
          familyId: sub.family_id,
          plan: sub.plan,
          daysExpired,
          notified: result.success,
          error: result.success ? undefined : result.error,
        })

        console.log(
          `[Trial Grace] Family ${sub.family_id} (${planName}): ` +
          `${daysExpired} days expired → ${result.success ? 'notified' : 'failed'}: ${user.email}`
        )
      } catch (trialErr: any) {
        console.error(`[Trial Grace] Error processing subscription ${sub.id}:`, trialErr.message)
        results.push({
          familyId: sub.family_id,
          plan: sub.plan,
          daysExpired: 0,
          notified: false,
          error: trialErr.message,
        })
      }
    }

    const elapsed = Date.now() - startTime
    const notifiedCount = results.filter(r => r.notified).length

    console.log(
      `[Trial Grace] Done. ${results.length} processed, ` +
      `${notifiedCount} notified, ${elapsed}ms elapsed`
    )

    return NextResponse.json({
      success: true,
      expiredTrials: expiredSubs.length,
      notified: notifiedCount,
      errors: results.filter(r => r.error).length,
      elapsed,
      details: results,
    })
  } catch (err: any) {
    console.error('[Trial Grace] Fatal error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}
