import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import SharePageClient from './SharePageClient'

interface Props {
  params: { taskId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data: task } = await supabase
    .from('tasks')
    .select('title')
    .eq('id', params.taskId)
    .single()

  if (!task) {
    return { title: 'Task Not Found - Nudge' }
  }

  return {
    title: `${task.title} - Completed on Nudge`,
    description: `View a completed task on Nudge — the family task manager`,
    openGraph: {
      title: `${task.title} ✅`,
      description: 'Completed on Nudge — family task management made simple',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${task.title} ✅`,
      description: 'Completed on Nudge — family task management made simple',
    },
  }
}

export default async function ShareTaskPage({ params }: Props) {
  const supabase = createClient()

  const { data: task } = await supabase
    .from('tasks')
    .select(`
      *,
      created_by_user:users!tasks_created_by_fkey(full_name),
      assigned_to_user:users!tasks_assigned_to_fkey(full_name),
      family:families!tasks_family_id_fkey(name)
    `)
    .eq('id', params.taskId)
    .single()

  if (!task) {
    notFound()
  }

  // Fetch completed_by user (if different from created_by)
  let completedByUser: { full_name?: string } | null = null
  if (task.completed_by) {
    const { data } = await supabase
      .from('users')
      .select('full_name')
      .eq('id', task.completed_by)
      .single()
    completedByUser = data
  }

  const taskData = {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    created_by: task.created_by,
    completed_by: task.completed_by,
    completed_at: task.completed_at,
    assigned_to: task.assigned_to,
    assigneeName: task.assigned_to_user?.full_name || null,
    creatorName: task.created_by_user?.full_name || 'Someone',
    completedByName: completedByUser?.full_name || task.created_by_user?.full_name || 'Someone',
    familyName: task.family?.name || 'My Family',
  }

  return <SharePageClient task={taskData} />
}
