/**
 * POST /api/notifications/send-test
 * Sends a test notification to the requesting user across all enabled channels.
 * Used by the Notification Preferences "Send Test" button so users can
 * verify their notification setup looks right.
 *
 * Body: {
 *   userId: string
 *   channel: 'telegram' | 'email' | 'in_app'
 * }
 *
 * Returns { success: true, channel, detail } for the requested channel.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { tryInsertNotification } from '@/lib/supabase/migrate'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'

export async function POST(req: NextRequest) {
  try {
    const { userId, channel } = await req.json()

    if (!userId || !channel) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, channel' },
        { status: 400 }
      )
    }

    const validChannels = ['telegram', 'email', 'in_app']
    if (!validChannels.includes(channel)) {
      return NextResponse.json(
        { error: `Invalid channel: ${channel}. Must be one of: ${validChannels.join(', ')}` },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Fetch user info
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, full_name, telegram_chat_id, telegram_username')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const result: { success: boolean; channel: string; detail: string } = {
      success: false,
      channel,
      detail: '',
    }

    switch (channel) {
      case 'telegram': {
        if (!user.telegram_chat_id) {
          result.detail = 'Telegram not connected. Go to Settings → Telegram to connect.'
          break
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN
        if (!botToken) {
          result.detail = 'Telegram bot not configured (missing TELEGRAM_BOT_TOKEN).'
          break
        }

        const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
        const res = await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: user.telegram_chat_id,
            text: `🔔 **Test Notification**\n\nThis is a test from Nudge! Your notification settings are working correctly.\n\nIf you can see this message, Telegram notifications are fully set up. 🎉`,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '👁️ Open Nudge',
                    url: APP_URL + '/dashboard',
                  },
                ],
              ],
            },
          }),
        })

        if (res.ok) {
          result.success = true
          result.detail = 'Test Telegram sent! Check your Telegram chat.'
        } else {
          const errBody = await res.text()
          result.detail = `Telegram send failed: ${errBody.substring(0, 200)}`
        }
        break
      }

      case 'email': {
        if (!user.email) {
          result.detail = 'No email address on file.'
          break
        }

        try {
          const emailRes = await fetch(`${APP_URL}/api/email/send-reminder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              taskId: 'test-notification',
              userId: user.id,
              type: 'test-mode',
            }),
          })
          const emailData = await emailRes.json()

          if (emailData.success) {
            result.success = true
            result.detail = `Test email sent to ${user.email}!`
          } else {
            result.detail = `Email failed: ${emailData.error || 'Unknown error'}`
          }
        } catch (emailErr: any) {
          result.detail = `Email send error: ${emailErr.message}`
        }
        break
      }

      case 'in_app': {
        const inserted = await tryInsertNotification(supabase, {
          user_id: user.id,
          type: 'system',
          title: '🔔 Test Notification',
          body: 'This is a test notification from Nudge. Your in-app notifications are working! 🎉',
        })

        if (inserted) {
          result.success = true
          result.detail = 'Test in-app notification created!'
        } else {
          result.detail = 'Failed to create in-app notification.'
        }
        break
      }
    }

    return NextResponse.json(result)
  } catch (err: any) {
    console.error('[Send Test Notification] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}
