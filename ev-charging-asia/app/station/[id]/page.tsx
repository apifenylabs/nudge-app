import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientStationPage from './_client';
import { Station } from '@/lib/scoring';
import { BreadcrumbSchemaSSR } from '@/components/SchemaOrg';

// Import JSON directly — Next.js bundles it into the server bundle at build time.
// This avoids fs.readFile which fails on Vercel serverless (process.cwd() mismatch).
import stationsData from '@/data/stations.json';

interface Props {
  params: { id: string };
}

// 🧱 Pre-render all 1,125 station pages at build time for instant loads + SEO
// If a station doesn't exist in build data, dynamicParams: true renders it on-demand.
// Revalidate via ISR so new/modified stations get picked up periodically.
export const dynamicParams = true;
export const revalidate = 3600; // ISR: revalidate every hour

const stations: Station[] = stationsData as Station[];

export async function generateStaticParams() {
  return stations.map((station) => ({
    id: station.id,
  }));
}

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
  return (
    <>
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'Charging Stations', url: '/search' },
        { name: station.name, url: `/station/${station.id}` },
      ]} />
      <ClientStationPage station={station} allStations={stations} />
    </>
  );
}
