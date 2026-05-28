import { NextRequest, NextResponse } from 'next/server'
import { nlpParser } from '@/lib/nlp-parser'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildAppUrl } from '@/lib/config'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

// Lazy getter — avoids build-time Supabase client eval
let _admin: ReturnType<typeof createAdminClient> | null = null;
function db() {
  if (!_admin) _admin = createAdminClient();
  return _admin;
}

export async function POST(request: NextRequest) {
  try {
    if (TELEGRAM_WEBHOOK_SECRET) {
      const secretHeader = request.headers.get('x-telegram-bot-api-secret-token')
      if (secretHeader !== TELEGRAM_WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const update = await request.json()

    if (update.inline_query) {
      // Route inline queries to the inline handler
      const inlineUrl = new URL(request.url)
      inlineUrl.pathname = '/api/telegram/inline'
      const inlineRes = await fetch(inlineUrl.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      })
      return NextResponse.json({ ok: inlineRes.ok })
    }

    if (update.message) {
      // Handle voice messages
      if (update.message.voice) {
        await handleVoiceMessage(update.message)
      } else {
        await handleMessage(update.message)
      }
    } else if (update.callback_query) {
      await handleCallbackQuery(update.callback_query)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleMessage(message: any) {
  const chatId = message.chat.id
  const text = message.text || ''

  await db().from('telegram_messages').insert({
    chat_id: chatId,
    message_id: message.message_id,
    message_text: text,
    is_bot_response: false,
  })

  if (text.startsWith('/start')) {
    // Handle deep link invites: /start invite_XXX
    const startParam = message.text?.replace('/start', '').trim()

    // Handle share deep links: /start share_TASKID
    if (startParam && startParam.startsWith('share_')) {
      const taskId = startParam.replace('share_', '')
      const shareUrl = buildAppUrl(`/share/${taskId}`)

      const keyboard = {
        inline_keyboard: [
          [
            {
              text: '✅ View Completed Task',
              url: shareUrl,
            }
          ],
          [
            {
              text: '📋 Try Nudge for Your Family',
              url: buildAppUrl('/'),
            }
          ]
        ]
      }

      await sendMessage(
        chatId,
        `🎉 **Check Out This Completed Task!**\n\n` +
          `Someone shared a completed task from Nudge with you!\n\n` +
          `Nudge helps families stay organized with smart task management, ` +
          `natural language reminders, and real-time notifications.\n\n` +
          `Tap below to see the task and learn more!`,
        keyboard
      )
      return
    }

    if (startParam && startParam.startsWith('invite_')) {
      const inviteCode = startParam.replace('invite_', '').toUpperCase()
      const inviteLink = buildAppUrl(`/join/${inviteCode}`)

      // Send a warm invite message with button
      const keyboard = {
        inline_keyboard: [
          [
            {
              text: '🎉 Accept Invitation',
              url: inviteLink,
            }
          ],
          [
            {
              text: '📋 Learn More About Nudge',
              url: buildAppUrl('/'),
            }
          ]
        ]
      }

      await sendMessage(
        chatId,
        `🎉 **You're Invited to Join a Family on Nudge!**\n\n` +
          `Someone has invited you to join their family on Nudge — ` +
          `the family task manager that helps everyone stay on track.\n\n` +
          `Click the button below to accept your invitation and get started!\n\n` +
          `_Invite code: \`${inviteCode}\`_`,
        keyboard
      )
      return
    }

    await sendMessage(
      chatId,
      `👋 Welcome to Nudge!\n\n` +
        `I'm your family task assistant. Just message me naturally:\n\n` +
        `• "Remind Jake to take out trash tonight"\n` +
        `• "Dad needs to call plumber tomorrow"\n` +
        `• "Buy milk"\n\n` +
        `I'll organize tasks, assign family members, and send reminders until things get done.\n\n` +
        `To get started, connect your Telegram account in the Nudge dashboard.`
    )
    return
  }

  if (text.startsWith('/help')) {
    await sendMessage(
      chatId,
      `🤖 **Nudge Bot Help**\n\n` +
        `**Commands:**\n` +
        `/start - Welcome message\n` +
        `/help - This help message\n` +
        `/tasks - View your pending tasks\n` +
        `/done - Mark a task as complete\n` +
        `/family - View your family members\n\n` +
        `**Natural Language Examples:**\n` +
        `• "Remind Sarah to water plants tomorrow"\n` +
        `• "We need groceries: milk, eggs, bread"\n` +
        `• "Clean garage this weekend"\n\n` +
        `**Quick Complete:** Reply to any task message with /done to mark it complete.\n\n` +
        `I'll ask clarifying questions if I'm unsure about something!`
    )
    return
  }

  // Handle /connect command: /connect <CODE>
  if (text.startsWith('/connect')) {
    const code = text.replace('/connect', '').trim().toUpperCase()
    if (!code) {
      await sendMessage(
        chatId,
        `🔗 **Connect Your Account**\n\n` +
          `To link your Nudge account, please:\n\n` +
          `1. Go to Nudge Dashboard → Settings → Telegram\n` +
          `2. Click "Connect Telegram"\n` +
          `3. You'll get a 6-character code\n` +
          `4. Send: /connect YOUR_CODE\n\n` +
          `Codes expire after 5 minutes.`
      )
      return
    }

    // Verify the code via the connect API
    try {
      const connectUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'
      const res = await fetch(`${connectUrl}/api/telegram/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          chatId,
          username: message.from?.username || null,
        }),
      })

      const data = await res.json()

      if (data.success && data.verified) {
        await sendMessage(
          chatId,
          `✅ **Account Connected!** 🎉\n\n` +
            `Your Telegram account is now linked to Nudge.\n\n` +
            `You can now:\n` +
            `• Send tasks naturally — "Remind Sarah to walk the dog"\n` +
            `• Mark tasks done with /done\n` +
            `• View tasks with /tasks\n` +
            `• Get reminders right here\n\n` +
            `Try it now: "Clean the garage tomorrow" 🚀`
        )
        return
      }

      await sendMessage(
        chatId,
        `❌ **Connection Failed**\n\n` +
          `${data.error || 'Invalid or expired code.'}\n\n` +
          `Generate a new code from the Nudge dashboard settings.`
      )
    } catch (err) {
      await sendMessage(
        chatId,
        `❌ **Connection Error**\n\n` +
          `Could not verify code. Please try again from the Nudge dashboard settings.`
      )
    }
    return
  }

  // Handle /done command
  if (text.startsWith('/done')) {
    // If it's a reply to a task message, extract task from replied message
    const replyTo = message.reply_to_message
    if (replyTo?.text) {
      // Try to find the task from the replied bot message
      const repliedText = replyTo.text
      const taskMatch = repliedText.match(/\*\*([^*]+)\*\*/)
      if (taskMatch) {
        const taskTitle = taskMatch[1].trim()
        await completeTaskByName(chatId, taskTitle)
        return
      }
    }

    // Otherwise, list pending tasks and let user pick
    await listTasksForCompletion(chatId)
    return
  }

  // Handle /tasks command
  if (text.startsWith('/tasks')) {
    await listUserTasks(chatId)
    return
  }

  const { data: user } = await db()
    .from('users')
    .select('*')
    .eq('telegram_chat_id', chatId)
    .single()

  if (!user) {
    await sendMessage(
      chatId,
      `🔗 **Account Not Connected**\n\n` +
        `I don't see your Nudge account connected to this Telegram chat.\n\n` +
        `Please:\n` +
        `1. Go to your Nudge dashboard\n` +
        `2. Navigate to Settings → Telegram\n` +
        `3. Click "Connect Telegram"\n` +
        `4. Send the code shown to me\n\n` +
        `Or sign up at: ${buildAppUrl('/')}`
    )
    return
  }

  await parseAndCreateTaskWithNLP(text, user.id, chatId)
}

async function parseAndCreateTaskWithNLP(text: string, userId: string, chatId: number) {
  const { data: userFamilies } = await db()
    .from('family_members')
    .select('family_id')
    .eq('user_id', userId)
    .limit(1)

  if (!userFamilies || userFamilies.length === 0) {
    await sendMessage(chatId, "You don't have a family set up yet. Please create one in the dashboard.")
    return
  }

  const familyId = userFamilies[0].family_id

  // Check daily task limit before parsing
  const { checkDailyTaskLimit } = await import('@/lib/plans')
  const limitCheck = await checkDailyTaskLimit(userId)
  if (!limitCheck.allowed) {
    await sendMessage(
      chatId,
      `⚠️ **Task Limit Reached**\n\n${limitCheck.message}\n\n` +
      `You've created ${limitCheck.tasksToday} task${limitCheck.tasksToday !== 1 ? 's' : ''} today. ` +
      `Your plan allows ${limitCheck.maxTasks === -1 ? 'unlimited' : limitCheck.maxTasks} per day.\n\n` +
      `Upgrade to Pro for unlimited tasks: ${buildAppUrl('/pricing')}`
    )
    return
  }

  try {
    const parsedTask = await nlpParser.parseMessage(text, userId, familyId)

    const missingInfo: string[] = []
    if (!parsedTask.assigned_to) {
      missingInfo.push('assigned_to')
    }
    if (!parsedTask.due_date && parsedTask.priority === 'urgent') {
      missingInfo.push('due_date')
    }

    if (missingInfo.length > 0) {
      const question = await nlpParser.askClarifyingQuestion(text, userId, familyId, missingInfo)
      await sendMessage(chatId, `🤔 ${question}`)

      await db().from('pending_tasks').insert({
        user_id: userId,
        family_id: familyId,
        original_message: text,
        parsed_data: parsedTask,
        missing_info: missingInfo,
        chat_id: chatId,
      })

      return
    }

    const { data: task, error } = await db()
      .from('tasks')
      .insert({
        family_id: familyId,
        created_by: userId,
        title: parsedTask.title,
        description: parsedTask.description || `Created via Telegram: "${text}"`,
        assigned_to: parsedTask.assigned_to,
        due_date: parsedTask.due_date,
        status: 'pending',
        priority: parsedTask.priority,
        category: parsedTask.category,
        is_recurring: parsedTask.is_recurring,
        recurrence_pattern: parsedTask.recurrence_pattern,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating task:', error)
      await sendMessage(chatId, "Sorry, I couldn't create that task. Please try again.")
      return
    }

    let confirmation = `✅ **Task Created**\n\n`
    confirmation += `**${parsedTask.title}**\n\n`

    if (parsedTask.assigned_to) {
      const { data: assignedUser } = await db()
        .from('users')
        .select('full_name')
        .eq('id', parsedTask.assigned_to)
        .single()

      if (assignedUser) {
        confirmation += `Assigned to: ${assignedUser.full_name || 'Family Member'}\n`
      }
    }

    if (parsedTask.due_date) {
      const dueDate = new Date(parsedTask.due_date)
      const formattedDate = dueDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      confirmation += `Due: ${formattedDate}\n`
    }

    confirmation += `Priority: ${parsedTask.priority.charAt(0).toUpperCase() + parsedTask.priority.slice(1)}\n`

    if (parsedTask.category) {
      confirmation += `Category: ${parsedTask.category.charAt(0).toUpperCase() + parsedTask.category.slice(1)}\n`
    }

    if (parsedTask.is_recurring && parsedTask.recurrence_pattern) {
      confirmation += `Repeats: ${parsedTask.recurrence_pattern.charAt(0).toUpperCase() + parsedTask.recurrence_pattern.slice(1)}\n`
    }

    // Add inline done button
    const keyboard = {
      inline_keyboard: [[
        {
          text: '✅ Mark as Done',
          callback_data: `done_${task.id}`,
        },
        {
          text: '📋 View in Dashboard',
          url: buildAppUrl('/dashboard'),
        },
      ]],
    }

    await sendMessage(chatId, confirmation, keyboard)

    await db().from('telegram_messages').insert({
      chat_id: chatId,
      message_id: 0,
      user_id: userId,
      message_text: text,
      parsed_task_id: task.id,
      is_bot_response: false,
      nlp_used: true,
      parsed_data: parsedTask,
    })
  } catch (error) {
    console.error('NLP parsing error:', error)
    await parseAndCreateTaskSimple(text, userId, chatId, familyId)
  }
}

async function parseAndCreateTaskSimple(text: string, userId: string, chatId: number, familyId: string) {
  const { data: task, error } = await db()
    .from('tasks')
    .insert({
      family_id: familyId,
      created_by: userId,
      title: text.length > 100 ? `${text.substring(0, 97)}...` : text,
      description: `Created via Telegram: "${text}"`,
      status: 'pending',
      priority: 'medium',
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating task:', error)
    await sendMessage(chatId, "Sorry, I couldn't create that task. Please try again.")
    return
  }

  await sendMessage(
    chatId,
    `✅ **Task Created**\n\n` +
      `**${text.length > 50 ? `${text.substring(0, 47)}...` : text}**\n\n` +
      `Status: Pending\n` +
      `Priority: Medium\n\n` +
      `View and manage this task in your Nudge dashboard.`
  )

  await db().from('telegram_messages').insert({
    chat_id: chatId,
    message_id: 0,
    user_id: userId,
    message_text: text,
    parsed_task_id: task.id,
    is_bot_response: false,
    nlp_used: false,
  })
}

async function handleVoiceMessage(message: any) {
  const chatId = message.chat.id
  const voice = message.voice

  // Check user has plan capacity before processing voice
  const { data: voiceUser } = await db()
    .from('users')
    .select('id')
    .eq('telegram_chat_id', chatId)
    .single()

  if (voiceUser) {
    const { checkDailyTaskLimit } = await import('@/lib/plans')
    const limitCheck = await checkDailyTaskLimit(voiceUser.id)
    if (!limitCheck.allowed) {
      await botSendMessage(
        chatId,
        `⚠️ **Task Limit Reached**\n\n${limitCheck.message}\n\n` +
        `You've created ${limitCheck.tasksToday} task${limitCheck.tasksToday !== 1 ? 's' : ''} today. ` +
        `Your plan allows ${limitCheck.maxTasks === -1 ? 'unlimited' : limitCheck.maxTasks} per day.\n\n` +
        `Upgrade to Pro for unlimited tasks: ${buildAppUrl('/pricing')}`
      )
      return
    }
  }

  // Get the file from Telegram
  const fileRes = await fetch(`${TELEGRAM_API_URL}/getFile?file_id=${voice.file_id}`)
  const fileData = await fileRes.json()

  if (!fileData.ok || !fileData.result?.file_path) {
    await botSendMessage(chatId, "Sorry, I couldn't process your voice message. Please try sending text instead.")
    return
  }

  const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileData.result.file_path}`

  try {
    // Download the audio file
    const audioRes = await fetch(fileUrl)
    const audioBuffer = await audioRes.arrayBuffer()

    // Send to our transcribe endpoint
    // First check if we have an OpenAI key for real transcription
    const openaiKey = process.env.OPENAI_API_KEY

    if (openaiKey) {
      const whisperForm = new FormData()
      const blob = new Blob([audioBuffer], { type: 'audio/ogg' })
      whisperForm.append('file', blob, 'voice.ogg')
      whisperForm.append('model', 'whisper-1')

      const whisperRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${openaiKey}` },
        body: whisperForm,
      })

      if (whisperRes.ok) {
        const whisperData = await whisperRes.json()
        const transcribed = whisperData.text

        await botSendMessage(chatId, `🎤 I heard: "${transcribed}"`)

        // Process the transcribed text as a regular message
        message.text = transcribed
        await handleMessage(message)
        return
      }
    }

    // Fallback: no transcription available
    await botSendMessage(
      chatId,
      `🎤 Voice message received! (${Math.ceil(voice.duration)}s)\n\n` +
      `Voice transcription requires an OpenAI API key. ` +
      `For now, please type your task.`
    )
  } catch (error) {
    console.error('Voice processing error:', error)
    await botSendMessage(chatId, "Sorry, I couldn't process that voice message. Please try typing your task instead.")
  }
}

async function handleCallbackQuery(callbackQuery: any) {
  const chatId = callbackQuery.message.chat.id
  const data = callbackQuery.data

  // Task completion callback: done_{task_id}
  if (data.startsWith('done_')) {
    const taskId = data.replace('done_', '')

    const { data: task, error } = await db()
      .from('tasks')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
      .select('*, created_by_user:users!tasks_created_by_fkey(full_name, telegram_chat_id)')
      .single()

    if (error) {
      console.error('Error completing task via callback:', error)
      await sendMessage(chatId, 'Sorry, I could not mark that task as done. Please try again.')
      return
    }

    // Acknowledge to the person who completed it
    await botSendMessage(chatId, `✅ **Task Completed!**\n\n"${task.title}" marked as done.`)

    // Notify the task creator if they're different from the completer
    const completerUser = await db()
      .from('users')
      .select('full_name')
      .eq('telegram_chat_id', chatId)
      .single()

    const completerName = completerUser?.data?.full_name || 'Someone'

    if (task.created_by_user && task.created_by !== task.assigned_to) {
      const creatorUser = Array.isArray(task.created_by_user)
        ? task.created_by_user[0]
        : task.created_by_user

      if (creatorUser?.telegram_chat_id && creatorUser.telegram_chat_id !== chatId) {
        await botSendMessage(
          creatorUser.telegram_chat_id,
          `✅ **Task Completed**\n\n"${task.title}" was marked as done by ${completerName}!`
        )
      }
    }

    await db().from('telegram_messages').insert({
      chat_id: chatId,
      message_id: callbackQuery.message.message_id,
      user_id: callbackQuery.from?.id ? String(callbackQuery.from.id) : null,
      message_text: `[Done] ${task.title}`,
      parsed_task_id: taskId,
      is_bot_response: false,
    })

    return
  }

  // Fallback: acknowledge unknown callback
  await sendMessage(chatId, `I didn't understand that action: ${data}`)
}

async function sendMessage(chatId: number, text: string, replyMarkup?: any) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
  }

  if (replyMarkup) {
    body.reply_markup = replyMarkup
  }

  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const result = await response.json()

  if (result.ok) {
    await db().from('telegram_messages').insert({
      chat_id: chatId,
      message_id: result.result.message_id,
      message_text: text,
      is_bot_response: true,
    })
  }

  return result
}

async function botSendMessage(chatId: number, text: string, replyMarkup?: any) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
  }

  if (replyMarkup) {
    body.reply_markup = replyMarkup
  }

  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return response.json()
}

async function listUserTasks(chatId: number) {
  const { data: user } = await db()
    .from('users')
    .select('id')
    .eq('telegram_chat_id', chatId)
    .single()

  if (!user) {
    await botSendMessage(chatId, "Please connect your Nudge account first. Visit the dashboard to connect.")
    return
  }

  const { data: tasks } = await db()
    .from('tasks')
    .select('id, title, status, priority, due_date')
    .eq('assigned_to', user.id)
    .in('status', ['pending', 'in_progress'])
    .order('created_at', { ascending: false })
    .limit(10)

  if (!tasks || tasks.length === 0) {
    await botSendMessage(chatId, "🎉 You have no pending tasks!")
    return
  }

  let message = `📋 **Your Pending Tasks (${tasks.length})**\n\n`
  for (const task of tasks) {
    const priorityEmoji = task.priority === 'urgent' ? '🔴' : task.priority === 'high' ? '🟠' : '⚪'
    const dueStr = task.due_date ? ` — Due: ${new Date(task.due_date).toLocaleDateString()}` : ''
    message += `${priorityEmoji} ${task.title}${dueStr}\n`
  }
  message += `\nReply to a task message with /done to mark it complete.`

  await botSendMessage(chatId, message)
}

async function listTasksForCompletion(chatId: number) {
  const { data: user } = await db()
    .from('users')
    .select('id')
    .eq('telegram_chat_id', chatId)
    .single()

  if (!user) {
    await botSendMessage(chatId, "Please connect your Nudge account first.")
    return
  }

  const { data: tasks } = await db()
    .from('tasks')
    .select('id, title, status')
    .eq('assigned_to', user.id)
    .in('status', ['pending', 'in_progress'])
    .limit(10)

  if (!tasks || tasks.length === 0) {
    await botSendMessage(chatId, "🎉 No tasks to mark done. You're all caught up!")
    return
  }

  // Send inline keyboard with task buttons
  const keyboard = {
    inline_keyboard: tasks.map(task => ([
      {
        text: `☐ ${task.title.length > 40 ? task.title.substring(0, 37) + '...' : task.title}`,
        callback_data: `done_${task.id}`,
      }
    ])),
  }

  await botSendMessage(
    chatId,
    `✅ **Mark a Task as Done**\n\nTap a task below to mark it complete:`,
    keyboard
  )
}

async function completeTaskByName(chatId: number, taskTitle: string) {
  const { data: user } = await db()
    .from('users')
    .select('id')
    .eq('telegram_chat_id', chatId)
    .single()

  if (!user) {
    await botSendMessage(chatId, "Please connect your Nudge account first.")
    return
  }

  const { data: tasks, error } = await db()
    .from('tasks')
    .select('id, title, created_by, assigned_to')
    .eq('assigned_to', user.id)
    .in('status', ['pending', 'in_progress'])
    .ilike('title', `%${taskTitle}%`)
    .limit(1)

  if (error || !tasks || tasks.length === 0) {
    await botSendMessage(chatId, `I couldn't find a pending task matching "${taskTitle}". Use /tasks to see your tasks, then reply with /done to the task message.`)
    return
  }

  const task = tasks[0]

  await db()
    .from('tasks')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', task.id)

  await botSendMessage(chatId, `✅ **Task Completed!**\n\n"${task.title}" marked as done.`)

  // Notify the task creator if different person
  if (task.created_by !== user.id) {
    const { data: creator } = await db()
      .from('users')
      .select('telegram_chat_id, full_name')
      .eq('id', task.created_by)
      .single()

    const { data: completer } = await db()
      .from('users')
      .select('full_name')
      .eq('id', user.id)
      .single()

    const completerName = completer?.full_name || 'A family member'

    if (creator?.telegram_chat_id) {
      await botSendMessage(
        creator.telegram_chat_id,
        `✅ **Task Completed**\n\n"${task.title}" was marked as done by ${completerName}!`
      )
    }
  }
}
