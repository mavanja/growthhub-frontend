import { useState, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import {
  Users,
  MessageSquareHeart,
  Send,
  Rocket,
  Megaphone,
  Mail,
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  AlertCircle,
} from 'lucide-react'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { getServiceById } from '../../data/mockServices'
import { generateMockRecords, mockTrends } from '../../data/mockDashboard'
import { mockInvitations } from '../../data/mockInvitations'
import { formatNumber, formatDate } from '../../utils/formatters'
import { STATUS_LABELS } from '../../utils/constants'
import useDebounce from '../../hooks/useDebounce'
import useExport from '../../hooks/useExport'
import KPICard from '../ui/KPICard'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Input from '../ui/Input'
import EmptyState from '../ui/EmptyState'

const ICON_MAP = {
  Users,
  MessageSquareHeart,
  Send,
  Rocket,
  Megaphone,
  Mail,
}

const PIE_COLORS = {
  sent: '#3b82f6',
  delivered: '#22c55e',
  opened: '#10b981',
  failed: '#ef4444',
  pending: '#1877F2',
}

const allRecords = generateMockRecords(200)

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-surface-3 border border-gray-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-sm shadow-xl">
      {label && <p className="text-gray-500 dark:text-muted-light text-xs mb-1">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.dataKey || entry.name} style={{ color: entry.color || entry.payload?.fill }} className="font-mono text-xs">
          {entry.name}: {formatNumber(entry.value)}
        </p>
      ))}
    </div>
  )
}

function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="#fafafa" textAnchor="middle" dominantBaseline="central" fontSize={11} fontFamily="JetBrains Mono, monospace">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const TABLE_COLUMNS = [
  { key: 'recipientName', label: 'Empfaenger', sortable: true },
  { key: 'action', label: 'Aktion', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (val) => <Badge status={val} />,
  },
  {
    key: 'timestamp',
    label: 'Datum',
    sortable: true,
    render: (val) => formatDate(val),
  },
]

const EXPORT_COLUMNS = [
  { key: 'recipientName', label: 'Empfaenger' },
  { key: 'action', label: 'Aktion' },
  { key: 'status', label: 'Status' },
  { key: 'timestamp', label: 'Datum' },
]

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const service = getServiceById(serviceId)
  const { exportToCSV, exportToExcel } = useExport()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [exportOpen, setExportOpen] = useState(false)

  const debouncedSearch = useDebounce(searchQuery, 300)

  const serviceRecords = useMemo(
    () => allRecords.filter((r) => r.serviceId === serviceId),
    [serviceId]
  )

  const filteredRecords = useMemo(() => {
    let result = serviceRecords

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      result = result.filter(
        (r) =>
          r.recipientName.toLowerCase().includes(query) ||
          r.action.toLowerCase().includes(query)
      )
    }

    if (statusFilter) {
      result = result.filter((r) => r.status === statusFilter)
    }

    if (dateFrom) {
      const from = new Date(dateFrom)
      result = result.filter((r) => new Date(r.timestamp) >= from)
    }

    if (dateTo) {
      const to = new Date(dateTo)
      to.setHours(23, 59, 59, 999)
      result = result.filter((r) => new Date(r.timestamp) <= to)
    }

    return result
  }, [serviceRecords, debouncedSearch, statusFilter, dateFrom, dateTo])

  const statusDistribution = useMemo(() => {
    const counts = {}
    serviceRecords.forEach((r) => {
      counts[r.status] = (counts[r.status] || 0) + 1
    })
    return Object.entries(counts).map(([status, count]) => ({
      name: STATUS_LABELS[status] || status,
      value: count,
      fill: PIE_COLORS[status] || '#71717a',
    }))
  }, [serviceRecords])

  const kpiValues = useMemo(() => {
    const total = serviceRecords.length
    const delivered = serviceRecords.filter((r) => r.status === 'delivered').length
    const opened = serviceRecords.filter((r) => r.status === 'opened').length
    const failed = serviceRecords.filter((r) => r.status === 'failed').length

    return [
      { value: formatNumber(total), trend: 12.5 },
      { value: total > 0 ? `${((delivered / total) * 100).toFixed(1)}%` : '0%', trend: 3.8 },
      { value: total > 0 ? `${((opened / total) * 100).toFixed(1)}%` : '0%', trend: 5.2 },
      { value: total > 0 ? `${((failed / total) * 100).toFixed(1)}%` : '0%', trend: -1.4 },
    ]
  }, [serviceRecords])

  const handleReset = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('')
    setDateFrom('')
    setDateTo('')
  }, [])

  const handleExportCSV = useCallback(() => {
    exportToCSV(filteredRecords, EXPORT_COLUMNS, `${serviceId}-export`)
    setExportOpen(false)
  }, [filteredRecords, serviceId, exportToCSV])

  const handleExportExcel = useCallback(() => {
    exportToExcel(filteredRecords, EXPORT_COLUMNS, `${serviceId}-export`)
    setExportOpen(false)
  }, [filteredRecords, serviceId, exportToExcel])

  if (!service) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Service nicht gefunden"
        message="Der angeforderte Service existiert nicht."
      />
    )
  }

  const Icon = ICON_MAP[service.iconName] || Users
  const kpiLabels = service.kpiLabels

  return (
    <div className="space-y-6">
      {/* Service Header */}
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-accent-500/10 text-accent-500 p-3">
          <Icon className="w-7 h-7" />
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
        {kpiLabels.map((label, idx) => (
          <KPICard
            key={label}
            title={label}
            value={kpiValues[idx].value}
            icon={Icon}
            trend={kpiValues[idx].trend}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart */}
        <Card>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrends}>
                <CartesianGrid stroke="rgba(0,0,0,0.08)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                  tickLine={false}
                  tickFormatter={(d) => {
                    const dt = new Date(d)
                    return `${dt.getDate()}.${dt.getMonth() + 1}.`
                  }}
                />
                <YAxis
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="messages"
                  name="Nachrichten"
                  stroke="#1877F2"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#1877F2' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Status-Verteilung</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={PieLabel}
                >
                  {statusDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {statusDistribution.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-muted-light">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.fill }}
                />
                {entry.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters Row */}
      <Card className="!p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full sm:w-auto">
            <label className="block text-xs text-gray-500 dark:text-muted-light mb-1">Von</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-gray-50 dark:bg-surface-2 border border-gray-200 dark:border-white/[0.06] rounded-lg text-gray-900 dark:text-white text-sm px-3 py-2 outline-none focus:border-accent-500/50 transition-colors"
            />
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-xs text-gray-500 dark:text-muted-light mb-1">Bis</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-gray-50 dark:bg-surface-2 border border-gray-200 dark:border-white/[0.06] rounded-lg text-gray-900 dark:text-white text-sm px-3 py-2 outline-none focus:border-accent-500/50 transition-colors"
            />
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-xs text-gray-500 dark:text-muted-light mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 dark:bg-surface-2 border border-gray-200 dark:border-white/[0.06] rounded-lg text-gray-900 dark:text-white text-sm px-3 py-2 outline-none focus:border-accent-500/50 transition-colors min-w-[140px]"
            >
              <option value="">Alle</option>
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <Input
              placeholder="Suchen..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Zuruecksetzen
          </Button>

          {/* Export Dropdown */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setExportOpen((prev) => !prev)}
            >
              <Download className="w-4 h-4" />
              Exportieren
            </Button>
            {exportOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-surface-3 border border-gray-200 dark:border-white/[0.06] rounded-lg shadow-xl p-1 z-20">
                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-md transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  CSV
                </button>
                <button
                  onClick={handleExportExcel}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-md transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <DataTable columns={TABLE_COLUMNS} data={filteredRecords} pageSize={10} />

      {/* Invitation Table - only for Community-Wachstum */}
      {serviceId === 'community-wachstum' && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Auszaehlung – Eingeladene Mitglieder
            </h2>
            <span className="text-xs text-gray-400 dark:text-muted">
              {mockInvitations.filter((i) => i.joinedAt).length}/{mockInvitations.length} beigetreten
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
                {mockInvitations.map((inv) => (
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
      )}
    </div>
  )
}
