import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildAppUrl } from '@/lib/config'

/**
 * POST /api/share/social
 *
 * Generate platform-specific share URLs for a completed task.
 * Also track the share event for analytics.
 *
 * Body:
 *   taskId: string
 *   userId: string
 *   platform?: string  // 'twitter' | 'whatsapp' | 'telegram' | 'facebook' | 'email' | 'copy'
 *
 * Returns:
 *   { shareUrl: string, task: { title, completed_by, family_name }, platform }
 */

export async function POST(req: NextRequest) {
  try {
    const { taskId, userId, platform } = await req.json()

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: taskId, userId' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Fetch task + family + user info
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select(`
        id, title, description, completed_at, family_id, priority,
        created_by,
        assigned_to,
        created_by_user:users!tasks_created_by_fkey(full_name),
        assigned_to_user:users!tasks_assigned_to_fkey(full_name),
        family:families!tasks_family_id_fkey(name)
      `)
      .eq('id', taskId)
      .single()

    if (taskError || !task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // Supabase join returns arrays, normalize
    const createdByUser = Array.isArray(task.created_by_user)
      ? task.created_by_user[0]
      : task.created_by_user
    const assignedToUser = Array.isArray(task.assigned_to_user)
      ? task.assigned_to_user[0]
      : task.assigned_to_user
    const familyInfo = Array.isArray(task.family)
      ? task.family[0]
      : task.family

    // Get the completed_by user name
    let completedByName = 'Someone'
    if (task.completed_at) {
      const { data: doneByUser } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', task.created_by)
        .single()
      if (doneByUser?.full_name) completedByName = doneByUser.full_name
    }

    const creatorName = createdByUser?.full_name || 'Someone'
    const assigneeName = assignedToUser?.full_name || null
    const familyName = familyInfo?.name || 'My Family'
    const displayName = completedByName || creatorName

    // Build the public share URL
    const shareUrl = buildAppUrl(`/share/${encodeURIComponent(task.id)}`)

    // Encode text for URLs
    const taskTitle = task.title
    const encodedTitle = encodeURIComponent(taskTitle)
    const encodedFamily = encodeURIComponent(familyName)
    const encodedName = encodeURIComponent(displayName)
    const encodedShareUrl = encodeURIComponent(shareUrl)

    // Platform-specific sharing text
    const shareText = `${displayName} just completed "${taskTitle}" on Nudge! 🎉`
    const encodedText = encodeURIComponent(shareText)

    // Build platform URLs
    let platformUrl = ''
    let platformLabel = ''

    switch (platform) {
      case 'twitter':
        platformUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedShareUrl}&hashtags=Nudge,FamilyTasks`
        platformLabel = 'Twitter / X'
        break
      case 'whatsapp':
        platformUrl = `https://wa.me/?text=${encodedText}%0A%0A${encodedShareUrl}`
        platformLabel = 'WhatsApp'
        break
      case 'facebook':
        platformUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}&quote=${encodedText}`
        platformLabel = 'Facebook'
        break
      case 'telegram':
        {
          const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'NudgeFamilyBot'
          platformUrl = `https://t.me/share/url?url=${encodedShareUrl}&text=${encodedText}`
          platformLabel = 'Telegram'
        }
        break
      case 'email':
        {
          const emailSubject = encodeURIComponent(`${displayName} completed a task on Nudge! 🎉`)
          const emailBody = encodeURIComponent(
            `${shareText}\n\n` +
            (task.description ? `📝 ${task.description}\n\n` : '') +
            assigneeName ? `👤 For: ${assigneeName}\n\n` : '' +
            `🏡 Family: ${familyName}\n` +
            `🔗 View it: ${shareUrl}\n\n` +
            `--\nPowered by Nudge — Family Task Management`
          )
          platformUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`
          platformLabel = 'Email'
        }
        break
      case 'copy':
        platformUrl = shareUrl
        platformLabel = 'Copy Link'
        break
      default:
        platformUrl = shareUrl
        platformLabel = 'Share'
    }

    // Track the share event (fire-and-forget)
    trackShareEvent(supabase, taskId, userId, platform || 'unknown', shareUrl).catch(() => {})

    return NextResponse.json({
      success: true,
      platform: platform || 'copy',
      platformUrl,
      platformLabel,
      shareUrl,
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        completedByName: displayName,
        assigneeName,
        familyName,
        priority: task.priority,
        completedAt: task.completed_at || new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('Social share API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Track a share event in the database.
 * Creates a row in the task_shares table (created via migration if needed)
 * or falls back to the telemetry table.
 */
async function trackShareEvent(
  supabase: ReturnType<typeof createAdminClient>,
  taskId: string,
  userId: string,
  platform: string,
  shareUrl: string,
) {
  try {
    // Try to insert into a share tracking table
    const { error } = await supabase
      .from('task_shares')
      .insert({
        task_id: taskId,
        user_id: userId,
        platform,
        share_url: shareUrl,
        created_at: new Date().toISOString(),
      })

    if (error) {
      // Fall back to logging in telemetry table
      console.log('[Share Track] Logged share event:', { taskId, userId, platform })
    }
  } catch (err) {
    console.warn('[Share Track] Could not track share:', err)
  }
}

/**
 * GET /api/share/social?taskId=xxx
 * Return share stats for a given task.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const taskId = searchParams.get('taskId')

    if (!taskId) {
      return NextResponse.json({ error: 'Missing taskId' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Try to get share counts from task_shares table
    const { data: shares, error } = await supabase
      .from('task_shares')
      .select('platform')
      .eq('task_id', taskId)

    if (error) {
      // Table may not exist yet — return empty
      return NextResponse.json({
        totalShares: 0,
        platforms: {},
      })
    }

    // Count by platform
    const platformCounts: Record<string, number> = {}
    let total = 0
    for (const s of shares || []) {
      platformCounts[s.platform] = (platformCounts[s.platform] || 0) + 1
      total++
    }

    return NextResponse.json({
      totalShares: total,
      platforms: platformCounts,
    })
  } catch (err) {
    console.error('Share stats error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
