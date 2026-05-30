import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'AI Playbooks — Step-by-Step Workflow Guides | Apifeny AI',
 description:
 'Follow curated AI playbooks for real-world tasks. Step-by-step workflow guides showing how to combine AI tools for content creation, coding, research, and more.',
 openGraph: {
 title: 'AI Playbooks — Apifeny AI',
 description:
 'Step-by-step AI workflow guides for content creation, coding, research, and more.',
 url: 'https://apifeny-ai.vercel.app/playbooks',
 },
};

export default function PlaybooksLayout({ children }: { children: React.ReactNode }) {
 return <>{children}</>;
}
