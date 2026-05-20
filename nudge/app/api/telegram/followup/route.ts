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
    
    if (update.message) {
      await handleFollowUpMessage(update.message)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Follow-up handler error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleFollowUpMessage(message: any) {
  const chatId = message.chat.id
  const text = message.text || ''

  // Check if there's a pending task for this chat
  const { data: pendingTasks } = await db()
    .from('pending_tasks')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: false })
    .limit(1)

  if (!pendingTasks || pendingTasks.length === 0) {
    await sendMessage(chatId, "I don't have a pending task to update. Send me a new task instead!")
    return
  }

  const pendingTask = pendingTasks[0]
  
  // Check if user matches
  const { data: user } = await db()
    .from('users')
    .select('*')
    .eq('telegram_chat_id', chatId)
    .single()

  if (!user || user.id !== pendingTask.user_id) {
    await sendMessage(chatId, "This doesn't seem to be your pending task. Please start a new one.")
    return
  }

  // Check if expired
  if (new Date(pendingTask.expires_at) < new Date()) {
    await db().from('pending_tasks').delete().eq('id', pendingTask.id)
    await sendMessage(chatId, "Sorry, that pending task has expired. Please send the task again.")
    return
  }

  // Parse the follow-up response
  await processFollowUpResponse(pendingTask, text, chatId)
}

async function processFollowUpResponse(
  pendingTask: any,
  response: string,
  chatId: number
) {
  const parsedData = pendingTask.parsed_data
  const missingInfo = pendingTask.missing_info
  
  try {
    const updatedData = await updateParsedData(parsedData, missingInfo, response, pendingTask.user_id, pendingTask.family_id)
    const stillMissing = checkMissingInfo(updatedData, missingInfo)
    
    if (stillMissing.length > 0) {
      const question = await nlpParser.askClarifyingQuestion(
        pendingTask.original_message,
        pendingTask.user_id,
        pendingTask.family_id,
        stillMissing
      )
      
      await db()
        .from('pending_tasks')
        .update({
          parsed_data: updatedData,
          missing_info: stillMissing,
          follow_up_count: pendingTask.follow_up_count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', pendingTask.id)
      
      await sendMessage(chatId, `🤔 ${question}`)
      return
    }
    
    // All info collected, create task
    // Check plan limit before creating
    const { checkDailyTaskLimit } = await import('@/lib/plans')
    const limitCheck = await checkDailyTaskLimit(pendingTask.user_id)
    if (!limitCheck.allowed) {
      await sendMessage(
        chatId,
        `⚠️ **Task Limit Reached**\n\n${limitCheck.message}\n\n` +
        `You've created ${limitCheck.tasksToday} task${limitCheck.tasksToday !== 1 ? 's' : ''} today. ` +
        `Your plan allows ${limitCheck.maxTasks === -1 ? 'unlimited' : limitCheck.maxTasks} per day.\n\n` +
        `Upgrade to Pro for unlimited tasks: ${buildAppUrl('/pricing')}`
      )
      await db().from('pending_tasks').delete().eq('id', pendingTask.id)
      return
    }

    const { data: task, error } = await db()
      .from('tasks')
      .insert({
        family_id: pendingTask.family_id,
        created_by: pendingTask.user_id,
        title: updatedData.title,
        description: updatedData.description || `Created via Telegram: "${pendingTask.original_message}"`,
        assigned_to: updatedData.assigned_to,
        due_date: updatedData.due_date,
        status: 'pending',
        priority: updatedData.priority,
        category: updatedData.category,
        is_recurring: updatedData.is_recurring,
        recurrence_pattern: updatedData.recurrence_pattern,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating task from follow-up:', error)
      await sendMessage(chatId, "Sorry, I couldn't create that task. Please try again.")
      return
    }

    let confirmation = `✅ **Task Created**\n\n`
    confirmation += `**${updatedData.title}**\n\n`
    
    if (updatedData.assigned_to) {
      const { data: assignedUser } = await db()
        .from('users')
        .select('full_name')
        .eq('id', updatedData.assigned_to)
        .single()
      
      if (assignedUser) {
        confirmation += `Assigned to: ${assignedUser.full_name || 'Family Member'}\n`
      }
    }
    
    if (updatedData.due_date) {
      const dueDate = new Date(updatedData.due_date)
      const formattedDate = dueDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      confirmation += `Due: ${formattedDate}\n`
    }
    
    confirmation += `Priority: ${updatedData.priority.charAt(0).toUpperCase() + updatedData.priority.slice(1)}\n`
    
    if (updatedData.category) {
      confirmation += `Category: ${updatedData.category.charAt(0).toUpperCase() + updatedData.category.slice(1)}\n`
    }
    
    if (updatedData.is_recurring && updatedData.recurrence_pattern) {
      confirmation += `Repeats: ${updatedData.recurrence_pattern.charAt(0).toUpperCase() + updatedData.recurrence_pattern.slice(1)}\n`
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

    await sendMessage(chatId, confirmation)

    await db().from('telegram_messages').insert({
      chat_id: chatId,
      message_id: 0,
      user_id: pendingTask.user_id,
      message_text: `${pendingTask.original_message} [Follow-up: ${response}]`,
      parsed_task_id: task.id,
      is_bot_response: false,
      nlp_used: true,
      parsed_data: updatedData,
    })

    await db().from('pending_tasks').delete().eq('id', pendingTask.id)
    
  } catch (error) {
    console.error('Follow-up processing error:', error)
    await sendMessage(chatId, "I had trouble processing that. Let's try again - please send the complete task in one message.")
    await db().from('pending_tasks').delete().eq('id', pendingTask.id)
  }
}

async function updateParsedData(
  parsedData: any,
  missingInfo: string[],
  response: string,
  userId: string,
  familyId: string
): Promise<any> {
  const updatedData = { ...parsedData }
  const lowerResponse = response.toLowerCase()
  
  for (const info of missingInfo) {
    switch (info) {
      case 'assigned_to':
        const { data: familyMembers } = await db()
          .from('family_members')
          .select(`
            user_id,
            users!inner (
              id,
              full_name,
              telegram_username
            )
          `)
          .eq('family_id', familyId)
        
        if (familyMembers) {
          for (const member of familyMembers) {
            const user = Array.isArray(member.users) ? member.users[0] : member.users
            if (user?.full_name && lowerResponse.includes((user.full_name || '').toLowerCase())) {
              updatedData.assigned_to = user.id
              break
            }
            if (user?.telegram_username && lowerResponse.includes(user.telegram_username.toLowerCase())) {
              updatedData.assigned_to = user.id
              break
            }
          }
          
          if (!updatedData.assigned_to && (lowerResponse.includes('me') || lowerResponse.includes('i'))) {
            updatedData.assigned_to = userId
          }
        }
        break
        
      case 'due_date':
        const today = new Date()
        
        if (lowerResponse.includes('today') || lowerResponse.includes('tonight')) {
          updatedData.due_date = today.toISOString()
        } else if (lowerResponse.includes('tomorrow')) {
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          updatedData.due_date = tomorrow.toISOString()
        } else if (lowerResponse.includes('this weekend')) {
          const saturday = new Date(today)
          const dayOfWeek = saturday.getDay()
          const daysUntilSaturday = (6 - dayOfWeek + 7) % 7
          saturday.setDate(saturday.getDate() + daysUntilSaturday)
          updatedData.due_date = saturday.toISOString()
        } else if (lowerResponse.includes('next week')) {
          const nextWeek = new Date(today)
          nextWeek.setDate(nextWeek.getDate() + 7)
          updatedData.due_date = nextWeek.toISOString()
        }
        break
        
      case 'priority':
        if (lowerResponse.includes('urgent') || lowerResponse.includes('asap')) {
          updatedData.priority = 'urgent'
        } else if (lowerResponse.includes('high') || lowerResponse.includes('important')) {
          updatedData.priority = 'high'
        } else if (lowerResponse.includes('low') || lowerResponse.includes('whenever')) {
          updatedData.priority = 'low'
        } else {
          updatedData.priority = 'medium'
        }
        break
        
      case 'recurrence':
        if (lowerResponse.includes('every day') || lowerResponse.includes('daily')) {
          updatedData.is_recurring = true
          updatedData.recurrence_pattern = 'daily'
        } else if (lowerResponse.includes('every week') || lowerResponse.includes('weekly')) {
          updatedData.is_recurring = true
          updatedData.recurrence_pattern = 'weekly'
        } else if (lowerResponse.includes('every month') || lowerResponse.includes('monthly')) {
          updatedData.is_recurring = true
          updatedData.recurrence_pattern = 'monthly'
        }
        break
    }
  }
  
  return updatedData
}

function checkMissingInfo(parsedData: any, originalMissing: string[]): string[] {
  const stillMissing: string[] = []
  
  for (const info of originalMissing) {
    switch (info) {
      case 'assigned_to':
        if (!parsedData.assigned_to) stillMissing.push('assigned_to')
        break
      case 'due_date':
        if (!parsedData.due_date) stillMissing.push('due_date')
        break
      case 'priority':
        if (!parsedData.priority) stillMissing.push('priority')
        break
      case 'recurrence':
        if (parsedData.is_recurring && !parsedData.recurrence_pattern) {
          stillMissing.push('recurrence')
        }
        break
    }
  }
  
  return stillMissing
}

async function sendMessage(chatId: number, text: string) {
  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown',
    }),
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
