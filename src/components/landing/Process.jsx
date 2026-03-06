import { MessageSquare, Settings, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Beratung & Strategie',
    description:
      'Wir analysieren deine Community, definieren Zielgruppen und entwickeln eine massgeschneiderte Wachstumsstrategie. Kein Standard - alles individuell auf dich zugeschnitten.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Setup & Umsetzung',
    description:
      'Wir richten alle Services ein: Willkommensnachrichten, Content-Flows, Launch-Kampagnen. Du behaeltst die volle Kontrolle ueber dein Dashboard.',
    icon: Settings,
  },
  {
    number: '03',
    title: 'Wachstum & Ergebnisse',
    description:
      'Deine Community waechst kontinuierlich. Im Dashboard verfolgst du jeden Fortschritt in Echtzeit - transparent, messbar, nachvollziehbar.',
    icon: TrendingUp,
  },
]

function Process() {
  return (
    <section id="process" className="py-32 px-6 bg-gray-50/50 dark:bg-surface-1/30">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-4 block">
          PROZESS
        </span>

        <h2 className="font-display text-4xl md:text-6xl italic text-gray-900 dark:text-white">
          Drei Schritte.
          <br />
          Null Komplexitaet.
        </h2>

        <div className="flex flex-col gap-0 mt-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-16 ${
                  index < steps.length - 1 ? 'border-b border-gray-200 dark:border-white/[0.04]' : ''
                }`}
              >
                <div className="lg:col-span-2">
                  <span className="font-mono text-8xl lg:text-9xl font-bold text-accent-500/10 leading-none select-none">
                    {step.number}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="font-display text-2xl italic text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 dark:text-muted-light leading-relaxed mt-3">
                    {step.description}
                  </p>
                </div>

                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="w-20 h-20 rounded-2xl bg-accent-500/5 border border-accent-500/10 flex items-center justify-center">
                    <Icon className="w-9 h-9 text-accent-500/60" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Process
