'use client';

/**
 * LifeOS — Auth Context
 *
 * Provides authentication state and methods to the entire app.
 * Wraps Supabase Auth with React context for easy consumption.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import supabase, { isSupabaseConfigured } from './supabase-client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
}

interface AuthContextValue extends AuthState {
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    configured: isSupabaseConfigured(),
  });

  // Listen for auth state changes
  useEffect(() => {
    if (!supabase) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null,
        session: session,
        loading: false,
        configured: true,
      });
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        session: session,
        loading: false,
        configured: true,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message };
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    // If no error but user isn't confirmed, email confirmation was sent
    const needsConfirmation = !error && !data.user?.email_confirmed_at;
    return { error: error?.message, needsConfirmation };
  }, []);

  const signInWithGitHub = useCallback(async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    if (error) console.warn('[LifeOS Auth] GitHub OAuth error:', error.message);
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const resendConfirmationEmail = useCallback(async (email: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
      },
    });
    return { error: error?.message };
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/update-password` : undefined,
    });
    return { error: error?.message };
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error: error?.message };
  }, []);

  return (
    <AuthContext.Provider value={{
      ...state,
      signInWithEmail,
      signUpWithEmail,
      signInWithGitHub,
      signOut,
      resendConfirmationEmail,
      resetPassword,
      updatePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Provide a fallback if used outside provider (e.g. during SSR)
    return {
      user: null,
      session: null,
      loading: false,
      configured: false,
      signInWithEmail: async () => ({ error: 'Auth not initialized' }),
      signUpWithEmail: async () => ({ error: 'Auth not initialized', needsConfirmation: false }),
      signInWithGitHub: async () => {},
      signOut: async () => {},
      resendConfirmationEmail: async () => ({ error: 'Auth not initialized' }),
      resetPassword: async () => ({ error: 'Auth not initialized' }),
      updatePassword: async () => ({ error: 'Auth not initialized' }),
    };
  }
  return ctx;
}
