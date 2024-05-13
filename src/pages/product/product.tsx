import { useState } from 'react'
import { generatePath, useParams } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useCategory, useProduct } from '@/lib/react-query'
import { extractCategorySlug, extractProductId, formatCurrency, formatNumberToSocialStyle } from '@/utils'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ProductThumb } from '@/components/product/product-thumb'
import { ProductPreview } from '@/components/product/product-preview'

import 'swiper/css'
import { HeartIcon, MinusIcon, PlusIcon, StarIcon } from '@/components/icons'
import { NumberInput } from '@/components/shared/input'
import { PrimaryButton } from '@/components/shared/button'
import { ProductTab } from '@/components/product/product-tab'

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
        <>
          <div className="mt-5 gap-4 overflow-hidden rounded-[20px] md:mt-8 md:gap-8 lg:flex">
            <div className="md:flex md:flex-row-reverse md:px-7 lg:block lg:w-1/2 xl:w-5/12">
              <ProductPreview
                image={activeImage || productResponse.data.data.images[0].large_url}
                images={productResponse.data.data.images}
                configurable_products={productResponse.data.data.configurable_products}
                name={productResponse.data.data.name}
              />
              <ProductThumb
                name={productResponse.data.data.name}
                images={productResponse.data.data.images}
                configurable_products={productResponse.data.data.configurable_products}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
              />
            </div>
            <div className="background-light1_dark1 p-10 lg:w-1/2 xl:w-7/12">
              <h1 className="text-secondary1_light3 bold-18 md:medium-26">{productResponse.data.data.name}</h1>
              <div className="mt-7 flex flex-col gap-7 xl:flex-row">
                <div className="space-y-7 xl:w-1/2">
                  {productResponse.data.data.rating_average > 0 ? (
                    <div className="gap-2 flex-center">
                      <StarIcon className="size-6 fill-primary-yellow" />
                      <div className="text-secondary1_dark3 medium-18 flex gap-1">
                        <span>({productResponse.data.data.rating_average.toFixed(1)})</span>
                        <span>
                          {formatNumberToSocialStyle(productResponse.data.data.review_count)}{' '}
                          {productResponse.data.data.review_count > 1 ? 'ratings' : 'rating'}
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <h3 className="medium-18 text-secondary1_light3">Mô tả chung</h3>
                    <p className="regular-14 text-secondary1_light3 mt-1">
                      {productResponse.data.data.short_description}
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/2">
                  <div className="flex items-start">
                    <h3 className="regular-16 text-secondary-2 line-through">
                      {formatCurrency(productResponse.data.data.price)}
                      <sup>₫</sup>
                    </h3>
                    <div className="medium-14 ml-2.5 rounded bg-primary-green/20 px-2 py-0.5 text-primary-green">
                      -{productResponse.data.data.discount_rate}%
                    </div>
                  </div>
                  <h2 className="medium-26 text-dark_light3 mt-5">
                    {formatCurrency(productResponse.data.data.real_price)}
                    <sup>₫</sup>
                  </h2>
                  <div className="flex h-9">
                    <PrimaryButton className="input-ring relative -left-px w-9 justify-center rounded-s-md flex-center">
                      <MinusIcon className="size-6" />
                    </PrimaryButton>
                    <NumberInput className="rounded-e-none rounded-s-none focus:z-10" />
                    <PrimaryButton className="input-ring relative left-px w-9 justify-center rounded-r-md flex-center">
                      <PlusIcon className="size-6" />
                    </PrimaryButton>
                  </div>
                  <p>{productResponse.data.data.stock_item.qty} sản phẩm có sẵn</p>
                  <div>
                    <PrimaryButton className="medium-18 mt-5 h-[46px] w-full rounded-md bg-primary-yellow text-secondary-1">
                      Mua ngay
                    </PrimaryButton>
                    <div className="mt-5 gap-5 flex-center">
                      <PrimaryButton className="medium-18 h-[46px] flex-1 rounded-md bg-primary-green text-secondary-1">
                        Thêm vào giỏ
                      </PrimaryButton>
                      <PrimaryButton className="size-[46px] justify-center rounded-md border border-secondary-3 text-secondary-1 flex-center">
                        <HeartIcon className="size-6" />
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductTab
            description={productResponse.data.data.description}
            features={productResponse.data.data.specifications}
          />
        </>
      ) : null}
    </>
  )
}
