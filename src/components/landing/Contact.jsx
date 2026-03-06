import { useState, useCallback } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { services } from '../../data/mockServices'
import { supabase } from '../../lib/supabase'

const initialForm = {
  name: '',
  email: '',
  company: '',
  message: '',
  selectedServices: [],
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleServiceToggle = useCallback((serviceId) => {
    setForm((prev) => {
      const exists = prev.selectedServices.includes(serviceId)
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((id) => id !== serviceId)
          : [...prev.selectedServices, serviceId],
      }
    })
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!form.name || !form.email || !form.message) return
      try {
        await supabase.from('contact_requests').insert({
          name: form.name,
          email: form.email,
          company: form.company,
          services: form.selectedServices,
          message: form.message,
        })
      } catch {
        // Still show success to user
      }
      setSubmitted(true)
    },
    [form.name, form.email, form.message, form.company, form.selectedServices]
  )

  const inputClasses =
    'w-full bg-gray-50 dark:bg-surface-2 border border-gray-200 dark:border-white/[0.06] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-muted focus:outline-none focus:border-accent-500/40 transition-colors'

  if (submitted) {
    return (
      <section id="contact" className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-accent-500 mx-auto" />
          <h2 className="font-display text-4xl italic text-gray-900 dark:text-white mt-6">
            Nachricht gesendet
          </h2>
          <p className="text-gray-500 dark:text-muted-light text-lg mt-4 leading-relaxed">
            Vielen Dank fuer deine Anfrage. Wir melden uns innerhalb von 24 Stunden
            bei dir.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-4 block">
          Kontakt
        </span>
        <h2 className="font-display text-4xl md:text-5xl italic text-gray-900 dark:text-white">
          Lass uns sprechen
        </h2>
        <p className="text-gray-500 dark:text-muted-light text-lg max-w-xl mt-4 leading-relaxed">
          Bereit, deine Community auf das naechste Level zu bringen? Schreib uns
          und wir erstellen ein individuelles Angebot fuer dich.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Warum mit uns arbeiten?
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Bewiesene Ergebnisse mit ueber 10.000 vermittelten Mitgliedern',
                  'Transparentes Dashboard mit Echtzeit-Tracking',
                  'Dedizierter Ansprechpartner fuer dein Projekt',
                  'Flexible Services, individuell anpassbar',
                  'Keine Vertragsbindung, jederzeit kuendbar',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="glow-dot mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-muted-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Schnelle Antwort</h3>
              <p className="text-sm text-gray-500 dark:text-muted-light mt-2 leading-relaxed">
                Wir antworten auf jede Anfrage innerhalb von 24 Stunden. Fuer
                dringende Anliegen stehen wir auch per Direktnachricht zur
                Verfuegung.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-8 space-y-5"
          >
            <div>
              <label htmlFor="contact-name" className="text-sm text-gray-600 dark:text-muted-light block mb-1.5">
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Dein Name"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-sm text-gray-600 dark:text-muted-light block mb-1.5">
                Email *
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="deine@email.de"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="contact-company" className="text-sm text-gray-600 dark:text-muted-light block mb-1.5">
                Unternehmen
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Optional"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-muted-light block mb-2">
                Welche Services interessieren dich?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((service) => {
                  const isSelected = form.selectedServices.includes(service.id)
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceToggle(service.id)}
                      className={`text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-accent-500/40 bg-accent-500/10 text-accent-600 dark:text-accent-400'
                          : 'border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-surface-3/50 text-gray-600 dark:text-muted-light hover:border-gray-300 dark:hover:border-white/[0.1]'
                      }`}
                    >
                      {service.title}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm text-gray-600 dark:text-muted-light block mb-1.5">
                Nachricht *
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Erzaehl uns von deinem Projekt..."
                rows={4}
                className={`${inputClasses} resize-none`}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent-500 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-accent-400 transition-colors text-sm inline-flex items-center justify-center gap-2"
            >
              Nachricht senden
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
