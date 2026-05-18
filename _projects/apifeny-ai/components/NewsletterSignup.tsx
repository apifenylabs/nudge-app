'use client';

import { useState, FormEvent } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NewsletterSignup({ source = 'newsletter-signup' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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
      setMessage(data.message || 'You\'re subscribed! Check your inbox.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 border border-gray-200 p-8 sm:p-10 text-center shadow-sm">
      {status !== 'success' ? (
        <>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 mb-4">
            <Mail className="w-6 h-6 text-violet-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Get the Best AI Tools — Curated Weekly
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6 leading-relaxed">
            No fluff. No spam. Just the tools and playbooks that actually work for solopreneurs in Asia.
          </p>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || !email.trim()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-lg shadow-violet-200 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            {status === 'error' && message && (
              <div className="flex items-center gap-2 mt-3 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {message}
              </div>
            )}
          </form>
          <p className="text-[10px] text-gray-400 mt-3">
            Unsubscribe anytime. 1-2 emails per week.
          </p>
        </>
      ) : (
        <div className="py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            You&apos;re in!
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
            {message || 'Check your inbox for a confirmation email.'}
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition"
          >
            Subscribe another email
          </button>
        </div>
      )}
    </div>
  );
}
