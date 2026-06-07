import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ExternalLink, FileText, HelpCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — Apifeny AI Directory',
  description: 'Transparency about our affiliate relationships. Learn how we earn commissions and how it keeps Apifeny AI free.',
  alternates: { canonical: 'https://apifeny-ai.vercel.app/affiliate-disclosure' },
  openGraph: {
    title: 'Affiliate Disclosure — Apifeny AI Directory',
    description: 'How affiliate links work on Apifeny AI and our commitment to transparency.',
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Affiliate Disclosure</h1>
          <p className="text-gray-500 text-sm">Last updated: June 7, 2026</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          {/* Section 1 */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              Our Commitment to Transparency
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At <strong>Apifeny AI</strong>, we believe in full transparency with our readers. 
              Many of the links on this website are affiliate links. If you click on an affiliate 
              link and make a purchase, we may earn a commission at no additional cost to you.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              This disclosure applies to all pages on apifeny-ai.vercel.app, including tool 
              reviews, comparisons, blog posts, category pages, and country-specific guides.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              How Affiliate Links Work
            </h2>
            <p className="text-gray-600 leading-relaxed">
              When you visit a tool page on Apifeny AI and click a &ldquo;Get Started&rdquo; or 
              &ldquo;Visit Site&rdquo; button, you may be redirected through an affiliate link. 
              Here&rsquo;s how it works:
            </p>
            <ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-600">
              <li>You click a link on our site (e.g., &ldquo;Get Notion AI&rdquo;)</li>
              <li>Our server checks our affiliate ID for that tool</li>
              <li>If configured, you&rsquo;re redirected through the tool&rsquo;s affiliate program</li>
              <li>If not configured, you&rsquo;re redirected to the tool&rsquo;s normal signup page</li>
              <li>If you purchase the tool, we may earn a commission — you pay the same price</li>
            </ol>
            <p className="text-gray-600 leading-relaxed mt-3">
              All affiliate redirects use standard <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">302</code> 
              redirects — no link cloaking or deceptive practices.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-amber-500" />
              Affiliate Programs We Participate In
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are a participant in the affiliate programs of the following platforms. 
              Click on each to view their respective program terms:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5 text-gray-600">
              <li>Notion Affiliate Program (via PartnerStack)</li>
              <li>Jasper Affiliate Program (via PartnerStack)</li>
              <li>Copy.ai Affiliate Program (via Impact)</li>
              <li>Writesonic Affiliate Program</li>
              <li>Canva Affiliate Program</li>
              <li>Synthesia Affiliate Program</li>
              <li>HeyGen Affiliate Program</li>
              <li>Runway Affiliate Program</li>
              <li>Descript Affiliate Program</li>
              <li>ElevenLabs Affiliate Program</li>
              <li>Murf AI Affiliate Program</li>
              <li>Make.com Affiliate Program</li>
              <li>SurferSEO Affiliate Program</li>
              <li>Semrush Affiliate Program</li>
              <li>Zapier Affiliate Program</li>
              <li>Intercom Partner Program</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">No Additional Cost to You</h2>
            <p className="text-gray-600 leading-relaxed">
              Using an affiliate link does <strong>not</strong> increase the price you pay. 
              In many cases, the tool&rsquo;s affiliate program provides the same pricing, 
              discounts, and trials as a direct signup. Commissions are paid by the tool 
              provider, not by you.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Editorial Independence</h2>
            <p className="text-gray-600 leading-relaxed">
              Affiliate relationships do <strong>not</strong> influence our tool rankings, 
              reviews, or recommendations. All tools are evaluated based on their features, 
              pricing, usability, and relevance to our readers. We maintain strict editorial 
              independence:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5 text-gray-600">
              <li>We do not accept paid placements in tool rankings</li>
              <li>We do not guarantee positive coverage in exchange for affiliate commissions</li>
              <li>Our reviews include both strengths and limitations of each tool</li>
              <li>If a tool has no affiliate program, it is still listed based on merit</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              Questions?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about our affiliate relationships or this disclosure, 
              please reach out to us.
            </p>
          </section>

          {/* Footer link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              <Link href="/" className="text-amber-600 hover:text-amber-700 hover:underline">
                ← Back to Apifeny AI Directory
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
