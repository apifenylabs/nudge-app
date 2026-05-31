'use client';

/**
 * LifeOS — Usage Analytics Client Component
 *
 * Wraps the UsageAnalyticsPage component in a client boundary.
 * All analytics logic is in the shared component.
 */

import UsageAnalyticsPage from '@/app/components/UsageDashboard';

export default function AnalyticsClient() {
  return <UsageAnalyticsPage />;
}
