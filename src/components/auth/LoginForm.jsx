import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import Input from '../ui/Input'

const loginSchema = z.object({
  email: z.string().min(1, 'E-Mail ist erforderlich').email('Ungueltige E-Mail-Adresse'),
  password: z.string().min(1, 'Passwort ist erforderlich'),
})

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
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

    const result = loginSchema.safeParse(form)
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
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setServerError(err?.message || 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl italic text-gray-900 dark:text-white mb-1">
        Willkommen zurueck
      </h2>
      <p className="text-sm text-gray-500 dark:text-muted mb-8">
        Melde dich an, um fortzufahren.
      </p>

      {serverError && (
        <div className="bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-4 py-3 mb-6">
          <p className="text-red-600 dark:text-red-400 text-sm">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-Mail"
          name="email"
          type="email"
          placeholder="name@beispiel.de"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
        />

        <div className="relative">
          <Input
            label="Passwort"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Dein Passwort"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
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

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs text-gray-400 dark:text-muted hover:text-accent-500 transition-colors"
          >
            Passwort vergessen?
          </Link>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Anmelden
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-white/[0.06]" />
        <span className="text-xs text-gray-400 dark:text-muted">oder</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-white/[0.06]" />
      </div>

      <Link to="/register">
        <Button variant="secondary" className="w-full">
          Konto erstellen
        </Button>
      </Link>
    </div>
  )
}
