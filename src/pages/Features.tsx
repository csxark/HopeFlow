import React from 'react'
import { MessageCircle, Shield, Clock, Heart, Brain, Users, Mic, Globe } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Voice & Text Support',
      description: 'Communicate in whatever way feels most comfortable - through voice or text conversations.',
      benefits: ['Natural conversation flow', 'Speech-to-text technology', 'Flexible communication options']
    },
    {
      icon: Brain,
      title: 'AI-Powered Empathy',
      description: 'Our AI is trained in emotional intelligence and therapeutic communication techniques.',
      benefits: ['Empathetic responses', 'Emotional validation', 'Personalized support']
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Get immediate emotional support whenever you need it, day or night, without appointments.',
      benefits: ['Always accessible', 'No waiting times', 'Instant response']
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'Your conversations are encrypted and confidential. We prioritize your privacy and security.',
      benefits: ['End-to-end encryption', 'Anonymous support', 'HIPAA compliant']
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Experience non-judgmental, empathetic support designed to help you through difficult moments.',
      benefits: ['Non-judgmental listening', 'Emotional validation', 'Caring responses']
    },
    {
      icon: Users,
      title: 'Wellness Resources',
      description: 'Get connected to mental health resources and support communities when needed.',
      benefits: ['Resource database', 'Professional referrals', 'Support group connections']
    }
  ]

  const techFeatures = [
    {
      icon: Mic,
      title: 'Voice Recognition',
      description: 'Advanced speech recognition technology understands you clearly.'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Support available in multiple languages for diverse communities.'
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Military-grade encryption protects all your personal information.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 transition-all duration-600">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 sm:mb-6 transition-colors duration-400 px-4">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-mystic-jade-600 to-ice-blue-600 dark:from-ice-blue-400 dark:to-mystic-jade-400 bg-clip-text text-transparent">
              Emotional Support
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-mystic-jade-600 dark:text-ice-blue-300 max-w-2xl mx-auto transition-colors duration-400 px-4">
            HopeFlow combines cutting-edge AI technology with genuine empathy 
            to provide the emotional support you deserve, when you need it most.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-400 border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-lg flex items-center justify-center shadow-lg animate-float">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-pale-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 mb-3 sm:mb-4 transition-colors duration-400">
                        {feature.description}
                      </p>
                      <ul className="space-y-1 sm:space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-xs sm:text-sm text-mystic-jade-700 dark:text-ice-blue-300 transition-colors duration-400">
                            <div className="w-2 h-2 bg-ice-blue-500 dark:bg-mystic-jade-400 rounded-full mr-2 sm:mr-3 flex-shrink-0 animate-pulse" />
                            <span className="break-words">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-pale-white/80 dark:bg-charcoal-black-900/80 backdrop-blur-sm transition-all duration-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 transition-colors duration-400">
              Advanced Technology
            </h2>
            <p className="text-base sm:text-lg text-mystic-jade-600 dark:text-ice-blue-300 max-w-2xl mx-auto transition-colors duration-400 px-4">
              Built with the latest AI and security technologies to ensure reliable, 
              safe, and effective emotional support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {techFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-800 dark:to-charcoal-black-700 border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm transition-all duration-400 hover:shadow-xl transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-lg mb-3 sm:mb-4 shadow-lg animate-float">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-pale-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 transition-colors duration-400">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400 px-4">
              Getting emotional support is simple and immediate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-mystic-jade-100 dark:bg-ice-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg animate-float transition-all duration-400">
                <span className="text-xl sm:text-2xl font-bold text-mystic-jade-600 dark:text-ice-blue-400">1</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">
                Start Conversation
              </h3>
              <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400 px-2">
                Click "Talk" or use voice to begin speaking with HopeFlow
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-ice-blue-100 dark:bg-mystic-jade-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg animate-float transition-all duration-400">
                <span className="text-xl sm:text-2xl font-bold text-ice-blue-600 dark:text-mystic-jade-400">2</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">
                Share Your Feelings
              </h3>
              <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400 px-2">
                Express what you're experiencing in your own words or voice
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg animate-float transition-all duration-400">
                <span className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">3</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">
                Receive Support
              </h3>
              <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400 px-2">
                Get immediate, compassionate responses and helpful guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-pale-white shadow-2xl backdrop-blur-sm transition-all duration-600 hover:shadow-3xl transform hover:scale-105">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
              Start your conversation today and discover how HopeFlow can support you.
            </p>
            <a
              href="/talk"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-pale-white text-mystic-jade-600 dark:text-ice-blue-600 font-semibold rounded-xl hover:bg-mystic-jade-50 dark:hover:bg-ice-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-glow text-sm sm:text-base"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Try HopeFlow Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}