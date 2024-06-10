import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { User } from '@/types/user.type'
import { getAccessTokenFromLocalStorage, getUserFromLocalStorage } from '@/utils/localStorage'

type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      user: getUserFromLocalStorage(),
      setUser: (user) => set({ user }),
    }),
    { enabled: process.env.NODE_ENV === 'development', name: 'Auth' }
  )
)
