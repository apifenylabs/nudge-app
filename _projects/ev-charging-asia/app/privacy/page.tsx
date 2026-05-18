import Link from 'next/link';
import { Zap } from 'lucide-react';
import SiteFooter from '@/components/SiteFooter';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-gray text-sm leading-relaxed space-y-4">
          <p>EV Charging Asia respects your privacy. This policy explains how we handle your information.</p>
          <h3 className="font-bold text-gray-900">Information We Collect</h3>
          <p>When you submit a review, we collect your name and review content. We do not share this with third parties.</p>
          <h3 className="font-bold text-gray-900">Cookies</h3>
          <p>We use essential cookies for site functionality. We do not use tracking cookies or analytics that share data with third parties.</p>
          <h3 className="font-bold text-gray-900">Usage Data &amp; Ecosystem Improvement</h3>
          <p>We offer an optional telemetry feature to help improve all sites in our ecosystem. When enabled, anonymous usage data (page views, feature clicks, affiliate interactions) is collected to understand how visitors use our sites. <strong>No data is collected without your explicit consent.</strong> You can opt in or out at any time via the toggle in the bottom-right corner of any page.</p>
          <p>Data collected includes: page paths visited, feature interactions, and session duration. No personally identifiable information is ever collected or stored. All data is aggregated for analytics purposes only.</p>
          <h3 className="font-bold text-gray-900">Contact</h3>
          <p>Questions? Contact us through our <Link href="/contact" className="text-sky-600 hover:underline">contact page</Link>.</p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
