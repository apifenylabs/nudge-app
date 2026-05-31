// ══════════════════════════════════════════════════════════
// BlogLandingLinks — Cross-link from every blog post to strategic landing pages
// (best-ai-tools, ai-tools-for-startups, /for/ hubs, comparison pages,
// industry deep-dives). Visual card design with brand gradients.
//
// Matches blog tags to relevant landing pages and displays contextual CTAs.
// Improves internal link equity and helps Google discover these pages.
// ══════════════════════════════════════════════════════════

import Link from 'next/link';
import { ArrowRight, Compass, TrendingUp, Building2, Users, Code2, Megaphone, School, Heart, Leaf, Building, Plane, Package, Scale, Stethoscope, GraduationCap, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';

interface LandingLink {
  href: string;
  label: string;
  description: string;
  keywords: string[];
  icon: ReactNode;
  gradient: string; // tailwind gradient for visual card
}

const LANDING_PAGES: LandingLink[] = [
  {
    href: '/best-ai-tools',
    label: 'Best AI Tools 2026',
    description: 'Curated directory of 85+ top-rated AI tools across every category',
    keywords: ['ai-tools', 'best', 'top', 'directory', 'tools', '2026', 'guide'],
    icon: <Compass className="w-5 h-5" />,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    href: '/ai-tools-for-startups',
    label: 'AI Tools for Startups',
    description: 'Founder-focused AI tools for fundraising, MVP building, and growth',
    keywords: ['startup', 'startups', 'founder', 'fundraising', 'mvp', 'pitch-deck', 'investor'],
    icon: <TrendingUp className="w-5 h-5" />,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    href: '/for/solopreneurs',
    label: 'AI for Solopreneurs',
    description: 'One-person business? These AI tools save time, money, and headaches',
    keywords: ['solopreneur', 'solopreneurs', 'freelance', 'freelancer', 'one-person', 'solo', 'independent'],
    icon: <Building2 className="w-5 h-5" />,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    href: '/for/developers',
    label: 'AI for Developers',
    description: 'Coding assistants, AI agents, and dev tools tested for real workflows',
    keywords: ['coding', 'development', 'developer', 'programming', 'programmers', 'code', 'engineer'],
    icon: <Code2 className="w-5 h-5" />,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    href: '/for/marketers',
    label: 'AI for Marketers',
    description: 'Content creation, SEO, social media, and ad optimization with AI',
    keywords: ['marketing', 'marketers', 'content', 'seo', 'social-media', 'advertising', 'campaign'],
    icon: <Megaphone className="w-5 h-5" />,
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    href: '/compare',
    label: 'AI Tool Comparisons',
    description: 'Head-to-head comparisons of the most popular AI tools and models',
    keywords: ['comparison', 'compare', 'vs', 'head-to-head', 'versus', 'alternative'],
    icon: <TrendingUp className="w-5 h-5" />,
    gradient: 'from-amber-500 to-orange-600',
  },
  // Industry deep-dive pages — these boost internal link equity to new content
  {
    href: '/blog/ai-agriculture-food-tech-asia-2026',
    label: 'AgriTech & Food Tech',
    description: 'AI tools for precision farming, smart irrigation, and supply chain',
    keywords: ['agriculture', 'agritech', 'food-tech', 'farming', 'crop', 'irrigation', 'supply-chain', 'food'],
    icon: <Leaf className="w-5 h-5" />,
    gradient: 'from-green-500 to-lime-600',
  },
  {
    href: '/blog/ai-edtech-asia-2026',
    label: 'AI in Education (EdTech)',
    description: 'Complete guide to AI tools transforming learning and tutoring in Asia',
    keywords: ['education', 'edtech', 'tutoring', 'lesson-planning', 'learning', 'student', 'school', 'academic'],
    icon: <GraduationCap className="w-5 h-5" />,
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    href: '/blog/ai-mental-health-wellness-asia-2026',
    label: 'Mental Health & Wellness',
    description: 'AI therapy apps, meditation tools, and wellness platforms for Asia',
    keywords: ['mental-health', 'wellness', 'therapy', 'meditation', 'cbt', 'stress', 'anxiety', 'mindfulness'],
    icon: <Heart className="w-5 h-5" />,
    gradient: 'from-rose-400 to-pink-600',
  },
  {
    href: '/blog/ai-real-estate-proptech-asia-2026',
    label: 'Real Estate & PropTech',
    description: '40+ AI tools for property valuation, smart buildings, and construction',
    keywords: ['real-estate', 'proptech', 'property', 'construction', 'building', 'valuation', 'smart-building'],
    icon: <Building className="w-5 h-5" />,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    href: '/blog/ai-travel-hospitality-asia-2026',
    label: 'Travel & Hospitality',
    description: 'AI tools transforming hotels, airlines, OTAs, and guest experiences',
    keywords: ['travel', 'hospitality', 'hotel', 'airline', 'ota', 'guest', 'tourism', 'concierge'],
    icon: <Plane className="w-5 h-5" />,
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    href: '/blog/ai-hr-recruiting-asia-2026',
    label: 'HR & Recruiting',
    description: 'Streamline hiring, screen candidates, and onboard with AI',
    keywords: ['hr', 'recruiting', 'hiring', 'recruitment', 'human-resources', 'candidate', 'onboarding', 'talent'],
    icon: <Users className="w-5 h-5" />,
    gradient: 'from-violet-400 to-indigo-600',
  },
  {
    href: '/blog/ai-legal-compliance-asia-2026',
    label: 'Legal & Compliance',
    description: 'AI tools for contract analysis, compliance monitoring, and legal research',
    keywords: ['legal', 'compliance', 'law', 'contract', 'regulation', 'governance', 'legal-tech'],
    icon: <Scale className="w-5 h-5" />,
    gradient: 'from-slate-600 to-gray-700',
  },
  {
    href: '/blog/ai-supply-chain-logistics-asia-2026',
    label: 'Supply Chain & Logistics',
    description: 'AI solutions for inventory, routing, warehouse, and last-mile delivery',
    keywords: ['supply-chain', 'logistics', 'warehouse', 'inventory', 'delivery', 'freight', 'shipping'],
    icon: <Package className="w-5 h-5" />,
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    href: '/industries/insurance',
    label: 'Insurance & Insurtech',
    description: 'AI for underwriting, claims processing, fraud detection, and risk assessment',
    keywords: ['insurance', 'insurtech', 'underwriting', 'claims', 'fraud', 'risk-assessment', 'coverage'],
    icon: <ShieldCheck className="w-5 h-5" />,
    gradient: 'from-blue-500 to-indigo-600',
  },
];

interface BlogLandingLinksProps {
  postTags: string[];
}

export default function BlogLandingLinks({ postTags }: BlogLandingLinksProps) {
  const lowerTags = postTags.map(t => t.toLowerCase());

  // Score each landing page by keyword match count
  const scored = LANDING_PAGES.map((lp) => {
    const matchCount = lp.keywords.filter(kw =>
      lowerTags.some(tag => tag.includes(kw) || kw.includes(tag))
    ).length;
    return { ...lp, matchCount };
  })
    .filter(lp => lp.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3); // Show max 3 most relevant

  if (scored.length === 0) {
    // Fallback: show 2 most broadly useful landing pages
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Explore More</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANDING_PAGES.slice(0, 2).map((lp) => (
            <Link
              key={lp.href}
              href={lp.href}
              className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              {/* Gradient accent strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${lp.gradient}`} />
              <div className="p-4 pt-3 flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${lp.gradient} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                  {lp.icon}
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition block truncate">
                    {lp.label}
                  </span>
                  <span className="text-xs text-gray-500 line-clamp-1">{lp.description}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 shrink-0 mt-1 transition-all group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <Compass className="w-3.5 h-3.5 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Recommended Guides
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scored.map((lp) => (
          <Link
            key={lp.href}
            href={lp.href}
            className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/30 transition-all"
          >
            {/* Accent gradient strip on top */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${lp.gradient}`} />
            <div className="p-5 pt-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${lp.gradient} flex items-center justify-center text-white shadow-sm shrink-0`}>
                  {lp.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition block truncate">
                    {lp.label}
                  </span>
                  <span className="text-xs text-gray-400 block mt-0.5 line-clamp-1">
                    {lp.href.startsWith('/blog/') ? 'Industry Deep-Dive' : 'Guide'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                {lp.description}
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-3 group-hover:gap-1.5 transition-all">
                View Guide
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
