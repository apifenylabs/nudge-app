'use client';

import { useState, FormEvent } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NewsletterSignup({ source = 'newsletter-signup' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'subscribe',
          email: email.trim(),
          source,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        if (data.subscriberCount) setCount(data.subscriberCount);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  const reset = () => {
    setStatus('idle');
    setEmail('');
    setMessage('');
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-gradient-to-br from-neon/10 via-aqua/5 to-tech-800 border border-neon/20 p-6 sm:p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">You&apos;re in! 🎉</h3>
        <p className="text-sm text-tech-200 mb-2">{message}</p>
        {count && (
          <p className="text-[10px] text-tech-300">
            Join <span className="text-neon-light font-semibold">{count.toLocaleString()}</span> other AI enthusiasts
          </p>
        )}
        <p className="text-[10px] text-tech-300 mt-3">
          We&apos;ll send weekly AI tool insights — no spam, unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-neon/10 via-aqua/5 to-tech-800 border border-tech-500/30 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center">
          <Mail className="w-4 h-4 text-neon-light" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Apifeny AI Weekly</h3>
          <p className="text-[10px] text-tech-300">Curated AI tools & playbooks for builders</p>
        </div>
      </div>
      <p className="text-xs text-tech-200 leading-relaxed mt-3 mb-3">
        Get the best new AI tools, pipeline playbooks, and insider tips delivered every Tuesday.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tech-300" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            className={cn(
              'w-full bg-tech-900 border border-tech-500/30 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white',
              'placeholder:text-tech-300 focus:outline-none focus:border-neon/50 transition',
              status === 'error' && 'border-red-500/50 focus:border-red-500/50'
            )}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing…
            </>
          ) : (
            <>
              Subscribe
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {status === 'error' && (
        <div className="mt-3 flex items-center gap-2 text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{message}</span>
          <button onClick={reset} className="ml-auto text-tech-300 hover:text-white text-[10px] underline">
            Try again
          </button>
        </div>
      )}

      <p className="text-[9px] text-tech-300 mt-2">
        No spam. Unsubscribe anytime. ~1 email/week.
      </p>
    </div>
  );
}
