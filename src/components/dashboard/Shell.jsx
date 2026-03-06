import { useState, useEffect, useMemo, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { getServiceById } from '../../data/mockServices'

const COLLAPSED_KEY = 'growthhub_sidebar_collapsed'

function useBreadcrumb() {
  const location = useLocation()

  return useMemo(() => {
    const path = location.pathname
    const crumbs = ['Dashboard']

    if (path === '/dashboard') {
      crumbs.push('Uebersicht')
    } else if (path.startsWith('/dashboard/services/')) {
      const serviceId = path.split('/dashboard/services/')[1]
      const service = getServiceById(serviceId)
      crumbs.push('Services')
      if (service) {
        crumbs.push(service.title)
      }
    } else if (path === '/dashboard/settings') {
      crumbs.push('Einstellungen')
    } else if (path === '/dashboard/support') {
      crumbs.push('Support')
    }

    return crumbs
  }, [location.pathname])
}

export default function Shell() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSED_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const breadcrumb = useBreadcrumb()
  const location = useLocation()

  const handleToggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem(COLLAPSED_KEY, String(next))
      } catch {
        // storage unavailable
      }
      return next
    })
  }, [])

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false)
  }, [])

  const handleMenuClick = useCallback(() => {
    setMobileOpen(true)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const contentMargin = collapsed ? 'md:ml-16' : 'md:ml-56'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-0">
      <Sidebar
        collapsed={collapsed}
        onToggle={handleToggle}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />

      <div className={`${contentMargin} transition-all duration-300`}>
        <Header breadcrumb={breadcrumb} onMenuClick={handleMenuClick} />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
