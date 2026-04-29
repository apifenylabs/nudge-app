import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-6">
        <div className="text-6xl mb-4">🔌❌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Station Not Found</h1>
        <p className="text-gray-500 mb-6">
          This charging station may have been removed or the link is incorrect.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Browse All Stations
          </Link>
          <Link
            href="/search"
            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-300 transition-colors"
          >
            Search Stations
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          Auto-redirecting to search page in a few seconds...
        </p>
        {/* Client-side redirect */}
        <meta httpEquiv="refresh" content="5;url=/search" />
      </div>
    </div>
  );
}
