'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: Crumb[];
  className?: string;
}

/**
 * Visual breadcrumb navigation component.
 * Renders a visible trail of links + current page label.
 * Does NOT replace BreadcrumbSchema (JSON-LD) — use both for SEO.
 *
 * Usage:
 * <BreadcrumbNav
 *   items={[
 *     { label: 'Categories', href: '/categories' },
 *     { label: 'Writing Assistants' },
 *   ]}
 * />
 */
export default function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-xs sm:text-sm', className)}>
      <Link
        href="/"
        className="flex items-center gap-1 text-tech-300 hover:text-white transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3 h-3 text-tech-400 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-tech-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium truncate max-w-[160px] sm:max-w-[240px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
