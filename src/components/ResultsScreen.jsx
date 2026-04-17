import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { scoreToBlocks, generateShareText, getDayNumber } from '../utils/gameLogic.js'

export default function ResultsScreen({ rounds, results, totalScore, isDaily }) {
  const [copied, setCopied] = useState(false)
  const dayNum = getDayNumber()
  const shareText = generateShareText(results, totalScore, dayNum, isDaily)

  function handleCopy() {
    if (!shareText) return
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="results-page">
      <div className="results-card">
        <div className="results-eyebrow">
          {isDaily ? `Daily Challenge #${dayNum}` : 'Practice Mode'} — Results
        </div>

        <div className="results-total">{totalScore.toLocaleString()}</div>
        <div className="results-total-label">points out of 25,000</div>

        <div className="results-rounds">
          {rounds.map((round, i) => {
            const r = results[i]
            const blocks = scoreToBlocks(r.score)
            const diff = r.guessYear - round.year
            const diffStr = diff === 0
              ? 'exact'
              : diff > 0
                ? `+${diff} years`
                : `${diff} years`
            return (
              <div className="results-round-row" key={i}>
                <span className="results-round-num">R{i + 1}</span>
                <div className="results-round-blocks" title={`${round.year} — your guess: ${r.guessYear}`}>
                  {[...blocks].map((emoji, j) => (
                    <span key={j} style={{ fontSize: 18 }}>{emoji}</span>
                  ))}
                </div>
                <span className="results-round-year">
                  {round.year}
                  <span style={{ color: '#aaa', marginLeft: 4, fontSize: 10 }}>
                    ({diffStr})
                  </span>
                </span>
                <span className={`results-round-pts ${r.score === 0 ? 'zero' : ''}`}>
                  {r.score.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>

        <div className="share-block">
          {isDaily && shareText && (
            <>
              <pre className="share-preview">{shareText}</pre>
              <button
                className={`btn-share ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                <span>{copied ? 'Copied to clipboard ✓' : 'Copy results to share'}</span>
                <span>{copied ? '' : '→'}</span>
              </button>
            </>
          )}

          <Link
            to="/"
            className="btn-play-again"
          >
            <span>Back to Home</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
