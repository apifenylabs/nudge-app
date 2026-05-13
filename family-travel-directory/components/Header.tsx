'use client';

import { MapPin, Search, Globe, Menu, X, User, Sparkles, ChevronDown, Heart, Plus, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import UserMenu from './UserMenu';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: any } }) => {
      setUser(user);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from('bookmarks').select('id', { count: 'exact', head: true }).eq('user_id', session.user.id).then(({ count }) => setBookmarkCount(count || 0));
      } else {
        setBookmarkCount(0);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const supabase = createBrowserSupabaseClient();
    supabase.from('bookmarks').select('id', { count: 'exact', head: true }).eq('user_id', user.id).then(({ count }) => setBookmarkCount(count || 0));
  }, [user]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100/50'
        : 'bg-white/80 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo — clean minimal */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-200 group-hover:shadow-lg group-hover:shadow-teal-200 transition-all">
              <Compass size={18} className="text-white" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-heading tracking-tight">
                Family Travel<span className="text-teal-600">.</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — clean, spacious */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-body hover:text-heading transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full">
              Explore
            </Link>
            <Link href="/search" className="text-sm font-medium text-body hover:text-heading transition-colors">
              Destinations
            </Link>
            <Link href="/blog" className="text-sm font-medium text-body hover:text-heading transition-colors">
              Blog
            </Link>

            {/* For Families dropdown — inline links for now */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-body hover:text-heading transition-colors">
                For Families
                <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 overflow-hidden">
                <div className="py-2">
                  <Link href="/best-for/babies" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                    <span className="text-lg">👶</span>
                    <div>
                      <div className="font-medium">Best for Babies</div>
                      <div className="text-xs text-gray-500">Under 2 years old</div>
                    </div>
                  </Link>
                  <Link href="/best-for/teens" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                    <span className="text-lg">🧑</span>
                    <div>
                      <div className="font-medium">Best for Teens</div>
                      <div className="text-xs text-gray-500">13-18 years old</div>
                    </div>
                  </Link>
                  <Link href="/best-for/multigen" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                    <span className="text-lg">👨‍👩‍👧‍👦</span>
                    <div>
                      <div className="font-medium">Multi-Generational</div>
                      <div className="text-xs text-gray-500">Grandparents &amp; kids</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Bookmark/Saved */}
            <Link
              href={user ? '/account/saved' : '/auth/login'}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-body hover:text-heading hover:bg-gray-100 transition-colors"
            >
              <Heart size={16} />
              <span>Saved</span>
              {bookmarkCount > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-medium ml-1">{bookmarkCount}</span>
              )}
            </Link>

            {/* Auth */}
            <div className="hidden md:flex items-center">
              {authLoading ? (
                <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-teal-500 animate-spin" />
              ) : user ? (
                <UserMenu user={user} bookmarkCount={bookmarkCount} />
              ) : (
                <Link
                  href="/auth/login"
                  className="px-5 py-2 bg-teal-700 text-white text-sm font-semibold rounded-lg hover:bg-teal-800 transition-colors shadow-sm"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <Link href="/" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Explore</Link>
              <Link href="/search" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Destinations</Link>
              <Link href="/blog" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link href="/best-for/babies" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>👶 Best for Babies</Link>
              <Link href="/best-for/teens" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>🧑 Best for Teens</Link>
              <Link href="/best-for/multigen" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>👨‍👩‍👧‍👦 Multi-Generational</Link>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 px-4">
                <Link
                  href={user ? '/account/saved' : '/auth/login'}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={16} />
                  Saved Places
                  {bookmarkCount > 0 && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 ml-auto">{bookmarkCount}</span>
                  )}
                </Link>
                {user ? (
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={16} />
                    Account
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
