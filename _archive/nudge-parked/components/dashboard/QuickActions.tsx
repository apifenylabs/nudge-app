'use client'

import { Plus, MessageSquare, Bell, Download, Share2, Sparkles, Bot } from 'lucide-react'
import { useState, useCallback } from 'react'
import { buildAppUrl } from '@/lib/config'
import SmartTaskCreator from '@/components/dashboard/SmartTaskCreator'
import InlinePromo from '@/components/telegram/InlinePromo'

interface FamilyMember {
  id: string
  name: string
}

interface QuickActionsProps {
  familyId: string
  userId: string
  telegramConnected: boolean
  members?: FamilyMember[]
  userName?: string
  familyName?: string
  onTaskCreated?: () => void
}

export default function QuickActions({
  familyId,
  userId,
  telegramConnected,
  members = [],
  userName,
  familyName,
  onTaskCreated,
}: QuickActionsProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [smartCreatorOpen, setSmartCreatorOpen] = useState(false)
  const familyCode = familyId.slice(0, 8).toUpperCase()
  const inviteLink = buildAppUrl(`/join/${familyCode}`)

  const actions = [
    {
      title: 'Smart Task',
      description: 'Type or speak naturally — AI handles the rest',
      icon: <Sparkles className="h-5 w-5" />,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300',
      onClick: () => setSmartCreatorOpen(true),
    },
    {
      title: 'Reminders',
      description: 'Set recurring reminders',
      icon: <Bell className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300',
      onClick: () => setSmartCreatorOpen(true),
    },
    {
      title: 'Invite Family',
      description: 'Share join code or link',
      icon: <Plus className="h-5 w-5" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300',
      onClick: () => setShowShareModal(true),
    },
    {
      title: 'Message Family',
      description: 'Broadcast to everyone',
      icon: <MessageSquare className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300',
      onClick: () => setSmartCreatorOpen(true),
    },
  ]

  const handleShare = () => setShowShareModal(true)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-border/60">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Common actions for your family
        </p>
      </div>

      <div className="p-6">
        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className={`p-3 rounded-full ${action.color} mb-3`}>
                {action.icon}
              </div>
              <span className="font-medium text-gray-900 dark:text-white text-sm">
                {action.title}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                {action.description}
              </span>
            </button>
          ))}
        </div>

        {/* Smart Add — prominent CTA */}
        <button
          onClick={() => setSmartCreatorOpen(true)}
          className="w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 transition-all mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Smart Task Creator</p>
            <p className="text-xs text-indigo-500/70 dark:text-indigo-400/70">Type or speak naturally — AI parses assignee, due date, and priority</p>
          </div>
        </button>

        {/* Share Family */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Share Family
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Invite members with code or link
              </p>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
          </div>

          {/* Family Code */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Family Code
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {familyCode}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(familyCode)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded text-sm font-medium"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Share this code with family members to let them join
            </p>
          </div>
        </div>

        {/* Telegram Inline Mode Promotion */}
        <div className="mt-6">
          <InlinePromo telegramConnected={telegramConnected} />
        </div>
      </div>

      {/* Smart Task Creator Modal */}
      {smartCreatorOpen && (
        <SmartTaskCreator
          familyId={familyId}
          userId={userId}
          userName={userName}
          familyName={familyName}
          members={members}
          onTaskCreated={() => {
            onTaskCreated?.()
            setSmartCreatorOpen(false)
          }}
          onClose={() => setSmartCreatorOpen(false)}
          autoOpen
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Share Family
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Invite Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Invitation Link
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={inviteLink}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => copyToClipboard(inviteLink)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-r-lg"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Family Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Family Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={familyCode}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-center font-bold text-lg"
                    />
                    <button
                      onClick={() => copyToClipboard(familyCode)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-r-lg"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Share Options */}
                <div className="pt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Share via
                  </p>
                  <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center p-3 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-300 rounded-lg">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Telegram
                    </button>
                    <button className="flex-1 flex items-center justify-center p-3 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-600 dark:text-green-300 rounded-lg">
                      <span className="mr-2">📧</span>
                      Email
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
