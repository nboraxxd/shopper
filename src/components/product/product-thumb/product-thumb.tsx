import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { Navigation } from 'swiper/modules'

import { cn } from '@/utils'
import { Product } from '@/types/product.type'
import useMediaQuery from '@/hooks/useMediaQuery'
import { PrimaryButton } from '@/components/shared/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

import 'swiper/css'

interface Props {
  name: string
  images: Product['images']
  activeImage: string
  setActiveImage: React.Dispatch<React.SetStateAction<string>>
}

const SLIDES_PER_VIEW = 5

export default function ProductThumb({ name, images, activeImage, setActiveImage }: Props) {
  const isMediumAndUp = useMediaQuery({ minWidth: 768 })
  const isLargeAndUp = useMediaQuery({ minWidth: 1024 })

  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0].large_url)
    }
  }, [images, setActiveImage])

  return isMediumAndUp ? (
    <div className="group/swiper relative max-lg:mr-8 max-lg:flex max-lg:py-8 lg:p-4">
      <Swiper
        className="mySwiper lg:!px-0.5"
        direction={isLargeAndUp ? 'horizontal' : 'vertical'}
        autoHeight
        slidesPerView={isLargeAndUp ? 5 : 'auto'}
        spaceBetween={12}
        slidesPerGroup={SLIDES_PER_VIEW}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              'overflow-hidden rounded-md border border-secondary-4 !bg-light-1 p-1 max-lg:flex-center',
              image.large_url === activeImage ? 'border-primary-yellow' : 'hover:border-primary-yellow'
            )}
          >
            <div className="group/slide cursor-pointer transition-colors max-lg:size-20 lg:relative lg:pt-[100%]">
              <img
                src={image.medium_url}
                alt={name}
                className={cn(
                  'size-full object-contain opacity-85 transition-opacity lg:absolute lg:left-0 lg:top-0',
                  image.large_url === activeImage ? 'opacity-100' : 'group-hover/slide:opacity-100'
                )}
                onClick={() => setActiveImage(image.large_url)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > SLIDES_PER_VIEW ? (
        <>
          <PrimaryButton
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-secondary-2 p-0.5 opacity-0 transition-opacity duration-300 group-hover/swiper:opacity-100 max-lg:hidden"
          >
            <ChevronLeftIcon className="size-5 text-light-1" />
          </PrimaryButton>
          <PrimaryButton
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-secondary-2 p-0.5 opacity-0 transition-opacity duration-300 group-hover/swiper:opacity-100 max-lg:hidden"
          >
            <ChevronRightIcon className="size-5 text-light-1" />
          </PrimaryButton>
        </>
      ) : null}
    </div>
  ) : null
}
