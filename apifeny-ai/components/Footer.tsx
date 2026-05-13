import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-tech-500/20 bg-tech-900">
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon to-aqua flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="text-lg font-bold text-white">
                Apifeny<span className="text-neon">AI</span>
              </span>
            </Link>
            <p className="text-tech-200 text-sm max-w-md leading-relaxed mb-4">
              Curated AI tools directory with Asia-ready filters.
              Find the perfect AI tool for every use case, built for solopreneurs and teams across Asia.
            </p>
            <p className="text-tech-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-glow" />
              AI-powered directory — built for Asia
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Submit a Tool
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Our Network</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.familytravelasia.com" target="_blank" rel="noopener noreferrer" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Asia Family Travel Directory
                </a>
              </li>
              <li>
                <a href="https://luxuryfamilytravelasia.com" target="_blank" rel="noopener noreferrer" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Luxury Family Travel Asia
                </a>
              </li>
              <li>
                <a href="https://ev-charging-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  EV Charging Asia
                </a>
              </li>
              <li>
                <a href="https://kids-activities-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Kids Activities Asia
                </a>
              </li>
              <li>
                <a href="https://nudge-sigma-liart.vercel.app" target="_blank" rel="noopener noreferrer" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Nudge
                </a>
              </li>
              <li>
                <a href="https://social-beast-two.vercel.app" target="_blank" rel="noopener noreferrer" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Social Beast
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-tech-200 hover:text-white text-sm transition flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-tech-500 group-hover:bg-neon transition" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mb-8 text-center">
          <p className="text-tech-300 text-xs leading-relaxed">
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
            As an Amazon Associate and Klook Partner, we earn from qualifying purchases.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-tech-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-tech-300 text-xs">
            &copy; {new Date().getFullYear()} Apifeny AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-tech-300 text-xs">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <span className="text-tech-500">·</span>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <span className="text-tech-500">·</span>
            <Link href="/health" className="hover:text-white transition">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
