import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { generatePath, useParams } from 'react-router-dom'
import { Swiper as SwiperType } from 'swiper/types'
import { Navigation } from 'swiper/modules'

import { PATH } from '@/constants/path'
import { cn, extractCategorySlug, extractProductId } from '@/utils'
import { useCategory, useProduct } from '@/lib/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

import 'swiper/css'

export default function Product() {
  const { productSlug } = useParams()
  const productId = extractProductId(productSlug as string)

  const swiperRef = useRef<SwiperType | null>(null)
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

  useEffect(() => {
    if (isSuccessProduct && productResponse.data.data.images.length > 0) {
      setActiveImage(productResponse.data.data.images[0].large_url)
    }
  }, [isSuccessProduct, productResponse?.data.data.images])

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
        <div className="mt-5 grid gap-4 md:mt-8 md:gap-8 lg:grid-cols-2 xl:grid-cols-[5fr,7fr]">
          <div>
            <div className="relative pt-[92%]">
              <img src={activeImage} className="absolute left-0 top-0 size-full !bg-light-1 object-contain" />
            </div>

            <div className="group/swiper relative p-7">
              <Swiper
                className="mySwiper grid grid-cols-1"
                slidesPerView={4}
                spaceBetween={20}
                slidesPerGroup={4}
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper
                }}
              >
                {productResponse.data.data.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={cn(
                        'relative cursor-pointer overflow-hidden rounded-lg border !bg-light-1 pt-[100%] transition-colors',
                        { 'border-primary-yellow': image.large_url === activeImage }
                      )}
                    >
                      <img
                        src={image.medium_url}
                        className={cn(
                          'absolute left-0 top-0 size-full object-contain transition-opacity',
                          image.large_url === activeImage ? 'opacity-100' : 'opacity-85'
                        )}
                        onMouseEnter={() => setActiveImage(image.large_url)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {productResponse.data.data.images.length > 4 ? (
                <>
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-400 p-1 text-blue-300 opacity-0 transition-opacity duration-300 ease-in-out group-hover/swiper:opacity-100"
                  >
                    <ChevronLeftIcon className="size-6 text-secondary-3" />
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-400 p-1 text-blue-300 opacity-0 transition-opacity duration-300 ease-in-out group-hover/swiper:opacity-100"
                  >
                    <ChevronRightIcon className="size-6 text-secondary-3" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <div>hehe</div>
        </div>
      ) : null}
    </>
  )
}
