# Voice Utility - Shared Across All Orchestras

## Purpose
Central voice input service using open models (Whisper/Gemini Live) for all orchestras to use. NOT copying Wispr Flow.

## Models & APIs

### Primary: OpenAI Whisper (Open Source)
- **Model:** Whisper large-v3
- **Type:** Speech-to-text
- **Cost:** ~$0.006/minute (API) or free (self-hosted)
- **Languages:** 99+ languages
- **Features:** Transcription, translation, diarization

### Alternative: Google Gemini Live
- **Model:** Gemini 2.0 Flash Listening
- **Type:** Real-time speech understanding
- **Cost:** Varies, potentially free tier
- **Features:** Contextual understanding, follow-up questions

### Fallback: Browser Web Speech API
- **API:** navigator.mediaDevices + SpeechRecognition
- **Cost:** Free (client-side)
- **Limitations:** Browser support, accuracy lower

## Architecture

### Central Voice Service
```
┌─────────────────┐
│   Client App    │ (Nudge, KidScan, etc.)
│   (Frontend)    │
└────────┬────────┘
         │ Audio stream / file
         ▼
┌─────────────────┐
│  Voice Gateway  │ (Central API)
│  - Whisper API  │
│  - Gemini Live  │
│  - Rate limiting│
└────────┬────────┘
         │ Text + metadata
         ▼
┌─────────────────┐
│   Orchestra     │
│   Specific      │
│   Processing    │
└─────────────────┘
```

### Implementation Options

**Option 1: Central API Server**
- Single endpoint: `POST /api/voice/transcribe`
- Supports: file upload, streaming, real-time
- Authentication: Orchestra API keys
- Rate limiting: Per orchestra

**Option 2: Client Library**
- NPM package: `@openclaw/voice`
- Browser + Node.js support
- Fallback strategies
- Caching layer

**Option 3: Hybrid**
- Client does initial processing
- Server for complex tasks
- Offline capability with Web Speech API

## Use Cases by Orchestra

### Nudge
- **Feature:** Voice task creation for families
- **Context:** "Remind Jake to take out trash tonight"
- **Flow:** Voice → Text → NLP parsing → Task creation
- **Value:** Hands-free task management for busy parents

### KidScan Beast
- **Feature:** Voice food descriptions
- **Context:** "This cereal has 12g sugar per serving"
- **Flow:** Voice → Text → Nutritional analysis
- **Value:** Quick input while holding products

### AppFactory Beast (Habit Tracker)
- **Feature:** Voice habit logging
- **Context:** "Just meditated for 10 minutes"
- **Flow:** Voice → Text → Habit tracking
- **Value:** Frictionless habit recording

### Directory Beast
- **Feature:** Voice business search
- **Context:** "Find emergency plumbers near me"
- **Flow:** Voice → Text → Search query
- **Value:** Mobile-friendly directory access

### Social Beast
- **Feature:** Voice content creation
- **Context:** "Create a post about today's progress"
- **Flow:** Voice → Text → Social post
- **Value:** Quick content generation

### Affiliate Beast
- **Feature:** Voice product search
- **Context:** "Find healthy snacks for kids"
- **Flow:** Voice → Text → Affiliate search
- **Value:** Voice commerce potential

## Implementation Phases

### Phase 1: Nudge Integration (Week 1)
1. Set up Whisper API access
2. Create voice button in Nudge task creation
3. Basic transcription → task parsing
4. Test with family use cases

### Phase 2: Central Service (Week 2)
1. Build voice gateway API
2. Add authentication/rate limiting
3. Support multiple input formats
4. Add Gemini Live as alternative

### Phase 3: Orchestra Rollout (Week 3)
1. Client library for all orchestras
2. Documentation and examples
3. Performance optimization
4. Cost monitoring

### Phase 4: Advanced Features (Week 4+)
1. Real-time streaming
2. Multi-language support
3. Voice commands
4. Custom models per orchestra

## Cost Management

### Free Tier Strategy
1. **Web Speech API** for basic functionality
2. **Whisper small** for lightweight tasks
3. **Gemini Live free tier** if available
4. **Caching** repeated phrases

### Paid Tier Strategy
1. **Per-orchestra budgets**
2. **Usage monitoring**
3. **Fallback to free when limits hit**
4. **Cost allocation in Alpha-HQ**

## Privacy & Security

### Data Handling
1. **Transient processing** - don't store audio
2. **GDPR/CCPA compliance** - user consent
3. **Children's data** - COPPA for KidScan
4. **Health data** - HIPAA considerations for medical

### Security
1. **HTTPS only** for audio transmission
2. **API key rotation**
3. **Input validation**
4. **Rate limiting** to prevent abuse

## Integration with Existing Tech Stack

### Frontend
- React hook: `useVoiceTranscription()`
- Component: `<VoiceInput />`
- Utilities: `voiceToText()`, `streamVoice()`

### Backend
- API route: `/api/voice/*`
- Middleware: authentication, rate limiting
- Services: WhisperService, GeminiService

### DevOps
- Docker container for self-hosted Whisper
- Monitoring: usage, errors, latency
- Alerting: cost overruns, service issues

## Success Metrics
1. **Accuracy:** 95%+ transcription accuracy
2. **Latency:** < 2 seconds for 10-second audio
3. **Cost:** < $0.01 per 10 minutes of audio
4. **Adoption:** 30%+ of Nudge users try voice
5. **Satisfaction:** 4+ star rating for voice feature

## Next Immediate Actions
1. Research Whisper API pricing/limits
2. Test Gemini Live availability
3. Create POC for Nudge voice input
4. Design central voice service architecture
5. Update Nudge roadmap with voice feature
