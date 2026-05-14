import { redirect } from 'next/navigation';
import { allDestinations } from '@/lib/data';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const d of allDestinations) {
    if (d.slug) params.push({ slug: d.slug });
    if (d.id && d.id !== d.slug) params.push({ slug: d.id });
  }
  return params;
}

export default function PropertyRedirect({ params }: Props) {
  redirect(`/destination/${params.slug}`);
}
