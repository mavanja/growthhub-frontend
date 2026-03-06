const linkGroups = [
  {
    items: [
      { label: 'Services', href: '#services' },
      { label: 'Prozess', href: '#process' },
      { label: 'Kontakt', href: '#contact' },
    ],
  },
  {
    items: [
      { label: 'Login', href: '/login' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'Impressum', href: '/impressum' },
    ],
  },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-16 px-6 border-t border-gray-200 dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <a href="/" className="font-display text-xl italic tracking-tight text-gray-900 dark:text-white">
              GrowthHub<span className="text-accent-500">.</span>
            </a>
            <p className="text-sm text-gray-500 dark:text-muted mt-3 max-w-xs">
              Premium Community Management. Qualifizierte Mitglieder, automatisiertes
              Onboarding, messbare Ergebnisse.
            </p>
          </div>

          <div className="flex gap-16">
            {linkGroups.map((group, groupIndex) => (
              <ul key={groupIndex} className="space-y-3">
                {group.items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/[0.04]">
          <p className="text-xs text-gray-400 dark:text-muted-dark">
            &copy; {year} GrowthHub. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
