import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../components/ThemeContext.jsx'

export default function Header({ right }) {
  const { isDark, toggle } = useTheme()

  return (
    <header className="site-header">
      <Link to="/" className="site-logo no-select">
        CARTO<span>GUESSR</span>
      </Link>

      {right && <div>{right}</div>}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          className="theme-toggle"
          onClick={toggle}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? '☀' : '☾'}
        </button>
        <Link to="/about" className="header-link">
          About
        </Link>
      </div>
    </header>
  )
}