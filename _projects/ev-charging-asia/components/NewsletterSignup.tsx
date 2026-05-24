'use client';

import { useState, useCallback } from 'react';
import { Mail, Send, Check, ArrowRight } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'hero' | 'footer';
  source?: string;
}

export default function NewsletterSignup({ variant = 'inline', source = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }, [email, source]);

  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-br from-sky-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider text-sky-200">Free Guide</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Get the <span className="text-amber-300">Ultimate EV Road Trip Asia Guide</span>
          </h3>
          <p className="text-sm text-sky-100 mb-4">
            Monthly tips, new routes, charging station updates, and exclusive discounts delivered to your inbox.
          </p>
          {status === 'success' ? (
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
              <Check size={18} className="text-emerald-300" />
              <span className="text-sm text-emerald-100">You&apos;re in! Check your inbox for the free guide.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-sky-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  disabled={status === 'submitting'}
                />
                {errorMsg && <p className="text-xs text-red-200 mt-1">{errorMsg}</p>}
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-900 font-semibold rounded-xl text-sm transition-all disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Subscribe Free'}
                {status === 'submitting' ? null : <ArrowRight size={16} />}
              </button>
            </form>
          )}
          <p className="text-[10px] text-sky-300 mt-2">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
          <Mail size={14} className="text-emerald-500" />
          EV Road Trip Tips
        </h4>
        <p className="text-xs text-gray-500 mb-3">Get new routes and charging updates.</p>
        {status === 'success' ? (
          <p className="text-xs text-emerald-600 flex items-center gap-1">
            <Check size={12} /> Subscribed!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={status === 'submitting'}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50"
            >
              <Send size={12} />
            </button>
          </form>
        )}
        {errorMsg && <p className="text-xs text-red-500 mt-1">{errorMsg}</p>}
      </div>
    );
  }

  // Inline variant (default)
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Mail size={16} className="text-emerald-500" />
        <h3 className="text-sm font-bold text-gray-900">Free EV Road Trip Guide</h3>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        Get monthly route updates, charging tips, and exclusive partner deals.
      </p>
      {status === 'success' ? (
        <div className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2">
          <Check size={14} className="text-emerald-600" />
          <span className="text-xs text-emerald-700">You&apos;re subscribed! Check your inbox.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            disabled={status === 'submitting'}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex items-center gap-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50"
          >
            {status === 'submitting' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}
      {errorMsg && <p className="text-xs text-red-500 mt-1">{errorMsg}</p>}
      <p className="text-[10px] text-gray-400 mt-2">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
