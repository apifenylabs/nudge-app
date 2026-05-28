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
    .select('title, description, status')
    .eq('id', params.taskId)
    .single()

  if (!task) {
    return { title: 'Task Not Found - Nudge' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'
  const ogImageUrl = `${baseUrl}/api/share/og?taskId=${encodeURIComponent(params.taskId)}`
  const taskTitle = task.title
  const description = task.description || `A completed task on Nudge — family task management`

  return {
    title: `${taskTitle} ✅ - Completed on Nudge`,
    description,
    openGraph: {
      title: `${taskTitle} ✅`,
      description,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${taskTitle} - Completed on Nudge`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${taskTitle} ✅`,
      description,
      images: [ogImageUrl],
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
    assigneeName: assignedToUser?.full_name || null,
    creatorName: createdByUser?.full_name || 'Someone',
    completedByName: completedByUser?.full_name || createdByUser?.full_name || 'Someone',
    familyName: familyInfo?.name || 'My Family',
  }

  return <SharePageClient task={taskData} />
}
