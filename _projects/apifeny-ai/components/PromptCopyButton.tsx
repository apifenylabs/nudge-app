'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, X } from 'lucide-react';

interface PromptCopyButtonProps {
  prompt: string;
  playbookTitle: string;
}

export default function PromptCopyButton({ prompt, playbookTitle }: PromptCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-HTTPS or restricted contexts
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-violet-100 hover:bg-violet-200 text-violet-700 text-[10px] font-medium border border-violet-200 transition-all hover:scale-105 group"
      >
        <Sparkles className="w-3 h-3" />
        <span>Steal this prompt</span>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 p-5 text-white">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Free Prompt</span>
              </div>
              <h3 className="text-lg font-bold">Steal this prompt</h3>
              <p className="text-sm opacity-90">
                From <span className="font-semibold">{playbookTitle}</span>
              </p>
            </div>

            {/* Prompt body */}
            <div className="p-5">
              <div className="relative">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 border border-gray-200 rounded-xl p-4 leading-relaxed max-h-64 overflow-y-auto">
                  {prompt}
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-white border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition shadow-sm"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              {copied && (
                <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Copied! Paste it into ChatGPT and go.
                </div>
              )}

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={copyToClipboard}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold hover:from-violet-700 hover:to-purple-700 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 text-center">
                  No signup required. Paste and run.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
