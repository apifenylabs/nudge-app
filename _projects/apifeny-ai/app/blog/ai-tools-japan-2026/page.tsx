import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, BookOpen, CheckCircle, DollarSign, Globe, Code, PenTool, BarChart, MapPin, Zap, ShieldCheck, Layers, Cpu, Users, Building2 } from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getRelatedPosts, getRelatedPostsByCategory } from '@/lib/blog-data';

const BASE_URL = 'https://apifeny-ai.vercel.app';

const POST = {
  slug: 'ai-tools-japan-2026',
  title: 'Best AI Tools in Japan 2026: Complete Market Guide for Japanese Businesses & International Founders',
  excerpt: "Japan's AI market hit $9.2B in 2025 and is on track for $28B by 2030. From Tokyo's DeepTech boom to Osaka's industrial AI revolution, here's the definitive guide to AI tools built for Japan — with JA language support, APPI compliance, JPY pricing, and local ecosystem insights.",
  date: '2026-06-03',
  author: 'Apifeny AI Team',
  tags: [
    'AI-tools',
    'Japan-AI',
    'best-of',
    'commercial',
    'comparison',
    'productivity',
    'Japan',
    'Asia-Pacific',
  ],
  readingTime: '11 min read',
};

export const metadata: Metadata = {
  title: POST.title,
  description: POST.excerpt,
  keywords: [...POST.tags, 'AI tools Japan 2026', 'best AI tools for Japanese businesses', 'Japan AI market', 'Japanese AI startups', 'APPI compliant AI tools', 'Apifeny AI'],
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

export default function JapanAITools2026() {
  const relatedPosts = (getRelatedPosts as (slug: string, limit: number) => { slug: string; title: string; excerpt: string }[])(POST.slug, 3);
  const categoryRelated = getRelatedPostsByCategory(POST.slug, 4);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema items={[
        { name: 'Home', item: '/' },
        { name: 'Blog', item: '/blog' },
        { name: POST.title, item: `/blog/${POST.slug}` },
      ]} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-4">
            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-medium">
              <Tag className="w-3 h-3" />Japan Market
            </span>
            <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{POST.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{POST.readingTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{POST.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{POST.excerpt}</p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6 mb-10">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Contents</h2>
          <ul className="space-y-2 text-sm">
            {[
              '1. Japan AI Market Overview — $9.2B and Accelerating',
              '2. Best All-Round AI Tool: ChatGPT vs Claude vs Gemini for Japanese Users',
              '3. Best AI for Japanese Developers & Engineers',
              '4. Best AI for Japanese Content Creation & Marketing',
              '5. Japan-Specific AI Platforms & Homegrown Champions',
              '6. APPI Compliance & Data Governance for AI in Japan',
              '7. Industry-Specific AI: Manufacturing, Finance, Healthcare',
              '8. Pricing Comparison: Global vs Japan-Market Tools',
              '9. Japan AI Ecosystem: Funding, Talent & Government Support',
              '10. Final Recommendations',
            ].map((item, i) => (
              <li key={i} className="text-gray-600 hover:text-blue-700 transition cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* 1. Market Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Japan AI Market Overview — $9.2B and Accelerating</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Japan is the world's <strong>third-largest AI market</strong>, with spending projected to hit <strong>$9.2B in 2025</strong> and <strong>$28B by 2030</strong> (IDC). 
            The Japanese government's <strong>Society 5.0</strong> initiative and the <strong>AI Strategy 2025</strong> — backed by a ¥1T+ ($6.6B+) investment package — 
            have created a fertile ground for AI adoption across every sector.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            What makes Japan unique? <strong>Deep industrial AI</strong> (manufacturing has 25%+ of global robot installations), 
            a <strong>¥100T+ ageing economy</strong> driving healthcare and eldercare AI, 
            and a <strong>conservative but rapidly evolving</strong> regulatory environment that rewards compliance-first tools.
            For foreign founders: Japan's Startup Visa and METI's J-Startup programme make 2026 the best time to enter.
          </p>
        </section>

        {/* 2. All-Round AI */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Best All-Round AI Tool for Japanese Users</h2>
          <div className="space-y-4">
            {[
              { name: 'ChatGPT (OpenAI)', ja: 'Japanese support since day one. GPT-4o handles JA with native-level fluency. $20/mo Plus. Best for general productivity, writing, brainstorming. Limited APPI compliance guarantees.', best: 'General productivity & content' },
              { name: 'Claude (Anthropic)', ja: 'Exceptional JA language reasoning. Best for long-form Japanese documents, compliance analysis, and safety-critical applications. $20/mo Pro. Strong APPI alignment via AWS Tokyo region.', best: 'Compliance & long-form analysis' },
              { name: 'Gemini (Google)', ja: 'Tight Google Workspace integration popular in Japanese enterprises. 1M-token context window. JA support strong. Free tier available. $19.99/mo Advanced.', best: 'Enterprise workflows & research' },
              { name: 'DeepSeek (China)', ja: '#1 cost leader. V3 model handles JA well. Free (open source). $0.14/M input tokens. Excellent value. Data residency concerns for regulated Japanese industries.', best: 'Cost-sensitive use & coding' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition">
                <h3 className="font-semibold text-gray-900 text-base mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{item.ja}</p>
                <p className="text-xs text-blue-700 font-medium">Best for: {item.best}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Developers */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Best AI for Japanese Developers & Engineers</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Japan has one of the world's most active developer ecosystems. GitHub's 2025 Octoverse report shows Japan as the <strong>4th fastest-growing developer population globally</strong>. Here's what Japanese devs are using:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { tool: 'GitHub Copilot', cost: '$10-19/mo', why: 'Best VS Code integration. Strong JA code comments. Enterprise SKU via GitHub Japan.' },
              { tool: 'Cursor', cost: '$20/mo', why: 'Best-in-class auto-complete. Preferred by Tokyo startup engineers. JA-friendly UI.' },
              { tool: 'Windsurf', cost: '$15-35/mo', why: 'Cascade agent mode for complex refactoring. Popular in Osaka dev community.' },
              { tool: 'DeepSeek Coder', cost: 'Free / API', why: 'Open-weight coding model. Excellent for cost-sensitive Japanese startups. Self-hostable.' },
              { tool: 'Claude Code', cost: '$20/mo Pro', why: 'Best for Japanese system design docs and architecture review. Strong at Japanese spec reading.' },
              { tool: 'Qwen Coder (Alibaba)', cost: 'Free / API', why: 'Strong CJK support. Growing adoption in Japanese-Chinese joint dev teams.' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <h3 className="font-semibold text-gray-900 text-sm">{item.tool}</h3>
                <p className="text-xs text-gray-500">{item.cost}</p>
                <p className="text-xs text-gray-600 mt-1">{item.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Content & Marketing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Best AI for Japanese Content Creation & Marketing</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Japanese content marketing has unique requirements: <strong>keigo (honorific) handling</strong>, 
            <strong>three writing scripts</strong> (hiragana, katakana, kanji) in the same sentence, 
            and culturally specific tone preferences. Here's what works:
          </p>
          <div className="space-y-3">
            {[
              { tool: 'ChatGPT / Claude', use: 'Blog posts, social media, keigo-aware email drafts. Claude excels at formal Japanese business correspondence.' },
              { tool: 'Canva AI (Magic Studio)', use: 'Japanese social media graphics, presentations. JA template library expanding in 2026.' },
              { tool: 'Jasper AI', use: 'Multilingual marketing copy. Japan-localized templates for Yahoo! Japan Ads, LINE campaigns.' },
              { tool: 'Riku (Japanese native AI writing)', use: 'Homegrown JA-focused writing assistant. Strong understanding of Japanese SEO and trending keywords.' },
              { tool: 'Notion AI', use: 'Documentation and knowledge management. Popular in Japanese tech companies. JA support improving.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 text-sm">{item.tool}</span>
                  <span className="text-gray-600 text-sm"> — {item.use}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Homegrown */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Japan-Specific AI Platforms & Homegrown Champions</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Japan is producing world-class AI companies. Here are the homegrown platforms worth knowing:
          </p>
          <div className="space-y-4">
            {[
              { name: 'Preferred Networks (PFN)', focus: 'Deep learning, manufacturing AI, autonomous driving. Chainer framework origin. Toyota and FANUC partnerships.', url: '' },
              { name: 'RIL.AI (RIKEN AIP spinout)', focus: 'AI infrastructure, research-grade ML models for Japanese enterprises.' },
              { name: 'ABEJA', focus: 'Industrial AI for manufacturing and retail. Tokyo Stock Exchange listed (IPO 2022).' },
              { name: 'ELIZA (by Ubie)', focus: 'Medical AI. Japanese symptom checker used by 5M+ patients. MHLW clearance.' },
              { name: 'Hacarus', focus: 'Medical imaging AI. Kyoto-based. Patent-pending sparse modeling technology.' },
              { name: 'Matsuo Lab (UTokyo spinouts)', focus: 'Deep learning research. Multiple startup incubations. Tokyo University ecosystem.' },
              { name: 'BrainPad', focus: 'Data analytics and AI consulting. Listed on Tokyo Stock Exchange. Strong Power BI+AI integration.' },
              { name: 'OptoQuest', focus: 'Quantum-inspired AI optimization. Used in logistics and manufacturing scheduling.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-lg p-3">
                <Building2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                  <p className="text-xs text-gray-600 mt-0.5">{item.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. APPI Compliance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. APPI Compliance & Data Governance for AI in Japan</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Key Compliance Requirements
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold">•</span> <strong>Cross-border data transfers:</strong> APPI 2024 amendments tighten rules. Cloud AI tools must use Japan-based regions (AWS Tokyo, Azure Japan East, GCP Tokyo).</li>
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold">•</span> <strong>Consent management:</strong> Clear opt-in required for AI training data. PPC guidance specifically addresses LLM training.</li>
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold">•</span> <strong>Transparency:</strong> AI systems making automated decisions must provide explainability — especially in credit, hiring, and insurance.</li>
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold">•</span> <strong>AI Governance Framework:</strong> Japan's proposed AI Act (2026) will classify high-risk systems and mandate conformity assessments for certain use cases.</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { tool: 'AWS Tokyo (ap-northeast-1)', compliant: 'Full APPI alignment, PPC-approved data centers.', best: 'Claude, Bedrock, SageMaker' },
              { tool: 'Azure Japan East', compliant: 'Comprehensive compliance suite. Used by 60%+ of Japanese enterprises.', best: 'GPT-4o via Azure, Copilot' },
              { tool: 'GCP Tokyo (asia-northeast1)', compliant: 'Strong for Vertex AI. Google Workspace integration.', best: 'Gemini, Vertex AI' },
              { tool: 'Oracle Cloud Japan (Osaka/Tokyo)', compliant: 'Growing presence. Competitive pricing.', best: 'OCI AI, custom models' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 text-sm">{item.tool}</h3>
                <p className="text-xs text-gray-600">{item.compliant}</p>
                <p className="text-xs text-blue-700 mt-1">Best for: {item.best}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Industry-Specific */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Industry-Specific AI: Manufacturing, Finance, Healthcare</h2>
          <div className="space-y-4">
            {[
              { industry: 'Manufacturing & Robotics', icon: Cpu, tools: 'PFN for predictive maintenance, ABEJA for visual inspection, FANUC AI for robot optimization, NEC for quality control. Japan operates 25%+ of global industrial robots (IFR 2025).' },
              { industry: 'Finance & FinTech', icon: DollarSign, tools: 'Rakuten AI for e-commerce/payments, PayPay fraud detection, SMBC-GPT for banking. FSA/BoJ published AI guidelines for financial services in 2025.' },
              { industry: 'Healthcare & Eldercare', icon: Users, tools: 'Ubie for symptom triage, Hacarus for medical imaging, Fujitsu for drug discovery, SoftBank Robotics for eldercare robots. Ageing population: 29%+ aged 65+ — massive AI opportunity.' },
              { industry: 'Retail & E-commerce', icon: Globe, tools: 'Mercari AI for recommerce, LINE AI for conversational commerce, Seven & i for inventory optimization. Japan e-commerce hit ¥20T+ in 2025.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 text-base flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-blue-600" />
                    {item.industry}
                  </h3>
                  <p className="text-sm text-gray-600">{item.tools}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. Pricing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Pricing Comparison: Global vs Japan-Market Tools</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200">Tool</th>
                  <th className="text-left px-4 py-3 text-blue-700 font-semibold border-b border-gray-200">Personal Plan</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200">JA Support</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200">APPI-Compliant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['ChatGPT (GPT-4o)', '$20/mo Plus', '✅ Excellent', '⚠️ Via Azure Japan'],
                  ['Claude Sonnet 4', '$20/mo Pro', '✅ Excellent', '✅ AWS Tokyo region'],
                  ['Gemini 2.5 Pro', 'Free / $19.99 Adv', '✅ Strong', '✅ GCP Tokyo region'],
                  ['DeepSeek V3', 'Free (open source)', '✅ Good', '❌ Self-host required'],
                  ['GitHub Copilot', '$10-19/mo', '✅ Strong', '✅ Azure Japan'],
                  ['Cursor', '$20/mo', '✅ Good', '⚠️ US-based infra'],
                  ['Canva AI', '$12.99/mo Pro', '✅ Good', '⚠️ Requires review'],
                  ['Notion AI', '$10/mo per member', '✅ Good', '⚠️ Requires review'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-800 font-medium">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[2]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. Ecosystem */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Japan AI Ecosystem: Funding, Talent & Government Support</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Japan's AI ecosystem is experiencing a renaissance. Here's the state of play in 2026:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { metric: '¥1T+ ($6.6B)', label: 'Government AI investment (AI Strategy 2025)' },
              { metric: '4,200+', label: 'AI startups in Japan (METI 2025)' },
              { metric: '$9.2B', label: 'AI market size (2025), growing to $28B by 2030' },
              { metric: '29%', label: 'Population aged 65+ driving healthcare AI demand' },
              { metric: '4th fastest', label: 'Developer population growth globally (GitHub 2025)' },
              { metric: '60%+', label: 'Large Japanese enterprises already using AI (METI survey 2026)' },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{item.metric}</p>
                <p className="text-xs text-gray-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> <strong>METI AI Strategy 2025:</strong> ¥1T+ for compute infrastructure, talent development, and AI adoption subsidies for SMEs (up to 50% cost coverage).</p>
            <p className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> <strong>J-Startup Programme:</strong> Government-backed acceleration for high-potential AI startups. Includes procurement access to major Japanese corporations.</p>
            <p className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> <strong>Startup Visa:</strong> 2-year residency for international AI founders. 500+ approved in 2025. Priority for AI, DeepTech, and semiconductor startups.</p>
            <p className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> <strong>University R&D:</strong> UTokyo Matsuo Lab, Kyoto ML groups, RIKEN AIP, Tohoku AI Centre — producing world-class AI research and talent pipeline.</p>
          </div>
        </section>

        {/* 10. Final Recommendations */}
        <section className="mb-10 bg-gradient-to-br from-red-50 via-white to-blue-50 border border-red-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Final Recommendations</h2>
          <div className="space-y-4">
            {[
              { scenario: 'Japanese enterprise (regulated industry)', rec: 'Claude (AWS Tokyo) + Azure OpenAI for general tasks. Self-host DeepSeek for cost-sensitive internal tools. All APPI-compliant when configured correctly.' },
              { scenario: 'Japanese startup (building product)', rec: 'Cursor or Copilot for coding. ChatGPT for go-to-market content. Gemini for Google Workspace productivity. DeepSeek API for cost-optimized inference.' },
              { scenario: 'International founder entering Japan', rec: 'Use Monica or Kimi for Japan-market research. Claude for Japanese business communication. RIL.AI for local market intelligence. Apply for Startup Visa and J-Startup.' },
              { scenario: 'Foreign company expanding to Japan', rec: 'Claude for compliance-first operations. AWS Tokyo region for data residency. Preferred Networks or ABEJA for Japan-specific industrial AI partnerships.' },
            ].map((item, i) => (
              <div key={i} className="border border-red-200 rounded-lg p-4 bg-white/80">
                <p className="text-gray-800 font-medium text-sm mb-1"><strong>Scenario {i+1}:</strong> {item.scenario}</p>
                <p className="text-gray-600 text-sm">{item.rec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-200 pt-10 mt-10">
          <div className="bg-gradient-to-r from-red-50 via-white to-blue-50 rounded-xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Explore All AI Tools for Japan</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">Browse 85+ AI tools ranked for Japan-market readiness, JA language support, and APPI compliance. Updated daily.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/ai-tools-japan" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
                Japan AI Tools Directory<ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/playbooks" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-700 text-sm font-medium transition-all">
                Explore Playbooks<BookOpen className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {categoryRelated.length > 0 && (
          <section className="border-t border-gray-200 pt-10 mt-10">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Continue Reading</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categoryRelated.slice(0, 4).map(({ post: related, category }) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all flex flex-col shadow-sm">
                  {category && (
                    <span className="self-start inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50 mb-3">
                      <Layers className="w-2.5 h-2.5" />
                      {category.title.length > 28 ? category.title.substring(0, 26) + '…' : category.title}
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition mb-2 line-clamp-2">{related.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-3 flex-1">{related.excerpt}</p>
                  <div className="flex items-center gap-1 text-xs text-blue-700 group-hover:gap-2 transition-all mt-auto">
                    Read Article<ArrowRight className="w-3 h-3" />
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
