import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  MessageSquareHeart,
  Send,
  Rocket,
  Megaphone,
  Mail,
  ClipboardList,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Sun,
  Moon,
} from 'lucide-react'
import { services } from '../../data/mockServices'
import { useTheme } from '../../context/ThemeContext'

const ICON_MAP = {
  Users,
  MessageSquareHeart,
  Send,
  Rocket,
  Megaphone,
  Mail,
  ClipboardList,
}

const navLinkBase =
  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200'
const navLinkInactive =
  'text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.02]'
const navLinkActive =
  'bg-gray-100 dark:bg-white/[0.04] text-gray-900 dark:text-white border-r-2 border-accent-500'

function SidebarLink({ to, icon: Icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive} ${collapsed ? 'justify-center px-0' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  )
}

function Divider({ label, collapsed }) {
  if (collapsed) {
    return <div className="my-3 mx-2 border-t border-gray-200 dark:border-white/[0.04]" />
  }

  return (
    <div className="my-3 px-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 border-t border-gray-200 dark:border-white/[0.04]" />
        {label && (
          <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-muted-dark font-medium">
            {label}
          </span>
        )}
        <div className="flex-1 border-t border-gray-200 dark:border-white/[0.04]" />
      </div>
    </div>
  )
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const sidebarWidth = collapsed ? 'w-16' : 'w-56'
  const { theme, toggleTheme } = useTheme()

  const sidebarContent = (
    <div
      className={`flex flex-col h-screen bg-white dark:bg-surface-1 border-r border-gray-200 dark:border-white/[0.04] ${sidebarWidth} transition-all duration-300`}
    >
      <div className="h-14 flex items-center px-4 border-b border-gray-200 dark:border-white/[0.04] flex-shrink-0">
        {collapsed ? (
          <span className="font-display italic text-xl text-gray-900 dark:text-white mx-auto">
            G<span className="text-accent-500">.</span>
          </span>
        ) : (
          <span className="font-display italic text-xl text-gray-900 dark:text-white">
            GrowthHub<span className="text-accent-500">.</span>
          </span>
        )}
        {mobileOpen && (
          <button
            onClick={onMobileClose}
            className="ml-auto text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <SidebarLink
          to="/dashboard"
          icon={LayoutDashboard}
          label="Uebersicht"
          collapsed={collapsed}
        />

        <Divider label="SERVICES" collapsed={collapsed} />

        {services.map((service) => {
          const Icon = ICON_MAP[service.iconName] || LayoutDashboard
          return (
            <SidebarLink
              key={service.id}
              to={`/dashboard/services/${service.id}`}
              icon={Icon}
              label={service.title}
              collapsed={collapsed}
            />
          )
        })}

        <Divider collapsed={collapsed} />

        <SidebarLink
          to="/dashboard/settings"
          icon={Settings}
          label="Einstellungen"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/dashboard/support"
          icon={HelpCircle}
          label="Support"
          collapsed={collapsed}
        />
      </nav>

      <div className="hidden md:flex flex-col border-t border-gray-200 dark:border-white/[0.04] p-2 gap-1">
        <button
          onClick={toggleTheme}
          className={`${navLinkBase} ${navLinkInactive} w-full ${collapsed ? 'justify-center px-0' : ''}`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!collapsed && <span>{theme === 'dark' ? 'Hell' : 'Dunkel'}</span>}
        </button>
        <button
          onClick={onToggle}
          className={`${navLinkBase} ${navLinkInactive} w-full ${collapsed ? 'justify-center px-0' : ''}`}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Einklappen</span>
            </>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden md:block fixed left-0 top-0 h-screen z-40">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="relative z-10 h-screen">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
