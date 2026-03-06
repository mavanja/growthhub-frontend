import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    authService
      .getMe()
      .then((data) => {
        setState({
          user: data.user,
          token: 'authenticated',
          isAuthenticated: true,
          isLoading: false,
        })
      })
      .catch(() => {
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password)
    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    })
    return data
  }, [])

  const register = useCallback(async (formData) => {
    const data = await authService.register(formData)
    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    })
    return data
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }, [])

  const updateUser = useCallback((userData) => {
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, ...userData },
    }))
  }, [])

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
