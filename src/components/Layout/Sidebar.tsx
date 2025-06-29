import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Home, MessageCircle, Star, Info, History, Phone } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Talk Now', href: '/talk', icon: MessageCircle },
    { name: 'Features', href: '/features', icon: Star },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Chat History', href: '/history', icon: History },
  ]

  const isActive = (path: string) => location.pathname === path

  const emergencyContacts = [
    { name: 'Emergency', number: '911', urgent: true },
    { name: 'Crisis Lifeline', number: '988', urgent: false },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', urgent: false },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal-black-900/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-400"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-pale-white/95 dark:bg-charcoal-black-900/95 backdrop-blur-md shadow-2xl z-50 transform transition-all duration-400 ease-in-out border-r border-mystic-jade-200/50 dark:border-ice-blue-800/50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-mystic-jade-200/50 dark:border-ice-blue-800/50 animate-fade-in">
            <h2 className="text-lg font-semibold text-mystic-jade-900 dark:text-ice-blue-100">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-mystic-jade-500 dark:text-ice-blue-400 hover:text-mystic-jade-700 dark:hover:text-ice-blue-300 transition-all duration-300 rounded-lg hover:bg-mystic-jade-50 dark:hover:bg-charcoal-black-800 transform hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-mystic-jade-100 to-ice-blue-100 dark:from-ice-blue-900/30 dark:to-mystic-jade-900/30 text-mystic-jade-700 dark:text-ice-blue-300 shadow-md border border-mystic-jade-200/50 dark:border-ice-blue-700/50'
                      : 'text-mystic-jade-700 dark:text-ice-blue-300 hover:text-mystic-jade-600 dark:hover:text-ice-blue-400 hover:bg-mystic-jade-50 dark:hover:bg-charcoal-black-800/50 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Emergency Contacts */}
          <div className="p-3 sm:p-4 border-t border-mystic-jade-200/50 dark:border-ice-blue-800/50 animate-fade-in">
            <h3 className="text-sm font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-3">Emergency Contacts</h3>
            <div className="space-y-2">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={contact.name}
                  className={`p-2.5 sm:p-3 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-105 animate-fade-in ${
                    contact.urgent 
                      ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 hover:bg-red-100 dark:hover:bg-red-900/30' 
                      : 'bg-mystic-jade-50 dark:bg-charcoal-black-800 border border-mystic-jade-200/50 dark:border-ice-blue-800/50 hover:bg-mystic-jade-100 dark:hover:bg-charcoal-black-700'
                  }`}
                  style={{ animationDelay: `${(index + navigation.length) * 0.1}s` }}
                >
                  <div className="flex items-center space-x-2">
                    <Phone className={`h-4 w-4 ${
                      contact.urgent 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-mystic-jade-600 dark:text-ice-blue-400'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium truncate ${
                        contact.urgent 
                          ? 'text-red-900 dark:text-red-300' 
                          : 'text-mystic-jade-900 dark:text-ice-blue-300'
                      }`}>
                        {contact.name}
                      </p>
                      <p className={`text-xs truncate ${
                        contact.urgent 
                          ? 'text-red-700 dark:text-red-400' 
                          : 'text-mystic-jade-600 dark:text-ice-blue-400'
                      }`}>
                        {contact.number}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}