import flatten from 'lodash/flatten'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import useMediaQuery from '@/hooks/useMediaQuery'
import { Product } from '@/types/product.type'

import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  image: string
  images: Product['images']
  configurable_products: Product['configurable_products']
  name: string
}

export default function ProductPreview({ image, images, configurable_products, name }: Props) {
  const isMediumAndUp = useMediaQuery({ minWidth: 768 })

  const _images = configurable_products
    ? [...images, ...flatten(configurable_products.map((product) => product.images))]
    : images

  return isMediumAndUp ? (
    <div className="relative !bg-light-1 pt-[92%] max-lg:flex-1">
      <img src={image} alt={name} className="absolute left-0 top-0 size-full object-contain" />
    </div>
  ) : (
    <Swiper
      className="mySwiper !bg-light-1 p-4"
      spaceBetween={12}
      modules={[Pagination]}
      pagination={{
        type: 'custom',
        renderCustom(_, current, total) {
          return `<div class="regular-11 text-secondary-3 bg-dark-2/75 flex justify-start w-fit rounded-md p-1 mb-2 ml-2">${current}/${total}</div>`
        },
      }}
    >
      {_images.map((_image, index) => {
        return (
          <SwiperSlide key={index} className="relative pt-[92%]">
            <img src={_image.large_url} alt={name} className="absolute left-0 top-0 size-full object-contain" />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
