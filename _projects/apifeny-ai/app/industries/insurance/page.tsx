import { Metadata } from 'next';
import Link from 'next/link';
import {
 ShieldCheck,
 Search,
 BarChart3,
 FileCheck,
 UserCheck,
 HeartPulse,
 Car,
 Home,
 Briefcase,
 DollarSign,
 ArrowRight,
 CheckCircle,
 Globe,
 Clock,
 Sparkles,
 ScanEye,
 Smartphone,
 BookOpen,
} from 'lucide-react';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'AI for Insurance — Underwriting, Claims, Fraud Detection (2026) | Apifeny AI',
 description:
  'Discover how AI is transforming insurance — automated underwriting, claims processing, fraud detection, risk assessment, and customer service. Real applications and top tools for insurers across Asia.',
 keywords: [
  'AI for insurance',
  'AI insurance tools',
  'AI in insurance industry',
  'insurance AI software',
  'AI underwriting',
  'AI claims processing',
  'AI fraud detection insurance',
  'insurtech AI',
  'AI risk assessment insurance',
  'AI customer service insurance',
  'smart insurance AI',
  'insurance technology Asia',
 ],
};

const sections = [
 {
  id: 'underwriting',
  icon: ScanEye,
  title: 'Automated Underwriting & Risk Assessment',
  items: [
   'AI models analyze applicant data, medical history, and lifestyle patterns to generate real-time risk scores',
   'Natural language processing extracts insights from unstructured documents (medical reports, financial statements)',
   'Predictive models reduce manual review time by up to 80% while improving accuracy',
   'Continuous learning from claims outcomes refines underwriting criteria over time',
  ],
 },
 {
  id: 'claims',
  icon: FileCheck,
  title: 'AI-Powered Claims Processing',
  items: [
   'Computer vision automates damage assessment from photos (auto, property) — estimate repairs in minutes',
   'NLP chatbots handle first notice of loss (FNOL), guiding claimants through submission with zero wait time',
   'Straight-through processing for low-complexity claims cuts settlement from days to hours',
   'Workflow automation routes complex claims to the right adjuster with pre-populated summaries',
  ],
 },
 {
  id: 'fraud',
  icon: ShieldCheck,
  title: 'Fraud Detection & Prevention',
  items: [
   'Graph neural networks detect organized fraud rings by mapping relationships across claimants, providers, and beneficiaries',
   'Real-time anomaly scoring flags suspicious claims before payment is authorized',
   'Historical pattern analysis identifies novel fraud schemes that rule-based systems miss',
   'Social network analysis uncovers collusion between providers, adjusters, and claimants',
  ],
 },
 {
  id: 'customer',
  icon: HeartPulse,
  title: 'Customer Service & Engagement',
  items: [
   '24/7 AI chatbots handle policy inquiries, renewal reminders, and basic claims in local languages',
   'Personalized product recommendations based on life stage, risk profile, and coverage gaps',
   'Sentiment analysis on customer interactions identifies at-risk policyholders for proactive retention',
   'Voice AI for call centers reduces average handle time by 35% while maintaining satisfaction scores',
  ],
 },
 {
  id: 'health',
  icon: UserCheck,
  title: 'Health Insurance & Wellness AI',
  items: [
   'AI analyzes wearable device data for personalized wellness programs and premium adjustments',
   'Pre-authorization approvals automated for routine procedures based on medical guidelines',
   'Population health analytics identify trends for better premium pricing and preventive care programs',
   'Fraud detection specialized for healthcare claims — duplicate billing, upcoding, phantom procedures',
  ],
 },
];

export default function InsurancePage() {
 return (
  <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
 <BreadcrumbSchema items={[
 { name: 'Home', item: '/' },
 { name: 'AI for Insurance', item: '/industries/insurance' },
 ]} />
   {/* Hero Section */}
   <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
    <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
     <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-4">
       <ShieldCheck className="w-6 h-6 text-blue-300" />
       <span className="text-blue-200 font-medium tracking-wide uppercase text-sm">Industry Deep Dive</span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
       AI in Insurance
       <span className="block text-blue-300 mt-2">Asia 2026</span>
      </h1>
      <p className="text-xl text-blue-100 mb-8 leading-relaxed">
       From automated underwriting to real-time fraud detection, AI is reshaping every layer of the insurance industry.
       Discover how insurers across Asia are cutting costs, improving accuracy, and delivering better customer experiences.
      </p>
      <div className="flex flex-wrap gap-3">
       <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-blue-200">Insurtech</span>
       <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-blue-200">Risk Assessment</span>
       <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-blue-200">Claims Automation</span>
       <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-blue-200">Fraud Detection</span>
      </div>
     </div>
    </div>
   </section>

   {/* Stats Bar */}
   <section className="border-b bg-white/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="text-center">
       <div className="text-3xl font-bold text-blue-600">40%</div>
       <div className="text-sm text-gray-600 mt-1">Cost reduction in claims processing with AI</div>
      </div>
      <div className="text-center">
       <div className="text-3xl font-bold text-blue-600">85%</div>
       <div className="text-sm text-gray-600 mt-1">Fraud detection accuracy with ML models</div>
      </div>
      <div className="text-center">
       <div className="text-3xl font-bold text-blue-600">3x</div>
       <div className="text-sm text-gray-600 mt-1">Faster underwriting with AI-assisted workflows</div>
      </div>
      <div className="text-center">
       <div className="text-3xl font-bold text-blue-600">60%</div>
       <div className="text-sm text-gray-600 mt-1">Of Asian insurers investing in AI (2026)</div>
      </div>
     </div>
    </div>
   </section>

   {/* Deep Dive Sections */}
   <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Key AI Applications in Insurance</h2>
    <p className="text-lg text-gray-600 mb-12 max-w-3xl">
     AI is not a future concept for insurance — it is deployed today across the full value chain. Here is how leading
     Asian insurers are putting it to work.
    </p>

    <div className="space-y-12">
     {sections.map((section) => {
      const Icon = section.icon;
      return (
       <div key={section.id} id={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4 mb-6">
         <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
         </div>
         <div>
          <h3 className="text-2xl font-semibold text-gray-900">{section.title}</h3>
         </div>
        </div>
        <ul className="grid sm:grid-cols-2 gap-4">
         {section.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700">
           <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
           <span>{item}</span>
          </li>
         ))}
        </ul>
       </div>
      );
     })}
    </div>
   </section>

   {/* Asia-specific Context */}
   <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-blue-100">
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
     <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Insurance AI Matters in Asia</h2>
     <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
       <Globe className="w-8 h-8 text-blue-600 mb-3" />
       <h3 className="font-semibold text-gray-900 mb-2">Underpenetrated Markets</h3>
       <p className="text-gray-600 text-sm">
        Insurance penetration in Southeast Asia averages just 3-4% of GDP versus 7-12% in developed markets.
        AI reduces acquisition costs, making micro-insurance viable for millions of unserved customers.
       </p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
       <Clock className="w-8 h-8 text-blue-600 mb-3" />
       <h3 className="font-semibold text-gray-900 mb-2">Regulatory Evolution</h3>
       <p className="text-gray-600 text-sm">
        Regulators in Singapore (MAS), Hong Kong (IA), and Malaysia (Bank Negara) are launching sandboxes and
        guidelines for AI-driven underwriting and claims — early movers gain structural advantages.
       </p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
       <Smartphone className="w-8 h-8 text-blue-600 mb-3" />
       <h3 className="font-semibold text-gray-900 mb-2">Mobile-First Distribution</h3>
       <p className="text-gray-600 text-sm">
        With over 90% smartphone penetration in major Asian markets, AI-powered chatbots and app-based claims
        are becoming the primary customer touchpoint — leapfrogging traditional agency models.
       </p>
      </div>
     </div>
    </div>
   </section>

   {/* CTA */}
   <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
     <h2 className="text-3xl font-bold mb-4">Explore AI Tools for Insurance</h2>
     <p className="text-blue-100 mb-8 text-lg">
      Browse our curated directory of AI tools transforming underwriting, claims, fraud detection, and
      customer engagement for insurance companies in Asia.
     </p>
     <div className="flex flex-wrap justify-center gap-4">
      <Link
       href="/categories/insurance"
       className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
      >
       Browse Insurance Tools <ArrowRight className="w-4 h-4" />
      </Link>
      <Link
       href="/blog/ai-insurance-asia-2026"
       className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
      >
       Read Our Guide <BookOpen className="w-4 h-4" />
      </Link>
     </div>
    </div>
   </section>

   {/* AI Tool Comparisons */}
   <section className="bg-gradient-to-br from-slate-50 to-blue-50 border-t border-blue-100">
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
     <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Tool Comparisons for Insurance</h2>
     <p className="text-gray-600 mb-8 max-w-2xl">
      Side-by-side comparisons of AI tools and platforms relevant to insurance professionals.
     </p>
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
       { slug: 'best-claims-automation-tools-compared', title: 'Best Claims Automation Platforms', excerpt: 'Snapsheet vs Shift Technology vs FRISS — AI claims processing tools benchmarked.' },
       { slug: 'best-fraud-detection-ai-compared', title: 'Best Fraud Detection AI Compared', excerpt: 'Featurespace vs SAS Fraud Management vs Kount — ML fraud detection for insurance.' },
       { slug: 'best-underwriting-ai-compared', title: 'Best Underwriting AI Compared', excerpt: 'Earnix vs BlueVector AI vs Zesty.ai — AI underwriting platforms for P&C and life.' },
      ].map((comp) => (
       <Link
        key={comp.slug}
        href={`/compare/${comp.slug}`}
        className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
       >
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
         {comp.title}
        </h3>
        <p className="text-sm text-gray-500">{comp.excerpt}</p>
       </Link>
      ))}
     </div>
     <div className="mt-6 text-center">
      <Link
       href="/compare"
       className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
       View all AI tool comparisons <ArrowRight className="w-4 h-4" />
      </Link>
     </div>
    </div>
   </section>

   {/* Related Content */}
   <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Industry Deep Dives</h2>
    <div className="grid sm:grid-cols-3 gap-6">
     <Link href="/industries/education-admin" className="group p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">EdTech & Education</h3>
      <p className="text-sm text-gray-600 mt-1">AI in learning, administration, and assessment</p>
     </Link>
     <Link href="/industries/hr" className="group p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">HR & Recruiting</h3>
      <p className="text-sm text-gray-600 mt-1">AI for talent acquisition, onboarding, and workforce analytics</p>
     </Link>
     <Link href="/industries/legal-compliance" className="group p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Legal & Compliance</h3>
      <p className="text-sm text-gray-600 mt-1">AI for contract review, compliance monitoring, and due diligence</p>
     </Link>
    </div>
   </section>

   {/* Blog Landing Links */}
   <BlogCategoryLinks />
  </main>
 );
}
