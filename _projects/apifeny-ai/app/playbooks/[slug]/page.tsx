import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, BookOpen, Lightbulb, AlertTriangle, Sparkles, CheckCircle, Target, Zap, TrendingUp, DollarSign, Star, BarChart3 } from 'lucide-react';
import { playbooks, type Playbook } from '@/lib/playbooks';
import { cn, getPipelineStageBadge } from '@/lib/utils';

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
    openGraph: { title: pb.meta_title || `${pb.title} — Apifeny AI`, description: pb.meta_description || pb.description, url: `https://apifeny.ai/playbooks/${slug}`, type: 'article' as const },
  };
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Advanced: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

function formatToolSlug(slug: string): string {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getRelated(current: Playbook): Playbook[] {
  return playbooks.filter((p) => p.slug !== current.slug).filter(
    (p) => p.pipeline_stage === current.pipeline_stage || p.related_tool_slugs.some((t) => current.related_tool_slugs.includes(t))
  ).slice(0, 6);
}

export default async function PlaybookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playbook = playbooks.find((p) => p.slug === slug);
  if (!playbook) notFound();

  const stageBadge = playbook.pipeline_stage ? getPipelineStageBadge(playbook.pipeline_stage) : null;
  const related = getRelated(playbook);

  return (
    <div className="min-h-screen bg-tech-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Playbooks
        </Link>

        <section className="relative mb-10">
          <div className={cn('relative rounded-2xl overflow-hidden border border-tech-500/20 p-6 sm:p-10', playbook.gradient ? `bg-gradient-to-br ${playbook.gradient}` : 'bg-gradient-to-br from-tech-800 to-tech-900')}>
            <div className="absolute inset-0 bg-tech-grid opacity-10" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-3xl sm:text-4xl">{playbook.icon}</span>
                {stageBadge && <span className={cn('inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border', stageBadge.color)}><span>{stageBadge.icon}</span><span>{stageBadge.label}</span></span>}
                <span className={cn('inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border', difficultyColors[playbook.difficulty] || 'bg-gray-500/20 text-gray-400 border-gray-500/30')}>{playbook.difficulty}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{playbook.title}</h1>
              {playbook.subtitle && <p className="text-lg sm:text-xl text-tech-200 mb-4">{playbook.subtitle}</p>}
              <p className="text-sm sm:text-base text-tech-200/80 max-w-3xl mb-6">{playbook.description}</p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-xs text-tech-200"><Clock className="w-4 h-4 text-violet-400" /><span className="font-medium text-white">{playbook.read_time_minutes} min</span><span className="text-tech-300">read</span></div>
                <div className="flex items-center gap-2 text-xs text-tech-200"><BookOpen className="w-4 h-4 text-violet-400" /><span className="font-medium text-white">{playbook.steps.length}</span><span className="text-tech-300">{playbook.steps.length === 1 ? 'step' : 'steps'}</span></div>
                <div className="flex items-center gap-2 text-xs text-tech-200"><Sparkles className="w-4 h-4 text-amber-400" /><span className="font-medium text-white">{playbook.related_tool_slugs.length}</span><span className="text-tech-300">{playbook.related_tool_slugs.length === 1 ? 'tool' : 'tools'}</span></div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {playbook.related_tool_slugs.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-violet-400" />AI Tools Used</h2>
                <div className="flex flex-wrap gap-2">
                  {playbook.related_tool_slugs.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">{formatToolSlug(t)}</span>
                  ))}
                </div>
              </section>
            )}

            {playbook.steps.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-400" />Step-by-Step Guide</h2>
                <div className="space-y-4">
                  {playbook.steps.map((step, idx) => (
                    <div key={idx} className="relative pl-12 pb-4 border-l-2 border-tech-600 last:border-l-2 last:border-transparent">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-violet-400">{idx + 1}</span>
                      </div>
                      <div className="bg-tech-800/50 rounded-xl border border-tech-600/30 p-4 sm:p-5">
                        <h3 className="text-sm font-semibold text-white mb-1.5">{step.title}</h3>
                        <p className="text-sm text-tech-200/80 leading-relaxed">{step.description}</p>
                        {step.tip && (
                          <div className="mt-3 flex items-start gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                            <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" /><span>{step.tip}</span>
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
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-cyan-400" />Pro Tips</h2>
                <div className="space-y-2">
                  {playbook.pro_tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg px-4 py-3">
                      <Star className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /><p className="text-sm text-tech-100 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {playbook.common_mistakes && playbook.common_mistakes.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-400" />Common Mistakes to Avoid</h2>
                <div className="space-y-3">
                  {playbook.common_mistakes.map((cm, idx) => (
                    <div key={idx} className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-4">
                      <p className="text-sm font-medium text-rose-300 mb-1.5">❌ {cm.mistake}</p>
                      <p className="text-sm text-tech-200/80">✅ {cm.fix}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {playbook.real_results && playbook.real_results.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-emerald-400" />Real Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {playbook.real_results.map((r, idx) => (
                    <div key={idx} className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4 text-center">
                      <p className="text-xl font-bold text-emerald-400">{r.value}</p>
                      <p className="text-xs text-tech-200 font-medium mb-1">{r.metric}</p>
                      <p className="text-[11px] text-tech-300">{r.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {playbook.revenue_impact && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><DollarSign className="w-5 h-5 text-amber-400" />Revenue Impact</h2>
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-4">
                  <p className="text-sm text-amber-200">{playbook.revenue_impact}</p>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-tech-800/60 border border-tech-600/30 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm"><span className="text-tech-300">Difficulty</span><span className="text-white font-medium">{playbook.difficulty}</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-tech-300">Read Time</span><span className="text-white font-medium">{playbook.read_time_minutes} min</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-tech-300">Steps</span><span className="text-white font-medium">{playbook.steps.length}</span></div>
                {playbook.pipeline_stage && <div className="flex justify-between items-center text-sm"><span className="text-tech-300">Stage</span><span className="text-white font-medium capitalize">{playbook.pipeline_stage.replace(/-/g, ' ')}</span></div>}
                <div className="flex justify-between items-center text-sm"><span className="text-tech-300">Tools</span><span className="text-white font-medium">{playbook.related_tool_slugs.length}</span></div>
              </div>
            </div>

            {playbook.related_tool_slugs.length > 0 && (
              <div className="bg-tech-800/60 border border-tech-600/30 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Tools Used</h3>
                <div className="space-y-2">
                  {playbook.related_tool_slugs.map((t) => (
                    <div key={t} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-tech-700/50 border border-tech-600/20 text-xs text-tech-100">
                      <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />{formatToolSlug(t)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div className="hidden lg:block bg-tech-800/60 border border-tech-600/30 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Related Playbooks</h3>
                <div className="space-y-3">
                  {related.map((rp) => (
                    <Link key={rp.slug} href={`/playbooks/${rp.slug}`} className="block p-3 rounded-lg bg-tech-700/30 border border-tech-600/10 hover:bg-tech-700/50 hover:border-violet-500/20 transition group">
                      <div className="flex items-start gap-2">
                        <span className="text-lg shrink-0">{rp.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-white truncate group-hover:text-violet-300 transition">{rp.title}</p>
                          <p className="text-[11px] text-tech-300 mt-0.5">{rp.read_time_minutes} min · {rp.difficulty}</p>
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
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-violet-400" />Related Playbooks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/playbooks/${rp.slug}`} className="flex items-start gap-3 p-4 rounded-xl bg-tech-800/50 border border-tech-600/20 hover:bg-tech-700/50 hover:border-violet-500/20 transition group">
                  <span className="text-2xl shrink-0">{rp.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition">{rp.title}</p>
                    <p className="text-xs text-tech-300 mt-0.5">{rp.read_time_minutes} min · {rp.difficulty}</p>
                    <p className="text-[11px] text-tech-400 mt-1 line-clamp-2">{rp.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
