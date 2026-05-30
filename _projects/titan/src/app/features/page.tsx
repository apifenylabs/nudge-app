"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   Feature Data
   ───────────────────────────────────────────────────────────── */
const featureCategories = [
  {
    title: "Agent Builder",
    icon: "⚔️",
    color: "from-cyan-500 to-cyan-600",
    features: [
      {
        name: "Visual Agent Studio",
        desc: "Drag-and-drop interface to create AI agents without code. Configure persona, tools, memory, and behavior in minutes.",
      },
      {
        name: "Pre-Built Templates",
        desc: "Start from community templates: customer support, research assistant, social media manager, coding tutor, and more.",
      },
      {
        name: "Custom Knowledge Bases",
        desc: "Upload documents, scrape websites, or connect APIs. Your agents learn your domain instantly.",
      },
      {
        name: "Multi-Model Support",
        desc: "Under the hood each agent can route to GPT-4o, Claude, Gemini, or open-source models — configure per skill.",
      },
    ],
  },
  {
    title: "Progression System",
    icon: "🗡️",
    color: "from-purple-500 to-fuchsia-600",
    features: [
      {
        name: "Rank-Based Unlocks",
        desc: "Novice (E) → Hunter (B) → Sovereign (S). Each rank unlocks new agent slots, tools, and capabilities.",
      },
      {
        name: "Skill Trees",
        desc: "Specialize your agents into paths: Prompt Crafter, Tool Weaver, Memory Sage, Agent Commander, Reality Forger, Sovereign Engine.",
      },
      {
        name: "God-Tier Prestige",
        desc: "Reach Level 30+ to unlock golden auras, crown badges, premium orbital rings, and exclusive ascension forms.",
      },
      {
        name: "Agent XP & Evolution",
        desc: "Agents gain XP from completed tasks. Level up to improve response quality, unlock new abilities, and earn skins.",
      },
    ],
  },
  {
    title: "Orchestration",
    icon: "🌀",
    color: "from-emerald-500 to-teal-600",
    features: [
      {
        name: "Multi-Agent Teams",
        desc: "Create squads of agents that collaborate on complex workflows — research, analyze, draft, and deliver.",
      },
      {
        name: "Swarm Mode",
        desc: "One command triggers up to 5 agents working in parallel. Monitor progress from a single dashboard.",
      },
      {
        name: "Chain Pipelines",
        desc: "Chain agents in sequence: Agent A outputs → Agent B processes → Agent C formats. Full DAG orchestration.",
      },
      {
        name: "God-Tier Command",
        desc: "Issue a single voice or text command that activates your entire orbiting agent fleet simultaneously.",
      },
    ],
  },
  {
    title: "Deployment",
    icon: "🚀",
    color: "from-amber-500 to-orange-600",
    features: [
      {
        name: "One-Click Deploy",
        desc: "Deploy agents to web, Slack, Discord, Telegram, or API endpoint with a single click.",
      },
      {
        name: "Robotics Integration",
        desc: "Deploy agents to ROS2, Arduino, or Raspberry Pi platforms. Your AI drives physical hardware.",
      },
      {
        name: "Private Endpoints",
        desc: "Enterprise-grade private deployment with VPC isolation, custom domains, and SOC2-ready audit logs.",
      },
      {
        name: "API & Webhooks",
        desc: "Full REST API and webhook support for programmatic agent management and event-driven workflows.",
      },
    ],
  },
  {
    title: "Memory & Context",
    icon: "🧠",
    color: "from-sky-500 to-blue-600",
    features: [
      {
        name: "Persistent Memory",
        desc: "Agents remember conversations across sessions. Core memories, episodic recall, and working context.",
      },
      {
        name: "1M+ Token Context",
        desc: "Hunter tier unlocks 1M token context windows. Sovereign tier gets unlimited context for deep analysis.",
      },
      {
        name: "Knowledge Graph",
        desc: "Agents build internal knowledge graphs from your data, enabling associative recall and reasoning.",
      },
      {
        name: "Cross-Agent Memory",
        desc: "Agents can share context — one agent's discovery becomes another's starting point.",
      },
    ],
  },
  {
    title: "Monetization",
    icon: "💎",
    color: "from-rose-500 to-pink-600",
    features: [
      {
        name: "Agent Marketplace",
        desc: "Publish and sell your trained agents. Earn royalties every time another user runs your agent.",
      },
      {
        name: "Usage-Based Billing",
        desc: "Pay only for what you use. Token-based metering with monthly caps and budget alerts.",
      },
      {
        name: "Affiliate Program",
        desc: "Earn 20% recurring commission for every user you refer. Dashboard tracks clicks, sign-ups, and payouts.",
      },
      {
        name: "White-Label Reselling",
        desc: "Resell Titan agent infrastructure under your own brand. Custom domain, custom pricing, full margin control.",
      },
    ],
  },
];

const stats = [
  { label: "Active Agents", value: "12,000+", icon: "🤖" },
  { label: "Tasks Executed", value: "850K+", icon: "✅" },
  { label: "Avg. Uptime", value: "99.97%", icon: "⚡" },
  { label: "Community Rank", value: "#1", icon: "👑" },
];

const faqs = [
  {
    q: "Do I need coding experience?",
    a: "No. Titan's visual agent builder lets you create, train, and deploy agents entirely through drag-and-drop and natural language configuration.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade or downgrade anytime. Progression unlocks are preserved — if you downgrade, you keep your rank, just lose active slot count.",
  },
  {
    q: "What AI models power the agents?",
    a: "Titan supports GPT-4o, Claude Opus 4, Gemini 2.5 Pro, DeepSeek, and open-source models. You can configure per agent or let Titan auto-select.",
  },
  {
    q: "Is my data private?",
    a: "Yes. All data is encrypted at rest and in transit. Sovereign tier includes VPC deployment with no data leaving your infrastructure.",
  },
  {
    q: "Can I build agents for my business?",
    a: "Absolutely. Titan agents are production-ready. Deploy as customer support bots, research assistants, content pipelines, or internal process automation.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Component: Feature Card
   ───────────────────────────────────────────────────────────── */
function FeatureCard({
  feature,
  index,
}: {
  feature: { name: string; desc: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
            hovered
              ? "bg-gradient-to-br from-cyan-500 to-purple-600 text-white"
              : "bg-cyan-500/10 text-cyan-400"
          }`}
        >
          {index + 1}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
            {feature.name}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {feature.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Component: Navbar (reuse from landing, keep local)
   ───────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080fe0] backdrop-blur-xl border-b border-[#1e293b]/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🗡️</span>
          <span className="text-lg font-bold">
            <span className="text-cyan-400">Ti</span>
            <span className="text-purple-400">tan</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="/features" className="text-cyan-400 transition-colors">
            Features
          </a>
          <a href="/pricing" className="hover:text-cyan-400 transition-colors">
            Pricing
          </a>
          <a href="/robotics" className="hover:text-cyan-400 transition-colors">
            Robotics
          </a>
        </div>

        <a
          href="/pricing"
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */
export default function FeaturesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[#08080f]">
        {/* ── HERO ──────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 px-4 text-center">
          {/* Glow orb */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/8 via-purple-600/5 to-transparent blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xs text-cyan-400 mb-6 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Everything You Need
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-4">
              Features That Make Your
              <br />
              <span className="text-gradient">Agents Unstoppable</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From visual agent building to multi-agent orchestration,
              robotics deployment, and god-tier progression —
              Titan has every tool you need to command an AI army.
            </p>
          </div>
        </section>

        {/* ── STATS BAR ───────────────────────────────────── */}
        <section className="py-12 px-4 border-y border-[#1e293b]/50">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center group cursor-default"
              >
                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURE CATEGORIES ──────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto space-y-24">
            {featureCategories.map((category, ci) => (
              <div key={category.title} className="scroll-mt-24">
                {/* Category header */}
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {category.title}
                    </h2>
                    <div
                      className={`h-1 w-16 mt-2 rounded-full bg-gradient-to-r ${category.color}`}
                    />
                  </div>
                </div>

                {/* Feature grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {category.features.map((feature, fi) => (
                    <FeatureCard
                      key={feature.name}
                      feature={feature}
                      index={ci * category.features.length + fi}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROGRESSION PATH (inline visual) ───────────── */}
        <section className="py-20 px-4 border-t border-[#1e293b]/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              From <span className="text-gradient">Novice</span> to{" "}
              <span className="text-gradient">Sovereign</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-12">
              Every feature unlocks at the right tier. Start free, grow your
              power, and ascend through the ranks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* E-Rank */}
              <div className="glass rounded-2xl p-6 border border-slate-700/30">
                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-slate-600 bg-[#0f0f1a] mx-auto mb-4">
                  <span className="text-lg font-black text-slate-400">E</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Novice</h3>
                <p className="text-xs text-slate-500 mb-1">Free</p>
                <ul className="space-y-2 text-xs text-slate-400 mt-4">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> 1 Agent slot
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Basic prompt tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Text responses
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Community templates
                  </li>
                </ul>
              </div>

              {/* B-Rank */}
              <div className="glass rounded-2xl p-6 border border-cyan-500/20 scale-105 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-[10px] font-bold text-white rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-cyan-500 bg-[#0f0f1a] mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                  <span className="text-lg font-black text-cyan-400">B</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Hunter</h3>
                <p className="text-xs text-cyan-400 mb-1">$29/mo</p>
                <ul className="space-y-2 text-xs text-slate-400 mt-4">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> 5 Agent slots
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Tool integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> File & web access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Advanced memory
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Custom knowledge bases
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Priority support
                  </li>
                </ul>
              </div>

              {/* S-Rank */}
              <div className="glass rounded-2xl p-6 border border-fuchsia-500/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-fuchsia-500 bg-[#0f0f1a] mx-auto mb-4 shadow-lg shadow-fuchsia-500/20">
                  <span className="text-lg font-black text-fuchsia-400">S</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Sovereign</h3>
                <p className="text-xs text-fuchsia-400 mb-1">$99/mo</p>
                <ul className="space-y-2 text-xs text-slate-400 mt-4">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Unlimited agents
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Multi-agent orchestration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> API & webhooks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Custom training
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Private deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span> Dedicated support
                  </li>
                </ul>
              </div>
            </div>

            <a
              href="/pricing"
              className="inline-block mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
            >
              Compare Plans
            </a>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="py-20 px-4 border-t border-[#1e293b]/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="glass rounded-xl group open:border-cyan-500/30 transition-all"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors">
                    {faq.q}
                    <span className="text-cyan-400 text-lg transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-20 px-4 border-t border-[#1e293b]/50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass rounded-3xl p-10 sm:p-16 border border-cyan-500/10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Build Your{" "}
                <span className="text-gradient">Agent Army</span>?
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Join 12,000+ hunters building, training, and deploying AI agents.
                Start free — no credit card required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/pricing"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105"
                >
                  Get Started Free
                </a>
                <a
                  href="/robotics"
                  className="px-8 py-3.5 rounded-xl border border-slate-600 text-slate-300 font-semibold text-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  Explore Robotics
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <footer className="border-t border-slate-800/50 py-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span>🗡️</span>
              <span className="text-slate-500">
                Titan — {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex gap-6">
              <a href="/features" className="text-cyan-400 transition-colors">
                Features
              </a>
              <a href="/pricing" className="hover:text-cyan-400 transition-colors">
                Pricing
              </a>
              <a href="/robotics" className="hover:text-cyan-400 transition-colors">
                Robotics
              </a>
              <a href="/dashboard" className="hover:text-cyan-400 transition-colors">
                Dashboard
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
