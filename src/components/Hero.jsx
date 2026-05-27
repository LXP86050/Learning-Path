import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const stats = [
  { num: '3', lbl: 'Deep paths' },
  { num: '100+', lbl: 'Examples' },
  { num: '4 wk', lbl: 'Sprint plans' },
  { num: '24', lbl: 'Interview Qs' }
]

export default function Hero({ onStart, onPrograms }) {
  return (
    <section className="hero">
      <div className="container">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="eyebrow">
            <span className="dot" /> Learn it. Build it. Ship it.
          </motion.div>

          <motion.h1 variants={item} style={{ marginTop: 18 }}>
            From <span className="grad">zero</span> to engineer.
            <br />
            One step-by-step path at a time.
          </motion.h1>

          <motion.p variants={item} className="lede" style={{ marginTop: 22 }}>
            Three from-scratch guides — AI Engineer, Agentic Engineer, and Full-Stack Developer.
            Each path is a complete handbook with chapters, sections, and click-to-expand code
            examples. Want structure? There\'s a separate 4-week sprint plan for each track too.
          </motion.p>

          <motion.div variants={item} className="hero-cta">
            <button className="btn btn-primary" onClick={onStart}>
              Pick a path
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button className="btn btn-ghost" onClick={onPrograms}>
              4-Week Sprint Plans
            </button>
          </motion.div>

          <motion.div variants={item} className="stat-row">
            {stats.map(s => (
              <div className="stat" key={s.lbl}>
                <div className="num">{s.num}</div>
                <div className="lbl">{s.lbl}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
