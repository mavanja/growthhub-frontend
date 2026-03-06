const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    const message = data?.error || data?.message || 'Ein Fehler ist aufgetreten'
    throw new Error(message)
  }

  return data
}

export function get(endpoint) {
  return apiFetch(endpoint, { method: 'GET' })
}

export function post(endpoint, body) {
  return apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function put(endpoint, body) {
  return apiFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function del(endpoint) {
  return apiFetch(endpoint, { method: 'DELETE' })
}

export default apiFetch
