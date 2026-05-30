"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#0B0D1A' }}>
      <div className="text-center max-w-md px-6">
        <div className="text-4xl mb-4">⚡</div>
        <h1 className="text-xl font-bold mb-2" style={{ color: '#F9FAFB' }}>Something went wrong</h1>
        <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>
          {error?.message || "Titan encountered an unexpected error."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 text-sm font-semibold rounded-lg transition-colors"
          style={{ background: '#7C3AED', color: '#FFFFFF' }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
