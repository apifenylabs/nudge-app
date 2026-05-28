import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import TaskBoard from '@/components/dashboard/TaskBoard'
import FamilyMembers from '@/components/dashboard/FamilyMembers'
import QuickActions from '@/components/dashboard/QuickActions'
import StatsOverview from '@/components/dashboard/StatsOverview'
import DailyCheckin from '@/components/dashboard/DailyCheckin'
import BottomNav from '@/components/layout/BottomNav'
import DashboardTourWrapper from '@/components/onboarding/DashboardTourWrapper'
import SubscriptionBanner from '@/components/billing/SubscriptionBanner'
import UsageMeter from '@/components/billing/UsageMeter'
import ReferralBanner from '@/components/billing/ReferralBanner'
import TrialCountdown from '@/components/dashboard/TrialCountdown'
import DashboardContent from '@/components/dashboard/DashboardContent'

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('id, email, full_name, telegram_chat_id, telegram_username')
    .eq('id', user.id)
    .single()

  // Get user's family
  const { data: familyMemberships } = await supabase
    .from('family_members')
    .select('family_id')
    .eq('user_id', user.id)
    .limit(1)

  if (!familyMemberships || familyMemberships.length === 0) {
    redirect('/onboarding')
  }

  const familyId = familyMemberships[0].family_id

  // Fetch family data
  const { data: family } = await supabase
    .from('families')
    .select('*')
    .eq('id', familyId)
    .single()

  // Fetch tasks for the family
  const { data: tasks } = await supabase
    .from('tasks')
    .select(`
      *,
      created_by_user:users!tasks_created_by_fkey(full_name),
      assigned_to_user:users!tasks_assigned_to_fkey(full_name)
    `)
    .eq('family_id', familyId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  // Fetch family members
  const { data: members } = await supabase
    .from('family_members')
    .select(`
      user_id,
      role,
      users!inner (
        id,
        full_name,
        email,
        telegram_username
      )
    `)
    .eq('family_id', familyId)

  // Calculate stats
  const totalTasks = tasks?.length || 0
  const pendingTasks = tasks?.filter(t => t.status === 'pending').length || 0
  const completedTasks = tasks?.filter(t => t.status === 'completed').length || 0
  const urgentTasks = tasks?.filter(t => t.priority === 'urgent').length || 0

  // Get greeting based on time of day
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <DashboardContent>
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Mobile header */}
      <div className="md:hidden">
        <DashboardHeader
          user={{
            email: profile?.email || user.email,
            fullName: profile?.full_name || (user.user_metadata as any)?.full_name || null,
          }}
          greeting={greeting}
          taskCount={totalTasks}
          pendingCount={pendingTasks}
          userId={user.id}
        />
      </div>

      {/* Desktop header */}
      <div className="hidden md:block">
        <DashboardHeader
          user={{
            email: profile?.email || user.email,
            fullName: profile?.full_name || (user.user_metadata as any)?.full_name || null,
          }}
          greeting={greeting}
          taskCount={totalTasks}
          pendingCount={pendingTasks}
          userId={user.id}
        />
      </div>

      {/* Subscription status banner — shows trial, upgrade, or limit warnings */}
      <SubscriptionBanner userId={user.id} />

      {/* Trial ending countdown — shows when trial has ≤7 days remaining */}
      <TrialCountdown userId={user.id} />

      {/* Referral rewards banner — shows if user has pending rewards or no referrals */}
      <ReferralBanner userId={user.id} dismissible />

      {/* Usage meter — shows free users their task limit progress */}
      <div className="px-4 mt-2">
        <UsageMeter userId={user.id} dismissible compact />
      </div>

      {/* Stats - mobile optimized */}
      <StatsOverview
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
        totalTasks={totalTasks}
        urgentTasks={urgentTasks}
      />

      {/* Daily Check-in section */}
      <div className="px-4 mt-2">
        <div className="glass-card p-4 rounded-xl">
          <DailyCheckin userId={user.id} familyId={familyId} />
        </div>
      </div>

      {/* Quick add + task board */}
      <TaskBoard
        tasks={tasks || []}
        familyId={familyId}
        userId={user.id}
        familyName={family?.name}
        userName={profile?.full_name || (user.user_metadata as any)?.full_name || undefined}
        members={(members || []).map(m => {
          const u = Array.isArray(m.users) ? m.users[0] : m.users
          return { id: u?.id || '', name: u?.full_name || 'Family Member' }
        })}
      />

      {/* Desktop sidebar content */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuickActions
              familyId={familyId}
              userId={user.id}
              userName={profile?.full_name || (user.user_metadata as any)?.full_name || undefined}
              familyName={family?.name}
              telegramConnected={!!profile?.telegram_chat_id}
              members={(members || []).map(m => {
                const u = Array.isArray(m.users) ? m.users[0] : m.users
                return { id: u?.id || '', name: u?.full_name || 'Family Member' }
              })}
              onTaskCreated={() => {}}
            />
          </div>
          <div className="space-y-8">
            <FamilyMembers
              members={members?.map(m => {
                const user = Array.isArray(m.users) ? m.users[0] : m.users
                return {
                  id: user?.id || '',
                  name: user?.full_name || 'Family Member',
                  email: user?.email || '',
                  role: m.role,
                  telegramUsername: user?.telegram_username,
                  avatarUrl: undefined,
                }
              }) || []}
              familyId={familyId}
              userId={user.id}
            />
          </div>
        </div>
      </div>

      {/* Dashboard Tour - for first-time visitors */}
      <DashboardTourWrapper />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
    </DashboardContent>
  )
}
