'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Users, Home, Settings, BarChart3, Shield, Search,
  Loader2, CheckCircle, XCircle, ShieldCheck, ShieldOff,
  UserCog, AlertTriangle, RefreshCw, ChevronLeft, ChevronRight,
} from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'

interface DashboardAdminClientProps {
  user: {
    id: string
    email: string
    fullName: string | null
  }
  stats: {
    total_users: number
    active_families: number
    tasks_today: number
    tasks_completed_today: number
    tasks_overdue: number
  }
  settings: Record<string, any>
}

interface UserData {
  id: string
  email: string
  full_name: string | null
  telegram_username: string | null
  telegram_connected: boolean
  is_admin: boolean
  family_id: string | null
  family_name: string | null
  family_role: string | null
  created_at: string
  updated_at: string
}

interface FamilyData {
  id: string
  name: string
  owner_name: string
  member_count: number
  tasks_created: number
  tasks_completed: number
  invite_code: string
  created_at: string
}

type Tab = 'overview' | 'users' | 'families' | 'settings'

function StatCard({ label, value, icon: Icon, color, sub }: {
  label: string
  value: string | number
  icon: React.ElementType
  color: string
  sub?: string
}) {
  const colorMap: Record<string, { bg: string, text: string }> = {
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
    green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
    red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
    indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
  }
  const c = colorMap[color] || colorMap.blue

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${c.text}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  )
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDateTime(d: string) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function TabButton({ label, active, onClick, icon: Icon }: {
  label: string
  active: boolean
  onClick: () => void
  icon: React.ElementType
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}

function AdminBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
      <Shield className="w-3 h-3" />
      Admin
    </span>
  )
}

export default function AdminDashboardClient({ user, stats, settings }: DashboardAdminClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  // Users state
  const [users, setUsers] = useState<UserData[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersPage, setUsersPage] = useState(1)
  const [usersTotal, setUsersTotal] = useState(0)
  const [usersSearch, setUsersSearch] = useState('')
  const [usersSearchInput, setUsersSearchInput] = useState('')

  // Families state
  const [families, setFamilies] = useState<FamilyData[]>([])
  const [familiesLoading, setFamiliesLoading] = useState(false)
  const [familiesPage, setFamiliesPage] = useState(1)
  const [familiesTotal, setFamiliesTotal] = useState(0)

  // Settings state
  const [adminSettings, setAdminSettings] = useState<Record<string, any>>(settings)
  const [savingSetting, setSavingSetting] = useState<string | null>(null)

  const usersPerPage = 20
  const familiesPerPage = 20

  // Fetch users
  const fetchUsers = useCallback(async (page: number, search?: string) => {
    setUsersLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(usersPerPage) })
      if (search) params.set('search', search)
      const res = await fetch(`/api/admin/users?${params}`)
      const data = await res.json()
      if (data.users) {
        setUsers(data.users)
        setUsersTotal(data.total)
      }
    } catch (err) {
      console.error('Failed to fetch users', err)
    } finally {
      setUsersLoading(false)
    }
  }, [])

  // Fetch families
  const fetchFamilies = useCallback(async (page: number) => {
    setFamiliesLoading(true)
    try {
      const res = await fetch(`/api/admin/families?page=${page}&limit=${familiesPerPage}`)
      const data = await res.json()
      if (data.families) {
        setFamilies(data.families)
        setFamiliesTotal(data.total)
      }
    } catch (err) {
      console.error('Failed to fetch families', err)
    } finally {
      setFamiliesLoading(false)
    }
  }, [])

  // Toggle admin role
  const toggleAdminRole = async (userId: string, currentIsAdmin: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_admin: !currentIsAdmin }),
      })
      if (res.ok) {
        setUsers(prev => prev.map(u =>
          u.id === userId ? { ...u, is_admin: !currentIsAdmin } : u
        ))
      }
    } catch (err) {
      console.error('Failed to update role', err)
    }
  }

  // Update setting
  const updateSetting = async (key: string, value: any) => {
    setSavingSetting(key)
    // For now just optimistic update — in a real app this would hit a dedicated endpoint
    setAdminSettings(prev => ({ ...prev, [key]: value }))
    setTimeout(() => setSavingSetting(null), 500)
  }

  // Load data on tab switch
  useEffect(() => {
    if (activeTab === 'users') fetchUsers(usersPage)
    if (activeTab === 'families') fetchFamilies(familiesPage)
  }, [activeTab, usersPage, familiesPage, fetchUsers, fetchFamilies])

  const totalPages = Math.ceil(usersTotal / usersPerPage)
  const familiesTotalPages = Math.ceil(familiesTotal / familiesPerPage)

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              Admin
            </h1>
          </div>
          <AdminBadge />
        </div>

        {/* Tab bar */}
        <div className="max-w-4xl mx-auto px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          <TabButton label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={BarChart3} />
          <TabButton label="Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={Users} />
          <TabButton label="Families" active={activeTab === 'families'} onClick={() => setActiveTab('families')} icon={Home} />
          <TabButton label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={Settings} />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* ========================= OVERVIEW TAB ========================= */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <StatCard
                label="Total Users"
                value={stats.total_users}
                icon={Users}
                color="blue"
                sub="Registered accounts"
              />
              <StatCard
                label="Active Families"
                value={stats.active_families}
                icon={Home}
                color="green"
                sub="Total families"
              />
              <StatCard
                label="Tasks Today"
                value={stats.tasks_today}
                icon={BarChart3}
                color="amber"
                sub="Created today"
              />
              <StatCard
                label="Completed Today"
                value={stats.tasks_completed_today}
                icon={CheckCircle}
                color="purple"
                sub="Tasks done today"
              />
              <StatCard
                label="Overdue"
                value={stats.tasks_overdue}
                icon={AlertTriangle}
                color="red"
                sub="Past due tasks"
              />
            </div>

            {/* Quick links to existing admin pages */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-bold text-foreground mb-4">Admin Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/admin/users"
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">User Management</p>
                    <p className="text-xs text-muted-foreground">Full admin user list</p>
                  </div>
                </Link>
                <Link
                  href="/admin/families"
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Home className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Family Management</p>
                    <p className="text-xs text-muted-foreground">View all families</p>
                  </div>
                </Link>
                <Link
                  href="/admin/subscriptions"
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Subscriptions</p>
                    <p className="text-xs text-muted-foreground">Stripe billing overview</p>
                  </div>
                </Link>
                <Link
                  href="/admin/logs"
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Activity Log</p>
                    <p className="text-xs text-muted-foreground">Recent activity</p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* ========================= USERS TAB ========================= */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={usersSearchInput}
                onChange={(e) => setUsersSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setUsersSearch(usersSearchInput)
                    setUsersPage(1)
                    fetchUsers(1, usersSearchInput)
                  }
                }}
                className="input-field pl-10"
              />
              {usersSearchInput && (
                <button
                  onClick={() => {
                    setUsersSearchInput('')
                    setUsersSearch('')
                    setUsersPage(1)
                    fetchUsers(1)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Users table */}
            <div className="glass-card rounded-2xl overflow-hidden">
              {usersLoading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : users.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {usersSearch ? 'No users match your search' : 'No data yet'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/40 bg-secondary/30">
                        <th className="text-left p-3 font-medium text-muted-foreground">User</th>
                        <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                        <th className="text-center p-3 font-medium text-muted-foreground">Role</th>
                        <th className="text-center p-3 font-medium text-muted-foreground hidden md:table-cell">Family</th>
                        <th className="text-right p-3 font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors last:border-0">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-xs">
                                  {(u.full_name || u.email).charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate max-w-[120px] sm:max-w-none">
                                  {u.full_name || '—'}
                                </p>
                                <p className="text-xs text-muted-foreground truncate max-w-[120px] sm:hidden">
                                  {u.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-muted-foreground hidden sm:table-cell">
                            <span className="truncate max-w-[180px] inline-block">{u.email}</span>
                          </td>
                          <td className="p-3 text-center">
                            {u.is_admin ? (
                              <AdminBadge />
                            ) : (
                              <span className="text-xs text-muted-foreground">Member</span>
                            )}
                          </td>
                          <td className="p-3 text-center hidden md:table-cell">
                            <span className="text-xs text-muted-foreground">
                              {u.family_name || '—'}
                            </span>
                          </td>
                          <td className="p-3 text-right text-xs text-muted-foreground hidden lg:table-cell">
                            {formatDate(u.created_at)}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => toggleAdminRole(u.id, u.is_admin)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                u.is_admin
                                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                                  : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                              }`}
                              title={u.is_admin ? 'Remove admin' : 'Make admin'}
                            >
                              <UserCog className="w-3 h-3" />
                              {u.is_admin ? 'Demote' : 'Promote'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border/40 bg-secondary/20">
                  <p className="text-xs text-muted-foreground">
                    {usersTotal} total users
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setUsersPage(p => Math.max(1, p - 1))}
                      disabled={usersPage <= 1}
                      className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {usersPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setUsersPage(p => Math.min(totalPages, p + 1))}
                      disabled={usersPage >= totalPages}
                      className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================= FAMILIES TAB ========================= */}
        {activeTab === 'families' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl overflow-hidden">
              {familiesLoading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : families.length === 0 ? (
                <div className="p-12 text-center">
                  <Home className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No data yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/40 bg-secondary/30">
                        <th className="text-left p-3 font-medium text-muted-foreground">Family</th>
                        <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Owner</th>
                        <th className="text-center p-3 font-medium text-muted-foreground">Members</th>
                        <th className="text-center p-3 font-medium text-muted-foreground hidden md:table-cell">Tasks</th>
                        <th className="text-center p-3 font-medium text-muted-foreground hidden lg:table-cell">Completed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {families.map((f) => (
                        <tr key={f.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors last:border-0">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-xs">
                                  {f.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{f.name}</p>
                                <p className="text-xs text-muted-foreground hidden sm:block">
                                  Code: {f.invite_code}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-muted-foreground hidden sm:table-cell">
                            <span className="text-xs">{f.owner_name}</span>
                          </td>
                          <td className="p-3 text-center">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                              {f.member_count}
                            </span>
                          </td>
                          <td className="p-3 text-center text-muted-foreground hidden md:table-cell">
                            {f.tasks_created}
                          </td>
                          <td className="p-3 text-center hidden lg:table-cell">
                            <span className="text-xs text-green-600 dark:text-green-400">
                              {f.tasks_completed}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {familiesTotalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border/40 bg-secondary/20">
                  <p className="text-xs text-muted-foreground">
                    {familiesTotal} total families
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFamiliesPage(p => Math.max(1, p - 1))}
                      disabled={familiesPage <= 1}
                      className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {familiesPage} / {familiesTotalPages}
                    </span>
                    <button
                      onClick={() => setFamiliesPage(p => Math.min(familiesTotalPages, p + 1))}
                      disabled={familiesPage >= familiesTotalPages}
                      className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================= SETTINGS TAB ========================= */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            {/* Feature Toggles */}
            <section>
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Feature Toggles
              </h3>
              <div className="glass-card rounded-2xl divide-y divide-border/40 overflow-hidden">
                {[
                  { key: 'features.allow_telegram', label: 'Telegram Integration', desc: 'Allow users to connect Telegram' },
                  { key: 'features.allow_voice', label: 'Voice Task Creation', desc: 'Enable voice recording for tasks' },
                  { key: 'features.allow_gamification', label: 'Gamification', desc: 'Points, streaks, and achievements' },
                  { key: 'features.allow_referrals', label: 'Referral Program', desc: 'Allow users to invite friends' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between px-4 py-3.5">
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <button
                      onClick={() => updateSetting(key, !adminSettings[key])}
                      className={`relative w-10 h-6 rounded-full transition-colors ${
                        adminSettings[key] === true || adminSettings[key] === 'true'
                          ? 'bg-indigo-500'
                          : 'bg-secondary'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                          adminSettings[key] === true || adminSettings[key] === 'true'
                            ? 'translate-x-4'
                            : ''
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* System Settings */}
            <section>
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" /> System Settings
              </h3>
              <div className="glass-card rounded-2xl divide-y divide-border/40 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">Maintenance Mode</p>
                    <p className="text-xs text-muted-foreground">Put the app in read-only mode</p>
                  </div>
                  <button
                    onClick={() => updateSetting('system.maintenance_mode', !adminSettings['system.maintenance_mode'])}
                    className={`relative w-10 h-6 rounded-full transition-colors ${
                      adminSettings['system.maintenance_mode'] === true || adminSettings['system.maintenance_mode'] === 'true'
                        ? 'bg-red-500'
                        : 'bg-secondary'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        adminSettings['system.maintenance_mode'] === true || adminSettings['system.maintenance_mode'] === 'true'
                          ? 'translate-x-4'
                          : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">Max Family Members</p>
                    <p className="text-xs text-muted-foreground">Maximum members per family</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {adminSettings['system.max_family_members'] || 20}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">Trial Duration</p>
                    <p className="text-xs text-muted-foreground">Free trial in days</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {adminSettings['system.trial_days'] || 14} days
                  </span>
                </div>
              </div>
            </section>

            {/* Notifications Defaults */}
            <section>
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Notification Defaults
              </h3>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Notifications Enabled by Default</p>
                    <p className="text-xs text-muted-foreground">New users get notifications turned on</p>
                  </div>
                  <button
                    onClick={() => updateSetting('notifications.default_enabled', !adminSettings['notifications.default_enabled'])}
                    className={`relative w-10 h-6 rounded-full transition-colors ${
                      adminSettings['notifications.default_enabled'] === true || adminSettings['notifications.default_enabled'] === 'true'
                        ? 'bg-indigo-500'
                        : 'bg-secondary'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        adminSettings['notifications.default_enabled'] === true || adminSettings['notifications.default_enabled'] === 'true'
                          ? 'translate-x-4'
                          : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Schema deployment */}
            <section>
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Database
              </h3>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Deploy the latest database schema including admin settings and user roles.
                </p>
                <Link
                  href="/api/deploy-schema"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Deploy Schema
                </Link>
              </div>
            </section>
          </div>
        )}

      </div>

      <BottomNav isAdmin={true} />
    </div>
  )
}
