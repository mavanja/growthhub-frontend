import { Loader2 } from 'lucide-react'

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export default function Spinner({ size = 'md', className = '', label }) {
  const spinner = (
    <Loader2
      className={`animate-spin text-accent-500 ${sizeClasses[size]} ${className}`}
    />
  )

  if (label) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        {spinner}
        <p className="text-sm text-muted-light">{label}</p>
      </div>
    )
  }

  return spinner
}
