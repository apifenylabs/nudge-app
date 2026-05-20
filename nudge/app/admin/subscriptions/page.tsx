import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

const statusBadge = (status: string) => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    trialing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    past_due: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    canceled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    incomplete: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    incomplete_expired: 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400',
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

interface SubscriptionRow {
  id: string
  family_id: string
  plan: string
  status: string
  current_period_start: string | null
  current_period_end: string | null
  trial_ends_at: string | null
  cancel_at_period_end: boolean
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  family_name?: string
  owner_email?: string
  owner_name?: string
}

export default async function SubscriptionsAdminPage() {
  const adminDb = createAdminClient()

  // Fetch subscriptions with family + owner info
  const { data: rawSubs } = await adminDb
    .from('subscriptions')
    .select(`
      *,
      families!inner (
        id,
        name,
        owner_id,
        users!families_owner_id_fkey (
          email,
          full_name
        )
      )
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  // Count stats
  const { count: activeCount } = await adminDb
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  const { count: trialingCount } = await adminDb
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'trialing')

  const { count: pastDueCount } = await adminDb
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'past_due')

  const { count: canceledCount } = await adminDb
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'canceled')

  // Map to clean display format
  const subscriptions: SubscriptionRow[] = (rawSubs || []).map((sub: any) => {
    const family = Array.isArray(sub.families) ? sub.families[0] : sub.families
    const owner = family?.users
      ? (Array.isArray(family.users) ? family.users[0] : family.users)
      : null
    return {
      id: sub.id,
      family_id: sub.family_id,
      plan: sub.plan,
      status: sub.status,
      current_period_start: sub.current_period_start,
      current_period_end: sub.current_period_end,
      trial_ends_at: sub.trial_ends_at,
      cancel_at_period_end: sub.cancel_at_period_end,
      stripe_subscription_id: sub.stripe_subscription_id,
      stripe_customer_id: sub.stripe_customer_id,
      family_name: family?.name || 'Unknown',
      owner_email: owner?.email || '—',
      owner_name: owner?.full_name || '—',
    }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscriptions</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Stripe subscription management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{activeCount ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Trialing</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{trialingCount ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Past Due</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{pastDueCount ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Canceled</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">{canceledCount ?? 0}</p>
        </div>
      </div>

      {/* Subscription Count by Plan */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Plan Distribution</h2>
        <PlanChart adminDb={adminDb} />
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">All Subscriptions</h2>
        </div>
        {subscriptions.length === 0 ? (
          <p className="p-6 text-sm text-gray-500 dark:text-gray-400">No subscriptions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Family</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Owner</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Plan</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Period Start</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Period End</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Cancel at End</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {sub.family_name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">ID: {sub.family_id.slice(0, 8)}...</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {sub.owner_name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{sub.owner_email}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-white capitalize">{sub.plan}</span>
                    </td>
                    <td className="p-4">{statusBadge(sub.status)}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{formatDate(sub.current_period_start)}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{formatDate(sub.current_period_end)}</td>
                    <td className="p-4 hidden lg:table-cell">
                      {sub.cancel_at_period_end ? (
                        <span className="text-xs font-medium text-red-500">Yes</span>
                      ) : (
                        <span className="text-xs text-gray-400">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="https://dashboard.stripe.com/subscriptions"
          target="_blank"
          className="block p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
        >
          <p className="font-medium text-gray-900 dark:text-white">Stripe Dashboard →</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage subscriptions, refunds, and invoices</p>
        </Link>
        <Link
          href="https://dashboard.stripe.com/products"
          target="_blank"
          className="block p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
        >
          <p className="font-medium text-gray-900 dark:text-white">Stripe Products →</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Edit pricing plans and product config</p>
        </Link>
      </div>
    </div>
  )
}

/** Inline plan distribution chart rendered server-side */
async function PlanChart({ adminDb }: { adminDb: any }) {
  const plans = ['free', 'pro', 'family']
  const counts: { plan: string; count: number; color: string }[] = []

  for (const plan of plans) {
    const { count } = await adminDb
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('plan', plan)
    const total = count || 0
    const colors: Record<string, string> = {
      free: 'bg-gray-200 dark:bg-gray-700',
      pro: 'bg-indigo-500',
      family: 'bg-purple-500',
    }
    counts.push({ plan, count: total, color: colors[plan] || 'bg-gray-400' })
  }

  const total = counts.reduce((sum, c) => sum + c.count, 0) || 1

  return (
    <div className="space-y-3">
      <div className="flex h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {counts.map((c) => (
          <div
            key={c.plan}
            className={`${c.color} transition-all duration-500`}
            style={{ width: `${(c.count / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        {counts.map((c) => (
          <div key={c.plan} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
            <span className="text-gray-600 dark:text-gray-400 capitalize">{c.plan}</span>
            <span className="font-semibold text-gray-900 dark:text-white">{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
