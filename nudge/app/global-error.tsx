'use client';

import Link from 'next/link';
import { RotateCcw, AlertTriangle, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle size={32} className="text-destructive" />
            </div>

            <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground text-sm mb-8">
              An unexpected error occurred. Our team has been notified.
              {error.digest && (
                <span className="block mt-1 text-xs text-muted-foreground/60">
                  Error ID: {error.digest}
                </span>
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.98] shadow-sm"
              >
                <RotateCcw size={16} />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-muted transition-all active:scale-[0.98]"
              >
                <Home size={16} />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
