import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WeekProgram from './WeekProgram.jsx'
import InterviewPrep from './InterviewPrep.jsx'

export default function PathDetail({ path, prep, onBack }) {
  const [tab, setTab] = useState('program')

  return (
    <section className="section-sm">
      <div className="container">
        <button className="back-link" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          All paths
        </button>

        <div className="detail-hero">
          <div>
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="dot" /> {path.stats.duration} · {path.stats.level}
            </motion.div>
            <motion.h1
              style={{ marginTop: 18, fontSize: 'clamp(34px, 5vw, 60px)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              <span
                style={{
                  background: `linear-gradient(120deg, ${path.color[0]}, ${path.color[1]})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                {path.title}
              </span>
            </motion.h1>
            <motion.p
              className="lede"
              style={{ marginTop: 18 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {path.summary}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{
              padding: 22,
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              background: 'var(--surface)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              <Stat label="Duration" value={path.stats.duration} />
              <Stat label="Effort" value={path.stats.hours} />
              <Stat label="Projects" value={`${path.stats.projects} shipped`} />
              <Stat label="Level" value={path.stats.level} />
            </div>
            <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {path.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </motion.div>
        </div>

        <div className="tabs" role="tablist">
          {[
            { id: 'program', label: '4-Week Program' },
            { id: 'interview', label: 'Interview Prep' }
          ].map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {tab === t.id && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />}
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'program' ? (
              <WeekProgram weeks={path.weeks} accent={path.color} />
            ) : (
              <InterviewPrep questions={prep} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{label}</div>
      <div style={{ fontWeight: 600, marginTop: 4, color: 'var(--text)' }}>{value}</div>
    </div>
  )
}
