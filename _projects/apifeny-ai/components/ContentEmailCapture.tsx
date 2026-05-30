'use client';

import { useState, FormEvent } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight, Loader2, FileText } from 'lucide-react';

interface ContentEmailCaptureProps {
  /** Where this capture is placed — for source tracking */
  source: string;
  /** Optional override text */
  title?: string;
  description?: string;
  /** Visual variant */
  variant?: 'inline' | 'compact' | 'sidebar';
  /** Optional download pitch when playbook-specific */
  playbookTitle?: string;
}

export default function ContentEmailCapture({
  source,
  title,
  description,
  variant = 'inline',
  playbookTitle,
}: ContentEmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const defaultTitle = playbookTitle
    ? `Get the full "${playbookTitle}" playbook`
    : 'Get the Best AI Tools — Weekly';

  const defaultDescription = playbookTitle
    ? `Download the complete PDF guide + copy-paste prompts. Free.`
    : 'Curated AI tools and playbooks that work. No fluff, no spam.';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      });

      if (!res.ok) throw new Error('Subscription failed');

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setStatus('success');
      setMessage(data.message || "You're in! Check your inbox.");
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`rounded-xl bg-emerald-50 border border-emerald-200 ${variant === 'compact' ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800">{message}</p>
            <p className="text-xs text-emerald-600 mt-0.5">Welcome to the squad 🦊</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="rounded-xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-4 h-4 text-violet-500" />
          <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Stay Updated</span>
        </div>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          Weekly AI tool drops and playbooks.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email.trim()}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <>
                Subscribe
                <ArrowRight className="w-3 h-3" />
              </>
            )}
          </button>
        </form>
        {status === 'error' && message && (
          <p className="text-[10px] text-red-500 mt-1">{message}</p>
        )}
        <p className="text-[9px] text-gray-400 mt-2">Unsubscribe anytime. 1-2 emails/wk.</p>
      </div>
    );
  }

  // inline and compact share the same structure, different padding
  return (
    <div className={`rounded-xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 border border-gray-200 ${variant === 'compact' ? 'p-4' : 'p-5 sm:p-6'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {playbookTitle && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold border border-blue-200">
                <FileText className="w-3 h-3" />
                Free PDF
              </span>
            )}
          </div>
          <h3 className={`font-semibold text-gray-900 ${variant === 'compact' ? 'text-sm' : 'text-base'}`}>
            {title || defaultTitle}
          </h3>
          <p className={`text-gray-500 mt-0.5 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
            {description || defaultDescription}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="shrink-0 w-full sm:w-auto sm:min-w-[280px]">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !email.trim()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {status === 'loading' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  {playbookTitle ? 'Send Playbook' : 'Subscribe'}
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
          {status === 'error' && message && (
            <p className="text-[10px] text-red-500 mt-1">{message}</p>
          )}
          <p className="text-[9px] text-gray-400 mt-1">No spam. Unsubscribe anytime.</p>
        </form>
      </div>
    </div>
  );
}
