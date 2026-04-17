import React, { useState } from 'react'
import Header from "../components/Header.jsx";

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      q: "How does the scoring work?",
      a: "You can earn up to 5,000 points per round. Points decay exponentially the further your guess is from the actual year. If your guess is off by more than 50 years, you score 0."
    },
    {
      q: "Are the Daily Challenge maps the same for everyone?",
      a: "Yes. The Daily Challenge uses a deterministic seed based on today's date, meaning everyone worldwide plays the exact same 5 maps."
    },
    {
      q: "What time period do the maps cover?",
      a: "The maps range from 1886 to 2019. We're working on adding older maps, but the process of doing so is hard — they're not in the database we get our map data from."
    },
    {
      q: "Why isn't [disputed territory] part of [my country]?",
      a: "Take it up with ETH Zürich, that's where we get our data from."
    }
  ]

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="game-page">
      <Header /> 
      
      <div className="about-content">
        <h1>About Cartoguessr</h1>
        
        <p className="about-blurb">
          Cartoguessr is a chronological map game. Instead of guessing where you are, you guess <em>when</em> you are. Test your knowledge of the changing political landscape of the 19th, 20th, and 21st centuries!
        </p>

        <h2>FAQ</h2>
        <div className="faq-section">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.q}
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              
              <div className="faq-answer-wrapper">
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}