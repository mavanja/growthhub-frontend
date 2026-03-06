import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  {
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    icon: Icon,
    name,
    required = false,
    className = '',
    ...rest
  },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm text-gray-600 dark:text-muted-light font-medium mb-1.5"
        >
          {label}
          {required && <span className="text-accent-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-muted pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full bg-gray-50 dark:bg-surface-2 border rounded-lg text-gray-900 dark:text-white text-sm
            placeholder:text-gray-400 dark:placeholder:text-muted
            transition-all duration-200 outline-none
            ${Icon ? 'pl-10 pr-4' : 'px-4'} py-2.5
            ${
              error
                ? 'border-red-400/50 focus:border-red-400/70 focus:ring-1 focus:ring-red-400/20'
                : 'border-gray-200 dark:border-white/[0.06] focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/20'
            }
            ${className}
          `}
          {...rest}
        />
      </div>
      {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
})

export default Input
