import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { services } from '../data/mockServices'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`
        relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0
        ${enabled ? 'bg-accent-500' : 'bg-gray-200 dark:bg-surface-4'}
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  )
}

function SuccessMessage({ visible }) {
  if (!visible) return null

  return (
    <span className="text-sm text-[#22c55e] font-medium animate-pulse">
      Gespeichert!
    </span>
  )
}

export default function Settings() {
  const { user, updateUser } = useAuth()

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
  })
  const [profileSaved, setProfileSaved] = useState(false)

  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  })
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const [notifications, setNotifications] = useState(() =>
    services.reduce((acc, service) => ({ ...acc, [service.id]: true }), {})
  )
  const [notificationsSaved, setNotificationsSaved] = useState(false)

  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
    setProfileSaved(false)
  }, [])

  const handleProfileSave = useCallback(() => {
    updateUser({
      name: profile.name,
      email: profile.email,
      company: profile.company,
    })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }, [profile, updateUser])

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
    setPasswordSaved(false)
    setPasswordError('')
  }, [])

  const handlePasswordSave = useCallback(() => {
    if (!passwords.current || !passwords.newPassword || !passwords.confirm) {
      setPasswordError('Bitte alle Felder ausfuellen.')
      return
    }
    if (passwords.newPassword !== passwords.confirm) {
      setPasswordError('Passwoerter stimmen nicht ueberein.')
      return
    }
    if (passwords.newPassword.length < 8) {
      setPasswordError('Passwort muss mindestens 8 Zeichen lang sein.')
      return
    }
    setPasswords({ current: '', newPassword: '', confirm: '' })
    setPasswordError('')
    setPasswordSaved(true)
    setTimeout(() => setPasswordSaved(false), 3000)
  }, [passwords])

  const handleToggleNotification = useCallback((serviceId) => {
    setNotifications((prev) => ({ ...prev, [serviceId]: !prev[serviceId] }))
    setNotificationsSaved(false)
  }, [])

  const handleNotificationsSave = useCallback(() => {
    setNotificationsSaved(true)
    setTimeout(() => setNotificationsSaved(false), 3000)
  }, [])

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Einstellungen</h1>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Profil</h2>
          <SuccessMessage visible={profileSaved} />
        </div>
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Dein Name"
          />
          <Input
            label="E-Mail"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="deine@email.de"
          />
          <Input
            label="Unternehmen"
            name="company"
            value={profile.company}
            onChange={handleProfileChange}
            placeholder="Firmenname"
          />
          <Button onClick={handleProfileSave}>Speichern</Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Passwort</h2>
          <SuccessMessage visible={passwordSaved} />
        </div>
        <div className="space-y-4">
          <Input
            label="Aktuelles Passwort"
            name="current"
            type="password"
            value={passwords.current}
            onChange={handlePasswordChange}
            placeholder="Aktuelles Passwort"
          />
          <Input
            label="Neues Passwort"
            name="newPassword"
            type="password"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            placeholder="Neues Passwort"
          />
          <Input
            label="Passwort bestaetigen"
            name="confirm"
            type="password"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            placeholder="Passwort wiederholen"
            error={passwordError}
          />
          <Button onClick={handlePasswordSave}>Passwort aendern</Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Benachrichtigungen</h2>
          <SuccessMessage visible={notificationsSaved} />
        </div>
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between py-2"
            >
              <span className="text-sm text-gray-600 dark:text-muted-light">{service.title}</span>
              <ToggleSwitch
                enabled={notifications[service.id]}
                onChange={() => handleToggleNotification(service.id)}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={handleNotificationsSave}>Speichern</Button>
        </div>
      </Card>
    </div>
  )
}
