import { Metadata } from 'next';
import HomeClient from './_HomeClient';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Apifeny AI — Copy-Paste Playbooks That Replace $2,200/mo in Services',
 description:
 'Stop collecting AI tools. Start shipping results. Copy-paste AI playbooks for solopreneurs — replace expensive services with $70/mo in AI tools. 71 step-by-step playbooks ready to use.',
 keywords: [
 'AI playbooks',
 'solopreneur AI tools',
 'AI automation',
 'replace services with AI',
 'AI agent workflow',
 'solopreneur playbook',
 'AI for business',
 'ChatGPT prompts',
 'AI productivity',
 'copy-paste AI playbooks',
 ],
 alternates: { canonical: BASE_URL },
 openGraph: {
 title: 'Apifeny AI — Copy-Paste Playbooks That Replace $2,200/mo in Services',
 description:
 'Copy-paste AI playbooks for solopreneurs. Replace $2,200/mo in services with $70/mo in AI tools. 71 step-by-step playbooks ready to use.',
 url: BASE_URL,
 siteName: 'Apifeny AI',
 type: 'website',
 locale: 'en_US',
 images: [{ url: '/og', width: 1200, height: 630, alt: 'Apifeny AI — Copy-Paste AI Playbooks for Solopreneurs' }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Apifeny AI — Copy-Paste Playbooks That Replace $2,200/mo in Services',
 description: 'Copy-paste AI playbooks for solopreneurs. Replace $2,200/mo in services with $70/mo in AI tools.',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

export default function Page() {
 return <HomeClient />;
}
