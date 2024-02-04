import { Link, createSearchParams, generatePath } from 'react-router-dom'

import { ProductParameters } from '@/types/product.type'
import { PATH } from '@/constants/path'
import { COLLECTIONS } from '@/constants'
import { extractCategorySlug } from '@/utils'
import categoriesData from '@/data/categories.data'

export default function NavItemContent() {
  return (
    <div className="grid-col grid grid-cols-[repeat(2,minmax(405px,1fr))] items-center gap-10 p-8">
      {/* Category */}
      <div>
        <p className="medium-16 text-secondary1_dark3">Danh mục sản phẩm</p>
        <div className="mt-2.5 border-t border-secondary-3 pt-2.5 dark:border-dark-1">
          <ul className="grid grid-cols-2 gap-x-3.5 gap-y-1.5">
            {categoriesData.data.map((category) => {
              const slug = extractCategorySlug(category.slug)
              const categoryPath = generatePath(PATH.CATEGORY, { slug, id: category.id })

              return (
                <li key={category._id}>
                  <Link
                    to={categoryPath}
                    className="regular-14 text-secondary1_dark3 inline-block py-1 hover:text-primary-blue"
                  >
                    <h2>{category.title}</h2>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Collections */}
      <div className="grid grid-cols-2 gap-5">
        {COLLECTIONS.map((collection) => {
          const sortParameterObject: Pick<ProductParameters, 'sort'> = { sort: collection.sortValue }

          return (
            <div key={collection._id} className="group relative text-base sm:text-sm">
              <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img src={collection.img} alt={collection.title} className="object-cover object-center" />
              </div>
              <Link
                to={{ pathname: PATH.PRODUCTS, search: createSearchParams(sortParameterObject).toString() }}
                className="medium-16 text-secondary1_dark3 mt-6 inline-block"
              >
                <span className="absolute inset-0 z-10"></span>
                {collection.title}
              </Link>
              <p className="regular-14 text-secondary1_dark3 mt-1">Mua ngay</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
