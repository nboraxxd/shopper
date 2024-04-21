import { Link, generatePath } from 'react-router-dom'

import categoriesData from '@/data/categories.data'
import { PATH } from '@/constants/path'
import { extractCategorySlug } from '@/utils'
import { Category1Icon, Category2Icon } from '@/components/icons'

export default function NavCategories() {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <div className="relative size-6 lg:size-9">
          <Category1Icon className="size-5 lg:size-[30px]" />
          <Category2Icon className="absolute bottom-0 right-0 z-10 size-4 lg:size-6" />
        </div>
        <p className="medium-15 lg:medium-16 text-secondary1_dark3">Danh mục sản phẩm</p>
      </div>

      <nav className="ml-8 mt-2.5 lg:ml-0 lg:border-t lg:border-secondary-3 lg:pt-2.5 lg:dark:border-dark-3">
        <ul className="grid lg:grid-cols-2 lg:gap-x-3.5">
          {categoriesData.data.data.map((category) => {
            const slug = extractCategorySlug(category.slug)
            const categoryPath = generatePath(PATH.CATEGORY, { slug, id: category.id })
            return (
              <li key={category._id}>
                <Link
                  to={categoryPath}
                  className="regular-14 text-secondary1_dark3 block py-[7px] transition-colors hover:text-primary-blue"
                >
                  <h2 className="line-clamp-1">{category.title}</h2>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
