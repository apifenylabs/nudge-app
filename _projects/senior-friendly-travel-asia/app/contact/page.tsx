import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — Senior-Friendly Travel Asia',
  description: 'Get in touch with the Senior-Friendly Travel Asia team. Suggest a destination, report an issue, or share your travel experience.',
  openGraph: {
    title: 'Contact Senior-Friendly Travel Asia',
    description: 'Suggest a destination or share your senior travel experience in Asia.',
  },
};

const CONTACT_OPTIONS = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: 'Suggest a Destination',
    description: 'Know a senior-friendly spot we should add? Send us the details and we\'ll review it.',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'General Inquiries',
    description: 'Questions, feedback, or partnership opportunities — we\'d love to hear from you.',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Report an Issue',
    description: 'Found incorrect accessibility info or a broken link? Let us know so we can fix it.',
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl leading-relaxed">
            Have a suggestion, question, or travel tip to share? We&apos;d love to hear from you.
            Help us make Asia more accessible for everyone 60+.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {CONTACT_OPTIONS.map((opt) => (
            <div key={opt.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center mb-4">
                {opt.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{opt.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{opt.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
          <form
            action="https://formspree.io/f/your-form-id"
            method="POST"
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm bg-white"
              >
                <option value="">Select a topic</option>
                <option value="suggest">Suggest a Destination</option>
                <option value="feedback">Feedback</option>
                <option value="issue">Report an Issue</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm resize-y"
                placeholder="Tell us about your experience or suggestion..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-800 transition-all shadow-sm"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
            <p className="text-xs text-gray-400 mt-3">
              We typically respond within 48 hours. Your email will not be shared with third parties.
            </p>
          </form>
        </div>
      </section>

      {/* Footer links */}
      <div className="max-w-4xl mx-auto px-4 pb-8 text-sm text-gray-400 flex gap-6">
        <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
        <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
        <Link href="/health" className="hover:text-teal-600 transition-colors">Travel Health Guide</Link>
      </div>
    </main>
  );
}
