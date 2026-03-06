import { ArrowDown } from 'lucide-react'

function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 50% 30%, rgba(24, 119, 242, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-32">
        <div className="opacity-0 animate-fade-up">
          <span className="inline-flex items-center gap-2 border border-accent-500/20 bg-accent-500/5 rounded-full px-4 py-1.5">
            <span className="glow-dot flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-muted-light">
              Community-Wachstum neu definiert
            </span>
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl italic leading-[0.95] mt-8 opacity-0 animate-fade-up-1 text-gray-900 dark:text-white">
          Deine Community
          <br />
          verdient <span className="text-accent-500">mehr</span>.
        </h1>

        <p className="text-lg md:text-xl text-gray-500 dark:text-muted-light max-w-2xl mx-auto mt-6 leading-relaxed font-body opacity-0 animate-fade-up-2">
          Wir vermitteln qualifizierte Mitglieder, automatisieren dein Onboarding und
          liefern messbare Ergebnisse. Alles in einem Dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0 animate-fade-up-3">
          <a
            href="#contact"
            className="bg-accent-500 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-accent-400 transition-colors text-sm"
          >
            Anfrage starten
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-muted-light px-8 py-3.5 rounded-lg hover:border-gray-300 dark:hover:border-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all text-sm"
          >
            Mehr erfahren
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
