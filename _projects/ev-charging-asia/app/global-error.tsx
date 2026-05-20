'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('EV Charging Asia global error:', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">🔌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Critical Error</h1>
          <p className="text-sm text-gray-600 mb-6">
            The app crashed at the root level. A hard refresh usually fixes this.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </body>
    </html>
  );
}
