'use client';

import { FC } from 'react';
import EvRoadTripCTA from '@/components/EvRoadTripCTA';
import PremiumPartnerSection from '@/components/PremiumPartnerSection';
import RoadTripPackageWidget from '@/components/RoadTripPackageWidget';

/**
 * Client wrapper to inject revenue components into the server-rendered itinerary detail page.
 * Fully additive — preserves all existing content.
 */
interface ItineraryRevenueSectionProps {
  country?: string;
}

const ItineraryRevenueSection: FC<ItineraryRevenueSectionProps> = ({ country }) => {
  return (
    <>
      <div className="mb-6">
        <EvRoadTripCTA country={country} />
      </div>
      <div className="mb-6">
        <PremiumPartnerSection compact />
      </div>
      <div className="mb-6">
        <RoadTripPackageWidget country={country} compact />
      </div>
    </>
  );
};

export default ItineraryRevenueSection;
