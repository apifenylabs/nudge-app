import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Target, Globe, Shield, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
 title: 'About',
 description: 'Apifeny AI is a curated AI tools directory with Asia-ready filters. Our mission: make AI discovery accessible to everyone in Asia.',
};

const values = [
 {
 icon: Target,
 title: 'Asia-First Discovery',
 description:
 'Most AI directories are built for Western audiences. Apifeny AI is designed for Asia — with Asia Score, local pricing indicators, multilingual support data, and use cases relevant to Asian markets.',
 },
 {
 icon: BookOpen,
 title: 'Curated, Not Crowded',
 description:
 'We don\'t just scrape the web. Every tool is reviewed and ranked using our editorial scoring system that considers quality, Asia readiness, and real user feedback.',
 },
 {
 icon: Globe,
 title: 'Multilingual by Design',
 description:
 'Asia speaks dozens of languages. We surface which tools support Chinese, Japanese, Korean, Hindi, Thai, Vietnamese, and more — so you know what works in your market.',
 },
 {
 icon: Shield,
 title: 'Trust & Transparency',
 description:
 'Every tool listing shows pricing, data residency, API availability, and Asia-specific features. No hidden agendas, no pay-to-play rankings.',
 },
];

export default function AboutPage() {
 return (
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 {/* Mission */}
 <div className="text-center mb-12 sm:mb-16">
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
 About Apifeny AI
 </h1>
 <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
 We believe the best AI tools should be discoverable by everyone — regardless of
 language, location, or budget. Apifeny AI is the first Asia-ready AI tools
 directory built specifically for the Asian market.
 </p>
 </div>

 {/* Values grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 sm:mb-16">
 {values.map((v) => {
 const Icon = v.icon;
 return (
 <div
 key={v.title}
 className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:border-neon/20 transition"
 >
 <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center mb-4">
 <Icon className="w-5 h-5 text-neon-light" />
 </div>
 <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
 <p className="text-sm text-gray-700 leading-relaxed">{v.description}</p>
 </div>
 );
 })}
 </div>

 {/* Build in Public CTA */}
 <div className="rounded-xl border border-neon/20 bg-neon/10 p-6 sm:p-8 mb-8 text-center">
 <h2 className="text-xl font-bold text-gray-900 mb-2">Built in the Open</h2>
 <p className="text-sm text-gray-800 max-w-xl mx-auto mb-4">
 We share every step of building Apifeny AI — tools added, features shipped,
 Asia Scores improved. No smoke and mirrors.
 </p>
 <Link
 href="/build-in-public"
 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-neon hover:bg-neon-dark text-white transition"
 >
 See what we&apos;re building
 <ArrowUpRight className="w-3.5 h-3.5" />
 </Link>
 </div>

 {/* How it works */}
 <div className="rounded-xl border border-gray-200 bg-white/40 p-6 sm:p-8">
 <h2 className="text-xl font-bold text-gray-900 mb-4">How It Works</h2>
 <div className="space-y-4">
 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-neon/15 text-neon-light flex items-center justify-center text-sm font-bold shrink-0">
 1
 </div>
 <div>
 <h3 className="text-sm font-semibold text-gray-900">Browse & Filter</h3>
 <p className="text-xs sm:text-sm text-gray-700 mt-1">
 Use our filters — category, pricing, Asia Score, use case, and more — to find the
 perfect tool for your needs.
 </p>
 </div>
 </div>
 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-neon/15 text-neon-light flex items-center justify-center text-sm font-bold shrink-0">
 2
 </div>
 <div>
 <h3 className="text-sm font-semibold text-gray-900">Compare & Save</h3>
 <p className="text-xs sm:text-sm text-gray-700 mt-1">
 Read detailed tool pages with Asia Score, playbooks, pricing, and reviews. Save
 tools to your stack for later comparison.
 </p>
 </div>
 </div>
 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-neon/15 text-neon-light flex items-center justify-center text-sm font-bold shrink-0">
 3
 </div>
 <div>
 <h3 className="text-sm font-semibold text-gray-900">Try & Contribute</h3>
 <p className="text-xs sm:text-sm text-gray-700 mt-1">
 Visit the tool directly through our curated links. Found a great tool we missed?
 Submit it to help the community.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
