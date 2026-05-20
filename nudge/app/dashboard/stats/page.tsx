import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import StatsPageClient from './StatsPageClient'

export default async function StatsPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Get family
  const { data: membership } = await supabase
    .from('family_members')
    .select('family_id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (!membership) redirect('/onboarding')

  // Get tasks for stats
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('family_id', membership.family_id)
    .order('created_at', { ascending: false })

  return <StatsPageClient tasks={tasks || []} />
}
