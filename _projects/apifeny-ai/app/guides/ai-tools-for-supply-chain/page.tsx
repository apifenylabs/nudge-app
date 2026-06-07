import { Metadata } from 'next';
import Link from 'next/link';
import {
 Truck,
 Package,
 Warehouse,
 Globe,
 Map,
 Shield,
 DollarSign,
 TrendingUp,
 Container,
 Route,
 Clock,
 Users,
 Box,
 ArrowRight,
 Sparkles,
 Bot,
 MessageSquare,
 BarChart3,
 FileText,
 BookOpen,
 Lightbulb,
 Rocket,
 Star,
 Target,
 CheckCircle,
 UserCheck,
 Zap,
 Activity,
 Calendar,
 LineChart,
 Network,
 Anchor,
 Ship,
 RefreshCw,
 Search,
 AlertTriangle,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import FAQSchema from '@/components/FAQSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Best AI Tools for Supply Chain & Logistics in 2026 — Complete Guide | Apifeny AI',
 description:
 'Compare the best AI tools for supply chain management, logistics, inventory optimization, demand forecasting, warehouse automation, freight management, and supply chain risk resilience in 2026. With Asia-Pacific supply chain focus.',
 keywords: [
 'AI tools for supply chain',
 'best AI supply chain tools 2026',
 'AI logistics software',
 'AI inventory optimization',
 'AI demand forecasting',
 'AI warehouse automation',
 'AI route optimization',
 'AI freight management',
 'AI procurement tools',
 'AI supplier management',
 'AI supply chain risk',
 'AI supply chain resilience',
 'supply chain AI Asia',
 'AI logistics China',
 'AI supply chain Singapore',
 'AI warehouse management',
 'AI shipping tools',
 'AI freight forwarding',
 'AI supply chain analytics',
 'AI demand planning',
 'AI inventory management software',
 'AI logistics startup tools',
 'smart supply chain',
 'AI for manufacturing supply chain',
 'AI supply chain ASEAN',
 ],
 alternates: {
 canonical: `${BASE_URL}/guides/ai-tools-for-supply-chain`,
 },
 openGraph: {
 title: 'Best AI Tools for Supply Chain & Logistics in 2026 — Complete Guide',
 description:
 'Practical guide to the best AI tools for supply chain management, logistics, inventory optimization, demand forecasting, warehouse automation, freight management, and supply chain risk resilience. With Asia-Pacific supply chain focus.',
 url: `${BASE_URL}/guides/ai-tools-for-supply-chain`,
 type: 'article',
 locale: 'en_US',
 siteName: 'Apifeny AI',
 images: [
 {
 url: `${BASE_URL}/og/ai-tools-for-supply-chain.jpg`,
 width: 1200,
 height: 630,
 alt: 'Best AI Tools for Supply Chain & Logistics in 2026',
 },
 ],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools for Supply Chain & Logistics in 2026 — Complete Guide',
 description:
 'Practical guide to AI tools for supply chain management, logistics, inventory optimization, demand forecasting, warehouse automation, freight management, and supply chain risk.',
 },
};

// ─── Content sections ───
const sections = [
 {
 id: 'demand-forecasting-inventory',
 title: '1. AI Demand Forecasting & Inventory Optimization',
 icon: TrendingUp,
 color: 'bg-blue-50 ',
 text: `Accurate demand forecasting is the foundation of an efficient supply chain. AI demand forecasting tools analyse historical sales data, market trends, seasonality, weather patterns, and even social media sentiment to predict future demand with remarkable precision. For Asia-Pacific supply chains — where manufacturing hubs in China, Vietnam, and Thailand feed into distribution networks spanning Singapore, Japan, and Australia — AI-driven forecasting helps companies reduce inventory carrying costs while maintaining service levels across complex multi-market operations.

Key capabilities of AI demand forecasting and inventory tools:
• Multi-variable forecasting: combine sales history, promotions, weather, economic indicators, and competitor activity
• SKU-level granularity: predict demand down to individual product variants across hundreds of locations
• Seasonal pattern recognition: detect recurring demand cycles aligned to Chinese New Year, Golden Week, Ramadan, Diwali, and other APAC-specific events
• Inventory optimisation: recommend safety stock levels, reorder points, and economic order quantities
• Dead stock detection: flag slow-moving inventory before it becomes obsolete
• Lead time intelligence: factor in supplier lead time variability from different APAC sourcing regions
• Cross-border demand smoothing: normalise demand patterns across diverse markets like Japan, Korea, India, and Southeast Asia
• Real-time adjustments: continuously update forecasts as new sales and supply data arrives

For supply chain teams managing inventory across Asia's fast-moving consumer markets, AI demand forecasting reduces forecast error by 30–50% compared to traditional statistical methods, directly improving working capital efficiency and customer fill rates. Global logistics hubs like Singapore and Hong Kong, where warehousing space commands premium pricing, see particularly strong ROI from inventory optimisation AI.`,
 tools: ['chatgpt', 'claude', 'perplexity'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Quick demand forecast analysis from raw sales data and CSV uploads' },
 { name: 'Claude', slug: 'claude', note: 'Deep multi-variable demand modeling with 200K context for large datasets' },
 { name: 'Perplexity', slug: 'perplexity', note: 'Research industry benchmarks, demand patterns, and market intelligence' },
 ],
 },
 {
 id: 'logistics-route-optimization',
 title: '2. AI Logistics & Route Optimization',
 icon: Route,
 color: 'bg-purple-50 ',
 text: `Route optimisation is where AI delivers some of the most tangible cost savings in supply chain operations. AI logistics tools compute optimal delivery routes across thousands of stops, accounting for real-time traffic, weather, vehicle capacity, driver hours, delivery time windows, and customer preferences. For logistics operations across Asia — from last-mile delivery in dense Singapore and Hong Kong urban corridors to long-haul trucking across Thailand, Vietnam, and Malaysia's growing highway networks — AI route optimisation is no longer optional.

AI-powered logistics and route optimisation features:
• Dynamic rerouting: automatically adjust routes when traffic incidents, road closures, or weather disruptions occur
• Multi-stop optimisation: sequence hundreds of stops for minimum distance, time, and fuel consumption
• Vehicle-mix optimisation: match shipment sizes to the right vehicle type across different load types
• Driver scheduling: integrate driver availability, shift preferences, and mandatory rest periods
• Delivery time windows: honour customer-specific delivery slots while maintaining route efficiency
• Cross-border route planning: handle customs clearance points, border wait times, and cross-border permits across ASEAN
• Last-mile density optimisation: cluster deliveries efficiently in high-density APAC urban markets
• Return trip optimisation: minimise empty return miles by suggesting backhaul loads

For logistics providers and in-house distribution teams in Asia's rapidly growing markets, AI route optimisation typically reduces fuel costs by 15–25%, increases delivery stops per route by 20–30%, and improves on-time delivery rates to 98%+. Companies running delivery fleets in Jakarta, Manila, Bangkok, and Ho Chi Minh City — where traffic congestion is extreme — see the most dramatic improvements from real-time route intelligence.`,
 tools: ['chatgpt', 'crewai', 'n8n'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Analyse route data, generate optimisation recommendations, and create manifests' },
 { name: 'CrewAI', slug: 'crewai', note: 'Build multi-agent logistics systems coordinating dispatchers, drivers, and customers' },
 { name: 'n8n', slug: 'n8n', note: 'Automate route alerts, ETA notifications, and logistics workflow triggers' },
 ],
 },
 {
 id: 'warehouse-automation',
 title: '3. AI Warehouse Automation & Management',
 icon: Warehouse,
 color: 'bg-green-50 ',
 text: `Warehouse operations are the engine room of any supply chain, and AI is fundamentally transforming how warehouses are managed across Asia. AI warehouse automation tools optimise slotting, picking paths, labour allocation, and inventory placement — turning chaotic warehouses into precision operations. For warehouses in Asia's key logistics hubs — Singapore's Jurong, Hong Kong's Kwai Tsing, Shenzhen's Qianhai, and Japan's Narita distribution centres — AI brings data-driven efficiency to every square metre.

Key AI warehouse management capabilities:
• Intelligent slotting: AI determines optimal product placement based on velocity, size, weight, and order affinity patterns
• Pick path optimisation: compute the shortest walking path for pickers across tens of thousands of SKUs
• Labour forecasting: predict staffing needs by hour based on incoming order waves and historical patterns
• Cycle counting: AI prioritises which inventory to count based on value, velocity, and discrepancy risk
• Cross-docking identification: automatically flag inbound shipments suitable for direct outbound cross-docking
• Returns management: AI triages returned items into restock, refurbish, recycle, or dispose categories
• Storage density analysis: identify wasted vertical space and suggest racking reconfigurations
• Automation integration: coordinate with AMRs (autonomous mobile robots), conveyor systems, and automated sortation

For warehouses across Asia — from Japan's famously efficient automotive and electronics logistics to Southeast Asia's booming e-commerce fulfilment centres — AI warehouse tools increase throughput per square metre by 25–40% while reducing picking error rates below 0.1%. In high-rent markets like Singapore, where warehouse space costs $10+ per square foot annually, AI-driven space utilisation delivers direct bottom-line impact.`,
 tools: ['chatgpt', 'claude', 'make'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Generate slotting plans, shift schedules, and operational summaries' },
 { name: 'Claude', slug: 'claude', note: 'Analyse warehouse layouts, space utilisation, and process optimisation models' },
 { name: 'Make', slug: 'make', note: 'Connect WMS data, automate alerts, and sync inventory across systems' },
 ],
 },
 {
 id: 'procurement-supplier',
 title: '4. AI Procurement & Supplier Management',
 icon: DollarSign,
 color: 'bg-amber-50 ',
 text: `Procurement in Asia-Pacific supply chains is uniquely complex — sourcing spans thousands of suppliers across China's manufacturing powerhouses, Vietnam's emerging industrial zones, India's engineering hubs, and Japan's precision manufacturing clusters. AI procurement tools transform supplier discovery, evaluation, negotiation, and relationship management by bringing data-driven intelligence to every stage of the sourcing lifecycle.

AI procurement and supplier management capabilities:
• Supplier discovery: AI scans global supplier databases to identify qualified alternatives for every commodity
• Risk scoring: continuously assess supplier financial health, compliance status, geopolitical exposure, and production capacity
• Price benchmarking: compare supplier quotes against market rates, historical pricing, and commodity indices
• Contract intelligence: extract key terms, renewal dates, and compliance obligations from supplier contracts
• Sustainability scoring: evaluate suppliers on ESG metrics including carbon footprint, labour practices, and material sourcing
• Negotiation support: AI suggests negotiation strategies based on market conditions and supplier relationship history
• Performance analytics: track supplier quality, on-time delivery, lead time variability, and corrective action history
• Sourcing localisation: identify regional suppliers to reduce lead times and tariff exposure across APAC trade blocs

For procurement teams sourcing across China, ASEAN, and India for global supply chains, AI procurement tools reduce sourcing cycle time by 40–60% and typically achieve 8–15% cost savings through better supplier selection and negotiation intelligence. As supply chains increasingly diversify from China into Vietnam, Thailand, India, and Mexico — the "China Plus One" strategy — AI helps procurement teams rapidly qualify and onboard new suppliers in unfamiliar markets.`,
 tools: ['claude', 'chatgpt', 'perplexity'],
 affiliateSuggestions: [
 { name: 'Claude', slug: 'claude', note: 'Deep contract analysis, supplier risk scoring, and negotiation strategy' },
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Quick supplier research, RFQ generation, and price comparison analysis' },
 { name: 'Perplexity', slug: 'perplexity', note: 'Real-time supplier reputation, news monitoring, and market intelligence' },
 ],
 },
 {
 id: 'freight-shipping',
 title: '5. AI Freight & Shipping Management',
 icon: Ship,
 color: 'bg-red-50 ',
 text: `International freight and shipping is the backbone of Asia-Pacific trade, moving goods through the world's busiest container ports — Shanghai, Singapore, Shenzhen, Ningbo, Busan, and Hong Kong. AI freight management tools optimise carrier selection, rate negotiation, shipment tracking, documentation, and customs compliance across complex multimodal routes. For freight forwarders, 3PLs, and in-house logistics teams managing Asia's export-driven supply chains, AI delivers unprecedented visibility and cost control.

AI freight and shipping management features:
• Carrier rate optimisation: compare spot rates, contract rates, and consolidator pricing across ocean, air, rail, and road
• Shipment tracking: AI-powered tracking across 200+ carriers with predictive ETA that adjusts for port congestion, weather, and customs delays
• Documentation automation: auto-generate bills of lading, certificates of origin, packing lists, and customs declarations
• Port congestion intelligence: real-time visibility into berth wait times at major APAC ports using AIS data and AI analytics
• Route scenario analysis: compare cost, transit time, and carbon impact across all-shipping and multimodal alternatives
• Demurrage and detention management: AI alerts when free time is approaching expiry at ports and terminals
• Customs compliance: flag regulatory requirements, tariff classifications, and restricted goods for each APAC market
• Carbon tracking: automatically calculate Scope 3 shipping emissions across ocean, air, and land transport legs

For companies shipping from China, Vietnam, and India to global markets, AI freight management tools reduce freight spend by 10–20% through intelligent carrier selection and reduce customs clearance delays by 30–50% through automated documentation and compliance checks. In the post-pandemic era of volatile ocean rates and port congestion, real-time AI intelligence has become essential for managing Asia's export logistics.`,
 tools: ['chatgpt', 'claude', 'n8n'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Generate shipping documentation, rate comparisons, and tracking summaries' },
 { name: 'Claude', slug: 'claude', note: 'Deep analysis of shipping contracts, tariffs, and compliance requirements' },
 { name: 'n8n', slug: 'n8n', note: 'Automate shipment alerts, customs status updates, and rate monitoring workflows' },
 ],
 },
 {
 id: 'risk-resilience',
 title: '6. AI Supply Chain Risk & Resilience',
 icon: Shield,
 color: 'bg-cyan-50 ',
 text: `Supply chain resilience has become the top priority for Asian manufacturers and distributors following years of disruptions — from COVID factory shutdowns in China and semiconductor shortages in Taiwan to Red Sea shipping disruptions and extreme weather across Southeast Asia. AI risk and resilience tools provide early warning, impact analysis, and mitigation recommendations to help supply chains weather disruptions while maintaining business continuity.

AI supply chain risk and resilience capabilities:
• Real-time disruption monitoring: AI scans news, social media, weather, and geopolitical sources for emerging risk signals
• Multi-tier visibility: map and monitor suppliers beyond Tier 1 to uncover hidden vulnerabilities in the extended supply base
• Impact simulation: run "what-if" scenarios for supplier bankruptcies, port closures, tariffs, natural disasters, and logistics strikes
• Bottleneck analysis: identify single-source dependencies, capacity constraints, and geographic concentration risks
• Alternative sourcing recommendations: AI suggests pre-qualified backup suppliers by commodity and region
• Inventory buffer optimisation: calculate optimal safety stock levels to hedge against specific disruption scenarios
• Recovery time estimation: predict how long recovery will take based on disruption type, geography, and mitigation actions
• Compliance monitoring: track evolving trade regulations, sanctions, and tariffs affecting APAC supply chains

For supply chain leaders managing Asia's complex manufacturing and distribution networks, AI risk tools reduce disruption impact by 40–60% through early detection and proactive mitigation. The ability to model scenarios — from Taiwan-China tensions affecting semiconductor supply to typhoon-related logistics disruptions in the Philippines — enables companies to build truly resilient supply chains rather than just reacting to crises as they unfold. Major Asian manufacturing hubs in China's Pearl River Delta, India's Gujarat, and Thailand's Eastern Economic Corridor all benefit from AI-driven risk intelligence that spans geo-political, environmental, and operational risk dimensions.`,
 tools: ['claude', 'chatgpt', 'perplexity'],
 affiliateSuggestions: [
 { name: 'Claude', slug: 'claude', note: 'Complex risk scenario modeling with multi-dimensional impact analysis' },
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Quick risk assessment reports and disruption response playbooks' },
 { name: 'Perplexity', slug: 'perplexity', note: 'Real-time intelligence on geopolitical events, tariffs, and market disruptions' },
 ],
 },
];


const guideFaqs = [
 {
 "question": "What is the best AI tool for supply chain management in Asia?",
 "answer": "For Asian supply chains, Sirclo AI is excellent for e-commerce inventory management across Shopee, Lazada, and Tokopedia. For logistics tracking, AI platforms that integrate with JNE, J&T, GrabExpress, and Lalamove provide real-time visibility across Southeast Asia's fragmented delivery landscape."
 },
 {
 "question": "Can AI predict inventory needs for small businesses?",
 "answer": "Yes \u2014 AI inventory forecasting tools analyze historical sales data, seasonal patterns, and market trends to predict optimal stock levels. For Asian e-commerce sellers, Sirclo AI and EasyStore AI predict demand based on local holidays (Chinese New Year, Hari Raya, 11.11, 12.12) and platform-specific trends."
 }
];

export default function AIToolsForSupplyChainGuide() {
 return (
 <main className="min-h-screen bg-white ">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Guides', item: '/guides' },
 { name: 'AI Tools for Supply Chain & Logistics', item: '/guides/ai-tools-for-supply-chain' },
 ]}
 baseUrl={BASE_URL}
 />

 {/* Hero */}
 <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-cyan-950 ">
 <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
 <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28">
 <BreadcrumbNav
          className="mb-8"
          items={[
            { label: 'Guides', href: '/guides' },
            { label: 'AI Tools for Supply Chain' },
          ]}
        />
 <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-200 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6">
              <Truck className="w-3.5 h-3.5" />
              Guide · 18 min read
            </span>
 <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
 Best AI Tools for Supply Chain &amp; Logistics in 2026
 </h1>
 <p className="text-lg sm:text-xl text-cyan-100/90 max-w-2xl mb-8">
 The complete guide to AI-powered supply chain and logistics tools — demand forecasting, inventory optimisation, route planning, warehouse automation, procurement, freight management, and supply chain risk resilience. Vetted for supply chain professionals across Asia-Pacific.
 </p>
 <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-200/80">
 <span className="flex items-center gap-1.5">
 <Clock className="w-4 h-4" />
 Updated May 2026
 </span>
 <span className="flex items-center gap-1.5">
 <Globe className="w-4 h-4" />
 Asia-Pacific Focus
 </span>
 <span className="flex items-center gap-1.5">
 <Package className="w-4 h-4" />
 Supply Chain &amp; Logistics
 </span>
 </div>
 </div>
 </section>

 {/* Table of Contents */}
 <section className="max-w-5xl mx-auto px-4 py-12">
 <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8">
 <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
 <BookOpen className="w-5 h-5 text-cyan-600 " />
 What's in this guide
 </h2>
 <div className="grid sm:grid-cols-2 gap-3">
 {sections.map((s) => (
 <a
 key={s.id}
 href={`#${s.id}`}
 className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600 "
 >
 <s.icon className="w-4 h-4 text-cyan-500 shrink-0" />
 {s.title}
 </a>
 ))}
 </div>
 </div>
 </section>

 {/* Why Now Box */}
 <section className="max-w-5xl mx-auto px-4 pb-12">
 <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 sm:p-8">
 <div className="flex items-start gap-4">
 <div className="p-2.5 rounded-xl bg-cyan-100 shrink-0">
 <Lightbulb className="w-5 h-5 text-cyan-700 " />
 </div>
 <div>
 <h2 className="text-lg font-semibold text-gray-900 mb-2">Why AI for Supply Chain Right Now</h2>
 <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
 The Asia-Pacific supply chain sector is at an inflection point. Labour costs in traditional manufacturing hubs are rising, trade tensions are reshaping sourcing patterns, and consumers expect ever-faster delivery. AI tools that were experimental just two years ago are now enterprise-ready and cost-effective for mid-market logistics operators. Companies that deploy AI across their supply chain operations in 2026 are reporting 20–35% cost reductions, 40% faster response to disruptions, and significantly lower working capital requirements. The window for early-mover advantage in AI-powered supply chain management is closing fast — the time to act is now.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Quick Comparison Table */}
 <section className="max-w-5xl mx-auto px-4 pb-8">
 <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
 <div className="bg-gradient-to-r from-slate-700 to-cyan-800 px-6 py-4">
 <h2 className="text-lg font-semibold text-gray-900">Quick Comparison: Best AI Supply Chain Tools</h2>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-gray-200 bg-gray-50 ">
 <th className="text-left px-6 py-3 font-medium text-gray-900 ">Tool</th>
 <th className="text-left px-6 py-3 font-medium text-gray-900 ">Best For</th>
 <th className="text-left px-6 py-3 font-medium text-gray-900 ">Starting Price</th>
 <th className="text-left px-6 py-3 font-medium text-gray-900 ">Free Trial</th>
 <th className="text-left px-6 py-3 font-medium text-gray-900 ">Rating</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 ">
 {[
 { name: 'Claude', best: 'Demand modeling, risk analysis & contract intelligence', price: '$20/mo (Pro)', trial: 'Free tier', rating: '4.8/5' },
 { name: 'ChatGPT', best: 'Forecasting, procurement docs & shipping manifests', price: '$20/mo (Plus)', trial: 'Free tier', rating: '4.7/5' },
 { name: 'Perplexity', best: 'Market intelligence, supplier research & disruption monitoring', price: '$20/mo (Pro)', trial: 'Free tier', rating: '4.7/5' },
 { name: 'CrewAI', best: 'Multi-agent logistics orchestration & automation', price: 'Open source / $19/mo', trial: 'Free trial', rating: '4.5/5' },
 { name: 'n8n', best: 'Logistics workflow automation & shipment tracking', price: 'Free / $20/mo', trial: 'Always free (self-host)', rating: '4.6/5' },
 { name: 'Make (Integromat)', best: 'Supply chain data integration & warehouse alerts', price: '$9/mo', trial: 'Free tier', rating: '4.4/5' },
 ].map((tool, i) => (
 <tr key={i} className="hover:bg-gray-50 transition-colors">
 <td className="px-6 py-4 font-medium text-gray-900 ">{tool.name}</td>
 <td className="px-6 py-4 text-gray-600 ">{tool.best}</td>
 <td className="px-6 py-4 text-gray-600 ">{tool.price}</td>
 <td className="px-6 py-4">
 <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 rounded-full px-2.5 py-1">
 <CheckCircle className="w-3 h-3" />
 {tool.trial}
 </span>
 </td>
 <td className="px-6 py-4 text-gray-600 ">{tool.rating}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </section>

 {/* Recommendation Table */}
 <section className="max-w-5xl mx-auto px-4 pb-16">
 <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
 <div className="bg-gradient-to-r from-cyan-800 to-slate-700 px-6 py-4">
 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
 <Target className="w-5 h-5" />
 Which Tool for Which Supply Chain Use Case?
 </h2>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-gray-200 bg-gray-50 ">
 <th className="text-left px-6 py-3 font-medium text-gray-900 ">Use Case</th>
 <th className="text-left px-6 py-3 font-medium text-gray-900 ">Recommended Tool</th>
 <th className="text-left px-6 py-3 font-medium text-gray-900 ">Why</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 ">
 {[
 { use: 'Demand forecasting & inventory optimisation', tool: 'Claude', why: '200K token context handles complex multi-market demand data' },
 { use: 'Quick forecast analysis from sales data', tool: 'ChatGPT', why: 'Upload CSVs for immediate forecast insights and recommendations' },
 { use: 'Multi-stop route optimisation', tool: 'ChatGPT', why: 'Flexible optimisation modeling from natural language inputs' },
 { use: 'Multi-agent logistics coordination', tool: 'CrewAI', why: 'Autonomous agents for dispatcher, driver, and customer communication' },
 { use: 'Warehouse slotting & layout analysis', tool: 'Claude', why: 'Deep spatial analysis for optimal product placement' },
 { use: 'Shipping contract & rate analysis', tool: 'Claude', why: 'Complex document understanding for carrier contract comparison' },
 { use: 'Automated shipment tracking workflows', tool: 'n8n', why: 'Connect APIs from 200+ carriers into custom notification pipelines' },
 { use: 'Procurement supplier risk scoring', tool: 'Claude', why: 'Multi-dimensional supplier analysis across financial, ESG, and geopolitical factors' },
 { use: 'Supplier market intelligence', tool: 'Perplexity', why: 'Real-time cited research on supplier reputation and market conditions' },
 { use: 'Supply chain disruption monitoring', tool: 'Perplexity', why: 'Continuous news scanning for port congestion, tariffs, and geopolitical events' },
 { use: 'Logistics workflow automation', tool: 'n8n', why: 'Free self-hosted option for custom supply chain automation pipelines' },
 { use: 'WMS integration & inventory sync', tool: 'Make (Integromat)', why: 'Visual connector platform for warehouse system integration' },
 ].map((rec, i) => (
 <tr key={i} className="hover:bg-gray-50 transition-colors">
 <td className="px-6 py-4 font-medium text-gray-900 ">{rec.use}</td>
 <td className="px-6 py-4">
 <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 bg-cyan-50 rounded-full px-2.5 py-1">
 <CheckCircle className="w-3 h-3" />
 {rec.tool}
 </span>
 </td>
 <td className="px-6 py-4 text-gray-600 ">{rec.why}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </section>

 {/* Content Sections */}
 {sections.map((section) => (
 <section key={section.id} id={section.id} className={`scroll-mt-24 ${section.color}`}>
 <div className="max-w-4xl mx-auto px-4 py-16">
 <div className="flex items-center gap-3 mb-6">
 <div className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200 ">
 <section.icon className="w-5 h-5 text-gray-700 " />
 </div>
 <h2 className="text-2xl font-bold text-gray-900 ">{section.title}</h2>
 </div>
 <p className="text-gray-600 leading-relaxed mb-8">{section.text}</p>

 {/* Affiliate CTAs */}
 {section.affiliateSuggestions && section.affiliateSuggestions.length > 0 && (
 <div className="space-y-3 mb-8">
 <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Recommended tools</p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {section.affiliateSuggestions.map((rec, i) => {
 const tool = toolsData.find((t: any) => t.slug === rec.slug);
 return (
 <a
 key={i}
 href={(tool as any)?.affiliateUrl || '#'}
 target="_blank"
 rel="noopener noreferrer sponsored"
 className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-cyan-300 hover:shadow-md transition-all group"
 >
 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-gray-900 font-bold text-xs shrink-0">
 {(tool as any)?.name?.charAt(0) || '?'}
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">
 {rec.name} <ArrowRight className="w-3 h-3 inline" />
 </p>
 <p className="text-xs text-gray-500 mt-0.5">{rec.note}</p>
 </div>
 </a>
 );
 })}
 </div>
 </div>
 )}

 {/* Tool cards */}
 {section.tools && section.tools.length > 0 && (
 <div className="space-y-4">
 <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Detailed reviews</p>
 <div className="grid sm:grid-cols-2 gap-4">
 {section.tools.map((slug) => {
 const tool = toolsData.find((t: any) => t.slug === slug);
 if (!tool) return null;
 return (
 <ToolCard
 key={slug}
 tool={tool}
 />
 );
 })}
 </div>
 </div>
 )}
 </div>
 </section>
 ))}

 {/* Asia-Pacific Section */}
 <section className="bg-gradient-to-br from-slate-100 to-cyan-50 border-y border-gray-200 ">
 <div className="max-w-4xl mx-auto px-4 py-16">
 <div className="flex items-center gap-3 mb-6">
 <div className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200 ">
 <Globe className="w-5 h-5 text-gray-700 " />
 </div>
 <h2 className="text-2xl font-bold text-gray-900 ">6 Challenges AI Solves for APAC Supply Chain Professionals</h2>
 </div>
 <p className="text-gray-600 leading-relaxed mb-8">
 Supply chain management in the Asia-Pacific region presents unique challenges that AI tools are particularly well-suited to address. From navigating the complexity of China's manufacturing ecosystem to managing logistics across ASEAN's fragmented infrastructure, APAC supply chain professionals face hurdles that traditional management tools struggle to handle.
 </p>
 <div className="grid sm:grid-cols-2 gap-4 mb-8">
 {[
 {
 title: 'Multi-Country Inventory Complexity',
 desc: 'Managing inventory across 10+ APAC markets with different demand patterns, customs regimes, and lead times is extraordinarily complex. AI normalises demand signals across markets, optimises buffer stock by country, and handles the unique seasonality of Chinese New Year, Golden Week, Diwali, and Ramadan simultaneously.',
 icon: Package,
 },
 {
 title: 'Port Congestion & Transit Volatility',
 desc: "Asia's mega-ports — Shanghai, Singapore, Shenzhen, Busan — face chronic congestion that cascades through supply chains. AI aggregates real-time AIS data, berth wait times, and shipping schedules to predict delays and reroute freight proactively across ocean and multimodal routes.",
 icon: Ship,
 },
 {
 title: 'Manufacturing Diversification',
 desc: 'The "China Plus One" strategy is reshaping Asian supply chains as companies add Vietnam, Thailand, India, and Indonesia to their sourcing mix. AI helps rapidly qualify new suppliers, compare total landed costs, and model tariff exposure across sourcing scenarios.',
 icon: Container,
 },
 {
 title: 'Infrastructure Fragmentation',
 desc: "ASEAN supply chains span countries with vastly different infrastructure quality — from Singapore's world-class port and airport to Myanmar's developing logistics networks. AI route and logistics tools adapt to local infrastructure realities, optimising for road quality, border crossing times, and port efficiency variations across the region.",
 icon: Map,
 },
 {
 title: 'Regulatory & Tariff Complexity',
 desc: 'APAC supply chains navigate complex trade agreements (RCEP, CPTPP, ASEAN FTA), evolving tariffs, and diverse customs regimes. AI tracks regulatory changes in real-time, automatically updates trade compliance documentation, and models tariff impacts across different sourcing and routing decisions.',
 icon: Shield,
 },
 {
 title: 'Labour Shortages & Skills Gaps',
 desc: 'Warehouse and logistics labour markets across Japan, Korea, Singapore, and Hong Kong face structural shortages. AI warehouse tools reduce dependency on manual labour through automation and optimisation, while AI procurement and logistics tools augment existing teams with data-driven decision support.',
 icon: Users,
 },
 ].map((item, i) => (
 <div key={i} className="p-5 rounded-xl bg-white border border-gray-200 ">
 <div className="flex items-center gap-3 mb-3">
 <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-900">
 <item.icon className="w-4 h-4" />
 </div>
 <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
 </div>
 <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Bottom CTA */}
 <section className="bg-gradient-to-br from-gray-900 to-gray-950 ">
 <div className="max-w-3xl mx-auto px-4 py-20 text-center">
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
 Ready to Transform Your Supply Chain with AI?
 </h2>
 <p className="text-gray-400 mb-8 max-w-xl mx-auto">
 Start with the AI tool that matches your supply chain focus area. Claude for demand forecasting and risk analysis, ChatGPT for procurement docs and shipping manifests, Perplexity for market intelligence and disruption monitoring, CrewAI for multi-agent logistics automation, or n8n for workflow automation.
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <a
 href={(() => {
 const claude = toolsData.find((t: any) => t.slug === 'claude');
 return (claude as any)?.affiliateUrl || '#';
 })()}
 target="_blank"
 rel="noopener noreferrer sponsored"
 className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-700 to-blue-700 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-700/20"
 >
 <Sparkles className="w-4 h-4" />
 Try Claude Free
 <ArrowRight className="w-4 h-4" />
 </a>
 <Link
 href="/guides"
 className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
 >
 <BookOpen className="w-4 h-4" />
 Browse All Guides
 </Link>
 </div>
 </div>
 </section>
 {/* ─── FAQ Schema ─── */}
 <FAQSchema faqs={guideFaqs} />
 </main>
 );
}
