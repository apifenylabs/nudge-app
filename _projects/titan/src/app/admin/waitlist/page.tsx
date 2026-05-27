'use client';

/**
 * Titan — Waitlist Admin Panel
 *
 * Password-protected view of all waitlist signups from Supabase.
 * Access: /admin/waitlist
 * Password: TITAN_ADMIN_SECRET env var
 *
 * Built for the CEO to manually track interest before building
 * a full admin dashboard auth system.
 */

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Download,
  Users,
  Calendar,
  Mail,
  TrendingUp,
  RefreshCw,
  Shield,
  AlertTriangle,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */
interface WaitlistEntry {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

type SortField = 'email' | 'created_at' | 'source';
type SortDir = 'asc' | 'desc';

/* ─────────────────────────────────────────────────────────────
   Login Screen
   ───────────────────────────────────────────────────────────── */
function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      // Validate via a simple serverless-compatible check
      const res = await fetch('/api/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem('titan_admin_auth', 'true');
        onLogin();
      } else {
        setError('Invalid password');
      }
      setLoading(false);
    },
    [password, onLogin]
  );

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            <span className="text-cyan-400">Ti</span>
            <span className="text-purple-400">tan</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Unlock
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Waitlist Table
   ───────────────────────────────────────────────────────────── */
function WaitlistTable({
  entries,
  sortField,
  sortDir,
  onSort,
}: {
  entries: WaitlistEntry[];
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
}) {
  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return (
      <span className="ml-1 text-[10px]">{sortDir === 'asc' ? '▲' : '▼'}</span>
    );
  };

  const handleSort = (field: SortField) => onSort(field);

  if (entries.length === 0) {
    return (
      <div className="glass rounded-xl p-10 text-center">
        <Users className="w-10 h-10 mx-auto text-slate-600 mb-3" />
        <p className="text-slate-400 text-sm font-medium">No waitlist entries yet</p>
        <p className="text-xs text-slate-600 mt-1">Entries will appear here when users sign up.</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800/50">
              <th
                className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors"
                onClick={() => handleSort('email')}
              >
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  Email{renderSortIcon('email')}
                </span>
              </th>
              <th
                className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors hidden sm:table-cell"
                onClick={() => handleSort('source')}
              >
                <span className="flex items-center gap-1">
                  Source{renderSortIcon('source')}
                </span>
              </th>
              <th
                className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors hidden md:table-cell"
                onClick={() => handleSort('created_at')}
              >
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Signed Up{renderSortIcon('created_at')}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {entries.map((entry, i) => (
              <tr
                key={entry.id}
                className="hover:bg-white/[0.02] transition-colors"
                style={{
                  animation: `rowFadeIn 0.3s ease-out ${i * 0.02}s both`,
                }}
              >
                <td className="px-5 py-3.5">
                  <span className="text-white font-medium">{entry.email}</span>
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell">
                  <span className="text-xs text-slate-400 bg-white/5 rounded-full px-2.5 py-1">
                    {entry.source || 'landing-page'}
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className="text-slate-500 text-xs">
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */
export default function WaitlistAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [search, setSearch] = useState('');

  // Check session storage for existing auth
  useEffect(() => {
    if (sessionStorage.getItem('titan_admin_auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  // Fetch waitlist data
  const fetchWaitlist = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/waitlist');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load waitlist');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchWaitlist();
    }
  }, [authenticated, fetchWaitlist]);

  // Sort / filter
  const sortedEntries = [...entries]
    .filter((e) => !search || e.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === 'email') cmp = a.email.localeCompare(b.email);
      else if (sortField === 'source') cmp = (a.source || '').localeCompare(b.source || '');
      else cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const exportCSV = () => {
    const header = 'Email,Source,Signed Up';
    const rows = entries.map(
      (e) =>
        `${e.email},${e.source || 'landing-page'},${new Date(e.created_at).toISOString()}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `titan-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Login Gate ──────────────────────────────────────────────
  if (!authenticated) {
    return <LoginGate onLogin={() => setAuthenticated(true)} />;
  }

  // ── Admin Panel ─────────────────────────────────────────────
  const todayCount = entries.filter(
    (e) =>
      new Date(e.created_at).toDateString() === new Date().toDateString()
  ).length;

  return (
    <main className="min-h-screen bg-[#08080f]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#1e293b]/50 bg-[#08080fe0] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h1 className="text-lg font-bold text-white">
              <span className="text-cyan-400">Ti</span>
              <span className="text-purple-400">tan</span>
              <span className="text-sm text-slate-500 ml-2 font-normal">
                Waitlist Admin
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              disabled={entries.length === 0}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
            <button
              onClick={fetchWaitlist}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Signups', value: entries.length, icon: Users, color: 'text-cyan-400' },
            { label: 'Today', value: todayCount, icon: TrendingUp, color: 'text-emerald-400' },
            { label: 'Sources', value: new Set(entries.map((e) => e.source || 'landing')).size, icon: Mail, color: 'text-purple-400' },
            { label: 'Last 7 Days', value: entries.filter((e) => Date.now() - new Date(e.created_at).getTime() < 7 * 86400000).length, icon: Calendar, color: 'text-amber-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email…"
            className="w-full max-w-xs px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          />
        </div>

        {/* Entries table or loading */}
        {loading ? (
          <div className="glass rounded-xl p-16 text-center">
            <Loader2 className="w-8 h-8 mx-auto text-cyan-400 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading waitlist entries…</p>
          </div>
        ) : error ? (
          <div className="glass rounded-xl p-10 text-center">
            <AlertTriangle className="w-10 h-10 mx-auto text-red-400 mb-3" />
            <p className="text-red-400 text-sm font-medium">Failed to load</p>
            <p className="text-xs text-slate-500 mt-1">{error}</p>
            <button
              onClick={fetchWaitlist}
              className="mt-4 px-4 py-2 text-xs font-medium rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              Try Again
            </button>
          </div>
        ) : (
          <WaitlistTable
            entries={sortedEntries}
            sortField={sortField}
            sortDir={sortDir}
            onSort={handleSort}
          />
        )}

        {/* Footer */}
        <footer className="mt-8 border-t border-slate-800/50 py-4 text-center text-xs text-slate-600">
          Titan Waitlist Admin — Data from Supabase `waitlist` table •{' '}
          {new Date().toLocaleDateString()}
        </footer>
      </div>

      {/* ── Animations ──────────────────────────────────── */}
      <style>{`
        @keyframes rowFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
