import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Shield,
  Zap,
  Eye,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Globe,
  Activity,
  Target,
  Award,
  Sun,
  Moon,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

function extractGroupSlug(url) {
  const match = url.match(/facebook\.com\/groups\/([^/?]+)/)
  return match ? match[1] : null
}

function generateMockAnalysis(slug) {
  const seed = slug.length * 7 + slug.charCodeAt(0)
  const rand = (min, max) => min + ((seed * 9301 + 49297) % 233280) / 233280 * (max - min)

  const members = Math.floor(rand(800, 85000))
  const postsPerMonth = Math.floor(rand(40, 600))
  const commentsPerPost = parseFloat(rand(2, 18).toFixed(1))
  const growthRate = parseFloat(rand(1.5, 12).toFixed(1))
  const engagementRate = parseFloat(rand(3, 28).toFixed(1))
  const founded = 2025 - Math.floor(rand(1, 7))
  const activeMembers = Math.floor(members * rand(0.15, 0.45))

  const potential = Math.min(
    98,
    Math.floor(
      (members > 5000 ? 25 : members / 200) +
      (postsPerMonth > 200 ? 20 : postsPerMonth / 10) +
      (engagementRate > 10 ? 20 : engagementRate * 2) +
      (growthRate > 5 ? 15 : growthRate * 3) +
      (commentsPerPost > 8 ? 10 : commentsPerPost * 1.25) +
      8
    )
  )

  const monthlyValue = Math.floor(members * 0.08 + postsPerMonth * 0.5 + potential * 3)

  return {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    slug,
    members,
    activeMembers,
    postsPerMonth,
    commentsPerPost,
    growthRate,
    engagementRate,
    founded,
    potential,
    monthlyValue,
    privacy: members > 20000 ? 'Oeffentlich' : 'Privat',
    category: ['Business & Unternehmen', 'Marketing & Werbung', 'E-Commerce', 'Tech & Startups', 'Fitness & Gesundheit'][Math.floor(rand(0, 4.99))],
  }
}

function AnimatedNumber({ target, duration = 1500, prefix = '', suffix = '' }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const start = performance.now()
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * target)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])

  const formatted = target >= 1000
    ? Math.floor(value).toLocaleString('de-DE')
    : Number.isInteger(target)
      ? Math.floor(value).toString()
      : value.toFixed(1).replace('.', ',')

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}

function StatCard({ icon: Icon, label, children }) {
  return (
    <div className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-accent-500" />
        <span className="text-xs text-gray-500 dark:text-muted-light uppercase tracking-wide">{label}</span>
      </div>
      <div className="font-mono text-2xl font-bold text-gray-900 dark:text-white">
        {children}
      </div>
    </div>
  )
}

function PotentialGauge({ value }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius * 0.75
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const start = performance.now()
    function tick(now) {
      const progress = Math.min((now - start) / 2000, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimated(eased * value)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])

  const offset = circumference - (animated / 100) * circumference
  const color = value >= 70 ? '#22c55e' : value >= 40 ? '#1877F2' : '#ef4444'
  const label = value >= 70 ? 'Hohes Potenzial' : value >= 40 ? 'Mittleres Potenzial' : 'Niedriges Potenzial'

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="140" viewBox="0 0 180 140">
        <path
          d="M 20 130 A 70 70 0 1 1 160 130"
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-white/[0.06]"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 20 130 A 70 70 0 1 1 160 130"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
        <text x="90" y="95" textAnchor="middle" className="fill-gray-900 dark:fill-white" fontSize="36" fontWeight="bold" fontFamily="JetBrains Mono, monospace">
          {Math.floor(animated)}
        </text>
        <text x="90" y="115" textAnchor="middle" className="fill-gray-500 dark:fill-muted-light" fontSize="11">
          von 100
        </text>
      </svg>
      <span className="text-sm font-semibold mt-1" style={{ color }}>{label}</span>
    </div>
  )
}

const ANALYSIS_STEPS = [
  'Gruppe wird geladen...',
  'Mitglieder analysieren...',
  'Beitraege auswerten...',
  'Engagement berechnen...',
  'Wachstumspotenzial ermitteln...',
  'Bericht wird erstellt...',
]

const ADVANTAGES = [
  {
    icon: Target,
    title: 'Zielgruppen-Expertise',
    desc: 'Wir kennen die Mechaniken von Facebook-Gruppen seit 5+ Jahren und wissen exakt, welche Strategien in welcher Nische funktionieren.',
  },
  {
    icon: BarChart3,
    title: 'Datengetrieben',
    desc: 'Jede Entscheidung basiert auf Echtzeitdaten. Du siehst jeden Fortschritt transparent in deinem Dashboard.',
  },
  {
    icon: Shield,
    title: 'Organisch & Sicher',
    desc: 'Keine Bots, keine Fake-Accounts. Wir arbeiten ausschliesslich mit echten, interessierten Mitgliedern.',
  },
  {
    icon: Award,
    title: '250+ Communities betreut',
    desc: 'Unser Track Record spricht fuer sich. Von Nischen-Gruppen bis zu Enterprise-Communities mit 50.000+ Mitgliedern.',
  },
]

export default function GroupAnalyzer() {
  const [url, setUrl] = useState('')
  const [phase, setPhase] = useState('input')
  const [stepIndex, setStepIndex] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const { theme, toggleTheme } = useTheme()

  const handleAnalyze = useCallback(() => {
    const slug = extractGroupSlug(url.trim())
    if (!slug) {
      setError('Bitte gib einen gueltigen Facebook-Gruppen-Link ein (z.B. facebook.com/groups/deine-gruppe)')
      return
    }
    setError('')
    setPhase('analyzing')
    setStepIndex(0)
  }, [url])

  useEffect(() => {
    if (phase !== 'analyzing') return

    if (stepIndex < ANALYSIS_STEPS.length) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1)
      }, 600 + Math.random() * 400)
      return () => clearTimeout(timer)
    }

    const slug = extractGroupSlug(url.trim())
    const data = generateMockAnalysis(slug)
    setResult(data)
    setPhase('result')
  }, [phase, stepIndex, url])

  const handleReset = useCallback(() => {
    setUrl('')
    setPhase('input')
    setStepIndex(0)
    setResult(null)
    setError('')
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-surface-0">
      {/* Nav */}
      <nav className="border-b border-gray-200 dark:border-white/[0.04] bg-white/80 dark:bg-surface-0/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-xl italic tracking-tight text-gray-900 dark:text-white">
            GrowthHub<span className="text-accent-500">.</span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/"
              className="text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Zurueck
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-3 block">
            Gruppen-Analyse
          </span>
          <h1 className="font-display text-4xl md:text-5xl italic text-gray-900 dark:text-white">
            Dein Gruppen-<span className="text-accent-500">Potenzial</span>.
          </h1>
          <p className="text-gray-500 dark:text-muted-light mt-4 max-w-xl mx-auto">
            Gib den Link deiner Facebook-Gruppe ein und erhalte eine detaillierte Analyse
            mit Wachstumspotenzial und konkreten Empfehlungen.
          </p>
        </div>

        {/* Input */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-muted" />
              <input
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="https://facebook.com/groups/deine-gruppe"
                disabled={phase === 'analyzing'}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-surface-2 border border-gray-200 dark:border-white/[0.06] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-muted outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/10 transition-all text-sm disabled:opacity-50"
              />
            </div>
            <button
              onClick={phase === 'result' ? handleReset : handleAnalyze}
              disabled={phase === 'analyzing'}
              className="bg-accent-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-accent-400 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {phase === 'analyzing' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analysiert...
                </>
              ) : phase === 'result' ? (
                <>
                  <Search className="w-4 h-4" />
                  Neue Analyse
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Analysieren
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Analyzing State */}
        {phase === 'analyzing' && (
          <div className="max-w-md mx-auto text-center py-16">
            <Loader2 className="w-10 h-10 text-accent-500 animate-spin mx-auto mb-8" />
            <div className="space-y-3">
              {ANALYSIS_STEPS.map((step, i) => (
                <div
                  key={step}
                  className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                    i < stepIndex
                      ? 'text-gray-900 dark:text-white'
                      : i === stepIndex
                        ? 'text-accent-500'
                        : 'text-gray-300 dark:text-muted/40'
                  }`}
                >
                  {i < stepIndex ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : i === stepIndex ? (
                    <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-current flex-shrink-0" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {phase === 'result' && result && (
          <div className="space-y-8 animate-fade-in">
            {/* Group Header */}
            <div className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{result.name}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-muted-light">
                        <span>{result.category}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-muted" />
                        <span>{result.privacy}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <PotentialGauge value={result.potential} />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={Users} label="Mitglieder">
                <AnimatedNumber target={result.members} />
              </StatCard>
              <StatCard icon={Activity} label="Aktive Mitglieder">
                <AnimatedNumber target={result.activeMembers} />
              </StatCard>
              <StatCard icon={MessageSquare} label="Posts / Monat">
                <AnimatedNumber target={result.postsPerMonth} />
              </StatCard>
              <StatCard icon={Calendar} label="Gegruendet">
                {result.founded}
              </StatCard>
              <StatCard icon={TrendingUp} label="Wachstum / Monat">
                <AnimatedNumber target={result.growthRate} suffix="%" />
              </StatCard>
              <StatCard icon={Eye} label="Engagement-Rate">
                <AnimatedNumber target={result.engagementRate} suffix="%" />
              </StatCard>
              <StatCard icon={MessageSquare} label="Kommentare / Post">
                <AnimatedNumber target={result.commentsPerPost} suffix="" />
              </StatCard>
              <StatCard icon={Zap} label="Potenzial-Score">
                <AnimatedNumber target={result.potential} suffix="/100" />
              </StatCard>
            </div>

            {/* Revenue Potential */}
            <div className="bg-gradient-to-br from-accent-500/5 to-accent-500/[0.02] border border-accent-500/10 rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-2xl italic text-gray-900 dark:text-white mb-2">
                Was wir fuer diese Gruppe bieten koennen
              </h3>
              <p className="text-gray-500 dark:text-muted-light text-sm mb-6">
                Basierend auf unserer Analyse sehen wir folgendes Potenzial fuer deine Community.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-5">
                  <p className="text-xs text-gray-500 dark:text-muted-light uppercase tracking-wide mb-1">Geschaetzter Monatswert</p>
                  <p className="font-mono text-3xl font-bold text-accent-500">
                    <AnimatedNumber target={result.monthlyValue} prefix="" suffix=" EUR" />
                  </p>
                </div>
                <div className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-5">
                  <p className="text-xs text-gray-500 dark:text-muted-light uppercase tracking-wide mb-1">Mitglieder-Zuwachs moeglich</p>
                  <p className="font-mono text-3xl font-bold text-gray-900 dark:text-white">
                    +<AnimatedNumber target={Math.floor(result.members * 0.25)} suffix="" />
                  </p>
                  <p className="text-xs text-gray-500 dark:text-muted-light mt-1">in 3 Monaten</p>
                </div>
                <div className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-5">
                  <p className="text-xs text-gray-500 dark:text-muted-light uppercase tracking-wide mb-1">Engagement-Steigerung</p>
                  <p className="font-mono text-3xl font-bold text-gray-900 dark:text-white">
                    +<AnimatedNumber target={Math.floor(result.engagementRate * 0.6 * 10) / 10} suffix="%" />
                  </p>
                  <p className="text-xs text-gray-500 dark:text-muted-light mt-1">durch unsere Services</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  result.members < 5000 && 'Community-Wachstum: Gezieltes Mitglieder-Matching um die kritische Masse von 5.000+ zu erreichen.',
                  'Onboarding-Automatisierung: Personalisierte Willkommensnachrichten fuer neue Mitglieder mit Freebie-Integration.',
                  result.engagementRate < 15 && 'Content-Distribution: Engagement durch gezielte Inhaltsverteilung und Interaktionen steigern.',
                  'Launch-Kampagnen: Persoenliche Benachrichtigung aller Mitglieder bei Events und Produkt-Launches.',
                  result.members > 10000 && 'Social Amplification: Deine Inhalte ueber unser Netzwerk von 5.000+ Kontakten verbreiten.',
                  'Direkt-Kommunikation: Persoenliche Ansprache fuer maximale Conversion bei wichtigen Aktionen.',
                ].filter(Boolean).map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-muted-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Us */}
            <div>
              <h3 className="font-display text-2xl italic text-gray-900 dark:text-white mb-6">
                Warum GrowthHub und kein anderer?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ADVANTAGES.map((adv) => {
                  const Icon = adv.icon
                  return (
                    <div
                      key={adv.title}
                      className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4.5 h-4.5 text-accent-500" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{adv.title}</h4>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-muted-light leading-relaxed">{adv.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-muted-light mb-4">
                Bereit, das volle Potenzial deiner Community auszuschoepfen?
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-accent-400 transition-colors text-sm"
              >
                Kostenloses Beratungsgespraech
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
