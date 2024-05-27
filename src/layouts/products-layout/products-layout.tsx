import { Outlet } from 'react-router-dom'

import { ProductSidebar } from '@/components/products/sidebar'

export default function ProductsLayout() {
  return (
    <div className="mt-8 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
      <ProductSidebar />
      <Outlet />
    </div>
  )
}
