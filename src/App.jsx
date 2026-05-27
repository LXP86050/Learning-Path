import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Hero from './components/Hero.jsx'
import PathCard from './components/PathCard.jsx'
import PathDetail from './components/PathDetail.jsx'
import ProgramsPage from './components/ProgramsPage.jsx'
import { paths, interviewPrep } from './data/index.js'

function parseHash() {
  if (typeof window === 'undefined') return { route: 'home' }
  const h = window.location.hash.replace(/^#\/?/, '')
  if (h.startsWith('path/')) return { route: 'path', id: h.slice(5) }
  if (h.startsWith('programs/')) return { route: 'programs', id: h.slice(9) }
  if (h === 'programs') return { route: 'programs', id: null }
  return { route: 'home' }
}

export default function App() {
  const [{ route, id }, setRoute] = useState(parseHash())

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route, id])

  const goHome = () => { window.location.hash = '' }
  const goPath = (pid) => { window.location.hash = `/path/${pid}` }
  const goPrograms = (pid) => { window.location.hash = pid ? `/programs/${pid}` : '/programs' }
  const scrollToPaths = () => {
    document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const pathList = Object.values(paths)
  const activePath = id && paths[id] ? paths[id] : null

  return (
    <div className="app">
      <AnimatedBackground />

      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand" onClick={goHome} role="link" tabIndex={0}
               onKeyDown={(e) => { if (e.key === 'Enter') goHome() }}>
            <div className="brand-mark">L</div>
            <div className="brand-name">Learning Path <span>· step-by-step roadmaps</span></div>
          </div>

          <div className="topbar-right">
            <button
              className="nav-link"
              onClick={() => goPrograms(null)}
              aria-current={route === 'programs' ? 'page' : undefined}
            >
              4-Week Sprints
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {route === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Hero onStart={scrollToPaths} onPrograms={() => goPrograms(null)} />

            <section id="paths" className="section">
              <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span className="eyebrow" style={{ alignSelf: 'flex-start' }}>
                    <span className="dot" /> Pick a path
                  </span>
                  <h2>Three complete guides. Start at zero, end an engineer.</h2>
                  <p className="lede">
                    Each path is a deep, step-by-step handbook — chapters, sections, key points, and
                    click-to-expand code examples. Plus a separate 4-week sprint plan when you want structure.
                  </p>
                </div>

                <div className="paths-grid">
                  {pathList.map((p, i) => (
                    <PathCard key={p.id} path={p} index={i} onOpen={goPath} />
                  ))}
                </div>
              </div>
            </section>

            {/* Featured: 4-Week Sprints — separate from the paths */}
            <section className="section-sm">
              <div className="container">
                <motion.button
                  onClick={() => goPrograms(null)}
                  className="programs-banner"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="pb-stripe" />
                  <div className="pb-content">
                    <div>
                      <span className="eyebrow" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                        <span className="dot" /> Separate — for when you want a schedule
                      </span>
                      <h2 style={{ marginTop: 10 }}>4-Week Sprint Plans</h2>
                      <p className="lede" style={{ marginTop: 10 }}>
                        Three time-boxed programs (~10 hrs/week) with weekly topics and a shippable project at the end of every week.
                        Pick AI, Agentic, or Full-Stack — or run them back to back.
                      </p>
                    </div>
                    <div className="pb-arrow" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </motion.button>
              </div>
            </section>

            <section className="section-sm">
              <div className="container">
                <div className="how-it-works">
                  <div>
                    <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>How a path works</h2>
                    <p className="lede" style={{ marginTop: 10 }}>
                      Read top to bottom or jump around. Every section is a self-contained mini-lesson.
                    </p>
                  </div>
                  <ol className="how-list">
                    {[
                      ['Read the intro', 'Each section opens with the why before the how.'],
                      ['Skim the key points', 'A 30-second summary of what you should walk away knowing.'],
                      ['Expand the examples', '2–3 real, copy-paste-able examples per section. Click to open the code.'],
                      ['Run the interview prep', 'Question → hint → answer. Say the answer out loud before revealing.']
                    ].map(([title, body], i) => (
                      <li key={i}>
                        <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <div className="step-title">{title}</div>
                          <div className="step-body">{body}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          </motion.main>
        )}

        {route === 'path' && activePath && (
          <motion.main
            key={`path-${activePath.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <PathDetail
              path={activePath}
              prep={interviewPrep[activePath.id]}
              onBack={goHome}
              onOpenProgram={goPrograms}
            />
          </motion.main>
        )}

        {route === 'path' && !activePath && (
          <motion.main
            key="not-found"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ padding: '80px 24px' }}
          >
            <h2>Path not found</h2>
            <p className="lede" style={{ marginTop: 12 }}>
              That path doesn\'t exist (yet). <button className="btn btn-ghost" onClick={goHome} style={{ marginLeft: 8 }}>Back to all paths</button>
            </p>
          </motion.main>
        )}

        {route === 'programs' && (
          <motion.main
            key={`programs-${id || 'all'}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <ProgramsPage onBack={goHome} initialTrack={id} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
