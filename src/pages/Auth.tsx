import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Heart, Mail, Lock, User } from 'lucide-react'

export function Auth() {
  const { user, signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.fullName)
        if (error) throw error
        
        // Show success message for sign up
        setError('Check your email for a confirmation link!')
      } else {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
      }
    } catch (error: any) {
      // Provide more helpful error messages
      let errorMessage = error.message || 'An error occurred. Please try again.'
      
      if (error.message === 'Invalid login credentials') {
        errorMessage = 'Invalid email or password. Please double-check your credentials. If you just signed up, ensure you have confirmed your email address.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-white via-mystic-jade-50 to-ice-blue-50 dark:from-charcoal-black-950 dark:via-charcoal-black-900 dark:to-charcoal-black-800 flex items-center justify-center px-4 transition-all duration-600">
      <div className="max-w-md w-full animate-fade-in">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-full mb-3 sm:mb-4 shadow-2xl animate-float">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pale-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-mystic-jade-900 dark:text-ice-blue-100 mb-2 transition-colors duration-400">
            {isSignUp ? 'Join HopeFlow' : 'Welcome Back to HopeFlow'}
          </h1>
          <p className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-300 transition-colors duration-400 px-4">
            {isSignUp 
              ? 'Start your journey toward emotional wellness and support'
              : 'Continue your path to emotional wellness and healing'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-pale-white/90 dark:bg-charcoal-black-800/90 rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md border border-mystic-jade-200/50 dark:border-ice-blue-800/50 animate-scale-in transition-all duration-600">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Full Name (Sign Up Only) */}
            {isSignUp && (
              <div className="animate-slide-in">
                <label htmlFor="fullName" className="block text-sm font-medium text-mystic-jade-700 dark:text-ice-blue-300 mb-2 transition-colors duration-400">
                  Full Name (Optional)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-mystic-jade-400 dark:text-ice-blue-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 w-full border border-mystic-jade-300 dark:border-ice-blue-600 bg-pale-white dark:bg-charcoal-black-700 text-mystic-jade-900 dark:text-ice-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-mystic-jade-500 dark:focus:ring-ice-blue-500 focus:border-transparent transition-all duration-300 placeholder-mystic-jade-400 dark:placeholder-ice-blue-500 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="animate-slide-in">
              <label htmlFor="email" className="block text-sm font-medium text-mystic-jade-700 dark:text-ice-blue-300 mb-2 transition-colors duration-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-mystic-jade-400 dark:text-ice-blue-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 w-full border border-mystic-jade-300 dark:border-ice-blue-600 bg-pale-white dark:bg-charcoal-black-700 text-mystic-jade-900 dark:text-ice-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-mystic-jade-500 dark:focus:ring-ice-blue-500 focus:border-transparent transition-all duration-300 placeholder-mystic-jade-400 dark:placeholder-ice-blue-500 text-sm sm:text-base"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-slide-in">
              <label htmlFor="password" className="block text-sm font-medium text-mystic-jade-700 dark:text-ice-blue-300 mb-2 transition-colors duration-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-mystic-jade-400 dark:text-ice-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-8 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 w-full border border-mystic-jade-300 dark:border-ice-blue-600 bg-pale-white dark:bg-charcoal-black-700 text-mystic-jade-900 dark:text-ice-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-mystic-jade-500 dark:focus:ring-ice-blue-500 focus:border-transparent transition-all duration-300 placeholder-mystic-jade-400 dark:placeholder-ice-blue-500 text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mystic-jade-400 dark:text-ice-blue-400 hover:text-mystic-jade-600 dark:hover:text-ice-blue-300 transition-all duration-300 transform hover:scale-105"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`p-3 rounded-lg text-sm transition-all duration-400 animate-fade-in ${
                error.includes('Check your email') 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 text-pale-white font-semibold rounded-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 animate-glow text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-pale-white border-t-transparent rounded-full mr-2"></div>
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isSignUp ? 'Join HopeFlow' : 'Sign In'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-4 sm:mt-6 text-center animate-fade-in">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
                setFormData({ email: '', password: '', fullName: '' })
              }}
              className="text-sm sm:text-base text-mystic-jade-600 dark:text-ice-blue-400 hover:text-mystic-jade-700 dark:hover:text-ice-blue-300 font-medium transition-all duration-300 transform hover:scale-105"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Join HopeFlow"}
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-mystic-jade-500 dark:text-ice-blue-400 animate-fade-in transition-colors duration-400 px-4">
          <p>
            Your privacy and emotional safety are our top priorities. All conversations are encrypted and confidential.
          </p>
        </div>
      </div>
    </div>
  )
}