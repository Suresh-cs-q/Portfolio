import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import NavHeader from './components/blocks/nav-header'
import './index.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Apply dark mode and initialize app
  useEffect(() => {
    try {
      document.documentElement.classList.add('dark')
      setIsLoading(false)
    } catch (error) {
      console.error('Error initializing app:', error)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="bg-background">
        <Home />
      </main>
      <footer className="py-8 bg-card/80 backdrop-blur-sm border-t border-primary/10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-muted-foreground">© 2025 Suresh Kumar. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/in/sureshkumar-cs" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">LinkedIn</a>
              <a href="https://github.com/Suresh-cs-q" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">GitHub</a>
              <a href="https://leetcode.com/u/Sureshiba" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">LeetCode</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
