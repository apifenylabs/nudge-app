'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  X, Loader2, CheckCircle, AlertCircle, User, Calendar, Flag, Tag, Trash2, RefreshCw
} from 'lucide-react'

interface EditTask {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigned_to?: string
  assigned_to_user?: { name?: string; full_name?: string }
  due_date?: string
  created_at: string
  completed_at?: string
  recurrence?: string
  category?: string
}

interface FamilyMember {
  id: string
  name: string
}

interface TaskEditModalProps {
  task: EditTask | null
  isOpen: boolean
  onClose: () => void
  onTaskUpdated: () => void
  onTaskDeleted: () => void
  userId: string
  members: FamilyMember[]
  userName?: string
}

const PRIORITY_ICONS: Record<string, { icon: string; color: string; label: string }> = {
  low: { icon: '🟢', color: 'text-green-600 bg-green-50 dark:bg-green-900/20', label: 'Low' },
  medium: { icon: '🟡', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20', label: 'Medium' },
  high: { icon: '🟠', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20', label: 'High' },
  urgent: { icon: '🔴', color: 'text-red-600 bg-red-50 dark:bg-red-900/20', label: 'Urgent' },
}

const CATEGORY_OPTIONS = [
  { value: '', label: 'No category', icon: '📋' },
  { value: 'chores', label: 'Chores', icon: '🧹' },
  { value: 'shopping', label: 'Shopping', icon: '🛒' },
  { value: 'appointments', label: 'Appointments', icon: '📅' },
  { value: 'home', label: 'Home', icon: '🏠' },
  { value: 'kids', label: 'Kids', icon: '👶' },
  { value: 'pets', label: 'Pets', icon: '🐾' },
  { value: 'school', label: 'School', icon: '📚' },
  { value: 'health', label: 'Health', icon: '💪' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'social', label: 'Social', icon: '🎉' },
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'fitness', label: 'Fitness', icon: '🏃' },
]

const DATE_PRESETS = [
  { key: '', label: '📅 No date' },
  { key: 'today', label: '📅 Today' },
  { key: 'tomorrow', label: '📅 Tomorrow' },
  { key: 'weekend', label: '📅 This weekend' },
  { key: 'next-week', label: '📅 Next week' },
]

function getPresetDate(key: string): string {
  const now = new Date()
  if (key === 'today') return now.toISOString().split('T')[0]
  if (key === 'tomorrow') return new Date(now.getTime() + 86400000).toISOString().split('T')[0]
  if (key === 'weekend') {
    const sat = new Date(now)
    sat.setDate(sat.getDate() + ((6 - sat.getDay() + 7) % 7))
    return sat.toISOString().split('T')[0]
  }
  if (key === 'next-week') {
    const nw = new Date(now)
    nw.setDate(nw.getDate() + 7)
    return nw.toISOString().split('T')[0]
  }
  return ''
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1)
    if (d.getTime() === today.getTime()) return 'Today'
    if (d.getTime() === tomorrow.getTime()) return 'Tomorrow'
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  } catch { return dateStr }
}

export default function TaskEditModal({
  task, isOpen, onClose, onTaskUpdated, onTaskDeleted, userId, members, userName,
}: TaskEditModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium')
  const [category, setCategory] = useState('')
  const [recurrence, setRecurrence] = useState('')
  const [status, setStatus] = useState<'pending' | 'completed'>('pending')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Initialize form when task changes
  useEffect(() => {
    if (!task) return
    setTitle(task.title || '')
    setDescription(task.description || '')
    setAssignee(task.assigned_to || '')
    setDueDate(task.due_date ? task.due_date.split('T')[0] : '')
    setPriority(task.priority || 'medium')
    setCategory(task.category || '')
    setRecurrence(task.recurrence || '')
    setStatus(task.status === 'completed' ? 'completed' : 'pending')
    setShowDeleteConfirm(false)
    setToast(null)
  }, [task])

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleSave = useCallback(async () => {
    if (!task || !title.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/tasks/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: task.id,
          userId,
          title: title.trim(),
          description: description || null,
          assigned_to: assignee || null,
          due_date: dueDate ? new Date(dueDate).toISOString() : null,
          priority,
          category: category || null,
          recurrence: recurrence || null,
          status: status === 'completed' ? 'completed' : 'pending',
        }),
      })
      if (!res.ok) throw new Error('Failed to update task')
      showToast('Task updated!', 'success')
      setTimeout(() => onTaskUpdated(), 500)
    } catch (err) {
      console.error('Update task error:', err)
      showToast('Failed to update task', 'error')
    } finally {
      setSaving(false)
    }
  }, [task, title, description, assignee, dueDate, priority, category, recurrence, status, userId, onTaskUpdated, showToast])

  const handleDelete = useCallback(async () => {
    if (!task) return
    setDeleting(true)
    try {
      const res = await fetch('/api/tasks/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: task.id,
          userId,
        }),
      })
      if (!res.ok) throw new Error('Failed to delete task')
      showToast('Task deleted!', 'success')
      setTimeout(() => onTaskDeleted(), 500)
    } catch (err) {
      console.error('Delete task error:', err)
      showToast('Failed to delete task', 'error')
    } finally {
      setDeleting(false)
    }
  }, [task, userId, onTaskDeleted, showToast])

  if (!isOpen || !task) return null

  const getMemberName = (id: string) => {
    if (id === userId) return userName || 'Me'
    return members.find(m => m.id === id)?.name || 'Unknown'
  }

  const matchedPreset = DATE_PRESETS.find(dp => dp.key && dueDate === getPresetDate(dp.key))

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] animate-slide-down">
          <div className={`flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl border transition-all ${
            toast.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
          }`}>
            {toast.type === 'success'
              ? <CheckCircle className="w-4 h-4" />
              : <AlertCircle className="w-4 h-4" />
            }
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <div className="relative w-full sm:max-w-lg bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-indigo-500" />
              Edit Task
            </h2>
            <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Task</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:border-indigo-400 outline-none transition-colors"
                placeholder="Task title" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:border-indigo-400 outline-none transition-colors resize-none"
                rows={3} placeholder="Optional description" />
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <User className="w-3 h-3" /> Assign to
              </label>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setAssignee(userId)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    assignee === userId
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
                  👤 Me {userName ? `(${userName})` : ''}
                </button>
                {members.filter(m => m.id !== userId).map(member => (
                  <button key={member.id} onClick={() => setAssignee(member.id === assignee ? '' : member.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      assignee === member.id
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
                    👤 {member.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Due date
              </label>
              <div className="flex flex-wrap gap-2 items-center">
                {DATE_PRESETS.map(dp => (
                  <button key={dp.key} onClick={() => setDueDate(dp.key ? getPresetDate(dp.key) : '')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      (dp.key === '' && !dueDate) || (dp.key && dueDate === getPresetDate(dp.key))
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                    {dp.label}
                  </button>
                ))}
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-indigo-400 outline-none" />
              </div>
              {dueDate && !matchedPreset && <p className="text-xs text-indigo-500 mt-1">{formatDate(dueDate)}</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Flag className="w-3 h-3" /> Priority
              </label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high', 'urgent'] as const).map(p => (
                  <button key={p} onClick={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                      priority === p
                        ? `${PRIORITY_ICONS[p].color} border-indigo-300 dark:border-indigo-700`
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                    {PRIORITY_ICONS[p].icon} {PRIORITY_ICONS[p].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_OPTIONS.map(cat => (
                  <button key={cat.value} onClick={() => setCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      category === cat.value
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recurrence */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Repeats
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: '', label: "Doesn't repeat", icon: '❌' },
                  { value: 'daily', label: 'Daily', icon: '🔄' },
                  { value: 'weekly', label: 'Weekly', icon: '🔄' },
                  { value: 'monthly', label: 'Monthly', icon: '🔄' },
                ].map(opt => (
                  <button key={opt.value} onClick={() => setRecurrence(opt.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      recurrence === opt.value
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Status
              </label>
              <div className="flex gap-2">
                <button onClick={() => setStatus('pending')}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                    status === 'pending'
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                  ⏳ Pending
                </button>
                <button onClick={() => setStatus('completed')}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                    status === 'completed'
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                  ✅ Completed
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 px-5 py-4 border-t border-gray-100 dark:border-gray-800">
            {/* Delete confirmation */}
            {showDeleteConfirm && (
              <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">Are you sure? This cannot be undone.</p>
                <div className="flex gap-2">
                  <button onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleDelete} disabled={deleting}
                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                    {deleting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</>
                    ) : (
                      <><Trash2 className="w-4 h-4" /> Confirm Delete</>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={onClose}
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>

              {/* Delete button (only if not showing confirm) */}
              {!showDeleteConfirm && (
                <button onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center gap-1.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button onClick={handleSave} disabled={saving || !title.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-700 dark:disabled:to-gray-700 text-white rounded-xl text-sm font-medium shadow-md transition-all active:scale-[0.97] flex items-center justify-center gap-1.5">
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><CheckCircle className="w-4 h-4" /> Save</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
