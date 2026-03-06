export default function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && (
        <div className="text-gray-300 dark:text-muted/30 mb-4">
          <Icon className="w-12 h-12" />
        </div>
      )}
      {title && (
        <h3 className="text-lg text-gray-900 dark:text-white font-medium mb-1">{title}</h3>
      )}
      {message && <p className="text-sm text-gray-500 dark:text-muted text-center">{message}</p>}
    </div>
  )
}
