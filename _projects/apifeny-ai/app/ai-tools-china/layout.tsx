import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in China (2026) — Curated for China Developers & Teams',
  description:
    'Discover the best AI tools for China. Curated directory of 85+ tools ranked for Chinese language support, ¥ RMB pricing, data compliance (CSL/PIPL/DSL), and China market readiness. Updated daily.',
  openGraph: {
    title: 'Best AI Tools in China (2026) — Apifeny AI',
    description:
      'Find AI tools built for China: 中文 support, ¥ RMB pricing, China data compliance, and WeChat/Alipay ecosystem readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-china',
    siteName: 'Apifeny AI',
    locale: 'zh-CN',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in China (2026) — Apifeny AI',
    description:
      'Find AI tools built for China: 中文 support, ¥ RMB pricing, China data compliance, and WeChat/Alipay ecosystem readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-china',
    languages: {
      'zh-CN': 'https://apifeny-ai.vercel.app/ai-tools-china',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-china',
    },
  },
};

export default function AiToolsChinaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
