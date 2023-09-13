import { useRoutes } from 'react-router-dom'
import { routers } from '@/routers'

export default function App() {
  const element = useRoutes(routers)
  return <>{element}</>
}
