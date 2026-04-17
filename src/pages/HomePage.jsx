import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { getDayNumber } from '../utils/gameLogic.js'

export default function HomePage() {
  const navigate = useNavigate()
  const dayNum = getDayNumber()

  return (
    <div className="app-shell">
      <Header />
      <main className="home-page">
        <p className="home-eyebrow">Historical map game</p>

        <h1 className="home-title">
          Carto<em>guessr</em>
        </h1>

        <p className="home-subtitle">
          Five maps. Five years. Identify when each historical boundary configuration
          existed — the closer your guess, the more points you score.
        </p>

        <div className="home-actions">
          <button
            className="btn-primary"
            onClick={() => navigate('/game?mode=daily')}
          >
            <span>Play Daily #{dayNum}</span>
            <span className="btn-arrow">→</span>
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate('/game?mode=practice')}
          >
            <span>Practice Mode</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>

        <p className="home-footnote">
          Map data from the{' '}
          <a href="https://icr.ethz.ch/data/cshapes/" target="_blank" rel="noopener noreferrer">
            CShapes 2.0 dataset
          </a>
          {' '}(Schvitz et al., 2022).
          <br />
          Daily challenge resets at midnight UTC. Scores are not submitted to any server.
        </p>
      </main>
    </div>
  )
}
