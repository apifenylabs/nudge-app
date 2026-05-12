/**
 * Station data loaded at build time via raw JSON import.
 * This avoids fs.readFile at runtime, which fails on Vercel serverless
 * where process.cwd() may not point to the project root.
 */
import { Station } from './scoring';

// Import the JSON module directly — Next.js bundles this into the server bundle
// Using a dynamic approach: export a loader function
export async function loadAllStations(): Promise<Station[]> {
  const { default: raw } = await import('@/data/stations.json');
  return raw as Station[];
}

export async function findStationById(id: string): Promise<Station | undefined> {
  const stations = await loadAllStations();
  return stations.find(s => s.id === id);
}

// Sync version for use in getStaticProps or sync contexts (imports work at build time)
// Use with `import stations from '@/data/stations.json'` directly in page files
