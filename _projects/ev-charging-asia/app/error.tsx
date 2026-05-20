'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('EV Charging Asia page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-4">🔌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something didn't charge</h1>
        <p className="text-sm text-gray-600 mb-6">
          A temporary glitch stopped this page from loading. This happens sometimes — refreshing usually fixes it.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-300 transition-colors"
          >
            Go Home
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          If this keeps happening, clear your browser cache or try a different browser.
        </p>
      </div>
    </div>
  );
}
