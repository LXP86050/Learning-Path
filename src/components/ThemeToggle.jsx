import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

const Sun = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const Moon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
)

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="theme-toggle" role="group" aria-label="Colour scheme">
      <motion.span
        className="knob"
        layout
        transition={{ type: 'spring', stiffness: 600, damping: 36 }}
        style={{ left: isDark ? 33 : 3 }}
      />
      <button
        type="button"
        aria-pressed={!isDark}
        aria-label="Light mode"
        onClick={() => { if (isDark) toggle() }}
      >
        {Sun}
      </button>
      <button
        type="button"
        aria-pressed={isDark}
        aria-label="Dark mode"
        onClick={() => { if (!isDark) toggle() }}
      >
        {Moon}
      </button>
    </div>
  )
}
