'use client'

import { ListTodo, Users, BarChart3, Settings, Shield, Gift } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BottomNavProps {
  isAdmin?: boolean
}

export default function BottomNav({ isAdmin }: BottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Tasks', icon: ListTodo, href: '/dashboard', color: 'text-indigo-500' },
    { label: 'Family', icon: Users, href: '/dashboard/family', color: 'text-amber-500' },
    { label: 'Stats', icon: BarChart3, href: '/dashboard/stats', color: 'text-emerald-500' },
    { label: 'Refer', icon: Gift, href: '/dashboard/referrals', color: 'text-rose-500' },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings', color: 'text-pink-500' },
    ...(isAdmin ? [{ label: 'Admin', icon: Shield, href: '/dashboard/admin', color: 'text-purple-500' }] : []),
  ]

  return (
    <nav className="bottom-nav md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? item.color : ''}`} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
