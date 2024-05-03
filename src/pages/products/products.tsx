import pick from 'lodash/pick'
import omitBy from 'lodash/omitBy'
import keyBy from 'lodash/keyBy'
import isUndefined from 'lodash/isUndefined'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { FieldUnion, QueryConfig } from '@/types'
import { Category, Product } from '@/types/product.type'
import { PRODUCT_PLACEHOLDER_IMAGES } from '@/constants'
import { ProductSort } from '@/constants/enums'
import { useCategories, useProducts } from '@/lib/react-query'
import { Sort } from '@/components/products/sort'
import { Filter } from '@/components/products/filter'
import { Pagination } from '@/components/products/pagination'
import { ProductCard, ProductCardSkeleton } from '@/components/products/product-card'

const LIMIT = '60'

const fields =
  'name,real_price,price,categories,slug,_id,images,rating_average,review_count,discount_rate,configurable_products'

type Fields = FieldUnion<typeof fields>

export default function Products() {
  const { search } = useLocation()
  const queryParams = queryString.parse(search)

  const productSortList = Object.values(ProductSort)

  const queryParamsFiltered: QueryConfig = omitBy(
    {
      sort:
        queryParams.sort === 'string' && productSortList.includes(queryParams.sort as ProductSort)
          ? (queryParams.sort as ProductSort)
          : undefined,
      name: queryParams.name,
      page: Number(queryParams.page) ? queryParams.page : undefined,
      minPrice: Number(queryParams.minPrice) ? queryParams.minPrice : undefined,
      maxPrice: Number(queryParams.maxPrice) ? queryParams.maxPrice : undefined,
      filterRating: Number(queryParams.filterRating) ? queryParams.filterRating : undefined,
    },
    isUndefined
  )

  const {
    data: productsRes,
    isLoading,
    isSuccess,
  } = useProducts<Pick<Product, Fields>>({
    fields,
    limit: LIMIT,
    ...queryParamsFiltered,
  })

  const { data: categoriesRes } = useCategories()
  const categories = keyBy(categoriesRes.data.data, 'id')

  return (
    <div className="pb-14 max-lg:mt-5">
      <div className="flex flex-col justify-between">
        <h2 className="medium-18 md:bold-24 text-secondary1_light1">Tất cả sản phẩm</h2>
        <div className="ml-auto mt-5 gap-5 flex-center">
          <Filter />
          <Sort />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4 2xl:grid-cols-5">
        {isLoading && Array.from(Array(12)).map((_, i) => <ProductCardSkeleton key={i} />)}

        {isSuccess &&
          productsRes.data.paginate.currentPage !== null &&
          productsRes.data.data.length > 0 &&
          productsRes.data.data.map((product) => {
            const category = categories[product.categories] as Category | undefined

            let primaryImage = product.images[0].medium_url

            if (
              PRODUCT_PLACEHOLDER_IMAGES.includes(primaryImage) &&
              product.configurable_products &&
              product.configurable_products.length > 0
            ) {
              primaryImage =
                product.configurable_products[1]?.images[0]?.medium_url ||
                product.configurable_products[0]?.images[0]?.medium_url
            }

            let secondaryImage = product.configurable_products?.[0]?.images?.[0]?.medium_url

            if (!secondaryImage) {
              secondaryImage = product?.images[1]?.medium_url || primaryImage
            }

            return (
              <ProductCard
                key={product._id}
                category={category ? pick(category, ['id', 'title', 'slug']) : undefined}
                name={product.name}
                price={product.price}
                primaryImage={primaryImage}
                secondaryImage={secondaryImage}
                rating_average={product.rating_average}
                slug={product.slug}
              />
            )
          })}
      </div>

      {isSuccess && productsRes.data.data.length > 0 && (
        <Pagination queryParams={queryParamsFiltered} totalPage={productsRes.data.paginate.totalPage} />
      )}
    </div>
  )
}
