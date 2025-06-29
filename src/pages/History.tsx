import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { chatService, ChatMessage } from '../lib/supabase'
import { Search, Calendar, MessageCircle, Volume2, Trash2, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'

export function History() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'voice' | 'text'>('all')

  useEffect(() => {
    if (user) {
      loadChatHistory()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadChatHistory = async () => {
    try {
      const data = await chatService.getChatHistory()
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading chat history:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (messageId: string) => {
    try {
      await chatService.deleteMessage(messageId)
      setMessages(messages.filter(msg => msg.id !== messageId))
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchTerm === '' || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.response.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === 'all' || 
      (filterType === 'voice' && message.is_voice) ||
      (filterType === 'text' && !message.is_voice)
    
    return matchesSearch && matchesFilter
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 flex items-center justify-center transition-all duration-600 px-4">
        <div className="text-center animate-fade-in max-w-md">
          <MessageCircle className="h-12 w-12 sm:h-16 sm:w-16 text-mystic-jade-400 dark:text-ice-blue-400 mx-auto mb-4 animate-float" />
          <h1 className="text-xl sm:text-2xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">Sign In Required</h1>
          <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 mb-6 transition-colors duration-400">Please sign in to view your chat history.</p>
          <Link
            to="/auth"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 text-pale-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-glow text-sm sm:text-base"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 flex items-center justify-center transition-all duration-600">
        <div className="text-center animate-fade-in">
          <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-4 border-mystic-jade-500 dark:border-ice-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400">Loading your chat history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 transition-all duration-600">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">Chat History</h1>
          <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400 px-4">Review your previous conversations with the AI assistant</p>
        </div>

        {/* Filters */}
        <div className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-lg shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm border border-mystic-jade-200/50 dark:border-ice-blue-800/50 animate-scale-in transition-all duration-600">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-mystic-jade-400 dark:text-ice-blue-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 pr-4 py-2 w-full border border-mystic-jade-300 dark:border-ice-blue-600 bg-pale-white dark:bg-charcoal-black-700 text-mystic-jade-900 dark:text-ice-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-mystic-jade-500 dark:focus:ring-ice-blue-500 focus:border-transparent transition-all duration-300 placeholder-mystic-jade-400 dark:placeholder-ice-blue-500 text-sm sm:text-base"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-mystic-jade-500 dark:text-ice-blue-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'voice' | 'text')}
                className="border border-mystic-jade-300 dark:border-ice-blue-600 bg-pale-white dark:bg-charcoal-black-700 text-mystic-jade-900 dark:text-ice-blue-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mystic-jade-500 dark:focus:ring-ice-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              >
                <option value="all">All Messages</option>
                <option value="voice">Voice Messages</option>
                <option value="text">Text Messages</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages */}
        {filteredMessages.length === 0 ? (
          <div className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-lg shadow-xl p-8 sm:p-12 text-center backdrop-blur-sm border border-mystic-jade-200/50 dark:border-ice-blue-800/50 animate-fade-in transition-all duration-600">
            <MessageCircle className="h-12 w-12 sm:h-16 sm:w-16 text-mystic-jade-400 dark:text-ice-blue-400 mx-auto mb-4 animate-float" />
            <h2 className="text-lg sm:text-xl font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">No conversations found</h2>
            <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 mb-4 sm:mb-6 transition-colors duration-400 px-4">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter settings.'
                : 'Start your first conversation with our AI assistant.'}
            </p>
            <Link
              to="/talk"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 text-pale-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-glow text-sm sm:text-base"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Start Conversation
            </Link>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredMessages.map((message, index) => (
              <div key={message.id} className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-lg shadow-xl p-4 sm:p-6 backdrop-blur-sm border border-mystic-jade-200/50 dark:border-ice-blue-800/50 transition-all duration-600 hover:shadow-2xl transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-mystic-jade-500 dark:text-ice-blue-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-mystic-jade-500 dark:text-ice-blue-400 transition-colors duration-400 truncate">
                      {new Date(message.created_at).toLocaleDateString()} at{' '}
                      {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                    {message.is_voice && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-mystic-jade-100 dark:bg-ice-blue-800 text-mystic-jade-800 dark:text-ice-blue-200 transition-all duration-400 animate-pulse flex-shrink-0">
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Voice</span>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="text-mystic-jade-400 dark:text-ice-blue-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 transform hover:scale-105 flex-shrink-0 ml-2"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>

                {/* User Message */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full flex items-center justify-center shadow-lg animate-float">
                      <span className="text-pale-white text-xs font-semibold">You</span>
                    </div>
                    <div className="flex-1 bg-mystic-jade-50 dark:bg-ice-blue-900/30 rounded-lg p-2 sm:p-3 border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm transition-all duration-400 min-w-0">
                      <p className="text-sm sm:text-base text-mystic-jade-900 dark:text-ice-blue-100 transition-colors duration-400 break-words">{message.message}</p>
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-ice-blue-500 to-mystic-jade-500 dark:from-mystic-jade-400 dark:to-ice-blue-400 rounded-full flex items-center justify-center shadow-lg animate-float">
                    <span className="text-pale-white text-xs font-semibold">AI</span>
                  </div>
                  <div className="flex-1 bg-mystic-jade-50 dark:bg-charcoal-black-700 rounded-lg p-2 sm:p-3 border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm transition-all duration-400 min-w-0">
                    <p className="text-sm sm:text-base text-mystic-jade-900 dark:text-ice-blue-100 transition-colors duration-400 break-words whitespace-pre-wrap">{message.response}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button - Could be implemented for pagination */}
        {filteredMessages.length > 0 && (
          <div className="text-center mt-6 sm:mt-8 animate-fade-in">
            <p className="text-xs sm:text-sm text-mystic-jade-500 dark:text-ice-blue-400 transition-colors duration-400">
              Showing {filteredMessages.length} conversation{filteredMessages.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}