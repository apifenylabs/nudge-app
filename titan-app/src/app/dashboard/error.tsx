"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" style={{ background: '#0B0D1A' }}>
      <div className="text-center max-w-md px-6">
        <div className="text-3xl mb-3">⚠️</div>
        <h2 className="text-lg font-bold mb-2" style={{ color: '#F9FAFB' }}>Dashboard error</h2>
        <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>
          {error?.message || "Something went wrong in the dashboard."}
        </p>
        <button
          onClick={reset}
          className="px-5 py-1.5 text-xs font-semibold rounded-lg transition-colors"
          style={{ background: '#7C3AED', color: '#FFFFFF' }}
        >
          Reload
        </button>
      </div>
    </div>
  );
}
