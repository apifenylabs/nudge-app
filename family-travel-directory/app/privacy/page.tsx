import { Shield, Cookie, Mail, Info } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Asia Family Travel Directory',
  description:
    'How we collect, use, and protect your data. GDPR and CCPA compliant privacy policy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white/90 mb-6">
            <Shield size={14} />
            Your privacy matters to us
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Last updated: April 28, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm space-y-8">

          {/* Info */}
          <div className="flex items-start gap-3">
            <Info size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Asia Family Travel Directory (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
                is committed to protecting your privacy. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website at
                <strong> familytravelasia.com</strong> (the &ldquo;Site&rdquo;).
                Please read this policy carefully. If you do not agree with its terms, please do not
                access the Site.
              </p>
            </div>
          </div>

          {/* What we collect */}
          <div className="flex items-start gap-3">
            <Info size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-800">Personal Information</h3>
                  <p className="text-gray-600">
                    When you create an account, submit a review, or contact us, we may collect:
                  </p>
                  <ul className="list-disc ml-5 mt-1 space-y-1 text-gray-600">
                    <li>Email address</li>
                    <li>Display name (optional)</li>
                    <li>Any information you voluntarily provide in review submissions or contact messages</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Cookies &amp; Tracking Data</h3>
                  <p className="text-gray-600">
                    We use cookies and similar tracking technologies to enhance your experience,
                    analyze traffic, and serve personalized advertisements. This includes:
                  </p>
                  <ul className="list-disc ml-5 mt-1 space-y-1 text-gray-600">
                    <li><strong>Essential cookies</strong> — required for site functionality (e.g., authentication)</li>
                    <li><strong>Analytics cookies</strong> — to understand how visitors use our Site</li>
                    <li><strong>AdSense cookies</strong> — Google AdSense uses cookies to serve personalized ads based on your browsing history and interests</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How we use it */}
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">We use the information we collect to:</p>
              <ul className="list-disc ml-5 space-y-1 text-gray-600">
                <li>Provide, operate, and maintain the Site</li>
                <li>Create and manage your account</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send administrative information (e.g., account updates, password resets)</li>
                <li>Improve and personalize the user experience</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Serve relevant advertisements through Google AdSense</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </div>

          {/* How we protect it */}
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Data Protection</h2>
              <p className="text-gray-700">
                We implement a variety of security measures to maintain the safety of your personal
                information when you enter, submit, or access your data. These include:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
                <li>Encryption of data in transit using TLS/SSL</li>
                <li>Secure server infrastructure</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Regular security audits and updates</li>
              </ul>
              <p className="text-gray-600 mt-2">
                However, no method of transmission over the Internet or electronic storage is 100%
                secure. While we strive to protect your personal data, we cannot guarantee its
                absolute security.
              </p>
            </div>
          </div>

          {/* Cookie Policy */}
          <div className="flex items-start gap-3">
            <Cookie size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Cookie Policy</h2>
              <p className="text-gray-700 mb-3">
                Our Site uses cookies to improve functionality and provide personalized experiences.
                Here&apos;s what you need to know:
              </p>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 text-sm">Essential Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Required for authentication, session management, and basic site functionality.
                    These cannot be disabled.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 text-sm">Analytics Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Help us understand how visitors interact with the Site, which pages are most
                    popular, and how we can improve. We use these to make the directory better for you.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 text-sm">Advertising Cookies (AdSense)</h3>
                  <p className="text-gray-600 text-sm">
                    Google AdSense uses cookies to serve personalized ads based on your visits to
                    our Site and other websites. These cookies enable Google and its partners to
                    serve ads that are more relevant to your interests. You can opt out of
                    personalized advertising by visiting{' '}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:text-sky-700 underline"
                    >
                      Google&apos;s Ads Settings
                    </a>.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mt-3 text-sm">
                You can control cookie preferences in your browser settings. Disabling certain
                cookies may affect site functionality.
              </p>
            </div>
          </div>

          {/* Third Party */}
          <div className="flex items-start gap-3">
            <Info size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Third-Party Services</h2>
              <p className="text-gray-700">
                We use the following third-party services that may collect information:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
                <li>
                  <strong>Google AdSense</strong> — serves advertisements. Google&apos;s use of
                  advertising cookies enables it and its partners to serve ads based on your visit
                  to our Site and other sites on the Internet. See{' '}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:text-sky-700 underline"
                  >
                    Google&apos;s Advertising Privacy &amp; Terms
                  </a>.
                </li>
                <li>
                  <strong>Supabase</strong> — provides authentication and database services for
                  account management and review storage.
                </li>
                <li>
                  <strong>Vercel</strong> — hosts the Site and may collect standard server logs
                  (IP addresses, browser type, timestamps).
                </li>
              </ul>
            </div>
          </div>

          {/* GDPR */}
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">GDPR Compliance (EU Users)</h2>
              <p className="text-gray-700 mb-3">
                If you are a resident of the European Economic Area (EEA), you have the following
                rights under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc ml-5 space-y-1 text-gray-600">
                <li><strong>Right to access</strong> — request a copy of the data we hold about you</li>
                <li><strong>Right to rectification</strong> — correct inaccurate data</li>
                <li><strong>Right to erasure</strong> (&ldquo;right to be forgotten&rdquo;) — request deletion of your data</li>
                <li><strong>Right to restrict processing</strong> — limit how we use your data</li>
                <li><strong>Right to data portability</strong> — receive your data in a structured, machine-readable format</li>
                <li><strong>Right to object</strong> — object to processing based on legitimate interests</li>
              </ul>
              <p className="text-gray-600 mt-2">
                To exercise any of these rights, please contact us using the information below.
                We will respond within 30 days.
              </p>
            </div>
          </div>

          {/* CCPA */}
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">CCPA Compliance (California Residents)</h2>
              <p className="text-gray-700 mb-3">
                If you are a resident of California, the California Consumer Privacy Act (CCPA)
                grants you the following rights:
              </p>
              <ul className="list-disc ml-5 space-y-1 text-gray-600">
                <li><strong>Right to know</strong> — request details about the personal information we collect, use, and share</li>
                <li><strong>Right to delete</strong> — request deletion of your personal information</li>
                <li><strong>Right to opt-out</strong> — opt out of the sale of your personal information (we do not sell personal information)</li>
                <li><strong>Right to non-discrimination</strong> — we will not discriminate against you for exercising your CCPA rights</li>
              </ul>
              <p className="text-gray-600 mt-2">
                To exercise your CCPA rights, please contact us. We will verify your identity before
                processing your request.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="flex items-start gap-3">
            <Info size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information only as long as necessary to fulfill the purposes
                described in this policy, or as required by law. Account data is retained for the
                duration of your account. When you delete your account, we will delete or anonymize
                your personal data within 30 days, unless we are legally required to retain it.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Children&apos;s Privacy</h2>
              <p className="text-gray-700">
                Our Site is intended for use by parents and caregivers. We do not knowingly collect
                personal information from children under the age of 13. If you believe a child has
                provided us with personal data, please contact us, and we will take steps to delete
                that information.
              </p>
            </div>
          </div>

          {/* Changes */}
          <div className="flex items-start gap-3">
            <Info size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of material
                changes by posting the new policy on this page and updating the &ldquo;Last
                updated&rdquo; date. We encourage you to review this policy periodically.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                your personal data, please contact us at:
              </p>
              <p className="mt-2 text-gray-800 font-medium">
                Email: privacy@familytravelasia.com
              </p>
              <p className="text-gray-600">
                Or visit our{' '}
                <a href="/contact" className="text-sky-600 hover:text-sky-700 underline">
                  Contact page
                </a>
                .
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
