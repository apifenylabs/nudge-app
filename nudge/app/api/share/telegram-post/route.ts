import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildAppUrl } from '@/lib/config'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

/**
 * POST /api/share/telegram-post
 *
 * Post a task completion celebration to the family's Telegram group chat.
 * The family must have at least one member with a connected Telegram chat.
 *
 * Body:
 *   taskId: string
 *   userId: string  // the user who completed the task
 *
 * Returns:
 *   { success: boolean, posted: boolean, chatIds: number[], message: string }
 */

export async function POST(req: NextRequest) {
  try {
    const { taskId, userId } = await req.json()

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: taskId, userId' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Fetch task with family and user details
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

    // Get the completing user's name
    const { data: completingUser } = await supabase
      .from('users')
      .select('full_name')
      .eq('id', userId)
      .single()

    const completedByName = completingUser?.full_name || 'Someone'
    const creatorName = createdByUser?.full_name || 'Someone'
    const assigneeName = assignedToUser?.full_name || null
    const familyName = familyInfo?.name || 'My Family'
    const displayName = completedByName

    // Find all family members with Telegram connected
    const { data: familyMembers } = await supabase
      .from('family_members')
      .select(`
        user_id,
        users!inner (
          id, full_name, telegram_chat_id
        )
      `)
      .eq('family_id', task.family_id)

    if (!familyMembers || familyMembers.length === 0) {
      return NextResponse.json({
        success: true,
        posted: false,
        chatIds: [],
        message: 'No family members with Telegram connected',
      })
    }

    // Collect unique Telegram chat IDs
    const chatIdSet = new Set<number>()
    for (const member of familyMembers) {
      const user = Array.isArray(member.users) ? member.users[0] : member.users
      if (user?.telegram_chat_id) {
        chatIdSet.add(user.telegram_chat_id)
      }
    }
    const chatIds = Array.from(chatIdSet)

    // Build the share URL
    const shareUrl = buildAppUrl(`/share/${encodeURIComponent(task.id)}`)

    // Build celebration message
    const priorityEmoji: Record<string, string> = {
      low: '🟢',
      medium: '🟡',
      high: '🟠',
      urgent: '🔴',
    }
    const priorityEmojiStr = priorityEmoji[task.priority] || '✅'

    let message = `🎉 **Task Complete!**\n\n`
    message += `${priorityEmojiStr} *"${task.title}"*\n\n`
    message += `✅ Completed by: *${displayName}*\n`
    if (assigneeName && assigneeName !== displayName) {
      message += `👤 For: *${assigneeName}*\n`
    }
    message += `🏡 Family: *${familyName}*\n\n`

    if (task.completed_at) {
      const dateStr = new Date(task.completed_at).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
      message += `🕐 ${dateStr}\n\n`
    }

    message += `👏 Great teamwork! Keep it up!\n\n`
    message += `🔗 ${shareUrl}`

    // Send to all connected Telegram users
    let postedCount = 0
    const sentChatIds: number[] = []

    for (const chatId of chatIds) {
      try {
        const keyboard = {
          inline_keyboard: [
            [
              {
                text: '👏 Celebrate!',
                callback_data: `celebrate_${task.id}`,
              },
              {
                text: '📋 View Task',
                url: shareUrl,
              },
            ],
            [
              {
                text: '⭐ Open Nudge Dashboard',
                url: buildAppUrl('/dashboard'),
              },
            ],
          ],
        }

        const res = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
            reply_markup: keyboard,
          }),
        })

        const result = await res.json()
        if (result.ok) {
          postedCount++
          sentChatIds.push(chatId)

          // Log the sent message (fire-and-forget)
          try {
            await supabase.from('telegram_messages').insert({
              chat_id: chatId,
              message_id: result.result?.message_id || 0,
              message_text: `[Auto-post] Task complete: ${task.title}`,
              is_bot_response: true,
            })
          } catch {
            // Logging is best-effort
          }
        }
      } catch (err) {
        console.warn(`[TelegramPost] Failed to send to chat ${chatId}:`, err)
      }
    }

    return NextResponse.json({
      success: true,
      posted: postedCount > 0,
      chatIds: sentChatIds,
      postedCount,
      message: postedCount > 0
        ? `Posted to ${postedCount} Telegram chat${postedCount !== 1 ? 's' : ''}`
        : 'No Telegram messages sent',
    })
  } catch (err) {
    console.error('Telegram auto-post error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/share/telegram-post?status
 * Check the status of the Telegram auto-post feature.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  if (searchParams.get('status') === '1') {
    const hasToken = !!process.env.TELEGRAM_BOT_TOKEN
    return NextResponse.json({
      enabled: hasToken,
      botTokenConfigured: hasToken,
      botUsername: process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'NudgeFamilyBot',
    })
  }

  return NextResponse.json({ error: 'Use ?status=1 to check status' }, { status: 400 })
}
