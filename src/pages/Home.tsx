import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Heart, Shield, Clock, Users, Phone } from 'lucide-react'

export function Home() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Voice AI Companion',
      description: 'Connect naturally with our empathetic AI trained in emotional support',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Find comfort and guidance whenever you need it, day or night',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your conversations are encrypted and completely confidential',
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Experience genuine empathy designed to help you through difficult moments',
    },
  ]

  const emergencyContacts = [
    {
      name: 'National Mental Health Helpline',
      number: '1800-599-0019',
      description: '24/7 mental health support',
      urgent: true,
    },
    {
      name: 'Vandrevala Foundation',
      number: '9999 666 555',
      description: 'Crisis counseling and support',
      urgent: false,
    },
    {
      name: 'Emergency Services',
      number: '112',
      description: 'Immediate emergency assistance',
      urgent: true,
    },
  ]

  // Load Omnidimension widget script
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.getElementById('omnidimension-web-widget')
    if (existingScript) return

    const script = document.createElement('script')
    script.id = 'omnidimension-web-widget'
    script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=a7fdc4427753208d4dc3e58edf5e90f3'
    script.async = true
    script.crossOrigin = 'anonymous'

    script.onload = () => {
      console.log('Omnidimension widget script loaded successfully')
      // Initialize widget after script loads
      if (window.OmnidimensionWidget) {
        try {
          window.OmnidimensionWidget.init({
            mode: 'embedded',
            secretKey: 'a7fdc4427753208d4dc3e58edf5e90f3',
            container: '#omnidimension-widget-container',
            theme: 'emotional-support',
            personality: 'compassionate-counselor',
            context: 'emotional-wellness-support',
            features: {
              voiceInput: true,
              voiceOutput: true,
              emotionalAnalysis: true,
              supportDetection: true
            },
            onReady: () => {
              console.log('Omnidimension widget ready')
            },
            onError: (err) => {
              console.error('Widget error:', err)
            }
          })
        } catch (error) {
          console.error('Error initializing Omnidimension widget:', error)
        }
      }
    }

    script.onerror = (event) => {
      console.error('Failed to load Omnidimension widget script:', event)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.getElementById('omnidimension-web-widget')
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 transition-all duration-600">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full mb-4 sm:mb-6 shadow-2xl animate-float">
              <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-pale-white animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 sm:mb-6 animate-scale-in px-4">
              Find Your{' '}
              <span className="bg-gradient-to-r from-mystic-jade-600 to-ice-blue-600 dark:from-ice-blue-400 dark:to-mystic-jade-400 bg-clip-text text-transparent animate-shimmer">
                Hope
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-mystic-jade-700 dark:text-ice-blue-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in transition-colors duration-400 px-4">
              Connect with HopeFlow, your compassionate AI companion. Available 24/7 to listen, 
              understand, and guide you through life's challenges with empathy and care.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-in px-4">
            <Link
              to="/talk"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 text-pale-white font-semibold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow text-sm sm:text-base"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Start Your Journey
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-pale-white/80 dark:bg-charcoal-black-800/80 text-mystic-jade-700 dark:text-ice-blue-300 font-semibold rounded-xl border border-mystic-jade-200 dark:border-ice-blue-700 hover:bg-mystic-jade-50 dark:hover:bg-charcoal-black-700 hover:shadow-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Omnidimension Widget Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-pale-white shadow-2xl backdrop-blur-sm transition-all duration-600 hover:shadow-3xl transform hover:scale-105 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Try Our Enhanced AI Assistant
              </h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
                Experience advanced emotional support with our cutting-edge AI technology designed specifically for mental wellness.
              </p>
            </div>
            
            {/* Widget Container */}
            <div 
              id="omnidimension-widget-container" 
              className="bg-pale-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 min-h-[300px] flex items-center justify-center border border-pale-white/20"
            >
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-pale-white border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-pale-white/80 text-sm">Loading enhanced AI assistant...</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm opacity-80 mb-4">
                Or access our full chat interface for a complete experience
              </p>
              <Link
                to="/talk"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-pale-white text-mystic-jade-600 dark:text-ice-blue-600 font-semibold rounded-xl hover:bg-mystic-jade-50 dark:hover:bg-ice-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-glow text-sm sm:text-base"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Access Full Chat Interface
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-pale-white/80 dark:bg-charcoal-black-900/80 backdrop-blur-sm transition-all duration-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4">
              How HopeFlow Supports You
            </h2>
            <p className="text-base sm:text-lg text-mystic-jade-700 dark:text-ice-blue-300 max-w-2xl mx-auto transition-colors duration-400 px-4">
              Our AI companion combines advanced technology with genuine empathy 
              to provide the emotional support you deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-800 dark:to-charcoal-black-700 border border-mystic-jade-200/50 dark:border-ice-blue-800/50 hover:shadow-xl transition-all duration-400 transform hover:scale-105 animate-fade-in backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-lg mb-3 sm:mb-4 shadow-lg animate-float">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-pale-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">
                    {feature.title}
                  </h3>
                  <p className="text-mystic-jade-600 dark:text-ice-blue-400 text-sm leading-relaxed transition-colors duration-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 transition-all duration-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4 animate-float">
              <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4">
              In Crisis? Get Immediate Help
            </h2>
            <p className="text-base sm:text-lg text-mystic-jade-700 dark:text-ice-blue-300 transition-colors duration-400 px-4">
              If you're in immediate danger or having thoughts of self-harm, 
              please reach out to these resources right away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className={`p-4 sm:p-6 rounded-lg border-l-4 transition-all duration-400 hover:shadow-xl transform hover:scale-105 animate-fade-in backdrop-blur-sm ${
                  contact.urgent
                    ? 'bg-red-50/80 dark:bg-red-900/20 border-red-500 hover:bg-red-100 dark:hover:bg-red-900/30'
                    : 'bg-orange-50/80 dark:bg-orange-900/20 border-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className={`font-semibold mb-2 transition-colors duration-400 text-sm sm:text-base ${
                  contact.urgent ? 'text-red-900 dark:text-red-300' : 'text-orange-900 dark:text-orange-300'
                }`}>
                  {contact.name}
                </h3>
                <p className={`text-xl sm:text-2xl font-bold mb-1 transition-colors duration-400 ${
                  contact.urgent ? 'text-red-700 dark:text-red-400' : 'text-orange-700 dark:text-orange-400'
                }`}>
                  {contact.number}
                </p>
                <p className={`text-xs sm:text-sm transition-colors duration-400 ${
                  contact.urgent ? 'text-red-600 dark:text-red-500' : 'text-orange-600 dark:text-orange-500'
                }`}>
                  {contact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-pale-white shadow-2xl backdrop-blur-sm transition-all duration-600 hover:shadow-3xl transform hover:scale-105">
            <Users className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 animate-float" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
              Take the first step toward healing. HopeFlow is here to listen and support you.
            </p>
            <Link
              to="/talk"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-pale-white text-mystic-jade-600 dark:text-ice-blue-600 font-semibold rounded-xl hover:bg-mystic-jade-50 dark:hover:bg-ice-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-glow text-sm sm:text-base"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Start Your Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    OmnidimensionWidget?: {
      init: (config: any) => void
      sendMessage: (message: string) => Promise<string>
      destroy: () => void
      isReady?: () => boolean
    }
  }
}