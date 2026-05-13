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
    // Generate params for both old IDs and new slugs for backward compat
    const params: { slug: string }[] = [];
    for (const d of destinations) {
      if (d.slug) params.push({ slug: d.slug });
      if (d.id && d.id !== d.slug) params.push({ slug: d.id });
    }
    return params;
  } catch {
    return [];
  }
}

export default function PropertyRedirect({ params }: Props) {
  redirect(`/destination/${params.slug}`);
}
