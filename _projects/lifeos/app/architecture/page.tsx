/**
 * LifeOS — Architecture Overview Page
 *
 * Documents the full system: high-level architecture, plugin system,
 * data flow, phase-aware chat engine, and Supabase schema.
 *
 * This is a static (non-client) page with client hydration for Mermaid diagrams.
 */

import type { Metadata } from 'next';
import ArchitectureClient from './client';

export const metadata: Metadata = {
  title: 'Architecture — LifeOS',
  description: 'LifeOS system architecture: plugin registry, chat engine, phase routing, Supabase schema, and data flow.',
};

export default function ArchitecturePage() {
  return <ArchitectureClient />;
}
