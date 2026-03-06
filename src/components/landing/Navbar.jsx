import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Prozess', href: '#process' },
  { label: 'Gruppen-Analyse', href: '/analyze' },
  { label: 'Kontakt', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-surface-0/80 backdrop-blur-md border-b border-gray-200 dark:border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-xl italic tracking-tight text-gray-900 dark:text-white">
          GrowthHub<span className="text-accent-500">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="/login"
            className="text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Login
          </a>
          <a
            href="#contact"
            className="bg-accent-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-400 transition-colors"
          >
            Anfrage starten
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            className="text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-surface-1/95 backdrop-blur-md border-b border-gray-200 dark:border-white/[0.06] px-6 pb-6 pt-2">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white transition-colors py-1"
                onClick={closeMobile}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-gray-200 dark:border-white/[0.06]" />
            <a
              href="/login"
              className="text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white transition-colors py-1"
              onClick={closeMobile}
            >
              Login
            </a>
            <a
              href="#contact"
              className="bg-accent-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-accent-400 transition-colors"
              onClick={closeMobile}
            >
              Anfrage starten
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
