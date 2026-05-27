import { motion } from 'framer-motion'

export default function PathCard({ path, index, onOpen }) {
  return (
    <motion.button
      className="path-card"
      onClick={() => onOpen(path.id)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      type="button"
    >
      <span className="path-card-num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        className="path-card-stripe"
        style={{ background: `linear-gradient(90deg, ${path.color[0]}, ${path.color[1]})` }}
        aria-hidden="true"
      />

      <span className="path-card-tag">Path {String(index + 1).padStart(2, '0')}</span>

      <h3 className="path-card-title">
        {path.title.split(' ').map((w, i, arr) => (
          <span key={i}>
            {i === arr.length - 1 ? <span className="italic">{w}</span> : w + ' '}
          </span>
        ))}
      </h3>

      <p className="path-card-summary">{path.tagline}</p>

      <div className="path-card-tags">
        {path.tags.slice(0, 4).map(t => (
          <span key={t} className="path-card-tag-chip">{t}</span>
        ))}
      </div>

      <div className="path-card-foot">
        <span className="path-card-foot-label">Begin reading</span>
        <span className="path-card-arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </span>
      </div>
    </motion.button>
  )
}
