import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export default function ExampleCard({ example, index, accent }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className={`example ${open ? 'open' : ''}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <button
        type="button"
        className="example-head"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span
          className="example-num"
          style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="example-titles">
          <span className="example-title">{example.title}</span>
          <span className="example-summary">{example.summary}</span>
        </span>
        <motion.span
          className="example-chev"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="example-body">
              <ReactMarkdown>{example.body}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
