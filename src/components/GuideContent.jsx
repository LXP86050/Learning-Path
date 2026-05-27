import { motion } from 'framer-motion'
import ExampleCard from './ExampleCard.jsx'
import TaskCard from './TaskCard.jsx'

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
          transition={{ duration: 0.55, delay: ci * 0.04 }}
        >
          <header className="chapter-head">
            <span
              className="chapter-num"
              style={{ color: accent[0] }}
              aria-hidden="true"
            >
              {String(ci + 1).padStart(2, '0')}
            </span>
            <div>
              <h2 className="chapter-title">{renderChapterTitle(ch.title)}</h2>
              {ch.subtitle && <p className="chapter-sub">{ch.subtitle}</p>}
            </div>
          </header>

          <div className="sections">
            {ch.sections.map((sec, si) => (
              <article key={sec.id} className="section-block">
                <div className="section-num">
                  {String(ci + 1).padStart(2, '0')}.{String(si + 1).padStart(2, '0')}
                </div>

                <div className="section-body">
                  <h3 className="section-title">{sec.title}</h3>
                  <p className="section-intro">{sec.intro}</p>

                  {sec.keypoints && sec.keypoints.length > 0 && (
                    <ul className="keypoints">
                      {sec.keypoints.map((k, i) => (
                        <li key={i}>
                          <span className="kp-dot" style={{ background: accent[0] }} />
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

                  {sec.tasks && sec.tasks.length > 0 && (
                    <div className="tasks-block">
                      <div className="tasks-header">
                        <span className="tasks-pill" style={{ color: accent[0] }}>
                          <em style={{ fontStyle: 'italic' }}>Your turn</em>
                        </span>
                        <span className="tasks-sub">Practice — solutions inside the button</span>
                      </div>
                      <div className="tasks">
                        {sec.tasks.map((t, ti) => (
                          <TaskCard key={ti} task={t} index={ti} accent={accent} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  )
}

// Drop the literal "Chapter N · " prefix from the data (it's redundant with the big numeral)
function renderChapterTitle(title) {
  const stripped = title.replace(/^Chapter\s+\d+\s*[·.]?\s*/i, '')
  // Italicise final word for editorial flair
  const parts = stripped.split(/(\s+)/)
  const lastWordIdx = (() => {
    for (let i = parts.length - 1; i >= 0; i--) if (parts[i].trim()) return i
    return -1
  })()
  return parts.map((p, i) =>
    i === lastWordIdx ? <span key={i} className="italic">{p}</span> : <span key={i}>{p}</span>
  )
}
