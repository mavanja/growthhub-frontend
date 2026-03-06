import { Check } from 'lucide-react'

const features = [
  'Persoenliches Beratungsgespraech',
  'Individueller Service-Mix',
  'Massgeschneiderte Strategie',
  'Echtzeit-Dashboard & Reporting',
  'Dedizierter Ansprechpartner',
  'Flexibel anpassbar',
]

function Pricing() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-4 block">
            Preise
          </span>
          <h2 className="font-display text-4xl md:text-5xl italic text-gray-900 dark:text-white">
            Individuell. Transparent.
          </h2>
          <p className="text-gray-500 dark:text-muted-light text-lg max-w-xl mx-auto mt-4 leading-relaxed">
            Jedes Projekt ist einzigartig &ndash; genau wie unser Angebot fuer dich.
          </p>
        </div>

        <div className="max-w-xl mx-auto mt-16">
          <div className="bg-white dark:bg-surface-2/80 border border-accent-500/20 rounded-2xl p-10">
            <h3 className="font-display text-3xl italic text-gray-900 dark:text-white">
              Preis auf Anfrage
            </h3>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="text-accent-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-muted-light">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="block w-full bg-accent-500 text-white text-center px-8 py-3.5 rounded-lg font-semibold hover:bg-accent-400 transition-colors text-sm mt-10"
            >
              Angebot anfragen
            </a>

            <p className="text-xs text-gray-400 dark:text-muted text-center mt-4">
              Unverbindlich und kostenlos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
