import { motion } from 'framer-motion'

const float = (delay) => ({
  animate: {
    x: [0, 30, -20, 0],
    y: [0, -25, 15, 0],
    scale: [1, 1.08, 0.96, 1]
  },
  transition: { duration: 18, repeat: Infinity, ease: 'easeInOut', delay }
})

export default function AnimatedBackground() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <motion.div className="blob b1" {...float(0)} />
      <motion.div className="blob b2" {...float(3)} />
      <motion.div className="blob b3" {...float(6)} />
      <div className="grid-overlay" />
    </div>
  )
}
