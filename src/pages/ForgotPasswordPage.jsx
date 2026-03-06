import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().min(1, 'E-Mail ist erforderlich').email('Ungueltige E-Mail-Adresse'),
})

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = emailSchema.safeParse({ email })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setLoading(true)
    try {
      const { resetPassword } = await import('../services/authService')
      await resetPassword(email)
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      {submitted ? (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-accent-500/10 p-3">
              <CheckCircle className="w-8 h-8 text-accent-500" />
            </div>
          </div>
          <h2 className="font-display text-2xl italic text-gray-900 dark:text-white mb-2">
            E-Mail gesendet
          </h2>
          <p className="text-sm text-gray-500 dark:text-muted mb-8">
            Falls ein Konto mit <span className="text-gray-700 dark:text-muted-light">{email}</span> existiert,
            erhaeltst du eine E-Mail mit Anweisungen zum Zuruecksetzen deines Passworts.
          </p>
          <Link to="/login">
            <Button variant="secondary" className="w-full">
              Zurueck zur Anmeldung
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="font-display text-2xl italic text-gray-900 dark:text-white mb-1">
            Passwort zuruecksetzen
          </h2>
          <p className="text-sm text-gray-500 dark:text-muted mb-8">
            Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zuruecksetzen.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-Mail"
              name="email"
              type="email"
              placeholder="name@beispiel.de"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              error={error}
              icon={Mail}
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Link senden
            </Button>
          </form>

          <Link
            to="/login"
            className="flex items-center justify-center gap-1.5 text-sm text-gray-400 dark:text-muted hover:text-gray-600 dark:hover:text-muted-light transition-colors mt-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurueck zur Anmeldung
          </Link>
        </div>
      )}
    </AuthLayout>
  )
}
