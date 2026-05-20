// Natural Language Parser for Nudge
// Uses DeepSeek API for intelligent task parsing
// Falls back to local Ollama (qwen3-coder) if cloud API unavailable

import { createAdminClient } from './supabase/admin'

export interface ParsedTask {
  title: string
  description?: string
  assigned_to?: string | null  // User ID or 'me' or family member name
  due_date?: string | null     // ISO date string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category?: string
  is_recurring?: boolean
  recurrence_pattern?: string  // 'daily', 'weekly', 'monthly'
}

export interface FamilyMember {
  id: string
  name: string
  telegram_username?: string
  pronouns?: string
}

class NLPParser {
  private DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
  private DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
  private OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
  private OLLAMA_MODEL = process.env.OLLAMA_NLP_MODEL || 'qwen3-coder:latest'
  
  // Tracks which backend is available
  private cloudAvailable: boolean
  private localAvailable: boolean = true

  constructor() {
    this.cloudAvailable = !!this.DEEPSEEK_API_KEY
  }

  private _adminClient: ReturnType<typeof createAdminClient> | null = null;
  private db() {
    if (!this._adminClient) this._adminClient = createAdminClient();
    return this._adminClient;
  }

  async parseMessage(
    message: string, 
    userId: string, 
    familyId: string
  ): Promise<ParsedTask> {
    const familyMembers = await this.getFamilyMembers(familyId)
    const systemPrompt = this.buildSystemPrompt(familyMembers, userId)

    // Try DeepSeek cloud first
    if (this.cloudAvailable) {
      try {
        return await this.deepseekParse(message, systemPrompt)
      } catch (error) {
        console.warn('DeepSeek API failed, falling back to local Ollama:', error)
        this.cloudAvailable = false
      }
    }

    // Try local Ollama
    if (this.localAvailable) {
      try {
        return await this.ollamaParse(message, systemPrompt)
      } catch (error) {
        console.warn('Ollama local NLP failed:', error)
        this.localAvailable = false
      }
    }

    // Ultimate fallback: rule-based parser
    return this.ruleBasedParse(message, familyMembers, userId)
  }

  private buildSystemPrompt(familyMembers: FamilyMember[], userId: string): string {
    const memberList = familyMembers.map(m => 
      `- ${m.name}${m.pronouns ? ` (${m.pronouns})` : ''}${m.telegram_username ? ` @${m.telegram_username}` : ''}`
    ).join('\n')

    return `You are Nudge, a family task management assistant. Parse natural language messages into structured tasks.

Family Members:
${memberList || '- No family members configured'}

Output ONLY valid JSON with these fields:
- title: Clear, concise task title (max 10 words)
- description: Optional detailed description (omit if short/none)
- assigned_to: User ID if someone is assigned, or null
- due_date: ISO date string if specified, or null
- priority: "low", "medium", "high", or "urgent"
- category: Optional category (chores, shopping, appointments, home, kids, pets, school, health, finance, social, work, fitness) or null
- is_recurring: boolean
- recurrence_pattern: "daily", "weekly", "monthly" or null

Rules:
1. If message says "I need to..." or "remind me..." or "I should..." or "I gotta...", assign to message sender (userId: ${userId})
2. "Remind [name] to..." → assign to that person
3. Parse dates: "today/tomorrow/tonight/this weekend/next week" into proper ISO dates
4. Urgent keywords: "asap", "now", "urgent", "immediately" → priority: "urgent"
5. "important", "critical" → priority: "high"
6. "when you can", "sometime", "low priority" → priority: "low"
7. Default priority: "medium"
8. Extract family member names from the list above — fuzzy match partial names
9. Keep titles concise but clear — strip fripperies

Example:
Input: "Remind Jake to take out trash tonight"
Output: {"title":"Take out trash","assigned_to":"<jake-id>","due_date":"<today-iso>","priority":"medium","category":"chores","is_recurring":false,"recurrence_pattern":null}

Return ONLY the JSON object. No markdown. No explanation.`
  }

  private async deepseekParse(message: string, systemPrompt: string): Promise<ParsedTask> {
    const today = new Date().toISOString().split('T')[0]

    const response = await fetch(this.DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Parse this message: "${message}". Today's date is ${today}.` }
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`DeepSeek API error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    return this.extractJSON(content, message)
  }

  private async ollamaParse(message: string, systemPrompt: string): Promise<ParsedTask> {
    const today = new Date().toISOString().split('T')[0]

    const response = await fetch(`${this.OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.OLLAMA_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Parse this message: "${message}". Today's date is ${today}.` }
        ],
        stream: false,
        options: {
          temperature: 0.1,
          num_predict: 500,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error ${response.status}`)
    }

    const data = await response.json()
    const content = data.message?.content || ''

    return this.extractJSON(content, message)
  }

  /**
   * Extract JSON from LLM response text (handles code fences, leading text, etc.)
   */
  private extractJSON(raw: string, originalMessage: string): ParsedTask {
    // Try to find JSON in code fences
    const jsonMatch = raw.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)?.[1] 
      || raw.match(/\{[\s\S]*"title"[\s\S]*\}/)?.[0]
    
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch)
      } catch {
        // Fall through to rule-based
      }
    }

    // Also try raw parse of full response
    try {
      return JSON.parse(raw.trim())
    } catch {
      // Fall through to rule-based
    }

    console.warn('LLM returned non-JSON, falling back to rule-based parse. Raw:', raw.slice(0, 200))
    throw new Error('Failed to extract JSON from LLM response')
  }

  /**
   * Ultimate fallback: rule-based parsing when no LLM is available
   */
  private async ruleBasedParse(
    message: string,
    familyMembers: FamilyMember[],
    userId: string
  ): Promise<ParsedTask> {
    const lowerMessage = message.toLowerCase()
    
    // Extract priority
    let priority: ParsedTask['priority'] = 'medium'
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('now')) {
      priority = 'urgent'
    } else if (lowerMessage.includes('important') || lowerMessage.includes('critical')) {
      priority = 'high'
    } else if (lowerMessage.includes('when you have time') || lowerMessage.includes('when you can') || lowerMessage.includes('low priority')) {
      priority = 'low'
    }

    // Extract due date
    let dueDate: string | null = null
    const today = new Date()
    
    if (lowerMessage.includes('today') || lowerMessage.includes('tonight')) {
      dueDate = today.toISOString()
    } else if (lowerMessage.includes('tomorrow')) {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      dueDate = tomorrow.toISOString()
    } else if (lowerMessage.includes('this weekend')) {
      const saturday = new Date(today)
      const dayOfWeek = saturday.getDay()
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7
      saturday.setDate(saturday.getDate() + daysUntilSaturday)
      dueDate = saturday.toISOString()
    } else if (lowerMessage.includes('next week')) {
      const nextWeek = new Date(today)
      nextWeek.setDate(nextWeek.getDate() + 7)
      dueDate = nextWeek.toISOString()
    } else if (lowerMessage.includes('next month')) {
      const nextMonth = new Date(today)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      dueDate = nextMonth.toISOString()
    }

    // Extract assigned person
    let assignedTo: string | null = null
    for (const member of familyMembers) {
      if (member.name && lowerMessage.includes(member.name.toLowerCase())) {
        assignedTo = member.id
        break
      }
      if (member.telegram_username && lowerMessage.includes(member.telegram_username.toLowerCase())) {
        assignedTo = member.id
        break
      }
    }

    // Check for "remind [name]" pattern — extract name from pattern
    if (!assignedTo) {
      const remindMatch = lowerMessage.match(/remind\s+(\w+)/)
      if (remindMatch) {
        const targetName = remindMatch[1].toLowerCase()
        for (const member of familyMembers) {
          if (member.name?.toLowerCase().startsWith(targetName)) {
            assignedTo = member.id
            break
          }
        }
      }
    }

    // Check user self-referencing
    const userDoingPatterns = [/i need to/i, /i should/i, /i have to/i, /remind me/i, /i'll/i, /i gotta/i, /i want/i]
    if (userDoingPatterns.some(pattern => pattern.test(message))) {
      assignedTo = userId
    }

    // Check for recurring tasks
    const isRecurring = lowerMessage.includes('every ') || 
                       lowerMessage.includes('daily') ||
                       lowerMessage.includes('weekly') ||
                       lowerMessage.includes('monthly') ||
                       lowerMessage.includes('each ')

    let recurrencePattern: string | undefined
    if (isRecurring) {
      if (lowerMessage.includes('every day') || lowerMessage.includes('daily')) {
        recurrencePattern = 'daily'
      } else if (lowerMessage.includes('every week') || lowerMessage.includes('weekly')) {
        recurrencePattern = 'weekly'
      } else if (lowerMessage.includes('every month') || lowerMessage.includes('monthly')) {
        recurrencePattern = 'monthly'
      }
    }

    // Extract category
    let category: string | undefined
    const categoryKeywords: Record<string, string[]> = {
      'chores': ['clean', 'laundry', 'dishes', 'trash', 'vacuum', 'mop', 'sweep', 'tidy', 'organize', 'pick up', 'wipe', 'dust', 'garage', 'yard', 'garden'],
      'shopping': ['buy', 'groceries', 'milk', 'eggs', 'bread', 'shop', 'purchase', 'order', 'delivery', 'pick up'],
      'appointments': ['doctor', 'dentist', 'appointment', 'meeting', 'checkup', 'consultation', 'reservation'],
      'home': ['repair', 'fix', 'plumber', 'electrician', 'maintenance', 'paint', 'decorate', 'install', 'replace'],
      'kids': ['school', 'homework', 'practice', 'game', 'teacher', 'pickup', 'drop off', 'playground', 'children', 'kids'],
      'pets': ['walk', 'feed', 'vet', 'groom', 'dog', 'cat', 'pet'],
      'school': ['study', 'exam', 'test', 'class', 'course', 'assignment', 'homework', 'project', 'paper'],
      'health': ['workout', 'gym', 'exercise', 'run', 'yoga', 'meditate', 'health', 'fitness', 'vitamin', 'medicine'],
      'finance': ['pay', 'bill', 'bank', 'transfer', 'invoice', 'budget', 'tax', 'insurance', 'subscription'],
      'social': ['call', 'text', 'message', 'birthday', 'party', 'dinner', 'lunch', 'coffee', 'visit', 'friend'],
      'work': ['work', 'office', 'meeting', 'deadline', 'project', 'client', 'report', 'email', 'presentation'],
    }

    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        category = cat
        break
      }
    }

    return {
      title: this.extractTitle(message),
      description: message.length > 120 ? message : undefined,
      assigned_to: assignedTo,
      due_date: dueDate,
      priority,
      category,
      is_recurring: isRecurring,
      recurrence_pattern: recurrencePattern,
    }
  }

  private extractTitle(message: string): string {
    const sentences = message.split(/[.!?]+/)
    const firstSentence = sentences[0].trim()
    
    // Remove common prefixes
    const prefixes = [
      /^can you\s+/i,
      /^please\s+/i,
      /^remind\s+\w+\s+(?:to\s+)?/i,
      /^i need to\s+/i,
      /^we need to\s+/i,
      /^don't forget to\s+/i,
      /^i should\s+/i,
      /^i have to\s+/i,
      /^i'll\s+/i,
      /^i gotta\s+/i,
      /^remind me to\s+/i,
    ]
    
    let title = firstSentence
    for (const pattern of prefixes) {
      if (pattern.test(title)) {
        title = title.replace(pattern, '')
        break
      }
    }
    
    // Also strip leading "to " after name extraction
    title = title.replace(/^to\s+/i, '')
    
    // Capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1)
    
    // Limit length
    if (title.length > 100) {
      title = title.substring(0, 97) + '...'
    }
    
    return title
  }

  async getFamilyMembers(familyId: string): Promise<FamilyMember[]> {
    const { data, error } = await this.db()
      .from('family_members')
      .select(`
        user_id,
        users!inner (
          id,
          full_name,
          telegram_username
        )
      `)
      .eq('family_id', familyId)

    if (error) {
      console.error('Error fetching family members:', error)
      return []
    }

    return data.map((item: any) => {
      const user = Array.isArray(item.users) ? item.users[0] : item.users
      return {
        id: user?.id || '',
        name: user?.full_name || 'Family Member',
        telegram_username: user?.telegram_username,
      }
    })
  }

  async askClarifyingQuestion(
    message: string,
    userId: string,
    familyId: string,
    missingInfo: string[]
  ): Promise<string> {
    if (!this.cloudAvailable) {
      return this.mockClarifyingQuestion(missingInfo)
    }

    const familyMembers = await this.getFamilyMembers(familyId)
    const memberList = familyMembers.map(m => `- ${m.name}`).join('\n')

    const systemPrompt = `You are Nudge, a family task assistant. Ask ONE clarifying question to get missing information.

Missing information: ${missingInfo.join(', ')}

Family Members:
${memberList || '- No family members'}

Original message: "${message}"

Ask a single, clear question that will help complete the task creation. Keep it friendly and concise.`

    try {
      const response = await fetch(this.DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Ask a clarifying question.' }
          ],
          temperature: 0.3,
          max_tokens: 200,
        }),
      })

      if (!response.ok) throw new Error(`API error ${response.status}`)

      const data = await response.json()
      const content = data.choices?.[0]?.message?.content
      if (content) return content.trim()
    } catch (error) {
      console.warn('Clarifying question API failed:', error)
    }

    return this.mockClarifyingQuestion(missingInfo)
  }

  private mockClarifyingQuestion(missingInfo: string[]): string {
    const questions: Record<string, string> = {
      'assigned_to': 'Who should I assign this task to?',
      'due_date': 'When should this be done by? (Today, tomorrow, this weekend, etc.)',
      'priority': 'How important is this? (Low/Medium/High/Urgent)',
      'recurrence': 'Should this be a recurring task? (Daily/Weekly/Monthly)',
    }

    for (const info of missingInfo) {
      if (questions[info]) {
        return questions[info]
      }
    }

    return 'Can you provide more details about this task?'
  }
}

export const nlpParser = new NLPParser()
