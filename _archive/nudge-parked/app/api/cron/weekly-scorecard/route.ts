/**
 * GET /api/cron/weekly-scorecard
 * Vercel Cron Job — fires every Sunday at 20:00 UTC (04:00 HKT Monday).
 *
 * Generates a weekly scorecard email for each family with active users,
 * showing completion stats, top member, streaks, and improvement areas.
 *
 * Protected by CRON_SECRET environment variable.
 *
 * Cron schedule:   0 20 * * 0
 * Max duration:    60 seconds
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { shouldNotify } from '@/lib/notifications/preferences'
import { sendEmail } from '@/lib/email/send'
import { weeklyScorecardEmail } from '@/lib/email/templates'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

// ── Auth ─────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.warn('[Weekly Scorecard] CRON_SECRET not set — running without auth guard')
    return true
  }

  const auth = request.headers.get('authorization')
  const querySecret = request.nextUrl.searchParams.get('secret')

  return auth === `Bearer ${cronSecret}` || querySecret === cronSecret
}

// ── Helpers ──────────────────────────────────────────────────────

function getWeekRange(): { start: Date; end: Date; label: string } {
  const now = new Date()
  
  // Find the previous Monday (start of current week)
  const dayOfWeek = now.getDay() // 0=Sunday
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  
  const start = new Date(now)
  start.setDate(start.getDate() - daysSinceMonday - 7) // Previous Monday
  start.setHours(0, 0, 0, 0)
  
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  
  const endOfWeek = new Date(start)
  endOfWeek.setDate(endOfWeek.getDate() + 6)
  
  const label = `Week of ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
  
  return { start, end, label }
}

interface FamilyScorecard {
  familyId: string
  familyName: string
  members: { userId: string; name: string; tasksCompleted: number }[]
  totalCompleted: number
  totalCreated: number
  bestStreak: number
  completionRate: number
}

async function buildFamilyScorecard(
  supabase: ReturnType<typeof createAdminClient>,
  familyId: string,
  weekStart: Date,
  weekEnd: Date
): Promise<FamilyScorecard | null> {
  // Get family info
  const { data: family } = await supabase
    .from('families')
    .select('id, name')
    .eq('id', familyId)
    .single()

  if (!family) return null

  // Get members
  const { data: memberships } = await supabase
    .from('family_members')
    .select('user_id')
    .eq('family_id', familyId)

  if (!memberships || memberships.length === 0) return null

  const memberIds = memberships.map(m => m.user_id)

  // Get tasks created this week for this family
  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, title, status, completed_at, assigned_to, created_at')
    .eq('family_id', familyId)
    .gte('created_at', weekStart.toISOString())
    .lte('created_at', weekEnd.toISOString())

  if (!tasks || tasks.length === 0) return null

  // Calculate member stats
  const memberStats: { userId: string; name: string; tasksCompleted: number }[] = []

  for (const mid of memberIds) {
    const { data: user } = await supabase
      .from('users')
      .select('id, full_name')
      .eq('id', mid)
      .single()

    const completed = tasks.filter(
      t => t.assigned_to === mid && t.status === 'completed'
    ).length

    memberStats.push({
      userId: mid,
      name: user?.full_name || 'Unknown',
      tasksCompleted: completed,
    })
  }

  // Calculate streak (consecutive days someone completed a task)
  let bestStreak = 0
  let currentStreak = 0
  const checkDate = new Date(weekEnd)

  while (checkDate >= weekStart) {
    const dayStart = new Date(checkDate)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(checkDate)
    dayEnd.setHours(23, 59, 59, 999)

    const dayCompletions = tasks.filter(t => {
      if (!t.completed_at) return false
      const ca = new Date(t.completed_at)
      return ca >= dayStart && ca <= dayEnd && t.status === 'completed'
    })

    if (dayCompletions.length > 0) {
      currentStreak++
      bestStreak = Math.max(bestStreak, currentStreak)
    } else {
      currentStreak = 0
    }

    checkDate.setDate(checkDate.getDate() - 1)
  }

  const totalCompleted = tasks.filter(t => t.status === 'completed').length
  const completionRate = tasks.length > 0
    ? Math.round((totalCompleted / tasks.length) * 100)
    : 0

  return {
    familyId,
    familyName: family.name,
    members: memberStats.sort((a, b) => b.tasksCompleted - a.tasksCompleted),
    totalCompleted,
    totalCreated: tasks.length,
    bestStreak,
    completionRate,
  }
}

// ── Main Handler ─────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  console.log('[Weekly Scorecard] Cron job started')

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const weekRange = getWeekRange()
    
    console.log(`[Weekly Scorecard] Scoring period: ${weekRange.label}`)

    // Get all families with active members
    const { data: families, error: famError } = await supabase
      .from('families')
      .select('id, name')

    if (famError) {
      console.error('[Weekly Scorecard] Failed to fetch families:', famError)
      return NextResponse.json({ error: 'Failed to fetch families' }, { status: 500 })
    }

    if (!families || families.length === 0) {
      console.log('[Weekly Scorecard] No families found')
      return NextResponse.json({ checked: true, families: 0, sent: 0 })
    }

    console.log(`[Weekly Scorecard] Processing ${families.length} families`)

    const results: { familyId: string; familyName: string; sent: number; errors: number }[] = []

    for (const family of families) {
      try {
        const scorecard = await buildFamilyScorecard(supabase, family.id, weekRange.start, weekRange.end)
        
        if (!scorecard) {
          console.log(`[Weekly Scorecard] No data for family "${family.name}" (${family.id})`)
          continue
        }

        // Get all family members' user details to send emails
        const { data: members } = await supabase
          .from('family_members')
          .select('user_id')
          .eq('family_id', family.id)

        if (!members) continue

        let sentCount = 0
        let errorCount = 0

        for (const member of members) {
          try {
            // Check if user wants weekly summary
            const wantsEmail = await shouldNotify(member.user_id, 'weekly_summary', 'email')
            if (!wantsEmail) continue

            const { data: user } = await supabase
              .from('users')
              .select('id, email, full_name')
              .eq('id', member.user_id)
              .single()

            if (!user || !user.email) continue

            const topMember = scorecard.members[0]

            const result = await sendEmail(
              weeklyScorecardEmail({
                to: user.email,
                userName: user.full_name || 'there',
                familyName: scorecard.familyName,
                weekLabel: weekRange.label,
                tasksCompleted: scorecard.totalCompleted,
                tasksCreated: scorecard.totalCreated,
                streak: scorecard.bestStreak,
                topMember: topMember?.name || 'No one yet',
                topMemberTasks: topMember?.tasksCompleted || 0,
                memberCount: scorecard.members.length,
                completionRate: scorecard.completionRate,
              })
            )

            if (result.success) {
              sentCount++
            } else {
              errorCount++
              console.warn(`[Weekly Scorecard] Failed to send to ${user.email}: ${result.error}`)
            }
          } catch (memberErr: any) {
            errorCount++
            console.error(`[Weekly Scorecard] Error processing member ${member.user_id}:`, memberErr.message)
          }
        }

        results.push({
          familyId: family.id,
          familyName: family.name,
          sent: sentCount,
          errors: errorCount,
        })

        console.log(
          `[Weekly Scorecard] Family "${family.name}": ${sentCount} sent, ${errorCount} errors, ` +
          `${scorecard.totalCompleted}/${scorecard.totalCreated} tasks (${scorecard.completionRate}%)`
        )
      } catch (familyErr: any) {
        console.error(`[Weekly Scorecard] Error processing family ${family.id}:`, familyErr.message)
      }
    }

    const elapsed = Date.now() - startTime
    const totalSent = results.reduce((sum, r) => sum + r.sent, 0)
    const totalErrors = results.reduce((sum, r) => sum + r.errors, 0)

    console.log(
      `[Weekly Scorecard] Done. ${results.length} families processed, ` +
      `${totalSent} emails sent, ${totalErrors} errors, ${elapsed}ms elapsed`
    )

    return NextResponse.json({
      success: true,
      week: weekRange.label,
      familiesProcessed: results.length,
      emailsSent: totalSent,
      errors: totalErrors,
      elapsed,
      details: results,
    })
  } catch (err: any) {
    console.error('[Weekly Scorecard] Fatal error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}
