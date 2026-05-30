export default function RootLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#0B0D1A' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
        <p className="text-sm font-mono" style={{ color: '#6B7280' }}>Loading Titan...</p>
      </div>
    </div>
  );
}
