import Link from 'next/link';
import { Zap, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 mb-8">Have a charging station to add? Found incorrect data? Get in touch.</p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-3 mb-6">
            <Mail size={20} className="text-gray-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <a href="mailto:hello@evchargingasia.com" className="text-sky-600 hover:underline text-sm">hello@evchargingasia.com</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-gray-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-sm text-gray-600">Hong Kong / Asia Pacific</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
