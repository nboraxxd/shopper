import { useState } from 'react'
import flatten from 'lodash/flatten'

import { Product } from '@/types/product.type'
import { ProductPreview } from '@/components/product/product-preview'
import { ProductThumb } from '@/components/product/product-thumb'

interface Props {
  productName: Product['name']
  images: Product['images']
  configurableProducts: Product['configurable_products']
}

export default function ProductImages({ productName, images, configurableProducts }: Props) {
  const [activeImage, setActiveImage] = useState(images[0].large_url)

  const _images = configurableProducts
    ? [...images, ...flatten(configurableProducts.map((product) => product.images))]
    : images

  return (
    <>
      <ProductPreview image={activeImage || images[0].large_url} images={_images} name={productName} />
      <ProductThumb name={productName} images={_images} activeImage={activeImage} setActiveImage={setActiveImage} />
    </>
  )
}
