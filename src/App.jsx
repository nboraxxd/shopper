import { useRoutes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { routers } from '@/routers'

export default function App() {
  const element = useRoutes(routers)
  return (
    <>
      {element}
      <Toaster duration={3000} />
    </>
  )
}
