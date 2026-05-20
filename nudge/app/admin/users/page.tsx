import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const supabase = createClient()

  const { data: users } = await supabase
    .from('users')
    .select('id, email, full_name, telegram_username, telegram_chat_id, created_at, updated_at')
    .order('created_at', { ascending: false })
    .limit(100)

  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  // Count users connected via Telegram
  const telegramConnected = users?.filter(u => u.telegram_chat_id).length ?? 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {totalUsers ?? 0} total · {telegramConnected} Telegram connected
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {!users || users.length === 0 ? (
          <p className="p-6 text-sm text-gray-500 dark:text-gray-400">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Telegram</th>
                  <th className="text-right p-4 font-medium text-gray-500 dark:text-gray-400">Joined</th>
                  <th className="text-right p-4 font-medium text-gray-500 dark:text-gray-400">Activity</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/30 last:border-0">
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {user.full_name || '—'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="p-4">
                      {user.telegram_username ? (
                        <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
                          <span className="text-xs">✈️</span>
                          @{user.telegram_username}
                        </span>
                      ) : user.telegram_chat_id ? (
                        <span className="text-xs text-gray-400">Chat connected</span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="p-4 text-right text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(user.updated_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
