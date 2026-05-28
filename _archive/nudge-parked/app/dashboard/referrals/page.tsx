import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ReferralsPageClient from './ReferralsPageClient'

export default async function ReferralsPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('users')
    .select('id, full_name')
    .eq('id', user.id)
    .single()

  return <ReferralsPageClient userId={user.id} userName={profile?.full_name || ''} />
}
