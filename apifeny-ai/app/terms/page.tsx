import { Metadata } from 'next';
import { Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Apifeny AI terms of service — guidelines for using our AI tools directory.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
          <Scale className="w-5 h-5 text-neon-light" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Terms of Service</h1>
      </div>
      <p className="text-sm text-tech-200 mb-8">Last updated: January 2025</p>

      <div className="prose prose-sm prose-invert max-w-none space-y-6 text-tech-100">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing or using Apifeny AI (&ldquo;the Service&rdquo;), you agree to be bound
            by these Terms of Service. If you do not agree with any part of these terms, you
            may not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Description of Service</h2>
          <p className="leading-relaxed">
            Apifeny AI is an AI tools directory that curates, ranks, and displays information
            about AI tools, agents, and playbooks. We provide a platform for discovering and
            comparing AI tools but do not host, operate, or endorse any of the listed tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. User Responsibilities</h2>
          <p className="leading-relaxed mb-3">As a user of the Service, you agree to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the Service for lawful purposes only</li>
            <li>Not attempt to manipulate rankings, ratings, or scores</li>
            <li>Not scrape, crawl, or extract data in bulk without permission</li>
            <li>Not submit false or misleading information about tools</li>
            <li>Not engage in any activity that disrupts the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Tool Listings</h2>
          <p className="leading-relaxed mb-3">Regarding tool listings on our directory:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We make reasonable efforts to ensure accuracy but do not guarantee completeness</li>
            <li>Tool information is sourced from publicly available data and user submissions</li>
            <li>Asia Scores and rankings are based on our proprietary Cosme-style algorithm</li>
            <li>We reserve the right to remove or modify listings at our discretion</li>
            <li>Listed tools may change pricing, features, or availability without notice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Third-Party Links</h2>
          <p className="leading-relaxed">
            Our Service contains links to third-party websites (tool websites, documentation,
            etc.). We are not responsible for the content, privacy practices, or terms of
            these external sites. Visiting external links is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. Intellectual Property</h2>
          <p className="leading-relaxed mb-3">
            The Apifeny AI name, logo, design, and Cosme-style ranking system are our
            intellectual property. Our curated data, Asia Scores, and playbook content are
            protected by copyright.
          </p>
          <p className="leading-relaxed">
            Tool names, logos, and descriptions remain the property of their respective
            owners and are used for informational purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. Disclaimer</h2>
          <p className="leading-relaxed">
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind, either
            express or implied. We do not warrant that the Service will be uninterrupted,
            error-free, or that the information is 100% accurate. Tool rankings and scores
            are subjective and should be used as guidance only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. Limitation of Liability</h2>
          <p className="leading-relaxed">
            Apifeny AI shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of the Service. This
            includes, without limitation, reliance on tool rankings, tool performance, or
            any decisions made based on our content.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. Changes to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to modify these terms at any time. We will notify users of
            material changes by posting the updated terms on this page. Continued use of the
            Service after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">10. Contact</h2>
          <p className="leading-relaxed">
            For questions about these terms, contact us at legal@apifeny.ai.
          </p>
        </section>
      </div>
    </div>
  );
}
