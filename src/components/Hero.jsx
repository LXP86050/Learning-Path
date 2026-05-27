import { motion } from 'framer-motion'

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }
  })
}

const meta = [
  { num: '03', lbl: 'Complete paths' },
  { num: '100+', lbl: 'Worked examples' },
  { num: '62', lbl: 'Practice tasks' },
  { num: '04', lbl: 'Week sprints', italic: true }
]

export default function Hero({ onStart, onPrograms }) {
  return (
    <section className="hero">
      <div className="container">
        <motion.div className="eyebrow hero-eyebrow"
          variants={fade} initial="hidden" animate="show" custom={0}>
          <span className="rule" /> A field manual <span className="rule" />
        </motion.div>

        <motion.h1 variants={fade} initial="hidden" animate="show" custom={1}>
          Engineering, <span className="italic">explained.</span>
          <br />
          From first principles.
        </motion.h1>

        <motion.p className="lede" variants={fade} initial="hidden" animate="show" custom={2}>
          Three deep guides — AI, Agentic, and Full-Stack — written like a thoughtful book,
          not a YouTube playlist. Chapters, worked examples, practice tasks, and a separate
          4-week sprint plan when you want a schedule.
        </motion.p>

        <motion.div className="hero-cta" variants={fade} initial="hidden" animate="show" custom={3}>
          <button className="btn btn-primary" onClick={onStart}>
            Pick a path
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
          <button className="btn btn-ghost" onClick={onPrograms}>
            Browse the 4-week sprints
          </button>
        </motion.div>

        <motion.div className="hero-meta" variants={fade} initial="hidden" animate="show" custom={4}>
          {meta.map((m) => (
            <div className="hero-meta-item" key={m.lbl}>
              <div className="hero-meta-num">
                {m.italic ? <span className="italic">{m.num}</span> : m.num}
              </div>
              <div className="hero-meta-lbl">{m.lbl}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
