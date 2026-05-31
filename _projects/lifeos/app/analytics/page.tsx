/**
 * LifeOS — Usage Analytics Page
 *
 * Standalone analytics page showing aggregate usage stats across all plugins.
 * Data is stored locally (localStorage) and optionally synced to Supabase.
 */

import type { Metadata } from 'next';
import AnalyticsClient from './client';

export const metadata: Metadata = {
  title: 'Usage Analytics — LifeOS',
  description: 'See how you use LifeOS: sessions, messages, time spent, and plugin rankings across all plugins.',
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
