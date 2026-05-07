'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-tech-900/90 backdrop-blur-xl border-b border-neon/10 shadow-lg shadow-neon/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon to-aqua flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-white tracking-tight">
                Apifeny<span className="text-neon">AI</span>
              </span>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-neon/15 text-neon-light border border-neon/20 uppercase tracking-wider">
                Beta
              </span>
            </div>
          </Link>

          {/* Desktop nav + search */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search on homepage */}
            {isHome && (
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tech-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 19,000+ AI tools and agents…"
                  className="w-72 lg:w-96 bg-tech-800 border border-tech-500/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition"
                />
              </form>
            )}

            <nav className="flex items-center gap-1">
              <Link
                href="/tools"
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5',
                  pathname.startsWith('/tools')
                    ? 'bg-neon/15 text-neon-light'
                    : 'text-tech-100 hover:text-white hover:bg-tech-700'
                )}
              >
                Tools
              </Link>
              <Link
                href="/tools"
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5',
                  'text-tech-100 hover:text-white hover:bg-tech-700'
                )}
              >
                Collections
              </Link>
              <Link
                href="/submit"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-neon hover:bg-neon-dark text-white transition flex items-center gap-1.5"
              >
                Submit Tool
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-tech-200 hover:text-white hover:bg-tech-700 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-tech-500/20 animate-slide-up">
            <div className="pt-4 space-y-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tech-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search AI tools…"
                    className="w-full bg-tech-800 border border-tech-500/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 transition"
                  />
                </div>
              </form>
              <Link
                href="/tools"
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-tech-100 hover:text-white hover:bg-tech-700 transition"
              >
                Tools
              </Link>
              <Link
                href="/tools"
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-tech-100 hover:text-white hover:bg-tech-700 transition"
              >
                Collections
              </Link>
              <Link
                href="/submit"
                className="block px-4 py-2.5 rounded-lg text-sm font-medium bg-neon hover:bg-neon-dark text-white transition text-center"
              >
                Submit Tool
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Gradient underline on scroll */}
      {scrolled && (
        <div className="h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      )}
    </header>
  );
}
