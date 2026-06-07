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
 Puzzle,
 GraduationCap,
 Layers,
 Pen,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'GitHub Copilot vs Codeium Windsurf 2026 — Pricing & Features Compared | Apifeny AI',
 description:
 'GitHub Copilot vs Codeium Windsurf head-to-head: pricing (Copilot $10/mo vs Windsurf $15/mo), models (GPT-4o vs Cascade), IDE support vs standalone IDE, agent mode, tab completion, multi-file editing — compare for developers in Asia.',
 keywords: [
 'GitHub Copilot vs Windsurf',
 'Copilot vs Codeium Windsurf',
 'Codeium Windsurf vs GitHub Copilot',
 'GitHub Copilot pricing',
 'Windsurf IDE pricing',
 'best AI coding assistant',
 'Copilot vs Windsurf for developers',
 'AI coding tools 2026',
 'GitHub Copilot review',
 'Codeium Windsurf review',
 'Copilot vs Windsurf comparison',
 'AI pair programming vs AI IDE',
 'Cascade vs Copilot agent',
 'Windsurf IDE vs Copilot extension',
 ],
 alternates: { canonical: `${BASE_URL}/compare/copilot-vs-windsurf` },
 openGraph: {
 title: 'GitHub Copilot vs Codeium Windsurf 2026 — Pricing & Features Compared',
 description:
 'Copilot $10/mo vs Windsurf $15/mo — AI models, agent mode, tab completion, IDE support, and multi-file editing. Which AI coding assistant wins for developers in 2026?',
 url: `${BASE_URL}/compare/copilot-vs-windsurf`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'GitHub Copilot vs Codeium Windsurf 2026 — Pricing & Features Compared',
 description:
 'Pricing ($10 vs $15/mo), AI models, agent mode, tab completion — which AI coding assistant wins?',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
 copilot: {
 coding: 8.5,
 tabCompletion: 9.0,
 speed: 9.0,
 contextAwareness: 7.5,
 pricing: 8.5,
 ecosystem: 9.5,
 agentMode: 6.0,
 },
 windsurf: {
 coding: 8.0,
 tabCompletion: 9.0,
 speed: 8.5,
 contextAwareness: 7.5,
 pricing: 9.0,
 ecosystem: 6.0,
 agentMode: 7.0,
 },
} as const;

const COMPARISON_ROWS = [
 {
 category: 'Pricing',
 icon: DollarSign,
 items: [
 {
 label: 'Free Tier',
 copilot: '⚠️ Limited. 2000 completions/mo + 50 chat requests (free tier). Free for OSS maintainers & verified students.',
 windsurf: '✅ Generous. Free tier with Cascade 50 requests/mo + unlimited completions.',
 winner: 'windsurf',
 },
 {
 label: 'Individual Plan',
 copilot: '$10/mo Individual · Unlimited completions & chat.',
 windsurf: '$15/mo Pro · Unlimited Cascade requests & premium models.',
 winner: 'copilot',
 },
 {
 label: 'Team / Business',
 copilot: '$19/mo per user Business · $39/mo Enterprise.',
 windsurf: '$30/mo per user Pro Ultimate · Team features, centralized billing.',
 winner: 'copilot',
 },
 {
 label: 'API / Usage Cap',
 copilot: 'Unlimited chat & completions (Individual). No hard caps — fully unlimited.',
 windsurf: 'Unlimited Cascade requests (Pro). Unlimited completions. No hard caps on premium flows.',
 winner: 'tie',
 },
 ],
 },
 {
 category: 'Coding & AI Models',
 icon: Code,
 items: [
 {
 label: 'Default Model',
 copilot: 'GPT-4o, Claude 3.5 Sonnet, Copilot model (fine-tuned Codex). Model routing by task.',
 windsurf: 'Codeium Cascade — GPT-4o, Claude Sonnet, Gemini, custom Codeium models.',
 winner: 'copilot',
 },
 {
 label: 'Code Generation',
 copilot: '⭐ Excellent. Deep GitHub integration — learns from your repos & pull requests.',
 windsurf: 'Very good. Cascade generates accurate code with deep context awareness across the codebase.',
 winner: 'copilot',
 },
 {
 label: 'Tab Autocomplete',
 copilot: '⭐ Best-in-class. Single & multi-line ghost text is instant. Most mature autocomplete in the industry.',
 windsurf: '⭐ Excellent. Industry-best anticipative AI — predicts multi-line edits before you type them.',
 winner: 'tie',
 },
 {
 label: 'Multi-File Editing',
 copilot: '⚠️ Limited. Can suggest changes across files via Copilot Workspace (preview). Not native.',
 windsurf: '✅ Good. Cascade can edit multiple files with context understanding across the codebase.',
 winner: 'windsurf',
 },
 {
 label: 'Code Quality Score',
 copilot: '8.5 / 10',
 windsurf: '8.0 / 10',
 winner: 'copilot',
 },
 ],
 },
 {
 category: 'IDE & Editor Support',
 icon: Monitor,
 items: [
 {
 label: 'Native Editor',
 copilot: 'Works as an extension — no editor switch needed. Supports VS Code, JetBrains, Neovim, and more.',
 windsurf: 'Standalone IDE (VS Code fork). Must switch to the Windsurf app.',
 winner: 'copilot',
 },
 {
 label: 'VS Code Support',
 copilot: '✅ Native. Deepest integration, first-class citizen. Works as an extension.',
 windsurf: '✅ Full. Built on VS Code, same extensions & themes work. But it\'s a separate application.',
 winner: 'copilot',
 },
 {
 label: 'JetBrains Support',
 copilot: '✅ Full plugin for IntelliJ, PyCharm, WebStorm, GoLand, and all JetBrains IDEs.',
 windsurf: '❌ Not available. Must use Windsurf IDE (VS Code fork).',
 winner: 'copilot',
 },
 {
 label: 'Neovim / Vim',
 copilot: '✅ Official Neovim plugin + Vim/Neovim community plugins.',
 windsurf: '❌ No native support. VS Code keybindings only within Windsurf IDE.',
 winner: 'copilot',
 },
 {
 label: 'Other Editors',
 copilot: '✅ Xcode (via Copilot for Xcode), Visual Studio, Azure Data Studio, RStudio.',
 windsurf: '❌ Windsurf IDE only (VS Code fork, no standalone extension or external editor support).',
 winner: 'copilot',
 },
 ],
 },
 {
 category: 'Agent Mode & Automation',
 icon: Brain,
 items: [
 {
 label: 'Agent / Cascade Mode',
 copilot: '⚠️ Partial. Copilot Workspace (preview) — limited autonomous capabilities. No full agent mode.',
 windsurf: '✅ Good. Cascade can read files, edit, run terminal commands. Less mature than Cursor Agent but more than Copilot.',
 winner: 'windsurf',
 },
 {
 label: 'Autonomous Debugging',
 copilot: '❌ Not available. Inline suggestions, chat-based debugging. No autonomous debugging loop.',
 windsurf: '✅ Basic. Cascade can identify issues, suggest fixes, and apply them.',
 winner: 'windsurf',
 },
 {
 label: 'Terminal Integration',
 copilot: '❌ No terminal integration. Chat-based suggestions for commands.',
 windsurf: '✅ Cascade can run terminal commands directly. Limited autonomy compared to Cursor.',
 winner: 'windsurf',
 },
 {
 label: 'Git Integration',
 copilot: '⭐ Excellent. Generates PR descriptions, reviews PRs, sees git history, automated PR reviews.',
 windsurf: 'Basic. Can make changes but no automated git workflow within Cascade.',
 winner: 'copilot',
 },
 ],
 },
 {
 category: 'Context & Codebase Awareness',
 icon: Layers,
 items: [
 {
 label: 'Context Window',
 copilot: 'Open tabs + @file mentions + @workspace. Good but doesn\'t index the full codebase by default.',
 windsurf: 'Full-codebase awareness. Cascade indexes entire project context automatically.',
 winner: 'windsurf',
 },
 {
 label: 'Codebase Indexing',
 copilot: 'Indexes the open workspace. Context retrieval via @workspace in chat.',
 windsurf: '⭐ Indexes entire project. Cascade sees all files, not just open tabs.',
 winner: 'windsurf',
 },
 {
 label: 'Inline Editing (Cmd+K)',
 copilot: '✅ Ctrl+I — inline suggestions, edit with natural language. Applies directly in-editor.',
 windsurf: '✅ Cmd+I — inline editing with Cascade. Describe change, see diff, apply or reject.',
 winner: 'tie',
 },
 {
 label: 'Chat Interface',
 copilot: 'Sidebar chat + inline. Supports @file/@workspace/@vscode for context. More manual context selection.',
 windsurf: 'Sidebar + inline Cascade chat. References full codebase context automatically.',
 winner: 'windsurf',
 },
 ],
 },
 {
 category: 'Security & Privacy',
 icon: Lock,
 items: [
 {
 label: 'Data Training Opt-Out',
 copilot: '✅ Free for public repos. Paid plans: data not used for training. Opt-out available for Enterprise.',
 windsurf: '✅ Business plan: opt-out available. Pro: data used for training by default.',
 winner: 'copilot',
 },
 {
 label: 'Self-Hosted / VPC',
 copilot: '✅ GitHub Enterprise — self-hosted or VPC deployment available for regulated industries.',
 windsurf: '❌ No self-hosted option. Cloud-only (Codeium servers).',
 winner: 'copilot',
 },
 {
 label: 'Code Snippet Storage',
 copilot: 'Stores snippets for telemetry. Can disable telemetry collection in settings.',
 windsurf: 'Stores snippets for context. Indexes local codebase on device.',
 winner: 'tie',
 },
 {
 label: 'IP Indemnification',
 copilot: '✅ Included for paid plans (Individual, Business, Enterprise).',
 windsurf: '✅ Included for Pro and Business plans.',
 winner: 'tie',
 },
 ],
 },
 {
 category: 'Extensions & Ecosystem',
 icon: Puzzle,
 items: [
 {
 label: 'VS Code Extensions',
 copilot: '✅ Works within any VS Code setup. All VS Code extensions compatible since it\'s an extension itself.',
 windsurf: '✅ Full VS Code extension compatibility. Most extensions work in Windsurf IDE.',
 winner: 'copilot',
 },
 {
 label: 'Built-in Features',
 copilot: 'Inline chat, sidebar chat, completions, code review, PR summaries, Copilot Workspace.',
 windsurf: 'Cascade agent, terminal, git, multi-file editing — all built into the IDE.',
 winner: 'windsurf',
 },
 {
 label: 'GitHub Integration',
 copilot: '⭐ Deepest possible integration. PRs, issues, Actions, code review — all native.',
 windsurf: 'Good Git integration through the IDE. No special GitHub integration beyond standard VS Code Git tools.',
 winner: 'copilot',
 },
 {
 label: 'Community & Resources',
 copilot: '⭐ Largest community. Millions of developers. Extensive documentation in multiple languages including Asian languages.',
 windsurf: 'Growing community. Smaller than Copilot but active. Primarily English documentation.',
 winner: 'copilot',
 },
 ],
 },
 {
 category: 'Learning Curve',
 icon: GraduationCap,
 items: [
 {
 label: 'Onboarding',
 copilot: '⭐ Seamless. Install extension, sign in, start coding. No editor switch, no new workflow to learn.',
 windsurf: 'Good. Cascade is intuitive but requires switching to a new IDE. Settings, extensions, and keybindings transfer from VS Code.',
 winner: 'copilot',
 },
 {
 label: 'Documentation',
 copilot: '⭐ Excellent. Extensive docs, GitHub Learning Lab, tutorials, community forums — available in multiple languages.',
 windsurf: 'Good documentation. Growing but smaller than Copilot\'s. Primarily in English.',
 winner: 'copilot',
 },
 {
 label: 'Migration Effort',
 copilot: '⭐ Zero effort — install an extension and keep using your existing editor as-is.',
 windsurf: 'Low effort — VS Code settings, extensions, and themes transfer over, but you must use a new application.',
 winner: 'copilot',
 },
 ],
 },
];

const USE_CASES = [
 {
 icon: Monitor,
 title: 'Multi-Editor Development Teams',
 verdict: 'Copilot wins — works in every major editor, no IDE lock-in.',
 details:
 'If your team uses a mix of VS Code, JetBrains, Neovim, and Xcode, Copilot is the only choice that works everywhere. Windsurf locks you into its own IDE. For organisations with diverse editor preferences or legacy JetBrains workflows, Copilot\'s editor-agnostic approach is indispensable.',
 best: 'Copilot',
 },
 {
 icon: Zap,
 title: 'Tab Completion Speed',
 verdict: 'Tie — both best-in-class for different reasons.',
 details:
 'Copilot\'s ghost text autocomplete is the most mature in the industry — instant single and multi-line suggestions with deep GitHub context. Windsurf\'s anticipative AI is equally fast but more proactive, predicting multi-line edits before you finish typing. For daily typing speed, you won\'t lose either way. Windsurf has a slight edge for anticipative multi-line prediction.',
 best: 'Tie',
 },
 {
 icon: Brain,
 title: 'Agentic / Autonomous Coding',
 verdict: 'Windsurf wins — Cascade agent mode exists; Copilot lacks a true agent.',
 details:
 'Windsurf\'s Cascade can read files, edit code across multiple files, and run terminal commands autonomously. GitHub Copilot has no equivalent — Copilot Workspace is still in preview and far less autonomous. For developers who want an AI agent that performs multi-step tasks, Windsurf is the clear winner between these two.',
 best: 'Windsurf',
 },
 {
 icon: DollarSign,
 title: 'Budget-Conscious Individuals',
 verdict: 'Copilot wins — $10/mo is 33% cheaper than Windsurf\'s $15/mo Pro.',
 details:
 'At $10/mo for Individual, Copilot is significantly cheaper than Windsurf Pro at $15/mo. For freelancers and individual developers in price-sensitive markets like Southeast Asia, that $5/month difference ($60/year) adds up. Copilot also offers a generous free tier for OSS maintainers and students.',
 best: 'Copilot',
 },
 {
 icon: Shield,
 title: 'Enterprise & Regulated Industries',
 verdict: 'Copilot wins — VPC deployment, SSO, audit logs, and enterprise-grade security.',
 details:
 'GitHub Copilot Enterprise offers self-hosted/VPC deployment, SAML/SSO, audit logs, and IP indemnification — essential for regulated industries (finance, healthcare, government). Windsurf\'s Business plan has basic security features but no self-hosted option. For enterprise compliance, Copilot is the only choice.',
 best: 'Copilot',
 },
 {
 icon: Layers,
 title: 'Full-Context / Multi-File Development',
 verdict: 'Windsurf wins — full-codebase indexing and multi-file editing.',
 details:
 'Windsurf\'s Cascade indexes the entire project and can edit multiple files with cross-file context awareness. Copilot primarily works with open tabs and requires manual @file/@workspace references. For large codebases where understanding the full project structure is critical, Windsurf provides a superior contextual experience.',
 best: 'Windsurf',
 },
];

const WHO_CHOOSE = {
 copilot: [
 'Use multiple editors (VS Code, JetBrains, Neovim, Xcode, Visual Studio) and don\'t want to switch',
 'Work in a team that needs GitHub PR reviews, code review automation, and GitHub integration',
 'Need enterprise-grade security — SSO, VPC deployment, audit logs for compliance',
 'Want the most affordable option ($10/mo Individual) with a proven OSS maintainer free tier',
 'Prefer zero migration effort — install an extension and keep your existing editor',
 'Develop in Java, C#, or other JetBrains-centric languages where Windsurf has no support',
 'Need documentation and community resources in Asian languages (Chinese, Japanese, Korean)',
 ],
 windsurf: [
 'Want an AI agent that can autonomously read, edit, and run code across multiple files',
 'Need full-codebase indexing — not just open tabs — for context-aware suggestions',
 'Build full-stack features and want an AI that understands your entire project structure',
 'Value blazing-fast anticipative tab completion that predicts multi-line edits',
 'Are willing to switch to a new IDE (VS Code-based, so extensions transfer) for deeper AI integration',
 'Work primarily in TypeScript, Python, Go, Rust, or other VS Code-friendly ecosystems',
 'Want a more generous free tier with 50 Cascade requests + unlimited completions to start',
 ],
};

const FAQS = [
 {
 q: 'Which is better: GitHub Copilot or Codeium Windsurf?',
 a: 'It depends on your workflow. GitHub Copilot wins on editor support (works everywhere: VS Code, JetBrains, Neovim), pricing ($10/mo Individual), and enterprise security (VPC, SSO). Codeium Windsurf wins on agentic capabilities (Cascade agent mode), codebase awareness (full indexing), and multi-file editing. Choose Copilot if you want a zero-friction extension; choose Windsurf if you want an AI-native IDE with an autonomous agent.',
 },
 {
 q: 'Is Windsurf better than GitHub Copilot for coding?',
 a: 'For basic code completion, both are excellent — nearly tied. For autonomous agentic workflows (reading, editing, and running code across multiple files), Windsurf\'s Cascade has the edge since Copilot lacks a true agent mode. However, Copilot generates higher-quality code on average thanks to its deep GitHub training data and fine-tuned Codex model.',
 },
 {
 q: 'Can I use GitHub Copilot inside Windsurf IDE?',
 a: 'Technically yes — since Windsurf is a VS Code fork, you can install the Copilot extension in Windsurf. However, this is not officially supported by either Codeium or GitHub, and using both AI systems simultaneously can cause conflicts with autocomplete suggestions. Most developers pick one or the other.',
 },
 {
 q: 'Does Windsurf have a free tier?',
 a: 'Yes, Windsurf has a generous free tier with unlimited basic completions and 50 Cascade requests per month. The Pro plan is $15/month. GitHub Copilot is also free for verified students, teachers, and maintainers of popular open-source projects. For everyone else, Copilot Individual is $10/month.',
 },
 {
 q: 'Which works better for JetBrains users?',
 a: 'GitHub Copilot, without question. It has a full-featured plugin for IntelliJ IDEA, PyCharm, WebStorm, GoLand, and all JetBrains IDEs. Windsurf is a standalone IDE (VS Code fork) with no JetBrains support. If you\'re a JetBrains user, Copilot is your only option between these two.',
 },
 {
 q: 'Should I use both GitHub Copilot and Windsurf?',
 a: 'Some developers use Copilot as their universal AI assistant across editors, and Windsurf as their primary IDE for deep work. This gives you the best of both worlds — Copilot\'s versatility and Windsurf\'s agent mode. However, for most developers, picking one as your primary tool is more practical to avoid context switching and conflicting suggestions.',
 },
 {
 q: 'Is Windsurf Cascade as good as Cursor Agent?',
 a: 'Not quite. Cursor\'s Agent mode is more mature and autonomous — it debugs, runs tests, applies fixes, and commits. Windsurf\'s Cascade is capable but less autonomous. However, Cascade is still significantly more capable than Copilot\'s agent capabilities (which are essentially non-existent as of 2026). Windsurf sits between Copilot and Cursor in terms of agent maturity.',
 },
 {
 q: 'Which has better support for Asian languages?',
 a: 'GitHub Copilot has the edge due to its massive community and extensive documentation available in Chinese, Japanese, Korean, and other Asian languages. GitHub\'s localization is industry-leading. Windsurf\'s documentation is primarily English. For code generation in Asian languages, both perform comparably since they use similar underlying models (GPT-4o, Claude).',
 },
 {
 q: 'Does GitHub Copilot support multi-file editing like Windsurf?',
 a: 'Not natively. GitHub Copilot\'s primary workflow is single-file completion and chat. Copilot Workspace (in preview) can suggest changes across multiple files, but it\'s not as seamless as Windsurf\'s Cascade, which naturally edits multiple files with full project context. For multi-file refactoring, Windsurf has the advantage.',
 },
 {
 q: 'Which tool is better for a solo developer building a startup MVP?',
 a: 'For solo developers building MVPs, Windsurf is often the better choice if you\'re willing to switch to its IDE. The Cascade agent mode can scaffold features across multiple files, run terminal commands, and debug issues — accelerating the build loop significantly. However, if you prefer to stay in your existing editor and want the most affordable option, Copilot at $10/mo is hard to beat.',
 },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function ScoreBar({ score, label }: { score: number; label: string }) {
 const color =
 score >= 9 ? 'bg-neon' : score >= 7.5 ? 'bg-aqua' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500';
 return (
 <div className="flex items-center gap-3">
 <span className="text-xs text-gray-400 w-24 shrink-0">{label}</span>
 <div className="flex-1 h-2.5 rounded-full bg-white overflow-hidden">
 <div
 className={`h-full rounded-full transition-all ${color}`}
 style={{ width: `${score * 10}%` }}
 />
 </div>
 <span className="text-xs font-mono text-gray-600 w-8 text-right">{score.toFixed(1)}</span>
 </div>
 );
}

function WinnerBadge({ winner }: { winner: string }) {
 if (winner === 'copilot') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-aqua bg-aqua/10 px-2 py-0.5 rounded-full">
 <Sparkles className="w-3 h-3" />
 Copilot
 </span>
 );
 }
 if (winner === 'windsurf') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
 <Zap className="w-3 h-3" />
 Windsurf
 </span>
 );
 }
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
 Tie
 </span>
 );
}

export default function CopilotVsWindsurfCompare() {
 return (
 <div className="min-h-screen bg-white">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Compare', item: '/compare' },
 { name: 'Copilot vs Windsurf', item: '/compare/copilot-vs-windsurf' },
 ]}
 />

 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Back link */}
 <Link
 href="/tools"
 className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-neon-light transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Back to Tools
 </Link>

 {/* ─── Hero ─────────────────────────────────────────────── */}
 <section className="relative mb-12">
 <div className="relative rounded-2xl bg-gradient-to-br from-aqua/10 via-cyan-500/5 to-tech-800 border border-gray-200 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua/10 border border-aqua/20 text-aqua text-xs font-medium mb-4">
 <Star className="w-3.5 h-3.5" />
 Head-to-Head Comparison
 </div>
 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
 GitHub Copilot vs Codeium Windsurf{' '}
 <span className="bg-gradient-to-r from-aqua to-cyan-400 bg-clip-text text-transparent">
 2026
 </span>
 </h1>
 <p className="text-sm sm:text-base text-gray-800/70 max-w-2xl mb-6">
 Two fundamentally different approaches to AI-assisted coding collide. GitHub Copilot —
 the industry-standard AI pair programmer that works inside your existing editor. And
 Codeium Windsurf — a custom-built AI-native IDE with an autonomous agent. We compare
 pricing, AI models, tab completion, agent capabilities, editor support, security, and
 what each means for developers building in Asia.
 </p>

 {/* Quick stat pills */}
 <div className="flex flex-wrap gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 <span className="text-aqua font-semibold">Copilot</span> — $10/mo Indiv · $19/mo Business
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 <span className="text-cyan-400 font-semibold">Windsurf</span> — $15/mo Pro · $35/mo Pro Ultimate
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 Copilot wins: Editor support + pricing + ecosystem
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 Windsurf wins: Agent mode + codebase awareness + multi-file edits
 </div>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─────────────────────────────────── */}
 <section className="mb-12">
 <div className="bg-gray-50/40 border border-gray-200 rounded-xl p-6">
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
 { href: '#agent', label: 'Agent Mode & Automation' },
 { href: '#context', label: 'Context & Codebase Awareness' },
 { href: '#security', label: 'Security & Privacy' },
 { href: '#extensions', label: 'Extensions & Ecosystem' },
 { href: '#learning', label: 'Learning Curve' },
 { href: '#usecases', label: 'Use Cases — Who Wins What' },
 { href: '#recommendation', label: 'Recommendation · Who Should Choose What' },
 { href: '#faq', label: 'FAQ' },
 ].map((item) => (
 <a
 key={item.href}
 href={item.href}
 className="flex items-center gap-2 text-sm text-gray-600 hover:text-neon-light transition px-3 py-2 rounded-lg hover:bg-white/40"
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
 {/* Copilot */}
 <div className="rounded-xl bg-gray-50/50 border border-aqua/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-aqua/20 flex items-center justify-center">
 <Sparkles className="w-5 h-5 text-aqua" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">GitHub Copilot</h3>
 <p className="text-xs text-gray-400">GPT-4o + Codex Fine-Tuned</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.copilot.coding} label="Coding Quality" />
 <ScoreBar score={VERDICT_SCORES.copilot.tabCompletion} label="Tab Completion" />
 <ScoreBar score={VERDICT_SCORES.copilot.speed} label="Speed" />
 <ScoreBar score={VERDICT_SCORES.copilot.contextAwareness} label="Context Awareness" />
 <ScoreBar score={VERDICT_SCORES.copilot.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.copilot.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.copilot.agentMode} label="Agent Mode" />
 </div>
 </div>

 {/* Windsurf */}
 <div className="rounded-xl bg-gray-50/50 border border-cyan-500/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
 <Zap className="w-5 h-5 text-cyan-400" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">Codeium Windsurf</h3>
 <p className="text-xs text-gray-400">Codeium Cascade · GPT-4o + Claude + Gemini</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.windsurf.coding} label="Coding Quality" />
 <ScoreBar score={VERDICT_SCORES.windsurf.tabCompletion} label="Tab Completion" />
 <ScoreBar score={VERDICT_SCORES.windsurf.speed} label="Speed" />
 <ScoreBar score={VERDICT_SCORES.windsurf.contextAwareness} label="Context Awareness" />
 <ScoreBar score={VERDICT_SCORES.windsurf.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.windsurf.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.windsurf.agentMode} label="Agent Mode" />
 </div>
 </div>
 </div>

 <div className="mt-6 p-4 rounded-lg bg-gray-50/30 border border-gray-200">
 <p className="text-sm text-gray-700 text-center">
 <strong className="text-aqua">Copilot</strong> wins on: coding quality, speed, ecosystem, pricing (individual) ·{' '}
 <strong className="text-cyan-400">Windsurf</strong> wins on: tab completion (tie), agent mode, codebase awareness ·{' '}
 <strong className="text-white">Tie</strong> on: pricing (free tier), autocomplete speed
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
 : section.category === 'Agent Mode & Automation'
 ? 'agent'
 : section.category === 'Context & Codebase Awareness'
 ? 'context'
 : section.category === 'Security & Privacy'
 ? 'security'
 : section.category === 'Extensions & Ecosystem'
 ? 'extensions'
 : section.category === 'Learning Curve'
 ? 'learning'
 : section.category.toLowerCase()
 }
 className="mb-12 scroll-mt-20"
 >
 <div className="flex items-center gap-3 mb-6">
 <section.icon className="w-6 h-6 text-neon" />
 <h2 className="text-2xl font-bold text-white">{section.category}</h2>
 </div>

 <div className="overflow-x-auto rounded-xl border border-gray-200">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-gray-50/80">
 <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200 w-[25%]">
 Aspect
 </th>
 <th className="text-left px-4 py-3 text-aqua font-semibold border-b border-gray-200 w-[30%]">
 GitHub Copilot
 </th>
 <th className="text-left px-4 py-3 text-cyan-400 font-semibold border-b border-gray-200 w-[30%]">
 Codeium Windsurf
 </th>
 <th className="text-left px-4 py-3 text-gray-400 font-semibold border-b border-gray-200 w-[15%]">
 Winner
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-tech-500/10">
 {section.items.map((row, i) => (
 <tr
 key={row.label}
 className={i % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/20'}
 >
 <td className="px-4 py-3 text-gray-700 font-medium">{row.label}</td>
 <td className="px-4 py-3 text-gray-600">{row.copilot}</td>
 <td className="px-4 py-3 text-gray-600">{row.windsurf}</td>
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
 className="rounded-xl bg-gray-50/40 border border-gray-200 p-6 hover:border-neon/30 transition"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
 <uc.icon className="w-5 h-5 text-neon-light" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-white mb-1">{uc.title}</h3>
 <p className="text-sm text-neon-light font-medium mb-2">{uc.verdict}</p>
 <p className="text-sm text-gray-600 leading-relaxed">{uc.details}</p>
 </div>
 <div className="shrink-0">
 <span
 className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
 uc.best === 'Copilot'
 ? 'bg-aqua/10 text-aqua border border-aqua/30'
 : uc.best === 'Windsurf'
 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
 : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
 }`}
 >
 {uc.best === 'Copilot' ? (
 <Sparkles className="w-3 h-3" />
 ) : uc.best === 'Windsurf' ? (
 <Zap className="w-3 h-3" />
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

 {/* ─── Recommendation — Who Should Choose What ───────────── */}
 <section id="recommendation" className="mb-12 scroll-mt-20">
 <div className="relative rounded-2xl bg-gradient-to-br from-aqua/10 via-tech-800 to-cyan-500/5 border border-gray-200 p-8 sm:p-10 overflow-hidden">
 <div className="absolute inset-0 bg-gray-50 opacity-20" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
 <Shield className="w-3.5 h-3.5" />
 Our Recommendation
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 Who Should Choose What
 </h2>

 {/* Who Should Choose Copilot */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div className="rounded-xl bg-gray-50/60 border border-aqua/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-5 h-5 text-aqua" />
 <h3 className="text-base font-bold text-white">Choose GitHub Copilot if you:</h3>
 </div>
 <ul className="space-y-2">
 {WHO_CHOOSE.copilot.map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
 <CheckCircle2 className="w-4 h-4 text-aqua mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>

 {/* Who Should Choose Windsurf */}
 <div className="rounded-xl bg-gray-50/60 border border-cyan-500/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Zap className="w-5 h-5 text-cyan-400" />
 <h3 className="text-base font-bold text-white">Choose Codeium Windsurf if you:</h3>
 </div>
 <ul className="space-y-2">
 {WHO_CHOOSE.windsurf.map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
 <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Bottom line */}
 <div className="bg-white/60 border border-gray-200 rounded-xl p-5">
 <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
 <Star className="w-5 h-5 text-yellow-400" />
 The Verdict
 </h3>
 <p className="text-sm text-gray-700 leading-relaxed">
 These two tools serve fundamentally different developer profiles.{' '}
 <strong className="text-aqua">GitHub Copilot</strong> is the safe, universal choice —
 it works everywhere, costs less for individuals, and integrates deeply with GitHub.
 It&apos;s the best option for teams, enterprises, and developers who value editor
 flexibility above all else.{' '}
 <strong className="text-cyan-400">Codeium Windsurf</strong> is the right choice for
 developers who want to embrace an AI-native IDE with an autonomous agent (Cascade),
 full-codebase context awareness, and multi-file editing capabilities. For most VS
 Code-centric developers building full-stack apps, Windsurf offers a more powerful
 AI experience — but the IDE lock-in is a real trade-off.
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
 className="group rounded-xl bg-gray-50/40 border border-gray-200 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-white hover:text-neon-light transition list-none">
 {faq.q}
 <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition shrink-0" />
 </summary>
 <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-3">
 {faq.a}
 </div>
 </details>
 ))}
 </div>
 </section>

 {/* ─── Related CTA ───────────────────────────────────────── */}
 <section className="rounded-xl bg-gray-50/60 border border-dashed border-gray-200 p-8 text-center">
 <h2 className="text-xl font-bold text-white mb-2">Still choosing?</h2>
 <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">
 Browse our full directory of AI coding tools with Asia-ready filters and editorial rankings.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-3">
 <Link
 href="/compare/windsurf-vs-cursor"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-white text-sm font-medium transition"
 >
 <Zap className="w-4 h-4" />
 Windsurf vs Cursor
 </Link>
 <Link
 href="/compare/cursor-vs-copilot"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-white text-sm font-medium transition"
 >
 <Sparkles className="w-4 h-4" />
 Cursor vs Copilot
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
