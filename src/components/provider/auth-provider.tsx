import { useEffect } from 'react'

import { useGetProfile } from '@/lib/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { setUserToLocalStorage } from '@/utils/localStorage'

interface Props {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const { data: profile } = useGetProfile(isAuthenticated)

  useEffect(() => {
    if (isAuthenticated && profile) {
      setUser(profile.data.data)
      setUserToLocalStorage(profile.data.data)
    }
  }, [isAuthenticated, profile, setUser])

  return children
}
