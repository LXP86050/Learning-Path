import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function State({ q, hint, a, index, accent }) {
  const [stage, setStage] = useState(0) // 0 = question, 1 = hint, 2 = answer
  const reset = (e) => { e.stopPropagation(); setStage(0) }

  return (
    <motion.div
      className="iv-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.04 }}
    >
      <div className="iv-head">
        <span
          className="iv-num"
          style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
        >
          Q{String(index + 1).padStart(2, '0')}
        </span>
        {stage > 0 && (
          <button className="iv-reset" onClick={reset} aria-label="Reset card">reset</button>
        )}
      </div>

      <p className="iv-q">{q}</p>

      <AnimatePresence mode="wait">
        {stage === 1 && (
          <motion.div
            key="hint"
            className="iv-hint"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
          >
            <span className="iv-tag" style={{ color: accent[0] }}>hint</span>
            <p>{hint}</p>
          </motion.div>
        )}
        {stage === 2 && (
          <motion.div
            key="answer"
            className="iv-answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32 }}
          >
            <span className="iv-tag" style={{ color: accent[0] }}>answer</span>
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="iv-actions">
        {stage === 0 && (
          <button className="btn btn-ghost btn-sm" onClick={() => setStage(1)}>
            Show hint
          </button>
        )}
        {stage <= 1 && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setStage(2)}
            style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
          >
            Reveal answer
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
        )}
        {stage === 2 && (
          <button className="btn btn-ghost btn-sm" onClick={() => setStage(0)}>
            Try again
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function InterviewPrep({ questions, accent }) {
  return (
    <div className="iv-grid">
      {questions.map((qa, i) => (
        <State key={i} {...qa} index={i} accent={accent} />
      ))}
    </div>
  )
}
