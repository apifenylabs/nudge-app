import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Công Cụ AI Tốt Nhất tại Việt Nam (2026) — 85+ Tools Cho Startup & Doanh Nghiệp',
  description:
    'Khám phá các công cụ AI tốt nhất cho doanh nghiệp Việt Nam. Danh mục 85+ công cụ được xếp hạng theo trend, hỗ trợ tiếng Việt, PDPA, và định giá VND. Cập nhật hằng ngày.',
  openGraph: {
    title: 'Công Cụ AI Tốt Nhất tại Việt Nam (2026) — Apifeny AI',
    description:
      'Tìm công cụ AI phù hợp với doanh nghiệp Việt: hỗ trợ tiếng Việt, giá VND, tuân thủ PDPA, và sẵn sàng cho thị trường châu Á. 85+ công cụ, xếp hạng chuyên gia.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-vietnam',
    siteName: 'Apifeny AI',
    locale: 'vi-VN',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Công Cụ AI Tốt Nhất tại Việt Nam (2026) — Apifeny AI',
    description:
      'Tìm công cụ AI phù hợp với doanh nghiệp Việt: hỗ trợ tiếng Việt, giá VND, tuân thủ PDPA, và sẵn sàng cho thị trường châu Á. 85+ công cụ, xếp hạng chuyên gia.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-vietnam',
    languages: {
      'vi-VN': 'https://apifeny-ai.vercel.app/ai-tools-vietnam',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-vietnam',
    },
  },
};

export default function AiToolsVietnamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
