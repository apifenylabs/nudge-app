import { Metadata } from 'next';
import HomeClient from './_HomeClient';
import FAQJsonLd from '@/components/FAQJsonLd';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Apifeny AI — Copy-Paste Playbooks That Replace $2,200/mo in Services',
 description:
 'Stop collecting AI tools. Start shipping results. Copy-paste AI playbooks for solopreneurs — replace expensive services with $70/mo in AI tools. 105 step-by-step playbooks ready to use.',
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
 'Copy-paste AI playbooks for solopreneurs. Replace $2,200/mo in services with $70/mo in AI tools. 105 step-by-step playbooks ready to use.',
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

// Homepage FAQ schema for Google rich snippet eligibility
const HOMEPAGE_FAQS = [
  {
    question: "What is Apifeny AI?",
    answer: "Apifeny AI is a curated directory of AI playbooks and tools for solopreneurs. Instead of just listing AI tools, we provide step-by-step copy-paste playbooks that show you exactly how to replace expensive services ($2,200+/mo) with $70/mo in AI tools. Think of it as an execution system, not a tool directory."
  },
  {
    question: "How do the playbooks work?",
    answer: "Each playbook starts with a free ChatGPT prompt you can copy-paste immediately. If it saves you time, you can upgrade to the full PDF playbook (50+ pages) with step-by-step walkthroughs, tool setup guides, automation scripts, pro tips, and lifetime updates. No subscription required for individual playbooks."
  },
  {
    question: "What kind of results can I expect?",
    answer: "Users report saving 22+ hours per week on average. The Solopreneur Toolkit replaces a VA, content writer, and social media manager. Directory builders earn $450+/mo in affiliate commissions. Customer support automation cuts 15 hours/week to 2 hours."
  },
  {
    question: "Do I need technical skills to use these playbooks?",
    answer: "No. Every playbook is designed for non-technical solopreneurs. You start with a simple ChatGPT prompt (copy, paste, done). The full PDFs include screenshots, tool setup guides, and automation scripts — but everything is explained step by step."
  },
  {
    question: "Is there a free option?",
    answer: "Yes. Every playbook comes with a free copy-paste ChatGPT prompt that works immediately. No signup, no email required. If you want the full 50+ page guide with prompts, tool setup, and automation scripts, individual playbooks start at $9. Pro membership ($37/mo) unlocks everything."
  },
  {
    question: "What makes Apifeny different from other AI directories?",
    answer: "Most AI directories just list tools. Apifeny focuses on execution: playbooks that walk you from problem to shipped result. We also offer Asia-ready filters (local pricing, language support, compliance requirements for Singapore, Malaysia, Indonesia, and 70+ countries). Our mascot ecosystem (Archie, Nova, Pixel, Echo) and Omnimind memory make your AI stack compound over time."
  }
];

export default function Page() {
 return (
   <>
     <FAQJsonLd faqs={HOMEPAGE_FAQS} />
     <HomeClient />
   </>
 );
}
