interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

interface ConversationMessage {
  message: string
  response?: string
  timestamp: number
  emotionalTone?: string
  supportType?: string
}

export class GeminiService {
  private apiKey: string
  private baseUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
  private conversationHistory: ConversationMessage[] = []
  private lastResponseTime = 0
  private conversationTimeout = 15 * 60 * 1000 // 15 minutes
  private userEmotionalState: string = 'neutral'

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!this.apiKey) {
      console.error('VITE_GEMINI_API_KEY is not set in environment variables')
      throw new Error('Gemini API key is required but not configured')
    }
  }

  private analyzeEmotionalTone(message: string): string {
    const lowerMessage = message.toLowerCase()
    
    // Crisis indicators
    if (this.containsCrisisKeywords(lowerMessage)) return 'crisis'
    
    // Emotional states
    if (lowerMessage.match(/\b(anxious|anxiety|panic|worried|nervous|scared|afraid)\b/)) return 'anxious'
    if (lowerMessage.match(/\b(sad|depressed|down|hopeless|empty|worthless|lonely)\b/)) return 'depressed'
    if (lowerMessage.match(/\b(angry|mad|frustrated|irritated|furious)\b/)) return 'angry'
    if (lowerMessage.match(/\b(stressed|overwhelmed|pressure|burden|exhausted)\b/)) return 'stressed'
    if (lowerMessage.match(/\b(confused|lost|uncertain|don't know|unclear)\b/)) return 'confused'
    if (lowerMessage.match(/\b(happy|good|better|grateful|thankful|positive)\b/)) return 'positive'
    
    return 'neutral'
  }

  private containsCrisisKeywords(message: string): boolean {
    const crisisKeywords = [
      'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
      'self harm', 'hurt myself', 'cut myself', 'overdose', 'jump off',
      'can\'t go on', 'no point living', 'everyone would be better without me'
    ]
    return crisisKeywords.some(keyword => message.includes(keyword))
  }

  private buildOptimizedPrompt(message: string, emotionalTone: string): string {
    const recentContext = this.conversationHistory.slice(-3)
      .map(h => `User: ${h.message}${h.response ? ` | HopeFlow: ${h.response}` : ''}`)
      .join('\n')

    const basePrompt = `You are HopeFlow, a highly empathetic AI emotional support companion. You provide immediate, personalized emotional support with therapeutic communication techniques.

CURRENT USER EMOTIONAL STATE: ${emotionalTone}
CONVERSATION CONTEXT (last 3 exchanges):
${recentContext || 'This is the start of our conversation.'}

CORE RESPONSE PRINCIPLES:
1. EMPATHY FIRST: Always validate emotions before offering solutions
2. PERSONALIZED: Reference their specific situation and feelings
3. CONCISE: Keep responses 2-3 sentences maximum for better engagement
4. THERAPEUTIC: Use evidence-based emotional support techniques
5. HOPEFUL: Gently introduce hope without dismissing current pain
6. INTERACTIVE: Ask ONE thoughtful follow-up question to deepen connection

RESPONSE STYLE FOR ${emotionalTone.toUpperCase()} STATE:`

    const stateSpecificGuidance = {
      crisis: `
- IMMEDIATE SAFETY: Acknowledge their pain seriously
- PROVIDE RESOURCES: Include crisis helpline numbers (India: 1800-599-0019, Emergency: 112)
- STAY CONNECTED: Express genuine concern and care
- NO JUDGMENT: Avoid minimizing their feelings`,

      anxious: `
- GROUNDING: Offer simple, immediate calming techniques
- VALIDATION: Normalize anxiety as a common human experience
- PRESENT FOCUS: Help them stay in the current moment
- GENTLE GUIDANCE: Suggest one small, manageable step`,

      depressed: `
- DEEP VALIDATION: Acknowledge the weight of their feelings
- GENTLE HOPE: Introduce tiny sparks of possibility
- CONNECTION: Emphasize they're not alone in this
- SMALL STEPS: Focus on one tiny positive action`,

      angry: `
- VALIDATION: Acknowledge their anger as valid
- UNDERSTANDING: Help them explore what's underneath
- HEALTHY EXPRESSION: Suggest constructive outlets
- PERSPECTIVE: Gently help them see different angles`,

      stressed: `
- OVERWHELM RELIEF: Break down their situation into smaller parts
- PRIORITIZATION: Help identify what's most important right now
- SELF-CARE: Suggest immediate stress relief techniques
- PERSPECTIVE: Remind them this feeling is temporary`,

      confused: `
- CLARITY SEEKING: Help them organize their thoughts
- PATIENT EXPLORATION: Take time to understand their situation
- GENTLE GUIDANCE: Offer frameworks for decision-making
- REASSURANCE: Normalize feeling confused during difficult times`,

      positive: `
- CELEBRATION: Acknowledge and celebrate their positive feelings
- REINFORCEMENT: Help them recognize their strength and progress
- BUILDING: Use this moment to build resilience for future challenges
- GRATITUDE: Encourage reflection on what's going well`,

      neutral: `
- OPEN EXPLORATION: Create safe space for them to share more
- GENTLE CURIOSITY: Ask about their current experience
- SUPPORTIVE PRESENCE: Let them know you're here to listen
- INVITATION: Encourage them to share what's on their mind`
    }

    const crisisResources = emotionalTone === 'crisis' ? `

CRISIS RESOURCES TO INCLUDE:
- National Mental Health Helpline: 1800-599-0019 (24/7)
- Vandrevala Foundation: 9999 666 555 (crisis counseling)
- Emergency Services: 112 (immediate danger)` : ''

    return `${basePrompt}
${stateSpecificGuidance[emotionalTone as keyof typeof stateSpecificGuidance] || stateSpecificGuidance.neutral}${crisisResources}

USER'S CURRENT MESSAGE: "${message}"

Respond with genuine empathy, specific validation of their feelings, and ONE caring follow-up question. Make it feel like talking to a wise, caring friend who truly understands.`
  }

  private filterAndProcessResponse(rawResponse: string, emotionalTone: string): string {
    // Clean up the response
    let processedResponse = rawResponse.trim()

    // Remove any unwanted prefixes or AI-like language
    processedResponse = processedResponse.replace(/^(AI:|Assistant:|HopeFlow:)\s*/i, '')
    processedResponse = processedResponse.replace(/^(I'm an AI|As an AI|I'm a language model).*?\.?\s*/i, '')
    
    // Ensure crisis responses include helpline numbers if they don't already
    if (emotionalTone === 'crisis' && !processedResponse.includes('1800-599-0019')) {
      processedResponse += '\n\nImmediate help is available: National Mental Health Helpline (1800-599-0019) or Emergency Services (112).'
    }

    // Ensure response isn't too long (split into paragraphs if needed)
    if (processedResponse.length > 500) {
      const sentences = processedResponse.split('. ')
      if (sentences.length > 3) {
        processedResponse = sentences.slice(0, 3).join('. ') + '.'
      }
    }

    // Ensure response ends properly
    if (!processedResponse.match(/[.!?]$/)) {
      processedResponse += '.'
    }

    return processedResponse
  }

  async generateResponse(message: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("AI service is not properly configured. Please contact support for assistance.")
    }

    try {
      // Check if conversation has been inactive for too long
      const now = Date.now()
      if (this.lastResponseTime && (now - this.lastResponseTime) > this.conversationTimeout) {
        this.conversationHistory = [] // Reset conversation
        this.userEmotionalState = 'neutral'
      }

      // Analyze emotional tone of current message
      const emotionalTone = this.analyzeEmotionalTone(message)
      this.userEmotionalState = emotionalTone

      // Build optimized prompt based on emotional state
      const optimizedPrompt = this.buildOptimizedPrompt(message, emotionalTone)

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: optimizedPrompt
            }]
          }],
          generationConfig: {
            temperature: emotionalTone === 'crisis' ? 0.3 : 0.7, // Lower temperature for crisis situations
            topK: 40,
            topP: 0.9,
            maxOutputTokens: emotionalTone === 'crisis' ? 300 : 200, // More tokens for crisis responses
            candidateCount: 1,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH" // More lenient for mental health discussions
            }
          ]
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Gemini API Error Response:', errorText)
        throw new Error(`Gemini API request failed: ${response.status} - ${errorText}`)
      }

      const data: GeminiResponse = await response.json()
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        const rawResponse = data.candidates[0].content.parts[0].text
        
        // Filter and process the response from Gemini
        const processedResponse = this.filterAndProcessResponse(rawResponse, emotionalTone)
        
        // Add to conversation history with metadata
        this.conversationHistory.push({
          message,
          response: processedResponse,
          timestamp: now,
          emotionalTone,
          supportType: this.getSupportType(emotionalTone)
        })
        
        this.lastResponseTime = now

        // Keep only last 8 exchanges for better context management
        if (this.conversationHistory.length > 8) {
          this.conversationHistory = this.conversationHistory.slice(-8)
        }

        return processedResponse
      } else {
        console.error('Invalid Gemini API response format:', data)
        throw new Error('Invalid response format from Gemini API')
      }
    } catch (error: any) {
      console.error('Gemini Service Error:', error)
      
      // Re-throw the error to be handled by the calling component
      // This ensures we don't provide custom responses here
      throw error
    }
  }

  private getSupportType(emotionalTone: string): string {
    const supportTypes = {
      crisis: 'crisis_intervention',
      anxious: 'anxiety_support',
      depressed: 'depression_support',
      angry: 'anger_management',
      stressed: 'stress_relief',
      confused: 'clarity_guidance',
      positive: 'positive_reinforcement',
      neutral: 'general_support'
    }
    return supportTypes[emotionalTone as keyof typeof supportTypes] || 'general_support'
  }

  // Enhanced conversation management
  resetConversation(): void {
    this.conversationHistory = []
    this.lastResponseTime = 0
    this.userEmotionalState = 'neutral'
  }

  shouldContinueConversation(): boolean {
    const now = Date.now()
    return this.lastResponseTime && (now - this.lastResponseTime) < this.conversationTimeout
  }

  getConversationInsights(): {
    emotionalJourney: string[]
    supportTypes: string[]
    conversationLength: number
    lastActivity: number
  } {
    return {
      emotionalJourney: this.conversationHistory.map(h => h.emotionalTone || 'neutral'),
      supportTypes: this.conversationHistory.map(h => h.supportType || 'general_support'),
      conversationLength: this.conversationHistory.length,
      lastActivity: this.lastResponseTime
    }
  }

  // Get personalized conversation starter based on history
  getPersonalizedGreeting(): string {
    if (this.conversationHistory.length === 0) {
      return "Hello, I'm HopeFlow. I'm here to listen and support you through whatever you're experiencing. What's on your mind today?"
    }
    
    const lastEmotion = this.conversationHistory[this.conversationHistory.length - 1]?.emotionalTone
    if (lastEmotion === 'positive') {
      return "It's good to see you again. I remember you were feeling more positive last time we talked. How are things going for you today?"
    }
    
    return "Welcome back. I'm here to continue supporting you. How have you been feeling since we last talked?"
  }
}

export const geminiService = new GeminiService()