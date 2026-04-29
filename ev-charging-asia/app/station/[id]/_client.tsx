'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Zap, MapPin, Star, ChevronLeft, Phone, Globe, Clock, BatteryCharging, Car, ExternalLink, Share2, Flag, CheckCircle, XCircle, AlertTriangle, Clock as ClockIcon } from 'lucide-react';
import { Station, computeStationScore, scoreTier } from '@/lib/scoring';
import EvMapContainer from '@/components/EvMapContainer';
import StationCard from '@/components/StationCard';

const CHARGER_ICONS: Record<string, string> = { 'CCS2': '🔌', 'CHAdeMO': '⚡', 'Type 2': '🔋', 'GB/T': '🇨🇳', 'NACS': '🔌' };

interface CheckIn {
  id: string;
  stationId: string;
  status: 'working' | 'broken' | 'occupied' | 'iced';
  timestamp: string;
  reporter: string;
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  working: <CheckCircle size={14} className="text-emerald-500" />,
  broken: <XCircle size={14} className="text-red-500" />,
  occupied: <ClockIcon size={14} className="text-amber-500" />,
  iced: <AlertTriangle size={14} className="text-orange-500" />,
};

const STATUS_LABELS: Record<string, string> = {
  working: 'Working',
  broken: 'Broken',
  occupied: 'Occupied',
  iced: 'ICEd (ICE car parked)',
};

function getCheckIns(stationId: string): CheckIn[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`checkins-${stationId}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCheckIn(stationId: string, checkin: CheckIn) {
  const existing = getCheckIns(stationId);
  const updated = [checkin, ...existing].slice(0, 20);
  localStorage.setItem(`checkins-${stationId}`, JSON.stringify(updated));
}

function computeAdjustedReliability(baseReliability: number, stationId: string): number {
  const checkins = getCheckIns(stationId);
  const recentBroken = checkins.filter(c =>
    c.status === 'broken' &&
    Date.now() - new Date(c.timestamp).getTime() < 7 * 24 * 60 * 60 * 1000
  ).length;
  if (recentBroken >= 5) return Math.max(baseReliability - 1.5, 1);
  if (recentBroken >= 3) return Math.max(baseReliability - 1.0, 1);
  if (recentBroken >= 1) return Math.max(baseReliability - 0.3, 1);
  return baseReliability;
}

export default function ClientStationPage({ station, allStations }: { station: Station; allStations: Station[] }) {
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportStatus, setReportStatus] = useState<'working' | 'broken' | 'occupied' | 'iced' | null>(null);
  const [reporterName, setReporterName] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const adjustedReliability = useMemo(() => {
    let base = station.reliability;
    return computeAdjustedReliability(base, station.id);
  }, [station, checkins]);

  useEffect(() => {
    setCheckins(getCheckIns(station.id));
  }, [station.id]);

  const score = computeStationScore({ ...station, reliability: adjustedReliability });
  const tier = scoreTier(score);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: station.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleReport = () => {
    if (!reportStatus) return;
    const checkin: CheckIn = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      stationId: station.id,
      status: reportStatus,
      timestamp: new Date().toISOString(),
      reporter: reporterName || 'Anonymous',
    };
    saveCheckIn(station.id, checkin);
    setCheckins(prev => [checkin, ...prev]);
    setReportSubmitted(true);
    setReportStatus(null);
    setReporterName('');
    setTimeout(() => {
      setShowReportForm(false);
      setReportSubmitted(false);
    }, 2000);
  };

  const recentCheckins = checkins.slice(0, 5);
  const brokenCount = checkins.filter(c => c.status === 'broken' && Date.now() - new Date(c.timestamp).getTime() < 7 * 24 * 60 * 60 * 1000).length;

  const amenities = [
    { label: 'Restroom Nearby', icon: MapPin, active: station.hasRestroomNearby },
    { label: 'Food Nearby', icon: MapPin, active: station.hasFoodNearby },
    { label: 'Covered Parking', icon: Car, active: station.hasCoveredParking },
    { label: 'Open 24/7', icon: Clock, active: station.has24by7Access },
    { label: 'Mall Parking', icon: MapPin, active: station.isMallParking },
  ];

  const nearbyStations = useMemo(() => {
    return allStations.filter(s => s.id !== station.id && (s.city === station.city || s.country === station.country)).slice(0, 4);
  }, [station, allStations]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={handleShare} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <Share2 size={14} /> Share
            </button>
            <Link href="/search" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <ChevronLeft size={14} /> Back
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link> <span>/</span>
          <Link href="/search" className="hover:text-gray-700">Search</Link> <span>/</span>
          <span className="text-gray-900 font-medium">{station.name}</span>
        </div>

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/70 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{station.name}</h1>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tier.color}`}>{tier.label}</span>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin size={14} /> {station.address} &middot; {station.city}, {station.country}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600">{score}</div>
                <div className="text-xs text-gray-500">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{Math.round(adjustedReliability * 20)}</div>
                <div className="text-xs text-gray-500">Reliability</div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{station.description}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Charger Specs</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><BatteryCharging size={16} className="text-sky-500" /><span className="text-gray-600">Max Speed: <strong>{station.chargerSpeed}kW</strong></span></div>
                <div className="flex items-center gap-2"><Zap size={16} className="text-amber-500" /><span className="text-gray-600">Ports: <strong>{station.chargerCount}</strong></span></div>
                <div className="flex items-center gap-2"><Star size={16} className="text-amber-400" /><span className="text-gray-600">Reliability: <strong>{adjustedReliability.toFixed(1)}/5</strong> {brokenCount > 0 && <span className="text-red-500">({brokenCount} recent broken)</span>}</span></div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Connector Types</h3>
              <div className="flex flex-wrap gap-2">
                {station.chargerTypes.map(type => (
                  <span key={type} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-100">
                    {CHARGER_ICONS[type] || '🔋'} {type}
                    <span className="text-[10px] text-sky-400 ml-0.5">· {Math.round(station.chargerCount / station.chargerTypes.length)} port{(station.chargerCount / station.chargerTypes.length) > 1 ? 's' : ''}</span>
                  </span>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mt-4">Payment</h3>
              <div className="flex flex-wrap gap-1.5">
                {station.paymentMethods.map(p => (
                  <span key={p} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{p}</span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Operator</h3>
              <p className="text-sm text-gray-700">{station.operator}</p>
              {station.phone && (
                <a href={`tel:${station.phone}`} className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700">
                  <Phone size={14} /> {station.phone}
                </a>
              )}
              {station.website && (
                <a href={station.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700">
                  <Globe size={14} /> Website <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Amenities (small section, not prominent) */}
          {amenities.filter(a => a.active).length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {amenities.filter(a => a.active).map((a, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs border border-emerald-200">
                    <a.icon size={12} />
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status Check-ins Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/70 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Real-Time Status</h2>
            <button onClick={() => { setShowReportForm(!showReportForm); setReportSubmitted(false); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              <Flag size={14} /> Report Status
            </button>
          </div>

          {/* Report form */}
          {showReportForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              {reportSubmitted ? (
                <div className="text-center py-4">
                  <CheckCircle size={24} className="mx-auto text-emerald-500 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Thanks for the report!</p>
                  <p className="text-xs text-gray-500">Your check-in helps other drivers.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">What&apos;s the status?</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(['working', 'broken', 'occupied', 'iced'] as const).map(status => (
                      <button key={status} onClick={() => setReportStatus(status)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                          reportStatus === status
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}>
                        {STATUS_ICONS[status]}
                        {STATUS_LABELS[status]}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={reporterName} onChange={(e) => setReporterName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    <button onClick={handleReport} disabled={!reportStatus}
                      className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Last 5 check-ins */}
          {recentCheckins.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No check-ins yet. Be the first to report!</p>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Last {recentCheckins.length} check-in{recentCheckins.length !== 1 ? 's' : ''}</h3>
              <div className="space-y-2">
                {recentCheckins.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                      {STATUS_ICONS[c.status]}
                      <span className="text-sm font-medium text-gray-700">{STATUS_LABELS[c.status]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{c.reporter}</span>
                      <span>{new Date(c.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Map */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/70 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100"><h2 className="text-lg font-bold text-gray-900">Location</h2></div>
          <EvMapContainer stations={[station]} height="350px" />
        </div>

        {/* Score Breakdown */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/70 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Score Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">
                {station.chargerSpeed >= 150 ? '🟢' : station.chargerSpeed >= 50 ? '🔵' : '⚪'}
              </div>
              <div className="text-xs text-gray-500">{station.chargerSpeed}kW Speed</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{Math.round(adjustedReliability * 20)}</div>
              <div className="text-xs text-gray-500">Reliability {brokenCount > 0 && <span className="text-red-400">({brokenCount} broken)</span>}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{Math.round((station.locationConvenience / 5) * 100)}</div>
              <div className="text-xs text-gray-500">Location Convenience</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">
                {Math.round(([station.hasRestroomNearby, station.hasFoodNearby, station.hasCoveredParking, station.has24by7Access, station.isMallParking].filter(Boolean).length / 5) * 100)}
              </div>
              <div className="text-xs text-gray-500">Amenities</div>
            </div>
          </div>
        </div>

        {/* Nearby Stations */}
        {nearbyStations.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Nearby Stations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyStations.map(s => <StationCard key={s.id} station={s} />)}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Zap size={16} className="text-green-500" />
            <span className="text-sm">EV Charging Asia</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/about" className="hover:text-gray-600">About</Link>
            <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
