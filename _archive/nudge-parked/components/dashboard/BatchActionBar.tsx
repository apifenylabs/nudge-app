'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  CheckSquare, Square, X, CheckCircle, Trash2, User,
  Loader2, UserPlus, ArrowUp, ArrowDown, Sparkles, PartyPopper
} from 'lucide-react'

interface BatchActionBarProps {
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  onBatchComplete: (ids: string[]) => void
  onBatchDelete: (ids: string[]) => void
  onBatchAssign: (ids: string[], userId: string) => void
  totalTaskCount: number
  members: { id: string; name: string }[]
  userId: string
  selectMode: boolean
  onToggleSelectMode: () => void
  // When true, brief toast messages appear
  showToast?: (message: string, type?: 'success' | 'error' | 'info') => void
}

type BatchState = 'idle' | 'processing' | 'success' | 'error'

const KEYBOARD_SHORTCUTS = [
  { key: 'a', ctrl: true, label: 'Select all' },
  { key: 'Escape', ctrl: false, label: 'Cancel selection' },
  { key: 'c', ctrl: true, label: 'Complete selected' },
  { key: 'Delete', ctrl: false, label: 'Delete selected' },
]

export default function BatchActionBar({
  selectedIds,
  onSelectionChange,
  onBatchComplete,
  onBatchDelete,
  onBatchAssign,
  totalTaskCount,
  members,
  userId,
  selectMode,
  onToggleSelectMode,
  showToast,
}: BatchActionBarProps) {
  const [batchState, setBatchState] = useState<BatchState>('idle')
  const [showAssignDropdown, setShowAssignDropdown] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const selectCount = selectedIds.size

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) return

      // Ctrl+A: select all (or deselect if all selected)
      if (e.ctrlKey && e.key === 'a' && selectMode) {
        e.preventDefault()
        if (selectCount === totalTaskCount) {
          // Deselect all
          onSelectionChange(new Set())
        } else {
          // Select all — just toggle select mode so parent handles it
          onToggleSelectMode()
        }
        return
      }

      // Escape: clear selection and exit select mode
      if (e.key === 'Escape' && selectCount > 0) {
        e.preventDefault()
        onSelectionChange(new Set())
        onToggleSelectMode()
        return
      }

      // Ctrl+C: complete selected
      if (e.ctrlKey && e.key === 'c' && selectCount > 0) {
        e.preventDefault()
        handleBatchComplete()
        return
      }

      // Delete: delete selected
      if (e.key === 'Delete' && selectCount > 0) {
        e.preventDefault()
        setShowDeleteConfirm(true)
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectMode, selectCount, totalTaskCount])

  // Auto-close assign dropdown on click outside
  useEffect(() => {
    if (!showAssignDropdown) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-batch-assign]')) {
        setShowAssignDropdown(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [showAssignDropdown])

  const handleBatchComplete = useCallback(async () => {
    if (selectCount === 0 || batchState === 'processing') return
    setBatchState('processing')

    const ids = Array.from(selectedIds)
    try {
      const res = await fetch('/api/tasks/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          taskIds: ids,
          userId,
        }),
      })

      if (!res.ok) throw new Error('Batch complete failed')

      setBatchState('success')
      onBatchComplete(ids)
      onSelectionChange(new Set())
      showToast?.(`${ids.length} task${ids.length > 1 ? 's' : ''} completed! 🎉`, 'success')

      setTimeout(() => setBatchState('idle'), 1500)
    } catch (err) {
      console.error('Batch complete error:', err)
      setBatchState('error')
      showToast?.('Failed to complete tasks', 'error')
      setTimeout(() => setBatchState('idle'), 2000)
    }
  }, [selectedIds, userId, batchState, onBatchComplete, onSelectionChange, showToast])

  const handleBatchDelete = useCallback(async () => {
    if (selectCount === 0 || batchState === 'processing') return
    setBatchState('processing')

    const ids = Array.from(selectedIds)
    try {
      const res = await fetch('/api/tasks/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          taskIds: ids,
          userId,
        }),
      })

      if (!res.ok) throw new Error('Batch delete failed')

      setBatchState('success')
      onBatchDelete(ids)
      onSelectionChange(new Set())
      setShowDeleteConfirm(false)
      showToast?.(`${ids.length} task${ids.length > 1 ? 's' : ''} deleted`, 'info')

      setTimeout(() => setBatchState('idle'), 1500)
    } catch (err) {
      console.error('Batch delete error:', err)
      setBatchState('error')
      showToast?.('Failed to delete tasks', 'error')
      setTimeout(() => setBatchState('idle'), 2000)
    }
  }, [selectedIds, userId, batchState, onBatchDelete, onSelectionChange, showToast])

  const handleBatchAssign = useCallback(async (targetUserId: string) => {
    if (selectCount === 0 || batchState === 'processing') return
    setBatchState('processing')
    setShowAssignDropdown(false)

    const ids = Array.from(selectedIds)
    try {
      const res = await fetch('/api/tasks/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'assign',
          taskIds: ids,
          userId,
          assignedTo: targetUserId,
        }),
      })

      if (!res.ok) throw new Error('Batch assign failed')

      setBatchState('success')
      onBatchAssign(ids, targetUserId)
      onSelectionChange(new Set())
      const memberName = members.find(m => m.id === targetUserId)?.name || 'someone'
      showToast?.(`Assigned ${ids.length} task${ids.length > 1 ? 's' : ''} to ${memberName}`, 'success')

      setTimeout(() => setBatchState('idle'), 1500)
    } catch (err) {
      console.error('Batch assign error:', err)
      setBatchState('error')
      showToast?.('Failed to reassign tasks', 'error')
      setTimeout(() => setBatchState('idle'), 2000)
    }
  }, [selectedIds, userId, batchState, members, onBatchAssign, onSelectionChange, showToast])

  if (!selectMode && selectCount === 0) return null

  return (
    <>
      {/* Sticky batch action bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
          selectCount > 0
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <div className="bg-gray-900 dark:bg-gray-800 border border-gray-700 dark:border-gray-600 rounded-2xl shadow-2xl backdrop-blur-sm">
            {/* Selection count + actions */}
            <div className="flex items-center gap-2 px-4 py-3">
              {/* Selection count badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300">
                  <CheckSquare className="w-4 h-4" />
                </span>
                <span className="text-sm font-semibold text-white min-w-[2rem] tabular-nums">
                  {selectCount}
                </span>
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-700 dark:bg-gray-600 shrink-0" />

              {/* Action buttons */}
              <div className="flex items-center gap-1 overflow-x-auto flex-1 scrollbar-none">
                {/* Select all / deselect */}
                <button
                  onClick={() => {
                    if (selectCount === totalTaskCount) {
                      onSelectionChange(new Set())
                    } else {
                      // Signal parent to select all
                      onToggleSelectMode()
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  <Square className="w-3.5 h-3.5" />
                  {selectCount === totalTaskCount ? 'None' : `All (${totalTaskCount})`}
                </button>

                {/* Complete */}
                <button
                  onClick={handleBatchComplete}
                  disabled={batchState === 'processing'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/20 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {batchState === 'processing' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5" />
                  )}
                  Complete
                </button>

                {/* Assign */}
                <div className="relative" data-batch-assign>
                  <button
                    onClick={() => setShowAssignDropdown(!showAssignDropdown)}
                    disabled={batchState === 'processing'}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/20 transition-colors whitespace-nowrap disabled:opacity-50"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Assign
                  </button>

                  {showAssignDropdown && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 dark:bg-gray-700 border border-gray-600 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
                      <div className="p-1.5">
                        <p className="px-2.5 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                          Assign to...
                        </p>
                        {members.map(member => (
                          <button
                            key={member.id}
                            onClick={() => handleBatchAssign(member.id)}
                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-gray-200 hover:bg-white/10 transition-colors"
                          >
                            <span className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                            <span>{member.name}</span>
                            {member.id === userId && (
                              <span className="text-[10px] text-gray-400 ml-auto">(you)</span>
                            )}
                          </button>
                        ))}
                        <button
                          onClick={() => handleBatchAssign('')}
                          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Unassign</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delete */}
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={batchState === 'processing'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>

              {/* Cancel */}
              <button
                onClick={() => {
                  onSelectionChange(new Set())
                  onToggleSelectMode()
                }}
                className="flex items-center justify-center w-7 h-7 shrink-0 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Cancel selection (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Keyboard shortcut hints */}
            <div className="px-4 pb-3 flex items-center gap-3 overflow-x-auto scrollbar-none">
              {KEYBOARD_SHORTCUTS.map(s => (
                <span key={s.key} className="flex items-center gap-1 text-[10px] text-gray-500 whitespace-nowrap">
                  {s.ctrl && (
                    <kbd className="px-1 py-0.5 rounded bg-gray-700 text-gray-300 font-mono text-[9px]">⌃</kbd>
                  )}
                  <kbd className="px-1 py-0.5 rounded bg-gray-700 text-gray-300 font-mono text-[9px]">{s.key}</kbd>
                  <span>{s.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
              Delete {selectCount} task{selectCount > 1 ? 's' : ''}?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              This action can be undone within 5 seconds per task.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBatchDelete}
                disabled={batchState === 'processing'}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {batchState === 'processing' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete {selectCount}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-out;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}
