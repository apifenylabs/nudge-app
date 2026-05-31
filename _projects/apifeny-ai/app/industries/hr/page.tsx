import { Metadata } from 'next';
import Link from 'next/link';
import {
 Users,
 BarChart3,
 Search,
 Shield,
 Zap,
 Target,
 Globe,
 ArrowRight,
 CheckCircle,
 DollarSign,
 Sparkles,
 BookOpen,
 Clock,
 MessageSquare,
} from 'lucide-react';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'AI for Human Resources — Recruiting, Performance, Analytics (2026) | Apifeny AI',
 description:
 'Discover how AI is transforming HR — automated screening, skills matching, performance analytics, employee engagement, and compliance. Real applications and top tools for HR professionals.',
 keywords: [
 'AI for human resources',
 'AI in HR',
 'AI recruiting tools',
 'AI talent acquisition',
 'AI HR analytics',
 'AI performance management',
 'AI employee engagement',
 'AI skills matching',
 'AI resume screening',
 'AI workforce planning',
 'AI HR compliance',
 'HR automation AI',
 'AI for HR professionals',
 'AI people analytics',
 'AI talent management',
 ],
 alternates: { canonical: `${BASE_URL}/industries/hr` },
 openGraph: {
 title: 'AI for Human Resources — Recruiting, Performance, Analytics (2026) | Apifeny AI',
 description:
 'AI is reshaping HR: automated candidate screening, skills-based talent matching, performance analytics, engagement prediction, and compliance automation. Explore real applications.',
 url: `${BASE_URL}/industries/hr`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'AI for Human Resources — Recruiting, Performance, Analytics (2026) | Apifeny AI',
 description:
 'AI in HR: recruiting, performance analytics, engagement, compliance. Real tools and use cases.',
 images: ['/og'],
 },
};

const APPLICATIONS = [
 {
 title: 'AI-Powered Talent Acquisition & Screening',
 icon: <Search className="w-5 h-5" />,
 color: 'from-blue-600/20 to-blue-900/10',
 border: 'border-blue-500/30',
 textColor: 'text-blue-300',
 description: 'AI transforms recruiting by automating resume screening, candidate matching, and initial assessments. Natural language processing evaluates candidate fit against job descriptions, while skills-based matching algorithms identify the best talent regardless of traditional credentials.',
 details: [
 'Automated resume parsing and skills extraction from any document format',
 'Skills-based candidate matching reducing bias from traditional pedigree filters',
 'AI-powered video interview analysis for communication and interpersonal skills',
 'Predictive hiring models that forecast candidate success and retention',
 ],
 },
 {
 title: 'AI Performance Management & Analytics',
 icon: <BarChart3 className="w-5 h-5" />,
 color: 'from-purple-600/20 to-purple-900/10',
 border: 'border-purple-500/30',
 textColor: 'text-purple-300',
 description: 'AI enables continuous performance management by analyzing work output, peer feedback, OKR progress, and engagement signals. Real-time analytics replace annual reviews with ongoing insights, helping managers identify top performers and those needing support.',
 details: [
 'Continuous feedback analysis from Slack, email, and performance reviews',
 'OKR and goal tracking with AI-generated progress summaries',
 'Manager effectiveness scores based on team sentiment and retention data',
 'Automated performance review drafts with balanced, data-backed language',
 ],
 },
 {
 title: 'AI for Employee Engagement & Retention',
 icon: <MessageSquare className="w-5 h-5" />,
 color: 'from-emerald-600/20 to-emerald-900/10',
 border: 'border-emerald-500/30',
 textColor: 'text-emerald-300',
 description: 'AI analyzes employee sentiment surveys, communication patterns, and behavioral data to predict disengagement and flight risk. HR teams receive early warnings and actionable recommendations to improve retention before departure decisions are made.',
 details: [
 'Sentiment analysis on pulse surveys, Slack messages, and feedback forms',
 'Flight risk prediction models using 50+ engagement indicators',
 'Personalized retention recommendations for managers and HRBPs',
 'Exit interview analysis identifying systemic patterns and risks',
 ],
 },
 {
 title: 'AI Skills Mapping & Workforce Planning',
 icon: <Target className="w-5 h-5" />,
 color: 'from-cyan-600/20 to-cyan-900/10',
 border: 'border-cyan-500/30',
 textColor: 'text-cyan-300',
 description: 'AI creates dynamic skills taxonomies from employee profiles, project histories, and learning records. Workforce planning models forecast future skill gaps and recommend targeted upskilling, reskilling, or hiring strategies.',
 details: [
 'Automated skills ontology generation from resumes, projects, and courses',
 'Skills gap analysis comparing current workforce against future needs',
 'Learning path recommendations personalized to career goals and gaps',
 'Strategic workforce modeling for hiring, promotion, and restructuring scenarios',
 ],
 },
 {
 title: 'AI Compliance & HR Operations',
 icon: <Shield className="w-5 h-5" />,
 color: 'from-orange-600/20 to-orange-900/10',
 border: 'border-orange-500/30',
 textColor: 'text-orange-300',
 description: 'AI reduces compliance risk by automating policy adherence checks, monitoring for pay equity, and flagging potential HR violations. Natural language processing reviews employee handbooks, policy documents, and communications for legal compliance.',
 details: [
 'Automated pay equity analysis across gender, ethnicity, and role bands',
 'Policy compliance monitoring for leave, overtime, and anti-harassment training',
 'AI audit of job descriptions for biased or exclusionary language',
 'Real-time regulatory change monitoring with impact assessment alerts',
 ],
 },
];

const TOOL_CATEGORIES = [
 {
 title: 'Recruiting & ATS',
 icon: <Search className="w-5 h-5" />,
 tools: [
 { name: 'Lever TRM + AI', desc: 'AI-powered applicant tracking with automated screening and matching' },
 { name: 'Greenhouse + AI', desc: 'ATS with AI-assisted interview kits and structured hiring' },
 { name: 'HiredScore', desc: 'AI talent intelligence and skills-based candidate matching' },
 ],
 },
 {
 title: 'People Analytics',
 icon: <BarChart3 className="w-5 h-5" />,
 tools: [
 { name: 'Visier', desc: 'AI workforce analytics with predictive retention and skills modeling' },
 { name: 'Crunchr', desc: 'People analytics platform with AI-driven workforce insights' },
 { name: 'One Model', desc: 'AI-powered HR analytics and workforce planning' },
 ],
 },
 {
 title: 'Engagement & Feedback',
 icon: <MessageSquare className="w-5 h-5" />,
 tools: [
 { name: 'Culture Amp', desc: 'AI employee engagement surveys with sentiment analysis' },
 { name: 'Lattice', desc: 'Performance management with AI-driven feedback and reviews' },
 { name: '15Five', desc: 'AI-powered continuous performance and engagement platform' },
 ],
 },
 {
 title: 'Skills & Learning',
 icon: <Target className="w-5 h-5" />,
 tools: [
 { name: 'Degreed', desc: 'AI-powered skills taxonomy and learning experience platform' },
 { name: 'Gloat', desc: 'AI internal talent marketplace with skills matching' },
 { name: 'Eightfold AI', desc: 'AI talent intelligence platform for skills mapping and matching' },
 ],
 },
];

export default function HRPage() {
 return (
 <main className="min-h-screen bg-gray-950">
 {/* Hero */}
 <section className="relative overflow-hidden border-b border-tech-700/30">
 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
 <div className="flex items-center gap-2 mb-4">
 <Users className="w-5 h-5 text-neon" />
 <span className="text-neon font-semibold text-sm uppercase tracking-wider">AI in Human Resources</span>
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
 AI for{' '}
 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
 Human Resources
 </span>
 </h1>
 <p className="text-lg sm:text-xl text-tech-300 max-w-3xl leading-relaxed mb-8">
 HR is at the center of AI&apos;s workplace transformation. From talent acquisition and performance
 management to employee engagement and compliance &mdash; <strong className="text-white">AI helps
 HR teams hire smarter, retain top talent, and build data-driven people strategies</strong> that
 align with business goals.
 </p>
 <div className="flex flex-wrap gap-3">
 <Link
 href="#applications"
 className="inline-flex items-center gap-2 bg-neon text-gray-950 font-semibold px-6 py-3 rounded-xl hover:bg-neon-light transition-colors"
 >
 <Sparkles className="w-4 h-4" />
 See Applications
 </Link>
 <Link
 href="#tools"
 className="inline-flex items-center gap-2 border border-tech-600 text-tech-200 font-medium px-6 py-3 rounded-xl hover:border-neon/50 hover:text-white transition-all"
 >
 <BarChart3 className="w-4 h-4" />
 Top AI Tools
 </Link>
 </div>
 </div>
 </section>

 {/* Stats Strip */}
 <section className="border-b border-tech-700/30 bg-tech-900/50">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
 {[
 { value: '75%', label: 'Screening Time Saved', icon: <Zap className="w-4 h-4" /> },
 { value: '20-30%', label: 'Better Retention', icon: <Users className="w-4 h-4" /> },
 { value: '3x', label: 'Faster Hiring', icon: <Search className="w-4 h-4" /> },
 { value: '5+', label: 'HR AI Categories', icon: <Target className="w-4 h-4" /> },
 ].map((stat) => (
 <div key={stat.label} className="flex flex-col items-center gap-1">
 <span className="text-neon-light">{stat.icon}</span>
 <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
 <span className="text-sm text-tech-400">{stat.label}</span>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Why AI in HR */}
 <section className="border-b border-tech-700/30 bg-tech-900/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
 Why HR Needs AI
 </h2>
 <p className="text-tech-300 max-w-3xl mb-8 leading-relaxed">
 Modern HR teams face unprecedented challenges &mdash; talent shortages, distributed workforces,
 rising compliance requirements, and employee expectations for personalized experiences.
 AI offers powerful solutions across the employee lifecycle.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {[
 { icon: <Zap className="w-5 h-5" />, title: 'Speed', desc: 'AI cuts screening time by 75% and time-to-hire by 3x, letting HR focus on strategic talent decisions.' },
 { icon: <Users className="w-5 h-5" />, title: 'Retention', desc: 'Predictive engagement analytics help retain 20-30% more top performers through early intervention.' },
 { icon: <Shield className="w-5 h-5" />, title: 'Fairness', desc: 'Skills-based matching and bias-detection AI create more equitable hiring and promotion processes.' },
 { icon: <Globe className="w-5 h-5" />, title: 'Scale', desc: 'AI enables HR teams to manage global, remote, and hybrid workforces without proportional headcount growth.' },
 ].map((item) => (
 <div key={item.title} className="bg-tech-800/40 border border-tech-700/30 rounded-xl p-5">
 <span className="text-neon-light block mb-2">{item.icon}</span>
 <h3 className="font-semibold text-white mb-1">{item.title}</h3>
 <p className="text-sm text-tech-400 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Applications */}
 <section id="applications" className="border-b border-tech-700/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
 Real AI Applications in Human Resources
 </h2>
 <p className="text-tech-300 max-w-2xl mb-10 leading-relaxed">
 From hire to retire &mdash; here&apos;s how AI is reshaping every stage of the employee lifecycle.
 </p>

 {APPLICATIONS.map((app) => (
 <div key={app.title} className="mb-10 last:mb-0">
 <div className={`bg-gradient-to-br ${app.color} border ${app.border} rounded-xl p-6 sm:p-8`}>
 <div className="flex items-center gap-3 mb-4">
 <span className={app.textColor}>{app.icon}</span>
 <h3 className="text-xl sm:text-2xl font-bold text-white">{app.title}</h3>
 </div>
 <p className="text-tech-300 mb-4 leading-relaxed">{app.description}</p>
 <ul className="space-y-2">
 {app.details.map((detail) => (
 <li key={detail} className="flex items-start gap-2 text-sm text-tech-400">
 <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${app.textColor}`} />
 <span>{detail}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Top AI Tools */}
 <section id="tools" className="border-b border-tech-700/30 bg-tech-900/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
 Top AI Tools for Human Resources
 </h2>
 <p className="text-tech-300 mb-8 max-w-2xl">
 Leading AI platforms used by HR teams worldwide for recruiting, analytics, engagement, and compliance.
 </p>

 <div className="grid sm:grid-cols-2 gap-4">
 {TOOL_CATEGORIES.map((cat) => (
 <div key={cat.title} className="bg-tech-800/40 border border-tech-700/30 rounded-xl p-5">
 <div className="flex items-center gap-2 mb-4">
 <span className="text-neon-light">{cat.icon}</span>
 <h3 className="font-semibold text-white">{cat.title}</h3>
 </div>
 <div className="space-y-3">
 {cat.tools.map((tool) => (
 <div key={tool.name} className="border-b border-tech-700/20 pb-2 last:border-0 last:pb-0">
 <h4 className="text-sm font-medium text-white">{tool.name}</h4>
 <p className="text-xs text-tech-400">{tool.desc}</p>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Related Blog Posts */}
 <section className="border-b border-tech-700/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="flex items-center gap-2 mb-2">
 <BookOpen className="w-5 h-5 text-neon" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white">
 HR & AI Guides
 </h2>
 </div>
 <p className="text-tech-300 mb-8 max-w-2xl">
 Deep-dive guides on AI applications in human resources and people management.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { slug: 'best-ai-tools-for-recruiting', title: 'Best AI Tools for Recruiting', excerpt: 'Compare the best AI recruiting tools for screening, matching, and hiring automation.' },
 { slug: 'ai-for-performance-management', title: 'AI for Performance Management', excerpt: 'How AI enables continuous feedback and data-driven performance reviews.' },
 { slug: 'best-ai-productivity-tools', title: 'Best AI Productivity Tools for HR', excerpt: 'Boost HR team productivity with AI scheduling, documentation, and workflow tools.' },
 { slug: 'ai-for-data-analysis', title: 'AI for People Analytics', excerpt: 'Leverage AI to analyze engagement, retention, and workforce data for strategic decisions.' },
 { slug: 'best-ai-writing-tools-for-hr', title: 'Best AI Writing Tools for HR', excerpt: 'AI tools for job descriptions, offer letters, policies, and HR communications.' },
 ].map((post) => (
 <Link
 key={post.slug}
 href={`/blog/${post.slug}`}
 className="group bg-tech-800/40 border border-tech-700/30 rounded-xl p-5 hover:border-neon/30 transition-all"
 >
 <h3 className="font-semibold text-white group-hover:text-neon-light transition-colors mb-2">
 {post.title}
 </h3>
 <p className="text-sm text-tech-400 line-clamp-2 mb-3">{post.excerpt}</p>
 <span className="text-xs text-neon-light group-hover:gap-2 inline-flex items-center gap-1 transition-all">
 Read Guide
 <ArrowRight className="w-3 h-3" />
 </span>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* Related Comparisons */}
 <section className="border-b border-tech-700/30 bg-tech-900/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="flex items-center gap-2 mb-2">
 <BarChart3 className="w-5 h-5 text-neon" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white">
 Related Comparisons
 </h2>
 </div>
 <p className="text-tech-300 mb-8 max-w-2xl">
 Side-by-side comparisons of AI tools relevant to HR professionals.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { slug: 'best-ats-platforms-compared', title: 'Best ATS Platforms Compared', excerpt: 'Lever TRM vs Greenhouse vs HiredScore — find the right AI-powered ATS.' },
 { slug: 'best-people-analytics-compared', title: 'Best People Analytics Tools Compared', excerpt: 'Visier vs Crunchr vs One Model — AI analytics platforms for HR.' },
 { slug: 'best-engagement-platforms-compared', title: 'Best Employee Engagement Tools Compared', excerpt: 'Culture Amp vs Lattice vs 15Five — AI engagement and feedback platforms.' },
 ].map((comp) => (
 <Link
 key={comp.slug}
 href={`/compare/${comp.slug}`}
 className="group bg-tech-800/40 border border-tech-700/30 rounded-xl p-5 hover:border-neon/30 transition-all"
 >
 <h3 className="font-semibold text-white group-hover:text-neon-light transition-colors mb-2">
 {comp.title}
 </h3>
 <p className="text-sm text-tech-400 line-clamp-2 mb-3">{comp.excerpt}</p>
 <span className="text-xs text-neon-light group-hover:gap-2 inline-flex items-center gap-1 transition-all">
 View Comparison
 <ArrowRight className="w-3 h-3" />
 </span>
 </Link>
 ))}
 </div>
 <div className="mt-6 text-center">
 <Link
 href="/compare"
 className="inline-flex items-center gap-1.5 text-sm text-tech-300 hover:text-neon-light transition-colors"
 >
 Browse all comparisons
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
 <div className="bg-gradient-to-br from-neon/10 to-blue-600/10 border border-neon/20 rounded-2xl p-8 sm:p-12">
 <Sparkles className="w-8 h-8 text-neon mx-auto mb-4" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
 Build a Smarter HR Function
 </h2>
 <p className="text-tech-300 max-w-xl mx-auto mb-6 leading-relaxed">
 Start small &mdash; try an AI recruiting tool for your next role or set up engagement pulse surveys.
 Most HR platforms offer free trials or demos tailored to your team size.
 </p>
 <div className="flex flex-wrap justify-center gap-3">
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 bg-neon text-gray-950 font-semibold px-6 py-3 rounded-xl hover:bg-neon-light transition-colors"
 >
 <BookOpen className="w-4 h-4" />
 Explore Related Blogs
 </Link>
 <Link
 href="/best-ai-tools"
 className="inline-flex items-center gap-2 border border-tech-600 text-tech-200 font-medium px-6 py-3 rounded-xl hover:border-neon/50 hover:text-white transition-all"
 >
 <Sparkles className="w-4 h-4" />
 Browse All AI Tools
 </Link>
 </div>
 </div>
 </section>

 {/* Breadcrumb Schema */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
 { '@type': 'ListItem', position: 2, name: 'AI for HR', item: `${BASE_URL}/industries/hr` },
 ],
 }),
 }}
 />
 {/* Article Schema */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: 'AI for Human Resources — Recruiting, Performance, Analytics (2026)',
 description: 'Discover how AI is transforming HR with automated screening, skills matching, performance analytics, employee engagement, and compliance automation.',
 author: { '@type': 'Organization', name: 'Apifeny AI' },
 publisher: { '@type': 'Organization', name: 'Apifeny AI' },
 datePublished: '2026-05-31',
 dateModified: '2026-05-31',
 }),
 }}
 />
 </main>
 );
}
