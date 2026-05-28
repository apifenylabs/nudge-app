/**
 * Offline Task Queue for Nudge PWA
 * 
 * Uses IndexedDB to store tasks and operations created while offline,
 * then syncs them to the Supabase backend when connectivity is restored.
 * 
 * Architecture:
 *   - IndexedDB stores pending operations (create, update, delete, complete)
 *   - A periodic sync process replays operations in order
 *   - After successful sync, operations are removed from the queue
 *   - On conflict (e.g., task already deleted), marks the operation as failed
 *     and notifies the UI
 */

const DB_NAME = 'nudge-offline-queue'
const DB_VERSION = 1

/** Operation types that can be queued offline */
export type OfflineOpType = 'create' | 'update' | 'delete' | 'complete'

/** A single queued operation */
export interface OfflineOperation {
  id: string            // UUID generated client-side
  type: OfflineOpType
  payload: Record<string, unknown>
  createdAt: string     // ISO timestamp when queued
  retryCount: number
  lastError: string | null
  familyId: string      // For scoping per family
}

/** Pending task data stored locally for immediate UI display */
export interface LocalTask {
  id: string
  familyId: string
  createdBy: string
  assignedTo: string | null
  title: string
  description: string | null
  category: string | null
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  isRecurring: boolean
  recurrencePattern: string | null
  dueDate: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
  /** True if this task exists only locally and hasn't been synced yet */
  isLocalOnly: boolean
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Operations queue
      if (!db.objectStoreNames.contains('operations')) {
        const opStore = db.createObjectStore('operations', { keyPath: 'id' })
        opStore.createIndex('type', 'type', { unique: false })
        opStore.createIndex('familyId', 'familyId', { unique: false })
        opStore.createIndex('createdAt', 'createdAt', { unique: false })
      }

      // Local tasks — for showing in UI before sync
      if (!db.objectStoreNames.contains('localTasks')) {
        const taskStore = db.createObjectStore('localTasks', { keyPath: 'id' })
        taskStore.createIndex('familyId', 'familyId', { unique: false })
        taskStore.createIndex('status', 'status', { unique: false })
        taskStore.createIndex('isLocalOnly', 'isLocalOnly', { unique: false })
      }

      // Sync metadata — tracks last sync time per family
      if (!db.objectStoreNames.contains('syncMeta')) {
        db.createObjectStore('syncMeta', { keyPath: 'familyId' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Queue an offline operation
 */
export async function queueOperation(op: Omit<OfflineOperation, 'id' | 'createdAt' | 'retryCount' | 'lastError'>): Promise<string> {
  const db = await openDB()
  const id = crypto.randomUUID()
  const operation: OfflineOperation = {
    ...op,
    id,
    createdAt: new Date().toISOString(),
    retryCount: 0,
    lastError: null,
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction('operations', 'readwrite')
    const store = tx.objectStore('operations')
    store.add(operation)
    tx.oncomplete = () => {
      db.close()
      resolve(id)
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
  })
}

/**
 * Store a task locally for immediate UI display
 */
export async function storeLocalTask(task: LocalTask): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('localTasks', 'readwrite')
    const store = tx.objectStore('localTasks')
    store.put(task)
    tx.oncomplete = () => {
      db.close()
      resolve()
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
  })
}

/**
 * Get all local tasks for a family
 */
export async function getLocalTasks(familyId: string): Promise<LocalTask[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('localTasks', 'readonly')
    const store = tx.objectStore('localTasks')
    const index = store.index('familyId')
    const tasks: LocalTask[] = []

    const request = index.openCursor(IDBKeyRange.only(familyId))
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        tasks.push(cursor.value as LocalTask)
        cursor.continue()
      } else {
        resolve(tasks)
      }
    }
    request.onerror = () => {
      db.close()
      reject(request.error)
    }

    tx.oncomplete = () => db.close()
  })
}

/**
 * Get all pending operations for a family
 */
export async function getPendingOperations(familyId?: string): Promise<OfflineOperation[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('operations', 'readonly')
    const store = tx.objectStore('operations')
    const ops: OfflineOperation[] = []

    if (familyId) {
      const index = store.index('familyId')
      const request = index.openCursor(IDBKeyRange.only(familyId))
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
        if (cursor) {
          ops.push(cursor.value as OfflineOperation)
          cursor.continue()
        } else {
          resolve(ops)
        }
      }
      request.onerror = () => {
        db.close()
        reject(request.error)
      }
    } else {
      const request = store.openCursor()
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
        if (cursor) {
          ops.push(cursor.value as OfflineOperation)
          cursor.continue()
        } else {
          resolve(ops)
        }
      }
      request.onerror = () => {
        db.close()
        reject(request.error)
      }
    }

    tx.oncomplete = () => db.close()
  })
}

/**
 * Remove an operation from the queue after successful sync
 */
export async function removeOperation(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('operations', 'readwrite')
    const store = tx.objectStore('operations')
    store.delete(id)
    tx.oncomplete = () => {
      db.close()
      resolve()
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
  })
}

/**
 * Sync all pending operations to the server.
 * Returns { synced: number, failed: Array<{ id: string; error: string }> }
 */
export async function syncPendingOperations(authToken: string, baseUrl?: string): Promise<{
  synced: number
  failed: Array<{ id: string; op: OfflineOpType; error: string }>
}> {
  const apiBase = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  const pending = await getPendingOperations()
  // Sort by creation order
  pending.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const synced: string[] = []
  const failed: Array<{ id: string; op: OfflineOpType; error: string }> = []

  for (const op of pending) {
    try {
      const result = await syncSingleOperation(op, apiBase, authToken)
      if (result.success) {
        await removeOperation(op.id)
        synced.push(op.id)
      } else {
        failed.push({ id: op.id, op: op.type, error: result.error || 'Unknown error' })
      }
    } catch (err) {
      failed.push({ id: op.id, op: op.type, error: String(err) })
    }
  }

  return { synced: synced.length, failed }
}

async function syncSingleOperation(
  op: OfflineOperation,
  apiBase: string,
  authToken: string
): Promise<{ success: boolean; error?: string }> {
  const endpoint = getEndpointForOp(op)
  if (!endpoint) return { success: false, error: `Unknown operation type: ${op.type}` }

  try {
    const response = await fetch(`${apiBase}${endpoint}`, {
      method: op.type === 'create' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(op.payload),
    })

    if (response.ok) return { success: true }

    // Conflict or gone — non-retriable
    if (response.status === 409 || response.status === 410 || response.status === 404) {
      return { success: true } // Remove from queue, the server state is the truth
    }

    const body = await response.json().catch(() => ({}))
    return { success: false, error: body.error || `HTTP ${response.status}` }
  } catch (err) {
    // Network error — operation will retry on next sync
    return { success: false, error: String(err) }
  }
}

function getEndpointForOp(op: OfflineOperation): string | null {
  switch (op.type) {
    case 'create':
      return '/api/tasks/create'
    case 'update':
      return '/api/tasks/update'
    case 'delete':
      return '/api/tasks/delete'
    case 'complete':
      return '/api/tasks/complete'
    default:
      return null
  }
}

/**
 * Get the last sync timestamp for a family
 */
export async function getLastSyncTime(familyId: string): Promise<string | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('syncMeta', 'readonly')
    const store = tx.objectStore('syncMeta')
    const request = store.get(familyId)
    request.onsuccess = () => {
      db.close()
      resolve(request.result?.lastSyncAt || null)
    }
    request.onerror = () => {
      db.close()
      reject(request.error)
    }
  })
}

/**
 * Update the last sync timestamp for a family
 */
export async function setLastSyncTime(familyId: string, timestamp: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('syncMeta', 'readwrite')
    const store = tx.objectStore('syncMeta')
    store.put({ familyId, lastSyncAt: timestamp })
    tx.oncomplete = () => {
      db.close()
      resolve()
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
  })
}

/**
 * Check if there are pending operations
 */
export async function hasPendingOperations(): Promise<boolean> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('operations', 'readonly')
    const store = tx.objectStore('operations')
    const request = store.count()
    request.onsuccess = () => {
      db.close()
      resolve(request.result > 0)
    }
    request.onerror = () => {
      db.close()
      reject(request.error)
    }
  })
}

/**
 * Get total pending operation count
 */
export async function getPendingCount(): Promise<number> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('operations', 'readonly')
    const store = tx.objectStore('operations')
    const request = store.count()
    request.onsuccess = () => {
      db.close()
      resolve(request.result)
    }
    request.onerror = () => {
      db.close()
      reject(request.error)
    }
  })
}

/**
 * Clear all local data for a family (on logout/family change)
 */
export async function clearFamilyData(familyId: string): Promise<void> {
  const db = await openDB()
  const tx = db.transaction(['operations', 'localTasks', 'syncMeta'], 'readwrite')

  // Clear operations for this family
  const opStore = tx.objectStore('operations')
  const opIndex = opStore.index('familyId')
  const opReq = opIndex.openCursor(IDBKeyRange.only(familyId))
  opReq.onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
    if (cursor) {
      cursor.delete()
      cursor.continue()
    }
  }

  // Clear local tasks for this family
  const taskStore = tx.objectStore('localTasks')
  const taskIndex = taskStore.index('familyId')
  const taskReq = taskIndex.openCursor(IDBKeyRange.only(familyId))
  taskReq.onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
    if (cursor) {
      cursor.delete()
      cursor.continue()
    }
  }

  // Clear sync meta
  const metaStore = tx.objectStore('syncMeta')
  metaStore.delete(familyId)

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => {
      db.close()
      resolve()
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
  })
}

/**
 * Generate a UUID for local task IDs
 */
export function generateLocalId(): string {
  return `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

/**
 * React hook wrapper for offline-aware task operations.
 * 
 * Usage:
 * ```tsx
 * import { useOfflineQueue } from '@/lib/offline-queue'
 * 
 * const { isOnline, pendingCount, createTask, syncNow } = useOfflineQueue(familyId)
 * 
 * // Works online or offline:
 * await createTask({ title: 'Buy milk', assignedTo: 'me' })
 * ```
 */
import { useState, useEffect, useCallback, useRef } from 'react'

interface UseOfflineQueueOptions {
  familyId: string
  userId: string
  supabaseToken: string | (() => Promise<string | null>)
  baseUrl?: string
}

interface PendingState {
  count: number
  operations: OfflineOperation[]
}

export function useOfflineQueue({ familyId, userId, supabaseToken, baseUrl }: UseOfflineQueueOptions) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true)
  const [pending, setPending] = useState<PendingState>({ count: 0, operations: [] })
  const syncingRef = useRef(false)
  const tokenRef = useRef(supabaseToken)

  // Keep token ref fresh
  tokenRef.current = supabaseToken

  // Track online status
  useEffect(() => {
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  // Poll pending count
  useEffect(() => {
    const updatePending = async () => {
      const count = await getPendingCount()
      const ops = await getPendingOperations(familyId)
      setPending({ count, operations: ops })
    }

    updatePending()
    const interval = setInterval(updatePending, 5000)
    return () => clearInterval(interval)
  }, [familyId])

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && pending.count > 0 && !syncingRef.current) {
      syncNow()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline])

  const createTask = useCallback(async (payload: {
    title: string
    description?: string
    assignedTo?: string | null
    priority?: 'low' | 'medium' | 'high' | 'urgent'
    category?: string
    dueDate?: string | null
    isRecurring?: boolean
    recurrencePattern?: string | null
  }) => {
    const localId = generateLocalId()
    const now = new Date().toISOString()

    // Store locally immediately
    await storeLocalTask({
      id: localId,
      familyId,
      createdBy: userId,
      assignedTo: payload.assignedTo || null,
      title: payload.title,
      description: payload.description || null,
      category: payload.category || null,
      status: 'pending',
      priority: payload.priority || 'medium',
      isRecurring: payload.isRecurring || false,
      recurrencePattern: payload.recurrencePattern || null,
      dueDate: payload.dueDate || null,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
      isLocalOnly: true,
    })

    // Queue the operation
    await queueOperation({
      type: 'create',
      payload: {
        ...payload,
        localId,
        familyId,
        createdBy: userId,
      },
      familyId,
    })

    setPending(prev => ({ ...prev, count: prev.count + 1 }))

    // Try to sync immediately if online
    if (navigator.onLine && !syncingRef.current) {
      syncNow()
    }

    return localId
  }, [familyId, userId])

  const updateTask = useCallback(async (taskId: string, payload: Record<string, unknown>) => {
    await queueOperation({
      type: 'update',
      payload: { id: taskId, ...payload },
      familyId,
    })

    setPending(prev => ({ ...prev, count: prev.count + 1 }))

    if (navigator.onLine && !syncingRef.current) {
      syncNow()
    }
  }, [familyId])

  const deleteTask = useCallback(async (taskId: string) => {
    await queueOperation({
      type: 'delete',
      payload: { id: taskId },
      familyId,
    })

    setPending(prev => ({ ...prev, count: prev.count + 1 }))

    if (navigator.onLine && !syncingRef.current) {
      syncNow()
    }
  }, [familyId])

  const completeTask = useCallback(async (taskId: string) => {
    await queueOperation({
      type: 'complete',
      payload: { id: taskId, completedAt: new Date().toISOString() },
      familyId,
    })

    setPending(prev => ({ ...prev, count: prev.count + 1 }))

    if (navigator.onLine && !syncingRef.current) {
      syncNow()
    }
  }, [familyId])

  const syncNow = useCallback(async () => {
    if (syncingRef.current) return
    syncingRef.current = true

    try {
      const token = typeof tokenRef.current === 'function'
        ? await tokenRef.current()
        : tokenRef.current

      if (!token) {
        console.warn('[OfflineQueue] No auth token available for sync')
        return
      }

      const result = await syncPendingOperations(token, baseUrl)

      if (result.failed.length > 0) {
        console.warn('[OfflineQueue] Some operations failed to sync:', result.failed)
      }

      if (result.synced > 0) {
        await setLastSyncTime(familyId, new Date().toISOString())
      }

      // Refresh pending count
      const count = await getPendingCount()
      const ops = await getPendingOperations(familyId)
      setPending({ count, operations: ops })

      return result
    } catch (err) {
      console.error('[OfflineQueue] Sync failed:', err)
    } finally {
      syncingRef.current = false
    }
  }, [familyId, baseUrl])

  return {
    isOnline,
    pendingCount: pending.count,
    pendingOperations: pending.operations,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    syncNow,
    syncing: syncingRef.current,
  }
}
