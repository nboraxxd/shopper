import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { router } from '@/router'
import { RouterProvider } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth-store'
import { REMOVE_AUTH_LOCAL_STORAGE_EVENT, localStorageEventTarget } from '@/utils/local-storage'
import { AuthProvider, QueryProvider, ThemeProvider } from '@/components/provider'
import { FormErrorIcon } from '@/components/icons'
import '@/globals.css'

export default function App() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    const handleRemoveAuth = () => {
      setIsAuthenticated(false)
      setUser(null)
    }

    localStorageEventTarget.addEventListener(REMOVE_AUTH_LOCAL_STORAGE_EVENT, handleRemoveAuth)

    return () => {
      localStorageEventTarget.removeEventListener(REMOVE_AUTH_LOCAL_STORAGE_EVENT, handleRemoveAuth)
    }
  }, [setIsAuthenticated, setUser])

  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster icons={{ error: <FormErrorIcon className="size-5" /> }} />
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
