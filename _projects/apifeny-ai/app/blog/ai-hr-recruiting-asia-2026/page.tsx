import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, CheckCircle, DollarSign, Globe, Building, Zap, ShieldCheck, BookOpen, Layers, Search, MessageCircle, BarChart, Heart, Users } from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getRelatedPosts, getRelatedPostsByCategory } from '@/lib/blog-data';

const BASE_URL = 'https://apifeny-ai.vercel.app';

const POST = {
  slug: 'ai-hr-recruiting-asia-2026',
  title: 'Best AI Tools for HR & Recruiting in Asia (2026): 18 Platforms for Hiring, Payroll, Engagement & Compliance',
  excerpt: 'From AI-powered recruitment in Singapore and India to payroll compliance in Japan and Korea — the definitive guide to 18+ AI HR tools built for Asian markets, with verified pricing, regional breakdowns, and a practical framework for building your HR tech stack.',
  date: '2026-05-31',
  author: 'Apifeny AI Team',
  tags: [
    'HR',
    'recruitment',
    'payroll',
    'employee-engagement',
    'performance-management',
    'compliance',
    'Asia',
    'AI-tools',
    'HR-tech',
  ],
  readingTime: '14 min read',
};

export const metadata: Metadata = {
  title: POST.title,
  description: POST.excerpt,
  keywords: [...POST.tags, 'AI HR tools Asia 2026', 'HR software Asia', 'recruitment automation Asia', 'payroll compliance Asia', 'employee engagement AI'],
  alternates: { canonical: `${BASE_URL}/blog/${POST.slug}` },
  openGraph: {
    title: POST.title,
    description: POST.excerpt,
    url: `${BASE_URL}/blog/${POST.slug}`,
    type: 'article',
    siteName: 'Apifeny AI',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: POST.title,
    description: POST.excerpt,
    images: ['/og'],
  },
};

export default function AIHRRecruitingAsia() {
  const relatedPosts = (getRelatedPosts as (slug: string, limit: number) => { slug: string; title: string; excerpt: string }[])(POST.slug, 3);
  const categoryRelated = getRelatedPostsByCategory(POST.slug, 4);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: POST.title, item: `/blog/${POST.slug}` },
        ]}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 transition mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {POST.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50">
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{POST.title}</h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{POST.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(POST.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{POST.readingTime}</span>
          </div>
        </header>

        {/* Key Takeaways */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-600" />Key Takeaways</h2>
          <ul className="space-y-3">
            {[
              'Asia\'s HR tech market is fragmented by region: China favors Moka & Beisen, India runs on Darwinbox & Keka, Japan uses SmartHR, SE Asia leans on Omni HR & Talenox',
              'AI recruitment tools can cut time-to-hire by 50-70% in competitive Asian markets, with tools starting as low as $3/employee/month',
              'Payroll compliance is the #1 pain point — each country (CPF in SG, EPF in MY, MPF in HK, BPJS in ID, PF/ESI in IN) has unique statutory requirements that global tools often miss',
              'Employee engagement AI is rising fast in Asia: Culture Amp, Lattice, and Leena AI are the top picks with Asia-specific localization',
              'The best stack for most Asian companies is a local HRIS (Darwinbox/Keka/Omni HR) + global best-of-breed tools (Lattice/Culture Amp) for specialized needs',
              '82% of HR leaders in Asia plan to adopt AI in HR functions, but only 21% trust AI recommendations enough to act without human review (Omni HR State of AI 2026)',
            ].map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quick Reference Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">18 AI HR Tools for Asia — Quick Reference</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200">Tool</th>
                  <th className="text-left px-4 py-3 text-blue-700 font-semibold border-b border-gray-200">Category</th>
                  <th className="text-left px-4 py-3 text-cyan-700 font-semibold border-b border-gray-200">Primary Market</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200">Pricing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Moka', 'Recruitment (ATS)', 'China / Global', '~$50,000+/yr enterprise'],
                  ['Beisen', 'Full HCM Suite', 'China', 'Custom quote (enterprise)'],
                  ['Darwinbox', 'Full HCM Suite', 'India / SE Asia', '$4-8/employee/month'],
                  ['Keka', 'HRMS + Payroll', 'India', '₹7,000-14,000/month (~$80-170)'],
                  ['ZingHR', 'HRMS + Payroll', 'India', 'Custom quote (from ₹50/employee/mo)'],
                  ['SmartHR', 'HRIS + Payroll', 'Japan', '~¥500-1,500/employee/month'],
                  ['Omni HR', 'All-in-one HRIS', 'SE Asia (SG, MY, HK, PH, ID)', 'From $3/employee/month'],
                  ['Talenox', 'Payroll + Leave', 'SG, MY, HK', 'From $3/employee/month'],
                  ['Eightfold AI', 'Talent Intelligence', 'Global (strong in JP/KR)', 'Custom quote (enterprise)'],
                  ['Workable', 'Recruitment (ATS)', 'Global', '$149-249/month per seat'],
                  ['Manatal', 'Recruitment (ATS)', 'SE Asia (TH, VN, ID, PH, MY)', '$49/month per seat'],
                  ['Leena AI', 'HR Service Delivery', 'Global (India-founded)', '$4-8/employee/month'],
                  ['Paradox (Olivia)', 'HR Chatbot', 'Global', 'Custom quote'],
                  ['Lattice', 'Performance Mgmt', 'Global', '$11/seat/month'],
                  ['Culture Amp', 'Employee Engagement', 'Global', '~$5-10/employee/month'],
                  ['Workday Peakon', 'Employee Voice', 'Global', 'Part of Workday suite'],
                  ['Zoho People', 'HRIS + Core HR', 'Global (strong in IN)', 'Free up to 5 users; from $1/user/mo'],
                  ['greytHR', 'Payroll + HR', 'India', 'From ₹1,500/month (~$18)'],
                  ['Sprout HR', 'HR + Payroll', 'Philippines / SE Asia', 'Custom quote'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-800 font-medium">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-500">{row[2]}</td>
                    <td className="px-4 py-3 text-gray-500">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Asia HR is Different */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why HR in Asia Needs Different AI Tools</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you're an HR leader in Asia, you've probably tried implementing a global HR platform and discovered it doesn't handle your payroll compliance. Or you've tried a Western AI recruiting tool that can't parse Chinese resumes or Thai CVs properly.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            HR in Asia is fundamentally different from HR in the US or Europe. Here's why:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, title: 'Fragmented Compliance', description: 'Every country has unique statutory requirements: CPF (SG), EPF/SOCSO/EIS (MY), MPF (HK), BPJS (ID), SSS/PhilHealth/Pag-IBIG (PH), PF/ESI/LWF (IN), Shakai Hoken (JP), and 4 insurances (CN). Global tools often handle none of these.' },
              { icon: <Globe className="w-5 h-5 text-cyan-600" />, title: 'Multi-Language HR', description: 'Resume parsing, job descriptions, performance reviews, and engagement surveys need to work in Chinese, Japanese, Korean, Thai, Vietnamese, Bahasa, Tamil, and English — often within the same company.' },
              { icon: <Users className="w-5 h-5 text-purple-600" />, title: 'Cultural Nuance', description: 'Performance management in Japan (nemawashi/consensus) is different from Singapore (meritocratic) or India (hierarchical). AI engagement tools must be culturally calibrated.' },
              { icon: <Building className="w-5 h-5 text-emerald-600" />, title: 'Local Platform Ecosystems', description: 'Job platforms are country-specific: Zhaopin/Boss Zhipin (CN), Wantedly/Recruit Agent (JP), JobKorea/Saramin (KR), JobsDB/JobStreet (SEA), Naukri/Shine (IN). AI sourcing tools need deep integrations.' },
              { icon: <DollarSign className="w-5 h-5 text-amber-600" />, title: 'Currency & Pricing', description: 'Asian payroll involves multiple currencies, complex tax computations, and statutory contributions that change annually. AI tools must handle per-country payroll logic natively.' },
              { icon: <Zap className="w-5 h-5 text-rose-600" />, title: 'Speed of Adoption', description: '82% of Asian HR leaders plan to adopt AI in 2026, but data residency laws in China (PIPL), Korea (PIPA), and Japan (APPI) mean some global AI tools can\'t be used.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Recruitment & Sourcing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Search className="w-6 h-6 text-blue-600" />1. AI Recruitment & Sourcing Platforms</h2>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Moka — China's #1 AI Recruitment Platform</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Moka is China's leading AI-powered recruitment platform, trusted by over 30% of Fortune 500 companies operating in China. Its flagship AI engine, <strong className="text-gray-900">Moka Eva</strong>, covers the full hiring lifecycle — from sourcing and screening to interview management and offer optimization.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI resume parsing that handles Chinese, English, and mixed-language resumes; AI candidate recommendation based on role history and recruiter behavior; AI-powered interview question generation tailored to each candidate's resume; AI interview summarization; and an AI chatbot for candidate communication. Moka reports a 63% reduction in time-to-hire and 70% reduction in manual resume review time.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Deep integration with China's job ecosystem (Boss Zhipin, Zhaopin, Liepin, 51job) and enterprise tools (DingTalk, Feishu/Lark, WeCom). Its AI learns from your hiring decisions to deliver smarter recommendations over time.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise-focused, typically ~$50,000+/year. <strong className="text-gray-900">Best for:</strong> Mid-to-large enterprises hiring in China.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Eightfold AI — Talent Intelligence Powerhouse</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Eightfold AI is a talent intelligence platform using deep learning models trained on billions of data points to match candidates to roles based on skills and potential. It's particularly strong in Japan and Korea where large enterprises value its bias-reduction capabilities and native support for Japanese, Korean, and Chinese resumes.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Skills inference from sparse data (useful when Asian resumes don't use Western-style skill keywords); career pathing and internal mobility; predictive attrition modeling. Eightfold's AI recognizes Asian education systems (Chinese 985/211 universities, Japanese Todai/Kyodai, Korean SKY universities, Indian IITs) and understands how they map to skills.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based (typically $50-100K+/year). <strong className="text-gray-900">Best for:</strong> Large enterprises ({' >'}1,000 employees) in Japan, Korea, India, and Singapore.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Workable AI — Best for SMBs Across Markets</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Workable is a comprehensive recruiting platform popular among Asian SMBs, with AI features covering job description generation, resume screening, candidate sourcing, and one-click posting to Asian job boards including JobsDB, JobStreet, and Indeed.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI job description generator with localized templates; AI candidate ranking and matching; AI-powered sourcing from LinkedIn and other platforms; automated interview scheduling.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Standard at $149/month per seat, Premium at $249/month. <strong className="text-gray-900">Best for:</strong> SMBs (10-500 employees) hiring across multiple Asian markets.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Manatal — SE Asia Recruitment Specialist</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Headquartered in Thailand, Manatal is an AI recruitment platform specifically built for Southeast Asian markets. It parses 30+ resume formats common in Asia — including Thai-script CVs with GPX scores, Vietnamese CVs with graduation thesis topics, and Indonesian CVs — that Western AI tools often fail to parse correctly.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI candidate ranking using semantic analysis across English, Thai, Vietnamese, Bahasa, and Chinese; AI resume parsing for Asian-specific formats; AI job posting distribution to local boards (JobsDB, JobStreet, TopCV, Glints); AI sourcing from Asian social platforms.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Professional at $49/month per seat, Enterprise custom. <strong className="text-gray-900">Best for:</strong> Recruitment agencies and companies hiring in Thailand, Vietnam, Indonesia, Philippines, and Malaysia.</p>
        </section>

        {/* Section 2: Full HCM Suites */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Building className="w-6 h-6 text-purple-600" />2. All-in-One HCM Suites (Payroll + HRIS + Recruitment)</h2>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Beisen — China's Enterprise HCM Leader</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Beisen is China's largest cloud-based HCM provider, serving over 6,000 enterprise customers including Lenovo, Starbucks China, and Pfizer China. In 2026, Beisen launched <strong className="text-gray-900">AI Family 2.0</strong>, embedding generative AI across the entire employee lifecycle — from recruitment and onboarding to performance management and succession planning.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-powered recruitment (job profile generation, resume parsing, interview scheduling); AI performance management with continuous feedback analysis; AI talent analytics with attrition prediction; AI-based learning recommendations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Fully compliant with China's PIPL data regulations, deep integration with DingTalk and WeCom, and supports China's unique HR workflows (hukou management, social insurance, housing fund calculations). Beisen also handles China's complex annual tax reconciliation process.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Custom enterprise quote. <strong className="text-gray-900">Best for:</strong> Large enterprises (500+ employees) operating in China.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Darwinbox — India's Unicorn HCM Going Global</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Darwinbox is India's fastest-growing cloud HCM platform, now serving 2+ million employees across 100+ countries. Backed by $110M+ in funding, it's the go-to HR platform for Asian enterprises that need a modern, mobile-first experience. In 2025, Darwinbox launched <strong className="text-gray-900">Darwin AI Copilot</strong>, a context-aware AI assistant.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Darwin AI Copilot provides proactive suggestions to HR leaders (e.g., "Attrition in your Bangalore engineering team is up 15% — consider retention bonuses"); AI-powered recruitment with resume parsing and candidate matching; AI-driven performance reviews with manager nudges; predictive attrition modeling with department-level breakdowns.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> The only HCM platform handling statutory compliance for India (PF, ESI, LWF, Professional Tax, gratuity), Singapore (CPF), Indonesia (BPJS), Philippines (SSS/PhilHealth/Pag-IBIG), and Middle East markets natively. Supports 15+ languages including Hindi, Tamil, Bahasa, and Thai.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> $4-8/employee/month depending on modules. <strong className="text-gray-900">Best for:</strong> Mid-to-large enterprises (200-10,000 employees) in India, SE Asia, and Middle East.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Keka — India's Best Mid-Market HRMS</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Keka has emerged as India's most popular HRMS for mid-market companies. With a beautiful UI and India-first design, Keka covers 14 HR modules including core HR, payroll, attendance, performance, recruitment, and expense management.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-powered expense categorization and fraud detection; AI resume parsing and candidate matching; automated attendance reconciliation; AI-driven performance analytics and feedback summaries.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">India-specific wins:</strong> Keka auto-computes PF (12% employer/employee), ESIC, Professional Tax (varies by state), LWF (state-specific), and gratuity. It handles India's income tax TDS deduction and generates Form 16, Form 24Q, and other compliance reports automatically.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Foundation ~₹6,999/month (~$84), Strength ~₹9,999/month (~$120), Growth ~₹13,999/month (~$168). <strong className="text-gray-900">Best for:</strong> Indian companies with 25-500 employees.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">ZingHR — AI-Powered HRMS for India</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            ZingHR is a strong Darwinbox/Keka alternative, known for its AI-first approach. Rated 4.7 stars on Gartner Peer Insights with strong mobile-first design.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-based attendance and payroll processing; AI-driven engagement surveys and sentiment analysis; predictive attrition modeling; AI-powered recruitment screening.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> From ~₹50/employee/month (Welcome plan). <strong className="text-gray-900">Best for:</strong> Growing Indian companies of any size.</p>
        </section>

        {/* Section 3: Japan & Korea */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Globe className="w-6 h-6 text-rose-600" />3. Japan & Korea: Local Giants</h2>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">SmartHR — Japan's #1 Cloud HR Platform</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            SmartHR is Japan's dominant cloud HR platform, holding the top market share for seven consecutive years through 2026. It began as a social insurance automation tool and has expanded into a full HCM platform covering payroll, talent management, and analytics. In late 2025, SmartHR launched an AI Assistant that's transforming how Japanese companies handle HR.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI Assistant for HR policy queries and labor law guidance; automated social insurance and pension calculations; AI-powered resume parsing for Japanese CV formats (rirekisho/shokumukeirekisho); predictive analytics for workforce planning.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Japan-specific wins:</strong> Deeply localized for Japan's unique labor regulations — Shakai Hoken (social insurance), Koyo Hoken (employment insurance), Hoken Nenkin (pension), and the complex year-end tax adjustment (Nenmatsu Chosei). Supports Japan's unique employment types (seishain, keiyakushain, haken, arubaito). Handles the Qualified Invoice System (インボイス制度) for consumption tax compliance.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> ~¥500-1,500/employee/month depending on modules. <strong className="text-gray-900">Best for:</strong> Any company operating in Japan, from SMEs to enterprises.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Korean HR Market Overview</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            South Korea's HR tech market is dominated by local players like <strong className="text-gray-900">Flex</strong>, which offers AI-powered attendance tracking, payroll, and performance management with deep integration into Korea's 52-hour work week regulations and 4 mandatory insurances (national pension, health insurance, employment insurance, industrial accident compensation).
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            For AI recruitment, <strong className="text-gray-900">Eightfold AI</strong> and <strong className="text-gray-900">Pymetrics</strong> are gaining traction with Korean chaebols for skills-based, bias-reduced hiring. However, local platforms JobKorea and Saramin remain dominant for sourcing. PIPA compliance is critical — Korean employee data cannot be processed on non-compliant servers.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Key tip:</strong> If hiring in Korea, ensure your AI HR tool has servers in Korea or a PIPA-compliant data processing agreement. Most global AI recruiting tools are not PIPA-compliant out of the box.</p>
        </section>

        {/* Section 4: Southeast Asia */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-600" />4. Southeast Asia: Affordable AI HR for Growing Markets</h2>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Omni HR — All-in-One HRIS Built for Asia</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Singapore-headquartered Omni HR is the most cost-effective all-in-one HR platform for Asian teams. Backed by $9.8M in funding, it serves hundreds of companies across 79+ countries with native payroll in Singapore, Hong Kong, Malaysia, Philippines, and Indonesia.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Workforce analytics with AI-driven insights; automated payroll processing with native statutory compliance; AI-powered onboarding workflows; predictive attendance and turnover analytics. Pre-built report templates cover headcount, turnover, attendance, and compensation from a single source of truth.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Handles CPF (Singapore), MPF (Hong Kong), EPF/SOCSO/EIS (Malaysia), SSS/PhilHealth/Pag-IBIG (Philippines), and BPJS (Indonesia) natively. Integrates with local banks and accounting software. Customers report 75% reduction in payroll processing time.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> From $3/employee/month. <strong className="text-gray-900">Best for:</strong> Companies with 50-800 employees operating in SE Asia.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Talenox — SG/MY/HK Payroll Specialist</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Talenox is a cloud-based HR and payroll platform popular in Singapore, Malaysia, and Hong Kong. It focuses on getting payroll right — with built-in statutory calculations that update automatically when regulations change.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key features:</strong> Automated payroll with CPF/EPF/MPF calculations; leave management with country-specific accrual rules; employee self-service portal; expense tracking; Xero and QuickBooks integration.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> From $3/employee/month for Payroll module. <strong className="text-gray-900">Best for:</strong> SMEs (10-200 employees) in Singapore, Malaysia, and Hong Kong.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Sprout HR — Philippines-First HR Platform</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Sprout HR is the leading HR and payroll platform in the Philippines, built specifically for the Philippine market's unique compliance requirements — including SSS, PhilHealth, Pag-IBIG, BIR tax computation, and 13th month pay.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-enhanced payroll processing; automated 13th month pay calculation; AI-driven workforce scheduling for shifting industries; compliance reporting for DOLE and BIR.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Custom quote. <strong className="text-gray-900">Best for:</strong> Companies of any size operating in the Philippines.</p>
        </section>

        {/* Section 5: Employee Engagement */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Heart className="w-6 h-6 text-rose-600" />5. AI for Employee Engagement & Performance Management</h2>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Culture Amp — AI-Powered Employee Experience</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Culture Amp is the gold standard for employee engagement surveys and experience analytics. Its AI engine analyzes open-text survey responses in multiple Asian languages to surface themes, sentiment trends, and action recommendations for managers.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> NLP of open-ended survey responses (supports 30+ languages including Chinese, Japanese, Korean, Thai, Bahasa); AI-driven engagement benchmarks by industry and region; predictive analytics for flight risk; automated manager action suggestions based on survey results.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> ~$5-10/employee/month (quote-based). <strong className="text-gray-900">Best for:</strong> Mid-to-large companies (200+ employees) focused on engagement and retention.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Lattice — Performance & Engagement for Growing Teams</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Lattice combines performance management with employee engagement in one platform. Its AI surfaces trends in feedback, reviews, and engagement scores — helping HR teams identify at-risk teams and connect individual goals with business outcomes.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-generated performance review summaries; engagement trend analysis and benchmarking; goal alignment insights across teams; automated check-in and 1:1 meeting reminders with suggested talking points.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> From $11/seat/month. <strong className="text-gray-900">Best for:</strong> Mid-market companies (50-1,000 employees) running structured performance cycles.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Workday Peakon Employee Voice — Enterprise Sentiment Analysis</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Workday Peakon delivers continuous employee sentiment analysis through always-on listening surveys. Its AI identifies emerging issues before they become attrition problems — particularly valuable for large Asian enterprises with distributed workforces across multiple countries.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Real-time sentiment analysis with language support for major Asian languages; automated engagement driver identification; team-level heat maps of engagement risk; AI-recommended action plans.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Part of Workday HCM suite. <strong className="text-gray-900">Best for:</strong> Large enterprises (5,000+ employees) already on Workday.</p>
        </section>

        {/* Section 6: HR Chatbots */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><MessageCircle className="w-6 h-6 text-cyan-600" />6. AI HR Chatbots & Service Delivery</h2>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Leena AI — HR Service Delivery for Asian Enterprises</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            India-founded Leena AI is an enterprise HR service delivery platform that uses AI to automate HR ticket resolution, policy queries, and employee self-service. It integrates with Slack, Microsoft Teams, and popular HRIS platforms.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Conversational AI that answers HR policy questions in 100+ languages; automated ticket routing and resolution (resolves 60-80% of queries without human intervention); AI-powered knowledge management; employee sentiment analysis from chat interactions.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Supports Hindi, Tamil, Bahasa, Thai, Vietnamese, and other Asian languages. Understands cultural nuances in HR questions (e.g., Japanese employees asking about overtime allowances or Indian employees asking about LTA exemptions).
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> $4-8/employee/month. <strong className="text-gray-900">Best for:</strong> Mid-to-large enterprises (500+ employees) with high HR ticket volume.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Paradox (Olivia) — Conversational Recruiting</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Paradox's AI assistant, Olivia, handles the full candidate conversation flow — screening, scheduling, answering questions, and sending offer letters — through natural conversation via text, chat, or voice.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Automated candidate screening and qualification; conversational scheduling (no calendar links); multilingual support (15+ languages including Chinese, Japanese, Korean); AI-driven candidate engagement and nurture campaigns.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Custom quote. <strong className="text-gray-900">Best for:</strong> Companies with high-volume recruiting who want to automate candidate communication.</p>
        </section>

        {/* Section 7: Payroll & Compliance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><DollarSign className="w-6 h-6 text-amber-600" />7. AI Payroll & Compliance (Asia-Specific)</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Payroll compliance is the #1 HR pain point in Asia. Each market has multiple statutory deductions, annual filing requirements, and penalty regimes. Here's a breakdown by market:
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200">Market</th>
                  <th className="text-left px-4 py-3 text-blue-700 font-semibold border-b border-gray-200">Key Deductions</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200">Recommended Tool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Singapore', 'CPF (17-37%), SDL, CDAC/SINDA/MBMF', 'Omni HR, Talenox, Darwinbox'],
                  ['Malaysia', 'EPF (11-13%), SOCSO (0.5-1.75%), EIS (0.2%), PCB', 'Talenox, Omni HR, Darwinbox'],
                  ['Hong Kong', 'MPF (5%), Profits Tax (16.5%)', 'Talenox, Omni HR, Clearbooks'],
                  ['Philippines', 'SSS, PhilHealth (4.5%), Pag-IBIG, Withholding Tax', 'Sprout HR, Omni HR, Darwinbox'],
                  ['Indonesia', 'BPJS Kesehatan (4%), BPJS Ketenagakerjaan', 'Omni HR, Darwinbox, Gadjian'],
                  ['India', 'PF (12%), ESIC (0.75%), Professional Tax, TDS', 'Keka, Darwinbox, ZingHR, greytHR'],
                  ['China', 'Pension (8%), Medical (2%), Unemployment (0.5%), Housing Fund (5-12%)', 'Beisen, Moka (recruitment only)'],
                  ['Japan', 'Shakai Hoken, Koyo Hoken, Income Tax, Nenmatsu Chosei', 'SmartHR, Money Forward, Freee'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-800 font-medium">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-500">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Zoho People — Free Core HR for Small Teams</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Zoho People offers a free forever plan for up to 5 users, making it the best starting point for very small businesses in Asia. Zoho People Plus (2025) brought AI-driven pulse surveys and predictive attrition models. Strong in India with integration to Zoho Payroll.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Free (up to 5 users), Essential HR from $1/user/month. <strong className="text-gray-900">Best for:</strong> Very small teams and microbusinesses across Asia.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">greytHR — India Payroll Workhorse</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            greytHR is one of India's most popular payroll and HR platforms, known for reliable compliance handling at an affordable price. It's particularly strong for companies that need reliable PF, ESIC, and TDS management without the bells and whistles of enterprise platforms.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> From ₹1,500/month (~$18). <strong className="text-gray-900">Best for:</strong> Indian SMEs (10-200 employees) focused on payroll compliance.</p>
        </section>

        {/* Budget Tiers */}
        <section className="mb-10 bg-gradient-to-r from-blue-50 via-white to-cyan-50 rounded-xl p-6 sm:p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Tiers: Building Your AI HR Stack</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-green-600" /> Free / SMB Tier ($0-5/employee/month)</h3>
              <p className="text-gray-600 text-sm mb-3">For startups and very small businesses (1-25 employees).</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Zoho People</strong> — Free core HR for up to 5 users. Add free <strong className="text-gray-900">Zoho Recruit</strong> for basic ATS.</span></li>
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Omni HR</strong> — From $3/employee/month, includes payroll, leave, and employee database for Asia.</span></li>
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Talenox</strong> — From $3/employee/month for payroll in SG/MY/HK.</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-blue-600" /> Mid-Market Tier ($5-20/employee/month)</h3>
              <p className="text-gray-600 text-sm mb-3">For growing companies (25-500 employees) that need full HR functionality.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Keka</strong> (~$80-170/month flat) — Full HRMS for Indian companies, 14 modules, great UI.</span></li>
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Darwinbox</strong> ($4-8/employee/mo) — Enterprise-grade HCM with AI copilot, multi-country compliance.</span></li>
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Workable</strong> ($149-249/seat/mo) — Full recruitment ATS with AI screening, good for multiple Asian markets.</span></li>
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Lattice</strong> ($11/seat/mo) — Best-in-class performance management + engagement.</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-purple-600" /> Enterprise Tier ($50+/employee/month)</h3>
              <p className="text-gray-600 text-sm mb-3">For large enterprises (500+ employees) with complex, multi-country operations.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Beisen</strong> — Full HCM for China, enterprise pricing. AI Family 2.0 handles the full lifecycle.</span></li>
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">SmartHR</strong> (~¥500-1,500/emp/mo) — Japan's #1 HR platform, handles labor compliance natively.</span></li>
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Eightfold AI</strong> ($50-100K+/yr) — Enterprise talent intelligence, strong in JP/KR/SG.</span></li>
                <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Workday Peakon</strong> — Enterprise employee voice analytics, part of Workday suite.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Build Your Stack */}
        <section className="mb-10 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Choose Your AI HR Stack</h2>
          <div className="space-y-5">
            {[
              { region: 'Singapore / SE Asia', stack: 'Omni HR (core HRIS + payroll) + Workable (recruitment) + Culture Amp (engagement)', cost: '$5-15/employee/month', note: 'Omni HR handles compliance across SG/MY/HK/PH/ID natively. Add Manatal if recruiting heavily in TH/VN.' },
              { region: 'India', stack: 'Darwinbox or Keka (core HR + payroll) + Leena AI (service delivery) + Lattice (performance)', cost: '$6-12/employee/month', note: 'Keka for 25-250 employees, Darwinbox for 250+ or multi-country operations. Add ZingHR for cost-sensitive.' },
              { region: 'China', stack: 'Beisen (full HCM) + Moka (recruitment) + WeCom integration', cost: 'Enterprise pricing (~$50K+/yr)', note: 'Both PIPL-compliant. Moka for recruitment, Beisen for everything else. Both deeply integrate with Chinese enterprise tools.' },
              { region: 'Japan', stack: 'SmartHR (HRIS + payroll) + Eightfold AI (talent intelligence) + Culture Amp (engagement)', cost: '¥500-2,000/employee/month + enterprise', note: 'SmartHR handles Japan\'s regulatory complexity. Eightfold for skills-based hiring in Japan\'s tight labor market.' },
              { region: 'Philippines', stack: 'Sprout HR (payroll + core HR) + Manatal (recruitment)', cost: 'Custom', note: 'Sprout HR for PH compliance (SSS/PhilHealth/Pag-IBIG/13th month). Manatal for SE Asia-wide recruiting.' },
            ].map((item, i) => (
              <div key={i} className="border border-blue-100 bg-blue-50/30 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <h3 className="text-base font-bold text-gray-900">{item.region}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div><span className="text-blue-700 font-medium">Stack:</span> <span className="text-gray-600">{item.stack}</span></div>
                  <div><span className="text-blue-700 font-medium">Cost:</span> <span className="text-gray-600">{item.cost}</span></div>
                  <div><span className="text-blue-700 font-medium">Note:</span> <span className="text-gray-600">{item.note}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ethical Considerations */}
        <section className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-amber-600" />Ethical & Compliance Considerations</h2>
          <div className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">AI in HR comes with real risks in Asia that you need to manage:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Bias in AI Screening</h3>
                <p className="text-xs text-gray-600">AI trained on historical Asian hiring data may amplify existing biases around university prestige (SKY in Korea, Todai in Japan, IIT in India, Tsinghua/Peking in China), gender, and ethnicity. Audit your AI screening regularly.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Data Residency & Privacy</h3>
                <p className="text-xs text-gray-600">China's PIPL, Korea's PIPA, Japan's APPI, and India's DPDP Act all impose restrictions on cross-border HR data processing. Ensure your tools have local servers or compliant data processing agreements.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Language & Cultural Bias</h3>
                <p className="text-xs text-gray-600">AI engagement surveys and sentiment analysis may misinterpret indirect communication styles common in Japanese, Korean, and Chinese workplace culture. Calibrate tools per market.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Payroll Penalty Risk</h3>
                <p className="text-xs text-gray-600">Incorrect statutory contributions can result in significant penalties. Even with AI automation, have a human review payroll at least quarterly. Choose tools with guaranteed compliance updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-10 bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Recommendations</h2>
          <div className="space-y-4">
            {[
              { scenario: 'Startup in Singapore hiring across SE Asia', rec: 'Omni HR for core HR + payroll. Workable AI for recruitment. Add Culture Amp for engagement as you grow.' },
              { scenario: 'Indian manufacturing company (200 employees)', rec: 'Keka for full HRMS with India compliance. Leena AI for employee self-service. Lattice for performance.' },
              { scenario: 'Japanese enterprise (5,000+ employees)', rec: 'SmartHR for payroll and labor compliance. Eightfold AI for talent intelligence and skills-based hiring.' },
              { scenario: 'China-based tech company scaling fast', rec: 'Moka for AI-powered recruitment. Beisen for full HCM. Both deeply integrated with Chinese ecosystem.' },
              { scenario: 'Philippine BPO with 1,000+ agents', rec: 'Sprout HR for PH compliance. Manatal for recruitment. Culture Amp for engagement and retention analytics.' },
              { scenario: 'Multi-country SE Asia company (SG/MY/ID/PH)', rec: 'Darwinbox for unified HCM across countries. Workable for recruitment. Lattice or Culture Amp for performance/engagement.' },
            ].map((item, i) => (
              <div key={i} className="border border-blue-200 rounded-lg p-4 bg-white">
                <p className="text-gray-800 font-medium text-sm mb-1"><strong>Scenario {i+1}:</strong> {item.scenario}</p>
                <p className="text-gray-600 text-sm">{item.rec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Posts */}
        <section className="border-t border-gray-200 pt-10 mt-10">
          <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 rounded-xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Build Your AI HR Stack</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">Apifeny AI ranks every tool for Asian market readiness, local language support, and regional data compliance.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
                Browse All 85+ AI Tools <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-700 text-sm font-medium transition-all">
                Explore More Guides <BookOpen className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {categoryRelated.length > 0 && (
          <section className="border-t border-gray-200 pt-10 mt-10">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Continue Reading</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categoryRelated.map(({ post: related, category }) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all flex flex-col shadow-sm">
                  {category && (
                    <span className="self-start inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50 mb-3">
                      <Layers className="w-2.5 h-2.5" />
                      {category.title.length > 28 ? category.title.substring(0, 26) + '\u2026' : category.title}
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition mb-2 line-clamp-2">{related.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-3 flex-1">{related.excerpt}</p>
                  <div className="flex items-center gap-1 text-xs text-blue-700 group-hover:gap-2 transition-all mt-auto">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
