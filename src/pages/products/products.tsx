import { Link } from 'react-router-dom'
import keyBy from 'lodash/keyBy'

import { FieldUnion } from '@/types'
import { Product } from '@/types/product.type'
import { formatCurrency } from '@/utils'
import { useCategories, useProducts } from '@/lib/react-query'
import { StarIcon } from '@/components/icons'

const fields =
  'name,real_price,price,categories,slug,_id,images,rating_average,review_count,discount_rate,configurable_products'
type Fields = FieldUnion<typeof fields>

export default function Products() {
  const { data } = useProducts<Pick<Product, Fields>>({
    fields,
    page: 1,
    limit: 24,
  })

  const { data: categoriesData } = useCategories()
  const categories = keyBy(categoriesData?.data?.data, 'id')

  if (!data) return <div>Loading...</div>
  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {data.data.data.map((product) => {
        const image = product.images[0]
        if (image.thumbnail_url === 'https://salt.tikicdn.com/assets/img/image.svg') {
          image.thumbnail_url = product.configurable_products[1].images[0].medium_url
        }

        const category = categories[product.categories]

        return (
          <div key={product._id} className="background-light1_dark1 overflow-hidden rounded-lg">
            <div className="group relative pt-[100%]">
              <Link to={`/products/${product.slug}`} className="absolute left-0 top-0 size-full">
                <img
                  src={product?.images[1]?.thumbnail_url || product.images[0].thumbnail_url}
                  alt={product.name}
                  className="inline-block size-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <img
                  src={product.images[0].thumbnail_url}
                  alt={product.name}
                  className="ml-[-100%] inline-block size-full object-cover transition-opacity duration-200 group-hover:opacity-0"
                />
              </Link>
            </div>
            <div className="p-4">
              <h3 className="medium-16 text-secondary1_light1 line-clamp-2">{product.name}</h3>
              <h4 className="regular-15 line-clamp-1 text-secondary-2">{category.title}</h4>
              <div className="flex-center">
                <div className="text-secondary1_light1 medium-16">
                  {formatCurrency(product.price)}
                  <sup>₫</sup>
                </div>
                {product.rating_average > 0 && (
                  <>
                    <StarIcon className="ml-auto size-6" />
                    <span className="ml-1.5">{product.rating_average}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
