const aboutStats = [
  {
    number: '5+ Jahre',
    label: 'Erfahrung im Community-Management',
  },
  {
    number: '250+',
    label: 'Erfolgreich betreute Communities',
  },
  {
    number: '12 Experten',
    label: 'Im GrowthHub Team',
  },
]

function About() {
  return (
    <section id="about" className="py-32 px-6 bg-gray-50/50 dark:bg-surface-1/30">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-4 block">
          UEBER UNS
        </span>

        <h2 className="font-display text-4xl md:text-6xl italic text-gray-900 dark:text-white">
          Wir leben
          <br />
          Community.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-500 dark:text-muted-light leading-relaxed">
              GrowthHub entstand aus einer einfachen Ueberzeugung: Online-Communities
              sind die kraftvollsten Marketing-Kanaele &mdash; wenn man sie richtig
              aufbaut.
            </p>
            <p className="text-lg text-gray-500 dark:text-muted-light leading-relaxed">
              Unser Team hat ueber 250 Communities in verschiedensten Branchen
              aufgebaut und betreut. Von kleinen Nischen-Gruppen bis zu
              Grossunternehmen mit tausenden Mitgliedern.
            </p>
            <p className="text-lg text-gray-500 dark:text-muted-light leading-relaxed">
              Wir kombinieren datengetriebene Strategien mit persoenlichem Service.
              Jedes Projekt wird individuell betreut, jeder Kunde hat einen festen
              Ansprechpartner.
            </p>
          </div>

          <div className="space-y-4">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-surface-2/60 border border-gray-200 dark:border-white/[0.04] rounded-xl p-5 hover:border-gray-300 dark:hover:border-white/[0.08] transition-colors duration-300"
              >
                <div className="font-mono text-2xl font-bold text-accent-500">
                  {stat.number}
                </div>
                <p className="text-sm text-gray-500 dark:text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
