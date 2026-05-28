/**
 * Telegram Inline Mode API Route
 * 
 * Handles Telegram inline queries (@nudgebot <query> in any chat).
 * Parses natural language tasks for connected users.
 * 
 * Flow:
 * 1. User types @nudgebot <task description> in any Telegram chat
 * 2. Bot receives inline_query event
 * 3. Looks up user by telegram_chat_id (from latest connection)
 * 4. Parses the query with NLP parser
 * 5. Returns inline results with "Quick Add", "Edit", and "Open Dashboard" options
 * 
 * Inline mode makes Nudge a system-level assistant — available everywhere.
 */

import { NextRequest, NextResponse } from 'next/server'
import { nlpParser } from '@/lib/nlp-parser'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildAppUrl } from '@/lib/config'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

let _admin: ReturnType<typeof createAdminClient> | null = null
function db() {
  if (!_admin) _admin = createAdminClient()
  return _admin
}

/**
 * Fire-and-forget inline query tracking for analytics
 */
function trackInlineQuery(
  userId: string | null,
  telegramUserId: number,
  queryText: string,
  wasConnected: boolean,
  resultCount: number
) {
  const payload: Record<string, any> = {
    telegram_user_id: telegramUserId,
    query_text: queryText.substring(0, 500),
    was_connected: wasConnected,
    result_count: resultCount,
  }
  if (userId) payload.user_id = userId

  db().from('inline_queries').insert(payload).then(
    () => {},
    () => {}
  )
}

/**
 * Register the inline mode handler with Telegram.
 * Call this once after deployment to set up inline queries.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'register') {
      return await handleInlineRegistration()
    }

    if (action === 'status') {
      return await handleInlineStatus()
    }

    return NextResponse.json({ error: 'Unknown action. Use ?action=register or ?action=status' }, { status: 400 })
  } catch (error) {
    console.error('Inline management error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleInlineRegistration() {
  // Set bot inline mode via getMe + setMyDescription (inline placeholder)
  // Actual inline mode is enabled via @BotFather, but we set the inline placeholder text
  const response = await fetch(`${TELEGRAM_API_URL}/setMyDescription`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description:
        'Nudge — your family task manager 🤖\n\n' +
        'Use @nudgebot inline in ANY chat:\n' +
        '@nudgebot Remind Jake to take out trash tonight\n' +
        '@nudgebot Buy groceries: milk, eggs, bread\n' +
        '@nudgebot Dad needs to call plumber tomorrow\n' +
        '@nudgebot Clean garage this weekend\n\n' +
        'Results appear instantly — tap to add to your Nudge dashboard!',
    }),
  })

  const result = await response.json()

  // Also set inline placeholder
  const placeholderRes = await fetch(`${TELEGRAM_API_URL}/setMyName`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Nudge Task Manager',
    }),
  })
  const placeholderResult = await placeholderRes.json()

  return NextResponse.json({
    success: result.ok && placeholderResult.ok,
    description: result,
    name: placeholderResult,
    note: 'Inline mode must also be enabled via @BotFather → /setinline → @nudgebot',
    inlineSetupInstructions: [
      '1. Open Telegram and message @BotFather',
      '2. Send /setinline',
      '3. Select your bot (@nudgebot)',
      '4. Set inline placeholder: "Remind Jake to take out trash..."',
      '5. Done! Users can now type @nudgebot in any chat',
    ],
  })
}

async function handleInlineStatus() {
  const [meRes, descRes, nameRes] = await Promise.all([
    fetch(`${TELEGRAM_API_URL}/getMe`),
    fetch(`${TELEGRAM_API_URL}/getMyDescription`),
    fetch(`${TELEGRAM_API_URL}/getMyName`),
  ])

  const [me, description, name] = await Promise.all([
    meRes.json(),
    descRes.json(),
    nameRes.json(),
  ])

  // Try to get commands (will show inline placeholder if set)
  let commands: any = null
  try {
    const cmdRes = await fetch(`${TELEGRAM_API_URL}/getMyCommands`)
    commands = await cmdRes.json()
  } catch {}

  return NextResponse.json({
    bot: me,
    description: description.result?.description || 'Not set',
    shortName: name.result?.name || 'Not set',
    commands,
    inlineEnabled: me.result?.supports_inline_queries || false,
  })
}

/**
 * POST: Handle inline queries from Telegram
 * This is the core inline mode handler.
 */
export async function POST(request: NextRequest) {
  try {
    const update = await request.json()

    // Handle inline queries
    if (update.inline_query) {
      return await handleInlineQuery(update.inline_query)
    }

    // Handle callback queries from inline results (e.g., "Quick Add")
    if (update.callback_query && update.callback_query.inline_message_id) {
      return await handleInlineCallback(update.callback_query)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Inline query error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleInlineQuery(inlineQuery: any) {
  const query = inlineQuery.query.trim()
  const queryId = inlineQuery.id
  const fromId = inlineQuery.from.id
  const offset = inlineQuery.offset || ''

  // Empty query — show help/placeholder results
  if (!query) {
    return await answerInlineQuery(queryId, [
      {
        type: 'article',
        id: 'help',
        title: '💡 How to use Nudge inline',
        description: 'Type a task like "Remind Jake to take out trash tonight"',
        input_message_content: {
          message_text:
            '🤖 **Nudge — Family Task Manager**\n\n' +
            'Just type a task in any chat using @nudgebot:\n\n' +
            '• `@nudgebot Remind Sarah to buy milk`\n' +
            '• `@nudgebot Clean garage this weekend`\n' +
            '• `@nudgebot Pay electricity bill tomorrow`\n\n' +
            'Tap the result to add it to your dashboard instantly!',
          parse_mode: 'Markdown',
        },
        reply_markup: {
          inline_keyboard: [[
            {
              text: '📋 Open Nudge Dashboard',
              url: buildAppUrl('/dashboard'),
            },
          ]],
        },
      },
      {
        type: 'article',
        id: 'connect',
        title: '🔗 Not connected?',
        description: 'Link your Nudge account to use inline mode',
        input_message_content: {
          message_text:
            'To use @nudgebot inline, connect your Nudge account first.\n\n' +
            '1. Open your Nudge Dashboard\n' +
            '2. Go to Settings → Telegram\n' +
            '3. Click "Connect Telegram"\n' +
            '4. Send the code with /connect in the bot chat\n\n' +
            'Or create an account: ' + buildAppUrl('/'),
          parse_mode: 'Markdown',
        },
        reply_markup: {
          inline_keyboard: [[
            {
              text: '🚀 Get Started',
              url: buildAppUrl('/'),
            },
          ]],
        },
      },
    ])
  }

  // Look up user by Telegram ID — try users table first (more reliable)
  const { data: telegramUserByChat } = await db()
    .from('users')
    .select('id')
    .eq('telegram_chat_id', fromId)
    .maybeSingle()

  let userId: string | null = telegramUserByChat?.id || null

  // Fallback to telegram_messages lookup
  if (!userId) {
    const { data: telegramUser } = await db()
      .from('telegram_messages')
      .select('user_id')
      .eq('chat_id', fromId)
      .not('user_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (telegramUser?.user_id) {
      userId = telegramUser.user_id
    }
  }

  let familyId: string | null = null
  let familyName: string | null = null
  let memberNames: string[] = []

  if (userId) {

    // Get user's family
    const { data: membership } = await db()
      .from('family_members')
      .select('family_id, families!inner(name)')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle()

    if (membership) {
      const famInfo = Array.isArray(membership.families)
        ? membership.families[0]
        : membership.families
      familyId = membership.family_id
      familyName = famInfo?.name || null

      // Get all family member names
      const { data: members } = await db()
        .from('family_members')
        .select('users!inner(full_name)')
        .eq('family_id', familyId)

      if (members) {
        memberNames = members.map((m: any) => {
          const u = Array.isArray(m.users) ? m.users[0] : m.users
          return u?.full_name || 'Family Member'
        })
      }
    }
  }

  // Track the query for analytics (fire-and-forget)
  const resultCountRef: { current: number } = { current: 0 }

  // Parse query with NLP
  try {
    if (userId && familyId) {
      const parsedTask = await nlpParser.parseMessage(query, userId, familyId)

      // Build inline results
      const results = await buildInlineResults(queryId, query, parsedTask, userId, familyId, familyName, memberNames)
      resultCountRef.current = results.length

      // Track this query (fire-and-forget)
      trackInlineQuery(userId, fromId, query, true, results.length)

      return await answerInlineQuery(queryId, results, { cache_time: 0 })
    }

    // User not connected — show connect-first results with preview
    const previewResults = await buildPreviewResults(query, memberNames)
    resultCountRef.current = previewResults.length

    // Track this query (unconnected user)
    trackInlineQuery(userId, fromId, query, false, previewResults.length)

    return await answerInlineQuery(queryId, previewResults, { cache_time: 30 })

  } catch (parseError) {
    console.warn('Inline NLP parse failed, showing quick-add fallback:', parseError)

    // Track failed query
    trackInlineQuery(userId, fromId, query, !!userId, 0)

    // Fallback: simple quick-add without NLP
    const fallbackResults = [
      {
        type: 'article' as const,
        id: `quick_${Date.now()}`,
        title: `➕ Add: ${query.length > 40 ? query.substring(0, 37) + '...' : query}`,
        description: 'Quick-add as a pending task',
        input_message_content: {
          message_text: `✅ **Task Added**\n\n"${query}" has been added to your Nudge dashboard.`,
          parse_mode: 'Markdown',
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '📋 Open Dashboard',
                url: buildAppUrl('/dashboard'),
              },
            ],
          ],
        },
      },
    ]

    return await answerInlineQuery(queryId, fallbackResults, { cache_time: 0 })
  }
}

async function buildInlineResults(
  queryId: string,
  originalQuery: string,
  parsedTask: any,
  userId: string,
  familyId: string,
  familyName: string | null,
  memberNames: string[]
) {
  const results: any[] = []

  // 1. Quick Add — One-tap create task
  const quickAddId = `quick_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
  results.push({
    type: 'article',
    id: quickAddId,
    title: `✅ Add: ${parsedTask.title}`,
    description: buildQuickDescription(parsedTask),
    thumbnail_url: 'https://img.icons8.com/color/48/checkmark--v1.png',
    input_message_content: {
      message_text: buildResultMessage(parsedTask, familyName),
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '✅ Quick Add',
            callback_data: `inline_add_${quickAddId}`,
          },
          {
            text: '✏️ Edit in Dashboard',
            url: buildAppUrl('/dashboard'),
          },
        ],
      ],
    },
  })

  // 2. Assign to specific family members
  if (memberNames.length > 1) {
    for (const memberName of memberNames) {
      if (memberName && memberName !== 'Family Member') {
        const assignedId = `assign_${memberName.replace(/\s+/g, '_')}_${Date.now()}`
        results.push({
          type: 'article',
          id: assignedId,
          title: `👤 Assign to ${memberName}: ${parsedTask.title}`,
          description: `Assigned to ${memberName}${parsedTask.due_date ? ` — due ${new Date(parsedTask.due_date).toLocaleDateString()}` : ''}`,
          input_message_content: {
            message_text: buildResultMessage({ ...parsedTask, title: parsedTask.title }, familyName, memberName),
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
          },
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '✅ Quick Add',
                  callback_data: `inline_assign_${assignedId}`,
                },
              ],
            ],
          },
        })
      }
    }
  }

  // 3. Schedule variant — different due dates
  const scheduleVariants = ['today', 'tomorrow', 'this weekend', 'next week']
  for (const when of scheduleVariants) {
    const dateLabel = when.charAt(0).toUpperCase() + when.slice(1)
    const variantId = `sched_${when}_${Date.now()}`
    results.push({
      type: 'article',
      id: variantId,
      title: `📅 Due ${dateLabel}: ${parsedTask.title}`,
      description: `Schedule for ${when}`,
      input_message_content: {
        message_text: `📅 **${parsedTask.title}** — Due ${dateLabel}\n\nAdded to your Nudge dashboard.`,
        parse_mode: 'Markdown',
      },
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '✅ Quick Add',
              callback_data: `inline_sched_${variantId}`,
            },
          ],
        ],
      },
    })
  }

  return results
}

async function buildPreviewResults(
  originalQuery: string,
  memberNames: string[]
) {
  const results: any[] = []

  // Show what the parsed task would look like
  results.push({
    type: 'article',
    id: 'preview_parse',
    title: `🎯 "${originalQuery}"`,
    description: 'Connect your Nudge account to add tasks inline',
    input_message_content: {
      message_text:
        `📝 **Task Preview**\n\n"${originalQuery}"\n\n` +
        `Connect your Nudge account to add tasks directly from any chat!\n\n` +
        `${buildAppUrl('/dashboard/settings')}`,
      parse_mode: 'Markdown',
    },
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🔗 Connect Nudge',
          url: buildAppUrl('/dashboard/settings'),
        },
        {
          text: '📋 Dashboard',
          url: buildAppUrl('/dashboard'),
        },
      ]],
    },
  })

  // Sign-up CTA
  results.push({
    type: 'article',
    id: 'preview_signup',
    title: '🚀 Get Nudge — Free',
    description: 'Family task management that actually works',
    input_message_content: {
      message_text:
        '🏡 **Nudge — Family Task Manager**\n\n' +
        '• Natural language task creation\n' +
        '• Telegram integration\n' +
        '• Smart reminders\n' +
        '• Family sharing\n\n' +
        'Get started free: ' + buildAppUrl('/'),
      parse_mode: 'Markdown',
    },
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🚀 Sign Up Free',
          url: buildAppUrl('/auth/signup'),
        },
      ]],
    },
  })

  return results
}

function buildQuickDescription(parsed: any): string {
  const parts: string[] = []
  if (parsed.assigned_to) parts.push('👤 Assigned')
  if (parsed.due_date) parts.push(`📅 ${new Date(parsed.due_date).toLocaleDateString()}`)
  if (parsed.priority && parsed.priority !== 'medium') {
    parts.push(`🏷️ ${parsed.priority.charAt(0).toUpperCase() + parsed.priority.slice(1)}`)
  }
  if (parsed.category) parts.push(`📂 ${parsed.category.charAt(0).toUpperCase() + parsed.category.slice(1)}`)
  return parts.length > 0 ? parts.join(' · ') : 'Quick-add task'
}

function buildResultMessage(parsed: any, familyName?: string | null, assignOverride?: string): string {
  const parts = [`✅ **${parsed.title}**`]
  if (assignOverride) parts.push(`\n👤 Assigned to: ${assignOverride}`)
  if (parsed.due_date) {
    const d = new Date(parsed.due_date)
    parts.push(`\n📅 Due: ${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`)
  }
  parts.push(`\n🏷️ Priority: ${parsed.priority.charAt(0).toUpperCase() + parsed.priority.slice(1)}`)
  if (parsed.category) parts.push(`\n📂 ${parsed.category.charAt(0).toUpperCase() + parsed.category.slice(1)}`)
  if (parsed.is_recurring && parsed.recurrence_pattern) {
    parts.push(`\n🔄 Repeats ${parsed.recurrence_pattern}`)
  }
  parts.push(`\n\n📍 *${familyName || 'My Family'}* · Nudge`)
  return parts.join('')
}

/**
 * Handle callback from inline results
 */
async function handleInlineCallback(callbackQuery: any) {
  const data = callbackQuery.data || ''
  const fromId = callbackQuery.from.id
  const inlineMessageId = callbackQuery.inline_message_id

  // Extract action type
  if (data.startsWith('inline_add_') || data.startsWith('inline_assign_') || data.startsWith('inline_sched_')) {
    // Look up user
    const { data: telegramUser } = await db()
      .from('telegram_messages')
      .select('user_id')
      .eq('chat_id', fromId)
      .not('user_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!telegramUser?.user_id) {
      await answerCallbackQuery(callbackQuery.id, 'Connect your Nudge account first!', true)
      return
    }

    const userId = telegramUser.user_id

    // Get user's family
    const { data: membership } = await db()
      .from('family_members')
      .select('family_id')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle()

    if (!membership) {
      await answerCallbackQuery(callbackQuery.id, 'Create a family first!', true)
      return
    }

    // Create a placeholder task in the database
    // The callback data tells us what type of add this is
    const taskData = {
      family_id: membership.family_id,
      created_by: userId,
      title: 'New Task from Inline',
      description: 'Added via @nudgebot inline in Telegram',
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const { data: task, error } = await db()
      .from('tasks')
      .insert(taskData)
      .select()
      .single()

    if (error || !task) {
      console.error('Error creating inline task:', error)
      await answerCallbackQuery(callbackQuery.id, 'Could not create task. Try again.', true)
      return
    }

    await answerCallbackQuery(
      callbackQuery.id,
      '✅ Task added! View it in your dashboard.',
      false
    )

    // Edit the inline message to show success
    await editInlineMessageText(
      inlineMessageId,
      `✅ **Task Added!**\n\nTask has been added to your Nudge dashboard.\n\n[View Dashboard](${buildAppUrl('/dashboard')})`,
      {
        inline_keyboard: [[
          {
            text: '📋 Open Dashboard',
            url: buildAppUrl('/dashboard'),
          },
        ]],
      }
    )
  }
}

/**
 * Answer an inline query with results
 */
async function answerInlineQuery(
  queryId: string,
  results: any[],
  options: { cache_time?: number; is_personal?: boolean } = {}
) {
  const response = await fetch(`${TELEGRAM_API_URL}/answerInlineQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inline_query_id: queryId,
      results: results,
      cache_time: options.cache_time ?? 1,
      is_personal: options.is_personal ?? true,
      button: {
        text: '📋 Open Nudge Dashboard',
        url: buildAppUrl('/dashboard'),
      },
    }),
  })

  return response.json()
}

/**
 * Answer a callback query (show toast notification)
 */
async function answerCallbackQuery(callbackQueryId: string, text: string, showAlert: boolean = false) {
  const response = await fetch(`${TELEGRAM_API_URL}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
      show_alert: showAlert,
    }),
  })

  return response.json()
}

/**
 * Edit an inline message text
 */
async function editInlineMessageText(inlineMessageId: string, text: string, replyMarkup?: any) {
  const body: any = {
    inline_message_id: inlineMessageId,
    text,
    parse_mode: 'Markdown',
  }
  if (replyMarkup) body.reply_markup = replyMarkup

  const response = await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return response.json()
}
