import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import GamePage from './pages/GamePage.jsx'
import AboutPage from './pages/AboutPage.jsx'

function App() {
  return (
    <div className="app-container">
      {/* The basename matches your vite.config.js base path */}
      <BrowserRouter basename="/cartoguessr/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App