import { Loader2 } from 'lucide-react'

const variants = {
  primary:
    'bg-accent-500 text-white font-semibold hover:bg-accent-400 shadow-[0_0_20px_-4px_rgba(245,158,11,0.25)] hover:shadow-[0_0_28px_-4px_rgba(245,158,11,0.35)]',
  secondary:
    'bg-gray-100 dark:bg-surface-3 border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-white/[0.1]',
  ghost:
    'text-gray-500 dark:text-muted-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...rest}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}
