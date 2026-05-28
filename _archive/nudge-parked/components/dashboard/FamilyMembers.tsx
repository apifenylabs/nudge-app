'use client'

import { Users, UserPlus, MessageSquare, MoreVertical, CheckCircle, XCircle, Loader2, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { buildAppUrl } from '@/lib/config'

interface FamilyMember {
  id: string
  name: string
  email: string
  role: string
  telegramUsername?: string
  avatarUrl?: string
}

interface FamilyMembersProps {
  members: FamilyMember[]
  familyId: string
  userId: string
}

type InviteState = 'idle' | 'sending' | 'sent' | 'error'

export default function FamilyMembers({ members, familyId, userId }: FamilyMembersProps) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'member' | 'admin'>('member')
  const [inviteState, setInviteState] = useState<InviteState>('idle')
  const [inviteResult, setInviteResult] = useState<{
    success: boolean
    message?: string
    inviteLink?: string
    telegramLink?: string
    inviteCode?: string
    autoJoined?: boolean
    emailSent?: boolean
    emailError?: string
  } | null>(null)

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setInviteState('sending')
    setInviteResult(null)

    try {
      const res = await fetch('/api/family/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      })

      const data = await res.json()

      if (!res.ok) {
        setInviteState('error')
        setInviteResult({ success: false, message: data.error || 'Failed to send invite' })
        return
      }

      setInviteState('sent')
      setInviteResult(data)
    } catch (err: any) {
      setInviteState('error')
      setInviteResult({ success: false, message: err.message || 'Network error' })
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    // Toast could be added here
  }

  const resetInvite = () => {
    setInviteModalOpen(false)
    setInviteEmail('')
    setInviteRole('member')
    setInviteState('idle')
    setInviteResult(null)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'admin': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const isOwner = members.find(m => m.id === userId)?.role === 'owner'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Family Members
            </h3>
          </div>
          <button
            onClick={() => setInviteModalOpen(true)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Invite
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {members.length} member{members.length !== 1 ? 's' : ''} in your family
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {members.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No family members yet</p>
              <p className="text-sm">Invite your family to get started!</p>
            </div>
          ) : (
            members.map(member => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shrink-0">
                    {member.avatarUrl ? (
                      <img 
                        src={member.avatarUrl} 
                        alt={member.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium text-sm">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  {/* Member Info */}
                  <div className="ml-3 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {member.name}
                      </p>
                      <span className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {member.email}
                    </p>
                    {member.telegramUsername && (
                      <div className="flex items-center mt-1">
                        <MessageSquare className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          @{member.telegramUsername}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  {member.telegramUsername && (
                    <button
                      onClick={() => window.open(`https://t.me/${member.telegramUsername}`, '_blank')}
                      className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Message on Telegram"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  )}
                  {isOwner && member.id !== userId && (
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Invite Modal */}
        {inviteModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {inviteState === 'sent' ? 'Invitation Sent! 🎉' : 'Invite Family Member'}
                </h3>
              </div>

              {inviteState === 'sent' && inviteResult ? (
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                        {inviteResult.message || 'Invitation sent!'}
                      </p>
                      {inviteResult.autoJoined && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                          They already have an account and were auto-added.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Share invite link */}
                  {inviteResult.inviteLink && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                        Invite Link
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          readOnly
                          value={inviteResult.inviteLink}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          onClick={(e) => (e.target as HTMLInputElement).select()}
                        />
                        <button
                          onClick={() => copyToClipboard(inviteResult.inviteLink!, 'Link')}
                          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-r-lg"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Share Telegram link */}
                  {inviteResult.telegramLink && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                        Telegram Share
                      </label>
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(inviteResult.telegramLink)}&text=${encodeURIComponent('Join our family on Nudge!')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Share on Telegram
                      </a>
                    </div>
                  )}

                  {inviteResult.inviteCode && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Or share this invite code:
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <span className="font-mono font-bold text-lg tracking-wider text-gray-900 dark:text-white">
                          {inviteResult.inviteCode}
                        </span>
                        <button
                          onClick={() => copyToClipboard(inviteResult.inviteCode!, 'Code')}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={resetInvite}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all"
                  >
                    Invite Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInvite} className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="family.member@example.com"
                        required
                        disabled={inviteState === 'sending'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Role
                      </label>
                      <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value as 'member' | 'admin')}
                        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        disabled={inviteState === 'sending'}
                      >
                        <option value="member">Member — Can view and complete tasks</option>
                        <option value="admin">Admin — Can invite others and manage tasks</option>
                      </select>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-4">
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        An invitation email will be sent with a link to join. 
                        They can also enter your family code in the app.
                      </p>
                    </div>

                    {inviteState === 'error' && inviteResult && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                        <XCircle className="w-4 h-4 shrink-0" />
                        {inviteResult.message || 'Failed to send invite'}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-3 pt-6">
                    <button
                      type="button"
                      onClick={resetInvite}
                      className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      disabled={inviteState === 'sending'}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={inviteState === 'sending'}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all flex items-center gap-2"
                    >
                      {inviteState === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Send Invite
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
