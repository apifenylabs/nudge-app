import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TaskDetailClient from './TaskDetailClient'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { id: string }
}

export default async function TaskDetailPage({ params }: PageProps) {
  const { id } = params
  if (!id) redirect('/dashboard')

  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?redirect=/dashboard/tasks/' + encodeURIComponent(id))

  // Fetch task + assignee + creator + family
  const { data: task, error } = await supabase
    .from('tasks')
    .select(`
      id, title, description, status, priority,
      due_date, created_at, completed_at,
      recurrence, recurrence_pattern, recurrence_config,
      assigned_to, created_by, family_id
    `)
    .eq('id', id)
    .single()

  if (error || !task) notFound()

  // Verify access — user must be assigned, creator, or in the same family
  if (task.assigned_to !== user.id && task.created_by !== user.id) {
    // Check family membership
    if (task.family_id) {
      const { data: membership } = await supabase
        .from('family_members')
        .select('id')
        .eq('family_id', task.family_id)
        .eq('user_id', user.id)
        .single()

      if (!membership) redirect('/dashboard')
    } else {
      redirect('/dashboard')
    }
  }

  // Fetch related users and family
  const [assigneeResult, creatorResult, familyResult] = await Promise.all([
    task.assigned_to
      ? supabase.from('users').select('id, full_name, email').eq('id', task.assigned_to).single()
      : Promise.resolve({ data: null }),
    task.created_by
      ? supabase.from('users').select('id, full_name, email').eq('id', task.created_by).single()
      : Promise.resolve({ data: null }),
    task.family_id
      ? supabase.from('families').select('id, name').eq('id', task.family_id).single()
      : Promise.resolve({ data: null }),
  ])

  return (
    <TaskDetailClient
      task={{
        id: task.id,
        title: task.title,
        description: task.description || null,
        status: task.status,
        priority: task.priority,
        dueDate: task.due_date || null,
        createdAt: task.created_at,
        completedAt: task.completed_at || null,
        recurrence: task.recurrence || task.recurrence_pattern || null,
        assignedTo: task.assigned_to || null,
        createdBy: task.created_by || null,
        familyId: task.family_id || null,
      }}
      assignee={assigneeResult.data ? {
        id: assigneeResult.data.id,
        name: assigneeResult.data.full_name || assigneeResult.data.email || 'Unknown',
      } : null}
      creator={creatorResult.data ? {
        id: creatorResult.data.id,
        name: creatorResult.data.full_name || creatorResult.data.email || 'Unknown',
      } : null}
      family={familyResult.data ? {
        id: familyResult.data.id,
        name: familyResult.data.name,
      } : null}
      currentUserId={user.id}
    />
  )
}
