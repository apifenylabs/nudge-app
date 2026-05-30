'use client';

import { useState } from 'react';
import { FileText, Download, Sparkles } from 'lucide-react';
import EmailCapture from './EmailCapture';

interface FreeTemplateSectionProps {
  prompt: string;
  playbookTitle: string;
}

export default function FreeTemplateSection({ prompt, playbookTitle }: FreeTemplateSectionProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  return (
    <>
      <section className="mb-6 sm:mb-8">
        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 via-blue-50/30 to-white p-4 sm:p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.06),transparent_50%)]" />
          <div className="relative flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Left: Template info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold border border-blue-200">
                  <FileText className="w-3 h-3" />
                  Free Template
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2">
                Copy-paste this prompt into ChatGPT to get started right now:
              </p>
              <div className="mb-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3 italic">
                  &ldquo;{prompt}&rdquo;
                </p>
              </div>
            </div>

            {/* Right: CTA buttons */}
            <div className="flex flex-col gap-2 shrink-0 sm:pt-0">
              <button
                onClick={() => setShowEmailCapture(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-semibold hover:from-blue-700 hover:to-violet-700 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                Download Free Template
              </button>
              <span className="text-[9px] text-gray-400 text-center">
                No spam. Instant download.
              </span>
            </div>
          </div>
        </div>
      </section>

      <EmailCapture
        isOpen={showEmailCapture}
        onClose={() => setShowEmailCapture(false)}
        prompt={prompt}
        playbookTitle={playbookTitle}
      />
    </>
  );
}
