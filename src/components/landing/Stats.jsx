import { useState, useEffect, useRef, useCallback } from 'react'

const stats = [
  { target: 250, suffix: '+', label: 'Communities aufgebaut' },
  { target: 50000, suffix: '+', label: 'Mitglieder vermittelt', display: '50.000' },
  { target: 98, suffix: '%', label: 'Kundenzufriedenheit' },
  { target: 2.5, suffix: 'M+', label: 'Nachrichten versendet', isDecimal: true },
]

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

function formatNumber(value, isDecimal) {
  if (isDecimal) {
    return value.toFixed(1).replace('.', ',')
  }
  if (value >= 1000) {
    return Math.floor(value).toLocaleString('de-DE')
  }
  return Math.floor(value).toString()
}

function AnimatedStat({ target, suffix, label, isDecimal }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  const animate = useCallback(() => {
    if (hasAnimated) return
    setHasAnimated(true)

    const duration = 2000
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      setCount(easedProgress * target)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [target, hasAnimated])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.unobserve(element)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [animate])

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-mono text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        {formatNumber(count, isDecimal)}
        <span className="text-accent-500">{suffix}</span>
      </div>
      <div className="w-8 h-px bg-accent-500/40 mt-3 mx-auto md:mx-0" />
      <p className="text-sm text-gray-500 dark:text-muted mt-2">{label}</p>
    </div>
  )
}

function Stats() {
  return (
    <section className="py-24 px-6 border-y border-gray-200 dark:border-white/[0.04] bg-gray-50/50 dark:bg-surface-1/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              isDecimal={stat.isDecimal}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
