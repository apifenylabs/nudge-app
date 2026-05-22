import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import StatsPageClient from './StatsPageClient'

export default async function StatsPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Verify user is in a family
  const { data: membership } = await supabase
    .from('family_members')
    .select('family_id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (!membership) redirect('/onboarding')

  return <StatsPageClient />
}
