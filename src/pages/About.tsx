import React from 'react'
import { Heart, Shield, Users, Award, CheckCircle, Phone } from 'lucide-react'

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Empathy First',
      description: 'Every interaction is guided by genuine compassion, understanding, and care for your emotional wellbeing.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your conversations are completely confidential and protected by industry-leading security measures.'
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Emotional support should be available to everyone, regardless of location, time, or circumstances.'
    },
    {
      icon: Award,
      title: 'Quality Care',
      description: 'Our AI is trained using evidence-based emotional support and therapeutic communication techniques.'
    }
  ]

  const features = [
    'Emotional intelligence and empathetic responses',
    'Active listening and validation techniques',
    'Personalized support and guidance',
    'Multi-modal communication (voice and text)',
    'Cultural sensitivity and inclusivity',
    '24/7 availability without wait times'
  ]

  const team = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Clinical Director',
      description: 'Licensed psychologist with 15+ years in emotional wellness and therapeutic support'
    },
    {
      name: 'Arjun Patel',
      role: 'AI Ethics Lead',
      description: 'Ensuring responsible AI development for mental health and emotional support applications'
    },
    {
      name: 'Dr. Kavya Reddy',
      role: 'Wellness Advisor',
      description: 'Psychiatrist specializing in emotional resilience and therapeutic communication'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 transition-all duration-600">
      {/* Hero */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full mb-4 sm:mb-6 shadow-2xl animate-float">
            <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-pale-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 sm:mb-6 transition-colors duration-400 px-4">
            About{' '}
            <span className="bg-gradient-to-r from-mystic-jade-600 to-ice-blue-600 dark:from-ice-blue-400 dark:to-mystic-jade-400 bg-clip-text text-transparent">
              HopeFlow
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-mystic-jade-600 dark:text-ice-blue-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-400 px-4">
            We believe that everyone deserves access to compassionate emotional support. 
            HopeFlow is your AI companion that provides a safe space to be heard, understood, and guided toward hope.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-pale-white/80 dark:bg-charcoal-black-900/80 backdrop-blur-sm transition-all duration-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 sm:mb-6 transition-colors duration-400">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg text-mystic-jade-600 dark:text-ice-blue-300 mb-4 sm:mb-6 leading-relaxed transition-colors duration-400">
                Life's challenges don't wait for convenient moments. When you're struggling with difficult emotions, 
                stress, or life transitions, you need immediate, compassionate support. HopeFlow provides that 
                critical emotional companion, offering a safe space to express yourself and find guidance.
              </p>
              <p className="text-base sm:text-lg text-mystic-jade-600 dark:text-ice-blue-300 leading-relaxed transition-colors duration-400">
                We're not here to replace human connection or professional therapy. Instead, 
                we serve as your emotional companion - providing immediate support, helping you process feelings, 
                and connecting you with appropriate resources when needed.
              </p>
            </div>
            <div className="bg-gradient-to-br from-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-800 dark:to-charcoal-black-700 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm animate-scale-in transition-all duration-600 hover:shadow-xl transform hover:scale-105">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-mystic-jade-600 dark:text-ice-blue-400 mb-2 animate-pulse transition-colors duration-400">24/7</div>
                <p className="text-sm sm:text-base text-mystic-jade-700 dark:text-ice-blue-300 mb-3 sm:mb-4 transition-colors duration-400">Always Available</p>
                <div className="text-3xl sm:text-4xl font-bold text-ice-blue-600 dark:text-mystic-jade-400 mb-2 animate-pulse transition-colors duration-400">100%</div>
                <p className="text-sm sm:text-base text-mystic-jade-700 dark:text-ice-blue-300 mb-3 sm:mb-4 transition-colors duration-400">Confidential</p>
                <div className="text-3xl sm:text-4xl font-bold text-mystic-jade-600 dark:text-ice-blue-400 mb-2 animate-pulse transition-colors duration-400">∞</div>
                <p className="text-sm sm:text-base text-mystic-jade-700 dark:text-ice-blue-300 transition-colors duration-400">Patience & Understanding</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 transition-colors duration-400">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg text-mystic-jade-600 dark:text-ice-blue-300 max-w-2xl mx-auto transition-colors duration-400 px-4">
              These principles guide everything we do, from AI development to user experience design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-xl p-6 sm:p-8 shadow-xl border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm transition-all duration-400 hover:shadow-2xl transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-lg flex items-center justify-center shadow-lg animate-float">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-pale-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 leading-relaxed transition-colors duration-400">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-pale-white/80 dark:bg-charcoal-black-900/80 backdrop-blur-sm transition-all duration-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-3 sm:space-y-4 animate-slide-in">
              <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 sm:mb-6 transition-colors duration-400">
                How HopeFlow Provides Support
              </h2>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-mystic-jade-500 dark:text-ice-blue-400 flex-shrink-0 transition-colors duration-400" />
                  <span className="text-sm sm:text-base text-mystic-jade-700 dark:text-ice-blue-300 transition-colors duration-400">{feature}</span>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-800 dark:to-charcoal-black-700 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm animate-scale-in transition-all duration-600 hover:shadow-xl transform hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-3 sm:mb-4 transition-colors duration-400">
                Evidence-Based Approach
              </h3>
              <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 mb-3 sm:mb-4 transition-colors duration-400">
                Our AI responses are based on established therapeutic communication techniques including:
              </p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400">
                <li>• Active listening and emotional validation</li>
                <li>• Empathetic response patterns</li>
                <li>• Cognitive behavioral support techniques</li>
                <li>• Mindfulness and grounding strategies</li>
                <li>• Positive psychology principles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 transition-colors duration-400">
              Expert Team
            </h2>
            <p className="text-base sm:text-lg text-mystic-jade-600 dark:text-ice-blue-300 max-w-2xl mx-auto transition-colors duration-400 px-4">
              Our development is guided by mental health professionals, AI ethicists, 
              and emotional wellness specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-xl p-4 sm:p-6 shadow-xl text-center border border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-sm transition-all duration-400 hover:shadow-2xl transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg animate-float">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-pale-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-1 transition-colors duration-400">
                  {member.name}
                </h3>
                <p className="text-mystic-jade-600 dark:text-ice-blue-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3 transition-colors duration-400">
                  {member.role}
                </p>
                <p className="text-mystic-jade-600 dark:text-ice-blue-300 text-xs sm:text-sm transition-colors duration-400">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 transition-all duration-600">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4 sm:mb-6 animate-float">
            <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 transition-colors duration-400">
            When You Need Immediate Help
          </h2>
          <p className="text-base sm:text-lg text-mystic-jade-600 dark:text-ice-blue-300 mb-6 sm:mb-8 transition-colors duration-400 px-4">
            While HopeFlow provides emotional support, please reach out to professional 
            services if you're in crisis or immediate danger.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="bg-red-100/80 dark:bg-red-900/30 p-3 sm:p-4 rounded-lg border-l-4 border-red-500 backdrop-blur-sm transition-all duration-400 hover:shadow-lg transform hover:scale-105 animate-scale-in">
              <h3 className="font-semibold text-red-900 dark:text-red-300 mb-1 transition-colors duration-400 text-sm sm:text-base">Mental Health Helpline</h3>
              <p className="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-400 mb-1 transition-colors duration-400">1800-599-0019</p>
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-500 transition-colors duration-400">Available 24/7</p>
            </div>
            <div className="bg-orange-100/80 dark:bg-orange-900/30 p-3 sm:p-4 rounded-lg border-l-4 border-orange-500 backdrop-blur-sm transition-all duration-400 hover:shadow-lg transform hover:scale-105 animate-scale-in">
              <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-1 transition-colors duration-400 text-sm sm:text-base">Emergency</h3>
              <p className="text-xl sm:text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1 transition-colors duration-400">112</p>
              <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-500 transition-colors duration-400">Immediate danger</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}