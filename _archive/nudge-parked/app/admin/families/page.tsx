import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminFamiliesPage() {
  const supabase = createClient()

  // Fetch families with member counts
  const { data: families } = await supabase
    .from('families')
    .select('id, name, owner_id, invite_code, created_at, updated_at')
    .order('created_at', { ascending: false })
    .limit(100)

  // Get member counts for each family
  const familyIds = (families ?? []).map(f => f.id)
  const memberPromises = familyIds.map(async (fid) => {
    const { count } = await supabase
      .from('family_members')
      .select('*', { count: 'exact', head: true })
      .eq('family_id', fid)
    return { familyId: fid, count: count ?? 0 }
  })
  const memberCounts = await Promise.all(memberPromises)
  const memberMap = Object.fromEntries(memberCounts.map(m => [m.familyId, m.count]))

  // Get task counts per family
  const taskPromises = familyIds.map(async (fid) => {
    const { count } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('family_id', fid)
    return { familyId: fid, count: count ?? 0 }
  })
  const taskCounts = await Promise.all(taskPromises)
  const taskMap = Object.fromEntries(taskCounts.map(t => [t.familyId, t.count]))

  const { count: totalFamilies } = await supabase
    .from('families')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Families</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {totalFamilies ?? 0} total families
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {!families || families.length === 0 ? (
          <p className="p-6 text-sm text-gray-500 dark:text-gray-400">No families yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-center p-4 font-medium text-gray-500 dark:text-gray-400">Members</th>
                  <th className="text-center p-4 font-medium text-gray-500 dark:text-gray-400">Tasks</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Invite Code</th>
                  <th className="text-right p-4 font-medium text-gray-500 dark:text-gray-400">Created</th>
                </tr>
              </thead>
              <tbody>
                {families.map((family) => (
                  <tr key={family.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/30 last:border-0">
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {family.name}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold">
                        {memberMap[family.id] ?? 0}
                      </span>
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                      {taskMap[family.id] ?? 0}
                    </td>
                    <td className="p-4">
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 font-mono">
                        {family.invite_code}
                      </code>
                    </td>
                    <td className="p-4 text-right text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(family.created_at).toLocaleDateString()}
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
