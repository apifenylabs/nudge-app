'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Zap, Shield, Users } from 'lucide-react';

export default function WaitlistCard() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [dismissed, setDismissed] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(247);

  useEffect(() => {
    const alreadyJoined = localStorage.getItem('lifeos_waitlist_joined');
    if (alreadyJoined) setDismissed(true);

    // Animate waitlist counter for subtle social proof
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined, referrer: 'lifeos-landing' }),
      });
      const data = await res.json();

      if (res.ok || res.status === 200) {
        setStatus('success');
        setMessage(data.message || '✅ You\'re on the list! We\'ll keep you posted.');
        localStorage.setItem('lifeos_waitlist_joined', 'true');
        setWaitlistCount(prev => prev + 1);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Could not connect. Check your internet and try again.');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-6 md:p-8 mb-8 shadow-xl shadow-indigo-200/50">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white/90 hover:bg-white/10 rounded-full transition-all text-sm leading-none z-10"
        aria-label="Dismiss"
      >
        ✕
      </button>

      <div className="relative z-10">
        {/* Badge + tagline */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/15 text-white text-[11px] font-medium rounded-full backdrop-blur-sm border border-white/10">
            <Sparkles size={11} /> Early Access
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-400/20 text-emerald-200 text-[11px] font-medium rounded-full backdrop-blur-sm border border-emerald-400/10">
            <Users size={11} /> {waitlistCount.toLocaleString()} on waitlist
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          {/* Left: value proposition */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1.5">
              Your AI Copilot <span className="text-indigo-200">for Every Part of Life</span>
            </h2>
            <p className="text-sm text-indigo-200/80 leading-relaxed max-w-lg">
              Cloud sync, multi-device access, AI-powered insights, and personalised plugins
              for health, finance, productivity, relationships, and more.
            </p>
          </div>

          {/* Right: signup form */}
          <div className="w-full md:w-80 shrink-0">
            {status === 'success' ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 text-center">
                <div className="text-3xl mb-1">🎉</div>
                <p className="text-sm font-medium text-white">{message}</p>
                <p className="text-xs text-indigo-200/70 mt-1">
                  We&apos;re rolling out invites in waves. Check your email soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 backdrop-blur-sm transition-all"
                    required
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-4 py-2.5 text-sm font-semibold text-indigo-700 bg-white hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all shadow-lg shadow-black/10 flex items-center gap-1.5 shrink-0"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-1.5">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        Join Free <Zap size={14} />
                      </span>
                    )}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 backdrop-blur-sm transition-all"
                  autoComplete="given-name"
                />
                {status === 'error' && (
                  <p className="text-xs text-red-200 bg-red-500/20 px-2.5 py-1.5 rounded-lg">{message}</p>
                )}
                <p className="text-[11px] text-indigo-300/60 flex items-center gap-1">
                  <Shield size={10} /> No spam. Unsubscribe anytime. Join {waitlistCount}+ early adopters.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
