import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CheckoutCancelClient from './CheckoutCancelClient'

export const metadata = {
  title: 'Checkout Canceled — Nudge',
  description: 'Your checkout was canceled. Come back anytime to upgrade.',
}

export default async function CheckoutCancelPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <CheckoutCancelClient isLoggedIn={!!user} />
}
