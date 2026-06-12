import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles, Zap, Cpu, Rocket, Users, Star } from 'lucide-react';
import JsonLd from '@/components/atoms/JsonLd';

export const metadata: Metadata = {
  title: 'Join the Waitlist — Titan',
  description: 'Launching soon. Join the waitlist for Titan — the Solo Leveling Steam of AI Agents.',
  openGraph: {
    title: 'Titan — Launching Soon. Join the Waitlist.',
    description: 'No-code agent builder, visual skill trees, deploy anywhere. Get early access.',
    type: 'website',
  },
};

const BULLETS = [
  { icon: <Sparkles className="w-5 h-5 text-amber-400" />, text: 'No-code agent builder — visually craft AI agents with drag & drop workflows' },
  { icon: <Cpu className="w-5 h-5 text-purple-400" />, text: 'Visual skill trees & god-tier certification — level up like a solo RPG' },
  { icon: <Globe className="w-5 h-5 text-emerald-400" />, text: 'Deploy anywhere — web, robot (ROS2), edge hardware, or custom API' },
  { icon: <Rocket className="w-5 h-5 text-sky-400" />, text: 'Swarm orchestration — coordinate multiple agents autonomously' },
  { icon: <Zap className="w-5 h-5 text-yellow-400" />, text: 'BAU engine — always-on autonomous workflows and system monitoring' },
  { icon: <ShieldCheck className="w-5 h-5 text-rose-400" />, text: 'OWASP-secured certification — verifiable trust for enterprise deployment' },
];

const SOCIAL_PROOF = [
  { name: 'Alex Chen', role: 'CTO, SyncWave AI', quote: '"Titan\'s visual progression system is what every agent platform needs. It actually makes agent operations fun."' },
  { name: 'Maya Rivera', role: 'Founder, BuildStack', quote: '"Finally — a platform that treats agents as characters you can actually train and level up. Game changer."' },
  { name: 'James Okafor', role: 'Robotics Lead, FarmAI', quote: '"The robotics bridge alone is worth it. Deploying agents to ROS2 nodes in minutes."' },
];

// Re-import for JSX usage
import { Globe, ShieldCheck } from 'lucide-react';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://titan.apifeny.com' },
    { '@type': 'ListItem', position: 2, name: 'Waitlist', item: 'https://titan.apifeny.com/waitlist' },
  ],
};

export default function WaitlistPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-purple-900/10 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Launching Soon — Early Access
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Launching Soon
            </span>
            <br />
            <span className="text-white">Join the Waitlist</span>
          </h1>

          <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            Be among the first to build, train, and deploy AI agents that evolve like RPG characters.
            Visual progression, swarm orchestration, and hardware deployment — all in one platform.
          </p>

          {/* Email Form */}
          <form
            action="https://formspree.io/f/xeoaqkqy"
            method="POST"
            className="mt-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-amber-500 outline-none text-white placeholder-gray-500 transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-semibold hover:from-amber-400 hover:to-purple-500 transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Feature Bullets */}
      <section className="px-6 py-20 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You Get</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Titan is the complete operating system for the agent economy — from visual building to real-world deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {BULLETS.map((bullet) => (
              <div
                key={bullet.text}
                className="flex items-start gap-4 p-5 rounded-xl bg-gray-800/40 border border-gray-700/40 hover:border-amber-500/20 transition-all group"
              >
                <div className="mt-0.5 group-hover:scale-110 transition-transform">
                  {bullet.icon}
                </div>
                <p className="text-gray-300 leading-relaxed">{bullet.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12">
            <Users className="w-6 h-6 text-amber-400" />
            <h2 className="text-3xl font-bold text-center">Trusted by Builders</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SOCIAL_PROOF.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40 hover:border-amber-500/10 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-400 italic mb-6 leading-relaxed">{item.quote}</p>
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Count placeholder */}
          <div className="mt-12 text-center p-6 rounded-xl bg-gradient-to-r from-amber-900/10 to-purple-900/10 border border-amber-500/10">
            <p className="text-gray-400">
              <span className="text-amber-400 font-bold">500+</span> builders already on the waitlist.
              <span className="block text-gray-500 text-sm mt-1">Early access spots are limited.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <Rocket className="w-10 h-10 mx-auto mb-4 text-amber-400" />
          <h2 className="text-2xl font-bold mb-3">Ready to Level Up?</h2>
          <p className="text-gray-400 mb-6">
            Join the waitlist and get early access when Titan launches.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-semibold hover:from-amber-400 hover:to-purple-500 transition-all shadow-lg shadow-amber-500/20"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-600 text-xs mt-4">
            Or{' '}
            <Link href="/" className="text-amber-400 hover:text-amber-300 underline">
              return to the main site
            </Link>
          </p>
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
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
          </nav>
          <p className="text-gray-500 text-sm">© 2026 Titan — Apifeny Labs</p>
        </div>
      </footer>
    </div>
    </>
  );
}
