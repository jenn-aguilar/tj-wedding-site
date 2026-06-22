import { motion, useReducedMotion } from 'framer-motion'

/**
 * Fade + slide-up on scroll. Respects prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, y = 24, as = 'div', className }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
