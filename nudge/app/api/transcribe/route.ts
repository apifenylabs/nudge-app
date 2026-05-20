import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/transcribe
 * Accepts a base64-encoded audio blob or FormData file,
 * sends to OpenAI Whisper API, returns transcribed text.
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''

    let audioBuffer: Buffer
    let filename = 'recording.webm'

    if (contentType.includes('multipart/form-data')) {
      // FormData with audio file
      const formData = await req.formData()
      const file = formData.get('audio') as File | null
      if (!file) {
        return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })
      }
      const bytes = await file.arrayBuffer()
      audioBuffer = Buffer.from(bytes)
      filename = file.name || 'recording.webm'
    } else if (contentType.includes('application/json')) {
      // JSON with base64 audio
      const body = await req.json()
      if (!body.audio) {
        return NextResponse.json({ error: 'No audio data provided' }, { status: 400 })
      }
      audioBuffer = Buffer.from(body.audio, 'base64')
      filename = body.filename || 'recording.webm'
    } else {
      // Raw binary
      const bytes = await req.arrayBuffer()
      audioBuffer = Buffer.from(bytes)
    }

    // Call OpenAI Whisper API
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Mock mode for development
      return NextResponse.json({
        text: 'mock reminder for Jake to take out trash tonight',
        mock: true,
      })
    }

    // Create form data for Whisper
    const whisperForm = new FormData()
    const uint8 = new Uint8Array(audioBuffer)
    const blob = new Blob([uint8], { type: 'audio/webm' })
    whisperForm.append('file', blob, filename)
    whisperForm.append('model', 'whisper-1')
    whisperForm.append('language', 'en')

    const whisperRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: whisperForm,
    })

    if (!whisperRes.ok) {
      const errorText = await whisperRes.text()
      console.error('Whisper API error:', errorText)
      return NextResponse.json({ error: 'Transcription failed', details: errorText }, { status: 500 })
    }

    const whisperData = await whisperRes.json()

    return NextResponse.json({
      text: whisperData.text,
      duration: whisperData.duration || null,
    })
  } catch (error) {
    console.error('Transcribe error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
