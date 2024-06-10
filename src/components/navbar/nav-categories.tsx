import { NavLink, generatePath } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useCategories } from '@/lib/react-query'
import { cn, extractCategorySlug } from '@/utils'
import { useFloatingStore } from '@/stores/floating-store'
import { Category1Icon, Category2Icon } from '@/components/icons'

export default function NavCategories() {
  const { data: categoriesResponse } = useCategories()

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <div className="relative size-6 lg:size-9">
          <Category1Icon className="size-5 lg:size-[30px]" />
          <Category2Icon className="absolute bottom-0 right-0 z-10 size-4 lg:size-6" />
        </div>
        <p className="text-secondary1_dark3 medium-15 lg:medium-16">Categories</p>
      </div>

      <nav className="ml-8 mt-2.5 lg:ml-0 lg:border-t lg:border-secondary-3 lg:pt-2.5 lg:dark:border-dark-3">
        <ul className="grid lg:grid-cols-2 lg:gap-x-3.5">
          <NavCategory path={PATH.PRODUCTS} title="Tất cả sản phẩm" />
          {categoriesResponse.data.data.map((category) => {
            const categoryPath = generatePath(PATH.CATEGORY, {
              categorySlug: extractCategorySlug(category.slug),
              categoryId: category.id,
            })

            return <NavCategory key={category.id} path={categoryPath} title={category.title} />
          })}
        </ul>
      </nav>
    </div>
  )
}

function NavCategory({ path, title }: { path: string; title: string }) {
  const isSidebarOpen = useFloatingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useFloatingStore((state) => state.setIsSidebarOpen)
  const isFloatingOpen = useFloatingStore((state) => state.isFloatingOpen)
  const setIsFloatingOpen = useFloatingStore((state) => state.setIsFloatingOpen)

  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          cn('focus-primary block py-[7px] transition-colors', {
            'medium-14 text-active-category': isActive,
            'regular-14 text-secondary1_dark3 hover:text-active-category': !isActive,
          })
        }
        onClick={() => {
          if (isSidebarOpen) setIsSidebarOpen(false)
          if (isFloatingOpen) setIsFloatingOpen(false)
        }}
      >
        <h3 className="line-clamp-1 capitalize">{title}</h3>
      </NavLink>
    </li>
  )
}
