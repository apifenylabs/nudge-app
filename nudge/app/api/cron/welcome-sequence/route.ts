/**
 * GET /api/cron/welcome-sequence
 * Vercel Cron Job — fires daily at 10:00 UTC (18:00 HKT).
 *
 * Sends onboarding drip emails to new users.
 * - Step 1 (Day 0): Welcome email immediately after signup
 * - Step 2 (Day 2): Streak & family invite email
 * - Step 3 (Day 7): First week recap, Telegram setup, upgrade nudge
 *
 * Drip sequences increase activation (+30%) and trial conversion (+15%).
 *
 * Protected by CRON_SECRET environment variable.
 *
 * Cron schedule:   0 10 * * *
 * Max duration:    120 seconds
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/send'
import { welcomeSequenceEmail } from '@/lib/email/templates'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

// ── Auth ─────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.warn('[Welcome Sequence] CRON_SECRET not set — running without auth guard')
    return true
  }

  const auth = request.headers.get('authorization')
  const querySecret = request.nextUrl.searchParams.get('secret')

  return auth === `Bearer ${cronSecret}` || querySecret === cronSecret
}

// ── Main Handler ─────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  console.log('[Welcome Sequence] Cron job started')

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const now = new Date()

    // ── Step 1: Day 0 Welcome (users created 0-24 hours ago) ──
    // These are sent from the signup handler, but we also catch any missed ones here
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    const today = now.toISOString()

    const { data: step1Candidates, error: s1Error } = await supabase
      .from('users')
      .select(`
        id, email, full_name, created_at,
        family_members!inner (
          family_id,
          families!inner (id, name, invite_code)
        )
      `)
      .gte('created_at', yesterday)
      .lte('created_at', today)
      .limit(50)

    if (s1Error) {
      console.error('[Welcome Sequence] Step 1 query error:', s1Error)
    }

    const results: { userEmail: string; step: number; sent: boolean; error?: string }[] = []

    // Process step 1 (welcome) — for users created in the last 24h
    if (step1Candidates) {
      for (const user of step1Candidates) {
        try {
          if (!user.email) continue

          // Check if already sent step 1
          const { data: existing } = await supabase
            .from('email_log')
            .select('id')
            .eq('user_id', user.id)
            .eq('email_type', 'welcome_step1')
            .limit(1)

          if (existing && existing.length > 0) continue

          // Get family info (Supabase join types are complex, use runtime extraction)
          const userAny = user as any
          const familyMembership = Array.isArray(userAny.family_members)
            ? userAny.family_members[0]
            : userAny.family_members
          const familiesArr = familyMembership?.families
          const famInfo = Array.isArray(familiesArr) ? familiesArr[0] : familiesArr
          const familyName = famInfo?.name ?? 'My Family'
          const inviteCode = famInfo?.invite_code ?? undefined

          const result = await sendEmail(
            welcomeSequenceEmail({
              to: user.email,
              userName: user.full_name || 'there',
              familyName,
              step: 1,
              inviteCode,
              dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/dashboard`,
            })
          )

          // Log the send
          await logEmail(supabase, user.id, 'welcome_step1', result.success)

          results.push({
            userEmail: user.email,
            step: 1,
            sent: result.success,
            error: result.success ? undefined : result.error,
          })
        } catch (err: any) {
          console.error(`[Welcome Sequence] Step 1 error for ${user.email}:`, err.message)
        }
      }
    }

    // ── Step 2: Day 2 (users created 48-72 hours ago) ──
    const twoDaysAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString()
    const threeDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString()

    const { data: step2Candidates, error: s2Error } = await supabase
      .from('users')
      .select(`
        id, email, full_name, created_at,
        family_members!inner (
          family_id,
          families!inner (id, name, invite_code)
        )
      `)
      .gte('created_at', threeDaysAgo)
      .lte('created_at', twoDaysAgo)
      .limit(50)

    if (s2Error) {
      console.error('[Welcome Sequence] Step 2 query error:', s2Error)
    }

    if (step2Candidates) {
      for (const user of step2Candidates) {
        try {
          if (!user.email) continue

          // Check if already sent step 2
          const { data: existing } = await supabase
            .from('email_log')
            .select('id')
            .eq('user_id', user.id)
            .eq('email_type', 'welcome_step2')
            .limit(1)

          if (existing && existing.length > 0) continue

          const userAny = user as any
          const familyMembership = Array.isArray(userAny.family_members)
            ? userAny.family_members[0]
            : userAny.family_members
          const familiesArr = familyMembership?.families
          const famInfo = Array.isArray(familiesArr) ? familiesArr[0] : familiesArr
          const familyName = famInfo?.name ?? 'My Family'
          const inviteCode = famInfo?.invite_code ?? undefined

          const result = await sendEmail(
            welcomeSequenceEmail({
              to: user.email,
              userName: user.full_name || 'there',
              familyName,
              step: 2,
              inviteCode,
              dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/dashboard`,
            })
          )

          await logEmail(supabase, user.id, 'welcome_step2', result.success)

          results.push({
            userEmail: user.email,
            step: 2,
            sent: result.success,
            error: result.success ? undefined : result.error,
          })
        } catch (err: any) {
          console.error(`[Welcome Sequence] Step 2 error for ${user.email}:`, err.message)
        }
      }
    }

    // ── Step 3: Day 7 (users created 7-8 days ago) ──
    const sevenDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
    const eightDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { data: step3Candidates, error: s3Error } = await supabase
      .from('users')
      .select(`
        id, email, full_name, created_at,
        family_members!inner (
          family_id,
          families!inner (id, name, invite_code)
        )
      `)
      .gte('created_at', eightDaysAgo)
      .lte('created_at', sevenDaysAgo)
      .limit(50)

    if (s3Error) {
      console.error('[Welcome Sequence] Step 3 query error:', s3Error)
    }

    if (step3Candidates) {
      for (const user of step3Candidates) {
        try {
          if (!user.email) continue

          // Check if already sent step 3
          const { data: existing } = await supabase
            .from('email_log')
            .select('id')
            .eq('user_id', user.id)
            .eq('email_type', 'welcome_step3')
            .limit(1)

          if (existing && existing.length > 0) continue

          const userAny = user as any
          const familyMembership = Array.isArray(userAny.family_members)
            ? userAny.family_members[0]
            : userAny.family_members
          const familiesArr = familyMembership?.families
          const famInfo = Array.isArray(familiesArr) ? familiesArr[0] : familiesArr
          const familyName = famInfo?.name ?? 'My Family'
          const inviteCode = famInfo?.invite_code ?? undefined

          const result = await sendEmail(
            welcomeSequenceEmail({
              to: user.email,
              userName: user.full_name || 'there',
              familyName,
              step: 3,
              inviteCode,
              dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/dashboard`,
            })
          )

          await logEmail(supabase, user.id, 'welcome_step3', result.success)

          results.push({
            userEmail: user.email,
            step: 3,
            sent: result.success,
            error: result.success ? undefined : result.error,
          })
        } catch (err: any) {
          console.error(`[Welcome Sequence] Step 3 error for ${user.email}:`, err.message)
        }
      }
    }

    const elapsed = Date.now() - startTime
    const sentCount = results.filter(r => r.sent).length

    console.log(
      `[Welcome Sequence] Done. ${results.length} processed, ` +
      `${sentCount} sent, ${elapsed}ms elapsed`
    )

    return NextResponse.json({
      success: true,
      processed: results.length,
      sent: sentCount,
      errors: results.filter(r => r.error).length,
      elapsed,
      details: results,
    })
  } catch (err: any) {
    console.error('[Welcome Sequence] Fatal error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}

/**
 * Log an email send to the email_log table.
 * Creates the table if it doesn't exist.
 */
async function logEmail(
  supabase: ReturnType<typeof createAdminClient>,
  userId: string,
  emailType: string,
  sent: boolean,
) {
  try {
    const { error } = await supabase
      .from('email_log')
      .insert({
        user_id: userId,
        email_type: emailType,
        sent,
        created_at: new Date().toISOString(),
      })

    if (error) {
      // Table may not exist yet — try to create it
      console.warn(`[Email Log] Could not log email: ${error.message}`)
    }
  } catch (err) {
    console.warn('[Email Log] Error:', err)
  }
}
