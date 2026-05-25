'use client';

import { useState, useEffect } from 'react';

/**
 * Safe wrapper around the map section.
 * If the map crashes during hydration/CSR, this catches it
 * so the rest of the page still renders.
 */
export default function SafeMapSection({ meta }: { meta: { totalStations: number; cities: string[]; countries: string[] } }) {
  const [mapReady, setMapReady] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Delay map loading to let other content hydrate first
    const timer = setTimeout(() => setMapReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (mapFailed) {
    return (
      <div className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="text-center px-4">
          <p className="text-red-500 font-semibold text-sm mb-2">⚠️ Map temporarily unavailable</p>
          <p className="text-gray-500 text-xs mb-4">The map encountered an error. You can still browse stations using the search below.</p>
          <button
            onClick={() => {
              setMapFailed(false);
              setMapReady(true);
            }}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600"
          >
            Retry Map
          </button>
        </div>
      </div>
    );
  }

  if (!mapReady) {
    return (
      <div className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 text-sm">Loading map...</div>
      </div>
    );
  }

  return <MapSection meta={meta} showMap={showMap} setShowMap={setShowMap} onError={() => setMapFailed(true)} />;
}

// Separate component so the error boundary is as close to the map import as possible
function MapSection({
  meta,
  showMap,
  setShowMap,
  onError,
}: {
  meta: { totalStations: number; cities: string[]; countries: string[] };
  showMap: boolean;
  setShowMap: (v: boolean) => void;
  onError: () => void;
}) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<{ meta: { totalStations: number; cities: string[]; countries: string[] } }> | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('./MapWithFilters')
      .then((mod) => {
        if (!cancelled) {
          setMapComponent(() => mod.default);
        }
      })
      .catch((err) => {
        console.error('[SafeMapSection] Failed to load map:', err);
        if (!cancelled) onError();
      });
    return () => { cancelled = true; };
  }, [onError]);

  return (
    <div className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh]">
      <button
        onClick={() => setShowMap(!showMap)}
        className="absolute top-3 right-3 z-10 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 shadow-sm"
      >
        {showMap ? 'Show Content' : 'Show Map'}
      </button>
      {MapComponent ? (
        <MapComponent meta={meta} />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <div className="animate-pulse text-gray-400 text-sm">Loading interactive map...</div>
        </div>
      )}
    </div>
  );
}
