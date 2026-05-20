'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Bot, Loader2, CheckCircle, AlertCircle, ExternalLink, Copy, Check } from 'lucide-react'

export default function InlineSetupGuide() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [botInfo, setBotInfo] = useState<any>(null)
  const [copiedStep, setCopiedStep] = useState<string | null>(null)

  useEffect(() => {
    checkInlineStatus()
  }, [])

  const checkInlineStatus = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/telegram/inline?action=status')
      if (res.ok) {
        const data = await res.json()
        setBotInfo(data)
        setStatus('ready')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const tryRegister = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/telegram/inline?action=register')
      const data = await res.json()
      setBotInfo(data)
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(key)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const steps = [
    {
      icon: <Bot size={20} />,
      title: 'Open @BotFather',
      description: 'In Telegram, search for @BotFather and start a chat',
      copy: 'https://t.me/BotFather',
      action: (
        <a
          href="https://t.me/BotFather"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          Open @BotFather <ExternalLink size={12} />
        </a>
      ),
    },
    {
      icon: <MessageSquare size={20} />,
      title: 'Send /setinline',
      description: 'Type /setinline in the chat, then select @nudgebot',
      copy: '/setinline',
      action: (
        <button
          onClick={() => copyToClipboard('/setinline', 'step2')}
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          {copiedStep === 'step2' ? (
            <><Check size={14} className="text-green-500" /> Copied!</>
          ) : (
            <><Copy size={14} /> Copy command</>
          )}
        </button>
      ),
    },
    {
      icon: <MessageSquare size={20} />,
      title: 'Set placeholder text',
      description: 'When prompted, paste: "Remind Jake to take out trash..."',
      copy: 'Remind Jake to take out trash tonight',
      action: (
        <button
          onClick={() => copyToClipboard('Remind Jake to take out trash tonight', 'step3')}
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          {copiedStep === 'step3' ? (
            <><Check size={14} className="text-green-500" /> Copied!</>
          ) : (
            <><Copy size={14} /> Copy placeholder</>
          )}
        </button>
      ),
    },
    {
      icon: <CheckCircle size={20} />,
      title: 'Done!',
      description: 'Users can now type @nudgebot in any chat to create tasks',
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Bot size={18} className="text-blue-500" />
          Telegram Inline Setup
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Enable @nudgebot for inline task creation from any chat
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Status check */}
        {status === 'loading' && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Loader2 size={18} className="text-blue-500 animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Checking inline mode status...</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <AlertCircle size={18} className="text-red-500" />
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-400">Could not check status</p>
              <p className="text-xs text-red-500 dark:text-red-500 mt-0.5">API not available. Deploy to Vercel first.</p>
            </div>
          </div>
        )}

        {status === 'ready' && botInfo && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Bot: <strong>{botInfo.bot?.result?.first_name || 'nudgebot'}</strong>
              </span>
            </div>
            {botInfo.bot?.result?.supports_inline_queries && (
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm text-green-700 dark:text-green-400">Inline queries enabled ✅</span>
              </div>
            )}
            {!botInfo.bot?.result?.supports_inline_queries && (
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-yellow-500" />
                <span className="text-sm text-yellow-700 dark:text-yellow-400">
                  Inline not yet enabled. Follow setup steps below.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Setup steps */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Setup Instructions
          </h4>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 my-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {step.description}
                  </p>
                  {step.action && (
                    <div className="mt-1.5">
                      {step.action}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test inline mode */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
            🎉 Ready to test?
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Open any Telegram chat and type:
          </p>
          <div
            onClick={() => copyToClipboard('@nudgebot Remind Jake to take out trash', 'test')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 mb-2 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <code className="text-sm text-blue-600 dark:text-blue-400 font-mono">
              @nudgebot Remind Jake to take out trash
            </code>
            <div className="flex items-center gap-1 mt-1.5">
              {copiedStep === 'test' ? (
                <span className="text-xs text-green-500 flex items-center gap-1"><Check size={12} /> Copied!</span>
              ) : (
                <span className="text-xs text-gray-400 flex items-center gap-1"><Copy size={12} /> Tap to copy</span>
              )}
            </div>
          </div>
          <a
            href="https://t.me/nudgebot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Open @nudgebot <ExternalLink size={10} />
          </a>
        </div>

        {/* Re-register button */}
        <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Description and name can be updated anytime
          </p>
          <button
            onClick={tryRegister}
            disabled={status === 'loading'}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              'Update Bot Info'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
