import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'
import '@/globals.css'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
