import { useState } from 'react'
import { motion } from 'framer-motion'

export default function InterviewPrep({ questions }) {
  const [flipped, setFlipped] = useState(() => new Set())

  const toggle = (i) => {
    setFlipped(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  return (
    <div className="iv-grid">
      {questions.map((qa, i) => (
        <motion.div
          key={i}
          className={`iv-card ${flipped.has(i) ? 'flipped' : ''}`}
          onClick={() => toggle(i)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i) } }}
          aria-pressed={flipped.has(i)}
        >
          <div className="iv-inner">
            <div className="iv-face front">
              <div className="q-tag">Q{String(i + 1).padStart(2, '0')}</div>
              <div className="q-text">{qa.q}</div>
              <div className="hint">Click to reveal answer ↻</div>
            </div>
            <div className="iv-face back">
              <div className="a-text">{qa.a}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
