import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export default function TaskCard({ task, index, accent }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className={`task ${open ? 'open' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="task-head">
        <span
          className="task-num"
          style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
          aria-hidden="true"
        >
          T{String(index + 1).padStart(2, '0')}
        </span>
        <div className="task-titles">
          <div className="task-tag" style={{ color: accent[0] }}>Practice</div>
          <h4 className="task-title">{task.title}</h4>
        </div>
      </div>

      <div className="task-prompt">
        <ReactMarkdown>{task.prompt}</ReactMarkdown>
      </div>

      <div
        className={`task-solution ${open ? 'open' : ''}`}
        style={{ borderColor: open ? accent[0] : 'var(--border)' }}
      >
        <button
          type="button"
          className="task-solution-trigger"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls={`solution-${index}`}
        >
          <span className="task-solution-trigger-label">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent[0]}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {open
                ? <path d="M5 13l4 4L19 7" />
                : <><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></>}
            </svg>
            {open ? 'Hide solution' : 'Show solution'}
          </span>
          <motion.span
            className="task-solution-chev"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="solution-body"
              id={`solution-${index}`}
              className="task-solution-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="task-solution-inner">
                <div className="task-solution-tag" style={{ color: accent[0] }}>Solution</div>
                <ReactMarkdown>{task.solution}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
