import { Metadata } from 'next';
import Link from 'next/link';
import { Accessibility, Heart, Globe, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Senior-Friendly Travel Asia',
  description: 'We curate senior-friendly destinations across Asia with accessible transport, mobility-friendly attractions, and practical travel tips for the 60+ traveler.',
  openGraph: {
    title: 'About Senior-Friendly Travel Asia',
    description: 'Curated accessible travel destinations for older adults exploring Asia.',
  },
};

const VALUES = [
  {
    icon: <Accessibility className="w-6 h-6" />,
    title: 'Accessibility First',
    description: 'Every destination we feature is vetted for wheelchair access, senior-friendly transport, and mobility accommodations. No hidden stairs, no impossible routes.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Trusted Reviews',
    description: 'Our recommendations come from real senior travelers and local experts. We prioritize safety, healthcare access, and comfort at every price point.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Curated, Not Crowdsourced',
    description: 'We personally verify every listing against our accessibility standards. If a destination doesn\'t meet our criteria, we don\'t recommend it.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Asia Specialists',
    description: 'With a focus on East and Southeast Asia, we provide deep local knowledge that general travel guides can\'t match. From Singapore\'s MRT to Japan\'s senior discounts.',
  },
];

const TEAM = [
  { name: 'Travel Research', role: 'Destinations & Accessibility', initials: 'TR' },
  { name: 'Community Outreach', role: 'Senior Traveler Connections', initials: 'CO' },
  { name: 'Content Team', role: 'Guides & Reviews', initials: 'CT' },
  { name: 'Technical', role: 'Platform & Accessibility', initials: 'TC' },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
            Travel Asia with Confidence
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl leading-relaxed">
            We believe age should never limit adventure. Our mission is to make Asian travel 
            accessible, enjoyable, and stress-free for the 60+ explorer.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Senior-Friendly Travel Asia was created because the travel industry largely ignores 
          older adults. Most guides focus on backpackers, digital nomads, or luxury travelers — 
          leaving seniors to piece together accessibility information from scattered sources. 
          We consolidate everything: wheelchair-accessible train stations, senior discount 
          programs, English-speaking clinics, and hotels with grab bars and walk-in showers.
        </p>
      </section>

      {/* Values */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Team</h2>
        <p className="text-gray-600 mb-8">
          A small team passionate about accessible travel and senior advocacy. We research, 
          visit, and review destinations so you don't have to guess.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM.map((m) => (
            <div key={m.name} className="bg-white rounded-xl p-5 border border-gray-100 text-center shadow-sm">
              <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {m.initials}
              </div>
              <h3 className="font-semibold text-gray-900">{m.name}</h3>
              <p className="text-sm text-gray-500">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Know a great senior-friendly spot?</h2>
          <p className="text-teal-100 mb-6">Help us grow our directory and make travel better for everyone 60+.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-teal-900 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer nav */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-400 flex gap-6">
        <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
        <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
        <Link href="/health" className="hover:text-teal-600 transition-colors">Travel Health Guide</Link>
      </div>
    </main>
  );
}
