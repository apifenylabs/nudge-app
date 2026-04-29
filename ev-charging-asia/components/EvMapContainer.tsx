'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR issues
const MapContent = dynamic(() => import('./MapContent'), { ssr: false });

interface StationMap {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  chargerTypes: string[];
  chargerSpeed: number;
  reliability: number;
}

interface EvMapContainerProps {
  stations?: StationMap[];
  height?: string;
}

export default function EvMapContainer({ stations = [], height = '500px' }: EvMapContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm" style={{ height }}>
        Loading map...
      </div>
    );
  }

  return <MapContent stations={stations} height={height} />;
}
