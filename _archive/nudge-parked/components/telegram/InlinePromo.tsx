'use client'

import { useState } from 'react'
import { MessageSquare, Copy, Check, Sparkles, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

interface InlinePromoProps {
  telegramConnected: boolean
  tgUsername?: string | null
}

const EXAMPLE_TASKS = [
  'Remind Jake to take out trash tonight',
  'Sarah needs to water plants tomorrow',
  'Buy groceries: milk, eggs, bread',
  'Clean garage this weekend',
  'Pay electricity bill by Friday',
  'Walk the dog every evening',
]

export default function InlinePromo({ telegramConnected, tgUsername }: InlinePromoProps) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!telegramConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-500" />
            Telegram Inline
          </h3>
        </div>
        <div className="p-6">
          <div className="text-center py-6">
            <MessageSquare size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connect Telegram to use @nudgebot inline in any chat
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 mb-4">
              Create tasks without leaving your conversations
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-left">
              <code className="text-sm text-blue-700 dark:text-blue-300">
                @nudgebot Remind Jake about soccer practice
              </code>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-500" />
          @nudgebot Inline
          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-normal">
            Active
          </span>
        </h3>
        {expanded ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="p-6 space-y-4">
          {/* How it works */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
              How it works
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Type <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono text-xs">@nudgebot</code> in any Telegram chat, then type your task. Results appear inline!
            </p>
          </div>

          {/* Quick actions row */}
          <div className="flex gap-2 flex-wrap">
            <a
              href="https://t.me/nudgebot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
            >
              <MessageSquare size={14} />
              Open Bot
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Try these examples */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
              Try these in any chat
            </h4>
            <div className="space-y-1.5">
              {EXAMPLE_TASKS.map((task, i) => {
                const key = `ex_${i}`
                return (
                  <button
                    key={key}
                    onClick={() => copyToClipboard(`@nudgebot ${task}`, key)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <code className="text-xs text-left text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      @nudgebot {task}
                    </code>
                    {copied === key ? (
                      <Check size={14} className="text-green-500 flex-shrink-0" />
                    ) : (
                      <Copy size={14} className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tip */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                  Pro tip
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  Type <code className="bg-purple-100 dark:bg-purple-900/40 px-1 rounded font-mono">@nudgebot</code> in any group chat or private message to create tasks without switching apps.
                </p>
              </div>
            </div>
          </div>

          {/* Usage stats placeholder */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Inline mode available wherever Telegram is installed.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
