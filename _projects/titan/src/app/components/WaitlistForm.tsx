'use client';

/**
 * Titan — Waitlist Form
 *
 * Email capture for the CTA section.
 * Submits to Supabase `waitlist` table when configured;
 * falls back to localStorage for offline dev.
 */

import { useState, useCallback } from 'react';
import supabase, { isSupabaseConfigured } from '../../lib/supabase-client';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    setMessage('');

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      setSubmitting(false);
      return;
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('waitlist')
        .insert({ email: email.trim().toLowerCase(), source: 'titan-landing' });

      if (error) {
        // Duplicate email is not a real error
        if (error.code === '23505') {
          setStatus('success');
          setMessage("You're already on the list! We'll be in touch.");
          setEmail('');
          setSubmitting(false);
          return;
        }
        setStatus('error');
        setMessage(error.message || 'Something went wrong. Try again?');
        setSubmitting(false);
        return;
      }
    } else {
      // Dev fallback — save to localStorage
      const existing = JSON.parse(localStorage.getItem('titan_waitlist') || '[]');
      existing.push({ email: email.trim().toLowerCase(), ts: Date.now() });
      localStorage.setItem('titan_waitlist', JSON.stringify(existing));
    }

    setStatus('success');
    setMessage('You\'re in line, Hunter. See you on the other side of the gate.');
    setEmail('');
    setSubmitting(false);
  }, [email]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
          placeholder="Enter your email"
          disabled={submitting || status === 'success'}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={submitting || status === 'success'}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Joining…
            </span>
          ) : status === 'success' ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Ascended
            </span>
          ) : (
            'Join Waitlist'
          )}
        </button>
      </div>

      {message && (
        <div className={`mt-3 flex items-center gap-2 text-xs ${
          status === 'success' ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {status === 'error' ? (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
          )}
          {message}
        </div>
      )}

      {!isSupabaseConfigured && (
        <p className="mt-2 text-[10px] text-slate-600 text-center">
          ⚡ Supabase env vars not set — storing locally
        </p>
      )}
    </form>
  );
}
