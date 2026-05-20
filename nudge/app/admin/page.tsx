import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface StatCard {
  label: string
  value: string | number
  sub: string
  href: string
}

function StatCard({ label, value, sub, href }: StatCard) {
  return (
    <Link href={href} className="block">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{sub}</p>
      </div>
    </Link>
  )
}

export default async function AdminOverviewPage() {
  const supabase = createClient()

  // Fetch stats in parallel
  const [
    { count: userCount },
    { count: familyCount },
    { count: taskCount },
    { count: pendingTaskCount },
    { count: paidFamilyCount },
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('families').select('*', { count: 'exact', head: true }),
    supabase.from('tasks').select('*', { count: 'exact', head: true }),
    supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }),
  ])

  // Get recent users
  const { data: recentUsers } = await supabase
    .from('users')
    .select('id, email, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get recent families
  const { data: recentFamilies } = await supabase
    .from('families')
    .select('id, name, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">System-wide statistics and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Total Users"
          value={userCount ?? 0}
          sub="Registered accounts"
          href="/admin/users"
        />
        <StatCard
          label="Families"
          value={familyCount ?? 0}
          sub={`${paidFamilyCount ?? 0} paid subscriptions`}
          href="/admin/families"
        />
        <StatCard
          label="Tasks"
          value={taskCount ?? 0}
          sub={`${pendingTaskCount ?? 0} pending`}
          href="/admin/families"
        />
      </div>

      {/* Recent Users */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</h2>
          <Link
            href="/admin/users"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            View all →
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {!recentUsers || recentUsers.length === 0 ? (
            <p className="p-6 text-sm text-gray-500 dark:text-gray-400">No users yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="text-right p-4 font-medium text-gray-500 dark:text-gray-400">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <td className="p-4 text-gray-900 dark:text-white font-medium">
                      {user.full_name || '—'}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="p-4 text-right text-gray-500 dark:text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Recent Families */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Families</h2>
          <Link
            href="/admin/families"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            View all →
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {!recentFamilies || recentFamilies.length === 0 ? (
            <p className="p-6 text-sm text-gray-500 dark:text-gray-400">No families yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-right p-4 font-medium text-gray-500 dark:text-gray-400">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentFamilies.map((family) => (
                  <tr key={family.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <td className="p-4 text-gray-900 dark:text-white font-medium">
                      {family.name}
                    </td>
                    <td className="p-4 text-right text-gray-500 dark:text-gray-400">
                      {new Date(family.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
