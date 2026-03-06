import {
  TrendingUp,
  BarChart3,
  Shield,
  Zap,
  HeartHandshake,
} from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Organisches Wachstum',
    description:
      'Keine Bots, keine Fake-Accounts. Wir vermitteln echte, interessierte Mitglieder, die deiner Community echten Mehrwert bringen.',
  },
  {
    icon: BarChart3,
    title: 'Messbare Ergebnisse',
    description:
      'Jede Aktion ist trackbar. Du siehst in Echtzeit, wie viele Mitglieder gewonnen, Nachrichten versendet und Inhalte konsumiert wurden.',
  },
  {
    icon: Shield,
    title: 'Volle Transparenz',
    description:
      'Kein Black-Box-Marketing. Du hast jederzeit Zugriff auf dein Dashboard mit allen Statistiken und Auswertungen.',
  },
  {
    icon: Zap,
    title: 'Schnelles Onboarding',
    description:
      'Innerhalb von 48 Stunden ist alles eingerichtet. Deine Community waechst ab dem ersten Tag.',
  },
  {
    icon: HeartHandshake,
    title: 'Persoenlicher Ansprechpartner',
    description:
      'Kein Chatbot, kein Ticketsystem. Du hast einen direkten Ansprechpartner, der dein Projekt kennt.',
  },
]

function MiniDashboard() {
  return (
    <div className="bg-gray-50 dark:bg-surface-2 rounded-2xl border border-gray-200 dark:border-white/[0.06] p-6 animate-float">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-accent-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
        <div className="ml-auto w-20 h-2 rounded-full bg-gray-200 dark:bg-white/[0.06]" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white dark:bg-surface-3 rounded-lg p-3">
          <div className="text-[10px] text-gray-400 dark:text-muted uppercase tracking-wider">Mitglieder</div>
          <div className="font-mono text-lg font-bold text-gray-900 dark:text-white mt-1">12.847</div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-green-400" />
            <span className="text-[10px] text-green-500">+24%</span>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-3 rounded-lg p-3">
          <div className="text-[10px] text-gray-400 dark:text-muted uppercase tracking-wider">Nachrichten</div>
          <div className="font-mono text-lg font-bold text-gray-900 dark:text-white mt-1">3.291</div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-green-400" />
            <span className="text-[10px] text-green-500">+18%</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-3 rounded-lg p-3">
        <div className="text-[10px] text-gray-400 dark:text-muted uppercase tracking-wider mb-3">Wachstum</div>
        <div className="flex items-end gap-1.5 h-16">
          {[20, 35, 28, 45, 38, 52, 48, 60, 55, 72, 68, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-500/20 to-accent-500/50"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-gray-500 dark:text-muted-light">6 Services aktiv</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          <span className="text-[10px] text-gray-500 dark:text-muted-light">Live</span>
        </div>
      </div>
    </div>
  )
}

function WhyUs() {
  return (
    <section id="why-us" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-4 block">
          VORTEILE
        </span>

        <h2 className="font-display text-4xl md:text-6xl italic text-gray-900 dark:text-white">
          Warum Community-Betreiber
          <br />
          uns vertrauen.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          <div className="lg:col-span-5">
            <MiniDashboard />
          </div>

          <div className="lg:col-span-7">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className={`flex gap-4 py-5 group hover:pl-2 transition-all duration-300 ${
                    index < benefits.length - 1 ? 'border-b border-gray-200 dark:border-white/[0.04]' : ''
                  }`}
                >
                  <div className="bg-accent-500/10 rounded-lg p-2 h-fit flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-muted mt-0.5 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUs
