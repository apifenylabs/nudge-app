import { Metadata } from 'next';
import RevenueClient from './_RevenueClient';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
  title: 'AI Revenue & Success Stories — Real MRR from AI Side Hustles | Apifeny AI',
  description:
    'See real AI solopreneur revenue stories and success metrics. Average MRR, top-earning playbooks, and actionable case studies from people building with AI tools in Asia.',
  keywords: [
    'AI revenue',
    'AI solopreneur income',
    'AI side hustle revenue',
    'AI success stories',
    'MRR AI tools',
    'AI business case studies',
    'how much AI side hustles make',
    'AI freelancer income',
  ],
  alternates: { canonical: `${BASE_URL}/revenue` },
  openGraph: {
    title: 'AI Revenue & Success Stories — Real MRR | Apifeny AI',
    description: 'Real AI solopreneur revenue stories, average MRR, top-earning playbooks.',
    url: `${BASE_URL}/revenue`,
    siteName: 'Apifeny AI',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'AI Revenue & Success Stories' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Revenue & Success Stories — Real MRR | Apifeny AI',
    description: 'Real AI solopreneur revenue stories and success metrics.',
    images: ['/og'],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <RevenueClient />;
}
