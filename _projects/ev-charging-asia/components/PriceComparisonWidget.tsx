'use client';

import { FC, useState } from 'react';
import { DollarSign, ChevronDown, ChevronUp, BatteryCharging, Info } from 'lucide-react';
import { ChargingCostData } from '@/lib/affiliate-links';

interface PriceComparisonWidgetProps {
  costs: ChargingCostData[];
  selectedCountry?: string;
}

/**
 * Price comparison widget showing charging costs across Asian countries.
 * Shows real-time USD/kWh comparisons with AC/DC breakdowns.
 */
const PriceComparisonWidget: FC<PriceComparisonWidgetProps> = ({ costs, selectedCountry }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  if (!costs || costs.length === 0) return null;

  const sorted = [...costs].sort((a, b) => a.costPerKwh - b.costPerKwh);
  const displayed = showAll ? sorted : sorted.slice(0, 5);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  // Highlight selected country if provided
  const selectedCost = selectedCountry ? costs.find(c => c.country === selectedCountry) : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-emerald-500" />
          <span className="text-sm font-semibold text-gray-900">Charging Cost Comparison</span>
          {selectedCost && (
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              {selectedCost.country}: {selectedCost.symbol}{selectedCost.costPerKwh.toFixed(2)}/kWh
            </span>
          )}
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in border-t border-gray-100 pt-3">
          {/* Summary */}
          <div className="flex items-center gap-4 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <BatteryCharging size={14} className="text-sky-500" />
            <span>
              Cheapest: <strong className="text-emerald-600">{cheapest.country}</strong> ({cheapest.symbol}{cheapest.costPerKwh.toFixed(2)}/kWh)
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">
              Most expensive: <strong className="text-red-600">{mostExpensive.country}</strong> ({mostExpensive.symbol}{mostExpensive.costPerKwh.toFixed(2)}/kWh)
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-3 font-semibold text-gray-500">Country</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-500">Avg (USD)</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-500">Slow AC</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-500">Fast DC</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-500">Ultra Fast</th>
                  <th className="text-right py-2 pl-3 font-semibold text-gray-500">Range</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((cost) => {
                  const avgWidth = (cost.costPerKwh / mostExpensive.costPerKwh) * 100;
                  const isSelected = selectedCost?.country === cost.country;
                  return (
                    <tr key={cost.country} className={`border-b border-gray-50 hover:bg-gray-50 ${isSelected ? 'bg-amber-50/50' : ''}`}>
                      <td className="py-2 pr-3">
                        <span className={`font-medium ${isSelected ? 'text-amber-700' : 'text-gray-700'}`}>
                          {cost.country}
                          {isSelected && <span className="ml-1 text-amber-500">←</span>}
                        </span>
                        <span className="block text-[10px] text-gray-400">{cost.symbol}{cost.costPerKwh.toFixed(2)}/kWh local</span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-emerald-400 rounded-full"
                              style={{ width: `${Math.max(avgWidth, 5)}%` }}
                            />
                          </div>
                          <span className="font-semibold text-gray-900">${cost.costPerKwh.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right text-gray-500">${cost.slowAC.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right text-gray-500">${cost.fastDC.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right text-gray-500">${cost.ultraFast.toFixed(2)}</td>
                      <td className="py-2 pl-3 text-right text-[10px] text-gray-400">
                        ${cost.costRange[0].toFixed(2)}–${cost.costRange[1].toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Show all toggle */}
          {costs.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-sky-600 hover:text-sky-700 font-medium"
            >
              {showAll ? 'Show less' : `Show all ${costs.length} countries`}
            </button>
          )}

          {/* Source */}
          <div className="text-[10px] text-gray-400 flex items-center gap-1">
            <Info size={10} />
            <span>Updated {costs[0]?.updated || 'recently'}. Rates vary by network and time of day. Sources: public EV charging data.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceComparisonWidget;
