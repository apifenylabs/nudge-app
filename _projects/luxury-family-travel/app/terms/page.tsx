import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Luxury Family Travel Asia — your use of our destination discovery platform.",
  openGraph: {
    title: "Terms of Service | Luxury Family Travel Asia",
    description: "Terms governing your use of our family travel platform.",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-navy py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gold mb-8">Terms of Service</h1>
        <p className="text-cream/60 text-sm mb-8">Last updated: May 4, 2026</p>

        <section className="space-y-8 text-cream/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Luxury Family Travel Asia (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Service&rdquo;), 
              you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">2. Description of Service</h2>
            <p>
              Luxury Family Travel Asia is a curated directory of luxury family-friendly destinations, 
              accommodations, and experiences across Asia. We provide informational content, user reviews, 
              and booking referrals. We do not directly book travel or act as a travel agent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">3. User Accounts</h2>
            <p>
              To access certain features (reviews, bookmarks, saved destinations), you may be required 
              to create an account. You are responsible for maintaining the confidentiality of your 
              account credentials and for all activity under your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">4. User Content</h2>
            <p>
              By submitting reviews, photos, or other content, you grant us a non-exclusive, 
              royalty-free license to display and distribute your content on the platform. 
              You represent that your content does not violate any third-party rights.
            </p>
            <p className="mt-2">
              We reserve the right to remove any content that violates our guidelines or these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">5. Accuracy of Information</h2>
            <p>
              We strive to keep destination information accurate and up-to-date, but we make no 
              warranties regarding completeness or accuracy. Travel details (pricing, availability, 
              amenities) may change without notice. Always verify directly with the property or provider.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">6. Limitation of Liability</h2>
            <p>
              Luxury Family Travel Asia shall not be liable for any damages arising from your use 
              of the Service, including but not limited to travel disruptions, booking issues, 
              or reliance on destination information. The Service is provided &ldquo;as is.&rdquo;
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">7. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites (hotels, booking platforms, 
              tour operators). We are not responsible for the content, practices, or availability 
              of these external sites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on 
              this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the Service 
              after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cream mb-3">9. Contact</h2>
            <p>
              For questions about these Terms, please <a href="/contact" className="text-gold hover:underline">contact us</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
