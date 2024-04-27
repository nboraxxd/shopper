import keyBy from 'lodash/keyBy'
import pick from 'lodash/pick'

import { FieldUnion } from '@/types'
import { Product } from '@/types/product.type'
import { PRODUCT_PLACEHOLDER_IMG } from '@/constants'
import { useCategories, useProducts } from '@/lib/react-query'
import { ProductCard, ProductCardSkeleton } from '@/components/products/product-card'
import { Sort } from '@/components/products/sort'
import { Filter } from '@/components/products/filter'

const fields =
  'name,real_price,price,categories,slug,_id,images,rating_average,review_count,discount_rate,configurable_products'
type Fields = FieldUnion<typeof fields>

export default function Products() {
  const {
    data: productsRes,
    isLoading,
    isSuccess,
  } = useProducts<Pick<Product, Fields>>({
    fields,
    page: 1,
    limit: 24,
  })

  const { data: categoriesRes } = useCategories()
  const categories = keyBy(categoriesRes?.data?.data, 'id')

  return (
    <div className="mb-14 max-lg:mt-5">
      <div className="flex flex-col justify-between lg:flex-row lg:flex-center">
        <h2 className="medium-18 md:bold-24 text-secondary1_light1">Tất cả sản phẩm</h2>
        <div className="mt-5 justify-between flex-center">
          <Sort />
          <Filter />
        </div>
      </div>
      <div className="mt-8 grid gap-4 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {isLoading && Array.from(Array(24)).map((_, i) => <ProductCardSkeleton key={i} />)}

        {isSuccess && productsRes.data.data.length > 0 ? (
          productsRes.data.data.map((product) => {
            const category = categories[product.categories]

            let primaryImage = product.images[0].medium_url

            if (
              primaryImage === PRODUCT_PLACEHOLDER_IMG &&
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
                category={pick(category, ['id', 'title', 'slug'])}
                name={product.name}
                price={product.price}
                primaryImage={primaryImage}
                secondaryImage={secondaryImage}
                rating_average={product.rating_average}
                slug={product.slug}
              />
            )
          })
        ) : (
          <div>[[hehe]]</div>
        )}
      </div>
    </div>
  )
}
