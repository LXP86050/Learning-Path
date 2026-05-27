import { motion } from 'framer-motion'

export default function WeekProgram({ weeks, accent }) {
  return (
    <div className="weeks">
      {weeks.map((w, i) => (
        <motion.div
          key={w.week}
          className="week-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="num-ring"
            style={{ borderColor: accent[0], color: accent[0] }}
          >
            W{w.week}
          </div>
          <div className="week-sub">Week {w.week} · {w.subtitle}</div>
          <h3 style={{ marginTop: 6 }}>{w.title}</h3>

          <div className="topics">
            {w.topics.map((t, idx) => (
              <motion.div
                key={idx}
                className="topic"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 + idx * 0.04 }}
              >
                <span
                  className="bullet"
                  style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
                />
                <span>{t}</span>
              </motion.div>
            ))}
          </div>

          <div className="project">
            <b>Ship it →</b> {w.project}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
