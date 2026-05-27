'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Zap } from 'lucide-react';
import type { Itinerary } from '@/data/itineraries';
import rawStations from '@/data/stations.json';

// Dynamically import Leaflet to avoid SSR issues
const RouteMapContent = dynamic(() => import('./RouteMapContent'), { ssr: false });

interface RouteMapProps {
  itinerary: Itinerary;
  height?: string;
}

export interface RouteCityCoord {
  name: string;
  lat: number;
  lng: number;
}

// Known city coordinates in Asia for route mapping
const CITY_COORDS: Record<string, [number, number]> = {
  'Bangkok': [13.7563, 100.5018],
  'Hua Hin': [12.5682, 99.9588],
  'Chumphon': [10.4914, 99.2019],
  'Surat Thani': [9.1382, 99.3190],
  'Phuket': [7.8804, 98.3923],
  'Ayutthaya': [14.3532, 100.5687],
  'Nakhon Sawan': [15.6916, 100.1186],
  'Lampang': [18.2929, 99.4928],
  'Chiang Mai': [18.7883, 98.9853],
  'Singapore': [1.3521, 103.8198],
  'Johor Bahru': [1.4927, 103.7414],
  'Melaka': [2.1896, 102.2501],
  'Malacca': [2.1896, 102.2501],
  'Seremban': [2.7297, 101.9381],
  'Pagoh': [2.1447, 102.7731],
  'Gopeng': [4.3800, 101.1400],
  'Batu Ferringhi': [5.4667, 100.2500],
  'Uluwatu': [-8.8136, 115.0983],
  'Kuala Lumpur': [3.1390, 101.6869],
  'Canggu': [-8.6484, 115.1409],
  'Seminyak': [-8.6892, 115.1555],
  'Ubud': [-8.5069, 115.2625],
  'Sanur': [-8.6958, 115.2620],
  'Nusa Dua': [-8.7975, 115.2312],
  'Denpasar': [-8.6500, 115.2167],
  'Hong Kong': [22.3193, 114.1694],
  'Zhuhai': [22.2710, 113.5767],
  'Macau': [22.1987, 113.5439],
  'Hanoi': [21.0278, 105.8342],
  'Haiphong': [20.8449, 106.6881],
  'Ha Long Bay': [20.9559, 107.0793],
  'Osaka': [34.6937, 135.5023],
  'Kyoto': [35.0116, 135.7681],
  'Nagoya': [35.1815, 136.9065],
  'Hakone': [35.1891, 139.0257],
  'Tokyo': [35.6762, 139.6503],
  'Ipoh': [4.5975, 101.0901],
  'George Town': [5.4141, 100.3288],
  'Mumbai': [19.0760, 72.8777],
  'Lonavala': [18.7546, 73.4069],
  'Pune': [18.5204, 73.8567],
  'Kawaguchiko': [35.5000, 138.7833],
  'Fuji Five Lakes': [35.4667, 138.7667],
  'Delhi': [28.6139, 77.2090],
  'Gurgaon': [28.4595, 77.0266],
  'Jaipur': [26.9124, 75.7873],
  'Agra': [27.1767, 78.0081],
  'Pai': [19.3600, 98.4408],
  'Mae Hong Son': [19.3013, 97.9683],
  'Fatehpur Sikri': [27.0946, 77.6616],
  'Bharatpur': [27.2167, 77.4833],
  'Sejong': [36.4800, 127.2890],
  'Gyeongju': [35.8562, 129.2247],
  'Busan': [35.1796, 129.0756],
  'Seoul': [37.5665, 126.9780],
  'Gyeongju': [35.8562, 129.2247],
  'Sejong': [36.4800, 127.2890],
  'Manila': [14.5995, 120.9842],
  'Pampanga': [15.1167, 120.6500],
  'Tarlac': [15.5000, 120.5667],
  'Baguio': [16.4169, 120.5933],
  'Mae Hong Son': [19.3013, 97.9683],
  'Ha Long Bay': [20.9559, 107.0793],
  'Pai': [19.3600, 98.4408],
  'Fatehpur Sikri': [27.0946, 77.6616],
  'Bharatpur': [27.2167, 77.4833],
};

export default function RouteMap({ itinerary, height = '400px' }: RouteMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const routeCoords = useMemo(() => {
    return itinerary.cities
      .map(city => CITY_COORDS[city])
      .filter(Boolean) as [number, number][];
  }, [itinerary.cities]);

  // Filter stations to ones near the route cities (within 80km / ~0.72 deg lat)
  const stationMarkers = useMemo(() => {
    if (!itinerary.cities.length || !rawStations.length) return [];
    const citySet = new Set(itinerary.cities.map(c => c.toLowerCase()));
    const cityCoords = itinerary.cities.map(c => CITY_COORDS[c]).filter(Boolean) as [number, number][];
    if (!cityCoords.length) return [];

    // Calculate bounding box with 1-degree padding (~110km)
    const lats = cityCoords.map(c => c[0]);
    const lngs = cityCoords.map(c => c[1]);
    const minLat = Math.min(...lats) - 1;
    const maxLat = Math.max(...lats) + 1;
    const minLng = Math.min(...lngs) - 1;
    const maxLng = Math.max(...lngs) + 1;

    return (rawStations as any[])
      .filter(s => {
        const lat = s.latitude as number;
        const lng = s.longitude as number;
        return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
      })
      .map(s => ({
        id: s.id as string,
        name: s.name as string,
        lat: s.latitude as number,
        lng: s.longitude as number,
        chargerSpeed: (s.chargerSpeed as number) || 0,
        chargerCount: (s.chargerCount as number) || 0,
        costPerKwh: (s.costPerKwh as number) || 0.25,
        reliability: (s.reliability as number) || 3.5,
      }));
  }, [itinerary.cities]);

  if (!mounted) {
    return (
      <div className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm" style={{ height }}>
        Loading route map...
      </div>
    );
  }

  return (
    <>
      {stationMarkers.length > 0 && (
        <div className="flex items-center gap-1.5 mb-2 text-xs text-gray-500">
          <Zap size={12} className="text-purple-500" />
          <span>{stationMarkers.length} charging stations near this route</span>
        </div>
      )}
      <RouteMapContent routeCoords={routeCoords} cityNames={itinerary.cities} height={height} stationMarkers={stationMarkers} />
    </>
  );
}
