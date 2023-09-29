import { useRoutes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { routers } from '@/routers'

export default function App() {
  const element = useRoutes(routers)
  return (
    <>
      {element}
      <Toaster theme='dark' duration={3000} />
    </>
  )
}
