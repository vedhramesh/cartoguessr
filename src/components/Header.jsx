import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ right }) {
  return (
    <header className="site-header">
      <Link to="/" className="site-logo no-select">
        CARTO<span>GUESSR</span>
      </Link>
      
      {right && <div>{right}</div>}
      
      <Link to="/about" className="header-link">
        About
      </Link>
    </header>
  )
}