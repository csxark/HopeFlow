import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { ThemeToggle } from '../UI/ThemeToggle'

interface HeaderProps {
  isSidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Header({ isSidebarOpen, setSidebarOpen }: HeaderProps) {
  const location = useLocation()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Talk', href: '/talk' },
    { name: 'Features', href: '/features' },
    { name: 'About', href: '/about' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-pale-white/90 dark:bg-charcoal-black-900/90 backdrop-blur-md border-b border-mystic-jade-200/50 dark:border-ice-blue-800/50 sticky top-0 z-50 transition-all duration-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-lg sm:rounded-xl group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl animate-float">
              <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-pale-white" />
            </div>
            <div className="animate-fade-in">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-mystic-jade-600 to-ice-blue-600 dark:from-ice-blue-400 dark:to-mystic-jade-400 bg-clip-text text-transparent">
                HopeFlow
              </h1>
              <p className="text-xs text-mystic-jade-600 dark:text-ice-blue-400 hidden sm:block transition-colors duration-300">Your compassionate companion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-mystic-jade-100 to-ice-blue-100 dark:from-ice-blue-900/30 dark:to-mystic-jade-900/30 text-mystic-jade-700 dark:text-ice-blue-300 shadow-md border border-mystic-jade-200/50 dark:border-ice-blue-700/50'
                    : 'text-mystic-jade-700 dark:text-ice-blue-300 hover:text-mystic-jade-600 dark:hover:text-ice-blue-400 hover:bg-mystic-jade-50 dark:hover:bg-charcoal-black-800/50 hover:shadow-md'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3 animate-fade-in">
                <Link
                  to="/history"
                  className="hidden sm:block text-sm text-mystic-jade-700 dark:text-ice-blue-300 hover:text-mystic-jade-600 dark:hover:text-ice-blue-400 transition-all duration-300 font-medium hover:scale-105 transform"
                >
                  History
                </Link>
                <div className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-mystic-jade-50 dark:bg-charcoal-black-800 rounded-lg border border-mystic-jade-200/50 dark:border-ice-blue-800/50 transition-all duration-300 hover:shadow-md">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full flex items-center justify-center shadow-lg animate-float">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-pale-white" />
                  </div>
                  <span className="hidden sm:inline text-sm text-mystic-jade-700 dark:text-ice-blue-300 font-medium max-w-[100px] lg:max-w-[150px] truncate">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 sm:p-2 text-mystic-jade-500 dark:text-ice-blue-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transform hover:scale-105"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3 animate-fade-in">
                <Link
                  to="/auth"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-mystic-jade-600 dark:text-ice-blue-400 hover:text-mystic-jade-700 dark:hover:text-ice-blue-300 transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 text-pale-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-glow"
                >
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Join</span>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-mystic-jade-500 dark:text-ice-blue-400 hover:text-mystic-jade-700 dark:hover:text-ice-blue-300 transition-all duration-300 rounded-lg hover:bg-mystic-jade-50 dark:hover:bg-charcoal-black-800 transform hover:scale-105"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 animate-scale-in" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 animate-scale-in" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}