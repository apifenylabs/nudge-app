import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'destinations.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    const destinations = JSON.parse(raw);
    return destinations.map((d: { id: string }) => ({ slug: d.id }));
  } catch {
    return [];
  }
}

export default function PropertyRedirect({ params }: Props) {
  redirect(`/destination/${params.slug}`);
}
