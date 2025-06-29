import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { Header } from './components/Layout/Header'
import { Sidebar } from './components/Layout/Sidebar'
import { Footer } from './components/Layout/Footer'
import { Home } from './pages/Home'
import { Talk } from './pages/Talk'
import { Features } from './pages/Features'
import { About } from './pages/About'
import { History } from './pages/History'
import { Auth } from './pages/Auth'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
          <Header 
            isSidebarOpen={isSidebarOpen} 
            setSidebarOpen={setIsSidebarOpen} 
          />
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/talk" element={<Talk />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App