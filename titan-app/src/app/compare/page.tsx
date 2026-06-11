import { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, TrendingUp, ShieldCheck, DollarSign, Code, Users, Cpu, Globe, Layers, Star, Swords, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqPageJsonLd from "@/components/seo/FaqPageJsonLd";

export const metadata: Metadata = {
  title: "Titan vs Competitors — AI Agent Builder Comparison",
  description: "See how Titan compares to Replit, Cursor, Lovable, and v0. Visual agent progression, god-tier certification, swarm orchestration, and robotics deployment.",
  openGraph: {
    title: "Titan vs Replit vs Cursor vs Lovable vs v0",
    description: "The only AI agent platform with visual skill trees, god-tier certification, and robotics deployment.",
    type: "website",
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
    feature: "Agent Visual Progression (7 stages → God-Tier)",
    icon: <Swords className="w-4 h-4 text-amber-500" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: "God-Tier Certification & Badging",
    icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: "Visual Skill Tree Editor",
    icon: <Layers className="w-4 h-4 text-purple-500" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: "Multi-Agent Swarm Orchestration",
    icon: <Globe className="w-4 h-4 text-sky-500" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: "Robotics Deployment (ROS2, Arduino, Pi)",
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: "Own Your Agent IP",
    icon: <Star className="w-4 h-4 text-amber-400" />,
    titan: true,
    replit: "Limited",
    cursor: true,
    lovable: true,
    v0: true,
  },
  {
    feature: "Code Generation & Editing",
    icon: <Code className="w-4 h-4 text-blue-400" />,
    titan: "In Agent Workflows",
    replit: true,
    cursor: true,
    lovable: true,
    v0: true,
  },
  {
    feature: "Deploy to Vercel / Cloud",
    icon: <Globe className="w-4 h-4 text-green-400" />,
    titan: true,
    replit: true,
    cursor: "Via CLI",
    lovable: true,
    v0: true,
  },
  {
    feature: "Team Collaboration",
    icon: <Users className="w-4 h-4 text-indigo-400" />,
    titan: "Roadmap Q3",
    replit: true,
    cursor: false,
    lovable: true,
    v0: false,
  },
  {
    feature: "Free Tier Available",
    icon: <DollarSign className="w-4 h-4 text-green-400" />,
    titan: true,
    replit: true,
    cursor: true,
    lovable: true,
    v0: true,
  },
  {
    feature: "Browser-Based (No Install)",
    icon: <Zap className="w-4 h-4 text-yellow-400" />,
    titan: true,
    replit: true,
    cursor: false,
    lovable: true,
    v0: true,
  },
  {
    feature: "Pre-Built Agent Templates",
    icon: <Layers className="w-4 h-4 text-pink-400" />,
    titan: true,
    replit: true,
    cursor: false,
    lovable: "UI Templates",
    v0: false,
  },
  {
    feature: "Progression Analytics",
    icon: <TrendingUp className="w-4 h-4 text-cyan-400" />,
    titan: true,
    replit: false,
    cursor: false,
    lovable: false,
    v0: false,
  },
  {
    feature: "Enterprise SSO / RBAC",
    icon: <ShieldCheck className="w-4 h-4 text-gray-400" />,
    titan: "Roadmap Q4",
    replit: true,
    cursor: false,
    lovable: false,
    v0: false,
  },
];

const FAQS = [
  {
    q: "Is Titan really free to start?",
    a: "Yes. The Free tier gives you 1 active agent, basic Skill Forge, standard XP tracking, and community access — no credit card needed.",
  },
  {
    q: "Can I export agents built on Titan to other platforms?",
    a: "Yes. Pro and Enterprise tiers allow exporting skills to OpenClaw and other standards. You own your agent IP.",
  },
  {
    q: "Does Titan work with physical robots?",
    a: "Yes. Titan supports deployment to ROS2 (Humble/Iron), Arduino/ESP32 microcontrollers, and Raspberry Pi — unique among agent builders.",
  },
  {
    q: "How does the certification system work?",
    a: "Agents are audited through an OWASP-inspired pipeline and earn badges from Bronze through God-Tier. Certification is verified and portable.",
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value
      ? <Check className="w-5 h-5 text-emerald-400 mx-auto" />
      : <X className="w-5 h-5 text-red-300/60 mx-auto" />;
  }
  return <span className="text-xs text-gray-400 text-center block">{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { label: "Home", href: "/" },
        { label: "Compare", href: "/compare" },
      ]} />
      <FaqPageJsonLd items={FAQS} pageSlug="compare" />

      {/* ── SoftwareApplication JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Titan — Compare Plans",
            operatingSystem: "Web",
            applicationCategory: "AIApplication",
            description:
              "Compare Titan plans side by side: Free, Pro, and Enterprise tiers. Features include agent builder, swarm orchestration, skill forge, arena, and God-Tier engine.",
            url: "https://titan-app-puce.vercel.app/compare",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "USD",
              lowPrice: "0",
              highPrice: "99",
              offerCount: "3",
              offers: [
                { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
                { "@type": "Offer", name: "Pro", price: "19", priceCurrency: "USD" },
                { "@type": "Offer", name: "Enterprise", price: "99", priceCurrency: "USD" },
              ],
            },
            author: {
              "@type": "Organization",
              name: "Apifeny Labs",
            },
          }),
        }}
      />

      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-200/50 group-hover:scale-105">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">Titan</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/changelog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Changelog</Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="px-6 pt-20 pb-12 text-center bg-gradient-to-b from-teal-50/30 via-white to-white">
        <Badge variant="outline" className="mb-4 border-teal-200/20 bg-teal-50 text-teal-600">
          <Zap className="h-3 w-3 mr-1" /> Comparison
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Titan vs. The Field
        </h1>
        <p className="text-gray-500 max-w-3xl mx-auto text-lg">
          Every platform builds agents. Only Titan evolves them — with visual skill trees, god-tier
          certification, swarm orchestration, and real hardware deployment.
        </p>
      </section>

      {/* ── Comparison Table ── */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto overflow-x-auto rounded-xl border border-gray-200/30 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200/50 bg-gray-50/50">
                <th className="text-left py-4 pr-6 pl-4 font-semibold text-gray-700 w-72">Feature</th>
                <th className="py-4 px-4 font-bold text-teal-600 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4" /> Titan
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold text-gray-500 text-center">Replit</th>
                <th className="py-4 px-4 font-semibold text-gray-500 text-center">Cursor</th>
                <th className="py-4 px-4 font-semibold text-gray-500 text-center">Lovable</th>
                <th className="py-4 px-4 font-semibold text-gray-500 text-center">v0</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.feature} className={`border-b border-gray-100/50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"} hover:bg-teal-50/30 transition-colors`}>
                  <td className="py-3.5 pr-6 pl-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      {row.icon && <span className="shrink-0">{row.icon}</span>}
                      {row.feature}
                    </div>
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

      {/* ── Category Deep Dives ── */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-amber-200/20 bg-amber-50 text-amber-600">
              <Swords className="h-3 w-3 mr-1" /> Where Titan Dominates
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3 Categories No Competitor Touches
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-amber-200/20 bg-gradient-to-br from-amber-50/40 to-white shadow-sm">
              <Swords className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Progression Economy</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                No other platform rewards agent growth with visible power milestones. Titan lets builders
                turn their agents into status symbols — driving engagement and retention through gamification.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-emerald-200/20 bg-gradient-to-br from-emerald-50/40 to-white shadow-sm">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Certification</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                OWASP-inspired agent audit system. Bronze through God-Tier badges prove capability to
                employers and enterprise buyers. Replit &amp; Cursor offer no equivalent.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-teal-200/20 bg-gradient-to-br from-teal-50/40 to-white shadow-sm">
              <Cpu className="w-8 h-8 text-teal-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hardware Deployment</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                ROS2, Arduino, Raspberry Pi. Titan agents can control physical robots. This opens
                robotics engineering, manufacturing, and IoT markets competitors cannot serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── When to Use Each ── */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Which Platform for What?</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Each tool has its strengths. Here&apos;s when Titan is the right choice.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg border border-teal-200/20 bg-teal-50/20">
              <h3 className="font-semibold text-teal-700 mb-1"><Zap className="w-4 h-4 inline mr-1" />Titan</h3>
              <p className="text-gray-500 text-sm">Building agent systems with progression, certification, swarm orchestration, or hardware deployment.</p>
            </div>
            <div className="p-5 rounded-lg border border-gray-200/20 bg-gray-50/30">
              <h3 className="font-semibold text-gray-700 mb-1">Replit</h3>
              <p className="text-gray-500 text-sm">Quick prototyping, collaborative coding, deploying full-stack apps in-browser.</p>
            </div>
            <div className="p-5 rounded-lg border border-gray-200/20 bg-gray-50/30">
              <h3 className="font-semibold text-gray-700 mb-1">Cursor</h3>
              <p className="text-gray-500 text-sm">AI-powered IDE for developers who want inline code generation and editing in their local editor.</p>
            </div>
            <div className="p-5 rounded-lg border border-gray-200/20 bg-gray-50/30">
              <h3 className="font-semibold text-gray-700 mb-1">Lovable / v0</h3>
              <p className="text-gray-500 text-sm">Rapid UI prototyping from natural language prompts. Best for frontend and landing page generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-purple-200/20 bg-purple-50 text-purple-600">
              FAQ
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Questions About Titan?</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50/30 border border-gray-200/20 cursor-pointer hover:bg-teal-50/30 hover:border-teal-200/20 transition-all list-none">
                  <span className="text-sm font-medium text-gray-900 group-open:text-teal-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 pt-2 pb-4 text-sm text-gray-500 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 border border-teal-200/30">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Evolve Your Agents?</h2>
          <p className="text-gray-500 mb-8">
            Titan is the only platform that turns agent building into a visual progression journey.
            Start free — no credit card required.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-gradient-to-r from-teal-500 to-amber-500 text-white hover:from-teal-400 hover:to-amber-400 border-0 shadow-lg shadow-teal-200/30">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Titan</span>
            <span className="text-xs text-gray-400">Phasr Forge &middot; &copy; 2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span className="text-gray-300">&middot;</span>
            <Link href="/changelog" className="hover:text-gray-600 transition-colors">Changelog</Link>
            <span className="text-gray-300">&middot;</span>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
