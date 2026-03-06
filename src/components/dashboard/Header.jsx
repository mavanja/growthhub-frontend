import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Settings, HelpCircle, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function UserAvatar({ name }) {
  const initials = (name || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="w-8 h-8 rounded-full bg-accent-500/10 text-accent-500 flex items-center justify-center text-sm font-semibold">
      {initials}
    </div>
  )
}

export default function Header({ breadcrumb, onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false)
    }
  }, [])

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen, handleClickOutside])

  const handleLogout = () => {
    setDropdownOpen(false)
    logout()
    navigate('/login')
  }

  const handleNavigate = (path) => {
    setDropdownOpen(false)
    navigate(path)
  }

  return (
    <header className="h-14 bg-white/80 dark:bg-surface-0/80 backdrop-blur-md border-b border-gray-200 dark:border-white/[0.04] sticky top-0 z-30 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {breadcrumb && (
          <nav className="text-sm text-gray-500 dark:text-muted-light flex items-center gap-1.5">
            {breadcrumb.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <span className="text-gray-300 dark:text-muted-dark">/</span>}
                <span className={idx === breadcrumb.length - 1 ? 'text-gray-900 dark:text-white' : ''}>
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors"
        >
          <UserAvatar name={user?.name} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-56 bg-white dark:bg-surface-3 border border-gray-200 dark:border-white/[0.06] rounded-lg shadow-xl p-1 z-50">
            <div className="px-3 py-2">
              <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                {user?.name || 'Benutzer'}
              </p>
              <p className="text-xs text-gray-500 dark:text-muted truncate">
                {user?.email || ''}
              </p>
            </div>

            <div className="my-1 border-t border-gray-200 dark:border-white/[0.06]" />

            <button
              onClick={() => handleNavigate('/dashboard/settings')}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-md transition-colors"
            >
              <Settings className="w-4 h-4" />
              Einstellungen
            </button>
            <button
              onClick={() => handleNavigate('/dashboard/support')}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-md transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Support
            </button>

            <div className="my-1 border-t border-gray-200 dark:border-white/[0.06]" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Abmelden
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
