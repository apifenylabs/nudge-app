// app/page.tsx — Alpha Orchestras Trading Dashboard (white template, live-calendar)
'use client'

import { useEffect, useState, useRef } from 'react'
import {
  TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle,
  CheckCircle, Clock, Zap, Target, CalendarDays, BarChart3,
  ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

interface Trade {
  timestamp: string; symbol: string; strategy: string; side: string
  entry: number; exit: number; pnl_usd: number; exit_reason: string
}
interface StrategyAlloc { alloc: number; comment: string }
interface PipelineItem { name: string; phase: string; wr: string; pf: string; live: boolean; next_step: string }
interface BotState { balance?: number; positions?: number; status?: string; last_cycle?: string; kill_switched?: boolean }

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const pad = (n: number) => n < 10 ? '0' + n : '' + n

function buildCalendar(year: number, month: number, dailyPnl: Map<string, number>, dailyTrades: Map<string, number>) {
  const first = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const weeks: { day: number; pnl: number | null; trades: number }[][] = []
  let cur: { day: number; pnl: number | null; trades: number }[] = []
  for (let i = 0; i < first; i++) cur.push({ day: 0, pnl: null, trades: 0 })
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${pad(month + 1)}-${pad(d)}`
    const pnl = dailyPnl.get(dateKey) ?? null
    const t = dailyTrades.get(dateKey) ?? 0
    cur.push({ day: d, pnl, trades: t })
    if (cur.length === 7) { weeks.push(cur); cur = [] }
  }
  if (cur.length > 0) weeks.push(cur)
  return { year, month, daysInMonth, weeks }
}

function TradingDashboard() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [pipeline, setPipeline] = useState<PipelineItem[]>([])
  const [botState, setBotState] = useState<BotState>({})
  const [ready, setReady] = useState(false)
  const [calendarOffset, setCalendarOffset] = useState(0) // 0 = current month, -1 = prev
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Promise.all([
      fetch('/data/trade_log.json').then(r => r.json().catch(() => [])),
      fetch('/data/allocations.json').then(r => r.json().catch(() => ({}))),
      fetch('/data/pipeline.json').then(r => r.json().catch(() => [])),
      fetch('/data/bot_state.json').then(r => r.json().catch(() => ({}))),
    ]).then(([t, a, p, b]) => {
      setTrades(Array.isArray(t) ? t : (t.trade_history || []))
      setPipeline(p)
      setBotState(b)
      setReady(true)
    })
  }, [])

  if (!ready) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Activity className="w-8 h-8 text-blue-500 animate-pulse mx-auto mb-3" />
        <div className="text-gray-400 text-sm">Loading trading dashboard...</div>
      </div>
    </div>
  )

  // Compute actual balance
  const totalPnl = trades.reduce((s, t) => s + (t.pnl_usd || 0), 0)
  const startingBalance = 1000
  const actualBalance = startingBalance + totalPnl
  const wins = trades.filter(t => (t.pnl_usd || 0) > 0)
  const losses = trades.filter(t => (t.pnl_usd || 0) <= 0)
  const wr = trades.length > 0 ? (wins.length / trades.length * 100) : 0
  const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + t.pnl_usd, 0) / wins.length : 0
  const avgLoss = losses.length > 0 ? losses.reduce((s, t) => s + t.pnl_usd, 0) / losses.length : 0
  const grossWin = wins.reduce((s, t) => s + t.pnl_usd, 0)
  const grossLoss = Math.abs(losses.reduce((s, t) => s + t.pnl_usd, 0))
  const pf = grossLoss > 0 ? grossWin / grossLoss : 0

  // Daily PnL for calendar
  const dailyPnl = new Map<string, number>()
  const dailyTrades = new Map<string, number>()
  trades.forEach(t => {
    const day = t.timestamp ? t.timestamp.slice(0, 10) : 'unknown'
    dailyPnl.set(day, (dailyPnl.get(day) || 0) + (t.pnl_usd || 0))
    dailyTrades.set(day, (dailyTrades.get(day) || 0) + 1)
  })

  const now = new Date()
  // Generate a range of months centered around current month
  const months = []
  // Show 18 months: 6 past + current + 11 future
  for (let i = -6; i <= 11; i++) {
    const m = new Date(now.getFullYear(), now.getMonth() + i, 1)
    months.push({ year: m.getFullYear(), month: m.getMonth() })
  }

  // Per-symbol
  const symStatsRaw = new Map<string, { trades: number; wins: number; pnl: number }>()
  trades.forEach(t => {
    const sym = t.symbol || '?'
    const cur = symStatsRaw.get(sym) || { trades: 0, wins: 0, pnl: 0 }
    cur.trades++; cur.pnl += t.pnl_usd || 0
    if ((t.pnl_usd || 0) > 0) cur.wins++
    symStatsRaw.set(sym, cur)
  })
  const symStats = Array.from(symStatsRaw.entries()).map(([k, v]) => ({
    symbol: k, trades: v.trades, wr: v.trades > 0 ? Math.round(v.wins / v.trades * 100) : 0, pnl: Math.round(v.pnl * 100) / 100
  }))

  // Pipeline counts
  const liveCount = pipeline.filter(s => s.phase.includes('LIVE')).length
  const paperCount = pipeline.filter(s => s.phase.includes('PAPER')).length
  const btCount = pipeline.filter(s => s.phase.includes('BACKTEST')).length

  // Latest trade date for freshness indicator
  const allTimes = trades.map(t => t.timestamp).filter(Boolean).sort()
  const latestTrade = allTimes.length > 0 ? allTimes[allTimes.length - 1].slice(0, 10) : 'no trades'
  const dataAge = latestTrade !== 'no trades' ? Math.floor((Date.now() - new Date(latestTrade).getTime()) / 3600000) : 0

  const getPnlColor = (v: number) => v >= 0 ? 'text-emerald-600' : 'text-red-500'
  const fmt = (v: number) => (v >= 0 ? '+' : '') + v.toFixed(2)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-base">Alpha Orchestras</span>
            <span className="text-gray-400 text-sm hidden sm:inline">— Trading Internal</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className={`flex items-center gap-1.5 ${botState?.kill_switched ? 'text-red-500' : 'text-emerald-500'}`}>
              <span className={`w-2 h-2 rounded-full ${botState?.kill_switched ? 'bg-red-500' : 'bg-emerald-500'}`} />
              {botState?.kill_switched ? 'KILL' : 'ACTIVE'}
            </span>
            <span className="text-gray-400 text-xs">
              {dataAge === 0 ? 'Today' : dataAge > 72 ? `${Math.floor(dataAge / 24)}d ago` : `${dataAge}h ago`}
            </span>
            <span className="text-gray-400 text-xs">{trades.length} closes</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-gray-400 text-xs">Balance</div>
            <div className="text-2xl font-bold">${actualBalance.toFixed(2)}</div>
            <div className="text-xs text-gray-400">+${totalPnl.toFixed(2)} vs ${startingBalance}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-gray-400 text-xs">Total P&L</div>
            <div className={`text-2xl font-bold ${getPnlColor(totalPnl)}`}>
              {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400">+{(totalPnl / startingBalance * 100).toFixed(1)}% since start</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-gray-400 text-xs">Open Positions</div>
            <div className="text-2xl font-bold">{botState?.positions ?? 0}</div>
            <div className="text-xs text-gray-400">currently active</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-gray-400 text-xs">Closed Trades</div>
            <div className="text-2xl font-bold">{trades.length}</div>
            <div className="text-xs text-gray-400">{wr.toFixed(0)}% WR ({wins.length}W/{losses.length}L)</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-gray-400 text-xs">Profit Factor</div>
            <div className={`text-2xl font-bold ${pf >= 2 ? 'text-emerald-600' : pf > 1 ? 'text-amber-600' : 'text-red-500'}`}>
              {pf.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400">Avg W ${avgWin.toFixed(2)} / L ${avgLoss.toFixed(2)}</div>
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Daily P&L Calendar — horizontally scrollable */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> Daily P&L
                </h2>
                <div className="flex gap-1">
                  <button onClick={() => {
                    scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })
                  }} className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => {
                    scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })
                  }} className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div ref={scrollRef} className="overflow-x-auto pb-2 -mx-2 px-2" style={{ scrollbarWidth: 'thin' }}>
                <div className="flex gap-6 min-w-max">
                  {months.map(({ year, month }) => {
                    const cal = buildCalendar(year, month, dailyPnl, dailyTrades)
                    const isCurrent = year === now.getFullYear() && month === now.getMonth()
                    return (
                      <div key={`${year}-${month}`} className="flex-shrink-0 w-[280px]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-semibold ${isCurrent ? 'text-blue-600' : 'text-gray-600'}`}>
                            {MONTHS[month]} {year}
                          </span>
                          {isCurrent && <span className="text-[10px] text-blue-400 font-medium">Current</span>}
                        </div>
                        <div className="grid grid-cols-7 gap-0.5">
                          {DAYS.map(d => <div key={d} className="text-[9px] text-gray-400 text-center">{d[0]}</div>)}
                          {cal.weeks.flat().map((c, i) => {
                            const absPnl = c.pnl !== null ? Math.abs(c.pnl) : 0
                            const bgColor = c.pnl === null ? 'bg-transparent' :
                              c.pnl > 0.5 ? 'bg-emerald-200' :
                              c.pnl > 0 ? 'bg-emerald-50' :
                              c.pnl < -0.5 ? 'bg-red-200' :
                              c.pnl < 0 ? 'bg-red-50' :
                              'bg-gray-100'
                            const textColor = c.pnl === null ? 'text-transparent' :
                              c.pnl > 0 ? 'text-emerald-800' :
                              c.pnl < 0 ? 'text-red-800' :
                              'text-gray-500'
                            return (
                              <div key={i} className={`aspect-square text-[10px] flex flex-col items-center justify-center rounded ${bgColor} ${textColor} ${c.pnl !== null ? 'p-0.5' : ''}`}>
                                {c.day > 0 && c.pnl !== null && (
                                  <>
                                    <span className="font-medium leading-none">{c.day}</span>
                                    <span className="text-[7px] leading-none mt-0.5 opacity-70">
                                      {c.pnl >= 0 ? '+' : ''}${absPnl < 0.01 ? '0.00' : absPnl.toFixed(1)}
                                    </span>
                                  </>
                                )}
                                {c.day > 0 && c.pnl === null && (
                                  <span className="text-[10px] font-normal text-gray-300">{c.day}</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                        {/* Month summary */}
                        <div className="flex justify-center gap-3 mt-1.5 text-[10px]">
                          <span className="text-emerald-600">
                            +${Array.from(dailyPnl.entries())
                              .filter(([k]) => k.startsWith(`${year}-${pad(month + 1)}`))
                              .filter(([, v]) => v > 0)
                              .reduce((s, [, v]) => s + v, 0).toFixed(1)}
                          </span>
                          <span className="text-red-500">
                            -${Array.from(dailyPnl.entries())
                              .filter(([k]) => k.startsWith(`${year}-${pad(month + 1)}`))
                              .filter(([, v]) => v < 0)
                              .reduce((s, [, v]) => s + Math.abs(v), 0).toFixed(1)}
                          </span>
                          <span className="text-gray-500">
                            Net: {fmt(Array.from(dailyPnl.entries())
                              .filter(([k]) => k.startsWith(`${year}-${pad(month + 1)}`))
                              .reduce((s, [, v]) => s + v, 0))}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-3 mt-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-200" /> +$0.50+</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-50" /> Minor win</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-50" /> Minor loss</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200" /> -$0.50+</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-100" /> Breakeven</span>
              </div>
            </div>

            {/* Live Signals */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Performance by Symbol
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {symStats.map(s => (
                  <div key={s.symbol} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold">{s.symbol.replace('-PERP', '')}</span>
                      <span className={`text-xs font-medium ${getPnlColor(s.pnl)}`}>{fmt(s.pnl)}</span>
                    </div>
                    <div className="text-xs text-gray-400">{s.trades}t · {s.wr}% WR</div>
                  </div>
                ))}
                {symStats.length === 0 && <div className="text-gray-400 text-sm col-span-3 py-4 text-center">No trades yet</div>}
              </div>
            </div>

            {/* Trade History */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Trade History</h2>
              {trades.length === 0 ? (
                <div className="text-gray-400 text-sm py-4 text-center">No trades recorded</div>
              ) : (
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 text-xs border-b border-gray-100">
                        <th className="text-left pb-2 font-medium">Time</th>
                        <th className="text-left pb-2 font-medium">Strategy</th>
                        <th className="text-left pb-2 font-medium">Sym</th>
                        <th className="text-right pb-2 font-medium">P&L</th>
                        <th className="text-left pb-2 font-medium">Exit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trades.slice().reverse().map((t, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 text-sm">
                          <td className="py-2 pr-3 text-gray-500 text-xs tabular-nums">
                            {t.timestamp?.slice(5, 16).replace('T', ' ')}
                          </td>
                          <td className="py-2 pr-3 text-gray-800">{t.strategy}</td>
                          <td className="py-2 pr-3">
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              t.side === 'long' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                            }`}>{t.symbol?.slice(0, 8)}</span>
                          </td>
                          <td className={`py-2 pr-3 text-right tabular-nums font-medium ${getPnlColor(t.pnl_usd || 0)}`}>
                            {(t.pnl_usd || 0) >= 0 ? '+' : ''}${(t.pnl_usd || 0).toFixed(2)}
                          </td>
                          <td className="py-2 pl-3 text-xs text-gray-400">{t.exit_reason?.slice(0, 15)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-2 text-[10px] text-gray-400 text-right">
                Last trade: {latestTrade} · Data: static snapshot (run `./scripts/generate-bundled-data.sh && vercel --prod` to refresh)
              </div>
            </div>
          </div>

          {/* Right Column — Pipeline */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-400">Live</div>
                  <div className="text-lg font-bold text-emerald-600">{liveCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Paper</div>
                  <div className="text-lg font-bold text-amber-600">{paperCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Backtest</div>
                  <div className="text-lg font-bold text-blue-600">{btCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Killed</div>
                  <div className="text-lg font-bold text-gray-500">{pipeline.filter(s => s.phase.includes('KILLED')).length}</div>
                </div>
              </div>
            </div>

            {/* Strategy Pipeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Strategy Pipeline
              </h2>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {pipeline.map(s => {
                  const phase = s.phase.replace(/\*\*/g, '')
                  const isLive = phase.includes('LIVE')
                  const isPaper = phase.includes('PAPER')
                  const isBt = phase.includes('BACKTEST')
                  const isSat = phase.includes('SATELLITE')
                  const isKilled = phase.includes('KILLED')
                  const stage = isLive ? 5 : isPaper ? 4 : isBt ? 3 : isSat ? 2 : isKilled ? 0 : 1
                  const bg = isLive ? 'border-emerald-200 bg-emerald-50' : isPaper ? 'border-amber-200 bg-amber-50' : isKilled ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white'
                  
                  return (
                    <div key={s.name} className={`rounded-lg border ${bg} p-3`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-semibold">{s.name}</span>
                          <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            isLive ? 'bg-emerald-200 text-emerald-800' :
                            isPaper ? 'bg-amber-200 text-amber-800' :
                            isKilled ? 'bg-red-200 text-red-800' :
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {isLive ? 'LIVE' : isPaper ? 'PAPER' : isKilled ? 'KILLED' : isBt ? 'BACKTEST' : isSat ? 'SATELLITE' : 'R&D'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          <span className="font-mono">{s.wr}</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">{s.next_step}</div>
                      <div className="flex gap-1 mt-1.5">
                        {[1,2,3,4,5].map(n => (
                          <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= stage ? (
                            isLive ? 'bg-emerald-400' : isPaper ? 'bg-amber-400' : 'bg-gray-300'
                          ) : 'bg-gray-100'}`} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradingDashboard
