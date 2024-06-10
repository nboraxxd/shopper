import { generatePath, useParams } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useCategory, useProduct } from '@/lib/react-query'
import { extractCategorySlug, extractProductId } from '@/utils'
import { ProductTab } from '@/components/product/product-tab'
import { ProductImages } from '@/components/product/product-images'
import { ProductAction } from '@/components/product/product-action'
import { Breadcrumbs } from '@/components/breadcrumbs'

import 'swiper/css'

export default function () {
  const { productSlug } = useParams()
  const productId = extractProductId(productSlug as string)

  const {
    data: productResponse,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    isSuccess: isSuccessProduct,
  } = useProduct(Number(productId))

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
      {!isLoadingCategory && isSuccessProduct ? (
        <Breadcrumbs navClassname="md:background-light2_dark1 shadow-light10_dark10 mt-5 md:mt-8">
          <Breadcrumbs.Item to={PATH.HOMEPAGE}>Trang chủ</Breadcrumbs.Item>
          <Breadcrumbs.Item to={generateCategoryLink}>
            {categoryResponse?.data.data?.title || 'Products'}
          </Breadcrumbs.Item>
          <Breadcrumbs.Item isLastChild>{productResponse.data.data.name}</Breadcrumbs.Item>
        </Breadcrumbs>
      ) : null}

      {isSuccessProduct ? (
        <>
          <div className="max-md:background-light1_dark1 mt-5 gap-4 max-md:rounded-3xl max-md:p-4 md:mt-8 md:gap-8 lg:flex">
            <div className="md:flex md:flex-row-reverse md:px-7 lg:block lg:w-1/2 xl:w-5/12">
              <ProductImages
                productName={productResponse.data.data.name}
                images={productResponse.data.data.images}
                configurableProducts={productResponse.data.data.configurable_products}
              />
            </div>
            <div className="md:background-light2_dark1 mt-5 md:mt-8 md:rounded-xl md:p-10 lg:mt-0 lg:w-1/2 xl:w-7/12">
              <h1 className="text-secondary1_light3 bold-18 md:medium-26">{productResponse.data.data.name}</h1>
              <div className="mt-5 flex flex-col gap-5 md:mt-7 md:gap-7 xl:flex-row">
                <ProductAction
                  productId={Number(productId)}
                  productRatingAverage={productResponse.data.data.rating_average}
                  productReviewCount={productResponse.data.data.review_count}
                  productQty={productResponse.data.data.stock_item.qty}
                  productPrice={productResponse.data.data.price}
                  productDiscountRate={productResponse.data.data.discount_rate}
                  productRealPrice={productResponse.data.data.real_price}
                />
              </div>
            </div>
          </div>
          <ProductTab
            productId={Number(productId)}
            description={productResponse.data.data.description}
            features={productResponse.data.data.specifications}
          />
        </>
      ) : null}
    </>
  )
}
