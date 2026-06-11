'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, ArrowUpRight, Crown, Flame, Sparkles } from 'lucide-react';
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
 ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm'
 : 'bg-transparent'
 )}
 >
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16 sm:h-20">
 {/* Logo */}
 <Link href="/" className="flex items-center gap-2 group shrink-0">
 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon to-aqua flex items-center justify-center">
 <span className="text-gray-900 font-bold text-sm">A</span>
 </div>
 <div className="flex items-baseline gap-1.5">
 <span className="text-xl font-bold text-gray-900 tracking-tight">
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
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search AI tools and agents…"
 className="w-72 lg:w-96 bg-white border border-gray-200/50 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition"
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
 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
 )}
 >
 Tools
 </Link>
 <Link
 href="/trending"
 className={cn(
 'px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5',
 pathname.startsWith('/trending')
 ? 'bg-neon/15 text-neon-light'
 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
 )}
 >
 <Flame className="w-3.5 h-3.5 text-orange-500" />
 Trending
 </Link>
 <Link
 href="/monthly-roundup"
 className={cn(
 'px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5',
 pathname.startsWith('/monthly-roundup')
 ? 'bg-neon/15 text-neon-light'
 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
 )}
 >
 <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
 Monthly
 </Link>
 <Link
 href="/collections"
 className={cn(
 'px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5',
 pathname.startsWith('/collection')
 ? 'bg-neon/15 text-neon-light'
 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
 )}
 >
 Collections
 </Link>
 <Link
 href="/playbooks"
 className={cn(
 'px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5',
 pathname.startsWith('/playbook')
 ? 'bg-neon/15 text-neon-light'
 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
 )}
 >
 Playbooks
 </Link>
 <Link
 href="/blog"
 className={cn(
 'px-4 py-2 rounded-lg text-sm font-medium transition',
 pathname.startsWith('/blog')
 ? 'bg-neon/15 text-neon-light'
 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
 )}
 >
 Blog
 </Link>
 <Link
 href="/build-in-public"
 className={cn(
 'px-4 py-2 rounded-lg text-sm font-medium transition',
 pathname.startsWith('/build-in-public')
 ? 'bg-neon/15 text-neon-light'
 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
 )}
 >
 Build in Public
 </Link>

 {/* Sister Sites Dropdown */}
 <div className="relative group">
 <button className="px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition flex items-center gap-1">
 <span className="text-[10px]">🌐</span>
 Network
 <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
 </svg>
 </button>
 <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
 <div className="bg-white border border-gray-200/40 rounded-xl p-2 shadow-xl shadow-neon/10 min-w-[180px]">
 <a
 href="https://www.familytravelasia.com"
 target="_blank"
 rel="noopener noreferrer"
 className="block px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
 >
 🧳 Family Travel Asia
 </a>
 <a
 href="https://ev-charging-asia.vercel.app"
 target="_blank"
 rel="noopener noreferrer"
 className="block px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
 >
 ⚡ EV Charging Asia
 </a>
 </div>
 </div>
 </div>
 <Link
 href="/submit"
 className="px-4 py-2 rounded-lg text-sm font-medium bg-neon hover:bg-neon-dark text-gray-900 transition flex items-center gap-1.5"
 >
 Submit Tool
 <ArrowUpRight className="w-3.5 h-3.5" />
 </Link>
 </nav>
 </div>

 {/* Mobile menu button */}
 <button
 onClick={() => setMobileOpen(!mobileOpen)}
 className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
 aria-label="Toggle menu"
 >
 {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
 </button>
 </div>

 {/* Mobile menu */}
 {mobileOpen && (
 <div className="md:hidden pb-4 border-t border-gray-100 animate-slide-up">
 <div className="pt-4 space-y-3">
 <form onSubmit={handleSearch}>
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search AI tools…"
 className="w-full bg-white border border-gray-200/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-neon/50 transition"
 />
 </div>
 </form>
 <Link
 href="/tools"
 className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
 >
 Tools
 </Link>
 <Link
 href="/collections"
 className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
 >
 Collections
 </Link>
 <Link
 href="/playbooks"
 className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
 >
 Playbooks
              </Link>
              <Link
                href="/premium"
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                Pro
              </Link>
              <Link
                href="/build-in-public"
 className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
 >
 Build in Public
 </Link>

 {/* Mobile Sister Sites */}
 <div className="pt-2 border-t border-gray-100">
 <p className="px-4 pb-1.5 text-[10px] font-medium text-gray-400 uppercase tracking-wider">Our Network</p>
 <a
 href="https://www.familytravelasia.com"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
 >
 🧳 Family Travel Asia
 </a>
 <a
 href="https://ev-charging-asia.vercel.app"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
 >
 ⚡ EV Charging Asia
 </a>
 </div>

 <Link
 href="/submit"
 className="block px-4 py-2.5 rounded-lg text-sm font-medium bg-neon hover:bg-neon-dark text-gray-900 transition text-center"
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
