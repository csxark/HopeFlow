import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Shield, FileText, Users, MessageCircle } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'About', href: '/about' },
      { name: 'Talk to HopeFlow', href: '/talk' },
      { name: 'Chat History', href: '/history' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Crisis Resources', href: '#crisis-resources' },
      { name: 'Community Guidelines', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Accessibility', href: '#' },
    ],
    company: [
      { name: 'Our Mission', href: '/about' },
      { name: 'Team', href: '/about#team' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
    ]
  }

  const emergencyContacts = [
    { name: 'Mental Health Helpline', number: '1800-599-0019', description: '24/7 mental health support' },
    { name: 'Emergency', number: '112', description: 'Immediate danger' },
    { name: 'Vandrevala Foundation', number: '9999 666 555', description: 'Crisis counseling' },
  ]

  return (
    <footer className="bg-pale-white/95 dark:bg-charcoal-black-900/95 border-t border-mystic-jade-200/50 dark:border-ice-blue-800/50 backdrop-blur-md transition-all duration-600">
      {/* Emergency Resources Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-b border-red-200/50 dark:border-red-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-2 flex items-center justify-center">
              <Phone className="h-4 w-4 mr-2" />
              Crisis Support Available 24/7
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <span className="font-medium text-red-800 dark:text-red-400">{contact.name}:</span>
                  <span className="text-red-700 dark:text-red-300">{contact.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-mystic-jade-500 to-ice-blue-500 dark:from-ice-blue-400 dark:to-mystic-jade-400 rounded-xl shadow-lg animate-float">
                <Heart className="h-6 w-6 text-pale-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-mystic-jade-600 to-ice-blue-600 dark:from-ice-blue-400 dark:to-mystic-jade-400 bg-clip-text text-transparent">
                  HopeFlow
                </h3>
                <p className="text-xs text-mystic-jade-600 dark:text-ice-blue-400">Your compassionate companion</p>
              </div>
            </Link>
            <p className="text-sm text-mystic-jade-600 dark:text-ice-blue-300 mb-4 leading-relaxed">
              HopeFlow provides 24/7 emotional support through compassionate AI technology. 
              Find hope, healing, and guidance whenever you need someone to listen.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:support@hopeflow.ai"
                className="p-2 bg-mystic-jade-100 dark:bg-ice-blue-900/30 rounded-lg hover:bg-mystic-jade-200 dark:hover:bg-ice-blue-800/50 transition-all duration-300 transform hover:scale-105"
                title="Email Support"
              >
                <Mail className="h-4 w-4 text-mystic-jade-600 dark:text-ice-blue-400" />
              </a>
              <a
                href="tel:+91-800-HOPEFLOW"
                className="p-2 bg-mystic-jade-100 dark:bg-ice-blue-900/30 rounded-lg hover:bg-mystic-jade-200 dark:hover:bg-ice-blue-800/50 transition-all duration-300 transform hover:scale-105"
                title="Call Support"
              >
                <Phone className="h-4 w-4 text-mystic-jade-600 dark:text-ice-blue-400" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-mystic-jade-600 dark:text-ice-blue-300 hover:text-mystic-jade-700 dark:hover:text-ice-blue-200 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-mystic-jade-600 dark:text-ice-blue-300 hover:text-mystic-jade-700 dark:hover:text-ice-blue-200 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-mystic-jade-600 dark:text-ice-blue-300 hover:text-mystic-jade-700 dark:hover:text-ice-blue-200 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-mystic-jade-900 dark:text-ice-blue-100 mb-4 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-mystic-jade-600 dark:text-ice-blue-300 hover:text-mystic-jade-700 dark:hover:text-ice-blue-200 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-mystic-jade-200/50 dark:border-ice-blue-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-mystic-jade-500 dark:text-ice-blue-400">
              <p>&copy; {currentYear} HopeFlow. All rights reserved.</p>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Mumbai, India</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-mystic-jade-500 dark:text-ice-blue-400">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>•</span>
              <span>Privacy Compliant</span>
              <span>•</span>
              <span>Secure & Encrypted</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-mystic-jade-50/50 dark:bg-ice-blue-900/20 rounded-lg border border-mystic-jade-200/50 dark:border-ice-blue-800/50">
          <p className="text-xs text-mystic-jade-600 dark:text-ice-blue-400 text-center leading-relaxed">
            <strong>Important:</strong> HopeFlow provides emotional support and is not a substitute for professional medical advice, 
            diagnosis, or treatment. If you're experiencing a mental health crisis or having thoughts of self-harm, 
            please contact emergency services (112) or the National Mental Health Helpline (1800-599-0019) immediately.
          </p>
        </div>
      </div>
    </footer>
  )
}