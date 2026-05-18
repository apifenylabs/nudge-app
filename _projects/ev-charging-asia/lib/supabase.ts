'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let _client: ReturnType<typeof createClient> | null = null;

export function createBrowserSupabaseClient() {
  if (_client) return _client;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase env vars not configured. Using local auth mock.');
    _client = null as never;
    return _client;
  }
  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}

export function useSupabaseAuth() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    if (!supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });
    return () => subscription.unsubscribe();
  }, [router, supabase]);

  return supabase;
}

export async function signIn(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) return { error: new Error('Supabase not configured') };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) return { error: new Error('Supabase not configured') };
  return supabase.auth.signUp({ email, password });
}

export async function signOut() {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) return;
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}
