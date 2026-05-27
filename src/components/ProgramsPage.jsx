import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { programs } from '../data/index.js'

const programArray = Object.values(programs)

export default function ProgramsPage({ onBack, initialTrack }) {
  const [activeId, setActiveId] = useState(
    initialTrack && programs[initialTrack] ? initialTrack : programArray[0].id
  )
  const active = programs[activeId]
  const cleanTitle = active.title.replace(' · 4-Week Sprint', '')
  const parts = cleanTitle.split(' ')
  const last = parts.pop()

  return (
    <section className="section-sm">
      <div className="container">
        <button className="back-link" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="eyebrow"><span className="rule" /> 4-Week Sprints</span>
          <h1 style={{ marginTop: 22 }}>
            The <span className="italic" style={{ color: active.accent[0] }}>{last}</span> sprint
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>{active.summary}</p>
        </motion.div>

        <div className="tabs" role="tablist" style={{ marginTop: 32 }}>
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="weeks">
              {active.weeks.map((w, i) => (
                <motion.div
                  key={w.week}
                  className="week-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <div className="num-ring" style={{ color: active.accent[0] }}>
                    {w.week.toString().padStart(2, '0')}
                  </div>
                  <div className="week-sub">Week {w.week}</div>
                  <h3>{w.title}</h3>

                  <div className="topics">
                    {w.topics.map((t, idx) => (
                      <div key={idx} className="topic">
                        <span className="bullet" style={{ background: active.accent[0] }} />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  <div className="project">
                    <b>Ship it</b> {w.project}
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
