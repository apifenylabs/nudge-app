'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ACTIVE_COLOR = '#10b981'; // emerald — EV green theme
const INACTIVE_COLOR = '#6b7280';

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BlogIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function MapIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SeniorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={INACTIVE_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M12 11v6" />
      <path d="M9 14h6" />
    </svg>
  );
}

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/search', label: 'Search', icon: SearchIcon },
  { href: '/blog', label: 'Blog', icon: BlogIcon },
  { href: '/routes', label: 'Map', icon: MapIcon },
  {
    href: 'https://www.familytravelasia.com',
    label: 'Family',
    icon: FamilyIcon,
    external: true,
  },
  {
    href: 'https://senior-friendly-travel-asia.vercel.app',
    label: 'Senior',
    icon: SeniorIcon,
    external: true,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 dark:bg-gray-900/90 dark:border-gray-800"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = item.external
            ? false
            : item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] rounded-xl px-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <item.icon active={false} />
                <span className="text-[10px] leading-tight text-gray-500">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] rounded-xl px-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                isActive ? 'text-emerald-500' : 'text-gray-500'
              }`}
            >
              <item.icon active={isActive} />
              <span className={`text-[10px] leading-tight ${isActive ? 'font-semibold text-emerald-500' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
