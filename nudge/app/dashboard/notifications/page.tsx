import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import NotificationHistoryClient from './NotificationHistoryClient'
import BottomNav from '@/components/layout/BottomNav'

export const dynamic = 'force-dynamic'

export default async function NotificationsPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Fetch user profile
  const { data: profile } = await supabase
    .from('users')
    .select('id, email, full_name')
    .eq('id', user.id)
    .single()

  // Fetch notifications from the DB for initial render
  const adminDb = createAdminClient()
  const { data: notifications, error } = await adminDb
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error && (error.message?.includes('does not exist') || error.code === '42P01')) {
    // Table doesn't exist yet — return empty
    return (
      <NotificationHistoryPageShell userName={profile?.full_name || user.email || ''}>
        <NotificationHistoryClient
          userId={user.id}
          initialNotifications={[]}
          totalCount={0}
        />
      </NotificationHistoryPageShell>
    )
  }

  // Counts for the summary
  const unreadCount = notifications?.filter(n => !n.read).length || 0
  const totalCount = notifications?.length || 0

  return (
    <NotificationHistoryPageShell userName={profile?.full_name || user.email || ''}>
      <NotificationHistoryClient
        userId={user.id}
        initialNotifications={notifications || []}
        totalCount={totalCount}
        initialUnreadCount={unreadCount}
      />
    </NotificationHistoryPageShell>
  )
}

// Shell wrapper for the page structure
function NotificationHistoryPageShell({
  userName,
  children,
}: {
  userName: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {children}
    </div>
  )
}
