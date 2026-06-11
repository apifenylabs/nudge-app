import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, Minus, ArrowRight, Zap, TrendingUp, ShieldCheck, DollarSign, Code, Users, Cpu, Globe, Layers, Star, Swords } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Titan vs Competitors — AI Agent Builder Comparison',
  description: 'See how Titan compares to Replit, Cursor, Lovable, and v0. Visual agent progression, god-tier certification, swarm orchestration, and robotics deployment.',
  openGraph: {
    title: 'Titan vs Replit vs Cursor vs Lovable vs v0',
    description: 'The only AI agent platform with visual skill trees, god-tier certification, and robotics deployment.',
    type: 'website',
  },
};

interface ComparisonRow {
  feature: string;
  icon?: React.ReactNode;
  titan: boolean | string;
  replit: boolean | string;
  cursor: boolean | string;
  lovable: boolean | string;
  v0: boolean | string;
}

const COMPARISON: ComparisonRow[] = [
  {
    feature: 'Agent Visual Progression (7 stages → God-Tier)',
    icon: <Swords className="w-4 h-4 text-amber-500" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: 'God-Tier Certification & Badging',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: 'Visual Skill Tree Editor',
    icon: <Layers className="w-4 h-4 text-purple-500" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: 'Multi-Agent Swarm Orchestration',
    icon: <Globe className="w-4 h-4 text-sky-500" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: 'Robotics Deployment (ROS2, Arduino, Pi)',
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: 'Own Your Agent IP',
    icon: <Star className="w-4 h-4 text-amber-400" />,
    titan: true,
    replit: 'Limited',
    cursor: true,
    lovable: true,
    v0: true,
  },
  {
    feature: 'Code Generation & Editing',
    icon: <Code className="w-4 h-4 text-blue-400" />,
    titan: 'In Agent Workflows',
    replit: true,
    cursor: true,
    lovable: true,
    v0: true,
  },
  {
    feature: 'Deploy to Vercel / Cloud',
    icon: <Globe className="w-4 h-4 text-green-400" />,
    titan: true,
    replit: true,
    cursor: 'Via CLI',
    lovable: true,
    v0: true,
  },
  {
    feature: 'Team Collaboration',
    icon: <Users className="w-4 h-4 text-indigo-400" />,
    titan: 'Roadmap Q3',
    replit: true,
    cursor: false,
    lovable: true,
    v0: false,
  },
  {
    feature: 'Free Tier Available',
    icon: <DollarSign className="w-4 h-4 text-green-400" />,
    titan: true,
    replit: true,
    cursor: true,
    lovable: true,
    v0: true,
  },
  {
    feature: 'Browser-Based (No Install)',
    icon: <Zap className="w-4 h-4 text-yellow-400" />,
    titan: true,
    replit: true,
    cursor: false,
    lovable: true,
    v0: true,
  },
  {
    feature: 'Pre-Built Agent Templates',
    icon: <Layers className="w-4 h-4 text-pink-400" />,
    titan: true,
    replit: true,
    cursor: false,
    lovable: 'UI Templates',
    v0: false,
  },
  {
    feature: 'Progression Analytics',
    icon: <TrendingUp className="w-4 h-4 text-cyan-400" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: 'Enterprise SSO / RBAC',
    icon: <ShieldCheck className="w-4 h-4 text-gray-400" />,
    titan: 'Roadmap Q4',
    replit: true,
    cursor: false,
    lovable: false,
    v0: false,
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-5 h-5 text-emerald-400 mx-auto" />
      : <X className="w-5 h-5 text-red-500/60 mx-auto" />;
  }
  return <span className="text-xs text-gray-400 text-center block">{value}</span>;
}

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Nav */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span className="font-bold">Titan</span>
        </Link>
        <nav className="flex gap-6 text-sm text-gray-500">
          <Link href="/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
        </nav>
      </div>

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Titan vs. The Field
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Every platform builds agents. Only Titan evolves them — with visual skill trees, god-tier certification, 
          swarm orchestration, and real hardware deployment. Here&apos;s how we stack up.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 pr-6 font-semibold text-gray-300 w-72">Feature</th>
                <th className="py-4 px-4 font-bold text-amber-400 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4" /> Titan
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold text-gray-400 text-center">Replit</th>
                <th className="py-4 px-4 font-semibold text-gray-400 text-center">Cursor</th>
                <th className="py-4 px-4 font-semibold text-gray-400 text-center">Lovable</th>
                <th className="py-4 px-4 font-semibold text-gray-400 text-center">v0</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                  <td className="py-3.5 pr-6 text-gray-300 flex items-center gap-2">
                    {row.icon && <span className="shrink-0">{row.icon}</span>}
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-4"><Cell value={row.titan} /></td>
                  <td className="py-3.5 px-4"><Cell value={row.replit} /></td>
                  <td className="py-3.5 px-4"><Cell value={row.cursor} /></td>
                  <td className="py-3.5 px-4"><Cell value={row.lovable} /></td>
                  <td className="py-3.5 px-4"><Cell value={row.v0} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Category Deep Dives */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Where Titan Dominates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-700/40">
              <Swords className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Progression Economy</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                No other platform rewards agent growth with visible power milestones. Titan lets builders 
                turn their agents into status symbols — driving engagement and retention through gamification.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-700/40">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verified Certification</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                OWASP-inspired agent audit system. Bronze through God-Tier badges prove capability to 
                employers and enterprise buyers. Replit & Cursor offer no equivalent.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-700/40">
              <Cpu className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hardware Deployment</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                ROS2, Arduino, Raspberry Pi. Titan agents can control physical robots. This opens robotics 
                engineering, manufacturing, and IoT markets competitors cannot serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When to use each */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Which Platform for What?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <h3 className="font-semibold text-amber-400 mb-1">Titan</h3>
              <p className="text-gray-400 text-sm">Building agent systems with progression, certification, swarm orchestration, or hardware deployment.</p>
            </div>
            <div className="p-5 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <h3 className="font-semibold text-blue-400 mb-1">Replit</h3>
              <p className="text-gray-400 text-sm">Quick prototyping, collaborative coding, deploying full-stack apps in-browser.</p>
            </div>
            <div className="p-5 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <h3 className="font-semibold text-blue-400 mb-1">Cursor</h3>
              <p className="text-gray-400 text-sm">AI-powered IDE for developers who want inline code generation and editing in their local editor.</p>
            </div>
            <div className="p-5 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <h3 className="font-semibold text-blue-400 mb-1">Lovable / v0</h3>
              <p className="text-gray-400 text-sm">Rapid UI prototyping from natural language prompts. Best for frontend and landing page generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-amber-900/20 to-purple-900/20 border border-amber-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Evolve Your Agents?</h2>
          <p className="text-gray-400 mb-8">
            Titan is the only platform that turns agent building into a visual progression journey. 
            Start free — no credit card required.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-purple-600 rounded-xl font-semibold hover:from-amber-500 hover:to-purple-500 transition-all shadow-lg shadow-amber-900/20">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
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
          </nav>
          <p className="text-gray-500 text-sm">Phase 6 — Visual Progression & Robotics Bridge</p>
        </div>
      </footer>
    </div>
    </>
  );
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Titan compare to Replit for agent building?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Titan focuses on visual agent progression with 7 evolution stages to God-Tier, god-tier certification, swarm orchestration, and hardware deployment to robots. Replit is primarily an in-browser IDE for app prototyping and collaborative coding — it lacks agent progression, certification, and hardware deployment.'
      }
    },
    {
      '@type': 'Question',
      name: 'What makes Titan different from Cursor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cursor is an AI-powered code editor for inline code generation within a local IDE environment. Titan is a complete agent operating system with visual skill tree editing, god-tier badge certification, swarm coordination, and robotics bridge deployment to ROS2, Arduino, and Raspberry Pi.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does Titan support hardware deployment like robotics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Titan\'s Robotics Bridge allows certified agents to deploy directly to ROS2 robots, Arduino microcontrollers, ESP32 devices, and Raspberry Pi. No other AI agent platform offers hardware deployment — making Titan unique for robotics engineering, manufacturing, and IoT use cases.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is Titan free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Titan offers a free tier with no credit card required. Users can start building agents, progressing through the skill tree, and deploying to robotics. Higher tiers with advanced features like swarm orchestration and god-tier certification are available.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is agent progression in Titan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agent progression in Titan is a visual 7-stage evolution system: Hatchling (1-4), Apprentice (5-9), Adept (10-14), Master (15-19), Grandmaster (20-24), Legend (25-29), and God-Tier (30+). Each stage unlocks visual prestige elements, new capabilities, and higher-level skills. At God-Tier, agents gain golden auras, crown badges, and the ability to command up to 5 agents simultaneously.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I use Titan with Lovable or v0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lovable and v0 are rapid UI prototyping tools from natural language prompts — they are complementary to Titan, not competitors. You can prototype a frontend in Lovable/v0, then build and deploy your agent backend on Titan. Titan is the only platform that handles agent progression, certification, and robotics deployment end-to-end.'
      }
    }
  ]
};
