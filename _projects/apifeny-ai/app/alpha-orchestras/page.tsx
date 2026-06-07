import { Metadata } from 'next';
import { TrendingUp, BarChart3, Cpu, Target, Zap, Activity, Shield, Layers, Calendar, GitBranch } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Alpha Orchestras | Apifeny AI',
 description: 'Building an AI-powered trading orchestra from scratch — weekly progress on live strategies, backtests, and pipeline.',
 alternates: { canonical: `${BASE_URL}/alpha-orchestras` },
 openGraph: {
 title: 'Alpha Orchestras — Build in Public',
 description: 'AI trading strategies built from scratch. Live on Hyperliquid. Transparent weekly updates.',
 url: `${BASE_URL}/alpha-orchestras`,
 siteName: 'Apifeny AI',
 type: 'website',
 },
};

const WEEKLY = {
 week: '24–30 May 2026',
 title: 'Week 1: Pilot Launch',
 summary: 'First live trading week with $112 on Hyperliquid. 29 fills executed. 3 strategies in pipeline. Everything built from first principles — no templates, no black boxes.',
 stats: [
 { label: 'Portfolio', value: '$117', delta: '+$5' },
 { label: 'Live Trades', value: '29', delta: 'Since launch' },
 { label: 'Strategies', value: '10', delta: '4 markets' },
 { label: 'Active', value: '1 live', delta: 'KalmanDRL' },
 { label: 'Win Rate (24h)', value: '75%', delta: '3W/1L' },
 { label: 'Research', value: '~38h', delta: 'All-in' },
 ],
 entries: [
 {
 date: '25 May',
 title: 'TP/SL Self-Healing System Deployed',
 description: 'HL native grouped TP/SL only works at entry, not retroactively. Built 60s cron loop that detects raw positions without exits and attaches resting reduce-only limit GTC orders. ETH SHORT now has TP @ $2,058; HYPE and WIF have SLs set.',
 tags: ['System', 'Automation'],
 },
 {
 date: '24 May',
 title: 'First Live Trades — $112 Pilot',
 description: 'Deposit + $112 portfolio. 29 fills across ETH, SOL, TAO, HYPE, WIF. ETH SHORT best performer (+$9.72 UPnL at peak, 0.3673 @ $2,122, 20x). Other positions undersized due to 5% allocation on small account. Net PnL roughly flat on closed trades; open positions green.',
 tags: ['Milestone', 'Execution'],
 },
 {
 date: '24 May',
 title: 'Balance Bug Fixed — Correct Endpoint Found',
 description: 'HL unified accounts show $0 on perp-only endpoint (clearinghouseState). Root cause discovered through SDK source dive. Correct balance endpoint: portfolio[0][1]["accountValueHistory"][-1][1]. Also confirmed PK-only auth works with SDK v0.23 — no API key needed.',
 tags: ['Fix', 'Infrastructure'],
 },
 {
 date: '24 May',
 title: 'Internal Trading Dashboard Live',
 description: 'Professional white-background dashboard deployed on Vercel. Sections: KPIs, live positions, resting orders, signal feed (BTC/ETH/SOL with RSI and BB bands), 10-strategy pipeline with market tags, confidence ratings, stage progress bars, research hours, agent/script inventory. Trading-only content.',
 tags: ['Tooling', 'Dashboard'],
 },
 {
 date: '23 May',
 title: 'First 6 Paper Trades → First Live Trades',
 description: 'Paper engine recorded 6 trades on May 23 (later learned SOL had been paper-trading from May 18 at different account config). Live trading began with $40 (later $112). First real fills: SOL long, ETH short via KalmanDRL signals.',
 tags: ['Milestone', 'Execution'],
 },
 {
 date: '23 May',
 title: 'Backtest Results Validated — 1,100 Trades',
 description: 'Core BB 15m strategy backtest completed: 1,100 trades across BTC, ETH, SOL over multi-year data. Win rate 86-90%, profit factor 14.79, mean-reversion on RSI<20 + 2.0σ Bollinger Bands. 88.1% of winners hit 1.5R within 1 bar — no runners, no fakeouts.',
 tags: ['Research', 'Validation'],
 },
 {
 date: 'May 2026',
 title: 'Strategy Pipeline: 10 Plays Across 4 Markets',
 description: 'Full pipeline: Crypto (Core BB 15m paper/live-ready, KalmanDRL live, Vol Surge blocked on tick data, Cointegration Pairs backtesting PF 9.97 bull-only, Core BB 1h disabled for small accounts, Short Momentum R&D, MEV R&D), Polymarket (API connected, no model), Forex (pending broker), Equities (pending broker). 6 crypto, 1 prediction, 1 FX, 1 equity.',
 tags: ['Strategy', 'Architecture'],
 },
 ],
};

const typeColors: Record<string, string> = {
 fix: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
 milestone: 'text-green-400 border-green-400/30 bg-green-400/10',
 execution: 'text-aqua border-aqua/30 bg-aqua/10',
 infrastructure: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
 tooling: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
 strategy: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
 research: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
 validation: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
 architecture: 'text-pink-400 border-pink-400/30 bg-pink-400/10',
 automation: 'text-violet-400 border-violet-400/30 bg-violet-400/10',
 system: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
};

function getTagColor(tag: string): string {
 const t = tag.toLowerCase();
 if (['milestone', 'launch', 'deploy'].some(k => t.includes(k))) return typeColors.milestone;
 if (['fix', 'bug', 'patch'].some(k => t.includes(k))) return typeColors.fix;
 if (['execution', 'trade', 'fill'].some(k => t.includes(k))) return typeColors.execution;
 if (['infrastructure', 'sdk', 'api', 'endpoint'].some(k => t.includes(k))) return typeColors.infrastructure;
 if (['tooling', 'dashboard', 'ui'].some(k => t.includes(k))) return typeColors.tooling;
 if (['strategy', 'pipeline', 'architecture'].some(k => t.includes(k))) return typeColors.strategy;
 if (['research', 'backtest', 'validation'].some(k => t.includes(k))) return typeColors.validation;
 if (['automation', 'cron', 'self-healing'].some(k => t.includes(k))) return typeColors.automation;
 if (['system', 'process'].some(k => t.includes(k))) return typeColors.system;
 return 'text-gray-600 border-gray-200 bg-gray-50/50';
}

export default function AlphaOrchestrasPage() {
 return (
 <div className="min-h-screen bg-white">
 <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
 {/* Hero */}
 <div className="text-center mb-16">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aqua/10 border border-aqua/30 text-aqua text-sm mb-6">
 <Cpu className="w-4 h-4" />
 <span>Alpha Orchestras — Building in Public</span>
 </div>
 <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
 AI Trading Orchestra <span className="text-aqua">Alpha</span>
 </h1>
 <p className="text-xl text-gray-600 max-w-2xl mx-auto">
 Multiple AI trading strategies running on Hyperliquid — built from scratch, live, and transparent.
 </p>
 </div>

 {/* Weekly Stats */}
 <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-8">
 <div className="flex items-center gap-2 mb-4">
 <Calendar className="w-4 h-4 text-aqua" />
 <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">{WEEKLY.week}</span>
 </div>
 <h2 className="text-2xl font-bold text-white mb-2">{WEEKLY.title}</h2>
 <p className="text-gray-600 mb-6">{WEEKLY.summary}</p>
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
 {WEEKLY.stats.map((s) => (
 <div key={s.label} className="bg-white/50 border border-gray-200 rounded-lg p-3 text-center">
 <div className="text-lg font-bold text-white">{s.value}</div>
 <div className="text-xs text-gray-400">{s.label}</div>
 <div className="text-xs text-gray-500 mt-0.5">{s.delta}</div>
 </div>
 ))}
 </div>
 </div>

 {/* Pipeline Overview */}
 <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-8">
 <div className="flex items-center gap-2 mb-4">
 <Target className="w-4 h-4 text-aqua" />
 <h3 className="text-lg font-semibold text-white">Pipeline Overview</h3>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {[
 { name: 'Core BB 15m', stage: 'Paper', confidence: 'High', market: 'Crypto', note: '88% WR, 1,100 trades, live-ready' },
 { name: 'KalmanDRL', stage: 'LIVE', confidence: 'Medium', market: 'Crypto', note: '3 open positions, needs alloc bump' },
 { name: 'Vol Surge', stage: 'Blocked', confidence: 'Low', market: 'Crypto', note: 'Needs tick data pipeline' },
 { name: 'Cointegration Pairs', stage: 'Backtest', confidence: 'Medium', market: 'Crypto', note: 'PF 9.97 bull-only' },
 { name: 'Core BB 1h', stage: 'Disabled', confidence: 'High', market: 'Crypto', note: 'Too slow for $112, re-evaluate at $500' },
 { name: 'Polymarket Events', stage: 'R&D', confidence: 'Low', market: 'Prediction', note: 'API connected, no model' },
 { name: 'Forex Systematic', stage: 'R&D', confidence: 'Low', market: 'Forex', note: 'Pending broker' },
 { name: 'Equity Swing', stage: 'R&D', confidence: 'Low', market: 'Equities', note: 'Pending broker' },
 ].map((s) => (
 <div key={s.name} className="bg-white/50 border border-gray-200 rounded-lg p-3 flex justify-between items-start">
 <div>
 <div className="text-sm font-semibold text-white">{s.name}</div>
 <div className="text-xs text-gray-400">{s.market} · {s.confidence}</div>
 <div className="text-xs text-gray-500 mt-1">{s.note}</div>
 </div>
 <span className={`text-xs px-2 py-0.5 rounded-full border ${
 s.stage === 'LIVE' ? 'text-green-400 border-green-400/30 bg-green-400/10' :
 s.stage === 'Paper' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' :
 s.stage === 'Backtest' ? 'text-blue-400 border-blue-400/30 bg-blue-400/10' :
 s.stage === 'Blocked' ? 'text-red-400 border-red-400/30 bg-red-400/10' :
 'text-gray-400 border-gray-200 bg-gray-50/50'
 }`}>{s.stage}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Build Log */}
 <div className="space-y-4 mb-8">
 <div className="flex items-center gap-2 mb-2">
 <GitBranch className="w-4 h-4 text-aqua" />
 <h3 className="text-lg font-semibold text-white">Weekly Build Log</h3>
 </div>
 {WEEKLY.entries.map((entry, i) => (
 <div
 key={i}
 className="bg-gray-100 border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
 >
 <div className="flex items-center gap-2 mb-1">
 <span className="text-xs font-medium text-aqua">{entry.date}</span>
 </div>
 <h4 className="text-base font-semibold text-white mb-2">{entry.title}</h4>
 <p className="text-sm text-gray-600 mb-3">{entry.description}</p>
 {entry.tags && (
 <div className="flex flex-wrap gap-1.5">
 {entry.tags.map((t) => (
 <span
 key={t}
 className={`text-xs px-2 py-0.5 rounded-full border ${getTagColor(t)}`}
 >
 {t}
 </span>
 ))}
 </div>
 )}
 </div>
 ))}
 </div>

 {/* Principles */}
 <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-8">
 <div className="flex items-center gap-2 mb-4">
 <Shield className="w-4 h-4 text-aqua" />
 <h3 className="text-lg font-semibold text-white">Operating Principles</h3>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
 <div className="bg-white/50 border border-gray-200 rounded-lg p-3">
 <strong className="text-white">No Black Boxes:</strong> Every strategy is built from first principles. You can read the code, see the backtests, and verify the live fills on-chain.
 </div>
 <div className="bg-white/50 border border-gray-200 rounded-lg p-3">
 <strong className="text-white">Pipeline Before Live:</strong> R&D → Backtest → Gate Check → Paper → LIVE. No skipped stages.
 </div>
 <div className="bg-white/50 border border-gray-200 rounded-lg p-3">
 <strong className="text-white">Self-Healing Systems:</strong> Cron-loop detects failures (missing TP/SL, stale data) and auto-recovers. No babysitting required.
 </div>
 <div className="bg-white/50 border border-gray-200 rounded-lg p-3">
 <strong className="text-white">Compounding Mindset:</strong> Treat the $112 pilot as if it's $500+. All plays run. All signals fire. Real money, real decisions.
 </div>
 </div>
 </div>

 {/* Footer */}
 <div className="text-center py-8 border-t border-gray-200">
 <p className="text-gray-400 text-sm">
 Part of the <Link href="/" className="text-aqua hover:underline">Apifeny AI</Link> ecosystem
 {' · '}
 <a href="https://dashboard-one-beryl-50.vercel.app" className="text-gray-600 hover:underline">Internal Dashboard</a>
 {' · '}
 <span className="text-gray-500">Updated weekly</span>
 </p>
 </div>
 </div>
 </div>
 );
}
