'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  Mic, Square, Loader2, CheckCircle, AlertCircle,
  Play, RotateCcw, Pencil, Send, Headphones, Volume2,
  WifiOff, HardDrive, Sparkles
} from 'lucide-react'
import ConfidenceBadge from './ConfidenceBadge'

interface VoiceRecorderProps {
  onTranscribed: (text: string, taskCreated?: boolean) => void
  mode?: 'button' | 'full'
  autoSubmit?: boolean
  /** When true, shows inline review step to confirm/edit before calling onTranscribed */
  requireConfirmation?: boolean
  /** Called when the user cancels the review (no-op by default) */
  onCancel?: () => void
  /** Quality estimate (0-1) for the recording, shown as a badge */
  qualityEstimate?: number | null
  /** When true, indicates the recording was saved offline */
  isOfflineRecording?: boolean
}

type RecorderState =
  | 'idle'
  | 'recording'
  | 'transcribing'
  | 'review'       // NEW: preview + confirm/re-record
  | 'success'
  | 'error'

const MOCK_PHRASES = [
  'Remind Jake to take out trash tonight',
  'Buy groceries for Saturday dinner — milk, eggs, bread, and salmon',
  'Schedule dentist appointment for next Tuesday at 2 PM',
  'Pick up dry cleaning before Friday',
  'Call mom about weekend plans',
  'Fix the leaking faucet in the guest bathroom',
  'Submit expense report for last month',
  'Order new light bulbs for the kitchen',
]

export default function VoiceRecorder({
  onTranscribed,
  mode = 'full',
  autoSubmit = false,
  requireConfirmation = true,
  onCancel,
}: VoiceRecorderProps) {
  const [state, setState] = useState<RecorderState>('idle')
  const [transcribedText, setTranscribedText] = useState('')
  const [editedText, setEditedText] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [editing, setEditing] = useState(false)
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false)
  const [qualityEstimate, setQualityEstimate] = useState<number | null>(null)
  const [offlineSaved, setOfflineSaved] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const editInputRef = useRef<HTMLTextAreaElement>(null)

  // Keyboard shortcut: Space to start/stop recording when not in editing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.target instanceof HTMLButtonElement) return

      if (e.code === 'Space' && state === 'idle') {
        e.preventDefault()
        startRecording()
      } else if (e.code === 'Space' && state === 'recording') {
        e.preventDefault()
        stopRecording()
      } else if (e.code === 'Escape' && state === 'review') {
        handleCancelReview()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  // Focus edit input when editing mode activates
  useEffect(() => {
    if (editing && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [editing])

  // Silence detection: if audio level stays below threshold for 2.5 seconds, auto-stop
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const SILENCE_THRESHOLD = 0.03
  const SILENCE_TIMEOUT_MS = 2500

  const resetSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
    }
    silenceTimerRef.current = setTimeout(() => {
      if (mediaRecorderRef.current?.state === 'recording') {
        stopRecording()
      }
    }, SILENCE_TIMEOUT_MS)
  }, [])

  // Track online/offline status
  useEffect(() => {
    const goOnline = () => setIsOffline(false)
    const goOffline = () => setIsOffline(true)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const startRecording = useCallback(async () => {
    try {
      setState('recording')
      setRecordingDuration(0)
      setErrorMsg('')
      setAudioUrl(null)
      setOfflineSaved(false)
      setQualityEstimate(null)
      chunksRef.current = []

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Audio analysis for visual feedback + silence detection
      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray)
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
        const normalized = Math.min(avg / 128, 1)
        setAudioLevel(normalized)

        // Silence detection
        if (normalized < SILENCE_THRESHOLD) {
          resetSilenceTimer()
        }

        animationFrameRef.current = requestAnimationFrame(updateLevel)
      }
      updateLevel()

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4'

      const recorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current)
          silenceTimerRef.current = null
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop())
          streamRef.current = null
        }

        setState('transcribing')

        try {
          const blob = new Blob(chunksRef.current, { type: mimeType })

          // Create audio preview URL for review
          const url = URL.createObjectURL(blob)
          setAudioUrl(url)

          const isCurrentlyOffline = !navigator.onLine

          if (isCurrentlyOffline) {
            // Save recording to IndexedDB for later transcription
            try {
              const { saveRecording } = await import('@/lib/voice-indexeddb')
              const recording = await saveRecording(blob, recordingDuration * 1000)
              setOfflineSaved(true)
              setQualityEstimate(recording.qualityEstimate || null)

              // Show saved confirmation
              setState('success')
              setTranscribedText('Recording saved offline — will transcribe when connected')
              setTimeout(() => {
                setState('idle')
                setTranscribedText('')
                setAudioUrl(null)
              }, 3000)
            } catch (dbErr) {
              console.error('Failed to save offline recording:', dbErr)
              setErrorMsg('Could not save recording offline. Check storage space.')
              setState('error')
              setTimeout(() => setState('idle'), 3000)
            }
          } else {
            // Online: transcribe immediately
            const formData = new FormData()
            formData.append('audio', blob, 'recording.webm')

            const res = await fetch('/api/transcribe', {
              method: 'POST',
              body: formData,
            })

            if (!res.ok) {
              throw new Error('Transcription failed')
            }

            const data = await res.json()

            let text: string
            if (data.mock) {
              text = MOCK_PHRASES[Math.floor(Math.random() * MOCK_PHRASES.length)]
            } else {
              text = data.text
            }

            setTranscribedText(text)

            // Calculate quality estimate from recording duration and audio level
            const estimatedQuality = recordingDuration < 1 ? 0.2
              : recordingDuration < 2 ? 0.5
              : recordingDuration > 120 ? 0.5
              : 0.85
            setQualityEstimate(estimatedQuality)

            if (requireConfirmation) {
              setEditedText(text)
              setState('review')
            } else {
              onTranscribed(text)
              setState('success')
              setTimeout(() => {
                setState('idle')
                setTranscribedText('')
                setAudioUrl(null)
              }, 3000)
            }

            // Cache transcription result
            try {
              const { cacheTranscription } = await import('@/lib/voice-indexeddb')
              await cacheTranscription(text, estimatedQuality, recordingDuration * 1000, recordingDuration.toString())
            } catch {}
          }
        } catch (err) {
          console.error('Transcription error:', err)
          // If we're offline, try to save for later
          if (!navigator.onLine && chunksRef.current.length > 0) {
            try {
              const blob = new Blob(chunksRef.current)
              const { saveRecording } = await import('@/lib/voice-indexeddb')
              const recording = await saveRecording(blob, recordingDuration * 1000)
              setOfflineSaved(true)
              setQualityEstimate(recording.qualityEstimate || null)
              setState('success')
              setTranscribedText('Recording saved offline — will transcribe when connected')
              setTimeout(() => {
                setState('idle')
                setTranscribedText('')
                setAudioUrl(null)
              }, 3000)
              return
            } catch {}
          }
          setErrorMsg('Could not transcribe. Try again.')
          setState('error')
          setTimeout(() => setState('idle'), 3000)
        }
      }

      recorder.start(250)

      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= 60) {
            stopRecording()
            return 60
          }
          return prev + 1
        })
      }, 1000)
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMsg('Microphone access denied. Check browser permissions.')
      } else {
        setErrorMsg('Could not start recording.')
      }
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }, [onTranscribed, requireConfirmation, resetSilenceTimer])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }, [])

  const handleConfirm = useCallback(() => {
    const finalText = editedText.trim()
    if (!finalText) return
    setTranscribedText(finalText)
    onTranscribed(finalText)
    setState('success')
    if (autoSubmit) {
      setTimeout(() => {
        setState('idle')
        setTranscribedText('')
        setAudioUrl(null)
        setEditing(false)
      }, 2000)
    }
  }, [editedText, onTranscribed, autoSubmit])

  const handleReRecord = useCallback(() => {
    setState('idle')
    setTranscribedText('')
    setAudioUrl(null)
    setEditing(false)
    // Small delay then start recording again
    setTimeout(() => startRecording(), 100)
  }, [startRecording])

  const handleCancelReview = useCallback(() => {
    setState('idle')
    setTranscribedText('')
    setAudioUrl(null)
    setEditing(false)
    onCancel?.()
  }, [onCancel])

  const handlePlayPreview = useCallback(() => {
    if (!audioUrl) return
    if (isPlaying) {
      audioRef.current?.pause()
      audioRef.current = null
      setIsPlaying(false)
      return
    }

    const audio = new Audio(audioUrl)
    audioRef.current = audio
    audio.onended = () => setIsPlaying(false)
    audio.play()
    setIsPlaying(true)
  }, [audioUrl, isPlaying])

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // ====== RENDER ======

  // Review step: show transcription, allow edit, replay, re-record, or confirm
  if (state === 'review') {
    return (
      <div className="w-full space-y-4">
        {/* Recorded audio preview */}
        {audioUrl && (
          <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
            <button
              onClick={handlePlayPreview}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                isPlaying
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
              title={isPlaying ? 'Stop' : 'Play recording'}
            >
              {isPlaying ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
            <div className="flex-1">
              <div className="h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                {isPlaying && (
                  <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: '40%' }} />
                )}
              </div>
            </div>
            <span className="text-xs text-muted-foreground font-mono">{formatDuration(recordingDuration)}</span>
          </div>
        )}

        {/* Confidence badge */}
        <ConfidenceBadge quality={qualityEstimate} size="md" />

        {/* Offline indicator */}
        {isOffline && (
          <div className="flex items-center gap-2 p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <WifiOff className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-xs text-amber-700 dark:text-amber-300">
              You&apos;re offline — task will transcribe when connected
            </span>
          </div>
        )}

        {/* Transcription display / edit */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Transcription
          </label>
          {editing ? (
            <textarea
              ref={editInputRef}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="input-field min-h-[5rem] resize-y text-sm"
              placeholder="Edit the transcribed text..."
              rows={3}
            />
          ) : (
            <div
              className="input-field min-h-[3rem] text-sm cursor-pointer flex items-start"
              onClick={() => setEditing(true)}
              role="button"
              tabIndex={0}
            >
              <span className="flex-1">{editedText}</span>
              <Pencil className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5 ml-2" />
            </div>
          )}
        </div>

        {/* Character count & word estimate */}
        {editedText && !editing && (
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60">
            <span>{editedText.length} chars</span>
            <span>&middot;</span>
            <span>~{editedText.split(/\s+/).filter(Boolean).length} words</span>
            {isOffline && (
              <>
                <span>&middot;</span>
                <span className="flex items-center gap-1 text-amber-500">
                  <HardDrive className="w-3 h-3" />
                  Saved offline
                </span>
              </>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCancelReview}
            className="btn-ghost flex-1 text-sm"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleReRecord}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            type="button"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Re-record
          </button>
          <button
            onClick={handleConfirm}
            className="btn-primary flex-1 text-sm"
            disabled={!editedText.trim()}
            type="button"
          >
            <Send className="w-3.5 h-3.5" />
            {autoSubmit ? 'Create Task' : 'Confirm'}
          </button>
        </div>
      </div>
    )
  }

  // ====== BUTTON MODE ======
  if (mode === 'button') {
    if (state === 'recording') {
      return (
        <button
          onClick={stopRecording}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all animate-pulse shadow-lg"
        >
          <Square size={16} />
          <span className="text-sm font-mono">{formatDuration(recordingDuration)}</span>
        </button>
      )
    }

    if (state === 'transcribing') {
      return (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Transcribing...</span>
        </div>
      )
    }

    if (state === 'success') {
      return (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl animate-in fade-in zoom-in-95 duration-200">
          <CheckCircle size={16} />
          <span className="text-sm">Done!</span>
        </div>
      )
    }

    return (
      <button
        onClick={startRecording}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg active:scale-[0.97]"
      >
        <Mic size={16} />
        <span>Voice Task</span>
      </button>
    )
  }

  // ====== FULL MODE ======
  return (
    <div className="w-full">
      {state === 'idle' && (
        <>
          <button
            onClick={startRecording}
            className="w-full group flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Mic size={22} className="group-hover:scale-110 transition-transform" />
            <span>Press &amp; speak your task</span>
            <kbd className="hidden sm:inline-flex text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white/80 font-mono ml-2">Space</kbd>
          </button>

          {/* Offline indicator above button */}
          {isOffline && (
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-amber-600 dark:text-amber-400">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Recording will be saved offline and transcribed later</span>
            </div>
          )}
        </>
      )}

      {state === 'recording' && (
        <div className="flex flex-col items-center gap-4">
          {/* Animated recording indicator */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">{formatDuration(recordingDuration)}</span>
          </div>

          {/* Waveform-style level meter */}
          <div className="w-full max-w-sm">
            <div className="flex items-end justify-center gap-[2px] h-10">
              {Array.from({ length: 32 }).map((_, i) => {
                // Generate a pseudo-waveform from current audio level
                const peak = Math.max(
                  0.05,
                  audioLevel * (0.5 + 0.5 * Math.sin((i / 32) * Math.PI * 3 + Date.now() / 200))
                )
                return (
                  <div
                    key={i}
                    className="w-[5px] rounded-full bg-gradient-to-t from-blue-500 to-cyan-400 transition-all duration-75"
                    style={{
                      height: `${peak * 100}%`,
                      opacity: 0.5 + peak * 0.5,
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* Microphone level indicator */}
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Listening... tap stop when done</span>
          </div>

          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all shadow-md active:scale-[0.97]"
          >
            <Square size={18} />
            <span>Stop Recording</span>
          </button>

          {/* Auto-stop hint */}
          <p className="text-[11px] text-muted-foreground/60">
            Or just pause — recording stops automatically after silence
          </p>
        </div>
      )}

      {state === 'transcribing' && (
        <div className="flex flex-col items-center gap-3 py-6">
          <Loader2 size={32} className="text-blue-500 animate-spin" />
          <p className="text-sm text-muted-foreground">Transcribing your voice...</p>
        </div>
      )}

      {state === 'success' && (
        <div className="flex flex-col items-center gap-2 py-6 animate-in fade-in zoom-in-95 duration-200">
          {offlineSaved ? (
            <HardDrive size={28} className="text-indigo-500" />
          ) : (
            <CheckCircle size={28} className="text-green-500" />
          )}
          <p className="text-sm text-foreground font-medium">
            {offlineSaved ? 'Recording saved offline' : (
              <>
                Heard: <span className="text-muted-foreground font-normal">&ldquo;{transcribedText}&rdquo;</span>
              </>
            )}
          </p>
          {qualityEstimate !== null && !offlineSaved && (
            <ConfidenceBadge quality={qualityEstimate} />
          )}
          {offlineSaved ? (
            <p className="text-xs text-muted-foreground">Will transcribe when you&apos;re back online</p>
          ) : (
            <p className="text-xs text-muted-foreground">Task created!</p>
          )}
        </div>
      )}

      {state === 'error' && (
        <div className="flex flex-col items-center gap-3 py-6">
          <AlertCircle size={28} className="text-red-500" />
          <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
          <button
            onClick={() => setState('idle')}
            className="text-sm text-blue-500 hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
