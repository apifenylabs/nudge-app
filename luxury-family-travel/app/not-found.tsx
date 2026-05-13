import Link from 'next/link';
import { Crown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
            <Crown size={40} className="text-amber-500" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-amber-600 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          This luxury destination page seems to have drifted off-course. Let us help you find the perfect getaway.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            <Crown size={18} />
            Back to Home
          </Link>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-400 mb-3">Explore more luxury travel:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://family-travel-directory.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
              >
                Family Travel Asia
              </a>
              <a
                href="https://ev-charging-asia.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:text-green-700 underline underline-offset-2"
              >
                EV Charging Asia
              </a>
              <a
                href="https://apifeny-ai.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:text-purple-700 underline underline-offset-2"
              >
                Apifeny AI Tools
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
