import { freeTemplates } from '@/lib/free-templates';
import Link from 'next/link';
import { Sparkles, BookOpen, ChevronRight } from 'lucide-react';

interface FreeTemplateBannerProps {
 playbookSlug: string;
}

/** Server-side free template teaser for free playbook pages */
export default function FreeTemplateBanner({ playbookSlug }: FreeTemplateBannerProps) {
 const template = freeTemplates.find((t) => t.slug === playbookSlug);
 if (!template) return null;

 return (
 <section className="mb-8">
 <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neon/10 to-aqua/10 border border-neon/20 p-5 sm:p-6">
 <div className="absolute inset-0 bg-tech-grid opacity-10" />
 <div className="relative">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-4 h-4 text-neon-light" />
 <span className="text-xs font-medium text-neon-light uppercase tracking-wider">Free Template</span>
 </div>

 <h3 className="text-sm font-semibold text-white mb-2">{template.title}</h3>
 <p className="text-xs text-tech-200 mb-3">{template.description}</p>

 <div className="relative mb-3">
 <pre className="bg-tech-900/80 border border-tech-500/30 rounded-lg p-3 text-xs text-tech-100 font-mono leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
 {template.prompt}
 </pre>
 </div>

 <div className="mt-4 pt-4 border-t border-tech-500/20">
 <p className="text-xs text-tech-300 mb-2">
 This is <strong className="text-white">1 of {template.extraPrompts + 1} prompts</strong> in the full playbook.
 Get the complete PDF with all prompts, detailed workflows, and pro tips.
 </p>
 <Link
 href={`/playbooks/${playbookSlug}`}
 className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-light hover:text-white transition"
 >
 <BookOpen className="w-3.5 h-3.5" />
 Get the Full Playbook PDF
 <ChevronRight className="w-3 h-3" />
 </Link>
 </div>
 </div>
 </div>
 </section>
 );
}
