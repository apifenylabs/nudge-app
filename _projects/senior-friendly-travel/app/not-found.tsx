import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
            <Compass size={40} className="text-emerald-500" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-emerald-600 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          This family travel page has wandered off the trail. Let us help you find your way back.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            <Compass size={18} />
            Back to Home
          </Link>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-400 mb-3">Explore more family travel:</p>
            <div className="flex flex-wrap justify-center gap-3">
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
