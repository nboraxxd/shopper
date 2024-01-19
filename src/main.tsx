import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { QueryProvider } from '@/lib/react-query/QueryProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
)
