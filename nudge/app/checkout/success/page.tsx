import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import CheckoutSuccessClient from './CheckoutSuccessClient'

export const metadata = {
  title: 'Welcome to Nudge Pro — Setup Complete',
  description: 'Your subscription is active. Set up your family for success.',
}

export default async function CheckoutSuccessPage() {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  // Not logged in — redirect to signup
  if (authError || !user) {
    redirect('/auth/signup')
  }

  // Look up their subscription status
  const { data: membership } = await supabase
    .from('family_members')
    .select('family_id, role')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  let plan: string | null = null
  let familyId: string | null = null
  let isOwner = false

  if (membership) {
    familyId = membership.family_id
    isOwner = membership.role === 'owner'
    const adminDb = createAdminClient()
    const { data: sub } = await adminDb
      .from('subscriptions')
      .select('plan')
      .eq('family_id', membership.family_id)
      .single()
    if (sub) plan = sub.plan
  }

  return (
    <CheckoutSuccessClient
      plan={plan || 'free'}
      familyId={familyId}
      isOwner={isOwner}
      userName={user.user_metadata?.full_name || user.email?.split('@')[0] || ''}
    />
  )
}
