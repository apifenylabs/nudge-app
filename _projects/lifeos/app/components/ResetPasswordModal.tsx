'use client';

/**
 * LifeOS — Reset Password Modal
 *
 * "Forgot password?" flow: enter email → receive reset link → set new password.
 * Two modes: 'request' (send reset email) and 'update' (set new password after redirect).
 */

import { useState, useCallback, useMemo } from 'react';
import { useAuth } from '../lib/auth-context';
import { X, Mail, Loader2, KeyRound, Shield, ShieldAlert, ShieldCheck, ArrowLeft } from 'lucide-react';

interface Props {
  mode?: 'request' | 'update';
  onClose: () => void;
}

export default function ResetPasswordModal({ mode = 'request', onClose }: Props) {
  const { resetPassword, updatePassword } = useAuth();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [sent, setSent] = useState(false);
  const [showStrength, setShowStrength] = useState(false);

  const handleRequestReset = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email.trim()) {
      setMessage({ text: 'Please enter your email address.', type: 'error' });
      setLoading(false);
      return;
    }

    const result = await resetPassword(email);
    if (result.error) {
      setMessage({ text: result.error, type: 'error' });
    } else {
      setSent(true);
      setMessage({ text: 'Reset link sent! Check your inbox.', type: 'success' });
    }
    setLoading(false);
  }, [email, resetPassword]);

  const handleUpdatePassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
      setLoading(false);
      return;
    }

    const result = await updatePassword(newPassword);
    if (result.error) {
      setMessage({ text: result.error, type: 'error' });
    } else {
      // Auto-dismiss on successful password update
      onClose();
    }
    setLoading(false);
  }, [newPassword, updatePassword, onClose]);

  // Password strength utilities — defined at component level for render access
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (newPassword.length >= 12) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;
    return score;
  }, [newPassword]);

  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Unbreakable'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
  ];
  const StrengthIcon = [ShieldAlert, ShieldAlert, Shield, Shield, ShieldCheck, ShieldCheck][passwordStrength];

  if (mode === 'update') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Set New Password</h2>
              <p className="text-xs text-gray-400 mt-0.5">Enter your new password below</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          {message && (
            <div className={`mb-4 px-4 py-2.5 rounded-xl text-sm ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">New Password</label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => { setNewPassword(e.target.value); setShowStrength(true); }}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  autoFocus
                />
              </div>
              {showStrength && newPassword.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i < passwordStrength ? strengthColors[passwordStrength] : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <StrengthIcon size={12} className={passwordStrength < 2 ? 'text-red-500' : passwordStrength < 4 ? 'text-yellow-500' : 'text-green-500'} />
                    <span className={`text-xs ${passwordStrength < 2 ? 'text-red-500' : passwordStrength < 4 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {strengthLabel[passwordStrength]}
                    </span>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-1.5">At least 6 characters</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 rounded-xl transition-colors"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Request mode — forgot password form
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        {sent ? (
          <>
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-teal-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">Check Your Email</h2>
            <p className="text-sm text-gray-500 text-center mb-1">
              We sent a password reset link to
            </p>
            <p className="text-sm font-medium text-gray-800 text-center mb-6">{email}</p>
            <p className="text-xs text-gray-400 text-center mb-6">
              Click the link in the email to reset your password. It expires in 1 hour.
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors"
            >
              Done
            </button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Reset Password</h2>
              <p className="text-xs text-gray-400 mt-0.5">Enter your email and we&apos;ll send you a reset link</p>
            </div>

            {message && (
              <div className={`mb-4 px-4 py-2.5 rounded-xl text-sm ${
                message.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleRequestReset} className="space-y-4">
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
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 rounded-xl transition-colors"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-4 w-full text-center text-xs text-gray-400 hover:text-gray-600"
            >
              Back to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}
