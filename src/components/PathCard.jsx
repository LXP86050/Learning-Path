import { motion } from 'framer-motion'

export default function PathCard({ path, index, onOpen }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      className="path-card"
      onMouseMove={handleMouseMove}
      onClick={() => onOpen(path.id)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div
        className="path-icon"
        style={{ background: `linear-gradient(135deg, ${path.color[0]}, ${path.color[1]})` }}
        aria-hidden="true"
      >
        {path.icon}
      </div>
      <h3>{path.title}</h3>
      <p className="summary" style={{ marginTop: 8 }}>{path.tagline}</p>

      <div className="meta-row">
        {path.tags.slice(0, 4).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="open-arrow">
        Start path
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </div>
    </motion.div>
  )
}
