// Browser Supabase client — uses @supabase/supabase-js directly (not @supabase/ssr)
// to avoid SSR/build-time failures from @supabase/ssr's module-level env checks.
// The client is created lazily — never at module scope.
// 
// v2: Force import @supabase/supabase-js to ensure correct client-side bundling.
// The previous version used @supabase/ssr which throws ReferenceError: require is not defined.

import { createClient } from '@supabase/supabase-js'

// Force fresh deploy — 2026-04-28 14:22 HKT
let _client: ReturnType<typeof createClient> | null = null;
let _noop: any = null;

export function createBrowserSupabaseClient() {
  if (typeof window === 'undefined') {
    // Server-side: return a mock/noop to avoid SSR failures
    if (!_noop) {
      _noop = new Proxy({}, {
        get(_target, _prop) {
          return () => Promise.resolve({ data: null, error: null });
        }
      });
    }
    return _noop;
  }

  if (_client) return _client;
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.warn('[Supabase] Missing credentials — using mock client');
    return _noop || (_noop = new Proxy({}, {
      get() { return () => Promise.resolve({ data: null, error: null }); }
    }));
  }
  
  _client = createClient(url, key);
  return _client;
}
