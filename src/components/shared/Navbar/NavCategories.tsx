import { Link, generatePath } from 'react-router-dom'

import categoriesData from '@/data/categories.data'
import { PATH } from '@/constants/path'
import { extractCategorySlug } from '@/utils'

export default function NavCategories() {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <div className="relative h-6 w-6 lg:h-9 lg:w-9">
          <img
            src="/assets/icons/category-1.svg"
            alt="category background"
            className="h-5 w-5 object-cover lg:h-[30px] lg:w-[30px]"
          />
          <img
            src="/assets/icons/category-2.svg"
            alt="category foreground"
            className="icon-filter absolute bottom-0 right-0 z-10 h-4 w-4 object-cover lg:h-6 lg:w-6"
          />
        </div>
        <p className="medium-15 lg:medium-16 text-secondary1_dark3">Danh mục sản phẩm</p>
      </div>

      <nav className="ml-8 mt-2.5 lg:ml-0 lg:border-t lg:border-secondary-3 lg:pt-2.5 lg:dark:border-dark-3">
        <ul className="grid lg:grid-cols-2 lg:gap-x-3.5">
          {categoriesData.data.map((category) => {
            const slug = extractCategorySlug(category.slug)
            const categoryPath = generatePath(PATH.CATEGORY, { slug, id: category.id })
            return (
              <li key={category._id}>
                <Link
                  to={categoryPath}
                  className="regular-14 text-secondary1_dark3 block py-[7px] hover:text-primary-blue"
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
