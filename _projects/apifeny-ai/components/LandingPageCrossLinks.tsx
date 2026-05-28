// ══════════════════════════════════════════════════════════
// LandingPageCrossLinks — Cross-link grid connecting geo
// pages, category pages, and industry pages. Boosts topical
// authority by showing search engines these form a cluster.
// Also cross-links to matching blog topic categories.
// ══════════════════════════════════════════════════════════
// Server-safe — no `use client`, no hooks.

import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, PenTool, Code, Megaphone, Sparkles, MapPin, Building2, GraduationCap, Stethoscope, Shield, ShoppingCart, Briefcase, Users, Heart, Glasses, Newspaper, Scale, TreePine, Cpu, Film, Plane } from 'lucide-react';

interface LandingPageEntry {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof PenTool;
  color: string;
  href?: string;
}

const ALL_LANDING_PAGES: LandingPageEntry[] = [
  {
    slug: 'best-ai-tools',
    title: 'Best AI Tools in 2026 — Full Directory',
    shortTitle: 'All AI Tools',
    description: 'The complete curated directory of 85+ top-rated AI tools across every category.',
    icon: Layers,
    color: 'from-neon to-neon-dark',
  },
  {
    slug: 'best-ai-writing-tools',
    title: 'Best AI Writing Tools in 2026',
    shortTitle: 'Writing Tools',
    description: 'Find the perfect AI writing assistant for content, copy, and creative writing.',
    icon: PenTool,
    color: 'from-rose-500 to-pink-600',
  },
  {
    slug: 'best-ai-coding-tools',
    title: 'Best AI Coding Tools in 2026',
    shortTitle: 'Coding Tools',
    description: 'Ship faster with top-rated AI code assistants, from Copilot to Cursor.',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    slug: 'best-ai-marketing-tools',
    title: 'Best AI Marketing Tools in 2026',
    shortTitle: 'Marketing Tools',
    description: 'Automate campaigns, optimize SEO, and scale content with AI marketing tools.',
    icon: Megaphone,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    slug: 'ai-tools-singapore',
    title: 'Best AI Tools in Singapore (2026)',
    shortTitle: 'Singapore AI Tools',
    description: 'Curated AI tools for Singapore founders and teams — rated for multilingual support, SGD pricing, and PDPA compliance.',
    icon: MapPin,
    color: 'from-red-400 to-red-500',
  },
  {
    slug: 'ai-tools-malaysia',
    title: 'Best AI Tools in Malaysia (2026)',
    shortTitle: 'Malaysia AI Tools',
    description: 'Curated AI tools for Malaysian founders and teams — rated for BM/中文/தமிழ்/English support, MYR pricing, and PDPA compliance.',
    icon: MapPin,
    color: 'from-blue-400 to-yellow-400',
  },
  {
    slug: 'ai-tools-hong-kong',
    title: 'Best AI Tools in Hong Kong (2026)',
    shortTitle: 'Hong Kong AI Tools',
    description: 'Curated AI tools for Hong Kong teams — rated for Traditional Chinese support, HKD pricing, PDPO compliance, and enterprise readiness.',
    icon: MapPin,
    color: 'from-red-400 to-rose-500',
  },
  {
    slug: 'ai-tools-vietnam',
    title: 'Best AI Tools in Vietnam (2026)',
    shortTitle: 'Vietnam AI Tools',
    description: 'Curated AI tools for Vietnam teams — rated for tiếng Việt support, VND pricing, PDPA compliance, and local ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-yellow-400',
  },
  {
    slug: 'ai-tools-philippines',
    title: 'Best AI Tools in the Philippines (2026)',
    shortTitle: 'Philippines AI Tools',
    description: 'Curated AI tools for the Philippines — rated for PHP pricing, NPC compliance, mobile-first access, and BPO/freelancer ecosystem support.',
    icon: MapPin,
    color: 'from-blue-500 to-red-500',
  },
  {
    slug: 'ai-tools-indonesia',
    title: 'Best AI Tools in Indonesia (2026)',
    shortTitle: 'Indonesia AI Tools',
    description: 'Curated AI tools for Indonesia teams — rated for Bahasa Indonesia support, IDR pricing, UU PDP compliance, and local ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-white',
  },
  {
    slug: 'ai-tools-thailand',
    title: 'Best AI Tools in Thailand (2026)',
    shortTitle: 'Thailand AI Tools',
    description: 'Curated AI tools for Thailand teams — rated for Thai language support, THB pricing, PDPA compliance, and local ecosystem readiness.',
    icon: MapPin,
    color: 'from-purple-600 to-red-500',
  },
  {
    slug: 'ai-tools-cambodia',
    title: 'Best AI Tools in Cambodia (2026)',
    shortTitle: 'Cambodia AI Tools',
    description: 'Curated AI tools for Cambodia teams — rated for Khmer (ភាសាខ្មែរ) support, USD/KHR pricing, privacy compliance, and local ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-600 to-red-500',
  },
  {
    slug: 'ai-tools-japan',
    title: 'Best AI Tools in Japan (2026)',
    shortTitle: 'Japan AI Tools',
    description: 'Curated AI tools for Japan teams — rated for Japanese (日本語) support, JPY pricing, APPI compliance, and enterprise ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-600 to-rose-900',
  },
  {
    slug: 'ai-tools-south-korea',
    title: 'Best AI Tools in South Korea (2026)',
    shortTitle: 'South Korea AI Tools',
    description: 'Curated AI tools for South Korea teams — rated for Korean (한국어) support, KRW pricing, PIPA compliance, and chaebol/startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-red-600',
  },
  {
    slug: 'ai-tools-taiwan',
    title: 'Best AI Tools in Taiwan (2026)',
    shortTitle: 'Taiwan AI Tools',
    description: 'Curated AI tools for Taiwan teams — rated for 繁體中文 support, TWD pricing, PDPA compliance, and semiconductor/tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-700 to-red-600',
  },
  {
    slug: 'ai-tools-india',
    title: 'Best AI Tools in India (2026)',
    shortTitle: 'India AI Tools',
    description: 'Curated AI tools for India teams — rated for multilingual support (हिन्दी/English/regional), INR pricing, DPDP Act compliance, and India startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-orange-500 to-green-600',
  },
  {
    slug: 'ai-tools-myanmar',
    title: 'Best AI Tools in Myanmar (2026)',
    shortTitle: 'Myanmar AI Tools',
    description: 'Curated AI tools for Myanmar teams — rated for Burmese (ျမန္မာဘာသာ) support, MMK/USD pricing, and emerging digital ecosystem readiness.',
    icon: MapPin,
    color: 'from-yellow-400 to-green-600',
  },
  {
    slug: 'ai-tools-bangladesh',
    title: 'Best AI Tools in Bangladesh (2026)',
    shortTitle: 'Bangladesh AI Tools',
    description: 'Curated AI tools for Bangladesh teams — rated for Bengali (বাংলা) support, BDT pricing, and Dhaka startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-red-500',
  },
  {
    slug: 'ai-tools-sri-lanka',
    title: 'Best AI Tools in Sri Lanka (2026)',
    shortTitle: 'Sri Lanka AI Tools',
    description: 'Curated AI tools for Sri Lanka teams — rated for Sinhala (සිංහල)/Tamil (தமிழ்) support, LKR pricing, and Colombo tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-400 to-yellow-300',
  },
  {
    slug: 'ai-tools-nepal',
    title: 'Best AI Tools in Nepal (2026)',
    shortTitle: 'Nepal AI Tools',
    description: 'Curated AI tools for Nepal teams — rated for Nepali (नेपाली) support, NPR pricing, and Kathmandu developer ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-600 to-red-400',
  },
  {
    slug: 'ai-tools-pakistan',
    title: 'Best AI Tools in Pakistan (2026)',
    shortTitle: 'Pakistan AI Tools',
    description: 'Curated AI tools for Pakistan teams — rated for Urdu (اردو)/English support, PKR pricing, and Karachi/Islamabad startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-white',
  },
  {
    slug: 'ai-tools-uae',
    title: 'Best AI Tools in UAE (2026)',
    shortTitle: 'UAE AI Tools',
    description: 'Curated AI tools for UAE teams — rated for Arabic (العربية)/English support, AED pricing, and Dubai/Abu Dhabi tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-green-400',
  },
  {
    slug: 'ai-tools-saudi-arabia',
    title: 'Best AI Tools in Saudi Arabia (2026)',
    shortTitle: 'KSA AI Tools',
    description: 'Curated AI tools for Saudi Arabia teams — rated for Arabic (العربية) support, SAR pricing, and Vision 2030 ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-700 to-white',
  },
  {
    slug: 'ai-tools-china',
    title: 'Best AI Tools in China (2026)',
    shortTitle: 'China AI Tools',
    description: 'Curated AI tools for China teams — rated for 中文 (Chinese) support, ¥ RMB pricing, PIPL/DSL/CSL compliance, and Beijing/Shanghai/Shenzhen ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-600 to-yellow-400',
  },
  {
    slug: 'ai-tools-nigeria',
    title: 'Best AI Tools in Nigeria (2026)',
    shortTitle: 'Nigeria AI Tools',
    description: 'Curated AI tools for Nigeria teams — rated for multilingual support (English/Hausa/Yoruba/Igbo), NGN pricing, NDPR compliance, and Lagos startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-white',
  },
  {
    slug: 'ai-tools-turkey',
    title: 'Best AI Tools in Turkey (2026)',
    shortTitle: 'Turkey AI Tools',
    description: 'Curated AI tools for Turkey teams — rated for Turkish (Türkçe) support, TRY pricing, KVKK compliance, and Istanbul/Ankara tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-white',
  },
  {
    slug: 'ai-tools-for-startups',
    title: 'Best AI Tools for Startups (2026)',
    shortTitle: 'AI Tools for Startups',
    description: 'Curated AI tools built for early-stage startups — rated for budget-friendliness, free tiers, scalability, and lean team workflow fit.',
    icon: MapPin,
    color: 'from-violet-500 to-purple-600',
  },
  // ── For-industry pages ──
  {
    slug: 'ai-tools-for-agriculture',
    title: 'Best AI Tools for Agriculture (2026)',
    shortTitle: 'Agriculture',
    description: 'Curated AI tools for agriculture — rated for crop monitoring, precision farming, supply chain, and agtech readiness.',
    icon: TreePine,
    color: 'from-green-600 to-lime-400',
    href: '/guides/ai-tools-for-agriculture'
  },
  {
    slug: 'ai-tools-for-architecture-engineering',
    title: 'Best AI Tools for Architecture & Engineering (2026)',
    shortTitle: 'Architecture & Eng',
    description: 'Curated AI tools for architects and engineers — rated for CAD integration, BIM support, and project automation.',
    icon: Building2,
    color: 'from-gray-500 to-blue-600',
    href: '/guides/ai-tools-for-architecture-engineering'
  },
  {
    slug: 'ai-tools-for-content-creation',
    title: 'Best AI Tools for Content Creation (2026)',
    shortTitle: 'Content Creation',
    description: 'Curated AI tools for content creators — rated for video, audio, writing, design, and social media production.',
    icon: Film,
    color: 'from-purple-500 to-pink-500',
    href: '/guides/ai-tools-for-content-creation'
  },
  {
    slug: 'ai-tools-for-customer-support',
    title: 'Best AI Tools for Customer Support (2026)',
    shortTitle: 'Customer Support',
    description: 'Curated AI tools for customer support — rated for chatbot quality, ticketing, multilingual, and omnichannel readiness.',
    icon: Users,
    color: 'from-teal-500 to-cyan-600',
    href: '/guides/ai-tools-for-customer-support'
  },
  {
    slug: 'ai-tools-for-cybersecurity',
    title: 'Best AI Tools for Cybersecurity (2026)',
    shortTitle: 'Cybersecurity',
    description: 'Curated AI tools for cybersecurity — rated for threat detection, SOC automation, compliance, and zero-trust readiness.',
    icon: Shield,
    color: 'from-red-700 to-gray-800',
    href: '/guides/ai-tools-for-cybersecurity'
  },
  {
    slug: 'ai-tools-for-design',
    title: 'Best AI Tools for Design (2026)',
    shortTitle: 'Design',
    description: 'Curated AI tools for designers — rated for UI/UX, graphic design, prototyping, and generative design capabilities.',
    icon: PenTool,
    color: 'from-pink-500 to-orange-400',
    href: '/guides/ai-tools-for-design'
  },
  {
    slug: 'ai-tools-for-developers',
    title: 'Best AI Tools for Developers (2026)',
    shortTitle: 'Developers',
    description: 'Curated AI tools for software developers — rated for code generation, debugging, PR review, and CI/CD integration.',
    icon: Cpu,
    color: 'from-blue-500 to-indigo-600',
    href: '/guides/ai-tools-for-developers'
  },
  {
    slug: 'ai-tools-for-education',
    title: 'Best AI Tools for Education (2026)',
    shortTitle: 'Education',
    description: 'Curated AI tools for educators and students — rated for tutoring, lesson planning, LMS integration, and academic integrity.',
    icon: GraduationCap,
    color: 'from-blue-400 to-green-500',
    href: '/guides/ai-tools-for-education'
  },
  {
    slug: 'ai-tools-for-finance',
    title: 'Best AI Tools for Finance (2026)',
    shortTitle: 'Finance',
    description: 'Curated AI tools for finance teams — rated for modeling, fraud detection, compliance, reporting, and portfolio analysis.',
    icon: Scale,
    color: 'from-emerald-600 to-teal-500',
    href: '/guides/ai-tools-for-finance'
  },
  {
    slug: 'ai-tools-for-gaming',
    title: 'Best AI Tools for Gaming (2026)',
    shortTitle: 'Gaming',
    description: 'Curated AI tools for game developers — rated for procedural generation, NPC AI, asset creation, and playtesting.',
    icon: Cpu,
    color: 'from-violet-500 to-fuchsia-600',
    href: '/guides/ai-tools-for-gaming'
  },
  {
    slug: 'ai-tools-for-healthcare',
    title: 'Best AI Tools for Healthcare (2026)',
    shortTitle: 'Healthcare',
    description: 'Curated AI tools for healthcare — rated for diagnostics, medical imaging, EHR integration, HIPAA compliance, and clinical workflow.',
    icon: Stethoscope,
    color: 'from-blue-500 to-teal-400',
    href: '/guides/ai-tools-for-healthcare'
  },
  {
    slug: 'ai-tools-for-hr-recruiting',
    title: 'Best AI Tools for HR & Recruiting (2026)',
    shortTitle: 'HR & Recruiting',
    description: 'Curated AI tools for HR teams — rated for resume screening, interview scheduling, DEI compliance, and workforce analytics.',
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
    href: '/guides/ai-tools-for-hr-recruiting'
  },
  {
    slug: 'ai-tools-for-legal',
    title: 'Best AI Tools for Legal (2026)',
    shortTitle: 'Legal',
    description: 'Curated AI tools for legal professionals — rated for contract review, eDiscovery, compliance monitoring, and case research.',
    icon: Scale,
    color: 'from-gray-700 to-blue-700',
    href: '/guides/ai-tools-for-legal'
  },
  {
    slug: 'ai-tools-for-manufacturing',
    title: 'Best AI Tools for Manufacturing (2026)',
    shortTitle: 'Manufacturing',
    description: 'Curated AI tools for manufacturing — rated for predictive maintenance, quality vision, supply chain, and Industry 4.0 readiness.',
    icon: Building2,
    color: 'from-orange-500 to-yellow-500',
    href: '/guides/ai-tools-for-manufacturing'
  },
  {
    slug: 'ai-tools-for-marketing',
    title: 'Best AI Tools for Marketing (2026)',
    shortTitle: 'Marketing',
    description: 'Curated AI tools for marketing teams — rated for SEO, ad optimization, content personalization, and campaign analytics.',
    icon: Megaphone,
    color: 'from-rose-500 to-orange-500',
    href: '/guides/ai-tools-for-marketing'
  },
  {
    slug: 'ai-tools-for-personal-finance',
    title: 'Best AI Tools for Personal Finance (2026)',
    shortTitle: 'Personal Finance',
    description: 'Curated AI tools for personal finance — rated for budgeting, investing, tax planning, and financial education.',
    icon: ShoppingCart,
    color: 'from-emerald-400 to-green-600',
    href: '/guides/ai-tools-for-personal-finance'
  },
  {
    slug: 'ai-tools-for-project-management',
    title: 'Best AI Tools for Project Management (2026)',
    shortTitle: 'Project Mgmt',
    description: 'Curated AI tools for project managers — rated for task automation, resource planning, timeline prediction, and team collaboration.',
    icon: Briefcase,
    color: 'from-amber-500 to-orange-500',
    href: '/guides/ai-tools-for-project-management'
  },
  {
    slug: 'ai-tools-for-real-estate',
    title: 'Best AI Tools for Real Estate (2026)',
    shortTitle: 'Real Estate',
    description: 'Curated AI tools for real estate — rated for property valuation, lead gen, virtual tours, and market analysis.',
    icon: Building2,
    color: 'from-blue-600 to-indigo-700',
    href: '/guides/ai-tools-for-real-estate'
  },
  {
    slug: 'ai-tools-for-sales',
    title: 'Best AI Tools for Sales (2026)',
    shortTitle: 'Sales',
    description: 'Curated AI tools for sales teams — rated for lead scoring, CRM automation, call analytics, and pipeline management.',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-600',
    href: '/guides/ai-tools-for-sales'
  },
  {
    slug: 'ai-tools-for-science-research',
    title: 'Best AI Tools for Science & Research (2026)',
    shortTitle: 'Science & Research',
    description: 'Curated AI tools for researchers — rated for literature review, data analysis, lab automation, and paper drafting.',
    icon: GraduationCap,
    color: 'from-teal-600 to-blue-500',
    href: '/guides/ai-tools-for-science-research'
  },
  {
    slug: 'ai-tools-for-seo',
    title: 'Best AI Tools for SEO (2026)',
    shortTitle: 'SEO',
    description: 'Curated AI tools for SEO professionals — rated for keyword research, content optimization, rank tracking, and technical SEO.',
    icon: Newspaper,
    color: 'from-green-400 to-blue-500',
    href: '/guides/ai-tools-for-seo'
  },
  {
    slug: 'ai-tools-for-supply-chain',
    title: 'Best AI Tools for Supply Chain (2026)',
    shortTitle: 'Supply Chain',
    description: 'Curated AI tools for supply chain — rated for demand forecasting, logistics, warehouse automation, and vendor management.',
    icon: Plane,
    color: 'from-cyan-500 to-blue-600',
    href: '/guides/ai-tools-for-supply-chain'
  },
  {
    slug: 'ai-tools-for-travel-hospitality',
    title: 'Best AI Tools for Travel & Hospitality (2026)',
    shortTitle: 'Travel & Hospitality',
    description: 'Curated AI tools for travel — rated for itinerary planning, pricing optimization, booking automation, and guest experience.',
    icon: Plane,
    color: 'from-sky-400 to-indigo-500',
    href: '/guides/ai-tools-for-travel-hospitality'
  },
  {
    slug: 'ai-tools-for-video',
    title: 'Best AI Tools for Video (2026)',
    shortTitle: 'Video',
    description: 'Curated AI tools for video production — rated for editing, VFX, captioning, lip-sync, and generative video capabilities.',
    icon: Film,
    color: 'from-red-500 to-purple-600',
    href: '/guides/ai-tools-for-video'
  },
  // ── Major-market geo pages ──
  {
    slug: 'ai-tools-usa',
    title: 'Best AI Tools in the USA (2026)',
    shortTitle: 'USA AI Tools',
    description: 'Curated AI tools for US teams — rated for USD pricing, CCPA/FTC compliance, and Silicon Valley ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-red-500',
  },
  {
    slug: 'ai-tools-uk',
    title: 'Best AI Tools in the UK (2026)',
    shortTitle: 'UK AI Tools',
    description: 'Curated AI tools for UK teams — rated for GBP pricing, UK GDPR compliance, and London tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-600 to-red-600',
  },
  {
    slug: 'ai-tools-canada',
    title: 'Best AI Tools in Canada (2026)',
    shortTitle: 'Canada AI Tools',
    description: 'Curated AI tools for Canada teams — rated for CAD pricing, PIPEDA compliance, and Toronto/Vancouver ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-white',
  },
  {
    slug: 'ai-tools-germany',
    title: 'Best AI Tools in Germany (2026)',
    shortTitle: 'Germany AI Tools',
    description: 'Curated AI tools for Germany teams — rated for Deutsch/English support, EUR pricing, BDSG/DSGVO compliance, and Berlin startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-yellow-400 to-red-500',
  },
  {
    slug: 'ai-tools-france',
    title: 'Best AI Tools in France (2026)',
    shortTitle: 'France AI Tools',
    description: 'Curated AI tools for France teams — rated for Français support, EUR pricing, CNIL/DSGVO compliance, and Paris tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-red-500',
  },
  {
    slug: 'ai-tools-australia',
    title: 'Best AI Tools in Australia (2026)',
    shortTitle: 'Australia AI Tools',
    description: 'Curated AI tools for Australia teams — rated for AUD pricing, Privacy Act compliance, ABN support, and Sydney/Melbourne startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-400 to-orange-400',
  },
  {
    slug: 'ai-tools-brazil',
    title: 'Best AI Tools in Brazil (2026)',
    shortTitle: 'Brazil AI Tools',
    description: 'Curated AI tools for Brazil teams — rated for Português support, BRL pricing, LGPD compliance, and São Paulo startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-yellow-400',
  },
  {
    slug: 'ai-tools-egypt',
    title: 'Best AI Tools in Egypt (2026)',
    shortTitle: 'Egypt AI Tools',
    description: 'Curated AI tools for Egypt teams — rated for Arabic (العربية)/English support, EGP pricing, and Cairo tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-black',
  },
  {
    slug: 'ai-tools-kenya',
    title: 'Best AI Tools in Kenya (2026)',
    shortTitle: 'Kenya AI Tools',
    description: 'Curated AI tools for Kenya teams — rated for Swahili/English support, KES pricing, DPA compliance, and Nairobi startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-red-500',
  },
  {
    slug: 'ai-tools-russia',
    title: 'Best AI Tools in Russia (2026)',
    shortTitle: 'Russia AI Tools',
    description: 'Curated AI tools for Russia teams — rated for Русский (Russian) support, RUB pricing, Federal Law compliance, and Moscow/Saint Petersburg tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-red-600',
  },
  {
    slug: 'ai-tools-mexico',
    title: 'Best AI Tools in Mexico (2026)',
    shortTitle: 'Mexico AI Tools',
    description: 'Curated AI tools for Mexico teams — rated for Español support, MXN pricing, LFPDPPP compliance, and Mexico City startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-red-500',
  },
  {
    slug: 'ai-tools-argentina',
    title: 'Best AI Tools in Argentina (2026)',
    shortTitle: 'Argentina AI Tools',
    description: 'Curated AI tools for Argentina teams — rated for Español support, ARS/USD pricing, PDPL compliance, and Buenos Aires tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-white',
  },
  {
    slug: 'ai-tools-spain',
    title: 'Best AI Tools in Spain (2026)',
    shortTitle: 'Spain AI Tools',
    description: 'Curated AI tools for Spain teams — rated for Español (Spanish) support, EUR pricing, LOPDGDD/DSGVO compliance, and Madrid/Barcelona ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-yellow-400',
  },
  {
    slug: 'ai-tools-italy',
    title: 'Best AI Tools in Italy (2026)',
    shortTitle: 'Italy AI Tools',
    description: 'Curated AI tools for Italy teams — rated for Italiano support, EUR pricing, Garante/DSGVO compliance, and Milan tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-red-500',
  },
  {
    slug: 'ai-tools-netherlands',
    title: 'Best AI Tools in Netherlands (2026)',
    shortTitle: 'Netherlands AI Tools',
    description: 'Curated AI tools for Netherlands teams — rated for Nederlands/English support, EUR pricing, AVG/DSGVO compliance, and Amsterdam ecosystem readiness.',
    icon: MapPin,
    color: 'from-orange-400 to-blue-500',
  },
  {
    slug: 'ai-tools-sweden',
    title: 'Best AI Tools in Sweden (2026)',
    shortTitle: 'Sweden AI Tools',
    description: 'Curated AI tools for Sweden teams — rated for Svenska support, SEK pricing, IMY/DSGVO compliance, and Stockholm tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-yellow-400',
  },
  {
    slug: 'ai-tools-switzerland',
    title: 'Best AI Tools in Switzerland (2026)',
    shortTitle: 'Switzerland AI Tools',
    description: 'Curated AI tools for Switzerland teams — rated for Deutsch/Français/Italiano support, CHF pricing, nFADP/DSGVO compliance, and Zurich tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-white',
  },
  {
    slug: 'ai-tools-poland',
    title: 'Best AI Tools in Poland (2026)',
    shortTitle: 'Poland AI Tools',
    description: 'Curated AI tools for Poland teams — rated for Polski (Polish) support, PLN pricing, UODO/DSGVO compliance, and Warsaw tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-white to-red-600',
  },
  {
    slug: 'ai-tools-south-africa',
    title: 'Best AI Tools in South Africa (2026)',
    shortTitle: 'South Africa AI Tools',
    description: 'Curated AI tools for South Africa teams — rated for 11 official languages support, ZAR pricing, POPIA compliance, and Cape Town/Johannesburg ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-600 to-blue-600',
  },
  {
    slug: 'ai-tools-new-zealand',
    title: 'Best AI Tools in New Zealand (2026)',
    shortTitle: 'New Zealand AI Tools',
    description: 'Curated AI tools for New Zealand teams — rated for English/Te Reo Māori support, NZD pricing, Privacy Act compliance, and Auckland/Wellington ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-white',
  },
  {
    slug: 'ai-tools-chile',
    title: 'Best AI Tools in Chile (2026)',
    shortTitle: 'Chile AI Tools',
    description: 'Curated AI tools for Chile teams — rated for Español support, CLP pricing, PDPL compliance, and Santiago startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-red-500',
  },
  {
    slug: 'ai-tools-colombia',
    title: 'Best AI Tools in Colombia (2026)',
    shortTitle: 'Colombia AI Tools',
    description: 'Curated AI tools for Colombia teams — rated for Español support, COP pricing, Ley 1581 compliance, and Bogotá/Medellín tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-yellow-400 to-blue-500',
  },
  {
    slug: 'ai-tools-portugal',
    title: 'Best AI Tools in Portugal (2026)',
    shortTitle: 'Portugal AI Tools',
    description: 'Curated AI tools for Portugal teams — rated for Português support, EUR pricing, CNPD/DSGVO compliance, and Lisbon tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-red-500',
  },
  {
    slug: 'ai-tools-belgium',
    title: 'Best AI Tools in Belgium (2026)',
    shortTitle: 'Belgium AI Tools',
    description: 'Curated AI tools for Belgium teams — rated for Nederlands/Français/Deutsch support, EUR pricing, GBA/DSGVO compliance, and Brussels ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-yellow-400',
  },
  {
    slug: 'ai-tools-austria',
    title: 'Best AI Tools in Austria (2026)',
    shortTitle: 'Austria AI Tools',
    description: 'Curated AI tools for Austria teams — rated for Deutsch (German) support, EUR pricing, DSB/DSGVO compliance, and Vienna tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-white',
  },
  {
    slug: 'ai-tools-denmark',
    title: 'Best AI Tools in Denmark (2026)',
    shortTitle: 'Denmark AI Tools',
    description: 'Curated AI tools for Denmark teams — rated for Dansk (Danish) support, DKK pricing, Datatilsynet/DSGVO compliance, and Copenhagen ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-600 to-white',
  },
  {
    slug: 'ai-tools-norway',
    title: 'Best AI Tools in Norway (2026)',
    shortTitle: 'Norway AI Tools',
    description: 'Curated AI tools for Norway teams — rated for Norsk (Norwegian) support, NOK pricing, Datatilsynet/GDPR compliance, and Oslo ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-blue-600',
  },
  {
    slug: 'ai-tools-finland',
    title: 'Best AI Tools in Finland (2026)',
    shortTitle: 'Finland AI Tools',
    description: 'Curated AI tools for Finland teams — rated for Suomi (Finnish) support, EUR pricing, Tietosuojavaltuutettu/DSGVO compliance, and Helsinki ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-white',
  },
  {
    slug: 'ai-tools-ireland',
    title: 'Best AI Tools in Ireland (2026)',
    shortTitle: 'Ireland AI Tools',
    description: 'Curated AI tools for Ireland teams — rated for English/Irish support, EUR pricing, DPC/DSGVO compliance, and Dublin tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-orange-400',
  },
  {
    slug: 'ai-tools-israel',
    title: 'Best AI Tools in Israel (2026)',
    shortTitle: 'Israel AI Tools',
    description: 'Curated AI tools for Israel teams — rated for עברית (Hebrew)/English support, ILS pricing, Privacy Protection Law compliance, and Tel Aviv startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-white',
  },
];

const BLOG_CATEGORY_LINKS = [
  { slug: 'ai-tools', title: 'AI Tools Overview', count: 68 },
  { slug: 'comparisons', title: 'Tool Comparisons', count: 7 },
  { slug: 'productivity', title: 'Productivity & Automation', count: 18 },
];

interface Props {
  /** Current page slug — will exclude this from cross-links */
  currentSlug: string;
}

export default function LandingPageCrossLinks({ currentSlug }: Props) {
  const otherLandingPages = ALL_LANDING_PAGES.filter(p => p.slug !== currentSlug);

  return (
    <section className="border-t border-tech-500/20 bg-tech-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Landing page cross-links */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon/20 to-neon-dark/10 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-neon-light" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Best AI Tools by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {otherLandingPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.slug}
                  href={page.href ?? `/${page.slug}`}
                  className="group bg-tech-800/50 border border-tech-500/20 rounded-xl p-4 sm:p-5 hover:border-neon/30 hover:bg-tech-800/70 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition mb-1">
                        {page.shortTitle}
                      </h3>
                      <p className="text-xs text-tech-400 line-clamp-2 leading-relaxed">
                        {page.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-neon-light/60 group-hover:text-neon-light transition mt-2">
                        View page <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Related blog topics */}
        <div className="pt-6 border-t border-tech-500/10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-neon" />
            <h3 className="text-sm font-semibold text-tech-200">
              Read related guides
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORY_LINKS.map(cat => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-tech-800 border border-tech-500/30 text-xs text-tech-300 hover:border-neon/30 hover:text-neon-light transition"
              >
                <Sparkles className="w-3 h-3" />
                <span>{cat.title}</span>
                <span className="text-tech-500">({cat.count})</span>
              </Link>
            ))}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-tech-800 border border-tech-500/30 text-xs text-tech-300 hover:border-neon/30 hover:text-neon-light transition"
            >
              All guides <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
