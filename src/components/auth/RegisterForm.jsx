import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Lock, Building2, Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import Input from '../ui/Input'

const registerSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().min(1, 'E-Mail ist erforderlich').email('Ungueltige E-Mail-Adresse'),
  password: z
    .string()
    .min(1, 'Passwort ist erforderlich')
    .min(8, 'Passwort muss mindestens 8 Zeichen lang sein'),
  company: z.string().optional(),
})

export default function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setServerError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        company: form.company || undefined,
      })
      navigate('/dashboard')
    } catch (err) {
      setServerError(err?.message || 'Registrierung fehlgeschlagen. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl italic text-gray-900 dark:text-white mb-1">
        Konto erstellen
      </h2>
      <p className="text-sm text-gray-500 dark:text-muted mb-8">
        Starte jetzt mit GrowthHub.
      </p>

      {serverError && (
        <div className="bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-4 py-3 mb-6">
          <p className="text-red-600 dark:text-red-400 text-sm">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Dein vollstaendiger Name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          icon={User}
          required
        />

        <Input
          label="E-Mail"
          name="email"
          type="email"
          placeholder="name@beispiel.de"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
          required
        />

        <div className="relative">
          <Input
            label="Passwort"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mindestens 8 Zeichen"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-[38px] text-gray-400 dark:text-muted hover:text-gray-600 dark:hover:text-muted-light transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        <Input
          label="Unternehmen"
          name="company"
          type="text"
          placeholder="Optional"
          value={form.company}
          onChange={handleChange}
          error={errors.company}
          icon={Building2}
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-2"
        >
          Registrieren
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-muted mt-6">
        Bereits ein Konto?{' '}
        <Link
          to="/login"
          className="text-accent-500 hover:text-accent-400 transition-colors"
        >
          Anmelden
        </Link>
      </p>
    </div>
  )
}
