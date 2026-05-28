// Type definitions for Supabase tables
// TODO: Generate proper types with: npx supabase gen types typescript --project-id <project-id> > lib/supabase/types.ts

export interface User {
  id: string
  email: string
  full_name: string | null
  telegram_username: string | null
  telegram_chat_id: number | null
  created_at: string
  updated_at: string
}

export interface Family {
  id: string
  name: string
  owner_id: string
  invite_code: string
  created_at: string
  updated_at: string
}

export interface FamilyMember {
  id: string
  family_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  joined_at: string
}

export interface Task {
  id: string
  family_id: string
  created_by: string
  assigned_to: string | null
  title: string
  description: string | null
  category: string | null
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  is_recurring: boolean
  recurrence_pattern: 'daily' | 'weekly' | 'biweekly' | 'monthly' | null
  recurrence_config: {
    days_of_week?: string[]
    day_of_month?: number
  } | null
  due_date: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface TelegramMessage {
  id: string
  chat_id: number
  message_id: number
  user_id: string | null
  message_text: string
  parsed_task_id: string | null
  is_bot_response: boolean
  nlp_used: boolean | null
  parsed_data: any | null
  created_at: string
}

export interface PendingTask {
  id: string
  user_id: string
  family_id: string
  original_message: string
  parsed_data: any
  missing_info: string[]
  chat_id: number
  created_at: string
}
