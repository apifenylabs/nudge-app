'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Overview', icon: '📊' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/families', label: 'Families', icon: '🏠' },
  { href: '/admin/subscriptions', label: 'Subscriptions', icon: '💰' },
  { href: '/admin/logs', label: 'Activity Log', icon: '📋' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shrink-0">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl">⚙️</span>
          <span className="font-semibold text-gray-900 dark:text-white">Admin Panel</span>
        </Link>
      </div>
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </aside>
  )
}
