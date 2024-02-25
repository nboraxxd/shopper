import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryProvider } from '@/lib/react-query/QueryProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>
)
