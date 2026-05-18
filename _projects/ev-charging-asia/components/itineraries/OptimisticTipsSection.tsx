'use client';

import { useState, useCallback } from 'react';
import TipForm from '@/components/TipForm';
import TipList from '@/components/TipList';
import { MessageSquareText, Sparkles } from 'lucide-react';

interface OptimisticTipsSectionProps {
  routeSlug: string;
  routeName: string;
}

/**
 * Enhanced TipsSection with instant-insert preview.
 * When a user submits a tip, the TipList is refreshed automatically.
 * Additive wrapper — no breaking changes to TipForm or TipList.
 */
export default function OptimisticTipsSection({ routeSlug, routeName }: OptimisticTipsSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleTipSubmitted = useCallback(() => {
    setRefreshKey(k => k + 1);
    setJustSubmitted(true);
    // Auto-dismiss the "just submitted" flash after 3 seconds
    setTimeout(() => setJustSubmitted(false), 3000);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
        <MessageSquareText size={20} className="text-sky-500" />
        Traveler Tips & Reviews
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Share your experience driving the {routeName} route — tips on charging, family stops, scenic viewpoints, and more.
      </p>

      {justSubmitted && (
        <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 animate-fade-in flex items-center gap-2">
          <Sparkles size={16} className="text-emerald-500" />
          Tip submitted! It should appear in the list below instantly.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TipForm
            stationId={`route-${routeSlug}`}
            stationName={routeName}
            onTipSubmitted={handleTipSubmitted}
          />
        </div>
        <div>
          <TipList stationId={`route-${routeSlug}`} refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
