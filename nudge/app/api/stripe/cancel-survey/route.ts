/**
 * POST /api/stripe/cancel-survey
 * Records a cancellation survey response before processing the actual cancellation.
 *
 * Body: {
 *   primaryReason: string
 *   details?: string
 *   feedback?: string
 *   wouldRecommend?: number (1-10)
 *   alternative?: string
 * }
 *
 * After recording, redirects to /api/stripe/cancel-and-downgrade for actual cancellation.
 * 
 * This gives us churn analytics without adding friction — the survey is async
 * (we save it, then process the cancellation).
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ensureMigration } from '@/lib/supabase/migrate'

const CANCEL_REASONS = [
  'too_expensive',
  'missing_features',
  'not_using_enough',
  'too_complex',
  'switching_to_competitor',
  'technical_issues',
  'family_moved_away',
  'privacy_concerns',
  'temporary_pause',
  'other',
] as const

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { primaryReason, details, feedback, wouldRecommend, alternative } = body

    // Validate reason
    if (!primaryReason || !CANCEL_REASONS.includes(primaryReason)) {
      return NextResponse.json({ error: 'Invalid or missing primary reason' }, { status: 400 })
    }

    // Ensure the cancellation_survey table exists
    await ensureMigration('cancellation_survey')

    const adminDb = createAdminClient()

    // Get user info
    const { data: userInfo } = await adminDb
      .from('users')
      .select('id, full_name, email')
      .eq('id', user.id)
      .single()

    // Record the survey response
    const { error: insertError } = await adminDb
      .from('cancellation_survey')
      .insert({
        user_id: user.id,
        email: userInfo?.email || user.email,
        full_name: userInfo?.full_name || null,
        primary_reason: primaryReason,
        details: details || null,
        feedback: feedback || null,
        would_recommend: wouldRecommend ?? null,
        alternative_used: alternative || null,
        plan_at_cancel: null, // Will be populated by the subscription context
        created_at: new Date().toISOString(),
      })

    if (insertError) {
      console.error('[Cancel Survey] Failed to record survey:', insertError.message)
      // Don't block cancellation — proceed anyway
    }

    console.log(`[Cancel Survey] Recorded reason "${primaryReason}" for user ${user.id}`)

    return NextResponse.json({
      success: true,
      message: 'Survey recorded',
      // Signal to the frontend whether to proceed with actual cancellation
      proceedToCancel: true,
    })
  } catch (err: any) {
    console.error('[Cancel Survey] Error:', err.message)
    // Never block cancellation on survey errors
    return NextResponse.json({
      success: false,
      message: 'Survey save failed, proceeding with cancellation',
      proceedToCancel: true,
    })
  }
}
