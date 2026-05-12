import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientStationPage from './_client';
import { Station } from '@/lib/scoring';

// Import JSON directly — Next.js bundles it into the server bundle at build time.
// This avoids fs.readFile which fails on Vercel serverless (process.cwd() mismatch).
import stationsData from '@/data/stations.json';

interface Props {
  params: { id: string };
}

// Dynamic rendering — pages generated on-demand from the data file at request time
// SSG tried to generate 1,125 pages at build time, causing memory/timeout issues on Vercel
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

const stations: Station[] = stationsData as Station[];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const station = stations.find(s => s.id === params.id);
  if (!station) return { title: 'Station Not Found' };
  return {
    title: `${station.name} — ${station.city}, ${station.country}`,
    description: station.description?.slice(0, 160) ?? `${station.name} EV charging station in ${station.city}, ${station.country}. View charger types, ratings, and nearby amenities.`,
  };
}

export default async function StationPage({ params }: Props) {
  const station = stations.find(s => s.id === params.id);
  if (!station) notFound();
  return <ClientStationPage station={station} allStations={stations} />;
}
