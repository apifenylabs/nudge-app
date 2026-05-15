import { Loader2 } from 'lucide-react';

export default function StationLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 size={40} className="mx-auto text-sky-500 animate-spin mb-4" />
        <h2 className="text-lg font-semibold text-gray-700 mb-1">Loading Station Details</h2>
        <p className="text-sm text-gray-400">Fetching charging station information&hellip;</p>
      </div>
    </div>
  );
}
