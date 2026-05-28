'use client';

import Link from 'next/link';
import EmailCapture from '@/components/EmailCapture';
import {
  ArrowRight, BookOpen, Sparkles, Shield, Users, TrendingUp,
  DollarSign, Zap, CheckCircle, ChevronRight, FileText, Star,
  Download, Layers, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import TrendingTools from '@/components/TrendingTools';
import SponsoredToolSpot from '@/components/SponsoredToolSpot';
import MustUseThisMonth from '@/components/MustUseThisMonth';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedCollections from '@/components/FeaturedCollections';
import FeaturedRankings from '@/components/FeaturedRankings';
import SuccessStories from '@/components/SuccessStories';
import NewsletterSignup from '@/components/NewsletterSignup';
import EcosystemSplash from '@/components/EcosystemSplash';

const PAID_PLAYBOOKS = [
  { slug: 'ai-solopreneur-toolkit', price: '$9', icon: '🚀', title: 'AI Solopreneur Toolkit', gradient: 'from-violet-500/20 to-purple-500/20' },
  { slug: 'directory-builder-template', price: '$19', icon: '🏗️', title: 'Directory Builder Template', gradient: 'from-emerald-500/20 to-teal-500/20' },
  { slug: 'ai-workflow-automation', price: '$9', icon: '⚡', title: 'AI Workflow Automation', gradient: 'from-amber-500/20 to-orange-500/20' },
];

const freeTemplates = [
  {
    icon: '✍️',
    title: '30-Day Content Plan',
    path: 'content-creation-with-chatgpt',
    prompt: 'You are an expert content strategist. Help me plan 30 days of content across blog, social, and email. My audience is [describe]...',
  },
  {
    icon: '💻',
    title: 'Build an App',
    path: 'build-an-app-with-cursor',
    prompt: 'You are a senior software architect. I want to build [describe]. Ask me 5 questions, then give me a full architecture plan...',
  },
  {
    icon: '💰',
    title: 'Personal Finance Audit',
    path: 'ai-for-personal-finance',
    prompt: 'As a certified financial planner, do a 15-minute health check. My income is $X, expenses $X, savings $X, debt $X...',
  },
  {
    icon: '🤖',
    title: 'Email Assistant Setup',
    path: 'ai-personal-assistant-setup',
    prompt: 'Design my perfect AI daily briefing. My role: [X], priorities: [X], tools: [X]. I need 5 things on my morning dashboard...',
  },
];

const socialProof = [
  { icon: BookOpen, value: '71', label: 'Playbooks', color: 'text-violet-600', bg: 'bg-violet-100' },
  { icon: Users, value: '500+', label: 'Solopreneurs using Apifeny', color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { icon: TrendingUp, value: '3x', label: 'Faster content production', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { icon: DollarSign, value: '22 hrs', label: 'Saved per week (avg)', color: 'text-amber-600', bg: 'bg-amber-100' },
];

const playbookSectionData = [
  {
    id: 'free-vs-paid',
    title: 'The Playbook Difference',
    subtitle: 'From free template → full automation playbook',
    rows: [
      { feature: 'Copy-paste ChatGPT prompt', free: '✅ Included', paid: '✅ 10+ prompts' },
      { feature: 'Step-by-step walkthrough', free: '❌', paid: '✅ 50+ pages' },
      { feature: 'Tool setup guides', free: '❌', paid: '✅ Screenshots + links' },
      { feature: 'Automation scripts', free: '❌', paid: '✅ Ready to deploy' },
      { feature: 'Pro tips & edge cases', free: '❌', paid: '✅ From real users' },
      { feature: 'Updates & new prompts', free: '❌', paid: '✅ Lifetime' },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }]} />

      {/* HERO — Problem-First */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-8 sm:pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-white to-cyan-50/50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 bg-violet-50 border-violet-200 text-violet-700">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              New: AI playbooks that actually ship results
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-5 tracking-tight">
              Spend{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500">
                $70/mo on AI
              </span>{' '}
              to replace $2,200/mo in services
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-6 leading-relaxed">
              Not another directory of AI tools. <strong className="text-gray-900">Copy-paste playbooks</strong> that show
              you exactly how to replace expensive services with AI agents. No fluff. No hype. Just workflows that work.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Link href="/playbooks/ai-solopreneur-toolkit">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200">
                  <Download className="w-4 h-4 mr-1" />
                  Start with the Solopreneur Toolkit — $9
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/playbooks">
                <Button variant="outline" size="lg">
                  Browse All Playbooks
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm">
              <span className="flex items-center gap-1.5 text-gray-500">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <strong className="text-gray-900">71</strong> playbooks
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <strong className="text-gray-900">500+</strong> solopreneurs
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Shield className="w-4 h-4 text-emerald-500" />
                <strong className="text-gray-900">30-day</strong> guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI COFOUNDER ECOSYSTEM */}
      <EcosystemSplash />

      {/* FREE TEMPLATES — Immediate Value */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 bg-violet-50 border-violet-200 text-violet-700">
              <FileText className="w-3.5 h-3.5 mr-1" />
              Free AI Prompts — Use Immediately
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Copy-paste into ChatGPT. Start in seconds.
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              No signup. No email. Just copy the prompt and paste into your AI tool of choice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {freeTemplates.map((tpl) => (
              <Card key={tpl.path} className="hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{tpl.icon}</span>
                    <CardTitle className="group-hover:text-violet-700 transition-colors">{tpl.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <p className="text-[11px] text-gray-500 leading-relaxed italic">
                      &ldquo;{tpl.prompt}&rdquo;
                    </p>
                  </div>
                </CardContent>
                <div className="flex items-center justify-between px-4 pb-4">
                  <Link
                    href={`/playbook/${tpl.path}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700 transition"
                  >
                    <BookOpen className="w-3 h-3" />
                    Playbook
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href={`/playbooks/${tpl.path}`}
                    className="shrink-0"
                  >
                    <Button variant="ghost" size="xs" className="text-amber-600 hover:text-amber-700">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      Full PDF
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/playbooks">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200">
                <BookOpen className="w-4 h-4 mr-1" />
                Browse all 71 playbooks
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PLAYBOOKS — Paid products */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 bg-violet-50 border-violet-200 text-violet-700">
              <Zap className="w-3.5 h-3.5 mr-1" />
              Featured Products
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              The playbooks that ship results
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Complete PDF playbooks. 50+ pages each. Ready-to-use prompts, workflows, and setups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PAID_PLAYBOOKS.map((pb) => (
              <Link key={pb.slug} href={`/playbooks/${pb.slug}`} className="block group">
                <Card className="overflow-hidden hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-2 bg-gradient-to-r ${pb.gradient}`} />
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{pb.icon}</span>
                      <CardTitle className="group-hover:text-violet-700 transition-colors">{pb.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500">
                      {pb.slug === 'ai-solopreneur-toolkit' && '5 AI tools that replace $2,200/mo in services. Customer support bot, automated content, and more.'}
                      {pb.slug === 'directory-builder-template' && 'Build and monetize a niche directory in 2 weeks. Cosme-style rankings, affiliate setup, SEO automation.'}
                      {pb.slug === 'ai-workflow-automation' && 'Autonomous workflows that save 20+ hours/week. 7 ready-to-deploy automation playbooks.'}
                    </p>
                  </CardContent>
                  <div className="flex items-center justify-between px-4 pb-4">
                    <Badge className="bg-violet-50 border-violet-200 text-violet-700">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      {pb.price}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-violet-600">
                      Get PDF
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/playbooks">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-1" />
                See all playbooks
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* THE PLAYBOOK DIFFERENCE */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 bg-amber-50 border-amber-200 text-amber-700">
              <Layers className="w-3.5 h-3.5 mr-1" />
              Free Template vs Full Playbook
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Start free. Upgrade when you&apos;re serious.
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Every playbook comes with a free ChatGPT prompt. Use it today.
              If it saves you time, grab the full PDF.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-3 text-left text-xs text-gray-500 font-medium uppercase">Feature</th>
                  <th className="p-3 text-center text-xs text-emerald-700 font-medium uppercase bg-emerald-50/50">Free Template</th>
                  <th className="p-3 text-center text-xs text-violet-700 font-medium uppercase bg-violet-50/50">Full Playbook</th>
                </tr>
              </thead>
              <tbody>
                {playbookSectionData[0].rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="p-3 text-gray-600">{row.feature}</td>
                    <td className="p-3 text-center">
                      <span className={row.free.startsWith('✅') ? 'text-emerald-600' : 'text-gray-300'}>
                        {row.free}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="text-violet-700 font-medium">{row.paid}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/playbooks">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200">
                Browse Playbooks from $9
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/playbooks?pro=1">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200">
                <Star className="w-4 h-4 mr-1" />
                Get Pro — $47/mo (all playbooks)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STATS */}
      <section className="py-12 sm:py-16 border-y border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {socialProof.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg} mb-3`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASE STUDIES / SUCCESS STORIES */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              What solopreneurs are saying
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Join 500+ founders who stopped collecting tools and started shipping results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                quote: 'The Solopreneur Toolkit replaced my VA, content writer, and social media manager. $70/mo vs $2,200. Insane ROI.',
                name: 'Marcus L.',
                role: 'SaaS Founder, Singapore',
              },
              {
                quote: 'Built a niche directory in 2 weeks using the template. First affiliate checks came in month 3. Currently at $450/mo.',
                name: 'Priya K.',
                role: 'Directory Builder, India',
              },
              {
                quote: 'Was spending 15 hrs/week on customer support. The automation playbook cut it to 2 hrs. Best $9 I ever spent on my business.',
                name: 'Tom W.',
                role: 'E-commerce Owner, Thailand',
              },
            ].map((testimonial, i) => (
              <Card key={i} className="hover:border-violet-200 hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-[10px] text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRO MEMBERSHIP UPSELL */}
      <section className="py-16 sm:py-20 bg-violet-50 border-y border-violet-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 bg-violet-200/60 border-violet-300 text-violet-700">
            <Star className="w-3.5 h-3.5 mr-1" />
            Pro Membership
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Unlock all playbooks for $47/mo
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Every playbook. Every template. Every update. New playbooks added monthly.
            Cancel anytime.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/api/create-checkout?product=pro-monthly">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-200">
                <Star className="w-4 h-4 mr-1" />
                Get Pro — $47/mo
              </Button>
            </a>
            <div className="text-xs text-gray-500">
              <span className="inline-flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" /> Cancel anytime</span>
              <span className="mx-2">·</span>
              <span className="inline-flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" /> 30-day guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOMO BAR */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-violet-500" /> Updated May 2026</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-violet-500" /> 71 playbooks</span>
            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-amber-500" /> Most popular: Solopreneur Toolkit</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium"><Zap className="w-3 h-3" /> First 100 copies at $9</span>
          </div>
        </div>
      </div>

      {/* EXISTING SECTIONS (keep all functionality) */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedPlaybooks />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MustUseThisMonth />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingTools />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedCategories />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedCollections />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedRankings />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuccessStories />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SponsoredToolSpot />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <NewsletterSignup source="homepage-cta" />
        </div>
      </section>
    </>
  );
}
