'use client';

import { MapPin, Search, Globe, Menu, X, User, Sparkles, ChevronDown, Heart, Plus, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import UserMenu from './UserMenu';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
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
        supabase
          .from('bookmarks')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', session.user.id)
          .then(({ count }) => setBookmarkCount(count || 0));
      } else {
        setBookmarkCount(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const supabase = createBrowserSupabaseClient();
    supabase
      .from('bookmarks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .then(({ count }) => setBookmarkCount(count || 0));
  }, [user]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Luxury */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
              scrolled ? 'bg-gold' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Crown className={`w-5 h-5 transition-colors duration-500 ${
                scrolled ? 'text-navy' : 'text-gold'
              }`} />
            </div>
            <div className={`transition-colors duration-500 ${
              scrolled ? 'text-charcoal-dark' : 'text-white'
            }`}>
              <h1 className="text-lg font-semibold tracking-tight leading-tight">
                Luxury Family Travel
              </h1>
              <p className={`text-[10px] tracking-wider uppercase ${
                scrolled ? 'text-gold-dark' : 'text-white/60'
              }`}>
                Asia
              </p>
            </div>
          </Link>

          {/* Desktop Nav - Luxury */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { name: 'Destinations', href: '/search' },
              { name: 'Top 10', href: '/top10' },
              { name: 'Blog', href: '/blog' },
              { name: 'About', href: '/about' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                  scrolled
                    ? 'text-gray-600 hover:text-charcoal-dark'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-gold' : 'bg-white'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className={`hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
              scrolled
                ? 'text-gray-500 hover:text-charcoal hover:bg-gray-100'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}>
              <Search size={17} />
            </button>

            {/* Saved */}
            <Link
              href={user ? '/account/saved' : '/auth/login'}
              className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? 'text-gray-600 hover:text-charcoal hover:bg-gray-100'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart size={15} />
              <span className="hidden lg:inline">Saved</span>
              {user && bookmarkCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gold/20 text-gold font-medium">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {authLoading ? (
              <div className={`hidden md:flex items-center justify-center w-8 h-8 ${
                scrolled ? 'text-gray-400' : 'text-white/60'
              }`}>
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              </div>
            ) : user ? (
              <UserMenu user={user} bookmarkCount={bookmarkCount} />
            ) : (
              <Link
                href="/auth/login"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'bg-gold text-navy hover:bg-gold-light shadow-sm'
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <User size={15} />
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className={`lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gold/10 bg-white rounded-b-2xl shadow-xl">
            <div className="flex flex-col gap-1">
              {[
                { name: 'Destinations', href: '/search' },
                { name: 'Top 10', href: '/top10' },
                { name: 'Blog', href: '/blog' },
                { name: 'About', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3.5 min-h-[44px] flex items-center text-gray-700 hover:text-charcoal-dark hover:bg-cream rounded-xl font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-4 pt-6 border-t border-gray-100 space-y-3 px-4">
                <Link
                  href={user ? '/account/saved' : '/auth/login'}
                  className="w-full flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl border border-gray-200 bg-white hover:border-gold/30 transition-all text-sm font-medium text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  Saved Places
                </Link>

                {user ? (
                  <Link
                    href="/account"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gold text-navy font-medium text-sm hover:bg-gold-light transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account Settings
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gold text-navy font-medium text-sm hover:bg-gold-light transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
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
