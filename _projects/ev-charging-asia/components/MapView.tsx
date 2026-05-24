'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Station, computeStationScore, scoreTier } from '@/lib/scoring';

// Asia bounds: cannot pan outside Asia
const asiaBounds: L.LatLngBoundsExpression = [
  [-11, 95],
  [46, 146]
];

function createIcon(type: string, isSelected: boolean): L.DivIcon {
  const colors: Record<string, string> = {
    CCS2: '#10b981', CHAdeMO: '#3b82f6', 'Type 2': '#8b5cf6', 'GB/T': '#f59e0b', NACS: '#ef4444'
  };
  const label = type === 'CCS2' ? 'C' : type === 'CHAdeMO' ? 'H' : type === 'Type 2' ? 'T' : type === 'GB/T' ? 'G' : 'N';
  const bg = isSelected ? '#1f2937' : (colors[type] || '#6b7280');
  const scale = isSelected ? 1.2 : 1;
  return L.divIcon({
    className: '',
    html: `<div style="
      width: ${32 * scale}px; height: ${32 * scale}px; border-radius: 50%;
      background: ${bg}; color: white;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      cursor: pointer;
      transition: transform 0.2s;
    ">${label}</div>`,
    iconSize: [32 * scale, 32 * scale],
    iconAnchor: [16 * scale, 16 * scale],
    popupAnchor: [0, -20 * scale],
  });
}

function FitBounds({ stations }: { stations: Station[] }) {
  const map = useMap();
  useEffect(() => {
    if (stations.length === 0) return;
    const bounds = L.latLngBounds(stations.map(s => [s.latitude, s.longitude] as [number, number]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [stations, map]);
  return null;
}

export default function MapView({
  stations,
  selectedStation,
  onSelectStation,
}: {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (s: Station | null) => void;
}) {
  const defaultCenter: L.LatLngTuple = [20, 110]; // SE Asia center

  return (
    <MapContainer
      center={defaultCenter}
      zoom={4}
      maxBounds={asiaBounds}
      maxBoundsViscosity={1.0}
      className="w-full h-full"
      style={{ width: '100%', height: '100%', minHeight: '300px' }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map(station => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={createIcon(station.chargerTypes[0] || 'CCS2', station.id === selectedStation?.id)}
          eventHandlers={{
            click: () => onSelectStation(station),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <div className="font-semibold text-sm mb-1">{station.name}</div>
              <div className="text-xs text-gray-500 mb-2">{station.address}</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {station.chargerTypes.map(t => (
                  <span key={t} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">{t}</span>
                ))}
                <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-xs">{station.chargerSpeed}kW</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${scoreTier(computeStationScore(station)).color}`}>
                  {scoreTier(computeStationScore(station)).label}
                </span>
                {station.isOperational ? (
                  <span className="text-xs text-green-600 flex items-center gap-0.5"><ZapIcon /> Active</span>
                ) : (
                  <span className="text-xs text-red-500">Offline</span>
                )}
              </div>
              <Link
                href={`/station/${station.id}`}
                className="mt-2 block text-center text-xs bg-gray-900 text-white rounded-lg py-1.5 hover:bg-gray-800 transition-colors"
              >
                View Details
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
      {stations.length > 0 && <FitBounds stations={stations} />}
    </MapContainer>
  );
}

function ZapIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
