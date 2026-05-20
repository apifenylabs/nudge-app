'use client'

import { useState, useCallback, useEffect } from 'react'
import { Plus, Search, CheckCircle, Clock, AlertCircle, MoreVertical, User, PartyPopper, Sparkles, Edit2, Trash2, Undo2, X, CheckSquare, Square, ListChecks, Grip } from 'lucide-react'
import ShareModal from '@/components/sharing/ShareModal'
import SmartTaskCreator from '@/components/dashboard/SmartTaskCreator'
import TaskEditModal from '@/components/dashboard/TaskEditModal'
import WhatsNextSuggestions from '@/components/dashboard/WhatsNextSuggestions'
import BatchActionBar from '@/components/dashboard/BatchActionBar'

interface Task {
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
  recurrence_origin_id?: string
}

interface FamilyMember {
  id: string
  name: string
}

interface TaskBoardProps {
  tasks: Task[]
  familyId: string
  userId: string
  familyName?: string
  userName?: string
  members?: FamilyMember[]
}

interface UndoToast {
  task: Task
  taskId: string
  timeoutId: number | ReturnType<typeof setTimeout>
}

export default function TaskBoard({ tasks, familyId, userId, familyName, userName, members = [] }: TaskBoardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [smartCreatorOpen, setSmartCreatorOpen] = useState(false)
  const [taskRefreshKey, setTaskRefreshKey] = useState(0)
  const [completingIds, setCompletingIds] = useState<Set<string>>(new Set())
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [batchToast, setBatchToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [deletedTasks, setDeletedTasks] = useState<Map<string, Task>>(new Map())
  const [undoToast, setUndoToast] = useState<UndoToast | null>(null)
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean
    config: {
      taskTitle: string
      taskDescription?: string
      completedBy: string
      completedAt: string
      familyName?: string
      priority?: 'low' | 'medium' | 'high' | 'urgent'
      assignee?: string
    } | null
  }>({ isOpen: false, config: null })

  // Track recently completed tasks for share modal
  const [recentlyCompleted, setRecentlyCompleted] = useState<Map<string, Task>>(new Map())

  // What's next suggestions state
  const [showWhatsNext, setShowWhatsNext] = useState(false)
  const [lastCompletedTaskTitle, setLastCompletedTaskTitle] = useState('')
  const [smartCreatorInitialText, setSmartCreatorInitialText] = useState('')
  const [smartCreatorReopen, setSmartCreatorReopen] = useState(false)

  // Show 

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Merge active tasks + soft-delete them from UI instantly (undo via toast)
  const allTasks = tasks.filter(t => !deletedTasks.has(t.id))
  const pendingTasks = allTasks.filter(t => t.status === 'pending' || t.status === 'in_progress')
  const completedTasks = allTasks.filter(t => t.status === 'completed')

  const todayTasks = pendingTasks.filter(t => {
    if (!t.due_date) return false
    const due = new Date(t.due_date)
    due.setHours(0, 0, 0, 0)
    return due.getTime() === today.getTime()
  })

  const upcomingTasks = pendingTasks.filter(t => {
    if (!t.due_date) return false
    const due = new Date(t.due_date)
    due.setHours(0, 0, 0, 0)
    return due.getTime() > today.getTime()
  })

  const overdueTasks = pendingTasks.filter(t => {
    if (!t.due_date) return false
    const due = new Date(t.due_date)
    due.setHours(0, 0, 0, 0)
    return due.getTime() < today.getTime()
  })

  const noDateTasks = pendingTasks.filter(t => !t.due_date)

  // Clean up undo toast on unmount
  useEffect(() => {
    return () => {
      if (undoToast?.timeoutId) {
        clearTimeout(undoToast.timeoutId as number)
      }
    }
  }, [undoToast])

  // Search filter
  const filterBySearch = (task: Task) => {
    if (!searchQuery) return true
    return task.title.toLowerCase().includes(searchQuery.toLowerCase())
  }

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    } catch {
      return ''
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } catch {
      return ''
    }
  }

  const handleToggleComplete = useCallback(async (task: Task) => {
    if (completingIds.has(task.id)) return

    setCompletingIds(prev => new Set(prev).add(task.id))

    try {
      const res = await fetch('/api/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: task.id,
          userId,
        }),
      })

      if (!res.ok) throw new Error('Failed to complete task')

      const data = await res.json()

      // Show share modal with confetti
      // Show share celebration modal
      setRecentlyCompleted(prev => {
        const next = new Map(prev)
        next.set(task.id, task)
        return next
      })

      setShareModal({
        isOpen: true,
        config: {
          taskTitle: task.title,
          taskDescription: task.description,
          completedBy: userName || 'Someone',
          completedAt: task.completed_at || new Date().toISOString(),
          familyName,
          priority: task.priority,
          assignee: task.assigned_to_user?.full_name || task.assigned_to_user?.name,
        },
      })

      // Also show "What's next?" suggestions after completion
      setLastCompletedTaskTitle(task.title)
      setShowWhatsNext(true)
    } catch (err) {
      console.error('Complete task error:', err)
    } finally {
      setCompletingIds(prev => {
        const next = new Set(prev)
        next.delete(task.id)
        return next
      })
    }
  }, [userId, userName, familyName, completingIds])

  // Handle "What's next?" suggestion — open smart creator with pre-filled text
  const handleWhatsNextSuggestion = useCallback((text: string) => {
    setSmartCreatorInitialText(text)
    setSmartCreatorReopen(true)
    setSmartCreatorOpen(true)
    setShowWhatsNext(false)
  }, [])

  const handleWhatsNextDismiss = useCallback(() => {
    setShowWhatsNext(false)
  }, [])

  // Batch operations
  const handleToggleSelect = useCallback((taskId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(taskId)) {
        next.delete(taskId)
      } else {
        next.add(taskId)
      }
      return next
    })
  }, [])

  const handleSelectAllFiltered = useCallback(() => {
    const visible = [...overdueTasks, ...todayTasks, ...upcomingTasks, ...noDateTasks].filter(filterBySearch)
    if (selectedIds.size === visible.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(visible.map(t => t.id)))
    }
  }, [overdueTasks, todayTasks, upcomingTasks, noDateTasks, filterBySearch, selectedIds])

  const handleBatchComplete = useCallback((ids: string[]) => {
    setTaskRefreshKey(k => k + 1)
    setSelectMode(false)
    setSelectedIds(new Set())
  }, [])

  const handleBatchDelete = useCallback((ids: string[]) => {
    // Mark as deleted for undo-like behavior, but for batch we just remove
    ids.forEach(id => {
      setDeletedTasks(prev => {
        const next = new Map(prev)
        const task = [...overdueTasks, ...todayTasks, ...upcomingTasks, ...noDateTasks].find(t => t.id === id)
        if (task) next.set(id, task)
        return next
      })
    })
    setTaskRefreshKey(k => k + 1)
    setSelectMode(false)
    setSelectedIds(new Set())
  }, [overdueTasks, todayTasks, upcomingTasks, noDateTasks])

  const handleBatchAssign = useCallback((ids: string[], targetUserId: string) => {
    setTaskRefreshKey(k => k + 1)
    setSelectMode(false)
    setSelectedIds(new Set())
  }, [])

  const handleQuickDelete = useCallback(async (task: Task) => {
    if (deletingIds.has(task.id)) return

    // Remove from UI immediately
    setDeletedTasks(prev => new Map(prev).set(task.id, task))
    setConfirmDeleteId(null)

    // Show undo toast
    const timeoutId = setTimeout(() => {
      // Time's up — actually delete from server
      performServerDelete(task)
      setUndoToast(null)
    }, 5000)

    setUndoToast({ task, taskId: task.id, timeoutId })
  }, [deletingIds])

  const handleUndoDelete = useCallback(() => {
    if (!undoToast) return

    // Clear the timeout
    clearTimeout(undoToast.timeoutId as number)

    // Restore task in UI
    setDeletedTasks(prev => {
      const next = new Map(prev)
      next.delete(undoToast.taskId)
      return next
    })

    setUndoToast(null)
    setConfirmDeleteId(null)
  }, [undoToast])

  const performServerDelete = useCallback(async (task: Task) => {
    setDeletingIds(prev => new Set(prev).add(task.id))
    try {
      await fetch('/api/tasks/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: task.id,
          userId,
        }),
      })
      // Task was already removed from UI; trigger a refresh
      setTaskRefreshKey(k => k + 1)
    } catch (err) {
      console.error('Delete task error:', err)
      // Restore task on error
      setDeletedTasks(prev => {
        const next = new Map(prev)
        next.delete(task.id)
        return next
      })
    } finally {
      setDeletingIds(prev => {
        const next = new Set(prev)
        next.delete(task.id)
        return next
      })
    }
  }, [userId])

  const TaskCard = ({ task }: { task: Task }) => {
    const isOverdue = task.due_date && new Date(task.due_date).getTime() < new Date().getTime() &&
      task.status !== 'completed'
    const isCompleting = completingIds.has(task.id)
    const isDeleting = deletingIds.has(task.id)
    const showConfirm = confirmDeleteId === task.id
    const isSelected = selectedIds.has(task.id)

    return (
      <div
        className={`flex items-center gap-3 bg-white dark:bg-gray-900 border shadow-sm rounded-xl px-4 py-3.5 transition-all duration-200 ${
          isSelected
            ? 'border-indigo-400 dark:border-indigo-500 ring-2 ring-indigo-400/20'
            : 'border-border/60 hover:shadow-card-hover'
        } ${selectMode ? 'cursor-pointer active:scale-[0.99]' : ''}`}
        onClick={selectMode ? () => handleToggleSelect(task.id) : undefined}
      >
        {/* Batch selection checkbox (shown in select mode) / Complete button (normal) */}
        {selectMode ? (
          <button
            onClick={(e) => { e.stopPropagation(); handleToggleSelect(task.id) }}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
              isSelected
                ? 'bg-indigo-500 border-indigo-500 text-white'
                : 'border-muted-foreground/30 hover:border-indigo-400'
            }`}
          >
            {isSelected && <CheckSquare className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <button
            onClick={() => handleToggleComplete(task)}
            disabled={isCompleting}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
              isCompleting
                ? 'border-emerald-400 bg-emerald-100 animate-pulse'
                : 'border-muted-foreground/30 hover:border-emerald-400'
            }`}
          >
            {isCompleting ? (
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-transparent hover:bg-emerald-400/20 transition-colors" />
            )}
          </button>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`text-sm font-medium text-foreground truncate ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </p>
            {isOverdue && (
              <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                Overdue
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {/* Assignee */}
            {task.assigned_to_user && (
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                  <User className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {task.assigned_to_user?.full_name || task.assigned_to_user?.name || 'Unassigned'}
                </span>
              </div>
            )}

            {/* Due time/date */}
            {task.due_date && (
              <span className={`text-[11px] ${isOverdue ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                &middot; {task.due_date ? formatTime(task.due_date) || formatDate(task.due_date) : ''}
              </span>
            )}

            {/* Priority badge */}
            {task.priority === 'urgent' && (
              <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                Urgent
              </span>
            )}

            {/* Recurrence badge */}
            {task.recurrence && task.recurrence !== 'none' && (
              <span className="text-[10px] font-medium text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded">
                🔄 {task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Delete confirmation inline */}
        {showConfirm ? (
          <div className="flex items-center gap-1.5 animate-in fade-in shrink-0">
            <button
              onClick={() => handleQuickDelete(task)}
              disabled={isDeleting}
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
              title="Confirm delete"
            >
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setConfirmDeleteId(null)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Cancel delete"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            {/* Edit icon */}
            <button
              onClick={() => { setEditingTask(task); setShowEditModal(true); }}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              title="Edit task"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            {/* Delete icon */}
            <button
              onClick={() => setConfirmDeleteId(task.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Menu */}
            <button onClick={() => { setEditingTask(task); setShowEditModal(true); }}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Toast component for batch operations
  const BatchToast = () => {
    if (!batchToast) return null
    const bgColor = batchToast.type === 'success' ? 'bg-emerald-600'
      : batchToast.type === 'error' ? 'bg-red-600'
      : 'bg-indigo-600'
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
        <div className={`flex items-center gap-2 px-4 py-2.5 ${bgColor} text-white rounded-xl shadow-lg text-sm font-medium`}>
          {batchToast.type === 'success' && <CheckCircle className="w-4 h-4" />}
          {batchToast.message}
        </div>
      </div>
    )
  }

  const TaskSection = ({ title, count, tasks, defaultOpen = true }: {
    title: string
    count: number
    tasks: Task[]
    defaultOpen?: boolean
  }) => {
    const [open, setOpen] = useState(defaultOpen)
    if (tasks.length === 0) return null

    return (
      <div className="mb-3">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-1 py-1.5 w-full"
        >
          <div className="w-1 h-5 rounded-full bg-indigo-400" />
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <span className="text-xs text-muted-foreground font-medium">({count})</span>
        </button>
        {open && (
          <div className="space-y-2 mt-1.5">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    )
  }

  /** Completed tasks section with share/re-share capabilities */
  const CompletedTaskCard = ({ task }: { task: Task }) => {
    const handleReShare = () => {
      setShareModal({
        isOpen: true,
        config: {
          taskTitle: task.title,
          taskDescription: task.description,
          completedBy: userName || 'Someone',
          completedAt: task.completed_at || task.created_at,
          familyName,
          priority: task.priority,
          assignee: task.assigned_to_user?.full_name || undefined,
        },
      })
    }

    return (
      <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-border/60 shadow-sm rounded-xl px-4 py-3">
        <div className="w-5 h-5 rounded-full border-2 border-emerald-400 bg-emerald-50 flex items-center justify-center shrink-0">
          <CheckCircle className="w-3 h-3 text-emerald-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground line-through truncate">
            {task.title}
          </p>
          {task.completed_at && (
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">
              Done {formatDate(task.completed_at)}
            </p>
          )}
        </div>
        <button
          onClick={handleReShare}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors shrink-0"
          title="Share this completion"
        >
          <PartyPopper className="w-3.5 h-3.5" />
        </button>
      </div>
    )
  }

  const CompletedSection = ({ tasks: completed, count, defaultOpen = false }: {
    tasks: Task[]
    count: number
    userName?: string
    familyName?: string
    defaultOpen?: boolean
  }) => {
    const [open, setOpen] = useState(defaultOpen)
    if (completed.length === 0) return null

    return (
      <div className="mb-3">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-1 py-1.5 w-full"
        >
          <div className="w-1 h-5 rounded-full bg-emerald-400" />
          <h3 className="text-sm font-bold text-foreground">Completed</h3>
          <span className="text-xs text-muted-foreground font-medium">({count})</span>
        </button>
        {open && (
          <div className="space-y-2 mt-1.5">
            {completed.map(task => (
              <CompletedTaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Undo Toast */}
      {undoToast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="flex items-center gap-3 px-5 py-3 bg-gray-900 dark:bg-gray-800 border border-gray-700 dark:border-gray-600 rounded-xl shadow-2xl">
            <Trash2 className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-sm font-medium text-white whitespace-nowrap">
              Task deleted
            </span>
            <button
              onClick={handleUndoDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Undo
            </button>
          </div>
        </div>
      )}

      <div className="px-4 pb-4">
        {/* Smart Add bar */}
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-border/60 shadow-sm rounded-xl px-4 py-3">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <input
              type="text"
              placeholder="e.g. Remind Jake to take out trash tonight"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setSmartCreatorOpen(true)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              Smart Add
            </button>
            {/* Select mode toggle */}
            <button
              onClick={() => {
                setSelectMode(!selectMode)
                if (selectMode) setSelectedIds(new Set())
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                selectMode
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                  : 'text-muted-foreground/60 hover:text-foreground hover:bg-secondary'
              }`}
              title={selectMode ? 'Exit select mode' : 'Select multiple tasks'}
            >
              <ListChecks className="w-4 h-4" />
            </button>
          </div>
          {/* Select mode hint bar */}
          {selectMode && (
            <div className="flex items-center gap-2 mt-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-xs text-indigo-600 dark:text-indigo-400">
              <CheckSquare className="w-3.5 h-3.5 shrink-0" />
              <span>Tap tasks to select. <kbd className="px-1 py-0.5 rounded bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono text-[10px]">⌃A</kbd> select all · <kbd className="px-1 py-0.5 rounded bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono text-[10px]">Esc</kbd> cancel</span>
            </div>
          )}
        </div>

        {/* Task sections */}
        {allTasks.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-base font-semibold text-foreground mb-1">No tasks yet</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Tap the mic to add your first nudge, or type above.
            </p>
          </div>
        ) : (
          <>
            <TaskSection title="Overdue" count={overdueTasks.length} tasks={overdueTasks.filter(filterBySearch)} />
            <TaskSection title="Today" count={todayTasks.length} tasks={todayTasks.filter(filterBySearch)} />
            <TaskSection title="Upcoming" count={upcomingTasks.length} tasks={upcomingTasks.filter(filterBySearch)} defaultOpen={false} />
            <TaskSection title="Unscheduled" count={noDateTasks.length} tasks={noDateTasks.filter(filterBySearch)} defaultOpen={false} />

            {/* Completed section with share buttons */}
            {completedTasks.length > 0 && (
              <CompletedSection
                tasks={completedTasks.filter(filterBySearch).slice(0, 10)}
                count={completedTasks.length}
                userName={userName}
                familyName={familyName}
              />
            )}
          </>
        )}

        {/* What's next? suggestions */}
        {showWhatsNext && lastCompletedTaskTitle && (
          <WhatsNextSuggestions
            completedTaskTitle={lastCompletedTaskTitle}
            familyId={familyId}
            userId={userId}
            members={members}
            userName={userName}
            onSelectSuggestion={handleWhatsNextSuggestion}
            onDismiss={handleWhatsNextDismiss}
          />
        )}

        {/* Smart Task Creator */}
        {smartCreatorOpen && (
          <SmartTaskCreator
            key={smartCreatorReopen ? 'reopen-' + Date.now() : 'default'}
            familyId={familyId}
            userId={userId}
            userName={userName}
            familyName={familyName}
            members={members}
            initialText={smartCreatorInitialText}
            onTaskCreated={() => {
              setTaskRefreshKey(k => k + 1)
              setSmartCreatorOpen(false)
              setSmartCreatorInitialText('')
              setSmartCreatorReopen(false)
            }}
            onClose={() => {
              setSmartCreatorOpen(false)
              setSmartCreatorInitialText('')
              setSmartCreatorReopen(false)
            }}
            autoOpen
          />
        )}
      </div>

      {/* Task edit modal */}
      <TaskEditModal
        task={editingTask}
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingTask(null); }}
        onTaskUpdated={() => { setTaskRefreshKey(k => k + 1); setShowEditModal(false); setEditingTask(null); }}
        onTaskDeleted={() => { setTaskRefreshKey(k => k + 1); setShowEditModal(false); setEditingTask(null); }}
        userId={userId}
        members={members}
        userName={userName}
      />

      {/* Batch action bar */}
      <BatchActionBar
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onBatchComplete={handleBatchComplete}
        onBatchDelete={handleBatchDelete}
        onBatchAssign={handleBatchAssign}
        totalTaskCount={allTasks.length}
        members={members}
        userId={userId}
        selectMode={selectMode}
        onToggleSelectMode={() => {
          if (selectMode) {
            handleSelectAllFiltered()
          } else {
            setSelectMode(true)
          }
        }}
        showToast={(message, type) => {
          setBatchToast({ message, type: type || 'info' })
          setTimeout(() => setBatchToast(null), 3000)
        }}
      />

      {/* Batch toast */}
      <BatchToast />

      {/* Share celebration modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ isOpen: false, config: null })}
        config={shareModal.config}
      />
    </>
  )
}
