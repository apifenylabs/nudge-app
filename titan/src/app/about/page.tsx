import { Metadata } from 'next';
import Link from 'next/link';
import { Swords, ShieldCheck, Cpu, Globe, Users, TrendingUp, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import JsonLd from '@/components/atoms/JsonLd';

export const metadata: Metadata = {
  title: 'About — Titan AI Agent Platform',
  description: 'Titan is the Solo Leveling Steam of AI agents — a visual progression platform for building, certifying, and deploying autonomous agents.',
  openGraph: {
    title: 'About Titan — Visual AI Agent Progression',
    description: 'From Hatchling to God-Tier: build, certify, and deploy AI agents with visual skill trees, swarm orchestration, and robotics bridge.',
    type: 'website',
  },
};

const MILESTONES = [
  { year: '2026 Q1', event: 'Foundation — Core agent runtime and landing page launched', emoji: '🥚' },
  { year: '2026 Q2', event: 'BAU Engine, Skill Forge, Swarm Orchestrator, Robotics Bridge', emoji: '🦊' },
  { year: '2026 Q3', event: 'Agent marketplace, community skills, enterprise SSO', emoji: '🐉' },
  { year: '2026 Q4', event: 'God-Tier certification, physical robot integrations, public API', emoji: '👑' },
];

const VALUES = [
  {
    icon: <Swords className="w-8 h-8 text-amber-500" />,
    title: 'Visual-First Progression',
    desc: 'Agents should look as powerful as they are. Every level-up is a visual transformation — from Hatchling auras to God-Tier halos.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    title: 'Own Your IP',
    desc: 'Your agent skills, certifications, and data belong to you. Titan provides the forge — you own the blade.',
  },
  {
    icon: <Cpu className="w-8 h-8 text-rose-500" />,
    title: 'Hardware Agnostic',
    desc: 'Deploy anywhere: cloud, edge, or physical robots. No vendor lock-in, no platform restrictions.',
  },
  {
    icon: <Globe className="w-8 h-8 text-sky-500" />,
    title: 'Open Ecosystem',
    desc: 'BYO models, custom tools, community skills. Titan is the operating system, not the walled garden.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://titan.apifeny.com/about/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://titan.apifeny.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://titan.apifeny.com/about' },
  ],
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://titan.apifeny.com/#organization',
      name: 'Titan by Apifeny Labs',
      url: 'https://titan.apifeny.com',
      description: 'Titan is the visual progression platform for AI agents — build, certify, and deploy autonomous agents with RPG-style skill trees and God-Tier certification.',
      foundingDate: '2026-01',
      founder: { '@type': 'Organization', name: 'Apifeny Labs' },
      sameAs: [
        'https://github.com/apifeny/titan',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://titan.apifeny.com/#website',
      url: 'https://titan.apifeny.com',
      name: 'Titan AI Agent Platform',
      description: 'AI agent progression platform with visual skill trees, swarm coordination, and hardware-agnostic deployment.',
      publisher: { '@id': 'https://titan.apifeny.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://titan.apifeny.com/#softwareapplication',
      name: 'Titan AI Agent Platform',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web browser (cross-platform)',
      description: 'Visual AI agent progression platform with skill trees, certification badges, swarm coordination, and hardware-agnostic deployment.',
      url: 'https://titan.apifeny.com',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/PreOrder',
      },
      author: { '@id': 'https://titan.apifeny.com/#organization' },
      featureList: [
        'Visual Skill Trees for AI agents',
        'OWASP-secured Certification Badges (Bronze to God-Tier)',
        'Swarm Coordination (multi-agent orchestration)',
        'Hardware-agnostic deployment (cloud, edge, ROS2 robots)',
        'Community skill marketplace',
        'BYO models and custom tools',
      ],
      screenshot: 'https://titan.apifeny.com/og.png',
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={aboutSchema} />
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30 text-amber-300 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Phase 6 — God-Tier & Robotics
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            About Titan
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed">
            Titan is the visual progression platform for AI agents — think <span className="text-amber-400 font-semibold">Steam</span> meets <span className="text-purple-400 font-semibold">Replit</span> meets <span className="text-emerald-400 font-semibold">Solo Leveling</span>.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-16 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            AI agents are becoming ubiquitous — but they&apos;re still treated as black boxes. You deploy a model, feed it prompts, and hope it works. There&apos;s no way to <span className="text-amber-400">see</span> your agent grow, <span className="text-purple-400">certify</span> its capabilities, or <span className="text-emerald-400">visually</span> command a team of them.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Titan changes that. We treat agents like RPG characters — they level up, unlock skills, earn visual prestige, and coordinate as a party. Every agent has a visible progression path from Hatchling to God-Tier, with verified certifications and real skills that deploy anywhere.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The result? Agents you can see, trust, and command — not just black boxes you hope will work.
          </p>
        </div>
      </section>

      {/* What Titan Is */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Titan Provides</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-xl font-bold mb-2">Visual Skill Trees</h3>
              <p className="text-gray-400">Agents unlock abilities through branching skill trees. Each node is a real capability — web search, code execution, data analysis, hardware control.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
              <div className="text-4xl mb-3">🏅</div>
              <h3 className="text-xl font-bold mb-2">Certification Badges</h3>
              <p className="text-gray-400">OWASP-secured verification. Agents earn Bronze → Silver → Gold → Diamond → God-Tier badges that prove what they can do.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-xl font-bold mb-2">Swarm Coordination</h3>
              <p className="text-gray-400">Deploy multiple agents as a coordinated team. They negotiate tasks, share context, and execute complex workflows autonomously.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-bold mb-2">Any Hardware Target</h3>
              <p className="text-gray-400">ROS2 robots, Arduino microcontrollers, Raspberry Pi, or cloud APIs — deploy your certified agent anywhere with one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-16 bg-gray-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Values</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">The principles that guide every decision, every feature, every line of code.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4 p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
                <div className="shrink-0 mt-1">{v.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-amber-500" />
            <h2 className="text-3xl font-bold">Roadmap</h2>
          </div>
          <div className="space-y-6">
            {MILESTONES.map((m) => (
              <div key={m.year} className="flex gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                <span className="text-3xl">{m.emoji}</span>
                <div>
                  <span className="text-sm font-bold text-amber-400">{m.year}</span>
                  <p className="text-gray-300 mt-1">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <Users className="w-10 h-10 mx-auto mb-4 text-purple-400" />
          <h2 className="text-2xl font-bold mb-2">Built by Builders, for Builders</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Titan is developed by Apifeny Labs — a team that believes AI agents should be visible, verifiable, and deployable anywhere.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-semibold hover:from-amber-400 hover:to-purple-500 transition-all shadow-lg shadow-amber-500/20"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>


    </div>
    </>
  );
}
