'use client';

import { useState, useEffect } from 'react';

interface Station {
  id: string;
  name: string;
  city: string;
  country: string;
  rating?: number;
  popularity?: number;
  ratingCount?: number;
  chargerTypes?: string[];
  connectorTypes?: string[];
  hasRestroomNearby?: boolean;
  hasFoodNearby?: boolean;
  hasCoveredParking?: boolean;
  isMallParking?: boolean;
  reliability?: number;
  [key: string]: unknown;
}

const cache = new Map<string, Station[]>();

export function useStations(): Station[] {
  const [stations, setStations] = useState<Station[]>(() => cache.get('stations') || []);

  useEffect(() => {
    if (cache.has('stations')) return;
    
    fetch('/api/stations')
      .then(res => res.json())
      .then(data => {
        const list = data.stations || data || [];
        cache.set('stations', list);
        setStations(list);
      })
      .catch(err => console.error('Failed to load stations:', err));
  }, []);

  return stations;
}
