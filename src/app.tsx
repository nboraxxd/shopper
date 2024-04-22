import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from '@/router'
import { QueryProvider } from '@/lib/react-query'
import { ThemeProvider } from '@/context/theme-provider'
import { FormErrorIcon } from '@/components/icons'
import '@/globals.css'

export default function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" icons={{ error: <FormErrorIcon className="size-5" /> }} />
        </ThemeProvider>
      </QueryProvider>
    </>
  )
}
