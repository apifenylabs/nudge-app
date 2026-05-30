import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, BookOpen, Lightbulb, AlertTriangle, Sparkles, CheckCircle, Target, Zap, TrendingUp, DollarSign, Star, BarChart3 } from 'lucide-react';
import { playbooks, type Playbook } from '@/lib/playbooks';
import { cn, getPipelineStageBadge } from '@/lib/utils';
import BlogPlaybookLinks from '../../components/BlogPlaybookLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQJsonLd from '@/components/FAQJsonLd';

const EXCLUDED_SLUGS = new Set([
  'ai-content-creation-busy-founders', 'ai-for-customer-support', 'ai-for-data-analysis',
  'ai-for-ecommerce', 'ai-for-hr-and-recruiting', 'ai-for-marketing-automation',
  'ai-for-personal-finance', 'ai-for-social-media-management', 'ai-marketing-for-asia',
  'ai-personal-assistant-setup', 'ai-sales-funnel-builder', 'ai-solopreneur-toolkit',
  'ai-workflow-automation', 'directory-builder',
]);

export function generateStaticParams() {
  return playbooks.filter((p) => !EXCLUDED_SLUGS.has(p.slug)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pb = playbooks.find((p) => p.slug === slug);
  if (!pb) return { title: 'Playbook Not Found' };
  return {
    title: pb.meta_title || `${pb.title} — Step-by-Step AI Guide | Apifeny AI`,
    description: pb.meta_description || pb.description,
    openGraph: { title: pb.meta_title || `${pb.title} — Apifeny AI`, description: pb.meta_description || pb.description, url: `https://apifeny-ai.vercel.app/playbooks/${slug}`, type: 'article' as const },
  };
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  Advanced: 'bg-rose-100 text-rose-700 border-rose-200',
};

function formatToolSlug(slug: string): string {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getRelated(current: Playbook): Playbook[] {
  return playbooks.filter((p) => p.slug !== current.slug).filter(
    (p) => p.pipeline_stage === current.pipeline_stage || p.related_tool_slugs.some((t) => current.related_tool_slugs.includes(t))
  ).slice(0, 6);
}

interface FAQ { question: string; answer: string; }

function buildPlaybookFAQs(pb: Playbook): FAQ[] {
  const faqs: FAQ[] = [];

  // Q: Time & difficulty
  faqs.push({
    question: `How long does it take to implement \u201C${pb.title}\u201D?`,
    answer: `The guide takes about ${pb.read_time_minutes} minutes to read and is rated as ${pb.difficulty.toLowerCase()} difficulty. It covers ${pb.steps.length} step${pb.steps.length === 1 ? '' : 's'} with practical instructions you can follow at your own pace.`,
  });

  // Q: Common mistakes
  if (pb.common_mistakes && pb.common_mistakes.length > 0) {
    const mistakesText = pb.common_mistakes.slice(0, 3).map((m) => `\u274C ${m.mistake} \u2014 ${m.fix}`).join('. ');
    faqs.push({
      question: `What common mistakes should I avoid with ${pb.title}?`,
      answer: `Common mistakes include: ${mistakesText}. Avoiding these pitfalls will save time and improve your results.`,
    });
  }

  // Q: Revenue impact
  if (pb.revenue_impact) {
    faqs.push({
      question: `What is the revenue impact of using ${pb.title}?`,
      answer: pb.revenue_impact,
    });
  }

  // Q: Real results
  if (pb.real_results && pb.real_results.length > 0) {
    const resultsText = pb.real_results.map((r) => `${r.metric}: ${r.value} (${r.description})`).join('; ');
    faqs.push({
      question: `What real results can I expect from ${pb.title}?`,
      answer: `Users typically see: ${resultsText}. Actual results vary based on implementation and use case.`,
    });
  }

  // Q: Best tools
  if (pb.related_tool_slugs.length > 0) {
    const toolsList = pb.related_tool_slugs.map((t) => t.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ');
    faqs.push({
      question: `Which AI tools are used in the ${pb.title} playbook?`,
      answer: `This playbook covers ${toolsList}${pb.related_tool_slugs.length === 1 ? '' : '.'} Step-by-step instructions guide you through using each tool effectively for this workflow.`,
    });
  }

  // Q: Pro tips (if we have space for a 6th)
  if (pb.pro_tips.length > 0 && faqs.length < 6) {
    const tipsText = pb.pro_tips.slice(0, 2).join(' ');
    faqs.push({
      question: `What are the best pro tips for ${pb.title}?`,
      answer: `Key pro tips: ${tipsText}`,
    });
  }

  return faqs;
}

export default async function PlaybookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playbook = playbooks.find((p) => p.slug === slug);
  if (!playbook) notFound();

  const stageBadge = playbook.pipeline_stage ? getPipelineStageBadge(playbook.pipeline_stage) : null;
  const related = getRelated(playbook);

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Playbooks', item: '/playbooks' },
          { name: playbook.title, item: `/playbooks/${playbook.slug}` },
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 transition mb-6 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Playbooks
        </Link>

        <section className="relative mb-10">
          <div className={cn('relative rounded-2xl overflow-hidden border border-gray-200 p-6 sm:p-10 shadow-sm', playbook.gradient ? `bg-gradient-to-br ${playbook.gradient}` : 'bg-gradient-to-br from-violet-50 via-white to-cyan-50')}>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-3xl sm:text-4xl">{playbook.icon}</span>
                {stageBadge && <span className={cn('inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border', stageBadge.color)}><span>{stageBadge.icon}</span><span>{stageBadge.label}</span></span>}
                <span className={cn('inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border', difficultyColors[playbook.difficulty] || 'bg-gray-100 text-gray-600 border-gray-200')}>{playbook.difficulty}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{playbook.title}</h1>
              {playbook.subtitle && <p className="text-lg sm:text-xl text-gray-600 mb-4">{playbook.subtitle}</p>}
              <p className="text-sm sm:text-base text-gray-500 max-w-3xl mb-6">{playbook.description}</p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-xs text-gray-500"><Clock className="w-4 h-4 text-violet-500" /><span className="font-medium text-gray-900">{playbook.read_time_minutes} min</span><span className="text-gray-400">read</span></div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><BookOpen className="w-4 h-4 text-violet-500" /><span className="font-medium text-gray-900">{playbook.steps.length}</span><span className="text-gray-400">{playbook.steps.length === 1 ? 'step' : 'steps'}</span></div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><Sparkles className="w-4 h-4 text-amber-500" /><span className="font-medium text-gray-900">{playbook.related_tool_slugs.length}</span><span className="text-gray-400">{playbook.related_tool_slugs.length === 1 ? 'tool' : 'tools'}</span></div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {playbook.related_tool_slugs.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-violet-500" />AI Tools Used</h2>
                <div className="flex flex-wrap gap-2">
                  {playbook.related_tool_slugs.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">{formatToolSlug(t)}</span>
                  ))}
                </div>
              </section>
            )}

            {playbook.steps.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" />Step-by-Step Guide</h2>
                <div className="space-y-4">
                  {playbook.steps.map((step, idx) => (
                    <div key={idx} className="relative pl-12 pb-4 border-l-2 border-gray-200 last:border-l-2 last:border-transparent">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-700">{idx + 1}</span>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{step.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                        {step.tip && (
                          <div className="mt-3 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                            <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" /><span>{step.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {playbook.pro_tips.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-cyan-600" />Pro Tips</h2>
                <div className="space-y-2">
                  {playbook.pro_tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-3">
                      <Star className="w-4 h-4 text-cyan-600 mt-0.5 shrink-0" /><p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {playbook.common_mistakes && playbook.common_mistakes.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" />Common Mistakes to Avoid</h2>
                <div className="space-y-3">
                  {playbook.common_mistakes.map((cm, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-red-700 mb-1.5">\u274C {cm.mistake}</p>
                      <p className="text-sm text-gray-600">\u2705 {cm.fix}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {playbook.real_results && playbook.real_results.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-emerald-500" />Real Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {playbook.real_results.map((r, idx) => (
                    <div key={idx} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                      <p className="text-xl font-bold text-emerald-600">{r.value}</p>
                      <p className="text-xs text-gray-700 font-medium mb-1">{r.metric}</p>
                      <p className="text-[11px] text-gray-500">{r.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {playbook.revenue_impact && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2"><DollarSign className="w-5 h-5 text-amber-500" />Revenue Impact</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">{playbook.revenue_impact}</p>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Difficulty</span><span className="text-gray-900 font-medium">{playbook.difficulty}</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Read Time</span><span className="text-gray-900 font-medium">{playbook.read_time_minutes} min</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Steps</span><span className="text-gray-900 font-medium">{playbook.steps.length}</span></div>
                {playbook.pipeline_stage && <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Stage</span><span className="text-gray-900 font-medium capitalize">{playbook.pipeline_stage.replace(/-/g, ' ')}</span></div>}
                <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Tools</span><span className="text-gray-900 font-medium">{playbook.related_tool_slugs.length}</span></div>
              </div>
            </div>

            {playbook.related_tool_slugs.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Tools Used</h3>
                <div className="space-y-2">
                  {playbook.related_tool_slugs.map((t) => (
                    <div key={t} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-700">
                      <Sparkles className="w-3.5 h-3.5 text-violet-500 shrink-0" />{formatToolSlug(t)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div className="hidden lg:block bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Related Playbooks</h3>
                <div className="space-y-3">
                  {related.map((rp) => (
                    <Link key={rp.slug} href={`/playbooks/${rp.slug}`} className="block p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition group">
                      <div className="flex items-start gap-2">
                        <span className="text-lg shrink-0">{rp.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate group-hover:text-blue-700 transition">{rp.title}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{rp.read_time_minutes} min \u00B7 {rp.difficulty}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-12 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-violet-500" />Related Playbooks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/playbooks/${rp.slug}`} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition group shadow-sm">
                  <span className="text-2xl shrink-0">{rp.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition">{rp.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{rp.read_time_minutes} min \u00B7 {rp.difficulty}</p>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{rp.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FAQJsonLd
          faqs={buildPlaybookFAQs(playbook)}
          mainEntityName={playbook.title}
        />

        <BlogPlaybookLinks
          playbookSlug={playbook.slug}
          relatedToolSlugs={playbook.related_tool_slugs}
        />
      </div>
    </main>
  );
}
