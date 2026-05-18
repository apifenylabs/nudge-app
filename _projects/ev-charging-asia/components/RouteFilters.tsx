'use client';

import { Users, Crown, Sparkles, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface RouteFiltersProps {
  familyFriendly: boolean;
  onFamilyFriendlyChange: (v: boolean) => void;
  luxuryOnly: boolean;
  onLuxuryChange: (v: boolean) => void;
  wellnessNearby: boolean;
  onWellnessChange: (v: boolean) => void;
  has24by7Access: boolean;
  on247Change: (v: boolean) => void;
  resultsCount?: number;
  onClearAll?: () => void;
}

export default function RouteFilters({
  familyFriendly, onFamilyFriendlyChange,
  luxuryOnly, onLuxuryChange,
  wellnessNearby, onWellnessChange,
  has24by7Access, on247Change,
  resultsCount, onClearAll,
}: RouteFiltersProps) {
  const [expanded, setExpanded] = useState(true);

  const activeCount = [familyFriendly, luxuryOnly, wellnessNearby, has24by7Access].filter(Boolean).length;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-xs font-semibold text-gray-700 mb-2"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" />
            Smart Filters for Families
            {activeCount > 0 && (
              <span className="bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 text-[10px] font-bold">
                {activeCount} active
              </span>
            )}
          </span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {expanded && (
          <div className="animate-fade-in space-y-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onFamilyFriendlyChange(!familyFriendly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  familyFriendly
                    ? 'bg-pink-100 text-pink-700 border-pink-300 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
                }`}
              >
                <Users size={14} className={familyFriendly ? 'text-pink-500' : ''} />
                With kids under 10
                <span className="text-[10px] text-gray-400 ml-1">
                  (restroom + food + parking)
                </span>
              </button>

              <button
                onClick={() => onLuxuryChange(!luxuryOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  luxuryOnly
                    ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                }`}
              >
                <Crown size={14} className={luxuryOnly ? 'text-amber-500' : ''} />
                Luxury only
                <span className="text-[10px] text-gray-400 ml-1">
                  (premium stations)
                </span>
              </button>

              <button
                onClick={() => onWellnessChange(!wellnessNearby)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  wellnessNearby
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-300 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                }`}
              >
                <Sparkles size={14} className={wellnessNearby ? 'text-emerald-500' : ''} />
                Wellness recovery stops
                <span className="text-[10px] text-gray-400 ml-1">
                  (near spa/hotel areas)
                </span>
              </button>

              <button
                onClick={() => on247Change(!has24by7Access)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  has24by7Access
                    ? 'bg-sky-100 text-sky-700 border-sky-300 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-sky-300'
                }`}
              >
                <Clock size={14} className={has24by7Access ? 'text-sky-500' : ''} />
                24/7 Access
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400">
                {resultsCount !== undefined ? `${resultsCount} stations match` : 'Apply filters to find the perfect stops'}
              </span>
              {activeCount > 0 && onClearAll && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-sky-600 hover:text-sky-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
