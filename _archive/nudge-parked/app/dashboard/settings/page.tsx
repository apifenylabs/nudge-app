import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SettingsPageClient from './SettingsPageClient'

export default async function SettingsPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Get user profile
  const { data: profile } = await supabase
    .from('users')
    .select('id, email, full_name, telegram_chat_id, telegram_username')
    .eq('id', user.id)
    .single()

  // Get family info
  const { data: membership } = await supabase
    .from('family_members')
    .select('family_id, role')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  return (
    <SettingsPageClient
      user={{
        id: user.id,
        email: profile?.email || user.email || '',
        fullName: profile?.full_name || null,
        telegramUsername: profile?.telegram_username || null,
        telegramConnected: !!profile?.telegram_chat_id,
      }}
      familyMembership={membership ? {
        familyId: membership.family_id,
        role: membership.role,
      } : null}
    />
  )
}
