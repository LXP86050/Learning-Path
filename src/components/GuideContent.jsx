import { motion } from 'framer-motion'
import ExampleCard from './ExampleCard.jsx'

export default function GuideContent({ chapters, accent }) {
  return (
    <div className="guide">
      {chapters.map((ch, ci) => (
        <motion.section
          key={ch.id}
          className="chapter"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: ci * 0.05 }}
        >
          <header className="chapter-head">
            <span
              className="chapter-stamp"
              style={{
                background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})`
              }}
            >
              {String(ci + 1).padStart(2, '0')}
            </span>
            <div>
              <h2 className="chapter-title">{ch.title}</h2>
              <p className="chapter-sub">{ch.subtitle}</p>
            </div>
          </header>

          <div className="sections">
            {ch.sections.map((sec, si) => (
              <article key={sec.id} className="section-block">
                <div className="section-meta">
                  <span className="section-num" style={{ color: accent[0] }}>
                    {String(ci + 1).padStart(2, '0')}.{String(si + 1).padStart(2, '0')}
                  </span>
                  <h3 className="section-title">{sec.title}</h3>
                </div>

                <p className="section-intro">{sec.intro}</p>

                {sec.keypoints && (
                  <ul className="keypoints">
                    {sec.keypoints.map((k, i) => (
                      <li key={i}>
                        <span
                          className="kp-dot"
                          style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
                        />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="examples">
                  {sec.examples.map((ex, ei) => (
                    <ExampleCard key={ei} example={ex} index={ei} accent={accent} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  )
}
