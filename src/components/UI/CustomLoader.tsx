import React from 'react'

interface CustomLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function CustomLoader({ size = 'md', text, className = '' }: CustomLoaderProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className={`flex flex-col items-center space-y-4 animate-fade-in ${className}`}>
      {/* Animated heart loader */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer pulse rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-mystic-jade-400/30 to-ice-blue-400/30 dark:from-ice-blue-400/30 dark:to-mystic-jade-400/30 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-mystic-jade-500/20 to-ice-blue-500/20 dark:from-ice-blue-500/20 dark:to-mystic-jade-500/20 animate-ping animation-delay-75" />
        
        {/* Main heart shape */}
        <div className="relative w-full h-full flex items-center justify-center animate-float">
          <div className="relative">
            {/* Heart shape using CSS */}
            <div className="w-4 h-4 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 to-mystic-jade-400 rounded-full animate-pulse" 
                 style={{
                   transform: 'rotate(-45deg)',
                   position: 'relative'
                 }}>
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${dotSizes[size]} bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full animate-bounce`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      {text && (
        <p className="text-sm text-mystic-jade-700 dark:text-ice-blue-300 animate-pulse font-medium">
          {text}
        </p>
      )}
    </div>
  )
}

// Specialized loaders for different contexts
export function ChatLoader() {
  return (
    <div className="flex items-center space-x-3 p-4 animate-slide-in">
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full flex items-center justify-center animate-float">
        <div className="w-4 h-4 bg-pale-white dark:bg-charcoal-black-900 rounded-full animate-pulse" />
      </div>
      <div className="bg-mystic-jade-50 dark:bg-charcoal-black-800 rounded-lg px-4 py-3 border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <CustomLoader size="sm" />
          <span className="text-mystic-jade-700 dark:text-ice-blue-300 text-sm font-medium">AI is thinking...</span>
        </div>
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 flex items-center justify-center transition-all duration-600">
      <div className="text-center animate-scale-in">
        <CustomLoader size="lg" text="Loading..." />
        <div className="mt-6 w-32 h-1 bg-mystic-jade-200 dark:bg-ice-blue-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}