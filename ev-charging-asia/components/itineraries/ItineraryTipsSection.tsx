'use client';

import { useState } from 'react';
import TipForm from '@/components/TipForm';
import TipList from '@/components/TipList';
import { MessageSquareText } from 'lucide-react';

interface ItineraryTipsSectionProps {
  routeSlug: string;
  routeName: string;
}

/**
 * Client-side wrapper that integrates the TipForm and TipList components
 * into the server-rendered itinerary detail page.
 * Additive — no breaking changes.
 */
export default function ItineraryTipsSection({ routeSlug, routeName }: ItineraryTipsSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <MessageSquareText size={20} className="text-sky-500" />
        Traveler Tips & Reviews
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Share your experience driving the {routeName} route — tips on charging, family stops, scenic viewpoints, and more.
      </p>

      {/* Sub-tips for the route, using routeSlug as a virtual "stationId" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TipForm stationId={`route-${routeSlug}`} stationName={routeName} onTipSubmitted={() => setRefreshKey(k => k + 1)} />
        </div>
        <div>
          <TipList stationId={`route-${routeSlug}`} refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
