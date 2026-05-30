// BlogLandingLinks — Cross-link from every blog post to strategic landing pages
// (best-ai-tools, ai-tools-for-startups, /for/ hubs, comparison pages).
// This improves internal link equity and helps Google discover these pages.
//
// Matches blog tags to relevant landing pages and displays contextual CTAs.

import Link from 'next/link';
import { ArrowRight, Compass, TrendingUp, Building2, Users, Code2, Megaphone } from 'lucide-react';

interface LandingLink {
 href: string;
 label: string;
 description: string;
 keywords: string[];
 icon: React.ReactNode;
}

const LANDING_PAGES: LandingLink[] = [
 {
 href: '/best-ai-tools',
 label: 'Best AI Tools 2026',
 description: 'Curated directory of 85+ top-rated AI tools across every category',
 keywords: ['ai-tools', 'best', 'top', 'directory', 'tools', '2026', 'guide'],
 icon: <Compass className="w-4 h-4" />,
 },
 {
 href: '/ai-tools-for-startups',
 label: 'AI Tools for Startups',
 description: 'Founder-focused AI tools for fundraising, MVP building, and growth',
 keywords: ['startup', 'startups', 'founder', 'fundraising', 'mvp', 'pitch-deck', 'investor'],
 icon: <TrendingUp className="w-4 h-4" />,
 },
 {
 href: '/for/solopreneurs',
 label: 'AI for Solopreneurs',
 description: 'One-person business? These AI tools save time, money, and headaches',
 keywords: ['solopreneur', 'solopreneurs', 'freelance', 'freelancer', 'one-person', 'solo', 'independent'],
 icon: <Building2 className="w-4 h-4" />,
 },
 {
 href: '/for/developers',
 label: 'AI for Developers',
 description: 'Coding assistants, AI agents, and dev tools tested for real workflows',
 keywords: ['coding', 'development', 'developer', 'programming', 'programmers', 'code', 'engineer'],
 icon: <Code2 className="w-4 h-4" />,
 },
 {
 href: '/for/marketers',
 label: 'AI for Marketers',
 description: 'Content creation, SEO, social media, and ad optimization with AI',
 keywords: ['marketing', 'marketers', 'content', 'seo', 'social-media', 'advertising', 'campaign'],
 icon: <Megaphone className="w-4 h-4" />,
 },
 {
 href: '/compare',
 label: 'AI Tool Comparisons',
 description: 'Head-to-head comparisons of the most popular AI tools and models',
 keywords: ['comparison', 'compare', 'vs', 'head-to-head', 'versus', 'alternative'],
 icon: <TrendingUp className="w-4 h-4" />,
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
 }).filter(lp => lp.matchCount > 0)
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
 className="group flex items-start gap-3 bg-blue-50/60 border border-blue-100 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-200 transition-all"
 >
 <span className="text-blue-600 mt-0.5 shrink-0">{lp.icon}</span>
 <div className="min-w-0">
 <span className="text-sm font-medium text-blue-800 group-hover:text-blue-700 transition block truncate">
 {lp.label}
 </span>
 <span className="text-xs text-gray-500 line-clamp-1">{lp.description}</span>
 </div>
 </Link>
 ))}
 </div>
 </section>
 );
 }

 return (
 <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="flex items-center gap-2 mb-4">
 <Compass className="w-4 h-4 text-blue-600" />
 <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
 Recommended Guides
 </h3>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {scored.map((lp) => (
 <Link
 key={lp.href}
 href={lp.href}
 className="group flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
 >
 <span className="text-blue-600 mt-0.5 shrink-0">{lp.icon}</span>
 <div className="min-w-0 flex-1">
 <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition block truncate">
 {lp.label}
 </span>
 <span className="text-xs text-gray-500 line-clamp-1">{lp.description}</span>
 </div>
 <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600 shrink-0 mt-1 transition-all group-hover:translate-x-0.5" />
 </Link>
 ))}
 </div>
 </section>
 );
}
