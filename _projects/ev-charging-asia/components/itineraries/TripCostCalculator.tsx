'use client';

import { useState, useMemo } from 'react';
import { DollarSign, BatteryCharging, Car, Calculator, ArrowRight, Info, Zap } from 'lucide-react';

interface TripCostCalculatorProps {
  totalDistanceKm: number;
  totalDrivingHours: number;
  estimatedChargingStops: number;
  countries: string[];
  /** Base EV consumption in kWh/100km (default: 18 for typical SUV/sedan) */
  baseConsumptionKwhPer100km?: number;
}

/**
 * Country-specific average electricity costs for EV charging (USD/kWh)
 * Sources: GlobalPetrolPrices.com, local EV network rates (2025-2026)
 */
const COUNTRY_RATES: Record<string, { public: number; home: number; currency: string; symbol: string }> = {
  'Thailand': { public: 0.18, home: 0.12, currency: 'THB', symbol: '฿' },
  'Malaysia': { public: 0.15, home: 0.08, currency: 'MYR', symbol: 'RM' },
  'Singapore': { public: 0.32, home: 0.22, currency: 'SGD', symbol: 'S$' },
  'Indonesia': { public: 0.20, home: 0.12, currency: 'IDR', symbol: 'Rp' },
  'Vietnam': { public: 0.14, home: 0.09, currency: 'VND', symbol: '₫' },
  'Japan': { public: 0.28, home: 0.22, currency: 'JPY', symbol: '¥' },
  'China': { public: 0.12, home: 0.08, currency: 'CNY', symbol: '¥' },
  'Hong Kong': { public: 0.25, home: 0.18, currency: 'HKD', symbol: 'HK$' },
  'India': { public: 0.16, home: 0.10, currency: 'INR', symbol: '₹' },
  'South Korea': { public: 0.22, home: 0.15, currency: 'KRW', symbol: '₩' },
  'Philippines': { public: 0.24, home: 0.16, currency: 'PHP', symbol: '₱' },
  'Macau': { public: 0.22, home: 0.15, currency: 'MOP', symbol: 'MOP$' },
};

const CAR_MODELS = [
  { name: 'Tesla Model 3 (Standard)', consumption: 14, battery: 60 },
  { name: 'Tesla Model 3 (Long Range)', consumption: 15, battery: 75 },
  { name: 'Tesla Model Y', consumption: 16, battery: 75 },
  { name: 'BYD Atto 3', consumption: 17, battery: 50 },
  { name: 'BYD Dolphin', consumption: 13, battery: 45 },
  { name: 'BYD Seal', consumption: 15, battery: 82 },
  { name: 'MG4 Electric', consumption: 16, battery: 51 },
  { name: 'Neta V', consumption: 15, battery: 38 },
  { name: 'Ora Good Cat', consumption: 14, battery: 48 },
  { name: 'Hyundai Ioniq 5', consumption: 17, battery: 58 },
  { name: 'Hyundai Kona Electric', consumption: 16, battery: 48 },
  { name: 'Kia EV6', consumption: 17, battery: 58 },
  { name: 'Kia Niro EV', consumption: 16, battery: 64 },
  { name: 'Nissan Leaf', consumption: 17, battery: 40 },
  { name: 'Nissan Sakura', consumption: 12, battery: 20 },
  { name: 'VinFast VF 8', consumption: 20, battery: 82 },
  { name: 'VinFast VF 9', consumption: 22, battery: 100 },
  { name: 'XPeng G6', consumption: 16, battery: 66 },
  { name: 'NIO ET5', consumption: 16, battery: 75 },
  { name: 'Custom (enter values)', consumption: 18, battery: 60 },
];

const TOLL_RATES: Record<string, { per100km: number; currency: string; symbol: string }> = {
  'Thailand': { per100km: 2.50, currency: 'THB', symbol: '฿' },
  'Malaysia': { per100km: 3.00, currency: 'MYR', symbol: 'RM' },
  'Singapore': { per100km: 1.50, currency: 'SGD', symbol: 'S$' },
  'Indonesia': { per100km: 1.00, currency: 'IDR', symbol: 'Rp' },
  'Vietnam': { per100km: 1.80, currency: 'VND', symbol: '₫' },
  'Japan': { per100km: 8.00, currency: 'JPY', symbol: '¥' },
  'China': { per100km: 4.00, currency: 'CNY', symbol: '¥' },
  'Hong Kong': { per100km: 3.00, currency: 'HKD', symbol: 'HK$' },
  'India': { per100km: 1.50, currency: 'INR', symbol: '₹' },
  'South Korea': { per100km: 5.00, currency: 'KRW', symbol: '₩' },
  'Philippines': { per100km: 1.50, currency: 'PHP', symbol: '₱' },
};

export default function TripCostCalculator({
  totalDistanceKm,
  totalDrivingHours,
  estimatedChargingStops,
  countries,
  baseConsumptionKwhPer100km = 18,
}: TripCostCalculatorProps) {
  const [selectedCar, setSelectedCar] = useState('Tesla Model 3 (Standard)');
  const [customConsumption, setCustomConsumption] = useState(18);
  const [customBattery, setCustomBattery] = useState(60);
  const [isCustom, setIsCustom] = useState(false);

  const handleCarChange = (name: string) => {
    setSelectedCar(name);
    if (name === 'Custom (enter values)') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      const model = CAR_MODELS.find(m => m.name === name);
      if (model) {
        setCustomConsumption(model.consumption);
        setCustomBattery(model.battery);
      }
    }
  };

  const results = useMemo(() => {
    const consumption = isCustom ? customConsumption : (CAR_MODELS.find(m => m.name === selectedCar)?.consumption || baseConsumptionKwhPer100km);
    const battery = isCustom ? customBattery : (CAR_MODELS.find(m => m.name === selectedCar)?.battery || 60);

    // Primary country for rates
    const primaryCountry = countries[0] || 'Thailand';
    const rate = COUNTRY_RATES[primaryCountry] || COUNTRY_RATES['Thailand'];
    const toll = TOLL_RATES[primaryCountry] || TOLL_RATES['Thailand'];

    // Total energy needed
    const totalKwh = (totalDistanceKm / 100) * consumption;

    // Charging sessions
    const effectiveRange = (battery / consumption) * 100 * 0.85; // 85% usable to be safe
    const chargingSessions = Math.max(estimatedChargingStops, Math.ceil(totalDistanceKm / effectiveRange));

    // Cost scenarios
    const costPublic = totalKwh * rate.public;
    const costHome = totalKwh * rate.home;
    const costMixed = totalKwh * ((rate.public * 0.6) + (rate.home * 0.4));

    // Toll estimate
    const tollCost = (totalDistanceKm / 100) * toll.per100km;

    // Time spent charging
    const avgChargeRate = 100; // kW average (mix of 50-350kW)
    const chargeTimeHours = (totalKwh / chargingSessions) / avgChargeRate * chargingSessions;

    // Total estimate
    const avgCost = costMixed + tollCost;
    const costPerKm = avgCost / totalDistanceKm;

    return {
      consumption,
      battery,
      totalKwh,
      effectiveRange: Math.round(effectiveRange),
      chargingSessions,
      costPublic: Math.round(costPublic * 100) / 100,
      costHome: Math.round(costHome * 100) / 100,
      costMixed: Math.round(costMixed * 100) / 100,
      tollCost: Math.round(tollCost * 100) / 100,
      totalEstimated: Math.round(avgCost * 100) / 100,
      costPerKm: Math.round(costPerKm * 100) / 100,
      chargeTimeHours: Math.round(chargeTimeHours * 10) / 10,
      rate,
      toll,
      primaryCountry,
    };
  }, [totalDistanceKm, estimatedChargingStops, countries, selectedCar, isCustom, customConsumption, customBattery, baseConsumptionKwhPer100km]);

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header with toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <Calculator size={16} className="text-emerald-600" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-gray-900">Trip Cost Calculator</h3>
            <p className="text-xs text-gray-500">
              {results.primaryCountry}: ~{results.totalEstimated} {results.rate.currency} total ({results.rate.symbol}{results.costPerKm}/km)
            </p>
          </div>
        </div>
        <div className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
          <ArrowRight size={16} className="text-gray-400" />
        </div>
      </button>

      {expanded && (
        <div className="px-4 md:px-5 pb-5 border-t border-gray-100 pt-4">
          {/* Car selector */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block flex items-center gap-1.5">
              <Car size={12} /> Your EV Model
            </label>
            <select
              value={selectedCar}
              onChange={(e) => handleCarChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            >
              {CAR_MODELS.map(m => (
                <option key={m.name} value={m.name}>{m.name} ({m.consumption} kWh/100km, {m.battery} kWh)</option>
              ))}
            </select>
          </div>

          {/* Custom consumption fields */}
          {isCustom && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Consumption (kWh/100km)</label>
                <input
                  type="number"
                  value={customConsumption}
                  onChange={e => setCustomConsumption(Number(e.target.value))}
                  min={8}
                  max={40}
                  step={0.5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Battery (kWh)</label>
                <input
                  type="number"
                  value={customBattery}
                  onChange={e => setCustomBattery(Number(e.target.value))}
                  min={15}
                  max={150}
                  step={5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Results grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
              <div className="text-xs text-gray-500">Energy Needed</div>
              <div className="text-lg font-bold text-gray-900">{Math.round(results.totalKwh)}</div>
              <div className="text-[10px] text-gray-400">kWh total</div>
            </div>
            <div className="bg-sky-50 rounded-xl p-3 text-center border border-sky-100">
              <div className="text-xs text-gray-500">{results.rate.symbol} Public Charging</div>
              <div className="text-lg font-bold text-gray-900">{(results.costPublic * (results.rate.currency === 'IDR' ? 1 : 1)).toLocaleString()}</div>
              <div className="text-[10px] text-gray-400">{results.rate.currency} @ {(results.rate.symbol)}{results.rate.public}/kWh</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
              <div className="text-xs text-gray-500">{results.toll.symbol} Tolls</div>
              <div className="text-lg font-bold text-gray-900">{Math.round(results.tollCost)}</div>
              <div className="text-[10px] text-gray-400">{results.rate.currency} estimate</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100">
              <div className="text-xs text-gray-500">Charging Sessions</div>
              <div className="text-lg font-bold text-gray-900">{results.chargingSessions}</div>
              <div className="text-[10px] text-gray-400">~{results.chargeTimeHours}h total</div>
            </div>
          </div>

          {/* Detailed breakdown */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
              <Info size={12} /> Cost Breakdown
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>⚡ Energy ({results.totalKwh.toFixed(0)} kWh × {results.rate.symbol}{results.rate.public}/kWh public)</span>
                <span className="font-medium">{results.rate.symbol}{results.costPublic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>⚡ Energy ({results.totalKwh.toFixed(0)} kWh × {results.rate.symbol}{results.rate.home}/kWh home)</span>
                <span className="font-medium">{results.rate.symbol}{results.costHome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>🛣️ Tolls ({results.toll.per100km}/100km)</span>
                <span className="font-medium">{results.rate.symbol}{results.tollCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>🔄 Mixed charging (60% public / 40% home)</span>
                <span className="font-medium">{results.rate.symbol}{results.costMixed.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-1.5 flex justify-between text-gray-900 font-bold">
                <span>💰 Estimated Total (mixed + tolls)</span>
                <span>{results.rate.symbol}{results.totalEstimated.toLocaleString()}</span>
              </div>
              <div className="text-[10px] text-gray-400 pt-1">
                {results.rate.symbol}{results.costPerKm}/km · {results.effectiveRange}km effective range · {results.consumption} kWh/100km
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mt-3">
            💡 Estimates based on {results.primaryCountry} average charging rates. Actual costs vary by charging network, season, and driving style.
            Fuel cost comparison: equivalent petrol/diesel trip would cost ~{Math.round(results.totalEstimated * 2.5)} {results.rate.currency} (2.5x more).
          </p>
        </div>
      )}
    </div>
  );
}
