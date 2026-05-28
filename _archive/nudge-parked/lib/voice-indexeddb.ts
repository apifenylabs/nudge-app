/**
 * Voice IndexedDB Storage
 *
 * Offline-first storage for voice recordings and transcriptions.
 * When offline, recordings are stored locally and queued for transcription
 * when connectivity is restored.
 *
 * Architecture:
 *   - `recordings` store: raw audio blobs + metadata
 *   - `pendingQueue` store: recordings awaiting transcription
 *   - `transcriptionCache` store: cached transcriptions (avoids re-transcribing)
 */

const DB_NAME = 'nudge-voice-db'
const DB_VERSION = 2

export interface VoiceRecording {
  id: string
  audioBlob: Blob
  mimeType: string
  durationMs: number
  createdAt: string
  status: 'pending' | 'transcribed' | 'failed'
  transcriptionId?: string
  error?: string
  /** Estimated transcription quality (0-1) based on recording characteristics */
  qualityEstimate?: number
}

export interface PendingTranscription {
  id: string
  recordingId: string
  createdAt: string
  retryCount: number
  lastError: string | null
}

export interface CachedTranscription {
  id: string
  text: string
  confidence?: number
  createdAt: string
  durationMs: number
  hash: string
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Voice recordings (raw audio + metadata)
      if (!db.objectStoreNames.contains('recordings')) {
        const store = db.createObjectStore('recordings', { keyPath: 'id' })
        store.createIndex('status', 'status', { unique: false })
        store.createIndex('createdAt', 'createdAt', { unique: false })
      }

      // Pending transcription queue
      if (!db.objectStoreNames.contains('pendingQueue')) {
        const queue = db.createObjectStore('pendingQueue', { keyPath: 'id' })
        queue.createIndex('recordingId', 'recordingId', { unique: false })
        queue.createIndex('retryCount', 'retryCount', { unique: false })
      }

      // Transcription cache (text results, avoids re-calling API)
      if (!db.objectStoreNames.contains('transcriptionCache')) {
        const cache = db.createObjectStore('transcriptionCache', { keyPath: 'id' })
        cache.createIndex('hash', 'hash', { unique: true })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Save a voice recording to IndexedDB for offline processing
 */
export async function saveRecording(
  blob: Blob,
  durationMs: number
): Promise<VoiceRecording> {
  const db = await openDB()
  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  // Estimate quality based on recording duration (very short = likely noise)
  const qualityEstimate = durationMs < 500 ? 0.1
    : durationMs < 1000 ? 0.4
    : durationMs < 3000 ? 0.7
    : durationMs > 120000 ? 0.5 // >2min loses focus
    : 0.85

  const recording: VoiceRecording = {
    id,
    audioBlob: blob,
    mimeType: blob.type,
    durationMs,
    createdAt: now,
    status: 'pending',
    qualityEstimate,
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readwrite')
    const store = tx.objectStore('recordings')
    store.add(recording)

    // Also add to pending transcription queue
    const queue = tx.objectStore('pendingQueue')
    queue.add({
      id: crypto.randomUUID(),
      recordingId: id,
      createdAt: now,
      retryCount: 0,
      lastError: null,
    } as PendingTranscription)

    tx.oncomplete = () => {
      db.close()
      resolve(recording)
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
  })
}

/**
 * Retrieve a recording by ID
 */
export async function getRecording(id: string): Promise<VoiceRecording | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readonly')
    const store = tx.objectStore('recordings')
    const request = store.get(id)
    request.onsuccess = () => {
      db.close()
      resolve(request.result || null)
    }
    request.onerror = () => {
      db.close()
      reject(request.error)
    }
  })
}

/**
 * Get all pending recordings that need transcription
 */
export async function getPendingRecordings(): Promise<VoiceRecording[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readonly')
    const index = tx.objectStore('recordings').index('status')
    const recordings: VoiceRecording[] = []

    const request = index.openCursor(IDBKeyRange.only('pending'))
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        recordings.push(cursor.value as VoiceRecording)
        cursor.continue()
      } else {
        resolve(recordings)
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
 * Update recording status after transcription attempt
 */
export async function updateRecordingStatus(
  id: string,
  status: 'transcribed' | 'failed',
  transcriptionId?: string,
  error?: string
): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readwrite')
    const store = tx.objectStore('recordings')
    const request = store.get(id)
    request.onsuccess = () => {
      const recording = request.result as VoiceRecording | undefined
      if (recording) {
        recording.status = status
        recording.transcriptionId = transcriptionId
        recording.error = error
        store.put(recording)
      }
    }
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
 * Remove processed recording from queue
 */
export async function removeFromPendingQueue(recordingId: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pendingQueue', 'readwrite')
    const index = tx.objectStore('pendingQueue').index('recordingId')
    const request = index.openCursor(IDBKeyRange.only(recordingId))
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        cursor.delete()
      }
    }
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
 * Cache a transcription result to avoid re-transcribing identical audio
 */
export async function cacheTranscription(
  text: string,
  confidence: number | undefined,
  durationMs: number,
  audioHash: string
): Promise<void> {
  const db = await openDB()
  const entry: CachedTranscription = {
    id: crypto.randomUUID(),
    text,
    confidence,
    createdAt: new Date().toISOString(),
    durationMs,
    hash: audioHash,
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction('transcriptionCache', 'readwrite')
    const store = tx.objectStore('transcriptionCache')
    // Check if hash already exists
    const index = store.index('hash')
    const checkRequest = index.getKey(audioHash)
    checkRequest.onsuccess = () => {
      if (!checkRequest.result) {
        store.add(entry)
      }
    }
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
 * Get cached transcription by audio hash
 */
export async function getCachedTranscription(hash: string): Promise<CachedTranscription | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('transcriptionCache', 'readonly')
    const index = tx.objectStore('transcriptionCache').index('hash')
    const request = index.get(hash)
    request.onsuccess = () => {
      db.close()
      resolve(request.result || null)
    }
    request.onerror = () => {
      db.close()
      reject(request.error)
    }
  })
}

/**
 * Get total number of pending recordings
 */
export async function getPendingRecordingCount(): Promise<number> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readonly')
    const index = tx.objectStore('recordings').index('status')
    const request = index.count(IDBKeyRange.only('pending'))
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
 * Process all pending offline recordings when connectivity is restored.
 * Returns { transcribed: number, failed: number }
 */
export async function syncPendingRecordings(getAuthToken: () => Promise<string | null>): Promise<{
  transcribed: number
  failed: number
}> {
  const pending = await getPendingRecordings()
  if (pending.length === 0) return { transcribed: 0, failed: 0 }

  const token = await getAuthToken()
  if (!token) return { transcribed: 0, failed: 0 }

  let transcribed = 0
  let failed = 0

  for (const recording of pending) {
    try {
      const formData = new FormData()
      formData.append('audio', recording.audioBlob, `recording_${recording.id}.webm`)

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      const text = data.text || ''

      // Mark as transcribed
      await updateRecordingStatus(recording.id, 'transcribed', text)

      // Remove from pending queue
      await removeFromPendingQueue(recording.id)

      // Cache it
      await cacheTranscription(text, data.confidence, recording.durationMs, recording.id)

      transcribed++
    } catch (err) {
      console.error('[VoiceSync] Failed to transcribe offline recording:', err)
      await updateRecordingStatus(recording.id, 'failed', undefined, String(err))
      failed++
    }
  }

  return { transcribed, failed }
}
