'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';

// Charging station icon
const chargingIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="background:#7C3AED;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.25);">⚡</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -14],
});

// Fix Leaflet icon paths — wrapped in try/catch to prevent runtime crashes
try {
  const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
  const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
  const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

  if (L?.Icon?.Default?.prototype) {
    try { delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl; } catch { /* already removed in leaflet 1.9+ */ }
    L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });
  }
} catch (e) {
  console.warn('[RouteMapContent] Failed to initialize Leaflet icons:', e);
}

// Asia bounds
const asiaBounds: L.LatLngBoundsExpression = [
  [-11, 95],
  [46, 146],
];

const startIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="background:#059669;color:white;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:bold;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">🚗</div>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
});

const endIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="background:#DC2626;color:white;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:bold;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">🏁</div>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
});

const waypointIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="background:#2563EB;color:white;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:bold;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);">📍</div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -18],
});

interface StationMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  chargerSpeed: number;
  chargerCount: number;
  costPerKwh: number;
  reliability: number;
}

interface RouteMapContentProps {
  routeCoords: [number, number][];
  cityNames: string[];
  height: string;
  stationMarkers?: StationMarker[];
}

export default function RouteMapContent({ routeCoords, cityNames, height, stationMarkers = [] }: RouteMapContentProps) {
  const [showStations, setShowStations] = useState(true);
  // Calculate bounds from the route
  const bounds = useMemo(() => {
    if (routeCoords.length === 0) return undefined;
    const lats = routeCoords.map(c => c[0]);
    const lngs = routeCoords.map(c => c[1]);
    const southWest: [number, number] = [Math.min(...lats) - 0.5, Math.min(...lngs) - 0.5];
    const northEast: [number, number] = [Math.max(...lats) + 0.5, Math.max(...lngs) + 0.5];
    return [southWest, northEast] as [[number, number], [number, number]];
  }, [routeCoords]);

  if (routeCoords.length === 0) {
    return (
      <div className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm" style={{ height }}>
        Route map coordinates not available
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%', borderRadius: '0.75rem', overflow: 'hidden' }}>
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [40, 40] }}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        maxBounds={asiaBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Legend toggle */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '48px',
          zIndex: 1000,
          background: 'white',
          padding: '6px 10px',
          borderRadius: '8px',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)',
          fontSize: '11px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        onClick={() => setShowStations(!showStations)}
        title={showStations ? 'Hide charging stations' : 'Show charging stations'}
      >
        <span style={{ fontSize: '14px' }}>⚡</span>
        <span style={{ color: showStations ? '#7C3AED' : '#9CA3AF', fontWeight: showStations ? 600 : 400 }}>
          {stationMarkers.length} Stations
        </span>
      </div>

        {/* Route polyline */}
        <Polyline
          positions={routeCoords}
          pathOptions={{
            color: '#059669',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 6',
          }}
        />

        {/* Connecting line segments with directional arrows */}
        {routeCoords.slice(0, -1).map((start, i) => {
          const end = routeCoords[i + 1];
          return (
            <Polyline
              key={`segment-${i}`}
              positions={[start, end]}
              pathOptions={{
                color: '#10B981',
                weight: 3,
                opacity: 0.5,
              }}
            />
          );
        })}

        {/* Charging station markers (within route bounding box) */}
        {showStations && stationMarkers.map((station) => (
          <CircleMarker
            key={station.id}
            center={[station.lat, station.lng]}
            radius={5 + Math.min(station.chargerCount, 10) * 0.8}
            pathOptions={{
              color: '#7C3AED',
              fillColor: '#7C3AED',
              fillOpacity: 0.6,
              weight: 1.5,
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">⚡</span>
                  <span className="font-semibold text-gray-900 text-sm">{station.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-gray-600">
                  <span>Speed: {station.chargerSpeed}kW</span>
                  <span>Ports: {station.chargerCount}</span>
                  <span>Cost: ${station.costPerKwh.toFixed(2)}/kWh</span>
                  <span>Reliability: {'★'.repeat(Math.round(station.reliability))}{'☆'.repeat(5 - Math.round(station.reliability))}</span>
                </div>
                <Link
                  href={`/station/${station.id}`}
                  className="mt-2 inline-block text-xs text-purple-600 hover:text-purple-700 font-medium"
                >
                  View details →
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* City markers */}
        {routeCoords.map((coord, i) => {
          const isStart = i === 0;
          const isEnd = i === routeCoords.length - 1;
          const cityName = cityNames[i] || `Stop ${i + 1}`;

          return (
            <Marker
              key={`marker-${i}`}
              position={coord}
              icon={isStart ? startIcon : isEnd ? endIcon : waypointIcon}
            >
              <Popup>
                <div className="min-w-[150px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{isStart ? '🚗 Start' : isEnd ? '🏁 End' : '📍 Stop'}</span>
                    <span className="font-semibold text-gray-900">{cityName}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Stop {i + 1} of {routeCoords.length}
                  </p>
                  {i < routeCoords.length - 1 && (
                    <p className="text-xs text-emerald-600 mt-1">
                      → Next: {cityNames[i + 1]}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
