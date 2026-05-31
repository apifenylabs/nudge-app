import { Metadata } from 'next';
import Link from 'next/link';
import {
 Building2,
 HardHat,
 Search,
 BarChart3,
 Shield,
 DraftingCompass,
 Truck,
 Zap,
 BookOpen,
 ArrowRight,
 CheckCircle,
 Globe,
 Clock,
 DollarSign,
 Sparkles,
 Hammer,
} from 'lucide-react';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'AI for Construction — Project Management, Design, Safety (2026) | Apifeny AI',
 description:
 'Discover how AI is transforming construction — project scheduling, BIM design, safety monitoring, cost estimation, and site management. Real applications and top tools for construction pros.',
 keywords: [
 'AI for construction',
 'AI construction tools',
 'AI in construction industry',
 'construction AI software',
 'AI project management construction',
 'AI BIM design',
 'AI safety monitoring construction',
 'AI cost estimation construction',
 'construction technology AI',
 'AI site management',
 'smart construction AI',
 'AI for civil engineering',
 'AI building design tools',
 'construction automation AI',
 'AI construction scheduling',
 ],
 alternates: { canonical: `${BASE_URL}/industries/construction` },
 openGraph: {
 title: 'AI for Construction — Project Management, Design, Safety (2026) | Apifeny AI',
 description:
 'AI is reshaping construction: smarter scheduling, automated safety monitoring, AI-powered BIM design, and accurate cost estimation. Explore real applications and curated tools.',
 url: `${BASE_URL}/industries/construction`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'AI for Construction — Project Management, Design, Safety (2026) | Apifeny AI',
 description:
 'AI in construction: scheduling, BIM design, safety monitoring, cost estimation. Real tools and use cases.',
 images: ['/og'],
 },
};

const APPLICATIONS = [
 {
 title: 'AI-Powered Project Scheduling & Planning',
 icon: <Clock className="w-5 h-5" />,
 color: 'from-blue-600/20 to-blue-900/10',
 border: 'border-blue-500/30',
 textColor: 'text-blue-300',
 description: 'AI analyzes historical project data, weather patterns, and resource availability to generate optimized construction schedules. Machine learning models predict delays before they happen and suggest resource reallocation in real-time.',
 details: [
 'Predictive scheduling that adjusts automatically when materials or labor are delayed',
 'Resource optimization across multiple concurrent job sites',
 'Weather-aware timeline adjustments with 14-day forecast integration',
 'Automated critical path analysis with what-if scenario modeling',
 ],
 },
 {
 title: 'AI in BIM & Design Automation',
 icon: <DraftingCompass className="w-5 h-5" />,
 color: 'from-purple-600/20 to-purple-900/10',
 border: 'border-purple-500/30',
 textColor: 'text-purple-300',
 description: 'Building Information Modeling (BIM) enhanced with AI automates clash detection, structural analysis, and code compliance checks. Generative design algorithms produce optimized structural layouts that reduce material waste by 15-30%.',
 details: [
 'Automated clash detection between structural, MEP, and architectural models',
 'Generative design for structural optimization and material reduction',
 'AI code compliance checking against local building regulations',
 '4D simulation linking BIM models to construction schedules',
 ],
 },
 {
 title: 'AI Safety Monitoring & Compliance',
 icon: <Shield className="w-5 h-5" />,
 color: 'from-emerald-600/20 to-emerald-900/10',
 border: 'border-emerald-500/30',
 textColor: 'text-emerald-300',
 description: 'Computer vision systems monitor job sites in real-time, detecting safety violations like missing PPE, unsafe worker positioning, or unauthorized site access. AI reduces workplace incidents by up to 40% in early-adopter studies.',
 details: [
 'Real-time PPE detection (helmets, vests, harnesses) via site cameras',
 'Geofencing for hazardous area alerts and exclusion zone enforcement',
 'Automated incident reporting with video evidence tagging',
 'Fatigue and behavior pattern analysis for high-risk alerts',
 ],
 },
 {
 title: 'AI Cost Estimation & Quantity Takeoff',
 icon: <DollarSign className="w-5 h-5" />,
 color: 'from-orange-600/20 to-orange-900/10',
 border: 'border-orange-500/30',
 textColor: 'text-orange-300',
 description: 'AI-powered estimation tools analyze blueprints and specifications to generate accurate quantity takeoffs and cost estimates in minutes instead of days. Historical cost data enables ±3% accuracy on early-stage estimates.',
 details: [
 'Automated quantity takeoff from 2D drawings and 3D BIM models',
 'Market-adjusted material pricing using real-time supplier data',
 'Labor cost estimation with regional wage database integration',
 'Change order impact analysis with automated budget re-forecasting',
 ],
 },
 {
 title: 'AI for Construction Supply Chain & Logistics',
 icon: <Truck className="w-5 h-5" />,
 color: 'from-cyan-600/20 to-cyan-900/10',
 border: 'border-cyan-500/30',
 textColor: 'text-cyan-300',
 description: 'AI optimizes material procurement, delivery scheduling, and inventory management across job sites. Predictive models forecast material shortages and suggest alternative suppliers before delays impact the critical path.',
 details: [
 'Just-in-time material delivery scheduling coordinated with site readiness',
 'Supplier risk scoring based on historical performance and financial health',
 'Inventory optimization across multiple active projects',
 'Automated purchase order generation with compliance checks',
 ],
 },
];

const TOOL_CATEGORIES = [
 {
 title: 'Design & BIM',
 icon: <DraftingCompass className="w-5 h-5" />,
 tools: [
 { name: 'Autodesk Forma', desc: 'AI-powered early-stage design and analysis for building performance' },
 { name: 'Revit + Dynamo', desc: 'Parametric BIM with AI-driven design automation scripts' },
 { name: 'BricsCAD BIM', desc: 'AI-assisted BIM modeling with intelligent object recognition' },
 ],
 },
 {
 title: 'Project Management',
 icon: <BarChart3 className="w-5 h-5" />,
 tools: [
 { name: 'Procore AI', desc: 'AI-enhanced construction management with predictive scheduling' },
 { name: 'Oracle Aconex', desc: 'Intelligent project controls with AI-driven risk detection' },
 { name: 'PlanGrid (Autodesk)', desc: 'AI-powered field management and blueprint markup' },
 ],
 },
 {
 title: 'Safety & Compliance',
 icon: <Shield className="w-5 h-5" />,
 tools: [
 { name: 'Smartvid.io', desc: 'AI video analytics for job site safety and productivity' },
 { name: 'Doxel', desc: 'Computer vision progress tracking and quality inspection' },
 { name: 'Buildots', desc: 'AI site monitoring comparing as-built vs design models' },
 ],
 },
 {
 title: 'Estimation & Cost Control',
 icon: <DollarSign className="w-5 h-5" />,
 tools: [
 { name: 'Bluebeam Revu + AI', desc: 'AI-assisted quantity takeoff and markup' },
 { name: 'ConstructConnect', desc: 'AI-powered cost estimating with market data' },
 { name: 'Beck Technology Destini', desc: 'AI-driven conceptual estimating and benchmarking' },
 ],
 },
];

export default function ConstructionPage() {
 return (
 <main className="min-h-screen bg-gray-950">
 {/* Hero */}
 <section className="relative overflow-hidden border-b border-tech-700/30">
 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5 pointer-events-none" />
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
 <div className="flex items-center gap-2 mb-4">
 <Building2 className="w-5 h-5 text-neon" />
 <span className="text-neon font-semibold text-sm uppercase tracking-wider">AI in Construction</span>
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
 AI for{' '}
 <span className="bg-gradient-to-r from-blue-400 to-neon-light bg-clip-text text-transparent">
 Construction
 </span>
 </h1>
 <p className="text-lg sm:text-xl text-tech-300 max-w-3xl leading-relaxed mb-8">
 The construction industry is undergoing a major transformation &mdash; AI is improving project scheduling,
 design accuracy, job site safety, and cost estimation. From automated BIM clash detection to
 computer vision safety monitoring, <strong className="text-white">AI tools are helping construction professionals
 deliver projects faster, safer, and under budget.</strong>
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
 { value: '40%', label: 'Fewer Safety Incidents', icon: <Shield className="w-4 h-4" /> },
 { value: '15-30%', label: 'Material Waste Reduction', icon: <Hammer className="w-4 h-4" /> },
 { value: '±3%', label: 'Estimate Accuracy', icon: <DollarSign className="w-4 h-4" /> },
 { value: '5+', label: 'AI Tool Categories', icon: <Zap className="w-4 h-4" /> },
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

 {/* Why AI in Construction */}
 <section className="border-b border-tech-700/30 bg-tech-900/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
 Why Construction Needs AI
 </h2>
 <p className="text-tech-300 max-w-3xl mb-8 leading-relaxed">
 Construction is one of the world&apos;s largest industries but has historically been slow to adopt
 digital technology. Margin pressure, labor shortages, and increasing project complexity are driving
 rapid AI adoption. Here&apos;s why AI matters now.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {[
 { icon: <Clock className="w-5 h-5" />, title: 'Speed', desc: 'AI reduces project scheduling time from weeks to hours and identifies delay risks before they materialize.' },
 { icon: <DollarSign className="w-5 h-5" />, title: 'Cost Control', desc: 'AI-powered estimation achieves ±3% accuracy, reducing costly overruns and change order disputes.' },
 { icon: <HardHat className="w-5 h-5" />, title: 'Safety', desc: 'Computer vision monitoring cuts workplace incidents by up to 40% with real-time hazard detection.' },
 { icon: <Globe className="w-5 h-5" />, title: 'Sustainability', desc: 'Generative design and material optimization reduce waste by 15-30%, supporting green building goals.' },
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
 Real AI Applications in Construction
 </h2>
 <p className="text-tech-300 max-w-2xl mb-10 leading-relaxed">
 From the design office to the job site &mdash; here&apos;s how AI is being applied across the
 construction lifecycle today.
 </p>

 {APPLICATIONS.map((app, i) => (
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
 Top AI Tools for Construction
 </h2>
 <p className="text-tech-300 mb-8 max-w-2xl">
 Leading AI tools used by construction firms, civil engineers, and project managers.
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
 Construction & AI Guides
 </h2>
 </div>
 <p className="text-tech-300 mb-8 max-w-2xl">
 Explore our blog for deeper insights on AI applications in construction and related industries.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { slug: 'best-ai-tools-for-project-management', title: 'AI Project Management Tools', excerpt: 'Compare the best AI tools for managing complex construction projects and timelines.' },
 { slug: 'ai-for-architecture-and-design', title: 'AI for Architecture & Design', excerpt: 'How generative design and AI are transforming architectural workflows.' },
 { slug: 'best-ai-productivity-tools', title: 'Best AI Productivity Tools', excerpt: 'Boost construction office productivity with AI scheduling, documentation, and communication tools.' },
 { slug: 'ai-for-data-analysis', title: 'AI for Data Analysis in Engineering', excerpt: 'Leverage AI to analyze construction data for better decision-making.' },
 { slug: 'ai-video-generation-tools', title: 'AI Video for Construction Training', excerpt: 'Use AI to create safety training videos and site walkthroughs.' },
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
 Side-by-side comparisons of AI tools relevant to construction professionals.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { slug: 'best-project-management-ai-compared', title: 'Best AI Project Management Tools Compared', excerpt: 'Compare Procore, Oracle Aconex, and other AI-enhanced PM tools head-to-head.' },
 { slug: 'best-ai-design-tools-compared', title: 'AI Design Tools for Engineers Compared', excerpt: 'Autodesk Forma vs Revit AI vs BricsCAD — find the right design AI.' },
 { slug: 'best-ai-data-analytics-compared', title: 'Best AI Data Analytics Tools Compared', excerpt: 'Compare AI analytics platforms for construction data and project insights.' },
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
 Bring AI to Your Construction Projects
 </h2>
 <p className="text-tech-300 max-w-xl mx-auto mb-6 leading-relaxed">
 Start with one application &mdash; try an AI scheduling tool or set up safety monitoring on one site.
 Most platforms offer free trials or demos for construction firms.
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
 { '@type': 'ListItem', position: 2, name: 'AI for Construction', item: `${BASE_URL}/industries/construction` },
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
 headline: 'AI for Construction — Project Management, Design, Safety (2026)',
 description: 'Discover how AI is transforming construction with smarter scheduling, BIM design, safety monitoring, cost estimation, and supply chain optimization.',
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
