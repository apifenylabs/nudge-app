'use client'

import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface TimeBucket {
  label: string
  start: number
  end: number
  count: number
}

interface TimeOfDayAnalysisProps {
  data: TimeBucket[]
}

const COLORS = ['#fbbf24', '#60a5fa', '#a78bfa', '#fb923c']

/**
 * Shows when the family is most productive — time-of-day distribution.
 */
export default function TimeOfDayAnalysis({ data }: TimeOfDayAnalysisProps) {
  const total = useMemo(() => data.reduce((s, b) => s + b.count, 0), [data])

  if (total === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        Complete tasks at different times to see your peak productivity hours!
      </div>
    )
  }

  const topBucket = [...data].sort((a, b) => b.count - a.count)[0]

  return (
    <div className="space-y-3">
      {/* Best time badge */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-3 text-center">
        <p className="text-[11px] text-muted-foreground">Most productive time</p>
        <p className="text-sm font-bold text-foreground">{topBucket?.label || 'N/A'}</p>
        {topBucket && (
          <p className="text-[10px] text-muted-foreground">
            {Math.round((topBucket.count / total) * 100)}% of all completions
          </p>
        )}
      </div>

      {/* Pie chart */}
      <div className="h-32 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={48}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '11px',
              }}
              formatter={(value: any) => [`${value} tasks`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-1.5">
        {data.map((bucket, i) => {
          const pct = total > 0 ? Math.round((bucket.count / total) * 100) : 0
          return (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-muted-foreground truncate">{bucket.label}</span>
              <span className="text-foreground font-medium ml-auto">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
