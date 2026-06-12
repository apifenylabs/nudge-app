import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Cpu, Globe, Code, Database, ArrowRight, Wrench } from 'lucide-react';
import JsonLd from '@/components/atoms/JsonLd';

export const metadata: Metadata = {
  title: 'BYO — Bring Your Own Models, Tools & Hardware | Titan',
  description: 'Titan lets you bring your own AI models, custom tools, and hardware. No vendor lock-in — deploy certified agents anywhere.',
  openGraph: {
    title: 'BYO — Bring Your Own to Titan',
    description: 'Bring your own models, tools, and hardware to the Titan agent platform.',
    type: 'website',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://titan.apifeny.com' },
    { '@type': 'ListItem', position: 2, name: 'BYO', item: 'https://titan.apifeny.com/byo' },
  ],
};

const BYO_FEATURES = [
  {
    icon: <Cpu className="w-8 h-8 text-amber-500" />,
    title: 'BYO AI Models',
    desc: 'Connect any LLM provider — OpenAI, Anthropic, Google, local models via Ollama, or your own fine-tuned models. No forced vendor lock-in.',
  },
  {
    icon: <Wrench className="w-8 h-8 text-emerald-500" />,
    title: 'BYO Custom Tools',
    desc: 'Define your own agent tools with custom APIs, internal services, or third-party integrations. TypeScript-first tool definitions with schema validation.',
  },
  {
    icon: <Database className="w-8 h-8 text-purple-500" />,
    title: 'BYO Data Sources',
    desc: 'Connect agents to your databases (PostgreSQL, MongoDB, Redis), document stores (S3, Google Drive, Notion), or custom data pipelines.',
  },
  {
    icon: <Globe className="w-8 h-8 text-sky-500" />,
    title: 'BYO Deployment Targets',
    desc: 'Deploy agents to cloud VPS, edge devices, Kubernetes clusters, or physical hardware via the Robotics Bridge. Your infrastructure, your rules.',
  },
  {
    icon: <Code className="w-8 h-8 text-rose-500" />,
    title: 'BYO Skill Templates',
    desc: 'Extend the Skill Forge with community or private skill templates. Share across your team or keep proprietary skills in your private registry.',
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: 'BYO Authentication',
    desc: 'Enterprise SSO, OAuth, API keys, or custom auth providers. Integrate Titan into your existing identity infrastructure.',
  },
];

export default function ByoPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        {/* Nav */}
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold">Titan</span>
          </Link>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-20 pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30 text-amber-300 text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Open Ecosystem
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Bring Your Own Everything
            </h1>
            <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed">
              Titan is an open platform. Bring your own models, tools, data, and hardware. 
              Your agents, your infrastructure, your IP — no compromises.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BYO_FEATURES.map((f) => (
                <div key={f.title} className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="px-6 py-16 bg-gray-900/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The BYO Philosophy</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              We believe the best AI platforms don&apos;t lock you in — they amplify what you already have. 
              Titan is built on a simple principle: your agents should work with your existing infrastructure, 
              not force you to rebuild it.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Whether you&apos;re using OpenAI models today and want to switch to a self-hosted Llama 
              deployment tomorrow, or you need your agents to talk to internal APIs behind a corporate 
              firewall — Titan makes it seamless.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              No migration costs. No vendor lock-in. Just agents that work where you need them.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
            <Globe className="w-10 h-10 mx-auto mb-4 text-purple-400" />
            <h2 className="text-2xl font-bold mb-2">Bring Your Stack to Titan</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Start building agents that work with your infrastructure. Free tier available — no credit card required.
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
