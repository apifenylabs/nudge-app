import { Metadata } from 'next';
import Link from 'next/link';
import { HeartPulse, Ambulance, Pill, Phone, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Travel Health Guide for Seniors in Asia — Senior-Friendly Travel Asia',
  description: 'Essential health guide for senior travelers in Asia. Find English-speaking clinics, hospitals, vaccination advice, medication tips, and travel insurance recommendations.',
  openGraph: {
    title: 'Travel Health Guide for Seniors in Asia',
    description: 'Essential health and medical guide for senior travelers visiting Asia.',
  },
};

const HEALTH_TIPS = [
  {
    icon: <HeartPulse className="w-5 h-5" />,
    title: 'Before You Go',
    items: [
      'Visit your doctor for a check-up 4-6 weeks before departure',
      'Get recommended vaccinations (hepatitis A & B, typhoid, flu, COVID-19)',
      'Carry a written list of your medications with generic names',
      'Pack a travel health kit with prescription meds, pain relievers, antihistamines, and anti-diarrheal medicine',
      'Make copies of your prescriptions and store them separately from originals',
    ],
  },
  {
    icon: <Ambulance className="w-5 h-5" />,
    title: 'Medical Facilities by City',
    items: [
      'Singapore: Raffles Hospital, Mount Elizabeth — world-class, English-speaking',
      'Tokyo: St. Luke\'s International Hospital, Tokyo Medical University — English-speaking staff available',
      'Hong Kong: Adventist Hospital, Matilda International — high standard, English-speaking',
      'Bangkok: Bumrungrad International, Bangkok Hospital — JCI-accredited, excellent care',
      'Kuala Lumpur: Prince Court Medical Centre, Gleneagles — affordable, high quality',
      'Taipei: Taipei Medical University Hospital, Adventist Hospital — English-speaking international clinics',
    ],
  },
  {
    icon: <Pill className="w-5 h-5" />,
    title: 'Medication Tips',
    items: [
      'Keep medications in original labeled containers',
      'Carry a doctor\'s note explaining your medications (in English and local language)',
      'Check if your medication is legal in your destination (some Asian countries restrict certain drugs)',
      'Bring extra supply — enough for the trip plus 1 week buffer',
      'Store medications in your carry-on, not checked luggage',
    ],
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Emergency Numbers',
    items: [
      'Singapore: 995 (ambulance) / 999 (police)',
      'Japan: 119 (ambulance & fire) / 110 (police)',
      'Hong Kong: 999 (all emergencies)',
      'Thailand: 1669 (ambulance) / 191 (police)',
      'Malaysia: 999 (all emergencies)',
      'Taiwan: 119 (ambulance) / 110 (police)',
      'Save your country\'s embassy/consulate number before traveling',
    ],
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Travel Insurance',
    items: [
      'Ensure your policy covers pre-existing conditions',
      'Check for direct payment to hospitals (no out-of-pocket)',
      'Look for medical evacuation coverage (minimum $100,000)',
      'Confirm coverage for COVID-19 related expenses',
      'Keep your insurance card and emergency contact number accessible',
    ],
  },
];

export default function HealthPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">Health Guide</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
            Travel Health for Seniors in Asia
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl leading-relaxed">
            Stay healthy and prepared on your Asian adventure. From finding English-speaking 
            hospitals to packing the right medications — we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        {HEALTH_TIPS.map((tip) => (
          <div key={tip.title} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center shrink-0">
                {tip.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{tip.title}</h2>
            </div>
            <ul className="space-y-2">
              {tip.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                  <span className="text-teal-500 mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-semibold text-amber-800 mb-2">⚠️ Medical Disclaimer</h3>
          <p className="text-amber-700 text-sm leading-relaxed">
            This guide provides general health information for senior travelers. It is not a substitute 
            for professional medical advice. Always consult your healthcare provider before traveling, 
            especially if you have pre-existing conditions or specific health concerns. Medical facilities 
            and contact numbers may change — verify with local sources before your trip.
          </p>
        </div>
      </section>

      {/* Footer links */}
      <div className="max-w-4xl mx-auto px-4 pb-8 text-sm text-gray-400 flex gap-6">
        <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
        <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
        <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
      </div>
    </main>
  );
}
