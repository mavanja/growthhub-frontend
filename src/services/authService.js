import { supabase } from '../lib/supabase'

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  const profile = await getProfile(data.user.id)

  return {
    user: {
      id: data.user.id,
      email: data.user.email,
      name: profile?.name || data.user.user_metadata?.name || '',
      company: profile?.company || '',
      role: profile?.role || 'user',
    },
    token: data.session.access_token,
  }
}

export async function register({ name, email, password, company }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, company },
    },
  })

  if (error) throw new Error(error.message)

  if (data.user && company) {
    await supabase
      .from('profiles')
      .update({ company })
      .eq('id', data.user.id)
  }

  return {
    user: {
      id: data.user.id,
      email: data.user.email,
      name,
      company: company || '',
      role: 'user',
    },
    token: data.session?.access_token || '',
  }
}

export async function getMe() {
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) throw new Error('Nicht authentifiziert')

  const profile = await getProfile(session.user.id)

  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      name: profile?.name || session.user.user_metadata?.name || '',
      company: profile?.company || '',
      role: profile?.role || 'user',
    },
  }
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  })
  if (error) throw new Error(error.message)
}

export function logout() {
  supabase.auth.signOut()
}

export function getStoredToken() {
  const stored = localStorage.getItem('sb-qdyjbfxyqpqplknyesfw-auth-token')
  if (!stored) return null
  try {
    const parsed = JSON.parse(stored)
    return parsed?.access_token || null
  } catch {
    return null
  }
}

export function storeToken() {
  // Supabase handles token storage automatically
}

async function getProfile(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('name, email, company, role')
    .eq('id', userId)
    .single()

  return data
}
