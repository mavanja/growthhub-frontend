const STATUS_CONFIG = {
  sent: {
    label: 'Gesendet',
    color: '#3b82f6',
  },
  delivered: {
    label: 'Zugestellt',
    color: '#22c55e',
  },
  opened: {
    label: 'Gelesen',
    color: '#10b981',
  },
  failed: {
    label: 'Fehlgeschlagen',
    color: '#ef4444',
  },
  pending: {
    label: 'Ausstehend',
    color: '#1877F2',
  },
}

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
}

export default function Badge({ status, size = 'md' }) {
  const config = STATUS_CONFIG[status]

  if (!config) {
    return null
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${sizeClasses[size]}
      `}
      style={{
        backgroundColor: `${config.color}1a`,
        color: config.color,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  )
}
