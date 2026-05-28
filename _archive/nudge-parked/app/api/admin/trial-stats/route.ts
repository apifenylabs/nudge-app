/**
 * GET /api/admin/trial-stats
 *
 * Returns trial conversion analytics for the admin dashboard.
 * Shows total trials, conversion rates, grace period recovery, etc.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient()
    const now = new Date()

    // Total trials started
    const { count: totalTrials } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .not('trial_ends_at', 'is', null)

    // Total trials that converted — have stripe_subscription_id
    const { count: converted } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .in('status', ['active', 'past_due'])
      .not('stripe_subscription_id', 'is', null)
      .not('trial_ends_at', 'is', null)

    // Trials that expired (trial ended, not converted)
    const { count: expired } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .not('trial_ends_at', 'is', null)
      .is('stripe_subscription_id', null)
      .lt('trial_ends_at', now.toISOString())

    // Trials in grace window (ended 1-3 days ago)
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()

    const { count: inGraceWindow } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .not('trial_ends_at', 'is', null)
      .gte('trial_ends_at', threeDaysAgo)
      .lte('trial_ends_at', oneDayAgo)

    // Trial events
    const { data: trialEvents } = await supabase
      .from('trial_events')
      .select('event_type, created_at')
      .order('created_at', { ascending: false })
      .limit(1000)

    const graceReactivations = trialEvents
      ? trialEvents.filter(e => e.event_type === 'grace_reactivated').length
      : 0

    const graceConversions = trialEvents
      ? trialEvents.filter(e => e.event_type === 'converted').length
      : 0

    // Conversion rates
    const conversionRate = totalTrials && totalTrials > 0
      ? Math.round(((converted || 0) / totalTrials) * 100)
      : 0

    const graceConversionRate = (inGraceWindow && inGraceWindow > 0)
      ? Math.round((graceConversions / (inGraceWindow || 1)) * 100)
      : 0

    // Weekly trend
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { count: weeklyTrials } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .not('trial_ends_at', 'is', null)
      .gte('trial_ends_at', weekAgo)

    const { count: weeklyConversions } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .in('status', ['active', 'past_due'])
      .not('stripe_subscription_id', 'is', null)
      .gte('updated_at', weekAgo)

    return NextResponse.json({
      success: true,
      stats: {
        totalTrials: totalTrials || 0,
        converted: converted || 0,
        expired: expired || 0,
        inGraceWindow: inGraceWindow || 0,
        graceReactivations: graceReactivations || 0,
        graceConversions: graceConversions || 0,
        conversionRate,
        graceConversionRate,
        weekly: {
          trials: weeklyTrials || 0,
          conversions: weeklyConversions || 0,
        },
      },
    })
  } catch (err: any) {
    console.error('[Trial Stats] Error:', err.message)
    return NextResponse.json(
      { error: 'Internal server error', detail: err.message },
      { status: 500 }
    )
  }
}
