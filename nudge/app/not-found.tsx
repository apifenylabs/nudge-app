import Link from 'next/link';
import { ArrowLeft, Home, Search, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        {/* Nudge mascot/icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <MessageSquare size={40} className="text-primary" />
        </div>

        {/* Error code with subtle styling */}
        <div className="text-[100px] leading-none font-bold text-primary/10 select-none mb-2">
          404
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          This page may have been moved, deleted, or the link might be incorrect.
          Let&apos;s get you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.98] shadow-sm"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-muted transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
            Try these instead
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/features"
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary rounded-lg transition-colors"
            >
              Features
            </Link>
            <Link
              href="/blog"
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary rounded-lg transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary rounded-lg transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary rounded-lg transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary rounded-lg transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
