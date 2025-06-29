import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-pale-white/80 dark:bg-charcoal-black-800/80 hover:bg-mystic-jade-50 dark:hover:bg-charcoal-black-700 backdrop-blur-sm border border-mystic-jade-200/50 dark:border-ice-blue-800/50 transition-all duration-400 group shadow-lg hover:shadow-xl transform hover:scale-105"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <Sun 
          className={`absolute inset-0 h-5 w-5 text-mystic-jade-600 transition-all duration-400 transform ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        {/* Moon icon */}
        <Moon 
          className={`absolute inset-0 h-5 w-5 text-ice-blue-400 transition-all duration-400 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      
      {/* Animated glow effect */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-400 ${
        isDark 
          ? 'bg-ice-blue-400/10 opacity-0 group-hover:opacity-100 animate-glow' 
          : 'bg-mystic-jade-400/10 opacity-0 group-hover:opacity-100 animate-glow'
      }`} />
    </button>
  )
}