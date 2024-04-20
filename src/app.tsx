import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'
import { QueryProvider } from '@/lib/react-query'
import { ThemeProvider } from '@/context/theme-provider'
import '@/globals.css'

export default function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryProvider>
    </>
  )
}
