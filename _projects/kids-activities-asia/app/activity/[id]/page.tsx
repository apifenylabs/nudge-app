import ActivityDetailClient from './_client';
import { getAllActivities } from '@/lib/getData';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const activities = getAllActivities();
  return activities.map(activity => ({ id: activity.id }));
}

export async function generateMetadata({ params }: Props) {
  const { getAllActivities } = await import('@/lib/getData');
  const activity = getAllActivities().find(a => a.id === params.id);
  if (!activity) return { title: 'Activity Not Found' };
  return {
    title: `${activity.name} | Kids Activities Asia`,
    description: activity.description.slice(0, 160),
    openGraph: {
      title: `${activity.name} - ${activity.city}, ${activity.country}`,
      description: activity.description.slice(0, 160),
    },
  };
}

export default function ActivityPage({ params }: Props) {
  return <ActivityDetailClient id={params.id} />;
}
