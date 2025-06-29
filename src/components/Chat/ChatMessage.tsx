import React from 'react'
import { User, Bot, Volume2 } from 'lucide-react'

interface ChatMessageProps {
  message: string
  response?: string
  isUser: boolean
  timestamp: string
  isVoice?: boolean
  onSpeak?: (text: string) => void
}

export function ChatMessage({
  message,
  response,
  isUser,
  timestamp,
  isVoice = false,
  onSpeak,
}: ChatMessageProps) {
  return (
    <div className="space-y-3 sm:space-y-4 animate-fade-in">
      {/* User Message */}
      <div className="flex items-start space-x-2 sm:space-x-3">
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full flex items-center justify-center shadow-lg animate-float">
          <User className="h-3 w-3 sm:h-4 sm:w-4 text-pale-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-mystic-jade-50 dark:bg-ice-blue-900/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm transition-all duration-400 hover:shadow-md transform hover:scale-105">
            <p className="text-sm sm:text-base text-mystic-jade-900 dark:text-ice-blue-100 transition-colors duration-400 break-words">{message}</p>
            <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
              <p className="text-xs text-mystic-jade-500 dark:text-ice-blue-400 transition-colors duration-400">{timestamp}</p>
              {isVoice && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-mystic-jade-100 dark:bg-ice-blue-800 text-mystic-jade-800 dark:text-ice-blue-200 transition-all duration-400 animate-pulse">
                  <Volume2 className="h-3 w-3 mr-1" />
                  Voice
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Response */}
      {response && (
        <div className="flex items-start space-x-2 sm:space-x-3 animate-slide-in">
          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-ice-blue-500 to-mystic-jade-500 dark:from-mystic-jade-400 dark:to-ice-blue-400 rounded-full flex items-center justify-center shadow-lg animate-float">
            <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-pale-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="bg-pale-white dark:bg-charcoal-black-700 border border-mystic-jade-200 dark:border-ice-blue-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-md backdrop-blur-sm transition-all duration-400 hover:shadow-lg transform hover:scale-105">
              <p className="text-sm sm:text-base text-mystic-jade-900 dark:text-ice-blue-100 transition-colors duration-400 break-words whitespace-pre-wrap">{response}</p>
              <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                <p className="text-xs text-mystic-jade-500 dark:text-ice-blue-400 transition-colors duration-400">AI Assistant</p>
                {onSpeak && (
                  <button
                    onClick={() => onSpeak(response)}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-ice-blue-100 dark:bg-mystic-jade-800 text-ice-blue-800 dark:text-mystic-jade-200 hover:bg-ice-blue-200 dark:hover:bg-mystic-jade-700 transition-all duration-300 transform hover:scale-105 animate-glow"
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">Speak</span>
                    <span className="sm:hidden">🔊</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}