import React, { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import Header from '../components/Header.jsx'
import HistoricalMap from '../components/HistoricalMap.jsx'
import ResultsScreen from '../components/ResultsScreen.jsx'
import { MAP_CATALOG, YEAR_MIN, YEAR_MAX } from '../data/mapCatalog.js'
import {
  mulberry32,
  getDailySeed,
  getPracticeSeed,
  pickRounds,
  calculateScore,
  scoreToBlocks,
} from '../utils/gameLogic.js'

const ROUNDS_COUNT = 5
const SLIDER_DEFAULT = Math.round((YEAR_MIN + YEAR_MAX) / 2)

export default function GamePage() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') === 'daily' ? 'daily' : 'practice'
  const isDaily = mode === 'daily'

  // ── Build the 5 rounds (stable across re-renders for the same mode/seed) ──
  const rounds = useMemo(() => {
    const seed = isDaily ? getDailySeed() : getPracticeSeed()
    const prng = mulberry32(seed)
    return pickRounds(MAP_CATALOG, prng, ROUNDS_COUNT)
  }, [isDaily])

  // ── Game state ────────────────────────────────────────────────────────────
  const [currentRound, setCurrentRound] = useState(0) // 0-indexed
  const [guessYear, setGuessYear] = useState(SLIDER_DEFAULT)
  const [hasGuessed, setHasGuessed] = useState(false)
  const [results, setResults] = useState([]) // { guessYear, score }[]
  const [gameOver, setGameOver] = useState(false)

  const totalScore = results.reduce((sum, r) => sum + r.score, 0)
  const round = rounds[currentRound]

  // ── Submit guess ──────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (hasGuessed) return
    const score = calculateScore(round.year, guessYear)
    setResults(prev => [...prev, { guessYear, score }])
    setHasGuessed(true)
  }, [hasGuessed, round, guessYear])

  // ── Next round ────────────────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (currentRound + 1 >= ROUNDS_COUNT) {
      setGameOver(true)
    } else {
      setCurrentRound(prev => prev + 1)
      setGuessYear(SLIDER_DEFAULT)
      setHasGuessed(false)
    }
  }, [currentRound])

  // ── Keyboard: Enter to submit / advance ───────────────────────────────────
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Enter') {
        if (!hasGuessed) handleSubmit()
        else handleNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hasGuessed, handleSubmit, handleNext])

  // ── Clamp typed year input ────────────────────────────────────────────────
  function handleYearInput(e) {
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val)) setGuessYear(Math.max(YEAR_MIN, Math.min(YEAR_MAX, val)))
  }

  // ── Current result (after guess) ──────────────────────────────────────────
  const currentResult = hasGuessed ? results[results.length - 1] : null
  const diff = currentResult ? Math.abs(round.year - currentResult.guessYear) : null
  const diffSigned = currentResult ? currentResult.guessYear - round.year : null

  // ── Top-bar right side ────────────────────────────────────────────────────
  const topBarRight = (
    <div className="total-score-display">
      {totalScore.toLocaleString()} pts
    </div>
  )

  if (gameOver) {
    return (
      <div className="app-shell">
        <Header right={topBarRight} />
        <ResultsScreen
          rounds={rounds}
          results={results}
          totalScore={totalScore}
          isDaily={isDaily}
        />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Header right={topBarRight} />

      {/* ── Top progress bar ── */}
      <div className="game-top-bar">
        <div className="game-meta">
          <strong>{isDaily ? 'Daily Challenge' : 'Practice'}</strong>
          &nbsp;·&nbsp;Round {currentRound + 1} of {ROUNDS_COUNT}
        </div>

        <div className="rounds-track" aria-label="Round progress">
          {Array.from({ length: ROUNDS_COUNT }, (_, i) => (
            <div
              key={i}
              className={`round-pip ${i < currentRound ? 'done' : i === currentRound ? 'active' : ''}`}
              title={i < results.length ? `R${i+1}: ${results[i].score.toLocaleString()} pts` : `Round ${i+1}`}
            />
          ))}
        </div>

        <div style={{ width: 80 }} /> {/* spacer for alignment */}
      </div>

      {/* ── Main content: map + sidebar ── */}
      <div className="game-content">
        {/* MAP */}
        <HistoricalMap geojsonPath={round.geojsonPath} year={round.year} />

        {/* SIDEBAR */}
        <aside className="sidebar">

          {/* YEAR GUESS */}
          <div className="sidebar-section">
            <span className="sidebar-label">Your guess</span>
            <div className={`year-display ${hasGuessed ? 'guessed' : ''}`}>
              {guessYear}
            </div>
          </div>

          {!hasGuessed && (
            <>
              <div className="sidebar-section">
                <input
                  type="range"
                  className="year-slider"
                  min={YEAR_MIN}
                  max={YEAR_MAX}
                  step={1}
                  value={guessYear}
                  onChange={e => setGuessYear(Number(e.target.value))}
                  aria-label="Year guess slider"
                />
                <div className="year-range-labels">
                  <span>{YEAR_MIN}</span>
                  <span>{YEAR_MAX}</span>
                </div>
              </div>

              <div className="sidebar-section">
                <span className="sidebar-label">Or type a year</span>
                <div className="input-row">
                  <input
                    type="number"
                    className="year-input"
                    min={YEAR_MIN}
                    max={YEAR_MAX}
                    value={guessYear}
                    onChange={handleYearInput}
                    aria-label="Year guess input"
                  />
                </div>
              </div>

              <div className="sidebar-section">
                <button className="btn-submit" onClick={handleSubmit}>
                  Submit Guess
                </button>
                <p style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6 }}>
                  or press Enter
                </p>
              </div>
            </>
          )}

          {/* ROUND RESULT */}
          {hasGuessed && currentResult && (
            <div className="round-result">
              <div className="round-result-header">Round {currentRound + 1} result</div>
              <div className="round-result-score">
                {currentResult.score.toLocaleString()}
                <span style={{ fontSize: 14, opacity: 0.6, marginLeft: 6 }}>pts</span>
              </div>
              <div className="round-result-detail">
                Correct year: <strong>{round.year}</strong>
                <br />
                Your guess: <strong>{currentResult.guessYear}</strong>
                <br />
                Difference:{' '}
                <strong>
                  {diff === 0
                    ? 'exact!'
                    : diffSigned > 0
                      ? `+${diffSigned} years`
                      : `${diffSigned} years`}
                </strong>
              </div>
              <div className="score-blocks">
                {[...scoreToBlocks(currentResult.score)].map((emoji, i) => (
                  <span key={i} className="score-block">{emoji}</span>
                ))}
              </div>
              <button className="btn-next" onClick={handleNext}>
                <span>
                  {currentRound + 1 < ROUNDS_COUNT
                    ? `Next round (${currentRound + 2}/${ROUNDS_COUNT})`
                    : 'See results'}
                </span>
                <span>→</span>
              </button>
            </div>
          )}

          {/* ROUND HISTORY */}
          {results.length > 0 && (
            <div className="sidebar-section">
              <span className="sidebar-label">History</span>
              <div className="round-history">
                {results.map((r, i) => (
                  <div key={i} className={`history-row ${i === currentRound && hasGuessed ? 'current' : ''}`}>
                    <span>R{i + 1} · {rounds[i].year}</span>
                    <span className={`history-pts ${r.score === 0 ? 'text-muted' : ''}`}>
                      {r.score.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RUNNING TOTAL */}
          {results.length > 0 && (
            <div className="sidebar-section">
              <div className="divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingTop: 4 }}>
                <span className="sidebar-label" style={{ marginBottom: 0 }}>Running total</span>
                <span style={{ fontWeight: 500, color: 'var(--dark-blue)' }}>
                  {totalScore.toLocaleString()} / {results.length * 5000}
                </span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
