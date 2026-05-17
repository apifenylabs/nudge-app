'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  CheckCircle,
  BookOpen,
  Users,
  Target,
  Zap,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  Sparkles,
  Lightbulb,
  ChevronRight,
  ShoppingCart,
  FileText,
  Rocket,
  Brain,
  Bot,
  Search as SearchIcon,
  BarChart3,
  Globe,
  Repeat,
  Gauge,
  Layers,
  Workflow,
  Puzzle,
  Timer,
} from 'lucide-react';

// ─── Section Breakdown ──────────────────────────────────────

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const sections: Section[] = [
  {
    id: 'mapping',
    icon: <Layers className="w-5 h-5 text-violet-400" />,
    title: 'Workflow Mapping & Diagnosis',
    description: 'Systematically audit your current workflows to identify the highest-ROI automation opportunities. Learn how to spot bottlenecks, quantify time waste, and prioritize what to automate first.',
    items: [
      'The 3-step workflow audit: capture → categorize → prioritize',
      'How to calculate the "automation ROI score" for every task',
      'Identifying high-frequency, low-cognition tasks (your automation sweet spot)',
      'Mapping decision trees vs. repeatable processes — choose the right automation strategy',
      'The 80/20 rule of workflow automation: which 20% of tasks deliver 80% of time savings',
      'Setting up a "never automate this" list: tasks that need human judgment',
    ],
  },
  {
    id: 'stack',
    icon: <Puzzle className="w-5 h-5 text-cyan-400" />,
    title: 'Building Your Automation Stack',
    description: 'Select and configure the right tools for every layer of your automation pipeline. From no-code connectors to AI agents — build a stack that works together seamlessly.',
    items: [
      'The 5-layer automation stack: trigger → process → AI → action → log',
      'Zapier vs Make vs n8n — which automation backbone fits your scale',
      'AI agent selection: when to use ChatGPT vs Claude vs Gemini vs custom agents',
      'Building a unified inbox: consolidate Slack, email, Notion, and tasks into one AI-managed feed',
      'Database and API integration patterns for non-technical setups',
      'Cost optimization: running a complete automation stack for under $100/month',
    ],
  },
  {
    id: 'content',
    icon: <Repeat className="w-5 h-5 text-emerald-400" />,
    title: 'Content & Marketing Automation',
    description: 'Build a fully automated content engine that researches, writes, edits, schedules, and distributes across all your channels without manual intervention.',
    items: [
      'The AI content pipeline: research → outline → draft → edit → publish → distribute',
      'Setting up RSS + AI monitoring for automated competitor and trend analysis',
      'Automated social media scheduling with AI-generated variations per platform',
      'Email newsletter automation from curation to send with AI personalization',
      'SEO content clusters: auto-generating topic clusters with internal linking',
      'Repurposing engine: one long-form piece → 20+ social posts, 3 emails, 1 video script',
      'Performance tracking loop: auto-analyze content metrics and optimize next batch',
    ],
  },
  {
    id: 'business',
    icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
    title: 'Business Process Automation',
    description: 'Automate the operational backbone of your business — customer support, lead management, invoicing, reporting, and project management.',
    items: [
      'AI customer support triage: auto-categorize, respond, and escalate with context',
      'Lead scoring and nurturing automation: from inquiry to qualified pipeline',
      'Automated invoicing, expense tracking, and financial reporting',
      'Project management auto-updates: AI generates daily standups from Slack messages',
      'Meeting intelligence: auto-capture, summarize, and action-item extraction',
      'HR and onboarding automation for solo teams and micro-agencies',
      'Compliance and data retention auto-enforcement for privacy regulations',
    ],
  },
  {
    id: 'agentic',
    icon: <Bot className="w-5 h-5 text-fuchsia-400" />,
    title: 'AI Agent Workflows & Orchestration',
    description: 'Design and deploy multi-agent systems where AI agents collaborate on complex workflows. From research teams to code review squads — build your own agent orchestra.',
    items: [
      'Single-agent vs. multi-agent architectures: when to use each',
      'Designing agent roles: researcher, writer, reviewer, approver — with handoff protocols',
      'Building a research agent that fetches, analyzes, and summarizes from multiple sources',
      'Creating a content review pipeline with editor and fact-checker agents',
      'Agent memory and context management: how to handle long-running workflows',
      'Error handling and human-in-the-loop: when agents should pause and ask',
      'Monitoring agent performance: logging, metrics, and continuous improvement',
    ],
  },
  {
    id: 'qa',
    icon: <Gauge className="w-5 h-5 text-rose-400" />,
    title: 'Testing, Monitoring & Scaling',
    description: 'Ensure your automations run reliably at scale. Build monitoring dashboards, handle failures gracefully, and optimize for cost and performance.',
    items: [
      'Setting up automation health checks and failure alerts',
      'Cost tracking per workflow: know exactly what each automation spends in API calls',
      'A/B testing automation variants to optimize for speed and quality',
      'Scaling patterns: from personal automations to team-wide workflows',
      'Security best practices: API key management, access controls, audit logs',
      'When to migrate from no-code to custom code for performance wins',
      'Disaster recovery: backup automation configs and recreate after failures',
    ],
  },
  {
    id: 'playbook',
    icon: <FileText className="w-5 h-5 text-sky-400" />,
    title: '7 Complete Automation Playbooks',
    description: 'Ready-to-deploy automation recipes you can set up in under an hour. Each includes the exact tool config, prompts, and trigger settings.',
    items: [
      'Playbook 1: Morning intelligence digest — AI curates your industry news before you wake',
      'Playbook 2: Client onboarding auto-pilot — from contract to kickoff, zero manual steps',
      'Playbook 3: Social media content factory — research → create → schedule → analyze',
      'Playbook 4: Customer feedback loop — collect → analyze → respond → improve',
      'Playbook 5: Invoice-to-payment tracker — send → remind → reconcile → report',
      'Playbook 6: Code review assistant — auto-review PRs with AI context from your codebase',
      'Playbook 7: Personal CRM — auto-log every interaction, follow up at perfect timing',
    ],
  },
];

// ─── Who This Is For ────────────────────────────────────────

interface Persona {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  subtext: string;
}

const whoItsFor: Persona[] = [
  {
    icon: Zap,
    text: 'Solopreneurs & Indie Hackers',
    subtext: 'Run a 1-person business with enterprise-level automation. Eliminate the busywork.',
  },
  {
    icon: Users,
    text: 'Small Team Leaders',
    subtext: 'Automate repetitive workflows so your small team focuses on creative and strategic work.',
  },
  {
    icon: Brain,
    text: 'Operations & Productivity Managers',
    subtext: 'Design and deploy automated systems that scale without adding headcount.',
  },
  {
    icon: Bot,
    text: 'AI Enthusiasts & Tinkerers',
    subtext: 'Go beyond single AI tools — build multi-agent systems that collaborate autonomously.',
  },
];

// ─── What You'll Learn ─────────────────────────────────────

interface LearningOutcome {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  subtext: string;
}

const whatYoullLearn: LearningOutcome[] = [
  {
    icon: SearchIcon,
    text: 'Audit Your Workflows',
    subtext: 'Find the 20% of tasks giving 80% time savings',
  },
  {
    icon: Layers,
    text: 'Build Your Stack',
    subtext: 'Choose the right tools for every automation layer',
  },
  {
    icon: Repeat,
    text: 'Automate Content',
    subtext: 'End-to-end content pipeline from research to publish',
  },
  {
    icon: Bot,
    text: 'Deploy AI Agents',
    subtext: 'Design multi-agent systems for complex workflows',
  },
  {
    icon: Gauge,
    text: 'Monitor & Scale',
    subtext: 'Keep automations running reliably at any scale',
  },
  {
    icon: FileText,
    text: '7 Ready Playbooks',
    subtext: 'Pre-built automation recipes deployable in 1 hour',
  },
  {
    icon: Timer,
    text: 'Save 20+ Hours/Week',
    subtext: 'Reclaim your time for high-value creative work',
  },
  {
    icon: DollarSign,
    text: 'Cut Tool Costs',
    subtext: 'Run a complete stack for under $100/month',
  },
];

// ─── Tools Covered ──────────────────────────────────────────

interface ToolItem {
  name: string;
  category: string;
}

const toolsCovered: ToolItem[] = [
  { name: 'ChatGPT (GPT-4o)', category: 'AI Core' },
  { name: 'Claude (Sonnet/Opus)', category: 'AI Core' },
  { name: 'Zapier', category: 'Automation' },
  { name: 'Make (formerly Integromat)', category: 'Automation' },
  { name: 'n8n', category: 'Automation' },
  { name: 'Notion AI', category: 'Productivity' },
  { name: 'Perplexity', category: 'Research' },
  { name: 'Gemini', category: 'AI Core' },
  { name: 'Cursor', category: 'Coding' },
  { name: 'GitHub Copilot', category: 'Coding' },
  { name: 'Slack AI', category: 'Communication' },
  { name: 'Gmail AI + Apps Script', category: 'Email' },
  { name: 'Airtable + AI', category: 'Database' },
  { name: 'Calendly + AI', category: 'Scheduling' },
  { name: 'Typeform + AI', category: 'Forms' },
  { name: 'OpenAI Assistants API', category: 'Custom AI' },
  { name: 'LangChain/LangGraph', category: 'Agent Framework' },
  { name: 'ElevenLabs', category: 'Voice AI' },
  { name: 'HeyGen', category: 'Video AI' },
  { name: 'Descript', category: 'Media' },
];

// ─── Checkout Overlay ───────────────────────────────────────

function CheckoutOverlay({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'ai-workflow-automation' }),
      });

      if (!res.ok) throw new Error('Failed to process purchase');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ai-workflow-automation.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setStatus('success');
      setMessage('Purchase successful! Your PDF has been downloaded.');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-neon/10">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-tech-300 hover:text-white transition"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
            <Repeat className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">AI Workflow Automation</h3>
          <p className="text-sm text-tech-200">Complete PDF Playbook</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neon/15 border border-neon/20">
            <DollarSign className="w-4 h-4 text-neon-light" />
            <span className="text-lg font-bold text-white">$9</span>
            <span className="text-xs text-tech-200">one-time</span>
          </div>
        </div>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-white font-medium mb-1">{message}</p>
            <button
              onClick={onBack}
              className="mt-4 text-sm text-neon-light hover:underline"
            >
              Back to playbook
            </button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label htmlFor="checkout-email" className="block text-sm font-medium text-tech-200 mb-1">
                Email address
              </label>
              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Download PDF — $9
                </>
              )}
            </button>
            <p className="text-[10px] text-tech-300 text-center">
              Secure checkout. Your PDF will be available immediately after purchase.
              <br />You will also receive a download link via email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main Page Content ──────────────────────────────────────

function AIWorkflowAutomationInner() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          All Playbooks
        </Link>

        {/* ═══════════════════════════════════════════════════ */}
        {/* HERO — Full-width gradient card                     */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-rose-500/10 border border-amber-500/30 p-6 sm:p-10 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                Premium Playbook
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                AI Workflow{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Automation
                </span>
              </h1>
              <p className="text-base text-tech-100/70 max-w-xl mb-4">
                The complete guide to building autonomous workflows with AI. Learn how to
                design, deploy, and scale automation pipelines that save 20+ hours per week.
                From no-code connectors to multi-agent systems — everything in one playbook.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-xs text-tech-200">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-white">60+</span> pages
                </div>
                <div className="flex items-center gap-2 text-xs text-tech-200">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-white">$9</span> one-time
                </div>
                <div className="flex items-center gap-2 text-xs text-tech-200">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-white">All Levels</span> beginner→advanced
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-amber-500/25"
              >
                <ShoppingCart className="w-4 h-4" />
                Get the Playbook — $9
              </button>
            </div>

            {/* Visual */}
            <div className="hidden lg:flex items-center justify-center w-64 shrink-0">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-2xl rotate-6 blur-sm" />
                <div className="absolute inset-0 bg-tech-800/80 border border-amber-500/30 rounded-2xl flex items-center justify-center backdrop-blur">
                  <div className="text-center">
                    <Repeat className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                    <p className="text-[10px] text-tech-200 font-medium">Automation</p>
                    <p className="text-xs text-tech-300">Playbook</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                      <span className="text-[10px] font-bold text-white">$9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* TOOLS COVERED                                       */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Tools & Platforms Covered
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {toolsCovered.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col p-3 rounded-xl border border-tech-500/20 bg-tech-700/50"
              >
                <span className="text-xs font-medium text-white truncate">{tool.name}</span>
                <span className="text-[10px] text-tech-300">{tool.category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* WHO THIS IS FOR                                    */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            Who This Is For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whoItsFor.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-sky-500/20 bg-sky-500/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.text}</p>
                    <p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* WHAT YOU WILL LEARN                                */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            What You&apos;ll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {whatYoullLearn.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.text}</p>
                    <p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* CHAPTER PREVIEW — 7 Sections                        */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <SearchIcon className="w-4 h-4 text-amber-400" />
            Chapter Preview
          </h2>
          <p className="text-sm text-tech-200 mb-6">
            Here&apos;s everything covered in the AI Workflow Automation Playbook. Each
            chapter is packed with actionable strategies, real examples, and ready-to-use prompts.
          </p>

          <div className="space-y-4">
            {sections.map((section) => (
              <details
                key={section.id}
                className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-amber-500/30"
              >
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center shrink-0">
                      {section.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition">
                        {section.title}
                      </h3>
                      <p className="text-xs text-tech-300 mt-0.5 line-clamp-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>

                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-tech-100">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* FINAL CTA — PRICE CARD                              */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-rose-500/10 border border-amber-500/20 p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 mb-4">
              <Repeat className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to Automate Your Workflows?
            </h2>
            <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">
              Get the complete 60+ page PDF playbook. Every workflow map, tool config, prompt
              template, and automation recipe you need to save 20+ hours per week.
            </p>

            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-tech-700/80 border border-tech-500/20 mb-4">
              <div className="text-left">
                <div className="text-2xl font-bold text-white">$9</div>
                <div className="text-[10px] text-tech-300">one-time payment</div>
              </div>
              <div className="h-8 w-px bg-tech-500/30" />
              <div className="text-left">
                <div className="text-xs font-medium text-emerald-400">Lifetime access</div>
                <div className="text-[10px] text-tech-300">Free updates</div>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-amber-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              Download PDF — $9
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-tech-300">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Instant download
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                30-day guarantee
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Free updates
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Checkout Overlay */}
      {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
    </>
  );
}

// ─── Exported Page (Suspense-wrapped) ──────────────────────

export default function AIWorkflowAutomationPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-tech-700 rounded w-1/4" />
          <div className="h-8 bg-tech-700 rounded w-3/4" />
          <div className="h-64 bg-tech-700 rounded" />
        </div>
      </div>
    }>
      <AIWorkflowAutomationInner />
    </Suspense>
  );
}
