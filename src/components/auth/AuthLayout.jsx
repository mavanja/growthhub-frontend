export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-0 flex items-center justify-center relative">
      <div className="mesh-gradient fixed inset-0" />
      <div className="noise-overlay" />

      <div className="relative z-10 max-w-sm w-full mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl italic text-gray-900 dark:text-white">
            GrowthHub
            <span className="text-accent-500">.</span>
          </h1>
        </div>

        {children}
      </div>
    </div>
  )
}
