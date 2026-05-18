'use client';

import { useEffect, useState, useCallback } from 'react';
import { Zap, Sparkles, ExternalLink, MapPin, Building2, CarFront } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────

interface FlywheelLink {
  name: string;
  city: string;
  url: string;
}

interface FlywheelIndex {
  ev: Record<string, FlywheelLink>;
  luxury: Record<string, FlywheelLink>;
  family: Record<string, FlywheelLink>;
}

interface FlywheelConnect {
  related_ev_station_id?: string | string[] | null;
  related_luxury_stay_id?: string | string[] | null;
  related_family_activity_id?: string | string[] | null;
}

interface FlywheelWidgetProps {
  name: string;
  city: string;
  flywheel_connect?: FlywheelConnect | null;
}

// ─── Platform Branding ──────────────────────────────────────────

function EvCard({ station, city }: { station: FlywheelLink; city: string }) {
  return (
    <a
      href={station.url}
      target="_blank"
      rel="nofollow noopener"
      className="flex items-center gap-3 px-4 py-3 bg-emerald-50/80 border border-emerald-200/60 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.98]"
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Zap size={16} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-emerald-800">Nearest EV Charger</p>
        <p className="text-xs text-gray-600 truncate">
          {station.name} — {station.city}
        </p>
        <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
          Part of the EV Charging Asia network →
        </p>
      </div>
      <ExternalLink size={14} className="text-emerald-400 flex-shrink-0" />
    </a>
  );
}

function LuxuryCard({ stay, city }: { stay: FlywheelLink; city: string }) {
  return (
    <a
      href={stay.url}
      target="_blank"
      rel="nofollow noopener"
      className="flex items-center gap-3 px-4 py-3 bg-purple-50/80 border border-purple-200/60 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.98]"
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Sparkles size={16} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-purple-800">Luxury Upgrade</p>
        <p className="text-xs text-gray-600 truncate">
          {stay.name} — {stay.city}
        </p>
        <p className="text-[10px] text-purple-600 font-medium mt-0.5">
          Top-rated on Luxury Family Travel →
        </p>
      </div>
      <ExternalLink size={14} className="text-purple-400 flex-shrink-0" />
    </a>
  );
}

function FamilyCard({ link, city }: { link: FlywheelLink; city: string }) {
  return (
    <a
      href={link.url}
      className="flex items-center gap-3 px-4 py-3 bg-sky-50/80 border border-sky-200/60 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.98]"
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Building2 size={16} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-sky-800">Also in {city}</p>
        <p className="text-xs text-gray-600 truncate">{link.name}</p>
      </div>
      <ExternalLink size={14} className="text-sky-400 flex-shrink-0" />
    </a>
  );
}

// ─── Component ──────────────────────────────────────────────────

export default function FlywheelWidget({ name, city, flywheel_connect }: FlywheelWidgetProps) {
  const [index, setIndex] = useState<FlywheelIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/flywheel-index.json')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load flywheel index');
        return r.json();
      })
      .then(data => {
        setIndex(data as FlywheelIndex);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Collect resolved links
  const evLinks: FlywheelLink[] = [];
  const luxuryLinks: FlywheelLink[] = [];
  const familyLinks: FlywheelLink[] = [];

  if (index && flywheel_connect) {
    // EV
    const evIds = flywheel_connect.related_ev_station_id;
    if (evIds) {
      const ids = Array.isArray(evIds) ? evIds : [evIds];
      ids.forEach(id => {
        const link = index.ev[id];
        if (link) evLinks.push(link);
      });
    }

    // Luxury
    const luxIds = flywheel_connect.related_luxury_stay_id;
    if (luxIds) {
      const ids = Array.isArray(luxIds) ? luxIds : [luxIds];
      ids.forEach(id => {
        const link = index.luxury[id];
        if (link) luxuryLinks.push(link);
      });
    }

    // Family
    const famIds = flywheel_connect.related_family_activity_id;
    if (famIds) {
      const ids = Array.isArray(famIds) ? famIds : [famIds];
      ids.forEach(id => {
        const link = index.family[id];
        if (link && link.name && !link.name.includes(name)) familyLinks.push(link);
      });
    }
  }

  const hasAny = evLinks.length > 0 || luxuryLinks.length > 0 || familyLinks.length > 0;

  if (loading) return null;
  if (error) return null;
  if (!hasAny) return null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-50/80 border border-gray-200/70 rounded-2xl p-5 mb-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CarFront size={16} className="text-gray-600" />
        <h3 className="font-semibold text-gray-900 text-sm">Explore More Around {city}</h3>
        <span className="text-[10px] text-gray-400 ml-auto uppercase tracking-wider">Cross-Directory</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* EV station links */}
        {evLinks.slice(0, 2).map(s => (
          <EvCard key={`ev-${s.url}`} station={s} city={city} />
        ))}

        {/* Luxury stay links */}
        {luxuryLinks.slice(0, 2).map(s => (
          <LuxuryCard key={`lux-${s.url}`} stay={s} city={city} />
        ))}

        {/* Family cross-links */}
        {familyLinks.slice(0, 3).map(s => (
          <FamilyCard key={`fam-${s.url}`} link={s} city={city} />
        ))}
      </div>
    </div>
  );
}
