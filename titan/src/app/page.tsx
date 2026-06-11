import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Swords, Layers, Cpu, Globe, Zap, Star, Trophy } from 'lucide-react';
import MascotDisplay from '../components/organisms/MascotDisplay';
import Badge from '../components/ui/badge';
import PricingSection from '../components/organisms/PricingSection';
import ScrollDownArrow from '../components/molecules/ScrollDownArrow';
import JsonLd from '../components/atoms/JsonLd';

export const metadata: Metadata = {
  title: 'Titan — The Solo Leveling Steam of AI Agents',
  description: 'Visually level-up your personal agent swarm, certify god-tier skills, own the IP, and BYO into any enterprise or robot brain.',
  openGraph: {
    title: 'Titan — AI Agent Progression Platform',
    description: 'Level up your AI agents with visual skill trees, god-tier certification, and swarm orchestration.',
    type: 'website',
  },
};

const FEATURES = [
  {
    icon: <Swords className="w-8 h-8 text-amber-500" />,
    title: 'Visual Progression',
    desc: 'Your agent evolves through 7 stages — from Hatchling to God-Tier. Each level unlocks new abilities, auras, and visual prestige.',
  },
  {
    icon: <Layers className="w-8 h-8 text-purple-500" />,
    title: 'Skill Forge',
    desc: 'Build and customize agent skills through a visual editor. Combine abilities, set triggers, and create powerful workflows without code.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    title: 'Certification',
    desc: 'OWASP-secured audit system. Agents earn verifiable badge tiers (Bronze → Diamond → God-Tier) for proven capabilities.',
  },
  {
    icon: <Globe className="w-8 h-8 text-sky-500" />,
    title: 'Swarm Orchestrator',
    desc: 'Deploy multiple agents as a coordinated swarm. Negotiate tasks, share context, and execute complex workflows autonomously.',
  },
  {
    icon: <Cpu className="w-8 h-8 text-rose-500" />,
    title: 'Robot BYO Pipeline',
    desc: 'Deploy your certified agent to any hardware — ROS2 robots, Arduino microcontrollers, or Raspberry Pi — via the Robotics Bridge.',
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: 'BAU Engine',
    desc: 'Agents run scheduled tasks, monitor systems, and execute business workflows autonomously. Always-on, always learning.',
  },
];

const PROGRESSION = [
  { level: '1-4', emoji: '🥚', label: 'Hatchling', color: 'text-gray-400' },
  { level: '5-9', emoji: '🐣', label: 'Apprentice', color: 'text-green-400' },
  { level: '10-14', emoji: '🦊', label: 'Adept', color: 'text-blue-400' },
  { level: '15-19', emoji: '🐉', label: 'Master', color: 'text-purple-400' },
  { level: '20-24', emoji: '🦅', label: 'Grandmaster', color: 'text-orange-400' },
  { level: '25-29', emoji: '🌟', label: 'Legend', color: 'text-red-400' },
  { level: '30+', emoji: '👑', label: 'God-Tier', color: 'text-amber-400' },
];

function SmoothScrollSection({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}



export default function TitanLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge level={30}><Sparkles className="w-3 h-3 mr-1" /> Phase 6 — God-Tier & Robotics</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mt-8 bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            The Solo Leveling Steam of AI
          </h1>
          <p className="text-xl text-gray-400 mt-6 max-w-3xl mx-auto leading-relaxed">
            Visually level-up your personal agent swarm. Certify god-tier skills.
            Own the IP. BYO into any enterprise or robot brain.
          </p>
          <ScrollDownArrow />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/robotics" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-semibold hover:from-amber-400 hover:to-purple-500 transition-all shadow-lg shadow-amber-500/20">
              <Cpu className="w-5 h-5" />
              Deploy to Robot
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/waitlist" className="inline-flex items-center gap-2 px-8 py-4 border border-amber-500/40 rounded-xl font-semibold hover:bg-amber-500/10 transition-all">
              <Star className="w-5 h-5 text-amber-400" />
              Join Waitlist
            </Link>
            <Link href="/robotics/dashboard" className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 rounded-xl font-semibold hover:border-amber-500/50 transition-all">
              <Trophy className="w-5 h-5" />
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Progression Path */}
      <SmoothScrollSection id="progression" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Agent Progression Path</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Every agent starts as a Hatchling. Through experience and skill mastery, they evolve through 7 stages of power.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {PROGRESSION.map((stage) => (
              <div key={stage.label} className={`flex flex-col items-center p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 ${stage.level === '30+' ? 'ring-1 ring-amber-500/30' : ''}`}>
                <span className="text-4xl mb-2">{stage.emoji}</span>
                <span className={`text-sm font-semibold ${stage.color}`}>{stage.label}</span>
                <span className="text-xs text-gray-500 mt-1">Lv. {stage.level}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-amber-900/20 to-purple-900/20 border border-amber-500/20">
            <div className="flex items-center gap-4">
              <div className="text-5xl">👑</div>
              <div>
                <h3 className="text-xl font-bold text-amber-400">God-Tier Unlocks</h3>
                <p className="text-gray-400 mt-1">At Level 30+, agents gain a golden aura, crown badge, premium orbital ring, and the ability to command up to 5 agents simultaneously. At Level 40+: double halo and ascended form.</p>
              </div>
            </div>
          </div>
        </div>
      </SmoothScrollSection>

      {/* Features Grid */}
      <SmoothScrollSection id="features" className="px-6 py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Platform Capabilities</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From visual skill editing to hardware deployment — Titan is the complete operating system for the agent economy.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40 hover:border-amber-500/20 transition-all group">
                <div className="mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SmoothScrollSection>

      {/* Pricing Section */}
      <PricingSection />

      {/* Robotics CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
            <Cpu className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
            <h2 className="text-3xl font-bold mb-4">Deploy Anywhere</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Your certified agents can be deployed to ROS2 robots, Arduino microcontrollers, Raspberry Pi devices, or any custom hardware via webhook bridge.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 rounded-lg bg-gray-700/60 text-sm">ROS2 Nodes</span>
              <span className="px-4 py-2 rounded-lg bg-gray-700/60 text-sm">Arduino / ESP32</span>
              <span className="px-4 py-2 rounded-lg bg-gray-700/60 text-sm">Raspberry Pi</span>
              <span className="px-4 py-2 rounded-lg bg-gray-700/60 text-sm">Custom Webhook</span>
            </div>
            <Link href="/robotics" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-emerald-600 rounded-xl font-semibold hover:bg-emerald-500 transition-all">
              Start Deploying
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="font-semibold">Titan</span>
          </div>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/compare" className="hover:text-gray-300 transition-colors">Compare</Link>
          </nav>
          <p className="text-gray-500 text-sm">Phase 6 — Visual Progression & Robotics Bridge</p>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Titan — AI Agent Platform',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web, macOS, Windows, Linux',
          description: 'A drag-and-drop agent builder for developers and teams. Build, deploy, and manage custom AI agents with robotics integration, referral rewards, and visual progression.',
          url: 'https://titan-ai.vercel.app',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free tier available with paid plans starting at $19/mo',
          },
          author: {
            '@type': 'Organization',
            name: 'Titan',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            bestRating: '5',
            ratingCount: '127',
          },
          featureList: [
            'Drag-and-drop agent builder',
            '100+ tool integrations',
            'Robotics & IoT deployment',
            'Real-time monitoring dashboard',
            'Team collaboration',
            'Referral program with 20% recurring commission',
          ],
        }}
      />
    </div>
  );
}
