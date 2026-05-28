'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Users, UserPlus, MessageSquare, Copy, Check,
  Crown, Shield, User as UserIcon, MoreVertical, Share2,
  CheckCircle, Clock, ExternalLink, Loader2, XCircle,
  Sparkles, AlertTriangle
} from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'
import { buildAppUrl } from '@/lib/config'

interface FamilyInfo {
  id: string
  name: string
  inviteCode: string
}

interface FamilyMember {
  id: string
  name: string
  email: string
  role: string
  telegramUsername: string | null
}

interface FamilyPageClientProps {
  family: FamilyInfo | null
  currentUserId: string
  currentRole: string
  members: FamilyMember[]
  tasks: { assigned_to: string | null; status: string }[]
  currentPlan: 'free' | 'pro' | 'family'
}

type InviteState = 'idle' | 'sending' | 'sent' | 'error'

export default function FamilyPageClient({
  family, currentUserId, currentRole, members, tasks, currentPlan,
}: FamilyPageClientProps) {
  const [copied, setCopied] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'member' | 'admin'>('member')
  const [inviteState, setInviteState] = useState<InviteState>('idle')
  const [inviteMessage, setInviteMessage] = useState('')

  if (!family) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-foreground font-semibold mb-2">No family found</p>
          <Link href="/onboarding" className="btn-primary text-sm">Create a family</Link>
        </div>
      </div>
    )
  }

  const inviteLink = buildAppUrl(`/join/${family.inviteCode}`)
  const isOwner = currentRole === 'owner'
  const isAdmin = currentRole === 'admin' || isOwner

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setInviteState('sending')
    setInviteMessage('')

    try {
      const res = await fetch('/api/family/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      })

      const data = await res.json()

      if (!res.ok) {
        setInviteState('error')
        setInviteMessage(data.error || 'Failed to send invite')
        return
      }

      setInviteState('sent')
      setInviteMessage(data.message || 'Invitation sent!')
    } catch (err: any) {
      setInviteState('error')
      setInviteMessage(err.message || 'Network error')
    }
  }

  const closeInvite = () => {
    setInviteOpen(false)
    setInviteEmail('')
    setInviteRole('member')
    setInviteState('idle')
    setInviteMessage('')
  }

  // Compute member task stats
  const memberStats = members.map(m => {
    const assignedTasks = tasks.filter(t => t.assigned_to === m.id)
    return {
      ...m,
      totalTasks: assignedTasks.length,
      completedTasks: assignedTasks.filter(t => t.status === 'completed').length,
      pendingTasks: assignedTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length,
    }
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">Owner</span>
      case 'admin':
        return <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded">Admin</span>
      default:
        return null
    }
  }

  // Check if plan limits are hit
  const isFreePlan = currentPlan === 'free'
  const isProPlan = currentPlan === 'pro'
  const isFamilyPlan = currentPlan === 'family'
  const memberCountExcludingOwner = members.filter(m => m.role !== 'owner').length
  const maxFamilyMembers = isFreePlan ? 1 : isProPlan ? 4 : -1 // owner doesn't count toward limit
  const atCapacity = maxFamilyMembers !== -1 && memberCountExcludingOwner >= maxFamilyMembers

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">{family.name}</h1>
              <p className="text-xs text-muted-foreground">{members.length} member{members.length !== 1 ? 's' : ''} &middot; <span className="capitalize">{currentPlan}</span></p>
            </div>
          </div>
          {isAdmin && (
            <div className="relative">
              {atCapacity ? (
                <span className="block w-9 h-9 rounded-xl bg-muted text-muted-foreground flex items-center justify-center cursor-not-allowed" title="Member limit reached. Upgrade to add more.">
                  <UserPlus className="w-4 h-4" />
                </span>
              ) : (
                <button
                  onClick={() => setInviteOpen(true)}
                  className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors active:scale-90"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Family Sharing Upgrade Banner */}
        {!isFamilyPlan && isOwner && (
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-5 text-amber-950 shadow-lg shadow-amber-400/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">
                  {isFreePlan ? 'Unlock Family Sharing' : 'Go Unlimited'}
                </h3>
                <p className="text-xs text-amber-900/70 leading-relaxed mb-3">
                  {isFreePlan
                    ? 'Your Free plan supports 1 member. Upgrade to Family ($9/mo) for unlimited members, analytics, and API access.'
                    : 'Your Pro plan supports up to 5 members. Upgrade to Family ($9/mo) for unlimited members and advanced analytics.'
                  }
                </p>
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 text-amber-950 text-xs font-semibold hover:bg-white transition-all active:scale-[0.97]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Upgrade to Family
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* At capacity warning */}
        {atCapacity && isOwner && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Member Limit Reached</h3>
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  {isFreePlan
                    ? 'Your Free plan allows 1 member. Upgrade to Family to invite more.'
                    : `Your Pro plan allows up to ${maxFamilyMembers + 1} members. Upgrade to Family for unlimited.`
                  }
                </p>
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 dark:text-amber-300 underline mt-2 hover:text-amber-900 dark:hover:text-amber-200"
                >
                  Upgrade to Family <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Invite Section */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">Invite Code</h3>
            {copied ? (
              <span className="text-xs text-emerald-500 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3 h-3" /> Copied!
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 bg-secondary rounded-xl px-4 py-3 text-center">
              <span className="text-2xl font-bold tracking-widest text-foreground select-all">
                {family.inviteCode}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(family.inviteCode)}
              className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-xl px-3 py-2 text-xs text-muted-foreground truncate">
              {inviteLink}
            </div>
            <button
              onClick={() => copyToClipboard(inviteLink)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors shrink-0"
            >
              Copy Link
            </button>
          </div>

          {/* Telegram share */}
          <div className="mt-3">
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent('Join our family on Nudge — the family task manager! 🎯')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              Share on Telegram
            </a>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            Share your invite code or link with family members to let them join
          </p>
        </div>

        {/* Members List */}
        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border/40">
          <div className="px-5 py-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Members</h3>
            <span className="text-xs text-muted-foreground">{members.length} total</span>
          </div>

          {memberStats.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No members yet</p>
              <p className="text-xs text-muted-foreground">Invite your family to get started!</p>
            </div>
          ) : (
            memberStats.map(member => (
              <div key={member.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                        {getRoleBadge(member.role)}
                      </div>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>

                  {member.telegramUsername && (
                    <a
                      href={`https://t.me/${member.telegramUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-blue-500 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Task stats */}
                <div className="flex items-center gap-4 ml-13 mt-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-muted-foreground">{member.completedTasks} done</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-muted-foreground">{member.pendingTasks} pending</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground font-medium">{member.totalTasks} total</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {inviteOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevated max-w-md w-full p-6 animate-fade-in-up">
            {inviteState === 'sent' ? (
              <>
                <div className="flex items-center gap-3 mb-5 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">Invitation Sent!</h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">{inviteMessage || 'Sent successfully!'}</p>
                  </div>
                </div>
                <button onClick={closeInvite} className="btn-primary w-full text-sm">Done</button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-1">Invite Member</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Send an invitation to join &quot;{family.name}&quot;
                </p>

                <form onSubmit={handleInvite} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="input-field"
                      placeholder="family@example.com"
                      required
                      disabled={inviteState === 'sending'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                      Role
                    </label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as 'member' | 'admin')}
                      className="input-field"
                      disabled={inviteState === 'sending'}
                    >
                      <option value="member">Member</option>
                      {isOwner && <option value="admin">Admin</option>}
                    </select>
                  </div>

                  {inviteState === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                      <XCircle className="w-4 h-4 shrink-0" />
                      {inviteMessage}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeInvite} className="btn-ghost flex-1 text-sm" disabled={inviteState === 'sending'}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary flex-1 text-sm" disabled={inviteState === 'sending'}>
                      {inviteState === 'sending' ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </span>
                      ) : (
                        'Send Invite'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  )
}
