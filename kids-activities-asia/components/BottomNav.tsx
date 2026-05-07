import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/search', label: 'Browse', icon: '🔍' },
  { href: '/about', label: 'About', icon: 'ℹ️' },
  { href: '/contact', label: 'Contact', icon: '📧' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 sm:hidden z-50">
      <div className="flex justify-around items-center h-14">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-orange-500 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
