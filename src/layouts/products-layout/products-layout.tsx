import { Sidebar } from '@/components/products/sidebar'
import { Outlet } from 'react-router-dom'

export default function ProductsLayout() {
  return (
    <div className="mt-8 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
      <Sidebar />
      <Outlet />
    </div>
  )
}
