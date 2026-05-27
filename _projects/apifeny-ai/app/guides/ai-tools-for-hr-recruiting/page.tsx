import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Bot,
  MessageSquare,
  BarChart3,
  Mail,
  Globe,
  Shield,
  Smartphone,
  BookOpen,
  Lightbulb,
  Rocket,
  Star,
  ChevronRight,
  Search,
  FileText,
  LineChart,
  Share2,
  PenTool,
  Filter,
  Music,
  Image,
  GraduationCap,
  Pencil,
  Languages,
  Brain,
  ClipboardCheck,
  School,
  BookMarked,
  NotebookPen,
  Headphones,
  Video,
  Scale,
  Gavel,
  FileSearch,
  ShieldCheck,
  FileSignature,
  Landmark,
  Briefcase,
  BadgeCheck,
  ScrollText,
  Handshake,
  UserCheck,
  UserPlus,
  Calendar,
  Award,
  Building2,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQSchema from '@/components/FAQSchema';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'Best AI Tools for HR and Recruiting in 2026 — Complete Guide | Apifeny AI',
  description:
    'Compare the best AI tools for HR professionals, recruiters, and talent acquisition teams in 2026 — resume screening, interview scheduling, candidate matching, employee engagement, performance reviews, and people analytics. With Asia-Pacific HR market focus.',
  keywords: [
    'AI tools for HR',
    'best AI recruiting tools 2026',
    'AI for HR professionals',
    'AI resume screening',
    'AI recruiting software',
    'AI candidate matching',
    'AI interview tools',
    'AI employee engagement',
    'AI HR analytics',
    'AI talent acquisition',
    'AI performance management',
    'AI onboarding tools',
    'AI HR automation Asia',
    'AI recruitment Southeast Asia',
    'AI people analytics',
    'AI HR chatbots',
    'AI skills assessment',
    'AI talent matching',
    'AI HR compliance',
    'smart HR tools',
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/ai-tools-for-hr-recruiting`,
  },
  openGraph: {
    title: 'Best AI Tools for HR and Recruiting in 2026 — Complete Guide',
    description:
      'Practical guide to the best AI tools for HR professionals, recruiters, and talent acquisition teams — resume screening, interview scheduling, candidate matching, employee engagement, performance reviews, and people analytics. With Asia-Pacific HR market focus.',
    url: `${BASE_URL}/guides/ai-tools-for-hr-recruiting`,
    type: 'article',
    locale: 'en_US',
    siteName: 'Apifeny AI',
    images: [
      {
        url: `${BASE_URL}/og/ai-tools-for-hr-recruiting.jpg`,
        width: 1200,
        height: 630,
        alt: 'Best AI Tools for HR and Recruiting in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for HR and Recruiting in 2026 — Complete Guide',
    description:
      'Practical guide to the best AI tools for HR professionals, recruiters, and talent acquisition — resume screening, candidate matching, employee engagement, and people analytics.',
  },
};

// ─── Content sections ───
const sections = [
  {
    id: 'resume-screening',
    title: '1. AI Resume Screening & Candidate Matching',
    icon: FileSearch,
    color: 'bg-blue-50 dark:bg-blue-950/30',
    text: `Resume screening is the most time-consuming part of recruiting. AI resume screening tools can parse hundreds of resumes in minutes, match candidates to job requirements with precision scoring, and surface top candidates before a human recruiter even opens the first PDF. For HR teams in Asia-Pacific, where multi-language resumes (English + local language) are common, AI that handles bilingual parsing is especially valuable.

Key features to look for in AI resume screening tools:
• Automated resume parsing: extract skills, experience, education, and certifications from any format
• Semantic matching: go beyond keyword matching to understand context and transferable skills
• Bias detection: flag potentially biased language in job descriptions and screening criteria
• Ranked shortlisting: score candidates against job requirements with explainable AI
• Multi-language parsing: handle resumes in English, Chinese, Japanese, Korean, Thai, Vietnamese, and Bahasa
• Integration with ATS platforms (Workday, Lever, Greenhouse, BambooHR, SAP SuccessFactors)
• Skill gap analysis: identify missing qualifications and suggest upskilling paths
• Pipeline analytics: track source-to-hire metrics and identify top talent sources

For APAC recruitment teams handling high-volume hiring (manufacturing, retail, BPO, tech), AI resume screening reduces time-to-shortlist by 75% and improves quality-of-hire through more consistent evaluation criteria.`,
    tools: ['chatgpt', 'claude', 'perplexity'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Best for analysing long resumes with 200K token context' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Versatile resume parsing and candidate comparison' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Research candidate backgrounds and verify credentials' },
    ],
  },
  {
    id: 'job-descriptions',
    title: '2. AI Job Description Generation & Optimisation',
    icon: FileText,
    color: 'bg-purple-50 dark:bg-purple-950/30',
    text: `Writing effective job descriptions is both an art and a science. AI job description tools generate role-specific, inclusive, and SEO-optimised job posts in minutes — reducing time-to-post and improving candidate quality through better-matched language. For APAC companies hiring across multiple countries, AI that adapts job descriptions for local markets is critical.

AI job description capabilities:
• Role-specific generation: produce tailored descriptions for any role from basic inputs
• Inclusive language: flag and rewrite biased or exclusionary phrasing
• Market benchmarking: compare salary ranges and requirements against similar roles in your region
• SEO optimisation: write descriptions that rank in Google Jobs, LinkedIn, and Indeed
• Multi-language translation: generate localised versions for hiring across APAC markets
• Skills-based formatting: shift from credential-focused to skills-focused descriptions
• Compliance check: ensure descriptions meet local labour law requirements (Singapore MOM, Hong Kong Labour Dept, Thai Labour Protection Act)
• A/B testing: generate multiple versions to test which attracts better candidates

Companies using AI-generated job descriptions report 40% more qualified applicants and 25% faster time-to-fill, particularly for hard-to-fill technical and specialised roles in Asia's competitive talent markets.`,
    tools: ['chatgpt', 'claude', 'gemini'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Fast job description generation with SEO optimisation' },
      { name: 'Claude', slug: 'claude', note: 'Nuanced, inclusive language for sensitive roles' },
      { name: 'Gemini', slug: 'gemini', note: 'Free option with Google Workspace integration' },
    ],
  },
  {
    id: 'interview-scheduling',
    title: '3. AI Interview Scheduling & Coordination',
    icon: Calendar,
    color: 'bg-green-50 dark:bg-green-950/30',
    text: `Coordinating interviews across time zones, calendars, and hiring panels is a logistical nightmare — especially for APAC companies hiring across Singapore, Hong Kong, Tokyo, Sydney, and Bangalore simultaneously. AI scheduling tools automate the back-and-forth, find ideal time slots, and handle rescheduling with minimal human intervention.

What AI scheduling does for recruitment teams:
• Automated calendar coordination: check availability across all participants without manual emails
• Time zone intelligence: automatically convert and suggest slots across APAC time zones
• Panel coordination: find slots that work for all interviewers from different departments
• Self-service scheduling: send candidates a link to book their preferred slot from available options
• Automated reminders: reduce no-shows with SMS, email, and calendar invite reminders
• Rescheduling automation: handle cancellations and rebooking without recruiter intervention
• Interview type routing: schedule technical, behavioural, and cultural fit interviews in sequence
• Analytics: track time-to-interview, show rates, and scheduling bottlenecks

For fast-growing companies in Asia running high-volume hiring campaigns, AI scheduling tools eliminate 80% of the administrative coordination work, freeing recruiters to focus on candidate engagement and quality assessment.`,
    tools: ['chatgpt', 'perplexity', 'notion-ai'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Draft scheduling emails and coordinate logistics' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Research candidate time zones and local holidays' },
      { name: 'Notion AI', slug: 'notion-ai', note: 'Manage interview tracking and panel notes' },
    ],
  },
  {
    id: 'skills-assessment',
    title: '4. AI Skills Assessment & Pre-Employment Testing',
    icon: ClipboardCheck,
    color: 'bg-amber-50 dark:bg-amber-950/30',
    text: `Skills-based hiring is replacing credential-based hiring across Asia's most innovative companies. AI skills assessment tools generate custom tests, evaluate responses in real-time, and provide objective scoring — eliminating bias and improving the predictive validity of your hiring process.

AI skills assessment capabilities:
• Custom test generation: create role-specific assessments from job descriptions
• Coding challenges: auto-grade technical assessments with detailed feedback
• Situational judgment tests: AI-scored scenario-based evaluations
• Language proficiency: assess English fluency for regional roles
• Personality and cultural fit: AI-driven psychometric assessments
• Plagiarism detection: identify AI-generated or copy-pasted responses
• Proctoring features: verify candidate identity and monitor test integrity
• Benchmarking: compare candidate scores against industry and company baselines
• Skills gap analysis: identify development areas for shortlisted candidates

For tech companies and professional services firms in Asia's competitive talent market, AI skills assessments reduce bad hires by 50% and provide objective, defensible hiring data that also supports DEI initiatives.`,
    tools: ['chatgpt', 'claude', 'gemini'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Generate custom assessments and evaluate responses' },
      { name: 'Claude', slug: 'claude', note: 'Detailed skills analysis with nuanced feedback' },
      { name: 'Gemini', slug: 'gemini', note: 'Free skills assessment generation and evaluation' },
    ],
  },
  {
    id: 'employee-engagement',
    title: '5. AI for Employee Engagement & Retention',
    icon: Users,
    color: 'bg-cyan-50 dark:bg-cyan-950/30',
    text: `Employee engagement is a strategic priority across Asia, where talent retention is increasingly challenging in competitive markets like Singapore, Hong Kong, and Shanghai. AI engagement tools analyse employee sentiment from surveys, communications, and behaviour patterns — providing early warning of flight risk and personalised retention recommendations.

AI employee engagement capabilities:
• Sentiment analysis: analyse pulse survey responses, Slack messages, and email tone for engagement signals
• Flight risk prediction: identify employees likely to leave based on behavioural patterns and engagement scores
• Personalised retention: recommend custom retention strategies for at-risk employees
• Peer recognition: automate peer-to-peer recognition programs that reinforce company values
• Exit interview analysis: extract themes and patterns from exit interviews across the organisation
• Manager effectiveness: correlate team engagement scores with manager behaviours
• Well-being monitoring: track burnout signals through work patterns (after-hours emails, meeting load)
• Benchmarking: compare engagement scores against industry and regional averages

For HR leaders managing distributed teams across Asia, AI engagement tools reduce voluntary turnover by 20-30% through early intervention and data-driven retention strategies that address issues before they escalate.`,
    tools: ['chatgpt', 'claude', 'perplexity'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Deep sentiment analysis of employee communications' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Pulse survey analysis and engagement recommendations' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Research engagement best practices and benchmarks' },
    ],
  },
  {
    id: 'performance-management',
    title: '6. AI for Performance Reviews & Feedback',
    icon: Award,
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: `Performance reviews are notoriously time-consuming and often biased. AI performance management tools help HR teams design fairer review processes, generate actionable feedback, and track employee growth over time — moving from annual reviews to continuous performance conversations.

AI performance management capabilities:
• Review generation: draft balanced performance reviews from manager notes, peer feedback, and project data
• Bias reduction: flag potential bias in reviews based on gender, ethnicity, or tenure
• Goal tracking: auto-update OKR progress and link to performance assessments
• 360-degree feedback analysis: synthesise feedback from multiple sources into coherent assessment
• Skills progression: track skills development and recommend training programs
• Career pathing: suggest next roles and development plans based on performance data
• Calibration support: help managers compare assessments across teams for fairness
• Continuous feedback: nudge managers to provide regular, documented feedback throughout the year

Companies using AI in performance management report 35% faster review cycles, 50% reduction in bias complaints, and significantly higher employee satisfaction with the review process — particularly important in Asia's hierarchical work cultures where honest upward feedback can be challenging.`,
    tools: ['claude', 'chatgpt', 'notion-ai'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Generate nuanced, balanced performance reviews' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Fast review drafting and feedback collection' },
      { name: 'Notion AI', slug: 'notion-ai', note: 'Templated review forms and team wikis' },
    ],
  },
  {
    id: 'onboarding',
    title: '7. AI Onboarding & Employee Experience',
    icon: UserPlus,
    color: 'bg-rose-50 dark:bg-rose-950/30',
    text: `First impressions matter. AI-powered onboarding transforms the new hire experience from paperwork-heavy to personalised and engaging. For APAC companies onboarding across multiple locations and languages, AI localises content, automates compliance paperwork, and ensures every new hire feels supported from day one.

AI onboarding features:
• Personalised onboarding plans: generate custom 30-60-90 day plans based on role, level, and location
• Document automation: pre-fill employment contracts, tax forms, and benefits enrolment with employee data
• Multi-language onboarding: deliver training and documentation in local languages across APAC
• Buddy matching: AI-pair new hires with the best mentors based on personality and role alignment
• Learning path generation: recommend courses and training materials based on role requirements
• Progress tracking: monitor onboarding completion and flag at-risk new hires
• Feedback collection: automate check-in surveys at 30, 60, and 90 days
• Knowledge base: AI chatbot answers new hire questions about policies, benefits, and procedures

Research across APAC markets shows that structured AI-assisted onboarding improves new hire retention by 30% at the 6-month mark and reduces time-to-productivity by 40% — a significant ROI for companies with high-volume hiring in manufacturing, retail, or BPO sectors.`,
    tools: ['chatgpt', 'claude', 'notion-ai'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Generate onboarding plans and documentation' },
      { name: 'Claude', slug: 'claude', note: 'Create comprehensive onboarding playbooks' },
      { name: 'Notion AI', slug: 'notion-ai', note: 'Knowledge base and onboarding wikis' },
    ],
  },
  {
    id: 'people-analytics',
    title: '8. AI People Analytics & Workforce Planning',
    icon: BarChart3,
    color: 'bg-orange-50 dark:bg-orange-950/30',
    text: `Data-driven HR is the future, and AI people analytics tools make it accessible to companies of all sizes. From workforce planning and headcount modelling to attrition prediction and diversity tracking, AI turns HR data into strategic business insights. For APAC companies navigating tight labour markets and rapid growth, people analytics provides the edge in talent strategy.

AI people analytics capabilities:
• Workforce modelling: predict future headcount needs based on business growth scenarios
• Attrition forecasting: identify departments, roles, and locations with highest turnover risk
• DEI analytics: track diversity metrics across hiring, promotion, and retention by demographic
• Compensation benchmarking: compare salary bands against market data by role and location
• Skills inventory: map current workforce skills against future business needs
• Succession planning: identify next-generation leaders based on performance and potential data
• Productivity analysis: correlate HR data with business outcomes (revenue per employee, project delivery)
• Real-time dashboards: visualise key HR metrics with drill-down by team, location, and demographic

For CHROs and HR directors in Asia's competitive markets, AI people analytics transforms HR from a support function to a strategic partner — providing the data to justify hiring budgets, optimise organisational structure, and demonstrate HR's impact on business results.`,
    tools: ['claude', 'chatgpt', 'perplexity'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Comprehensive workforce analytics and reporting' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Data analysis and insight generation from HR data' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Market benchmarking and salary research' },
    ],
  },
];

const toolSlugs = ['chatgpt', 'claude', 'perplexity', 'gemini', 'notion-ai'];


const guideFaqs = [
  {
    "question": "What is the best AI recruiting tool for Asian companies?",
    "answer": "AI recruitment platforms like LinkedIn Recruiter AI and SmartRecruiters help source candidates across Asian markets. For small businesses, ChatGPT can screen resumes and generate interview questions. In Southeast Asia, Kakitangan.com (Malaysia) handles HR compliance with EPF/SOCSO/PCB auto-calculation."
  },
  {
    "question": "Can AI reduce bias in hiring?",
    "answer": "AI can reduce certain biases by focusing on skills and experience rather than demographic factors. However, AI trained on historical hiring data may perpetuate existing biases. The best approach is to use AI as a screening assistant while maintaining human oversight for final hiring decisions."
  }
];

export default function AIToolsForHRRecruitingGuide() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Guides', item: '/guides' },
          { name: 'AI Tools for HR & Recruiting', item: '/guides/ai-tools-for-hr-recruiting' },
        ]}
        baseUrl={BASE_URL}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-purple-900 to-indigo-950 dark:from-slate-950 dark:via-purple-950 dark:to-indigo-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-200 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6">
            <UserCheck className="w-3.5 h-3.5" />
            Guide · 16 min read
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Best AI Tools for HR and Recruiting in 2026
          </h1>
          <p className="text-lg sm:text-xl text-purple-100/90 max-w-2xl mb-8">
            The complete guide to AI-powered HR and recruiting tools — resume screening, job descriptions, interview scheduling, skills assessment, employee engagement, performance management, onboarding, and people analytics. Vetted for HR professionals, recruiters, and talent acquisition teams across Asia-Pacific.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-purple-200/80">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Updated May 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              HR &amp; Recruiting Professionals
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              Asia-Pacific Focus
            </span>
          </div>
        </div>
      </section>

      {/* ─── Table of Contents ─── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            What's in this guide
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm text-gray-600 dark:text-gray-400"
              >
                <s.icon className="w-4 h-4 text-purple-500 shrink-0" />
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Comparison Table ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-purple-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Quick Comparison: Best AI HR & Recruiting Tools</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Tool</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Best For</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Starting Price</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Free Trial</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { name: 'Claude', best: 'Resume analysis & employee sentiment', price: '$20/mo (Pro)', trial: 'Free tier', rating: '4.6/5' },
                  { name: 'ChatGPT', best: 'All-round HR content & candidate comms', price: '$20/mo (Plus)', trial: 'Free tier', rating: '4.7/5' },
                  { name: 'Perplexity', best: 'Candidate research & market benchmarking', price: '$20/mo (Pro)', trial: 'Free tier', rating: '4.5/5' },
                  { name: 'Gemini', best: 'Free assessment generation & onboarding docs', price: 'Free', trial: 'Always free', rating: '4.5/5' },
                  { name: 'Notion AI', best: 'HR wikis, onboarding docs & knowledge base', price: '$10/mo (Plus)', trial: 'Free trial', rating: '4.4/5' },
                ].map((tool, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{tool.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{tool.best}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{tool.price}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/50 rounded-full px-2.5 py-1">
                        <CheckCircle className="w-3 h-3" />
                        {tool.trial}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{tool.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Recommendation Table ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-800 to-slate-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Which Tool for Which HR Use Case?
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Use Case</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Recommended Tool</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  { use: 'Bulk resume screening (50+ resumes)', tool: 'Claude', why: '200K token context processes batches of resumes at once' },
                  { use: 'Job description writing & optimisation', tool: 'ChatGPT', why: 'Fast, SEO-optimised JD generation with market awareness' },
                  { use: 'Candidate market research', tool: 'Perplexity', why: 'Verified salary data and talent market trends' },
                  { use: 'Free HR document creation', tool: 'Gemini', why: 'Best free option for onboarding docs and policies' },
                  { use: 'HR knowledge base & wikis', tool: 'Notion AI', why: 'Templated HR playbooks and team collaboration' },
                  { use: 'Employee sentiment analysis', tool: 'Claude', why: 'Nuanced analysis of survey and communication data' },
                  { use: 'Performance review drafting', tool: 'Claude', why: 'Balanced, bias-aware review generation' },
                  { use: 'Onboarding program design', tool: 'ChatGPT', why: 'Comprehensive 30-60-90 day plan generation' },
                ].map((rec, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{rec.use}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 rounded-full px-2.5 py-1">
                        <CheckCircle className="w-3 h-3" />
                        {rec.tool}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{rec.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Content Sections ─── */}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className={`scroll-mt-24 ${section.color}`}>
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800">
                <section.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{section.text}</p>

            {/* Affiliate CTAs */}
            {section.affiliateSuggestions && section.affiliateSuggestions.length > 0 && (
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Recommended tools</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.affiliateSuggestions.map((rec, i) => {
                    const tool = toolsData.find((t: any) => t.slug === rec.slug);
                    return (
                      <a
                        key={i}
                        href={(tool as any)?.affiliateUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {(tool as any)?.name?.charAt(0) || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {rec.name} <ArrowRight className="w-3 h-3 inline" />
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{rec.note}</p>
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
                <p className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Detailed reviews</p>
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

      {/* ─── Bottom CTA ─── */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-950 dark:from-gray-950 dark:to-black">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Transform Your HR Function with AI?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Start with the AI tool that matches your HR focus area. Claude for deep candidate analysis and employee sentiment, ChatGPT for HR content and communications, or Perplexity for talent market research.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={(() => {
                const claude = toolsData.find((t: any) => t.slug === 'claude');
                return (claude as any)?.affiliateUrl || '#';
              })()}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-medium rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg shadow-purple-700/20"
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
