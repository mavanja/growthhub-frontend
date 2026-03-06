export function formatNumber(num) {
  if (num == null || isNaN(num)) return '0'
  return new Intl.NumberFormat('de-DE').format(num)
}

export function formatPercentage(num) {
  if (num == null || isNaN(num)) return '0,0%'
  return `${num.toFixed(1).replace('.', ',')}%`
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export function formatDateTime(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export function formatRelativeTime(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''

  const now = new Date()
  const diffMs = now - date
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) return 'vor wenigen Sekunden'
  if (diffMinutes === 1) return 'vor 1 Minute'
  if (diffMinutes < 60) return `vor ${diffMinutes} Minuten`
  if (diffHours === 1) return 'vor 1 Stunde'
  if (diffHours < 24) return `vor ${diffHours} Stunden`
  if (diffDays === 1) return 'vor 1 Tag'
  return `vor ${diffDays} Tagen`
}
