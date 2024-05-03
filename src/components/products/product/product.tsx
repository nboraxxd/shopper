import pick from 'lodash/pick'

import { Fields } from '@/pages/products/products'
import { Category, Product } from '@/types/product.type'
import { PRODUCT_PLACEHOLDER_IMAGES } from '@/constants'
import { ProductCard } from '@/components/products/product-card'

interface Props {
  product: Pick<Product, Fields>
  categories: Record<number, Category>
}

export default function Product({ product, categories }: Props) {
  const category = categories[product.categories] as Category | undefined

  let primaryImage = product.images[0].medium_url

  if (
    PRODUCT_PLACEHOLDER_IMAGES.includes(primaryImage) &&
    product.configurable_products &&
    product.configurable_products.length > 0
  ) {
    primaryImage =
      product.configurable_products[1]?.images[0]?.medium_url || product.configurable_products[0]?.images[0]?.medium_url
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
}
