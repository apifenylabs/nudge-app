'use client'

import { useMemo, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line, AreaChart, Area,
} from 'recharts'
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react'

interface TrendDataPoint {
  date: string
  count: number
  dayLabel: string
}

interface CompletionTrendsProps {
  data: TrendDataPoint[]
}

type ViewMode = 'bar' | 'line' | 'area'

/**
 * Completion trends over the last 30 days.
 * Supports bar, line, and area chart views.
 */
export default function CompletionTrends({ data }: CompletionTrendsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('bar')

  const { total, avg, best, bestDay } = useMemo(() => {
    const total = data.reduce((s, d) => s + d.count, 0)
    const avg = Math.round((total / data.length) * 10) / 10
    const best = Math.max(...data.map(d => d.count), 0)
    const bestDay = data.find(d => d.count === best)?.dayLabel || 'N/A'
    return { total, avg, best, bestDay }
  }, [data])

  // Last 7 days trend
  const last7Avg = useMemo(() => {
    const last7 = data.slice(-7)
    return Math.round((last7.reduce((s, d) => s + d.count, 0) / 7) * 10) / 10
  }, [data])

  const chartData = useMemo(
    () => data.map(d => ({ ...d, shortDate: d.date.slice(5) })),
    [data]
  )

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No completion data yet. Complete some tasks to see trends!
      </div>
    )
  }

  const renderChart = () => {
    switch (viewMode) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: -20, right: 5, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f5" />
              <XAxis
                dataKey="shortDate"
                tick={{ fontSize: 9, fill: '#9ca3af' }}
                interval="preserveStartEnd"
                ticks={[chartData[0]?.shortDate, chartData[Math.floor(chartData.length / 2)]?.shortDate, chartData[chartData.length - 1]?.shortDate]}
              />
              <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
                labelFormatter={(label) => {
                  const pt = chartData.find(d => d.shortDate === label)
                  return pt?.dayLabel || label
                }}
                formatter={(value) => [`${value} tasks`, 'Completed']}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 3, fill: '#6366f1' }}
                activeDot={{ r: 5, fill: '#4f46e5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: -20, right: 5, top: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f5" />
              <XAxis
                dataKey="shortDate"
                tick={{ fontSize: 9, fill: '#9ca3af' }}
                interval="preserveStartEnd"
                ticks={[chartData[0]?.shortDate, chartData[Math.floor(chartData.length / 2)]?.shortDate, chartData[chartData.length - 1]?.shortDate]}
              />
              <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
                labelFormatter={(label) => {
                  const pt = chartData.find(d => d.shortDate === label)
                  return pt?.dayLabel || label
                }}
                formatter={(value) => [`${value} tasks`, 'Completed']}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#completionGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      default: // bar
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: -20, right: 5, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f5" vertical={false} />
              <XAxis
                dataKey="shortDate"
                tick={{ fontSize: 9, fill: '#9ca3af' }}
                interval="preserveStartEnd"
                ticks={[chartData[0]?.shortDate, chartData[Math.floor(chartData.length / 2)]?.shortDate, chartData[chartData.length - 1]?.shortDate]}
              />
              <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
                labelFormatter={(label) => {
                  const pt = chartData.find(d => d.shortDate === label)
                  return pt?.dayLabel || label
                }}
                formatter={(value) => [`${value} tasks`, 'Completed']}
              />
              <Bar
                dataKey="count"
                fill="#6366f1"
                radius={[3, 3, 0, 0]}
                maxBarSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <div className="space-y-3">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-foreground">{total}</div>
          <div className="text-[9px] text-muted-foreground">Total</div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-foreground">{avg}</div>
          <div className="text-[9px] text-muted-foreground">Avg/day</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-foreground">{last7Avg}</div>
          <div className="text-[9px] text-muted-foreground">Last 7d</div>
        </div>
        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-foreground">{best}</div>
          <div className="text-[9px] text-muted-foreground">Best</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40">
        {renderChart()}
      </div>

      {/* View toggle */}
      <div className="flex items-center justify-center gap-1">
        {(['bar', 'line', 'area'] as ViewMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-colors ${
              viewMode === mode
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {mode === 'bar' ? '📊 Bars' : mode === 'line' ? '📈 Line' : '📉 Area'}
          </button>
        ))}
      </div>
    </div>
  )
}
