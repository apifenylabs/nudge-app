'use client'

import { Mic, Trash2, Clock, User, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface VoiceTask {
  id: string
  text: string
  assignedTo?: string
  dueDate?: string
  status: 'pending' | 'done' | 'cancelled'
  createdAt: string
}

export default function VoiceTaskLog() {
  const [tasks, setTasks] = useState<VoiceTask[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Load from localStorage for now (will be Supabase later)
    try {
      const stored = localStorage.getItem('nudge_voice_tasks')
      if (stored) {
        setTasks(JSON.parse(stored))
      }
    } catch {}
    setLoaded(true)
  }, [])

  const clearTasks = () => {
    setTasks([])
    localStorage.removeItem('nudge_voice_tasks')
  }

  if (!loaded) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mic size={16} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Voice Tasks
          </h3>
          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        {tasks.length > 0 && (
          <button
            onClick={clearTasks}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <Trash2 size={12} />
            Clear
          </button>
        )}
      </div>

      <div className="p-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <Mic size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Tap the mic button to create your first voice task
            </p>
            <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
              Tasks created by voice appear here automatically
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Mic size={14} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {task.text}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    {task.assignedTo && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <User size={10} />
                        {task.assignedTo}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={10} />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      task.status === 'done'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : task.status === 'cancelled'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {task.status === 'done' ? 'Done' : task.status === 'cancelled' ? 'Cancelled' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
