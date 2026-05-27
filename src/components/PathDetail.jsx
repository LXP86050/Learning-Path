import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GuideContent from './GuideContent.jsx'
import InterviewPrep from './InterviewPrep.jsx'

export default function PathDetail({ path, prep, onBack, onOpenProgram }) {
  const [tab, setTab] = useState('guide')

  // Italicise the last word of the title for the headline
  const titleParts = path.title.split(' ')
  const last = titleParts.pop()

  return (
    <section className="section-sm">
      <div className="container">
        <button className="back-link" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
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
              <span className="rule" /> {path.stats.duration} · {path.stats.level}
            </motion.div>

            <motion.h1
              style={{ marginTop: 22 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              {titleParts.join(' ')}{' '}
              <span className="italic" style={{ color: path.color[0] }}>
                {last}
              </span>
            </motion.h1>

            <motion.p
              className="lede"
              style={{ marginTop: 24 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {path.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}
            >
              <button
                className="btn btn-ghost"
                onClick={() => onOpenProgram(path.id)}
              >
                See the 4-week sprint
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </motion.div>
          </div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="stat-grid">
              <Stat label="Read time" value={path.stats.duration} />
              <Stat label="Examples" value={`${path.stats.examples}+`} />
              <Stat label="Chapters" value={String(path.chapters.length)} />
              <Stat label="Level" value={path.stats.level} />
            </div>
            <div className="stat-card-tags">
              {path.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </motion.div>
        </div>

        <div className="tabs" role="tablist">
          {[
            { id: 'guide', label: 'Complete Guide' },
            { id: 'interview', label: 'Interview Prep' }
          ].map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="path-tab-pill"
                  className="tab-pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'guide' ? (
              <GuideContent chapters={path.chapters} accent={path.color} />
            ) : (
              <InterviewPrep questions={prep} accent={path.color} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div className="stat-item">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}
