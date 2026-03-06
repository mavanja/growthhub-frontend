export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`
        bg-white dark:bg-surface-2/80 border border-gray-200 dark:border-white/[0.06] rounded-xl p-6
        ${hover ? 'hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
