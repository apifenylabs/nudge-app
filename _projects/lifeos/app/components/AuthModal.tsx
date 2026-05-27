'use client';

/**
 * LifeOS — Auth Modal
 *
 * Login/signup modal with email/password and GitHub OAuth options.
 * Shows email confirmation-pending screen after signup.
 */

import { useState, useCallback, useMemo } from 'react';
import { useAuth } from '../lib/auth-context';
import ResetPasswordModal from './ResetPasswordModal';
import { Mail, LogIn, UserPlus, X, Loader2, Send, ArrowLeft, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function AuthModal({ onClose }: Props) {
  const { signInWithEmail, signUpWithEmail, signInWithGitHub, signOut, resendConfirmationEmail, user } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [resending, setResending] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);

  const handleEmailSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email.trim() || !password.trim()) {
      setMessage({ text: 'Please fill in both email and password.', type: 'error' });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
      setLoading(false);
      return;
    }

    const result = mode === 'signin'
      ? await signInWithEmail(email, password)
      : await signUpWithEmail(email, password);

    if (result.error) {
      setMessage({ text: result.error, type: 'error' });
    } else if (mode === 'signin') {
      onClose();
    } else if ('needsConfirmation' in result && result.needsConfirmation) {
      // Show confirmation pending screen
      setPendingEmail(email);
    } else {
      // Auto-confirmed (e.g., magic link or disabled email confirmation)
      setMessage({ text: 'Account created! You can now sign in.', type: 'success' });
      setTimeout(() => setMode('signin'), 2000);
    }
    setLoading(false);
  }, [email, password, mode, signInWithEmail, signUpWithEmail, onClose]);

  const handleResend = useCallback(async () => {
    if (!pendingEmail) return;
    setResending(true);
    const result = await resendConfirmationEmail(pendingEmail);
    if (result.error) {
      setMessage({ text: result.error, type: 'error' });
    } else {
      setMessage({ text: 'Confirmation email resent! Check your inbox.', type: 'success' });
    }
    setResending(false);
  }, [pendingEmail, resendConfirmationEmail]);

  const handleBack = useCallback(() => {
    setPendingEmail(null);
    setMessage(null);
  }, []);

// ─── Password Strength Indicator ─────────────────────────────────────────
function PasswordStrengthBar({ password }: { password: string }) {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const label = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Unbreakable'];
  const colors = [
    'bg-red-500', // 0
    'bg-orange-500', // 1
    'bg-yellow-500', // 2
    'bg-lime-500', // 3
    'bg-green-500', // 4
    'bg-emerald-500', // 5
  ];
  const icons = [ShieldAlert, ShieldAlert, Shield, Shield, ShieldCheck, ShieldCheck];
  const Icon = icons[strength];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < strength ? colors[strength] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1">
        <Icon size={12} className={strength < 2 ? 'text-red-500' : strength < 4 ? 'text-yellow-500' : 'text-green-500'} />
        <span className={`text-xs ${strength < 2 ? 'text-red-500' : strength < 4 ? 'text-yellow-600' : 'text-green-600'}`}>
          {label[strength]}
        </span>
      </div>
    </div>
  );
}

  // If already signed in, show profile card
  if (user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Account</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-2xl font-bold text-teal-600">
              {user.email?.charAt(0).toUpperCase() || '👤'}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {user.app_metadata?.provider === 'github' ? 'Connected with GitHub' : 'Email account'}
              </p>
            </div>
          </div>

          <button
            onClick={() => { signOut(); onClose(); }}
            className="w-full px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // Confirmation pending screen
  if (pendingEmail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4 text-center" onClick={e => e.stopPropagation()}>
          <button onClick={handleBack} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
            <ArrowLeft size={18} />
          </button>
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
            <Send size={24} className="text-teal-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-sm text-gray-500 mb-1">
            We sent a confirmation link to
          </p>
          <p className="text-sm font-medium text-gray-800 mb-4">{pendingEmail}</p>
          <p className="text-xs text-gray-400 mb-6">
            Click the link in the email to activate your account, then sign in.
          </p>

          {/* Message */}
          {message && (
            <div className={`mb-4 px-4 py-2.5 rounded-xl text-sm ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message.text}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 disabled:bg-teal-50 disabled:text-teal-400 rounded-xl transition-colors mb-3"
          >
            {resending ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
            {resending ? 'Sending...' : 'Resend Confirmation Email'}
          </button>

          <button
            onClick={() => { setPendingEmail(null); setMode('signin'); setMessage(null); }}
            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {mode === 'signin' ? 'Welcome back to LifeOS' : 'Start your LifeOS journey'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 px-4 py-2.5 rounded-xl text-sm ${
            message.type === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Email form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                autoFocus
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); if (mode === 'signup') setShowPasswordStrength(true); }}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
            {showPasswordStrength && mode === 'signup' && password.length > 0 && (
              <PasswordStrengthBar password={password} />
            )}
          </div>
          {mode === 'signin' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="text-xs text-gray-400 hover:text-teal-600 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 rounded-xl transition-colors"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : mode === 'signin' ? <LogIn size={16} /> : <UserPlus size={16} />}
            {loading ? (mode === 'signin' ? 'Signing in...' : 'Creating account...') : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or</span></div>
        </div>

        {/* GitHub OAuth */}
        <button
          onClick={() => signInWithGitHub()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Continue with GitHub
        </button>

        {/* Toggle mode */}
        <p className="mt-5 text-center text-xs text-gray-400">
          {mode === 'signin' ? (
            <>Don&apos;t have an account?{' '}
              <button onClick={() => { setMode('signup'); setMessage(null); }} className="text-teal-600 hover:text-teal-700 font-medium">
                Sign Up
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => { setMode('signin'); setMessage(null); }} className="text-teal-600 hover:text-teal-700 font-medium">
                Sign In
              </button>
            </>
          )}
        </p>
      </div>

      {/* Reset Password Modal */}
      {showReset && (
        <ResetPasswordModal mode="request" onClose={() => setShowReset(false)} />
      )}
    </div>
  );
}
