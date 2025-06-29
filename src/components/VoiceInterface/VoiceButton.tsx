import React from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'

interface VoiceButtonProps {
  isListening: boolean
  isSpeaking: boolean
  isSupported: boolean
  onStartListening: () => void
  onStopListening: () => void
}

export function VoiceButton({
  isListening,
  isSpeaking,
  isSupported,
  onStartListening,
  onStopListening,
}: VoiceButtonProps) {
  if (!isSupported) {
    return (
      <div className="flex flex-col items-center space-y-2 animate-fade-in">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-mystic-jade-200 dark:bg-charcoal-black-700 rounded-full flex items-center justify-center transition-all duration-400">
          <MicOff className="h-6 w-6 sm:h-8 sm:w-8 text-mystic-jade-400 dark:text-ice-blue-500" />
        </div>
        <p className="text-xs sm:text-sm text-mystic-jade-500 dark:text-ice-blue-400 text-center transition-colors duration-400 px-4">
          Voice not supported in this browser
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4 animate-scale-in">
      <button
        onClick={isListening ? onStopListening : onStartListening}
        disabled={isSpeaking}
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-400 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-50 shadow-2xl ${
          isListening
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-pale-white shadow-red-500/50 focus:ring-red-300 animate-glow'
            : isSpeaking
            ? 'bg-gradient-to-r from-ice-blue-400 to-mystic-jade-400 text-pale-white shadow-ice-blue-500/50 focus:ring-ice-blue-300 animate-pulse'
            : 'bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 text-pale-white shadow-mystic-jade-500/50 hover:shadow-xl focus:ring-mystic-jade-300 animate-float'
        } ${isSpeaking ? 'animate-pulse' : ''}`}
      >
        {isSpeaking ? (
          <Volume2 className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" />
        ) : isListening ? (
          <div className="relative">
            <Mic className="h-6 w-6 sm:h-8 sm:w-8" />
            <div className="absolute inset-0 rounded-full border-2 border-pale-white animate-ping opacity-75" />
          </div>
        ) : (
          <Mic className="h-6 w-6 sm:h-8 sm:w-8" />
        )}
      </button>

      <div className="text-center space-y-1 animate-fade-in">
        <p className="text-sm sm:text-base font-medium text-mystic-jade-900 dark:text-ice-blue-100 transition-colors duration-400">
          {isSpeaking
            ? 'AI is speaking...'
            : isListening
            ? 'Listening...'
            : 'Tap to speak'}
        </p>
        <p className="text-xs sm:text-sm text-mystic-jade-500 dark:text-ice-blue-400 transition-colors duration-400 px-4 text-center">
          {isListening
            ? 'Tap again to stop'
            : 'Hold a conversation with our AI assistant'}
        </p>
      </div>

      {/* Visual indicator for listening */}
      {isListening && (
        <div className="flex space-x-1 animate-fade-in">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full animate-bounce transition-all duration-400"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}