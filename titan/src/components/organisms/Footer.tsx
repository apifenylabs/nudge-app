import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              ⚡ Titan
            </span>
            <span className="text-gray-500 text-sm hidden sm:inline">
              — Level Up Your Agents
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-amber-400 transition-colors">
              About
            </Link>
            <Link href="/changelog" className="text-gray-400 hover:text-amber-400 transition-colors">
              Changelog
            </Link>
            <Link href="/robotics" className="text-gray-400 hover:text-amber-400 transition-colors">
              Robotics
            </Link>
            <Link href="/referral" className="text-gray-400 hover:text-amber-400 transition-colors">
              Referral
            </Link>
            <Link href="/waitlist" className="text-gray-400 hover:text-amber-400 transition-colors">
              Join Waitlist
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Apifeny Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
