import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from '@/router'
import { QueryProvider } from '@/lib/react-query'
import { ThemeProvider } from '@/context/theme-provider'
import { FormErrorIcon } from '@/components/icons'
import { AuthProvider } from '@/components/provider'
import '@/globals.css'

export default function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster icons={{ error: <FormErrorIcon className="size-5" /> }} />
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </>
  )
}
