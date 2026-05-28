import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getFamilyPlan } from '@/lib/plans'
import FamilyPageClient from './FamilyPageClient'

export default async function FamilyPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: membership } = await supabase
    .from('family_members')
    .select('family_id, role')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (!membership) redirect('/onboarding')

  const { data: family } = await supabase
    .from('families')
    .select('*')
    .eq('id', membership.family_id)
    .single()

  const { data: members } = await supabase
    .from('family_members')
    .select(`
      user_id,
      role,
      joined_at,
      users!inner (
        id,
        full_name,
        email,
        telegram_username
      )
    `)
    .eq('family_id', membership.family_id)

  const { data: tasks } = await supabase
    .from('tasks')
    .select('assigned_to, status')
    .eq('family_id', membership.family_id)

  const plan = await getFamilyPlan(membership.family_id)

  return (
    <FamilyPageClient
      family={family ? { id: family.id, name: family.name, inviteCode: family.invite_code } : null}
      currentUserId={user.id}
      currentRole={membership.role}
      members={members?.map(m => {
        const u = Array.isArray(m.users) ? m.users[0] : m.users
        return {
          id: u?.id || '',
          name: u?.full_name || 'Unknown',
          email: u?.email || '',
          role: m.role,
          telegramUsername: u?.telegram_username || null,
        }
      }) || []}
      tasks={tasks || []}
      currentPlan={plan}
    />
  )
}
