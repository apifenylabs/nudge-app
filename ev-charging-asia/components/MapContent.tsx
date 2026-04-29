'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';

// Fix Leaflet icon paths
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

// Asia bounds: users cannot pan outside Asia
const asiaBounds: L.LatLngBoundsExpression = [
  [-11, 95],  // SW: Indonesia/Malaysia
  [46, 146]   // NE: Japan/Siberia border
];

const fastChargerIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="background:#059669;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);">⚡</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

const medChargerIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="background:#2563EB;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);">🔌</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -18],
});

interface StationData {
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

interface MapContentProps {
  stations: StationData[];
  height: string;
}

export default function MapContent({ stations, height }: MapContentProps) {
  // Calculate bounds
  const bounds = useMemo(() => {
    if (stations.length === 0) return undefined;
    const lats = stations.map(s => s.latitude);
    const lngs = stations.map(s => s.longitude);
    const southWest: [number, number] = [Math.min(...lats) - 2, Math.min(...lngs) - 2];
    const northEast: [number, number] = [Math.max(...lats) + 2, Math.max(...lngs) + 2];
    return [southWest, northEast] as [[number, number], [number, number]];
  }, [stations]);

  return (
    <div style={{ height, width: '100%', borderRadius: '0.75rem', overflow: 'hidden' }}>
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [30, 30] }}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        maxBounds={asiaBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={station.chargerSpeed >= 150 ? fastChargerIcon : medChargerIcon}
          >
            <Popup>
              <div className="min-w-[200px]">
                <Link href={`/station/${station.id}`} className="font-semibold text-sm text-sky-600 hover:underline">
                  {station.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{station.city}, {station.country}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {station.chargerTypes.map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-sky-50 text-sky-700 rounded text-[10px] font-medium">{t}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-1">{station.chargerSpeed}kW · Reliability {station.reliability}/5</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
