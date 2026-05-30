"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Zap, Trophy, ChevronRight, Bot, Star, Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle, LogIn, UserPlus
} from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import MascotPicker from "@/components/molecules/MascotPicker";
import { MascotPickerModal } from "@/components/molecules/MascotDisplay";
import MascotDisplay from "@/components/molecules/MascotDisplay";
import { useMascotStore } from "@/stores/mascotStore";
import { MASCOTS } from "@/data/mascots";
import { loadProgression } from "@/lib/persistence";
import { createAuthClient } from "@/lib/auth/client";
import { getGodTierStatus } from "@/lib/swarm/god-tier-engine";
import GodTierModal from "@/components/organisms/GodTierModal";

// ─── Particle Field ────────────────────────────────────────────────────

function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 200 + Math.random() * 160,
        delay: Math.random() * 100,
        color: 'rgba(13, 148, 136,',
        opacity: 0.1,
        glowSize: 3 + Math.random() * 4,
        layer: Math.floor(Math.random() * 2),
      };
    }), []);

  const layerStyles = ['z-0', 'z-[1]'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div key={p.id} className={`absolute ${layerStyles[p.layer]}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size + p.glowSize * 2, height: p.size + p.glowSize * 2 }}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `${p.color} ${p.opacity})`,
              left: '50%', top: '50%',
              x: '-50%', y: '-50%',
              boxShadow: `0 0 ${p.glowSize * 2}px ${p.color} ${p.opacity * 0.5})`,
            }}
            animate={{
              y: [0, -6, 2, -10, -3, -14, 0, -8, -5, -10, 0],
              x: [0, 4, -2, 6, -4, 5, -5, 3, -3, 2, 0],
              scale: [1, 1.08, 0.82, 1.12, 0.88, 1.1, 0.78, 1.04, 0.84, 1.02, 1],
              opacity: [0.05, 0.12, 0.08, 0.15, 0.06, 0.14, 0.04, 0.1, 0.05, 0.09, 0.05],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        </div>
      ))}
    </div>
  );
}

type AuthMode = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGodModal, setShowGodModal] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  interface ProgressionStateType {
    totalXp: number;
    totalTasksRun: number;
    skillsCertified: number;
    goldSkills: number;
    achievements: string[];
    lastSavedAt: string;
  }

  // Check if user was previously in demo mode — auto-redirect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (localStorage.getItem('titan-demo-mode') === 'true') {
          router.push('/dashboard');
        }
      } catch {}
    }
  }, [router]);

  const [progState, setProgState] = useState<ProgressionStateType>(() => {
    if (typeof window === 'undefined') return { totalXp: 0, totalTasksRun: 0, skillsCertified: 0, goldSkills: 0, achievements: [], lastSavedAt: '' };
    try {
      const saved = loadProgression();
      return { totalXp: saved.totalXp, totalTasksRun: saved.totalTasksRun, skillsCertified: saved.skillsCertified, goldSkills: saved.goldSkills, achievements: saved.achievements, lastSavedAt: saved.lastSavedAt };
    } catch { return { totalXp: 0, totalTasksRun: 0, skillsCertified: 0, goldSkills: 0, achievements: [], lastSavedAt: '' }; }
  });

  const agentLevel = useMemo(() => Math.max(1, Math.floor(progState.totalXp / 500) + 1), [progState.totalXp]);
  useEffect(() => {
    if (agentLevel >= 30) {
      setShowGodModal(true);
    }
  }, [agentLevel]);
  const godTierStatus = useMemo(() => getGodTierStatus(agentLevel, progState.totalXp, 6, progState.skillsCertified, progState.totalTasksRun), [agentLevel, progState]);
  const { currentMascot, hasCompletedOnboarding, openPicker } = useMascotStore();
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);
  const [hovering, setHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const estSavings = (progState.totalTasksRun * 3.8).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const handleAuth = useCallback(async () => {
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter email and password');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const supabase = createAuthClient();

      if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          // If Supabase is unreachable (network error), fall through to demo mode
          if (error.message?.includes('fetch') || error.message?.includes('Failed to fetch') || error.status === 0) {
            throw new Error('SUPABASE_UNREACHABLE');
          }
          setError(error.message);
          setLoading(false);
          return;
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) {
          // If Supabase is unreachable (network error), fall through to demo mode
          if (error.message?.includes('fetch') || error.message?.includes('Failed to fetch') || error.status === 0) {
            throw new Error('SUPABASE_UNREACHABLE');
          }
          setError(error.message);
          setLoading(false);
          return;
        }
      }

      try {
        localStorage.setItem('titan-auth-email', email);
        localStorage.setItem('titan-auth-mode', authMode);
        localStorage.setItem('titan-auth-timestamp', new Date().toISOString());
      } catch {}

      setAuthSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push('/dashboard');
      }, 300);
    } catch (err: any) {
      // If Supabase is unreachable, offer demo mode
      if (err?.message === 'SUPABASE_UNREACHABLE' || err?.message?.includes('fetch') || err?.message?.includes('Failed to fetch')) {
        setError('Supabase server is unreachable. Would you like to enter Demo Mode? All features work locally.');
        setLoading(false);
        return;
      }
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  }, [email, password, authMode, router]);

  const toggleMode = useCallback(() => {
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
    setError('');
  }, []);

  if (authSuccess) {
    return (
      <div className="min-h-screen bg-white relative flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="w-20 h-20 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-10 w-10 text-teal-600" />
            </div>
          </motion.div>
          <motion.h2
            className="text-2xl font-bold titan-text-gradient mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Titan
          </motion.h2>
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Redirecting to your dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-white relative flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        <ParticleField />
        <div className="relative z-10 max-w-lg w-full">
          <MascotPicker onComplete={() => setShowOnboarding(false)} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-white relative flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <BreadcrumbJsonLd items={[
        { label: "Home", href: "/" },
        { label: "Sign In", href: "/login" },
      ]} />
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-bl from-teal-50/60 to-transparent" />
      <ParticleField />

      {/* Back link */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-teal-600 transition-colors"
        >
          <ChevronRight className="h-3 w-3 rotate-180" />
          Back to Home
        </button>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Mascot hero */}
        <motion.div className="mb-4 sm:mb-5 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: hovering ? 1.03 : 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px]">
            <div className="absolute rounded-full pointer-events-none"
              style={{
                width: '88%', height: '88%', top: '6%', left: '6%',
                background: `radial-gradient(circle, ${currentMascot.colorTint}20 0%, ${currentMascot.colorTint}08 40%, transparent 70%)`,
                filter: 'blur(25px)',
              }} />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={openPicker}
              animate={{
                y: hovering ? [0, -8, 0] : [0, -4, 0],
              }}
              transition={{ duration: hovering ? 1.5 : 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MascotDisplay
                size={typeof window !== 'undefined' && window.innerWidth < 640 ? 70 : 100}
                glowMultiplier={hovering ? 1.5 : 1}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Auth card */}
        <motion.div
          className="rounded-2xl border p-5 sm:p-6"
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200">
              <Sparkles className="h-3 w-3 text-teal-600" />
              <span className="text-[10px] font-mono text-teal-600 tracking-wider">
                {authMode === 'login' ? 'WELCOME BACK' : 'JOIN TITAN'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">
              <span className="titan-text-gradient">
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-1 font-mono">
              {authMode === 'login'
                ? 'Enter your credentials to access your swarm'
                : 'Start free. No credit card needed.'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-xs"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#EF4444',
              }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Email */}
          <div className="mb-3.5">
            <label className="block text-[11px] font-mono text-gray-500 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs font-mono border bg-white transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: '#E5E7EB',
                  color: '#111827',
                  '--tw-ring-color': 'rgba(20, 184, 166, 0.4)',
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-[11px] font-mono text-gray-500 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 rounded-lg text-xs font-mono border bg-white transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: '#E5E7EB',
                  color: '#111827',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAuth();
                }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            onClick={handleAuth}
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
              color: '#FFFFFF',
            }}
            whileHover={loading ? {} : { scale: 1.02, y: -1 }}
            whileTap={loading ? {} : { scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <motion.span
                  className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              <>
                {authMode === 'login' ? <><LogIn className="h-3.5 w-3.5" /> Sign In</> : <><UserPlus className="h-3.5 w-3.5" /> Create Free Account</>}
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
          </motion.button>

          {/* Toggle mode */}
          <div className="mt-4 text-center">
            <button
              onClick={toggleMode}
              className="text-[11px] font-mono text-gray-500 hover:text-teal-600 transition-colors"
            >
              {authMode === 'login' ? (
                <>Don't have an account? <span className="text-teal-600 font-semibold">Sign up</span></>
              ) : (
                <>Already have an account? <span className="text-teal-600 font-semibold">Sign in</span></>
              )}
            </button>
          </div>

          {/* Demo mode bypass (shown when Supabase error detected) */}
          {error?.includes('Supabase') && (
            <motion.button
              onClick={async () => {
                try {
                  localStorage.setItem('titan-auth-email', email || 'demo@titan.local');
                  localStorage.setItem('titan-auth-mode', 'demo');
                  localStorage.setItem('titan-auth-timestamp', new Date().toISOString());
                  localStorage.setItem('titan-demo-mode', 'true');
                } catch {}
                setAuthSuccess(true);
                setTimeout(() => router.push('/dashboard'), 300);
              }}
              className="w-full mt-2 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              style={{
                background: '#FFFFFF',
                color: '#14B8A6',
                border: '1.5px dashed #14B8A6',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🧪 Enter Demo Mode (offline)
            </motion.button>
          )}
        </motion.div>

        {/* Stats preview */}
        <motion.div
          className="grid grid-cols-2 gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 justify-center">
            <Zap className="h-3 w-3 text-emerald-600" />
            <span className="text-[10px] font-mono text-emerald-700 font-medium">+${estSavings} value</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 justify-center">
            <Trophy className="h-3 w-3 text-amber-600" />
            <span className="text-[10px] font-mono text-amber-700 font-medium">Lv{agentLevel} Agent</span>
          </div>
        </motion.div>
      </div>

      <MascotPickerModal />
      <GodTierModal
        open={showGodModal}
        onClose={() => setShowGodModal(false)}
        level={agentLevel}
      />
    </motion.div>
  );
}
