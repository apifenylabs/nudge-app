'use client';

import { FC } from 'react';
import { Clock, Zap, DollarSign, Route, BatteryCharging, Car, MapPin } from 'lucide-react';
import type { RangeResult, ChargingStop } from '@/lib/range-calculator';
import { affiliateLinks, getAffiliatesForLocation } from '@/lib/affiliate-links';
import AffiliateCTABar from '@/components/AffiliateCTABar';

interface RangeResultCardProps {
  result: RangeResult;
  onReset?: () => void;
}

function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

const RangeResultCard: FC<RangeResultCardProps> = ({ result, onReset }) => {
  const {
    car,
    origin,
    destination,
    batteryPct,
    totalDistanceKm,
    drivingRangeKm,
    stops,
    estimatedChargingTimeMin,
    totalEnergyAddedKwh,
    costEstimateUsd,
    stopCount,
    isFeasible,
    error,
  } = result;

  if (error) {
    return (
      <div className="animate-fade-in bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 mb-3">
          <Zap size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">Calculation Error</h3>
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        {onReset && (
          <button
            onClick={onReset}
            className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (!isFeasible) {
    return (
      <div className="animate-fade-in bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 mb-3">
          <Route size={24} className="text-amber-500" />
        </div>
        <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">Trip Not Feasible</h3>
        <p className="text-amber-600 dark:text-amber-400 text-sm">
          We couldn&apos;t find enough charging stations along this route. Try a different origin or destination.
        </p>
        {onReset && (
          <button
            onClick={onReset}
            className="mt-4 px-4 py-2 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  // Affiliate links based on origin/destination countries
  const relevantLinks = getAffiliatesForLocation(undefined, origin).slice(0, 3);

  return (
    <div className="animate-slide-up space-y-5">
      {/* Trip Summary Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Trip Summary
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {origin} → {destination}
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/80 dark:bg-gray-800/80 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
            <Car size={14} />
            {car.brand} {car.model}
          </div>
        </div>

        {/* Key stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <StatBox
            icon={<Route size={18} className="text-emerald-500" />}
            label="Total Distance"
            value={`${totalDistanceKm.toLocaleString()} km`}
          />
          <StatBox
            icon={<Car size={18} className="text-blue-500" />}
            label="Range (Current)"
            value={`${drivingRangeKm} km`}
            subtext={`${batteryPct}% battery`}
          />
          <StatBox
            icon={<Zap size={18} className="text-amber-500" />}
            label="Charging Stops"
            value={stopCount === 0 ? 'None needed' : `${stopCount} stop${stopCount !== 1 ? 's' : ''}`}
            subtext={stopCount > 0 ? formatMinutes(estimatedChargingTimeMin) : undefined}
          />
          <StatBox
            icon={<DollarSign size={18} className="text-purple-500" />}
            label="Est. Charging Cost"
            value={costEstimateUsd > 0 ? `$${costEstimateUsd.toFixed(2)}` : 'Free (no stops)'}
            subtext={totalEnergyAddedKwh > 0 ? `${Math.round(totalEnergyAddedKwh)} kWh` : undefined}
          />
        </div>
      </div>

      {/* Charging stops detail */}
      {stops.length > 0 && (
        <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <BatteryCharging size={16} className="text-emerald-500" />
            Charging Stop Details
          </h4>

          <div className="space-y-3">
            {stops.map((stop, idx) => (
              <ChargingStopCard key={idx} stop={stop} index={idx} total={stops.length} />
            ))}
          </div>
        </div>
      )}

      {/* No stops needed message */}
      {stops.length === 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-2">
            <BatteryCharging size={20} className="text-emerald-500" />
          </div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            No charging stops needed!
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            Your {car.brand} {car.model} can make this trip on a single charge.
          </p>
        </div>
      )}

      {/* Affiliate CTAs */}
      {relevantLinks.length > 0 && (
        <AffiliateCTABar
          links={relevantLinks}
          title="Plan Your Trip"
          maxDisplay={3}
        />
      )}

      {/* Trip time estimate summary */}
      <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Trip Time Estimate
        </h4>
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <Clock size={16} className="text-gray-400" />
          <span>
            Driving: ~{formatDrivingTime(totalDistanceKm)}
            {estimatedChargingTimeMin > 0 && (
              <> + Charging: {formatMinutes(estimatedChargingTimeMin)}</>
            )}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">
          * Estimates are approximate. Actual range depends on driving style, terrain, weather, traffic, and battery temperature.
        </p>
      </div>
    </div>
  );
};

/** Small stat box used in the grid */
const StatBox: FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}> = ({ icon, label, value, subtext }) => (
  <div className="bg-white/80 dark:bg-gray-800/60 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center gap-1.5 mb-1">
      {icon}
      <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{label}</span>
    </div>
    <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
    {subtext && (
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{subtext}</p>
    )}
  </div>
);

/** Individual charging stop detail card */
const ChargingStopCard: FC<{
  stop: ChargingStop;
  index: number;
  total: number;
}> = ({ stop, index, total }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50">
    {/* Stop number badge */}
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-300">
      {index + 1}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {stop.station.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {stop.station.city}, {stop.station.country} · 
            {stop.station.chargerTypes.join(' / ')}
          </p>
        </div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {stop.distanceFromStartKm.toLocaleString()} km
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
        <span className="text-gray-600 dark:text-gray-300">
          ⚡ {stop.chargeTimeMin} min charge
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {stop.chargeAddedKwh} kWh
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {stop.batteryBeforePct}% → {stop.batteryAfterPct}%
        </span>
      </div>
    </div>
  </div>
);

/** Rough driving time estimate (assume avg 80 km/h) */
function formatDrivingTime(distanceKm: number): string {
  const minutes = Math.round((distanceKm / 80) * 60);
  return formatMinutes(minutes);
}

export default RangeResultCard;
