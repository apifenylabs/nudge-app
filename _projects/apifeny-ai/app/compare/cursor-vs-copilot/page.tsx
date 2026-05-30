import { Metadata } from 'next';
import Link from 'next/link';
import {
 ArrowLeft,
 ArrowRight,
 CheckCircle2,
 XCircle,
 DollarSign,
 Code,
 Globe,
 Brain,
 MessageSquare,
 Sparkles,
 BookOpen,
 BarChart3,
 Users,
 ChevronRight,
 Star,
 Shield,
 Zap,
 Monitor,
 GitBranch,
 Lock,
 ExternalLink,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Cursor vs GitHub Copilot 2026 — Pricing, Features, Coding Compared | Apifeny AI',
 description:
 'Cursor vs GitHub Copilot head-to-head: pricing (Cursor Pro $20/mo vs Copilot $10-39/mo), coding benchmarks, AI models, IDE support, context handling, and security. Which AI coding assistant wins for developers in 2026?',
 keywords: [
 'Cursor vs Copilot',
 'Cursor IDE vs GitHub Copilot',
 'GitHub Copilot vs Cursor',
 'Cursor AI pricing',
 'GitHub Copilot pricing',
 'best AI coding assistant',
 'Cursor vs Copilot for developers',
 'AI coding tools 2026',
 'Cursor IDE review',
 'GitHub Copilot review',
 'Cursor vs Copilot comparison',
 'AI pair programming',
 ],
 alternates: { canonical: `${BASE_URL}/compare/cursor-vs-copilot` },
 openGraph: {
 title: 'Cursor vs GitHub Copilot 2026 — Pricing, Features, Coding Compared',
 description:
 'Cursor Pro $20/mo vs Copilot $10-39/mo — coding benchmarks, AI models, IDE support, context handling. Which AI coding assistant wins for developers in 2026?',
 url: `${BASE_URL}/compare/cursor-vs-copilot`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Cursor vs GitHub Copilot 2026 — Pricing, Features, Coding Compared',
 description:
 'Pricing ($20 vs $10-39/mo), coding benchmarks, AI models, IDE support — which AI coding assistant wins?',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
 cursor: {
 coding: 9.5,
 reasoning: 9.0,
 speed: 8.5,
 contextAwareness: 9.5,
 pricing: 7.0,
 ecosystem: 7.5,
 multimodal: 6.0,
 },
 copilot: {
 coding: 8.5,
 reasoning: 8.0,
 speed: 9.0,
 contextAwareness: 7.5,
 pricing: 8.5,
 ecosystem: 9.5,
 multimodal: 6.0,
 },
} as const;

const COMPARISON_ROWS = [
 {
 category: 'Pricing',
 icon: DollarSign,
 items: [
 {
 label: 'Free Tier',
 cursor: '⚠️ Limited. 2000 completions/mo + 50 slow premium requests.',
 copilot: '⚠️ Limited. 2000 completions/mo + 50 chat requests (free tier).',
 winner: 'tie',
 },
 {
 label: 'Individual Plan',
 cursor: '$20/mo Pro · Unlimited completions & premium models.',
 copilot: '$10/mo Individual · Unlimited completions & chat.',
 winner: 'copilot',
 },
 {
 label: 'Team / Business',
 cursor: '$40/mo per user · Team features, centralized billing.',
 copilot: '$19/mo per user Business · $39/mo Enterprise.',
 winner: 'copilot',
 },
 {
 label: 'API / Usage Cap',
 cursor: '500 fast premium requests/mo (Pro), then slow mode.',
 copilot: 'Unlimited chat & completions (Individual). No hard caps.',
 winner: 'copilot',
 },
 ],
 },
 {
 category: 'Coding & AI Models',
 icon: Code,
 items: [
 {
 label: 'Default Model',
 cursor: 'Claude 3.7 Sonnet, GPT-4o, Cursor-small (switches per task).',
 copilot: 'GPT-4o, Claude 3.5 Sonnet, Copilot model (fine-tuned Codex).',
 winner: 'cursor',
 },
 {
 label: 'Code Generation',
 cursor: '⭐ Excellent. Multi-model approach picks best for each task. Strong on full-stack & refactoring.',
 copilot: 'Very good. Deep GitHub integration — learns from your repos & pull requests.',
 winner: 'cursor',
 },
 {
 label: 'Tab Autocomplete',
 cursor: 'Fast, multi-line, context-aware. Predicts next edits, not just next line.',
 copilot: '⭐ Best-in-class. Single & multi-line. Ghost text is instant. Most mature autocomplete.',
 winner: 'copilot',
 },
 {
 label: 'Debugging & Fixes',
 cursor: '⭐ Agent mode debugs, runs terminal commands, applies fixes automatically.',
 copilot: 'Good. Inline suggestions, chat-based debugging. No autonomous agent mode.',
 winner: 'cursor',
 },
 {
 label: 'Code Quality Score',
 cursor: '9.5 / 10',
 copilot: '8.5 / 10',
 winner: 'cursor',
 },
 ],
 },
 {
 category: 'IDE & Editor Support',
 icon: Monitor,
 items: [
 {
 label: 'Native Editor',
 cursor: 'Custom VS Code fork — Cursor IDE (VS Code-based). Full VS Code extension support.',
 copilot: 'Native VS Code extension + JetBrains, Neovim, and more.',
 winner: 'copilot',
 },
 {
 label: 'VS Code Support',
 cursor: '✅ Full. Built on VS Code, same extensions & themes work.',
 copilot: '✅ Native. Deepest integration, first-class citizen.',
 winner: 'tie',
 },
 {
 label: 'JetBrains Support',
 cursor: '❌ Not available. Must use Cursor IDE.',
 copilot: '✅ Full plugin for IntelliJ, PyCharm, WebStorm, GoLand.',
 winner: 'copilot',
 },
 {
 label: 'Neovim / Vim',
 cursor: '❌ No native support. VS Code keybindings only.',
 copilot: '✅ Official Neovim plugin + Vim/Neovim community plugins.',
 winner: 'copilot',
 },
 {
 label: 'Other Editors',
 cursor: '❌ Cursor IDE only (VS Code fork, no standalone extension).',
 copilot: '✅ Xcode, Visual Studio, Azure Data Studio, RStudio (via Copilot Chat).',
 winner: 'copilot',
 },
 ],
 },
 {
 category: 'Context & Features',
 icon: Brain,
 items: [
 {
 label: 'Context Window',
 cursor: '⭐ Full-codebase awareness. Indexes entire project — sees all files, not just open tabs.',
 copilot: 'Open tabs + @file mentions. Good but doesn\'t index the full codebase.',
 winner: 'cursor',
 },
 {
 label: 'Agent Mode',
 cursor: '✅ Yes. Autonomous — reads files, edits, runs terminal, installs packages, git commits.',
 copilot: '⚠️ Partial. Copilot Workspace (preview). Not yet autonomous agent mode.',
 winner: 'cursor',
 },
 {
 label: 'Inline Editing',
 cursor: '✅ Cmd+K — highlight code, describe change, see diff. Apply or reject.',
 copilot: '✅ Ctrl+I — inline suggestions, edit with natural language.',
 winner: 'tie',
 },
 {
 label: 'Chat Interface',
 cursor: '⭐ Sidebar + inline chat. References full codebase context automatically.',
 copilot: 'Sidebar chat + inline with @file/@workspace. Good but more manual context selection.',
 winner: 'cursor',
 },
 {
 label: 'Git Integration',
 cursor: 'Good. Can stage, diff, commit via agent mode.',
 copilot: '⭐ Excellent. Generates PR descriptions, reviews PRs, sees git history.',
 winner: 'copilot',
 },
 {
 label: 'Code Review',
 cursor: 'Manual review workflow. Agent can diff and suggest changes.',
 copilot: '⭐ Copilot Code Review — automated PR reviews in GitHub. Review summaries, inline comments.',
 winner: 'copilot',
 },
 ],
 },
 {
 category: 'Security & Privacy',
 icon: Lock,
 items: [
 {
 label: 'Data Training Opt-Out',
 cursor: '✅ Business plan: opt-out available. Pro: data used for training by default.',
 copilot: '✅ Free for public repos. Paid plans: data not used for training. Opt-out available.',
 winner: 'copilot',
 },
 {
 label: 'Self-Hosted / VPC',
 cursor: '❌ No self-hosted option. Cloud-only (Cursor servers).',
 copilot: '✅ GitHub Enterprise — self-hosted or VPC deployment available.',
 winner: 'copilot',
 },
 {
 label: 'Code Snippet Storage',
 cursor: 'Stores snippets for context. Indexes local codebase.',
 copilot: 'Stores snippets for telemetry. Can disable telemetry collection.',
 winner: 'tie',
 },
 {
 label: 'IP Indemnification',
 cursor: '✅ Included for Pro and Business plans.',
 copilot: '✅ Included for paid plans (Individual, Business, Enterprise).',
 winner: 'tie',
 },
 ],
 },
];

const USE_CASES = [
 {
 icon: Code,
 title: 'Full-Stack Development',
 verdict: 'Cursor wins — codebase-aware, agent mode, multi-model orchestration.',
 details:
 'When you\'re building across frontend, backend, and infrastructure, Cursor\'s full-codebase context is a game-changer. It understands your entire project — not just the file you\'re looking at. The agent mode can scaffold entire features: create files, run migrations, install dependencies, and commit. Copilot is catching up with Copilot Workspace but isn\'t there yet.',
 best: 'Cursor',
 },
 {
 icon: GitBranch,
 title: 'Team / Enterprise Development',
 verdict: 'Copilot wins — better editor support, code review, enterprise security.',
 details:
 'For teams spread across VS Code, JetBrains, and Neovim, Copilot wins by working everywhere. Copilot Code Review, PR summaries, and GitHub integration make it deeply embedded in the dev workflow. Enterprise features like VPC deployment, SSO, and audit logs give it the edge for larger organizations.',
 best: 'Copilot',
 },
 {
 icon: Zap,
 title: 'Fast Prototyping & Solo Devs',
 verdict: 'Cursor wins — agent mode accelerates the build loop dramatically.',
 details:
 'Cursor\'s agent mode is the fastest way to go from idea to working prototype. Tell it what you want, it reads your existing code, writes new files, installs deps, and iterates autonomously. For solo developers building MVPs or side projects, this is the edge that Copilot doesn\'t have yet.',
 best: 'Cursor',
 },
 {
 icon: Monitor,
 title: 'Polyglot / Multi-Editor Devs',
 verdict: 'Copilot wins — works in every major editor, no IDE lock-in.',
 details:
 'If you switch between VS Code, IntelliJ, Neovim, and Xcode depending on the project, Copilot is the only choice. Cursor locks you into its custom VS Code fork. Copilot\'s editor-agnostic approach means your AI assistant follows you wherever you code.',
 best: 'Copilot',
 },
];

const FAQS = [
 {
 q: 'Which is better for coding: Cursor or GitHub Copilot?',
 a: 'For pure coding productivity, Cursor has the edge thanks to its full-codebase awareness, agent mode, and multi-model orchestration. Copilot is more mature on autocomplete speeds and works across more editors. Cursor wins for deep work; Copilot wins for versatility.',
 },
 {
 q: 'Can I use Cursor without switching editors?',
 a: 'No — Cursor is its own IDE (a VS Code fork). You must switch to the Cursor app. However, all your VS Code extensions, themes, and keybindings transfer over seamlessly. Many developers make the jump permanently after trying it.',
 },
 {
 q: 'Is GitHub Copilot free for open-source?',
 a: 'Yes. GitHub Copilot is free for verified students, teachers, and maintainers of popular open-source projects. For everyone else, Individual is $10/month. Cursor Pro is $20/month — there is no free-for-OSS tier.',
 },
 {
 q: 'Does Cursor use GitHub Copilot?',
 a: 'No. Cursor has its own AI layer with support for multiple backends (Claude 3.7 Sonnet, GPT-4o, Cursor-small). It does not use or require GitHub Copilot. You can use Cursor completely independently of GitHub.',
 },
 {
 q: 'Which has better security for enterprise teams?',
 a: 'GitHub Copilot Enterprise wins on security. It offers VPC deployment, SSO, audit logging, and IP indemnification. Cursor\'s Business plan has basic security features but no self-hosted option. For regulated industries, Copilot Enterprise is the safer choice.',
 },
 {
 q: 'Should I use both Cursor and Copilot?',
 a: 'Some developers do — Cursor as their primary IDE with Copilot as an additional autocomplete layer (though Cursor\'s own completions are excellent). For most, choosing one is sufficient. Use Cursor if you want autonomous agent capabilities and codebase awareness. Use Copilot if you need multi-editor support or team/enterprise features.',
 },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function ScoreBar({ score, label }: { score: number; label: string }) {
 const color =
 score >= 9 ? 'bg-neon' : score >= 7.5 ? 'bg-aqua' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500';
 return (
 <div className="flex items-center gap-3">
 <span className="text-xs text-tech-400 w-24 shrink-0">{label}</span>
 <div className="flex-1 h-2.5 rounded-full bg-tech-700 overflow-hidden">
 <div
 className={`h-full rounded-full transition-all ${color}`}
 style={{ width: `${score * 10}%` }}
 />
 </div>
 <span className="text-xs font-mono text-tech-300 w-8 text-right">{score.toFixed(1)}</span>
 </div>
 );
}

function WinnerBadge({ winner }: { winner: string }) {
 if (winner === 'cursor') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neon-light bg-neon/10 px-2 py-0.5 rounded-full">
 <Zap className="w-3 h-3" />
 Cursor
 </span>
 );
 }
 if (winner === 'copilot') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-aqua bg-aqua/10 px-2 py-0.5 rounded-full">
 <Sparkles className="w-3 h-3" />
 Copilot
 </span>
 );
 }
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
 Tie
 </span>
 );
}

export default function CursorVsCopilotCompare() {
 return (
 <div className="min-h-screen bg-tech-900">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Compare', item: '/compare' },
 { name: 'Cursor vs Copilot', item: '/compare/cursor-vs-copilot' },
 ]}
 />

 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Back link */}
 <Link
 href="/tools"
 className="inline-flex items-center gap-1.5 text-sm text-tech-400 hover:text-neon-light transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Back to Tools
 </Link>

 {/* ─── Hero ─────────────────────────────────────────────── */}
 <section className="relative mb-12">
 <div className="relative rounded-2xl bg-gradient-to-br from-neon/10 via-aqua/5 to-tech-800 border border-tech-500/30 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
 <Star className="w-3.5 h-3.5" />
 Head-to-Head Comparison
 </div>
 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
 Cursor vs GitHub Copilot{' '}
 <span className="bg-gradient-to-r from-neon-light to-aqua bg-clip-text text-transparent">
 2026
 </span>
 </h1>
 <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl mb-6">
 The two most powerful AI coding assistants collide. Cursor rewrites the IDE experience
 with agent mode and full-codebase awareness — but locks you into its own editor.
 GitHub Copilot works everywhere with deep GitHub integration and enterprise features.
 We put both through coding benchmarks, pricing analysis, and real-world developer
 workflows to help you choose.
 </p>

 {/* Quick stat pills */}
 <div className="flex flex-wrap gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 <span className="text-neon-light font-semibold">Cursor</span> — $20/mo Pro
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 <span className="text-aqua font-semibold">Copilot</span> — $10/mo Indiv · $19/mo Business
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 Cursor wins: Agent mode + codebase context
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 Copilot wins: Editor support + security
 </div>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─────────────────────────────────── */}
 <section className="mb-12">
 <div className="bg-tech-800/40 border border-tech-500/20 rounded-xl p-6">
 <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-neon" />
 Table of Contents
 </h2>
 <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {[
 { href: '#verdict', label: 'Quick Verdict · Scorecard' },
 { href: '#pricing', label: 'Pricing Breakdown' },
 { href: '#coding', label: 'Coding & AI Models' },
 { href: '#ide', label: 'IDE & Editor Support' },
 { href: '#context', label: 'Context & Features' },
 { href: '#security', label: 'Security & Privacy' },
 { href: '#usecases', label: 'Use Cases — Who Wins What' },
 { href: '#recommendation', label: 'Recommendation for Developers' },
 { href: '#faq', label: 'FAQ' },
 ].map((item) => (
 <a
 key={item.href}
 href={item.href}
 className="flex items-center gap-2 text-sm text-tech-300 hover:text-neon-light transition px-3 py-2 rounded-lg hover:bg-tech-700/40"
 >
 <ChevronRight className="w-3 h-3 shrink-0" />
 {item.label}
 </a>
 ))}
 </nav>
 </div>
 </section>

 {/* ─── Quick Verdict Scorecard ────────────────────────────── */}
 <section id="verdict" className="mb-12 scroll-mt-20">
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <BarChart3 className="w-6 h-6 text-neon" />
 Quick Verdict · Scorecard
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Cursor */}
 <div className="rounded-xl bg-tech-800/50 border border-neon/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
 <Zap className="w-5 h-5 text-neon-light" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">Cursor</h3>
 <p className="text-xs text-tech-400">Claude + GPT-4o + Custom Models</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.cursor.coding} label="Coding Quality" />
 <ScoreBar score={VERDICT_SCORES.cursor.reasoning} label="Reasoning" />
 <ScoreBar score={VERDICT_SCORES.cursor.speed} label="Speed" />
 <ScoreBar score={VERDICT_SCORES.cursor.contextAwareness} label="Context Awareness" />
 <ScoreBar score={VERDICT_SCORES.cursor.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.cursor.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.cursor.multimodal} label="Multimodal" />
 </div>
 </div>

 {/* Copilot */}
 <div className="rounded-xl bg-tech-800/50 border border-aqua/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-aqua/20 flex items-center justify-center">
 <Sparkles className="w-5 h-5 text-aqua" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">GitHub Copilot</h3>
 <p className="text-xs text-tech-400">GPT-4o + Codex Fine-Tuned</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.copilot.coding} label="Coding Quality" />
 <ScoreBar score={VERDICT_SCORES.copilot.reasoning} label="Reasoning" />
 <ScoreBar score={VERDICT_SCORES.copilot.speed} label="Speed" />
 <ScoreBar score={VERDICT_SCORES.copilot.contextAwareness} label="Context Awareness" />
 <ScoreBar score={VERDICT_SCORES.copilot.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.copilot.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.copilot.multimodal} label="Multimodal" />
 </div>
 </div>
 </div>

 <div className="mt-6 p-4 rounded-lg bg-tech-800/30 border border-tech-500/20">
 <p className="text-sm text-tech-200 text-center">
 <strong className="text-neon-light">Cursor</strong> wins on: coding quality, context awareness, agent mode ·{' '}
 <strong className="text-aqua">Copilot</strong> wins on: pricing, editor support, team features ·{' '}
 <strong className="text-white">Tie</strong> on: autocomplete speed
 </p>
 </div>
 </section>

 {/* ─── Full Comparison Tables ──────────────────────────────── */}
 {COMPARISON_ROWS.map((section) => (
 <section
 key={section.category}
 id={
 section.category === 'Coding & AI Models'
 ? 'coding'
 : section.category === 'IDE & Editor Support'
 ? 'ide'
 : section.category === 'Context & Features'
 ? 'context'
 : section.category === 'Security & Privacy'
 ? 'security'
 : section.category.toLowerCase()
 }
 className="mb-12 scroll-mt-20"
 >
 <div className="flex items-center gap-3 mb-6">
 <section.icon className="w-6 h-6 text-neon" />
 <h2 className="text-2xl font-bold text-white">{section.category}</h2>
 </div>

 <div className="overflow-x-auto rounded-xl border border-tech-500/20">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-tech-800/80">
 <th className="text-left px-4 py-3 text-tech-200 font-semibold border-b border-tech-500/20 w-[25%]">
 Aspect
 </th>
 <th className="text-left px-4 py-3 text-neon-light font-semibold border-b border-tech-500/20 w-[30%]">
 Cursor
 </th>
 <th className="text-left px-4 py-3 text-aqua font-semibold border-b border-tech-500/20 w-[30%]">
 GitHub Copilot
 </th>
 <th className="text-left px-4 py-3 text-tech-400 font-semibold border-b border-tech-500/20 w-[15%]">
 Winner
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-tech-500/10">
 {section.items.map((row, i) => (
 <tr
 key={row.label}
 className={i % 2 === 0 ? 'bg-tech-900/40' : 'bg-tech-800/20'}
 >
 <td className="px-4 py-3 text-tech-200 font-medium">{row.label}</td>
 <td className="px-4 py-3 text-tech-300">{row.cursor}</td>
 <td className="px-4 py-3 text-tech-300">{row.copilot}</td>
 <td className="px-4 py-3">
 <WinnerBadge winner={row.winner} />
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </section>
 ))}

 {/* ─── Use Cases ─────────────────────────────────────────── */}
 <section id="usecases" className="mb-12 scroll-mt-20">
 <div className="flex items-center gap-3 mb-6">
 <Users className="w-6 h-6 text-neon" />
 <h2 className="text-2xl font-bold text-white">Use Cases — Who Wins What</h2>
 </div>

 <div className="space-y-4">
 {USE_CASES.map((uc) => (
 <div
 key={uc.title}
 className="rounded-xl bg-tech-800/40 border border-tech-500/20 p-6 hover:border-neon/30 transition"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
 <uc.icon className="w-5 h-5 text-neon-light" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-white mb-1">{uc.title}</h3>
 <p className="text-sm text-neon-light font-medium mb-2">{uc.verdict}</p>
 <p className="text-sm text-tech-300 leading-relaxed">{uc.details}</p>
 </div>
 <div className="shrink-0">
 <span
 className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
 uc.best === 'Cursor'
 ? 'bg-neon/10 text-neon-light border border-neon/30'
 : uc.best === 'Copilot'
 ? 'bg-aqua/10 text-aqua border border-aqua/30'
 : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
 }`}
 >
 {uc.best === 'Cursor' ? (
 <Zap className="w-3 h-3" />
 ) : uc.best === 'Copilot' ? (
 <Sparkles className="w-3 h-3" />
 ) : (
 <CheckCircle2 className="w-3 h-3" />
 )}
 {uc.best}
 </span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* ─── Recommendation ──────────────────────────────────────── */}
 <section id="recommendation" className="mb-12 scroll-mt-20">
 <div className="relative rounded-2xl bg-gradient-to-br from-neon/10 via-tech-800 to-aqua/5 border border-tech-500/30 p-8 sm:p-10 overflow-hidden">
 <div className="absolute inset-0 bg-tech-grid opacity-20" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
 <Shield className="w-3.5 h-3.5" />
 Our Take
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 Recommendation for Developers
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div className="rounded-xl bg-tech-800/60 border border-neon/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Zap className="w-5 h-5 text-neon-light" />
 <h3 className="text-base font-bold text-white">Choose Cursor if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Want autonomous agent mode — AI that reads, writes, runs, and debugs',
 'Need full-codebase awareness — not just open tabs',
 'Build full-stack features and want AI to scaffold everything',
 'Are a solo developer or prototyping quickly',
 'Don\'t mind switching to a VS Code-based editor',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-tech-200">
 <CheckCircle2 className="w-4 h-4 text-neon-light mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>

 <div className="rounded-xl bg-tech-800/60 border border-aqua/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-5 h-5 text-aqua" />
 <h3 className="text-base font-bold text-white">Choose Copilot if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Use multiple editors (VS Code, JetBrains, Neovim, Xcode)',
 'Work in a team that needs PR reviews and code review automation',
 'Need enterprise security — SSO, VPC, audit logs',
 'Want lower pricing ($10 vs $20/mo for individuals)',
 'Prefer the deep GitHub integration for your workflow',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-tech-200">
 <CheckCircle2 className="w-4 h-4 text-aqua mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Bottom line */}
 <div className="bg-tech-900/60 border border-tech-500/30 rounded-xl p-5">
 <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
 <Star className="w-5 h-5 text-yellow-400" />
 The Smartest Setup
 </h3>
 <p className="text-sm text-tech-200 leading-relaxed">
 For most developers in 2026, <strong className="text-neon-light">Cursor</strong> is
 the better primary IDE — its agent mode and codebase awareness make it significantly
 more productive than any extension-based tool. However, keep{' '}
 <strong className="text-aqua">GitHub Copilot</strong> as a secondary tool if your
 team uses JetBrains or Neovim, or if you need the GitHub PR review integration.
 Many dev teams use Cursor for daily coding and Copilot for code reviews and
 cross-editor compatibility.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* ─── FAQ ────────────────────────────────────────────────── */}
 <section id="faq" className="mb-12 scroll-mt-20">
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <MessageSquare className="w-6 h-6 text-neon" />
 Frequently Asked Questions
 </h2>

 <div className="space-y-3">
 {FAQS.map((faq, i) => (
 <details
 key={i}
 className="group rounded-xl bg-tech-800/40 border border-tech-500/20 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-white hover:text-neon-light transition list-none">
 {faq.q}
 <ChevronRight className="w-4 h-4 text-tech-400 group-open:rotate-90 transition shrink-0" />
 </summary>
 <div className="px-5 pb-4 text-sm text-tech-300 leading-relaxed border-t border-tech-500/10 pt-3">
 {faq.a}
 </div>
 </details>
 ))}
 </div>
 </section>

 {/* ─── Related CTA ───────────────────────────────────────── */}
 <section className="rounded-xl bg-tech-800/60 border border-dashed border-tech-500/30 p-8 text-center">
 <h2 className="text-xl font-bold text-white mb-2">Still choosing?</h2>
 <p className="text-sm text-tech-300 max-w-md mx-auto mb-4">
 Browse our full directory of AI coding tools with Asia-ready filters and editorial rankings.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-3">
 <Link
 href="/compare/chatgpt-vs-claude"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-tech-700 hover:bg-tech-600 border border-tech-500/40 text-tech-200 hover:text-white text-sm font-medium transition"
 >
 <Sparkles className="w-4 h-4" />
 ChatGPT vs Claude
 </Link>
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
 >
 Browse all AI tools
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 </section>

 {/* ─── JSON-LD FAQ Schema ───────────────────────────────── */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: FAQS.map((faq) => ({
 '@type': 'Question',
 name: faq.q,
 acceptedAnswer: {
 '@type': 'Answer',
 text: faq.a,
 },
 })),
 }),
 }}
 />
 </div>
 </div>
 );
}
