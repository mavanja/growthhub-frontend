import { ArrowUp, ArrowDown } from 'lucide-react'

export default function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  previousValue,
}) {
  const isPositive = trend > 0

  return (
    <div className="bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-accent-500/10 text-accent-500 p-2">
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        {trend != null && trend !== 0 && (
          <div
            className={`flex items-center gap-0.5 text-xs font-medium ${
              isPositive ? 'text-[#22c55e]' : 'text-[#ef4444]'
            }`}
          >
            {isPositive ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className="text-2xl font-mono font-semibold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-muted-light mt-1">
          {title}
        </p>
        {previousValue && (
          <p className="text-xs text-gray-400 dark:text-muted mt-1">
            Vormonat: {previousValue}
          </p>
        )}
      </div>
    </div>
  )
}
