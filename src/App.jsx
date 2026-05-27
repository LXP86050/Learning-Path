import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Hero from './components/Hero.jsx'
import PathCard from './components/PathCard.jsx'
import PathDetail from './components/PathDetail.jsx'
import { paths, interviewPrep } from './data/paths.js'

function parseHash() {
  if (typeof window === 'undefined') return { route: 'home' }
  const h = window.location.hash.replace(/^#\/?/, '')
  if (h.startsWith('path/')) return { route: 'path', id: h.slice(5) }
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
            <div className="brand-name">Learning Path <span>· animated roadmaps</span></div>
          </div>
          <ThemeToggle />
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
            <Hero onStart={scrollToPaths} />

            <section id="paths" className="section">
              <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span className="eyebrow" style={{ alignSelf: 'flex-start' }}>
                    <span className="dot" /> Pick a path
                  </span>
                  <h2>Three roadmaps. Same promise: start from zero, ship something real.</h2>
                  <p className="lede">
                    Each path is a focused 4-week program — daily-sized lessons, weekly projects, and an
                    interview-prep deck. Choose the one that matches where you want to be in a month.
                  </p>
                </div>

                <div className="paths-grid">
                  {pathList.map((p, i) => (
                    <PathCard key={p.id} path={p} index={i} onOpen={goPath} />
                  ))}
                </div>
              </div>
            </section>

            <section className="section-sm">
              <div className="container">
                <div
                  style={{
                    padding: '32px 28px',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    display: 'grid',
                    gridTemplateColumns: '1.4fr 1fr',
                    gap: 32,
                    alignItems: 'center'
                  }}
                  className="cta-card"
                >
                  <div>
                    <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>How each path works</h2>
                    <p className="lede" style={{ marginTop: 10 }}>
                      Four weeks. Five themes per week. One project to ship at the weekend.
                      Finish with eight interview questions you can actually defend.
                    </p>
                  </div>
                  <ol style={{ display: 'grid', gap: 12, margin: 0, padding: 0, listStyle: 'none', counterReset: 'step' }}>
                    {[
                      'Read the week brief — it sets the mission and what you should be able to do by Sunday.',
                      'Work through the five topics — bite-sized, with a recommended hands-on exercise each.',
                      'Ship the weekend project — small, real, deployable. Commit it to GitHub.',
                      'Run the interview deck — flip the cards, say the answer out loud, then check.'
                    ].map((step, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '36px 1fr',
                          alignItems: 'start',
                          gap: 14,
                          fontSize: 14,
                          color: 'var(--text-soft)',
                          lineHeight: 1.55
                        }}
                      >
                        <span style={{
                          width: 30, height: 30, borderRadius: 8,
                          background: 'var(--surface-strong)',
                          border: '1px solid var(--border-strong)',
                          display: 'grid', placeItems: 'center',
                          fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
                          color: 'var(--text)'
                        }}>{String(i + 1).padStart(2, '0')}</span>
                        {step}
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
            <PathDetail path={activePath} prep={interviewPrep[activePath.id]} onBack={goHome} />
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
              That path doesn't exist (yet). <button className="btn btn-ghost" onClick={goHome} style={{ marginLeft: 8 }}>Back to all paths</button>
            </p>
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="footer">
        <div className="container">
          Built with React + Vite · Open source · {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}
