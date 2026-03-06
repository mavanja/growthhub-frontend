import { useState, useCallback } from 'react'
import { ChevronDown, Send } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const FAQ_ITEMS = [
  {
    question: 'Wie funktioniert die Mitglieder-Vermittlung?',
    answer:
      'Unsere KI analysiert deine Zielgruppe und vermittelt qualifizierte Mitglieder direkt in deine Online-Community. Jedes Profil wird auf Qualitaet und Relevanz geprueft, bevor es zugeordnet wird. Du siehst alle Vermittlungen in Echtzeit in deinem Dashboard.',
  },
  {
    question: 'Kann ich Services einzeln buchen?',
    answer:
      'Ja, alle Services koennen einzeln oder als Bundle gebucht werden. Du kannst jederzeit weitere Services hinzufuegen oder bestehende pausieren. Kontaktiere uns fuer individuelle Pakete.',
  },
  {
    question: 'Wie sehe ich meine Statistiken?',
    answer:
      'Alle Statistiken findest du in deinem Dashboard unter dem jeweiligen Service. Du kannst Daten filtern, exportieren und detaillierte Auswertungen einsehen. Die Daten werden in Echtzeit aktualisiert.',
  },
  {
    question: 'Gibt es eine Mindestlaufzeit?',
    answer:
      'Nein, es gibt keine Mindestlaufzeit. Du kannst monatlich kuendigen. Wir empfehlen jedoch eine Laufzeit von mindestens 3 Monaten, um optimale Ergebnisse zu erzielen.',
  },
  {
    question: 'Wie erreiche ich den Support?',
    answer:
      'Du kannst uns ueber das Kontaktformular auf dieser Seite erreichen. Alternativ per E-Mail an support@growthhub.de oder telefonisch unter +49 30 123 456 78. Unser Support-Team ist Mo-Fr von 9-18 Uhr erreichbar.',
  },
]

const CATEGORIES = ['Allgemein', 'Technisch', 'Abrechnung', 'Feature-Wunsch']

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="bg-gray-50 dark:bg-surface-2/60 border border-gray-200 dark:border-white/[0.04] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 dark:text-muted flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-3 border-t border-gray-200 dark:border-white/[0.04]">
          <p className="text-sm text-gray-500 dark:text-muted-light pt-3 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null)

  const [form, setForm] = useState({
    subject: '',
    category: 'Allgemein',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleFaqToggle = useCallback((index) => {
    setOpenFaq((prev) => (prev === index ? null : index))
  }, [])

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSubmitted(false)
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!form.subject.trim() || !form.message.trim()) {
        return
      }
      setSubmitted(true)
      setForm({ subject: '', category: 'Allgemein', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    },
    [form]
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Haeufig gestellte Fragen
          </h2>
          {FAQ_ITEMS.map((item, idx) => (
            <AccordionItem
              key={idx}
              question={item.question}
              answer={item.answer}
              isOpen={openFaq === idx}
              onToggle={() => handleFaqToggle(idx)}
            />
          ))}
        </div>

        <Card>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
            Kontaktiere uns
          </h2>

          {submitted && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-[#22c55e]/10 border border-green-200 dark:border-[#22c55e]/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-[#22c55e] font-medium">
                Nachricht erfolgreich gesendet! Wir melden uns in Kuerze bei dir.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Betreff"
              name="subject"
              value={form.subject}
              onChange={handleFormChange}
              placeholder="Worum geht es?"
              required
            />

            <div className="w-full">
              <label className="block text-sm text-gray-600 dark:text-muted-light font-medium mb-1.5">
                Kategorie
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleFormChange}
                className="w-full bg-gray-50 dark:bg-surface-2 border border-gray-200 dark:border-white/[0.06] rounded-lg text-gray-900 dark:text-white text-sm px-4 py-2.5 outline-none focus:border-accent-500/50 transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm text-gray-600 dark:text-muted-light font-medium mb-1.5">
                Nachricht <span className="text-accent-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleFormChange}
                placeholder="Beschreibe dein Anliegen..."
                required
                rows={5}
                className="w-full bg-gray-50 dark:bg-surface-2 border border-gray-200 dark:border-white/[0.06] rounded-lg text-gray-900 dark:text-white text-sm px-4 py-2.5 outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/20 transition-all duration-200 resize-none placeholder:text-gray-400 dark:placeholder:text-muted"
              />
            </div>

            <Button type="submit">
              <Send className="w-4 h-4" />
              Nachricht senden
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
