import React, { useState, useEffect, useRef } from 'react'
import { VoiceButton } from '../components/VoiceInterface/VoiceButton'
import { ChatMessage } from '../components/Chat/ChatMessage'
import { CustomLoader, ChatLoader } from '../components/UI/CustomLoader'
import { useVoice } from '../hooks/useVoice'
import { useAuth } from '../hooks/useAuth'
import { geminiService } from '../services/geminiService'
import { chatService } from '../lib/supabase'
import { Send, Lock, User } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Message {
  id: string
  message: string
  response?: string
  timestamp: string
  isVoice: boolean
}

export function Talk() {
  const { user } = useAuth()
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    speak,
    isSpeaking,
    isSupported,
    clearTranscript,
  } = useVoice()

  const [messages, setMessages] = useState<Message[]>([])
  const [textInput, setTextInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [lastActivityTime, setLastActivityTime] = useState(Date.now())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inactivityTimeoutRef = useRef<NodeJS.Timeout>()
  const processedTranscriptRef = useRef<string>('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle transcript processing - only process when listening stops and transcript is new
  useEffect(() => {
    if (transcript && !isListening && user && transcript !== processedTranscriptRef.current) {
      processedTranscriptRef.current = transcript
      handleSendMessage(transcript, true)
      // Clear transcript after processing to prevent reuse
      setTimeout(() => {
        clearTranscript()
        processedTranscriptRef.current = ''
      }, 1000)
    }
  }, [transcript, isListening, user, clearTranscript])

  // Handle user activity and inactivity
  useEffect(() => {
    const updateActivity = () => {
      setLastActivityTime(Date.now())
      
      // Clear existing timeout
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }

      // Set new timeout for 10 minutes of inactivity
      inactivityTimeoutRef.current = setTimeout(() => {
        geminiService.resetConversation()
        console.log('Conversation reset due to inactivity')
      }, 10 * 60 * 1000) // 10 minutes
    }

    // Update activity on any user interaction
    updateActivity()

    // Listen for user interactions
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true)
    })

    return () => {
      // Cleanup
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true)
      })
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }
    }
  }, [])

  // Reset conversation when component unmounts (user leaves)
  useEffect(() => {
    return () => {
      geminiService.resetConversation()
      clearTranscript()
      processedTranscriptRef.current = ''
    }
  }, [clearTranscript])

  const handleSendMessage = async (message: string, isVoice = false) => {
    if (!message.trim() || isLoading || !user) return

    const newMessage: Message = {
      id: Date.now().toString(),
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString(),
      isVoice,
    }

    setMessages(prev => [...prev, newMessage])
    setTextInput('')
    setIsLoading(true)
    setLastActivityTime(Date.now()) // Update activity time

    try {
      // Use Gemini AI directly
      const response = await geminiService.generateResponse(message.trim())
      
      // Update the message with response
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? { ...msg, response }
            : msg
        )
      )

      // Speak the response if it was a voice message
      if (isVoice && response) {
        speak(response)
      }

      // Save to database
      try {
        await chatService.saveMessage(message.trim(), response, isVoice)
      } catch (error) {
        console.error('Error saving message to database:', error)
        // Continue without throwing - the conversation still works
      }
    } catch (error) {
      console.error('Error getting AI response:', error)
      // Add error message
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? { ...msg, response: "I'm sorry, I'm having trouble responding right now. Please try again, or if this is an emergency, please call 112 or the mental health helpline at 1800-599-0019." }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      handleSendMessage(textInput, false)
    }
  }

  // Show login required screen if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 flex items-center justify-center transition-all duration-600 px-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md border border-mystic-jade-200/50 dark:border-ice-blue-800/50">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full mb-4 sm:mb-6 shadow-2xl animate-float">
              <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-pale-white" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 transition-colors duration-400">
              Sign In Required
            </h1>
            
            <p className="text-base sm:text-lg text-mystic-jade-600 dark:text-ice-blue-300 mb-6 sm:mb-8 transition-colors duration-400">
              To ensure your privacy and save your conversation history, please sign in to access HopeFlow and voice features.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <Link
                to="/auth"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 text-pale-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-glow text-sm sm:text-base"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Sign In
              </Link>
              
              <Link
                to="/auth?mode=signup"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-pale-white/80 dark:bg-charcoal-black-700/80 text-mystic-jade-700 dark:text-ice-blue-300 font-semibold rounded-lg border border-mystic-jade-200 dark:border-ice-blue-700 hover:bg-mystic-jade-50 dark:hover:bg-charcoal-black-600 hover:shadow-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Join HopeFlow
              </Link>
            </div>

            <div className="mt-6 p-3 bg-mystic-jade-50 dark:bg-ice-blue-900/20 border border-mystic-jade-200 dark:border-ice-blue-800 rounded-lg backdrop-blur-sm">
              <p className="text-xs sm:text-sm text-mystic-jade-700 dark:text-ice-blue-300 transition-colors duration-400">
                <strong>Why sign in?</strong> Your conversations are encrypted and private. Signing in allows us to save your chat history and provide personalized emotional support.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 transition-all duration-600">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 transition-colors duration-400 mb-2">
            Talk with HopeFlow
          </h1>
          <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-400 transition-colors duration-400 px-4">
            Share what's on your mind. You can type or speak - I'm here to listen and support you.
          </p>
          
          <div className="mt-4 flex flex-col items-center space-y-3">
            {/* AI Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-mystic-jade-100 to-ice-blue-100 dark:from-ice-blue-900/30 dark:to-mystic-jade-900/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                <span className="text-xs font-medium text-mystic-jade-700 dark:text-ice-blue-300">
                  HopeFlow AI Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden mb-4 sm:mb-6 transition-all duration-600 backdrop-blur-md border border-mystic-jade-200/50 dark:border-ice-blue-800/50 animate-scale-in">
          <div className="h-64 sm:h-80 lg:h-96 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-8 sm:py-12 animate-fade-in">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-mystic-jade-100 to-ice-blue-100 dark:from-ice-blue-900/30 dark:to-mystic-jade-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                  <span className="text-xl sm:text-2xl">💙</span>
                </div>
                <p className="text-sm sm:text-base text-mystic-jade-500 dark:text-ice-blue-400 transition-colors duration-400 px-4">
                  Start the conversation by typing below or using the voice button.
                </p>
                <p className="text-xs text-mystic-jade-600 dark:text-ice-blue-500 mt-2">
                  HopeFlow is here to provide compassionate emotional support
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={message.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ChatMessage
                    message={message.message}
                    response={message.response}
                    isUser={true}
                    timestamp={message.timestamp}
                    isVoice={message.isVoice}
                    onSpeak={speak}
                  />
                </div>
              ))
            )}

            {isLoading && <ChatLoader />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-mystic-jade-200/50 dark:border-ice-blue-700/50 p-3 sm:p-6 bg-mystic-jade-50/50 dark:bg-charcoal-black-900/50 backdrop-blur-sm transition-all duration-400">
            <form onSubmit={handleTextSubmit} className="flex space-x-2 sm:space-x-4">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-mystic-jade-300 dark:border-ice-blue-600 bg-pale-white dark:bg-charcoal-black-700 text-mystic-jade-900 dark:text-ice-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-mystic-jade-500 dark:focus:ring-ice-blue-500 focus:border-transparent transition-all duration-300 placeholder-mystic-jade-400 dark:placeholder-ice-blue-500 text-sm sm:text-base"
                disabled={isLoading || isSpeaking}
              />
              <button
                type="submit"
                disabled={!textInput.trim() || isLoading || isSpeaking}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 text-pale-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 animate-glow"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Voice Interface */}
        <div className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-8 transition-all duration-600 backdrop-blur-md border border-mystic-jade-200/50 dark:border-ice-blue-800/50 animate-scale-in">
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 transition-colors duration-400">
              Voice Conversation
            </h2>
            <VoiceButton
              isListening={isListening}
              isSpeaking={isSpeaking}
              isSupported={isSupported}
              onStartListening={startListening}
              onStopListening={stopListening}
            />
            {transcript && (
              <div className="mt-4 p-3 sm:p-4 bg-mystic-jade-50 dark:bg-ice-blue-900/20 rounded-lg border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm animate-fade-in transition-all duration-400">
                <p className="text-xs sm:text-sm text-mystic-jade-700 dark:text-ice-blue-300 transition-colors duration-400">
                  <strong>You said:</strong> {transcript}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-red-50/80 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg backdrop-blur-sm animate-fade-in transition-all duration-400">
          <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 transition-colors duration-400">
            <strong>In Crisis?</strong> If you're in immediate danger, please call 112. 
            For mental health support, call 1800-599-0019 (National Mental Health Helpline) available 24/7.
          </p>
        </div>
      </div>
    </div>
  )
}