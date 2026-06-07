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
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import FAQSchema from '@/components/FAQSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Best AI Tools for Education in 2026 — Complete Guide | Apifeny AI',
 description:
 'Compare the best AI tools for education in 2026 — tutoring, lesson planning, writing assistance, study tools, language learning, grading, and classroom management. Vetted for students, teachers, and educators in Asia.',
 keywords: [
 'AI tools for education',
 'best AI education tools',
 'AI tutoring tools',
 'AI for teachers',
 'AI for students',
 'AI lesson planning tools',
 'AI study tools',
 'AI language learning apps',
 'AI grading software',
 'AI classroom management',
 'best AI tools for students 2026',
 'AI writing assistants for students',
 'AI flashcard apps',
 'AI course creation tools',
 'education AI tools Asia',
 'AI personalized learning',
 'AI assessment tools',
 'AI for educators',
 'free AI tools for education',
 'AI learning platforms',
 ],
 alternates: {
 canonical: `${BASE_URL}/guides/ai-tools-for-education`,
 },
 openGraph: {
 title: 'Best AI Tools for Education in 2026 — Complete Guide',
 description:
 'Practical guide to the best AI tools for education — tutoring, lesson planning, writing assistance, study tools, language learning, grading, and classroom management. Vetted for students and educators in Asia.',
 url: `${BASE_URL}/guides/ai-tools-for-education`,
 type: 'article',
 locale: 'en_US',
 siteName: 'Apifeny AI',
 images: [
 {
 url: `${BASE_URL}/og/ai-tools-for-education.jpg`,
 width: 1200,
 height: 630,
 alt: 'Best AI Tools for Education in 2026',
 },
 ],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools for Education in 2026 — Complete Guide',
 description:
 'Practical guide to the best AI tools for education — tutoring, lesson planning, writing, study tools, language learning, grading, and classroom management.',
 },
};

// ─── Content sections ───
const sections = [
 {
 id: 'ai-tutoring',
 title: '1. AI Tutoring & Personalized Learning',
 icon: Brain,
 color: 'bg-blue-50 ',
 text: `AI tutoring has evolved far beyond simple Q&A bots. Modern AI tutors adapt to each student's learning pace, identify knowledge gaps, and provide personalized explanations in real-time. For Asian education markets with high academic pressure, AI tutoring offers affordable one-on-one support that was previously only available through expensive private tuition.

Key features to look for in AI tutoring tools:
• Adaptive learning paths that adjust difficulty based on student performance
• Step-by-step problem-solving guidance (not just answers)
• Multi-subject support: math, science, humanities, languages
• Support for Asian curricula (IB, A-Levels, CBSE, Chinese Gaokao prep)
• Progress tracking with detailed analytics for parents and teachers
• Conversational interface that can explain concepts in multiple ways
• Integration with school LMS platforms
• Offline or low-bandwidth modes for areas with limited connectivity

The best AI tutors don't replace teachers — they augment them by handling repetitive questions, providing instant feedback, and allowing teachers to focus on higher-value interactions.`,
 tools: ['chatgpt', 'perplexity', 'gemini'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Best general AI tutor for any subject' },
 { name: 'Perplexity', slug: 'perplexity', note: 'Research assistant with cited sources for students' },
 { name: 'Gemini', slug: 'gemini', note: 'Free multimodal tutor with Google ecosystem' },
 ],
 },
 {
 id: 'course-creation',
 title: '2. AI for Course Creation & Lesson Planning',
 icon: BookMarked,
 color: 'bg-green-50 ',
 text: `Teachers spend an average of 7–12 hours per week on lesson planning. AI lesson planning tools slash that to under an hour by generating complete lesson plans, worksheets, slide decks, and assessments from a simple prompt.

Key AI lesson planning features:
• Curriculum-aligned lesson plan generation (K-12, university, vocational)
• Differentiated instruction: auto-generate versions for different learning levels
• Worksheet, quiz, and activity creation from lesson objectives
• Slide deck generation with visuals and talking points
• Standards alignment (national curricula, IB, Cambridge, local Asian standards)
• Multi-language lesson generation for bilingual classrooms
• Integration with Google Classroom, Canvas, Moodle
• Resource recommendations: videos, readings, interactive exercises

For Asian educators managing large class sizes, AI lesson planning is transformative — it turns hours of prep into minutes and lets teachers focus on classroom delivery.`,
 tools: ['chatgpt', 'perplexity', 'gemini'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Generate complete lesson plans from prompts' },
 { name: 'Perplexity', slug: 'perplexity', note: 'Research curriculum materials and resources' },
 { name: 'Gemini', slug: 'gemini', note: 'Free slide and worksheet generation' },
 ],
 },
 {
 id: 'writing-assistants',
 title: '3. AI Writing Assistants for Students & Researchers',
 icon: Pencil,
 color: 'bg-purple-50 ',
 text: `Academic writing is one of the most challenging skills for students to master. AI writing assistants now go beyond basic grammar checks to help with research paper structure, citation formatting, paraphrasing, and academic style — while maintaining academic integrity.

What AI writing assistants do for students and researchers:
• Grammar, spelling, and punctuation correction with contextual awareness
• Academic tone and style adjustment (formal, concise, persuasive)
• Paraphrasing and summarization without plagiarism
• Citation generation (APA, MLA, Chicago, IEEE, Harvard)
• Reference management and bibliography creation
• Plagiarism detection and originality checks
• Structure suggestions: introductions, thesis statements, conclusions
• AI-assisted literature review and source summarization
• Translation between English and Asian languages for bilingual research
• Journal-specific formatting for academic submissions

The key distinction: AI writing assistants should enhance student writing, not replace it. Used properly, they teach better writing habits by explaining why changes are made.`,
 tools: ['grammarly', 'chatgpt', 'deepl'],
 affiliateSuggestions: [
 { name: 'Grammarly', slug: 'grammarly', note: 'Best AI writing assistant for academic English' },
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Research paper drafting and structure help' },
 { name: 'DeepL', slug: 'deepl', note: 'Accurate translation for bilingual research' },
 ],
 },
 {
 id: 'study-tools',
 title: '4. AI Study Tools & Flashcards',
 icon: NotebookPen,
 color: 'bg-amber-50 ',
 text: `Active recall and spaced repetition are the most effective learning techniques — and AI makes them dramatically more powerful. Modern AI study tools can convert lecture notes into flashcards, generate practice questions, and schedule reviews at optimal intervals for long-term retention.

AI study tool capabilities:
• Auto-generate flashcards from notes, PDFs, or lecture recordings
• Spaced repetition algorithms optimized by AI for individual memory patterns
• Practice question generation with varying difficulty levels
• Concept mapping: visualize relationships between topics
• Progress analytics: identify weak areas and suggest targeted review
• Collaborative study features for group learning
• Integration with popular note-taking apps (Notion, OneNote, Google Docs)
• Exam preparation with past paper analysis and question prediction
• Mobile-first design for studying on-the-go

For students preparing for high-stakes exams in Asia (college entrance exams, professional certifications), AI study tools provide structured, efficient review that adapts to exactly what each student needs to practice most.`,
 tools: ['chatgpt', 'perplexity'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Create flashcards and practice questions from notes' },
 { name: 'Perplexity', slug: 'perplexity', note: 'Research and fact-check study materials' },
 ],
 },
 {
 id: 'language-learning',
 title: '5. AI for Language Learning',
 icon: Languages,
 color: 'bg-indigo-50 ',
 text: `Language learning has been revolutionized by AI — tools now offer real-time conversation practice, pronunciation feedback, and personalized vocabulary training that adapts to your progress. For learners in Asia picking up English (or vice versa), AI language tools provide immersive practice at a fraction of the cost of human tutors.

AI language learning features that matter:
• Real-time conversation simulation with AI that adapts to your level
• Pronunciation analysis with phoneme-level feedback
• Grammar correction in context during natural conversation
• Vocabulary tracking with spaced repetition review
• Cultural context explanations for idioms and expressions
• Multi-language support: English, Chinese, Japanese, Korean, Thai, Vietnamese
• Reading and listening comprehension exercises from real-world content
• Writing practice with AI-generated prompts and feedback
• Exam preparation for TOEFL, IELTS, HSK, JLPT, TOPIK
• Offline mode for learning without internet

Tools like Duolingo Max, ELSA Speak, and Speak are leading the pack with conversational AI that actually sounds natural and provides meaningful feedback.`,
 tools: ['chatgpt', 'gemini', 'deepl'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Real-time conversation practice in 50+ languages' },
 { name: 'Gemini', slug: 'gemini', note: 'Free language learning with Google ecosystem' },
 { name: 'DeepL', slug: 'deepl', note: 'Accurate translations for language study' },
 ],
 },
 {
 id: 'grading-assessment',
 title: '6. AI Grading & Assessment Tools',
 icon: ClipboardCheck,
 color: 'bg-rose-50 ',
 text: `Grading is one of the most time-consuming tasks for educators — especially in Asia where class sizes of 40-50 students are common. AI grading tools now handle multiple-choice, short-answer, and even essay-style assessments with high accuracy, freeing teachers to focus on feedback and instruction.

AI grading capabilities:
• Automated multiple-choice and fill-in-the-blank grading
• Short-answer grading with rubric-based evaluation
• Essay scoring: evaluate structure, argumentation, grammar, and citations
• Handwriting recognition for scanned answer sheets
• Plagiarism detection integrated into the grading workflow
• Detailed feedback generation per student (not just a score)
• Grade analytics: class-wide performance trends and weak areas
• Rubric customization for different assignments and subjects
• Integration with LMS platforms for seamless gradebook updates
• Parent report generation with progress summaries

For Asian schools managing large cohorts, AI grading can reduce assessment turnaround time from weeks to hours — while providing more detailed feedback than manual grading alone.`,
 tools: ['chatgpt', 'grammarly', 'perplexity'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Generate rubrics and evaluate written responses' },
 { name: 'Grammarly', slug: 'grammarly', note: 'Essay and writing assessment with detailed feedback' },
 { name: 'Perplexity', slug: 'perplexity', note: 'Research and fact-check student answers' },
 ],
 },
 {
 id: 'classroom-management',
 title: '7. AI Classroom Management',
 icon: School,
 color: 'bg-cyan-50 ',
 text: `Classroom management extends beyond discipline — it's about engagement tracking, attendance automation, parent communication, and personalized student support. AI-powered classroom management platforms give teachers a dashboard view of classroom dynamics with actionable insights.

AI classroom management features:
• Automated attendance tracking via facial recognition or device check-ins
• Engagement monitoring: identify distracted or disengaged students in real-time
• Behavioral pattern analysis: flag positive and concerning trends
• Parent communication automation with AI-drafted progress updates
• Personalized learning pathway recommendations per student
• Class-wide participation analytics for group activities
• Timetable and schedule optimization
• Student wellness check-ins with sentiment analysis
• Behavior gamification: reward systems for positive engagement (Classcraft-style)
• Multi-language parent communication for diverse communities

For teachers managing large classrooms in Asia, AI classroom management tools reduce administrative overhead by 30-50%, giving back hours each week for actual teaching.`,
 tools: ['chatgpt', 'gemini'],
 affiliateSuggestions: [
 { name: 'ChatGPT', slug: 'chatgpt', note: 'Generate parent updates and classroom communications' },
 { name: 'Gemini', slug: 'gemini', note: 'Free scheduling and administration assistance' },
 ],
 },
];

const toolSlugs = ['chatgpt', 'gemini', 'perplexity', 'grammarly', 'deepl'];


const guideFaqs = [
 {
 "question": "What is the best AI tool for teachers in 2026?",
 "answer": "Khanmigo (Khan Academy's AI tutor) is the best AI tool specifically designed for education \u2014 it uses Socratic questioning to guide students rather than giving answers. ChatGPT is the most versatile for lesson planning, worksheet creation, and student feedback. Canva for Education offers free AI design tools for teachers."
 },
 {
 "question": "Can AI replace teachers?",
 "answer": "No \u2014 AI enhances teaching by automating administrative tasks, personalizing learning materials, and providing 24/7 tutoring support, but it cannot replace the human elements of teaching: emotional connection, mentorship, classroom management, and adapting to individual student needs in real-time."
 },
 {
 "question": "Which AI tools are best for Asian education systems?",
 "answer": "ChatGPT handles Chinese, Japanese, and Korean curricula effectively. Gemini has strong Asian language support for creating bilingual materials. For specific education systems, Khanmigo supports Singapore Math and IB curricula. Duolingo Max is excellent for English language learning in Asian markets."
 },
 {
 "question": "Are AI education tools free for teachers?",
 "answer": "Many AI tools offer free tiers for educators. Khanmigo costs $44/year (teachers should check school/district licensing). ChatGPT Free is sufficient for lesson planning. Canva for Education is completely free for verified teachers. Duolingo offers free classroom accounts through Duolingo for Schools."
 }
];

export default function AIToolsForEducationGuide() {
 return (
 <main className="min-h-screen bg-white ">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Guides', item: '/guides' },
 { name: 'AI Tools for Education', item: '/guides/ai-tools-for-education' },
 ]}
 baseUrl={BASE_URL}
 />

 {/* ─── Hero ─── */}
 <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 ">
 <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
 <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28">
 <BreadcrumbNav
          className="mb-8"
          items={[
            { label: 'Guides', href: '/guides' },
            { label: 'AI Tools for Education' },
          ]}
        />
 <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-200 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Guide · 12 min read
 </span>
 <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
 Best AI Tools for Education in 2026
 </h1>
 <p className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl mb-8">
 The complete guide to AI-powered education tools — tutoring, lesson planning, writing assistance, study tools, language learning, grading, and classroom management. Vetted for students, teachers, and educators, with a focus on Asian markets.
 </p>
 <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-200/80">
 <span className="flex items-center gap-1.5">
 <Clock className="w-4 h-4" />
 Updated May 2026
 </span>
 <span className="flex items-center gap-1.5">
 <GraduationCap className="w-4 h-4" />
 Students &amp; Educators
 </span>
 <span className="flex items-center gap-1.5">
 <Globe className="w-4 h-4" />
 Asia-Focused
 </span>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─── */}
 <section className="max-w-5xl mx-auto px-4 py-12">
 <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8">
 <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
 <BookOpen className="w-5 h-5 text-teal-600 " />
 What's in this guide
 </h2>
 <div className="grid sm:grid-cols-2 gap-3">
 {sections.map((s) => (
 <a
 key={s.id}
 href={`#${s.id}`}
 className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600 "
 >
 <s.icon className="w-4 h-4 text-teal-500 shrink-0" />
 {s.title}
 </a>
 ))}
 </div>
 </div>
 </section>

 {/* ─── Quick Comparison Table ─── */}
 <section className="max-w-5xl mx-auto px-4 pb-8">
 <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
 <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-4">
 <h2 className="text-lg font-semibold text-gray-900">Quick Comparison: Best AI Education Tools</h2>
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
 { name: 'ChatGPT', best: 'All-round AI tutor & assistant', price: '$20/mo (Plus)', trial: 'Free tier', rating: '4.7/5' },
 { name: 'Gemini', best: 'Free multimodal learning', price: 'Free', trial: 'Always free', rating: '4.5/5' },
 { name: 'Grammarly', best: 'Academic writing improvement', price: '$12/mo (Premium)', trial: 'Free tier', rating: '4.6/5' },
 { name: 'Perplexity', best: 'Research & cited answers', price: '$20/mo (Pro)', trial: 'Free tier', rating: '4.5/5' },
 { name: 'DeepL', best: 'Translation for bilingual learning', price: '$8.99/mo', trial: 'Free tier', rating: '4.6/5' },
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

 {/* ─── Recommendation Table ─── */}
 <section className="max-w-5xl mx-auto px-4 pb-16">
 <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
 <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4">
 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
 <Target className="w-5 h-5" />
 Which Tool for Which Education Use Case?
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
 { use: 'Personalized tutoring (any subject)', tool: 'ChatGPT', why: 'Best all-round AI tutor with step-by-step explanations' },
 { use: 'Free student research & fact-checking', tool: 'Perplexity', why: 'Cited answers from real sources students can verify' },
 { use: 'Free multimodal learning (images, video, text)', tool: 'Gemini', why: 'Best free option with Google ecosystem integration' },
 { use: 'Academic essay writing & grammar', tool: 'Grammarly', why: 'Industry-standard for academic writing quality' },
 { use: 'Bilingual learning & translation', tool: 'DeepL', why: 'Most accurate translations for Asian languages' },
 { use: 'Lesson plan generation for teachers', tool: 'ChatGPT', why: 'Generate complete plans, worksheets, and slides from prompts' },
 { use: 'Language conversation practice', tool: 'ChatGPT', why: 'Voice mode for real-time conversation in 50+ languages' },
 { use: 'Exam preparation & practice questions', tool: 'ChatGPT', why: 'Generate practice tests and explain answers in detail' },
 ].map((rec, i) => (
 <tr key={i} className="hover:bg-gray-50 transition-colors">
 <td className="px-6 py-4 font-medium text-gray-900 ">{rec.use}</td>
 <td className="px-6 py-4">
 <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1">
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

 {/* ─── Content Sections ─── */}
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
 className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all group"
 >
 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-gray-900 font-bold text-xs shrink-0">
 {(tool as any)?.name?.charAt(0) || '?'}
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
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

 {/* ─── Bottom CTA ─── */}
 <section className="bg-gradient-to-br from-gray-900 to-gray-950 ">
 <div className="max-w-3xl mx-auto px-4 py-20 text-center">
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
 Ready to Transform Your Learning or Teaching with AI?
 </h2>
 <p className="text-gray-400 mb-8 max-w-xl mx-auto">
 Start with ChatGPT or Gemini — the two most versatile AI tools for education — and add specialized tools for writing, translation, and research as you go.
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <a
 href={(() => {
 const chatgpt = toolsData.find((t: any) => t.slug === 'chatgpt');
 return (chatgpt as any)?.affiliateUrl || '#';
 })()}
 target="_blank"
 rel="noopener noreferrer sponsored"
 className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium rounded-xl hover:from-emerald-500 hover:to-cyan-500 transition-all shadow-lg shadow-emerald-600/20"
 >
 <Sparkles className="w-4 h-4" />
 Try ChatGPT Free
 <ArrowRight className="w-4 h-4" />
 </a>
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
 >
 <BookOpen className="w-4 h-4" />
 Browse More Guides
 </Link>
 </div>
 </div>
 </section>
 {/* ─── FAQ Schema ─── */}
 <FAQSchema faqs={guideFaqs} />
 </main>
 );
}
