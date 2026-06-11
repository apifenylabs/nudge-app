import { Shield, FileText, Mail, Info } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Asia Family Travel Directory',
  description:
    'Terms and conditions for using the Asia Family Travel Directory website and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white/90 mb-6">
            <FileText size={14} />
            Please read these terms carefully
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Last updated: May 30, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Asia Family Travel Directory website (the "Service"), you agree to be
              bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p>
              Asia Family Travel Directory provides a directory of family-friendly destinations, activities, and travel
              resources across Asia. The Service includes user-generated reviews, curated destination guides, blog content,
              and affiliate links to third-party booking platforms.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="mb-3">As a user of the Service, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information when creating an account or submitting reviews</li>
              <li>Not submit false, misleading, or defamatory content</li>
              <li>Not use the Service for any unlawful purpose</li>
              <li>Not attempt to disrupt or compromise the Service's security</li>
              <li>Not scrape, crawl, or reproduce content without written permission</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Affiliate Disclosure & Third-Party Links</h2>
            <p className="mb-3">
              Some links on this site are affiliate links. We may earn a commission at no extra cost to you
              when you book through these links. As a Klook, Booking.com, Viator, GetYourGuide, and Expedia
              partner, we may earn from qualifying bookings. Our affiliate relationships do not influence
              our editorial content or recommendations.
            </p>
            <p>
              The Service may contain links to third-party websites or services. We are not responsible for
              the content, privacy policies, or practices of any third-party websites.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p>
              All content on the Service — including text, graphics, logos, images, and software — is the
              property of Asia Family Travel Directory or its content suppliers and is protected by
              applicable copyright and intellectual property laws. You may not reproduce, distribute,
              or create derivative works without our express written consent.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. User-Generated Content</h2>
            <p className="mb-3">
              Users may submit reviews, comments, and other content. By submitting content, you grant us
              a non-exclusive, royalty-free, perpetual license to use, reproduce, and display that content
              on the Service.
            </p>
            <p>
              We reserve the right to remove any user-generated content that violates these terms or
              applicable law, without prior notice.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" without any warranty, express or implied. We do not guarantee
              that the Service will be uninterrupted, secure, or error-free. Travel information is provided
              for general guidance only and should not be relied upon as the sole basis for travel decisions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Asia Family Travel Directory shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising from your use
              of the Service.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately
              upon posting to the Service. Your continued use of the Service after changes constitutes
              acceptance of the updated terms.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us through our{' '}
              <a href="/contact" className="text-accent hover:underline font-medium">contact page</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
