import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';
import JsonLd from '@/components/atoms/JsonLd';

export const metadata: Metadata = {
  title: 'Blog — Titan AI Agent Platform',
  description: 'Read about AI agent progression, visual skill trees, swarm orchestration, robotics deployment, and the future of autonomous agents on the Titan blog.',
  openGraph: {
    title: 'Blog — Titan AI Agent Platform',
    description: 'Read about AI agent progression, visual skill trees, swarm orchestration, and robotics deployment.',
    type: 'website',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://titan.apifeny.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://titan.apifeny.com/blog' },
  ],
};

const POSTS = [
  {
    title: 'Introducing God-Tier Certification for AI Agents',
    excerpt: 'A deep dive into our OWASP-inspired agent audit system — how agents earn verifiable badges from Bronze through God-Tier, and what it means for the industry.',
    date: '2026-06-01',
    slug: 'god-tier-certification',
    tags: ['Product', 'Certification'],
  },
  {
    title: 'Building the Visual Skill Tree Engine',
    excerpt: 'How we designed a branching skill tree system that turns agent capabilities into an RPG-like progression experience.',
    date: '2026-05-15',
    slug: 'visual-skill-tree-engine',
    tags: ['Engineering', 'Design'],
  },
  {
    title: 'Swarm Orchestration: Coordinating Multiple AI Agents',
    excerpt: 'Our approach to multi-agent coordination — negotiation protocols, context sharing, and autonomous workflow execution.',
    date: '2026-04-28',
    slug: 'swarm-orchestration',
    tags: ['Engineering', 'Architecture'],
  },
  {
    title: 'Deploying AI Agents to Physical Robots with ROS2',
    excerpt: 'A technical walkthrough of the Titan Robotics Bridge — deploying certified agents to ROS2, Arduino, and Raspberry Pi hardware.',
    date: '2026-04-10',
    slug: 'robotics-bridge-ros2',
    tags: ['Robotics', 'Tutorial'],
  },
];

export default function BlogPage() {
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
        <section className="px-6 pt-16 pb-12">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30 text-amber-300 text-sm font-medium mb-6">
              <Newspaper className="w-3.5 h-3.5" />
              Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Titan Blog
            </h1>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
              Insights, tutorials, and deep dives into AI agent progression, swarm orchestration, and robotics deployment.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto space-y-6">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:bg-gray-800/50 hover:border-amber-700/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
            <Newspaper className="w-10 h-10 mx-auto mb-4 text-purple-400" />
            <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Get the latest on AI agent progression, robotics, and platform updates delivered to your inbox.
            </p>
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-semibold hover:from-amber-400 hover:to-purple-500 transition-all shadow-lg shadow-amber-500/20"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
