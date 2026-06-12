import { Metadata } from 'next';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import JsonLd from '@/components/atoms/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy — Titan AI Agent Platform',
  description: 'Titan privacy policy. Learn how we collect, use, and protect your data when you build and deploy AI agents on the Titan platform.',
  openGraph: {
    title: 'Privacy Policy — Titan',
    description: 'How Titan handles your data, agent IP, and privacy.',
    type: 'website',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://titan.apifeny.com' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://titan.apifeny.com/privacy' },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        {/* Nav */}
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold">Titan</span>
          </Link>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 pt-16 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30 text-amber-300 text-sm font-medium mb-6">
              <Shield className="w-3.5 h-3.5" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm mt-2">Last updated: June 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto prose prose-invert prose-gray prose-sm max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                <p className="text-gray-400 leading-relaxed">
                  When you use Titan, we may collect information you provide directly, such as your name, email address, 
                  and account credentials. We also automatically collect certain technical information, including IP address, 
                  browser type, device identifiers, and usage data to improve our service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
                <p className="text-gray-400 leading-relaxed">
                  We use the information we collect to provide, maintain, and improve Titan; to process transactions; 
                  to send technical notices and support messages; to respond to your comments and questions; and to 
                  communicate about our platform.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. Agent IP Ownership</h2>
                <p className="text-gray-400 leading-relaxed">
                  You retain full ownership of all agent skills, configurations, certifications, and data you create on Titan. 
                  We do not claim any intellectual property rights over your agents or their capabilities. Your agent IP 
                  is yours — always.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Data Sharing</h2>
                <p className="text-gray-400 leading-relaxed">
                  We do not sell your personal information. We may share data with third-party service providers who 
                  help us operate the platform (e.g., cloud hosting, analytics), and we require these providers to 
                  maintain appropriate security protections. We may also disclose information if required by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Data Security</h2>
                <p className="text-gray-400 leading-relaxed">
                  We implement industry-standard security measures including encryption at rest and in transit, 
                  regular security audits, and access controls. However, no method of electronic storage is 100% secure, 
                  and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
                <p className="text-gray-400 leading-relaxed">
                  Depending on your jurisdiction, you may have the right to access, correct, delete, or port your data. 
                  You can manage most of this through your account settings, or contact us directly for assistance.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">7. Cookies</h2>
                <p className="text-gray-400 leading-relaxed">
                  Titan uses essential cookies for authentication and security. We may use analytics cookies to 
                  understand how the platform is used. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">8. Contact</h2>
                <p className="text-gray-400 leading-relaxed">
                  If you have questions about this privacy policy or your data, please contact us at{' '}
                  <a href="mailto:privacy@apifeny.com" className="text-amber-400 hover:text-amber-300 underline">privacy@apifeny.com</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
