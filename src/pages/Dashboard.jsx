import { useMemo } from 'react'
import { MessageSquare, Users, Eye, TrendingUp, Shield, Calendar } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useAuth } from '../context/AuthContext'
import {
  mockKPIs,
  mockTrends,
  mockServiceBreakdown,
  mockRecentActivity,
} from '../data/mockDashboard'
import { formatNumber, formatRelativeTime } from '../utils/formatters'
import KPICard from '../components/ui/KPICard'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-surface-3 border border-gray-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-sm shadow-xl">
      <p className="text-gray-500 dark:text-muted-light text-xs mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }} className="font-mono text-xs">
          {entry.name}: {formatNumber(entry.value)}
        </p>
      ))}
    </div>
  )
}

function formatShortDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getDate()}.${date.getMonth() + 1}.`
}

export default function Dashboard() {
  const { user } = useAuth()

  const chartData = useMemo(
    () =>
      mockTrends.map((item) => ({
        ...item,
        shortDate: formatShortDate(item.date),
      })),
    []
  )

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <div className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-6">
        <div className="flex items-center gap-5">
          <img
            src="/wasserwissen-logo.jpg"
            alt="Wasserwissen 360°"
            className="w-20 h-20 rounded-xl object-cover shadow-md flex-shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
              Wasserwissen 360°
            </h1>
            <p className="text-sm text-gray-500 dark:text-muted mt-0.5">
              Deine Quelle fuer Gesundheit, Lebenskraft &amp; Vitalitaet
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-muted-light">
                <Users className="w-3.5 h-3.5" />
                <span className="font-semibold text-gray-900 dark:text-white">1.801</span> Mitglieder
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-muted-light">
                <Shield className="w-3.5 h-3.5" />
                Privat
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-muted-light">
                <Calendar className="w-3.5 h-3.5" />
                Seit Nov. 2021
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#22c55e]">
                <TrendingUp className="w-3.5 h-3.5" />
                +23 diese Woche
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Gesamt Mitglieder"
          value="1.801"
          icon={Users}
          trend={4.7}
          trendLabel="vs. Vormonat"
        />
        <KPICard
          title="Nachrichten gesendet"
          value={formatNumber(mockKPIs.totalMessagesSent)}
          icon={MessageSquare}
          trend={12.5}
          trendLabel="vs. Vormonat"
        />
        <KPICard
          title="Oeffnungsrate"
          value={`${mockKPIs.openRate}%`}
          icon={Eye}
          trend={3.2}
          trendLabel="vs. Vormonat"
        />
        <KPICard
          title="Engagement-Rate"
          value={`${mockKPIs.engagementRate}%`}
          icon={TrendingUp}
          trend={5.1}
          trendLabel="vs. Vormonat"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Aktivitaet</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(0,0,0,0.08)" vertical={false} />
                <XAxis
                  dataKey="shortDate"
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                  tickLine={false}
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
                <Line
                  type="monotone"
                  dataKey="members"
                  name="Mitglieder"
                  stroke="#1565d8"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#1565d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Service-Verteilung</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockServiceBreakdown} layout="vertical">
                <CartesianGrid stroke="rgba(0,0,0,0.08)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="serviceName"
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={140}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="count"
                  name="Aktionen"
                  fill="#1877F2"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Letzte Aktivitaeten</h2>
        <div className="max-h-80 overflow-y-auto divide-y divide-gray-200 dark:divide-white/[0.04]">
          {mockRecentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge status={item.status} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500 dark:text-muted-light truncate">{item.action}</p>
                  <p className="text-sm text-gray-900 dark:text-white truncate">{item.recipientName}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 dark:text-muted flex-shrink-0 ml-4">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
