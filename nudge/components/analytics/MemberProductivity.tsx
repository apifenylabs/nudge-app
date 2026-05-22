'use client'

import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import { Users, CheckCircle, Clock, TrendingUp } from 'lucide-react'

interface MemberData {
  userId: string
  name: string
  completed: number
  pending: number
  overdue: number
  thisWeek: number
  role: string
  completionRate: number
}

interface MemberProductivityProps {
  data: MemberData[]
}

/**
 * Horizontal bar chart showing tasks completed per member.
 * Sorted by completion count descending.
 */
export default function MemberProductivity({ data }: MemberProductivityProps) {
  const chartData = useMemo(() => {
    return data.map(m => ({
      name: m.name.split(' ')[0], // First name only for compact chart
      completed: m.completed,
      pending: m.pending,
      overdue: m.overdue,
      completionRate: m.completionRate,
    }))
  }, [data])

  const totalCompleted = useMemo(
    () => data.reduce((s, m) => s + m.completed, 0),
    [data]
  )

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No members yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
          <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{totalCompleted}</div>
          <div className="text-[10px] text-muted-foreground">Total done</div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
          <Users className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{data.length}</div>
          <div className="text-[10px] text-muted-foreground">Members</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
          <TrendingUp className="w-4 h-4 text-amber-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">
            {data.reduce((s, m) => s + m.thisWeek, 0)}
          </div>
          <div className="text-[10px] text-muted-foreground">This week</div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              width={60}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: '12px',
              }}
              formatter={(value: any, name: any) => [
                value,
                name === 'completed' ? 'Completed' : name === 'pending' ? 'Pending' : 'Overdue',
              ]}
            />
            <Bar
              dataKey="completed"
              fill="#6366f1"
              radius={[0, 4, 4, 0]}
              barSize={14}
              name="completed"
            />
            <Bar
              dataKey="pending"
              fill="#93c5fd"
              radius={[0, 4, 4, 0]}
              barSize={14}
              name="pending"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Simple member list */}
      <div className="space-y-1.5">
        {data.map((m, i) => (
          <div
            key={m.userId}
            className="flex items-center justify-between px-3 py-2 bg-secondary/30 rounded-lg"
          >
            <div className="flex items-center gap-2">
              {i === 0 && <span className="text-sm">🥇</span>}
              {i === 1 && <span className="text-sm">🥈</span>}
              {i === 2 && <span className="text-sm">🥉</span>}
              <span className="text-sm font-medium text-foreground">
                {m.name}
              </span>
              {m.role === 'owner' && (
                <span className="text-[10px] text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded-full font-medium">
                  Owner
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="text-emerald-600 font-medium">{m.completed} done</span>
              <span>{m.completionRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
