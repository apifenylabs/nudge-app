'use client';

import { FC, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// ─── Types ──────────────────────────────────────────────────────

export interface StopLocation {
  lat: number;
  lng: number;
  name: string;
  city: string;
}

interface RangeMapProps {
  origin: { lat: number; lng: number; name: string };
  destination: { lat: number; lng: number; name: string };
  stops: StopLocation[];
  height?: string;
}

// ─── Fix Leaflet default icon paths ────────────────────────────

const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });
}

// ─── Asia bounds ────────────────────────────────────────────────

const asiaBounds: L.LatLngBoundsExpression = [
  [-11, 95],
  [46, 146],
];

// ─── Custom Icons ──────────────────────────────────────────────

const originIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:36px;height:36px;border-radius:50%;
    background:#059669;color:white;
    display:flex;align-items:center;justify-content:center;
    font-size:16px;font-weight:bold;
    border:3px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
  ">A</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -22],
});

const destIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:36px;height:36px;border-radius:50%;
    background:#DC2626;color:white;
    display:flex;align-items:center;justify-content:center;
    font-size:16px;font-weight:bold;
    border:3px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
  ">B</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -22],
});

const chargeIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:30px;height:30px;border-radius:50%;
    background:#2563EB;color:white;
    display:flex;align-items:center;justify-content:center;
    font-size:13px;font-weight:bold;
    border:2px solid white;
    box-shadow:0 2px 6px rgba(0,0,0,0.25);
  ">⚡</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -18],
});

// ─── Component ─────────────────────────────────────────────────

function FitBounds({
  points,
}: {
  points: Array<{ lat: number; lng: number }>;
}) {
  const map = useMap();
  useEffect(() => {
    if (points.length < 2) return;
    const ll = points.map(p => L.latLng(p.lat, p.lng));
    const bounds = L.latLngBounds(ll);
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 10 });
    }
  }, [points, map]);
  return null;
}

const RangeMap: FC<RangeMapProps> = ({
  origin,
  destination,
  stops,
  height = '400px',
}) => {
  const allPoints = useMemo(() => {
    const pts = [{ lat: origin.lat, lng: origin.lng }];
    for (const s of stops) pts.push({ lat: s.lat, lng: s.lng });
    pts.push({ lat: destination.lat, lng: destination.lng });
    return pts;
  }, [origin, destination, stops]);

  return (
    <div
      style={{ height, width: '100%', borderRadius: '0.75rem', overflow: 'hidden' }}
      className="border border-gray-200 dark:border-gray-700"
    >
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        maxBounds={asiaBounds}
        maxBoundsViscosity={1.0}
        center={[origin.lat, origin.lng]}
        zoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds points={allPoints} />

        {/* Route line */}
        <Polyline
          positions={allPoints.map(p => [p.lat, p.lng])}
          pathOptions={{
            color: '#059669',
            weight: 4,
            opacity: 0.7,
            dashArray: '8 6',
          }}
        />

        {/* Origin marker */}
        <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
          <Popup>
            <div className="text-sm font-medium">
              <span className="text-emerald-600">Start:</span>{' '}
              {origin.name}
            </div>
          </Popup>
        </Marker>

        {/* Destination marker */}
        <Marker position={[destination.lat, destination.lng]} icon={destIcon}>
          <Popup>
            <div className="text-sm font-medium">
              <span className="text-red-600">Destination:</span>{' '}
              {destination.name}
            </div>
          </Popup>
        </Marker>

        {/* Charging stop markers */}
        {stops.map((stop, idx) => (
          <Marker
            key={`stop-${idx}`}
            position={[stop.lat, stop.lng]}
            icon={chargeIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{stop.name}</p>
                <p className="text-gray-500 text-xs">{stop.city}</p>
                <p className="text-blue-600 text-xs mt-1">
                  ⚡ Charging Stop #{idx + 1}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RangeMap;
