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

const stations: Station[] = stationsData as Station[];

// 🧱 Dynamic ISR: stations rendered on-demand at request time, then cached for 1 hour.
// Avoids building 1,125+ static pages at deploy (OOM on free tier).
export const dynamicParams = true;
export const revalidate = 3600; // ISR: revalidate every hour

export async function generateStaticParams() {
  // Seed ISR cache with first 50 popular stations — remaining 1075+ render on-demand
  return stations.slice(0, 50).map((station) => ({
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
