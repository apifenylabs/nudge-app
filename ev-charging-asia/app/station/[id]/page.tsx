import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientStationPage from './_client';
import { promises as fs } from 'fs';
import path from 'path';
import { Station } from '@/lib/scoring';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'stations.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const stations: Station[] = JSON.parse(raw);
  return stations.map(s => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'data', 'stations.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const stations: Station[] = JSON.parse(raw);
  const station = stations.find(s => s.id === params.id);
  if (!station) return { title: 'Station Not Found' };
  return {
    title: `${station.name} — ${station.city}, ${station.country}`,
    description: station.description.slice(0, 160),
  };
}

export default async function StationPage({ params }: Props) {
  const filePath = path.join(process.cwd(), 'data', 'stations.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const stations: Station[] = JSON.parse(raw);
  const station = stations.find(s => s.id === params.id);
  if (!station) notFound();
  return <ClientStationPage station={station} allStations={stations} />;
}
