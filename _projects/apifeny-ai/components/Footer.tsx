import Link from 'next/link';
import AffiliateLink from './affiliate/AffiliateLink';

export default function Footer() {
 return (
 <footer className="relative border-t border-gray-200 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
 {/* Brand */}
 <div className="sm:col-span-2 lg:col-span-2">
 <Link href="/" className="flex items-center gap-2 mb-4">
 <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon to-aqua flex items-center justify-center">
 <span className="text-gray-900 font-bold text-xs">A</span>
 </div>
 <span className="text-lg font-bold text-gray-900">
 Apifeny<span className="text-neon">AI</span>
 </span>
 </Link>
 <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-4">
 Curated AI tools directory with Asia-ready filters.
 Find the perfect AI tool for every use case, built for solopreneurs and teams across Asia.
 </p>
 <p className="text-gray-400 text-xs flex items-center gap-2">
 <span className="w-1.5 h-1.5 rounded-full bg-neon" />
 AI-powered directory — built for Asia
 </p>
 </div>

 {/* Quick Links */}
 <div>
 <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Quick Links</h3>
 <ul className="space-y-3">
 <li>
 <Link href="/tools" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Browse Tools
 </Link>
 </li>
 <li>
 <Link href="/submit" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Submit a Tool
 </Link>
 </li>
 <li>
 <Link href="/blog" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Blog
 </Link>
 </li>
 <li>
 <Link href="/playbooks" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Playbooks
 </Link>
 </li>
 <li>
 <Link href="/revenue" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Revenue Tracker
 </Link>
 </li>
 <li>
 <Link href="/about" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 About Us
 </Link>
 </li>
 </ul>
 </div>

 {/* Sister Sites */}
 <div>
 <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Our Network</h3>
 <ul className="space-y-3">
 <li>
 <a href="https://www.familytravelasia.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Family Travel Asia
 </a>
 </li>
 <li>
 <a href="https://luxury-family-travel-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Luxury Family Travel Asia
 </a>
 </li>
 <li>
 <a href="https://ev-charging-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 EV Charging Asia
 </a>
 </li>
 <li>
 <a href="https://apifeny-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Apifeny AI
 </a>
 </li>
 <li>
 <a href="https://kids-activities-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Kids Activities Asia
 </a>
 </li>
 <li>
 <a href="https://senior-friendly-travel-asia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Senior-Friendly Travel Asia
 </a>
 </li>
 <li>
 <a href="https://social-beast.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Social Beast
 </a>
 </li>
 </ul>
 </div>

 {/* Legal */}
 <div>
 <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Legal</h3>
 <ul className="space-y-3">
 <li>
 <Link href="/privacy" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Privacy Policy
 </Link>
 </li>
 <li>
 <Link href="/terms" className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 group">
 <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-neon transition" />
 Terms of Service
 </Link>
 </li>
 </ul>
 </div>
 </div>

 {/* Plan Your Trip — Monetization Bar */}
 <div className="mb-8">
 <h3 className="text-sm font-semibold text-neon mb-4 text-center uppercase tracking-wider">Plan Your Trip</h3>
 <div className="flex flex-wrap justify-center gap-3">
 <AffiliateLink href="https://www.booking.com" provider="booking.com">
 🏨 Hotels
 </AffiliateLink>
 <AffiliateLink href="https://www.klook.com" provider="klook">
 🎫 Activities
 </AffiliateLink>
 <AffiliateLink href="https://www.viator.com" provider="viator">
 🏛️ Tours
 </AffiliateLink>
 <AffiliateLink href="https://www.getyourguide.com" provider="getyourguide">
 🌟 Experiences
 </AffiliateLink>
 <AffiliateLink href="https://www.expedia.com" provider="expedia">
 🚗 Car Rental
 </AffiliateLink>
 </div>
 </div>

 {/* Affiliate Disclosure */}
 <div className="mb-8 text-center">
 <p className="text-gray-400 text-xs leading-relaxed">
 Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
 As an Amazon Associate and Klook Partner, we earn from qualifying purchases.
 </p>
 </div>

 {/* Bottom bar */}
 <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
 <p className="text-gray-400 text-xs">
 &copy; {new Date().getFullYear()} Apifeny AI. All rights reserved.
 </p>
 <div className="flex items-center gap-4 text-gray-400 text-xs">
 <Link href="/privacy" className="hover:text-gray-900 transition">Privacy</Link>
 <span className="text-gray-300">·</span>
 <Link href="/terms" className="hover:text-gray-900 transition">Terms</Link>
 <span className="text-gray-300">·</span>
 <Link href="/health" className="hover:text-gray-900 transition">Status</Link>
 </div>
 </div>
 </div>
 </footer>
 );
}
