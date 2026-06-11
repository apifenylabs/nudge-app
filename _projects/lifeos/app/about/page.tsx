'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';

// ─── Plugin definitions (mirrors plugin-registry for marketing display) ───
const PLUGIN_DISPLAY = [
  { id: 'travel',      emoji: '✈️', name: 'Travel',      tagline: 'Plan trips like a local',                          color: 'from-sky-400 to-blue-500',       gradient: 'linear-gradient(135deg, #38BDF8, #3B82F6)' },
  { id: 'finance',     emoji: '💰', name: 'Finance',      tagline: 'Budget, invest, build wealth',                     color: 'from-emerald-400 to-green-500',   gradient: 'linear-gradient(135deg, #34D399, #22C55E)' },
  { id: 'health',      emoji: '🏃', name: 'Health',       tagline: 'Body, mind, daily habits',                         color: 'from-rose-400 to-pink-500',       gradient: 'linear-gradient(135deg, #FB7185, #EC4899)' },
  { id: 'career',      emoji: '💼', name: 'Career',       tagline: 'Navigate your professional path',                  color: 'from-violet-400 to-purple-500',   gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6)' },
  { id: 'learning',    emoji: '📚', name: 'Learning',     tagline: 'Master anything, systematically',                  color: 'from-amber-400 to-orange-500',    gradient: 'linear-gradient(135deg, #FBBF24, #F97316)' },
  { id: 'family',      emoji: '👨‍👩‍👧‍👦', name: 'Family',      tagline: 'Strengthen connections at home',              color: 'from-teal-400 to-cyan-500',       gradient: 'linear-gradient(135deg, #2DD4BF, #06B6D4)' },
  { id: 'home',        emoji: '🏠', name: 'Home',         tagline: 'Organize your space and life',                     color: 'from-amber-400 to-yellow-500',    gradient: 'linear-gradient(135deg, #F59E0B, #EAB308)' },
  { id: 'social',      emoji: '🎭', name: 'Social',       tagline: 'Build and nurture your network',                   color: 'from-pink-400 to-rose-500',       gradient: 'linear-gradient(135deg, #F472B6, #F43F5E)' },
  { id: 'relationships', emoji: '💞', name: 'Relationships', tagline: 'Deeper bonds, intentional connection',          color: 'from-red-400 to-rose-500',        gradient: 'linear-gradient(135deg, #F87171, #E11D48)' },
  { id: 'productivity', emoji: '⚡', name: 'Productivity',  tagline: 'Do what matters, skip the rest',                 color: 'from-indigo-400 to-blue-500',     gradient: 'linear-gradient(135deg, #818CF8, #6366F1)' },
  { id: 'nutrition',   emoji: '🥗', name: 'Nutrition',    tagline: 'Eat smarter, feel better',                         color: 'from-lime-400 to-green-500',      gradient: 'linear-gradient(135deg, #A3E635, #84CC16)' },
  { id: 'mindfulness', emoji: '🧘', name: 'Mindfulness',  tagline: 'Presence, peace, clarity',                         color: 'from-cyan-400 to-teal-500',       gradient: 'linear-gradient(135deg, #22D3EE, #14B8A6)' },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Pick what matters',
    description: 'Choose from 12 specialized plugins — Travel, Finance, Health, Career, and more. Each one is built for a specific area of your life.',
    icon: '🎯',
  },
  {
    step: 2,
    title: 'Let LifeOS lead',
    description: 'Unlike chatbots that wait for questions, LifeOS starts the conversation. It probes, challenges, and guides you through structured phases — Discover → Plan → Execute → Review.',
    icon: '🗣️',
  },
  {
    step: 3,
    title: 'Visualize your plan',
    description: 'Every conversation flows into an Excalidraw canvas. Sketch timelines, brainstorm ideas, build roadmaps — all alongside your chat.',
    icon: '🎨',
  },
  {
    step: 4,
    title: 'Track your progress',
    description: 'Built-in habit tracking, mood logging, Pomodoro timer, and streak calendars. LifeOS isn\'t just a conversation — it\'s a system.',
    icon: '📈',
  },
];

const FEATURES = [
  {
    title: 'AI-Led Conversations',
    description: 'Each plugin has a system prompt that drives the interaction. LifeOS asks first — you respond, reflect, and refine.',
    icon: '🤖',
  },
  {
    title: 'Phase-Based Guidance',
    description: 'Structured phases (Discover → Plan → Execute → Review) ensure you never skip the important steps.',
    icon: '🔄',
  },
  {
    title: 'Canvas Whiteboard',
    description: 'Built-in Excalidraw integration for visual brainstorming alongside every conversation.',
    icon: '✏️',
  },
  {
    title: 'Habit + Mood Tracking',
    description: 'Visual dashboard showing your daily habits and mood correlations. See what actually affects your well-being.',
    icon: '📊',
  },
  {
    title: 'Pomodoro Timer',
    description: 'Built-in focus timer with AI-suggested break activities based on your current state.',
    icon: '⏱️',
  },
  {
    title: 'Streak Calendar',
    description: 'Gamified streaks for habits and plugin engagement. Progress you can see every day.',
    icon: '🔥',
  },
  {
    title: 'Export Anywhere',
    description: 'Export conversations, plans, and data as CSV or JSON. Your data is always yours.',
    icon: '📤',
  },
  {
    title: 'Quick Actions',
    description: 'Preset combinations that launch multiple plugins at once — "Weekly Review" loads Career + Finance + Health together.',
    icon: '⚡',
  },
];

const FAQ = [
  { q: 'How is LifeOS different from ChatGPT?', a: 'LifeOS doesn\'t wait for your questions. It initiates conversations, asks probing questions, and guides you through structured phases. Each plugin is purpose-built for a specific area of life with its own system prompt, phases, and tools.' },
  { q: 'Is my data private?', a: 'Conversations are stored locally by default. Optional Supabase persistence gives you cross-device sync. Your conversations stay yours — never used for training.' },
  { q: 'Do I need an API key?', a: 'Yes, an OpenAI API key is required for the AI chat features. The interface and demo mode work without one. Keys are stored locally in your browser.' },
  { q: 'Can I use LifeOS on mobile?', a: 'Yes — LifeOS is fully responsive. The chat interface works great on phones, and the canvas adapts to screen size.' },
  { q: 'Is there a free version?', a: 'LifeOS is open-source and free to self-host. You only pay for your own OpenAI API usage, which averages ~$5-15/month for regular use.' },
  { q: 'How many plugins are there?', a: '12 plugins currently: Travel, Finance, Health, Career, Learning, Family, Home, Social, Relationships, Productivity, Nutrition, and Mindfulness. More are in development.' },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>About — LifeOS AI Copilot</title>
        <meta name="description" content="LifeOS is a personality-aware AI copilot that guides you through travel, finance, health, career, and more. Built for people who want to live intentionally." />
        <meta property="og:title" content="About — LifeOS AI Copilot" />
        <meta property="og:description" content="A personality-aware AI copilot with 12 specialized plugins for every area of life." />
      </Head>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(45, 212, 191, 0.3); }
          50% { box-shadow: 0 0 40px rgba(45, 212, 191, 0.5); }
        }
      `}</style>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900">LifeOS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-500 hover:text-teal-600 transition-colors">App</Link>
            <Link href="/quick-actions" className="text-xs text-gray-500 hover:text-teal-600 transition-colors">Quick Actions</Link>
            <Link href="/architecture" className="text-xs text-gray-500 hover:text-teal-600 transition-colors">Architecture</Link>
            <a href="https://github.com/apifenylabs/lifeos" target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-emerald-50" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />

        <FadeInSection>
          <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-32 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs text-teal-700 font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              AI Copilot for Everything
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
              Your life doesn't wait for{' '}
              <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                questions
              </span>
              .
              <br />
              Neither does LifeOS.
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              A personality-aware AI copilot that leads conversations, not follows them.
              Pick a plugin — Travel, Finance, Health, Career — and let LifeOS guide you
              through structured phases with purpose and depth.
            </p>

            <div className="flex items-center justify-center gap-3">
              <Link
                href="/"
                className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20"
              >
                Try LifeOS Now
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:border-teal-300 hover:text-teal-600 transition-all shadow-sm"
              >
                Explore Plugins ↓
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 flex items-center justify-center gap-8 sm:gap-16">
              {[
                { value: '12', label: 'Plugins' },
                { value: '4', label: 'Phases Each' },
                { value: '8+', label: 'Features' },
                { value: 'Open', label: 'Source' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInSection delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Four simple steps to transform how you approach every area of your life.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <FadeInSection key={item.step} delay={150 + i * 100}>
                <div className="relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold shadow-md">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-3 group-hover:animate-[float_2s_ease-in-out_infinite]">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── All 12 Plugins ── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInSection delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">12 Plugins. One Copilot.</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Each plugin is a specialised AI coach with its own personality, phases, and tools.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {PLUGIN_DISPLAY.map((plugin, i) => (
              <FadeInSection key={plugin.id} delay={100 + i * 50}>
                <div className="group relative p-4 rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden">
                  {/* Gradient background on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: plugin.gradient }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2.5"
                      style={{ background: `${plugin.gradient}15`, border: `1px solid ${plugin.gradient}20` }}
                    >
                      {plugin.emoji}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{plugin.name}</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{plugin.tagline}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInSection delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Built for Depth</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Not a chatbot with life categories bolted on. Every feature is intentional.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => (
              <FadeInSection key={feature.title} delay={100 + i * 60}>
                <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-teal-200 transition-all duration-300">
                  <div className="text-xl mb-2">{feature.icon}</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInSection delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">What You Can Do</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Real conversations. Real outcomes.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                emoji: '✈️',
                title: 'Plan a 3-month Asia trip',
                desc: 'LifeOS Travel guides you through destinations, budgets, visas, packing, and itineraries — tailored to your style.',
                gradient: 'from-sky-100 to-blue-50',
              },
              {
                emoji: '💰',
                title: 'Build a 12-month financial plan',
                desc: 'Finance plugin assesses your income, expenses, goals, and risk tolerance — then builds a phased wealth strategy.',
                gradient: 'from-emerald-100 to-green-50',
              },
              {
                emoji: '💼',
                title: 'Pivot your career with clarity',
                desc: 'Career plugin runs a skills audit, explores options, builds a transition plan, and tracks your networking progress.',
                gradient: 'from-violet-100 to-purple-50',
              },
            ].map((useCase, i) => (
              <FadeInSection key={i} delay={200 + i * 100}>
                <div className={`rounded-2xl bg-gradient-to-br ${useCase.gradient} border border-gray-200/80 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                  <div className="text-3xl mb-3">{useCase.emoji}</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{useCase.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4">
          <FadeInSection delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">FAQ</h2>
            </div>
          </FadeInSection>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <FadeInSection key={i} delay={100 + i * 60}>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left"
                  >
                    <span className="text-sm font-medium text-gray-900">{item.q}</span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        activeFaq === i ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-xs text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-teal-600 to-emerald-700">
        <FadeInSection delay={100}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to let someone lead?
            </h2>
            <p className="text-teal-100/80 max-w-md mx-auto mb-8 text-sm">
              LifeOS doesn't wait for you to figure it out. Pick a plugin, start a conversation,
              and let your copilot do the driving.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/"
                className="px-6 py-3 bg-white text-teal-700 rounded-full text-sm font-medium hover:bg-teal-50 transition-all shadow-lg"
              >
                Start Now
              </Link>
              <a
                href="https://github.com/apifenylabs/lifeos"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border border-teal-300/50 text-white rounded-full text-sm font-medium hover:bg-teal-500/30 transition-all"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500">LifeOS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-gray-400">Open source · AI copilot</span>
          </div>
        </div>
      </footer>

      {/* Inline keyframes for animation — injected via global style above */}
    </main>
  );
}
