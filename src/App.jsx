import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext.jsx'
import HomePage from './pages/HomePage.jsx'
import GamePage from './pages/GamePage.jsx'
import AboutPage from './pages/AboutPage.jsx'

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <BrowserRouter basename="/cartoguessr/">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App