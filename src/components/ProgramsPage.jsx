import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { programs } from '../data/index.js'

const programArray = Object.values(programs)

export default function ProgramsPage({ onBack, initialTrack }) {
  const [activeId, setActiveId] = useState(initialTrack && programs[initialTrack] ? initialTrack : programArray[0].id)
  const active = programs[activeId]

  return (
    <section className="section-sm">
      <div className="container">
        <button className="back-link" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="eyebrow"><span className="dot" /> 4-Week Sprints</span>
          <h1 style={{ marginTop: 18, fontSize: 'clamp(34px, 5vw, 60px)' }}>
            <span
              style={{
                background: `linear-gradient(120deg, ${active.accent[0]}, ${active.accent[1]})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {active.title.replace(' · 4-Week Sprint', '')}
            </span>
          </h1>
          <p className="lede" style={{ marginTop: 16 }}>{active.summary}</p>
        </motion.div>

        <div className="tabs" role="tablist" style={{ marginTop: 28 }}>
          {programArray.map(p => (
            <button
              key={p.id}
              role="tab"
              aria-selected={activeId === p.id}
              className={`tab ${activeId === p.id ? 'active' : ''}`}
              onClick={() => setActiveId(p.id)}
            >
              {activeId === p.id && (
                <motion.span
                  layoutId="program-tab-pill"
                  className="tab-pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
              {p.title.replace(' · 4-Week Sprint', '')}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="weeks">
              {active.weeks.map((w, i) => (
                <motion.div
                  key={w.week}
                  className="week-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div
                    className="num-ring"
                    style={{ borderColor: active.accent[0], color: active.accent[0] }}
                  >
                    W{w.week}
                  </div>
                  <div className="week-sub">Week {w.week} · {w.subtitle}</div>
                  <h3 style={{ marginTop: 6 }}>{w.title}</h3>

                  <div className="topics">
                    {w.topics.map((t, idx) => (
                      <div key={idx} className="topic">
                        <span
                          className="bullet"
                          style={{ background: `linear-gradient(135deg, ${active.accent[0]}, ${active.accent[1]})` }}
                        />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  <div className="project">
                    <b>Ship it →</b> {w.project}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
