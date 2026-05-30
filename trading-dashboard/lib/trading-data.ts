// lib/trading-data.ts — Loads and structures all trading data
// In production Vercel, data is bundled at build time.
// We read from local files at build and serve as static JSON.

export interface Trade {
  timestamp: string
  symbol: string
  strategy: string
  side: 'long' | 'short'
  entry: number
  exit: number
  pnl_usd: number
  pnl_pct?: number
  exit_reason: string
}

export interface StrategyMetrics {
  name: string
  alloc_pct: number
  trades: number
  wins: number
  losses: number
  win_rate: number
  pnl: number
  pf: number | null
  status: 'live' | 'paper' | 'backtest' | 'satellite' | 'killed'
}

export interface BotState {
  status: string
  balance: number
  positions: number
  running_strategies: string[]
  last_update: string
}

export interface PipelineItem {
  name: string
  phase: string
  wr: string
  pf: string
  live: boolean
  next_step: string
  status: 'live' | 'paper' | 'backtest' | 'satellite' | 'killed'
}

export interface DashboardData {
  botState: BotState
  strategies: StrategyMetrics[]
  trades: Trade[]
  pipeline: PipelineItem[]
  lastUpdated: string
}

// At build time, these are populated from local JSON files
let _cachedData: DashboardData | null = null

export function getDashboardData(): DashboardData {
  if (_cachedData) return _cachedData

  // We'll parse embedded data (populated at build time)
  _cachedData = parseBuildData()
  return _cachedData
}

function parseBuildData(): DashboardData {
  // Default/fallback data
  const data: DashboardData = {
    botState: { status: 'running', balance: 1106.18, positions: 0, running_strategies: [], last_update: new Date().toISOString() },
    strategies: [],
    trades: [],
    pipeline: [],
    lastUpdated: new Date().toISOString()
  }

  // Try to load from the embedded JSON at build time
  try {
    if (typeof __TRADES__ !== 'undefined') {
      data.trades = __TRADES__ as Trade[]
    }
  } catch {}
  
  try {
    if (typeof __BOT_STATE__ !== 'undefined') {
      data.botState = { ...data.botState, ...__BOT_STATE__ as Partial<BotState> }
    }
  } catch {}

  return data
}

// Build-time data injection helpers
let __TRADES__: any = null
let __BOT_STATE__: any = null

export function setBuildTimeTrades(trades: any) {
  __TRADES__ = trades
}

export function setBuildTimeBotState(state: any) {
  __BOT_STATE__ = state
}
