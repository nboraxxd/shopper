import { Outlet } from 'react-router-dom'

import { Categories } from '@/components/Products/Categories'

export default function ProductsLayout() {
  return (
    <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
      <div className="sticky top-[calc(var(--header-height)+32px)] h-screen overflow-y-scroll pb-28 scrollbar-hide">
        <p className="bold-24 text-secondary1_light1 mb-5">Danh mục sản phẩm</p>
        <Categories />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
