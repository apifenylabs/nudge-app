'use client'

import VoiceRecorder from './VoiceRecorder'

export default function VoiceHeroCTA() {
  return (
    <div className="max-w-md mx-auto mb-10">
      <VoiceRecorder mode="full" onTranscribed={() => {}} />
      <p className="text-xs text-gray-400 mt-2 text-center">
        Tap the mic and speak naturally. AI turns your voice into a task.
      </p>
    </div>
  )
}
