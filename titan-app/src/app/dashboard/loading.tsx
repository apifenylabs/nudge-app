export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" style={{ background: '#0B0D1A' }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
        <p className="text-xs font-mono" style={{ color: '#6B7280' }}>Loading dashboard...</p>
      </div>
    </div>
  );
}
