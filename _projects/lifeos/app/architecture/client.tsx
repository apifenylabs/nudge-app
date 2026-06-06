'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Layers, Cpu, Database, GitBranch, Shield, Zap, Plug, Activity, ChevronRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const SECTIONS = [
  {
    id: 'overview',
    icon: 'Layers',
    iconEl: <Layers className="h-5 w-5" />,
    title: 'High-Level Architecture',
    description: 'LifeOS is a personality-aware copilot built on a plugin-based architecture. Users interact through a phase-aware chat engine that routes requests to the appropriate plugin category.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    details: [
      'Next.js 14 app router — server components for content, client hydration for interactivity',
      'Framer Motion for transition orchestration and personality animations',
      'Supabase (planned) for user profiles, plugin state, and conversation history',
      'Plugin registry scanned at build time from /plugins directory',
      'Phase engine determines chat personality mode: Onboarding, Active, Reflective, Crisis',
    ],
  },
  {
    id: 'plugins',
    icon: 'Plug',
    iconEl: <Plug className="h-5 w-5" />,
    title: 'Plugin System Architecture',
    description: 'Each plugin is a self-contained module with a manifest, UI components, and optional API routes. The registry discovers and indexes plugins dynamically.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    details: [
      'Plugin manifest (icon, name, description, category, color) defined in plugin directory',
      'Registry at lib/plugins/registry.ts scans /plugins/ at build time',
      'Each plugin exports: card UI, detail page, optional API handlers',
      '14 plugin categories currently: Travel, Finance, Health, Productivity, Coding, etc.',
      'Plugin adapters bridge chat intent → plugin action (lib/plugin-adapters.ts)',
    ],
  },
  {
    id: 'chat',
    icon: 'GitBranch',
    iconEl: <GitBranch className="h-5 w-5" />,
    title: 'Phase-Aware Chat Engine',
    description: 'The chat engine adapts its personality and response style based on the detected user phase. This creates a natural onboarding-to-mastery arc.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    details: [
      'Four phases: Onboarding (guided), Active (efficient), Reflective (debrief), Crisis (urgent)',
      'Phase detection via keyword analysis, message length, and time since last interaction',
      'Each phase has distinct system prompt modifiers and response tone parameters',
      'Plugin matching occurs after phase detection — context-aware routing',
      'Phase transitions are smooth — no hard resets, gradual personality shift over 2-3 messages',
    ],
  },
  {
    id: 'dataflow',
    icon: 'Activity',
    iconEl: <Activity className="h-5 w-5" />,
    title: 'Data Flow',
    description: 'User message → Phase detection → Intent parsing → Plugin routing → Response generation → Display + analytics logging.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    details: [
      'Message received → PhaseEngine determines current phase → Personality modifiers applied',
      'IntentExtractor parses message for plugin category + action + parameters',
      'PluginMatcher scores each plugin against intent, returns top match',
      'Plugin handler executes action, returns structured response',
      'Response rendered in chat UI + analytics event fired (Vercel Analytics)',
    ],
  },
  {
    id: 'schema',
    icon: 'Database',
    iconEl: <Database className="h-5 w-5" />,
    title: 'Supabase Schema (Planned)',
    description: 'The following schema is designed but not yet deployed. It will power user persistence, plugin state, and conversation history.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    details: [
      'profiles: id, user_id (auth), display_name, personality_settings, phase_history, xp',
      'conversations: id, profile_id, title, phase_sequence (JSON), created_at, updated_at',
      'messages: id, conversation_id, role, content, metadata (phase, plugin), timestamp',
      'plugin_states: id, profile_id, plugin_id, state (JSON), last_synced',
      'xp_events: id, profile_id, event_type, xp_amount, plugin_id, created_at',
    ],
  },
  {
    id: 'deploy',
    icon: 'Shield',
    iconEl: <Shield className="h-5 w-5" />,
    title: 'Deployment & Security',
    description: 'LifeOS is deployed on Vercel with phased access and OWASP-aligned security practices.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    details: [
      'Vercel deployment — edge functions for API routes, ISR for static pages',
      'Supabase Row Level Security (RLS) — users can only access their own data',
      'Plugins run in isolated contexts — no cross-plugin data leakage',
      'Environment variables via Vercel: SUPABASE_URL, SUPABASE_ANON_KEY, AI_API_KEY',
      'Analytics via Vercel Analytics (privacy-friendly, no cookie consent needed)',
    ],
  },
];

export default function ArchitectureClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to LifeOS</span>
          </Link>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-teal-200/30 text-teal-600 bg-teal-50">
            Architecture
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-teal-200/30 text-teal-600 bg-teal-50 mb-4">
              <Cpu className="h-3 w-3 mr-1" />
              System Architecture
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              How LifeOS Works
            </h1>
            <p className="text-gray-500 max-w-2xl leading-relaxed">
              LifeOS is a personality-aware copilot built on a modular plugin architecture.
              Every component — from the phase-aware chat engine to the plugin registry —
              is designed to feel like a living system that adapts to how you work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Diagram (ASCII) */}
      <section className="border-b border-gray-100 bg-gray-50/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">System Flow Diagram</h2>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              <pre className="text-xs sm:text-sm leading-relaxed font-mono text-gray-600 overflow-x-auto whitespace-pre">
{`┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   User Chat  │ ──→ │ Phase Engine │ ──→ │ Intent       │
│   Interface  │     │ (personality)│     │ Extractor    │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Plugin    │ ←── │ Plugin       │ ←── │   Scoring    │
│   Handler    │     │ Matcher      │     │   Engine     │
└──────┬───────┘     └──────────────┘     └──────────────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Response    │ ──→ │  Chat UI     │ ──→ │  Analytics   │
│  Generation  │     │  (render)    │     │  (Vercel)    │
└──────────────┘     └──────────────┘     └──────────────┘

         ┌──────────────────────────────────────────┐
         │          Supabase (Planned)              │
         │  Profiles · Conversations · Messages     │
         │  Plugin States · XP Events               │
         └──────────────────────────────────────────┘`}</pre>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Data flows left-to-right through the pipeline. Supabase persistence is planned but not yet deployed.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detail Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {SECTIONS.map((section) => (
            <motion.div key={section.id} variants={item}>
              <div className={`rounded-xl border ${section.border} ${section.bg.replace('bg-', 'bg-opacity-10 ')} bg-white hover:shadow-md transition-shadow overflow-hidden`}>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${section.bg} ${section.color} flex items-center justify-center shrink-0`}>
                      {section.iconEl}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h2>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{section.description}</p>
                      <ul className="space-y-2">
                        {section.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <ChevronRight className={`h-3.5 w-3.5 ${section.color} mt-0.5 shrink-0`} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-900 font-semibold">LifeOS</span>
          <span className="text-xs text-gray-400">Apifeny Labs · Architecture v1.0</span>
        </div>
      </footer>
    </div>
  );
}
