import { useState, useMemo, useCallback } from 'react'
import { ClipboardList, Search, Download } from 'lucide-react'
import { mockInvitations, INVITER_ACCOUNTS } from '../../data/mockInvitations'
import { formatDate } from '../../utils/formatters'
import KPICard from '../ui/KPICard'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import useExport from '../../hooks/useExport'

const CSV_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'profileLink', label: 'Profil-Link' },
  { key: 'invitedAt', label: 'Eingeladen am' },
  { key: 'joinedAt', label: 'Beigetreten' },
  { key: 'invitedBy', label: 'Eingeladen von' },
]

export default function AuszaehlungView({ service }) {
  const { exportToCSV } = useExport()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [inviterFilter, setInviterFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filteredInvitations = useMemo(() => {
    let result = mockInvitations

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((inv) => inv.name.toLowerCase().includes(q))
    }

    if (statusFilter === 'joined') {
      result = result.filter((inv) => inv.joinedAt)
    } else if (statusFilter === 'pending') {
      result = result.filter((inv) => !inv.joinedAt)
    }

    if (inviterFilter) {
      result = result.filter((inv) => inv.invitedBy === inviterFilter)
    }

    if (dateFrom) {
      result = result.filter((inv) => inv.invitedAt >= dateFrom)
    }

    if (dateTo) {
      result = result.filter((inv) => inv.invitedAt <= dateTo)
    }

    return result
  }, [searchQuery, statusFilter, inviterFilter, dateFrom, dateTo])

  const handleReset = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('')
    setInviterFilter('')
    setDateFrom('')
    setDateTo('')
  }, [])

  const totalInvited = mockInvitations.length
  const totalJoined = mockInvitations.filter((i) => i.joinedAt).length
  const totalPending = totalInvited - totalJoined
  const joinRate = ((totalJoined / totalInvited) * 100).toFixed(1)

  const inputClass = 'bg-gray-50 dark:bg-surface-2 border border-gray-200 dark:border-white/[0.06] rounded-lg text-gray-900 dark:text-white text-sm px-3 py-2 outline-none focus:border-accent-500/50 transition-colors'

  return (
    <div className="space-y-6">
      {/* Service Header */}
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-accent-500/10 text-accent-500 p-3">
          <ClipboardList className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-display text-2xl italic text-gray-900 dark:text-white">
            {service.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-muted-light mt-1">{service.description}</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Eingeladen gesamt" value={String(totalInvited)} icon={ClipboardList} trend={14.2} previousValue="18" />
        <KPICard title="Beigetreten" value={String(totalJoined)} icon={ClipboardList} trend={11.8} previousValue="16" />
        <KPICard title="Ausstehend" value={String(totalPending)} icon={ClipboardList} trend={-8.3} previousValue="4" />
        <KPICard title="Beitrittsrate" value={`${joinRate}%`} icon={ClipboardList} trend={2.1} previousValue="84.2%" />
      </div>

      {/* Filters */}
      <Card className="!p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full sm:w-auto">
            <label className="block text-xs text-gray-500 dark:text-muted-light mb-1">Von</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-xs text-gray-500 dark:text-muted-light mb-1">Bis</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-xs text-gray-500 dark:text-muted-light mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`${inputClass} min-w-[140px]`}
            >
              <option value="">Alle</option>
              <option value="joined">Beigetreten</option>
              <option value="pending">Ausstehend</option>
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-xs text-gray-500 dark:text-muted-light mb-1">Eingeladen von</label>
            <select
              value={inviterFilter}
              onChange={(e) => setInviterFilter(e.target.value)}
              className={`${inputClass} min-w-[160px]`}
            >
              <option value="">Alle Accounts</option>
              {INVITER_ACCOUNTS.map((acc) => (
                <option key={acc.profileId} value={acc.name}>{acc.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <Input
              placeholder="Name suchen..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Zuruecksetzen
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportToCSV(
              filteredInvitations.map((inv) => ({
                ...inv,
                joinedAt: inv.joinedAt || 'Ausstehend',
              })),
              CSV_COLUMNS,
              'auszaehlung-export'
            )}
          >
            <Download className="w-4 h-4" />
            CSV Export
          </Button>
        </div>
      </Card>

      {/* Invitation Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Eingeladene Mitglieder
          </h2>
          <span className="text-xs text-gray-400 dark:text-muted">
            {filteredInvitations.filter((i) => i.joinedAt).length}/{filteredInvitations.length} beigetreten
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/[0.06]">
                <th className="text-left py-2.5 px-3 text-xs font-medium text-gray-500 dark:text-muted uppercase tracking-wider">Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-gray-500 dark:text-muted uppercase tracking-wider">Profil</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-gray-500 dark:text-muted uppercase tracking-wider">Eingeladen am</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-gray-500 dark:text-muted uppercase tracking-wider">Beigetreten</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-gray-500 dark:text-muted uppercase tracking-wider">Eingeladen von</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.04]">
              {filteredInvitations.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-gray-400 dark:text-muted">
                    Keine Einladungen fuer die gewaehlten Filter gefunden.
                  </td>
                </tr>
              )}
              {filteredInvitations.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 text-gray-900 dark:text-white font-medium">{inv.name}</td>
                  <td className="py-2.5 px-3">
                    <a
                      href={inv.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-500 hover:text-accent-400 text-xs underline underline-offset-2 transition-colors"
                    >
                      Profil ansehen
                    </a>
                  </td>
                  <td className="py-2.5 px-3 text-gray-500 dark:text-muted-light">{formatDate(inv.invitedAt)}</td>
                  <td className="py-2.5 px-3">
                    {inv.joinedAt ? (
                      <span className="inline-flex items-center gap-1.5 text-[#22c55e] text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                        {formatDate(inv.joinedAt)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-gray-400 dark:text-muted text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-muted" />
                        Ausstehend
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-gray-500 dark:text-muted-light">{inv.invitedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
