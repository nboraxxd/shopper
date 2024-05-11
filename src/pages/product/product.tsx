import { useState } from 'react'
import { generatePath, useParams } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useCategory, useProduct } from '@/lib/react-query'
import { extractCategorySlug, extractProductId } from '@/utils'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ProductThumb } from '@/components/product/product-thumb'
import { ProductPreview } from '@/components/product/product-preview'

import 'swiper/css'

export default function Product() {
  const { productSlug } = useParams()
  const productId = extractProductId(productSlug as string)

  const [activeImage, setActiveImage] = useState('')

  const {
    data: productResponse,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    isSuccess: isSuccessProduct,
  } = useProduct(productId)

  const {
    data: categoryResponse,
    isLoading: isLoadingCategory,
    isSuccess: isSuccessCategory,
  } = useCategory(productResponse?.data.data.categories.toString() || '', isSuccessProduct)

  const generateCategoryLink =
    isSuccessCategory && categoryResponse.data.data
      ? generatePath(PATH.CATEGORY, {
          categorySlug: extractCategorySlug(categoryResponse.data.data.slug),
          categoryId: categoryResponse.data.data.id,
        })
      : PATH.PRODUCTS

  if (isLoadingProduct) return <div>Loading...</div>

  if (isErrorProduct) return <div>Error</div>

  return (
    <>
      {isSuccessProduct && !isLoadingCategory ? (
        <Breadcrumbs navClassname="mt-5 md:mt-8">
          <Breadcrumbs.Item to={PATH.HOMEPAGE}>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item to={generateCategoryLink}>
            {categoryResponse?.data.data?.title || 'Products'}
          </Breadcrumbs.Item>
          <Breadcrumbs.Item isLastChild>{productResponse.data.data.name}</Breadcrumbs.Item>
        </Breadcrumbs>
      ) : null}

      {isSuccessProduct ? (
        <div className="mt-5 gap-4 md:mt-8 md:gap-8 lg:flex">
          <div className="md:flex md:flex-row-reverse md:px-7 lg:block lg:w-1/2 xl:w-5/12">
            <ProductPreview
              image={activeImage || productResponse.data.data.images[0].large_url}
              images={productResponse.data.data.images}
              name={productResponse.data.data.name}
            />

            <ProductThumb
              name={productResponse.data.data.name}
              images={productResponse.data.data.images}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
            />
          </div>
          <div className="lg:w-1/2 xl:w-7/12">hehe</div>
        </div>
      ) : null}
    </>
  )
}
